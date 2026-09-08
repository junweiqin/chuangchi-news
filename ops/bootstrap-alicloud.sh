#!/usr/bin/env bash
set -Eeuo pipefail

NODE_VERSION="22.23.2"
NODE_ARCHIVE="node-v${NODE_VERSION}-linux-x64.tar.xz"
NODE_SHA256="d60acfe00a2932254bb0ad20e01b0d74397a0875595de719654b214f4b03f307"
NODE_DIR="/opt/node-v${NODE_VERSION}-linux-x64"
REPO_RAW="https://raw.githubusercontent.com/junweiqin/chuangchi-news/main"

if [[ "$(id -u)" -ne 0 ]]; then
  echo "请使用 root 用户执行。" >&2
  exit 1
fi

dnf install -y git xz

if [[ ! -x "${NODE_DIR}/bin/node" ]]; then
  archive="$(mktemp)"
  trap 'rm -f "${archive:-}"' EXIT
  curl -fL "https://nodejs.org/dist/v${NODE_VERSION}/${NODE_ARCHIVE}" -o "$archive"
  printf '%s  %s\n' "$NODE_SHA256" "$archive" | sha256sum -c -
  tar -xJf "$archive" -C /opt
fi

for binary in node npm npx; do
  ln -sfn "${NODE_DIR}/bin/${binary}" "/usr/local/bin/${binary}"
done

"${NODE_DIR}/bin/npm" install --global pnpm@11.7.0
ln -sfn "${NODE_DIR}/bin/pnpm" /usr/local/bin/pnpm

curl -fL "${REPO_RAW}/ops/deploy-alicloud.sh" -o /usr/local/sbin/deploy-chuangchi
chmod 0755 /usr/local/sbin/deploy-chuangchi

git --version
node --version
pnpm --version
echo "部署环境安装完成。"
