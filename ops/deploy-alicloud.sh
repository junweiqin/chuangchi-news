#!/usr/bin/env bash
set -Eeuo pipefail

export PATH="/usr/local/bin:/usr/bin:/bin"

REPO_URL="https://github.com/junweiqin/chuangchi-news.git"
BRANCH="${CHUANGCHI_BRANCH:-main}"
BASE_DIR="/www/wwwroot/chuangchi-deploy"
RELEASES_DIR="${BASE_DIR}/releases"
WORK_DIR="${BASE_DIR}/work"
CURRENT_PATH="/www/wwwroot/chuangchi-static"
LOCK_FILE="/var/lock/chuangchi-deploy.lock"
LOG_FILE="/var/log/chuangchi-deploy.log"

mkdir -p "$RELEASES_DIR" "$WORK_DIR"
exec 9>"$LOCK_FILE"
flock -n 9 || { echo "已有部署任务正在执行。" >&2; exit 1; }
exec > >(tee -a "$LOG_FILE") 2>&1

verify_live_site() {
  /www/server/nginx/sbin/nginx -t
  curl --noproxy '*' --fail --silent --show-error \
    --resolve chuangchi.cc:443:127.0.0.1 \
    https://chuangchi.cc/ >/dev/null
  curl --noproxy '*' --fail --silent --show-error \
    --resolve chuangchi.cc:443:127.0.0.1 \
    https://chuangchi.cc/sitemap.xml >/dev/null
}

switch_to() {
  local release="$1"
  local next_link="${CURRENT_PATH}.next"
  ln -sfn "$release" "$next_link"
  mv -Tf "$next_link" "$CURRENT_PATH"
}

rollback() {
  local current_real previous
  current_real="$(readlink -f "$CURRENT_PATH")"
  previous="$(find "$RELEASES_DIR" -mindepth 1 -maxdepth 1 -type d \
    ! -samefile "$current_real" -printf '%T@ %p\n' | sort -nr | head -n 1 | cut -d' ' -f2-)"
  [[ -n "$previous" ]] || { echo "没有可回滚的历史版本。" >&2; exit 1; }
  switch_to "$previous"
  if ! verify_live_site; then
    switch_to "$current_real"
    echo "回滚版本验证失败，已恢复原版本。" >&2
    exit 1
  fi
  echo "已回滚到：$previous"
}

deploy() {
  local stamp build_dir release commit previous initial
  stamp="$(date +%Y%m%d-%H%M%S)"
  build_dir="${WORK_DIR}/${stamp}"
  trap 'rm -rf "${build_dir:-}"' EXIT

  git clone --depth 1 --branch "$BRANCH" "$REPO_URL" "${build_dir}/src"
  cd "${build_dir}/src"
  commit="$(git rev-parse --short=12 HEAD)"

  pnpm install --frozen-lockfile
  pnpm lint
  NODE_OPTIONS="--max-old-space-size=1400" GITHUB_PAGES=true pnpm exec next build

  test -s out/index.html
  test -s out/robots.txt
  test -s out/sitemap.xml
  grep -q 'https://chuangchi.cc/' out/sitemap.xml
  grep -q '创驰数字印刷' out/index.html

  release="${RELEASES_DIR}/${stamp}-${commit}"
  mv out "$release"
  printf '%s\n' "$commit" > "${release}/DEPLOYED_COMMIT"

  if [[ -d "$CURRENT_PATH" && ! -L "$CURRENT_PATH" ]]; then
    initial="${RELEASES_DIR}/initial-${stamp}"
    mv "$CURRENT_PATH" "$initial"
    previous="$initial"
  else
    previous="$(readlink -f "$CURRENT_PATH")"
  fi

  switch_to "$release"
  if ! verify_live_site; then
    switch_to "$previous"
    echo "新版本验证失败，已恢复原版本。" >&2
    exit 1
  fi

  echo "部署成功：$commit"
  echo "当前版本：$release"
  echo "上一版本：$previous"
}

case "${1:-deploy}" in
  deploy) deploy ;;
  rollback) rollback ;;
  *) echo "用法：deploy-chuangchi [deploy|rollback]" >&2; exit 2 ;;
esac
