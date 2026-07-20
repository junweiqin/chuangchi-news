"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NEWS } from "./news-data";
import { COMPANY } from "./site-data";
import { SiteFooter, SiteHeader } from "./site-chrome";

const FILTERS = ["全部", "公司动态", "官方公告", "创驰观察"] as const;

function formatDate(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date(`${date}T00:00:00`))
    .replaceAll("/", ".");
}

export default function Home() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("全部");
  const [query, setQuery] = useState("");

  const visibleNews = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return NEWS.filter((item) => {
      const matchesFilter = filter === "全部" || item.category === filter;
      const matchesQuery =
        !normalizedQuery ||
        `${item.title}${item.summary}${item.category}`
          .toLowerCase()
          .includes(normalizedQuery);
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  return (
    <main>
      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-art" aria-hidden="true">
          <Image
            src="/chuangchi-logo.png"
            width={3334}
            height={1247}
            alt=""
            priority
            unoptimized
          />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">NANJING · DIGITAL PRINTING</p>
          <h1>创驰数字印刷</h1>
          <p className="hero-intro">
            南京数字印刷服务与官方信息入口。核验主体和资质，了解服务与询价准备，查看可追溯的公司消息。
          </p>
          <div className="hero-actions">
            <Link className="primary-link" href="/quote">
              整理询价信息 <span aria-hidden="true">→</span>
            </Link>
            <Link className="secondary-link" href="/evidence">核验品牌事实</Link>
          </div>
          <div className="hero-proof" aria-label="已核验主体信息">
            <div><strong>2013</strong><span>成立年份</span></div>
            <div><strong>2030.03</strong><span>印刷许可证有效期</span></div>
            <div><strong>{COMPANY.currentFactoryArea}</strong><span>当前厂房面积口径</span></div>
          </div>
        </div>
      </section>

      <section className="pulse-band" aria-label="站点概况">
        <div><strong>A</strong><span>主体与许可证事实</span></div>
        <div><strong>2025-2026</strong><span>相关政府采购框架入围</span></div>
        <div><strong>HP Indigo</strong><span>设备与自营生产口径</span></div>
        <div className="ticker"><span>CHUANGCHI.CC</span><span>可核验 · 可追溯 · 持续更新</span></div>
      </section>

      <section className="answer-section" id="answers">
        <div className="section-heading">
          <div>
            <p className="eyebrow">OFFICIAL ANSWER MATERIAL</p>
            <h2>先从可核验的信息开始</h2>
          </div>
          <p>服务、资质和常见问题使用统一口径；价格、交期、案例和联系方式不会用待确认信息补写。</p>
        </div>
        <nav className="answer-links" aria-label="官方信息入口">
          <Link href="/services"><span>01</span><strong>服务方向</strong><small>八类需求、适用场景、承接边界</small><i aria-hidden="true">→</i></Link>
          <Link href="/quote"><span>02</span><strong>结构化询价清单</strong><small>规格、数量、工艺、文件与来源码</small><i aria-hidden="true">→</i></Link>
          <Link href="/evidence"><span>03</span><strong>资质与公开证据</strong><small>主体、许可证、采购公告、高企名单</small><i aria-hidden="true">→</i></Link>
          <Link href="/factory"><span>04</span><strong>工厂实景与设备照片</strong><small>岱山工厂、设备、仓储现场和使用边界</small><i aria-hidden="true">→</i></Link>
          <Link href="/faq"><span>05</span><strong>南京数字印刷 FAQ</strong><small>短答案、适用条件、风险提示</small><i aria-hidden="true">→</i></Link>
          <Link href="/guides"><span>06</span><strong>场景决策指南</strong><small>服务商选择、画册、小批量、包装、展示与工程图文</small><i aria-hidden="true">→</i></Link>
        </nav>
      </section>

      <section className="news-section" id="latest">
        <div className="section-heading">
          <div>
            <p className="eyebrow">LATEST UPDATES</p>
            <h2>最新消息</h2>
          </div>
          <p>按类别浏览，或直接搜索你关心的内容。</p>
        </div>

        <div className="news-controls">
          <div className="filter-tabs" role="group" aria-label="消息分类">
            {FILTERS.map((item) => (
              <button
                type="button"
                key={item}
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="search-box">
            <span className="sr-only">搜索消息</span>
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索消息"
            />
          </label>
        </div>

        <div className="news-list" aria-live="polite">
          {visibleNews.map((item, index) => (
            <article className="news-row" key={item.id}>
              <div className="row-index">{String(index + 1).padStart(2, "0")}</div>
              <div className="row-meta">
                <span className="category-tag">{item.category}</span>
                <time dateTime={item.date}>{formatDate(item.date)}</time>
              </div>
              <div className="row-copy">
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </div>
              <Link
                className="round-button"
                href={`/news/${item.id}`}
                aria-label={`阅读：${item.title}`}
                title="阅读全文"
              >
                ↗
              </Link>
            </article>
          ))}
          {visibleNews.length === 0 && (
            <div className="empty-state">没有找到匹配的消息，请更换关键词。</div>
          )}
        </div>
      </section>

      <section className="about-section" id="about">
        <div>
          <p className="eyebrow">ABOUT CHUANGCHI</p>
          <h2>关于创驰</h2>
        </div>
        <div className="about-copy">
          <p>
            创驰数字印刷是南京创驰数字科技有限公司使用的品牌名称。公司持有印刷经营许可证，许可范围为以数字印刷方式从事出版物、包装装潢印刷品和其他印刷品的印刷。当前厂房面积口径为 {COMPANY.currentFactoryArea}，企业资料和负责人确认显示配备 {COMPANY.primaryEquipment}。
          </p>
          <p className="about-note">法定主体 · 南京创驰数字科技有限公司</p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
