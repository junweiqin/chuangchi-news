"use client";

import { useMemo, useState } from "react";

type Category = "公司动态" | "官方公告" | "创驰观察";

type NewsItem = {
  id: number;
  category: Category;
  date: string;
  title: string;
  summary: string;
  content: string[];
  featured?: boolean;
};

const NEWS: NewsItem[] = [
  {
    id: 1,
    category: "公司动态",
    date: "2026-07-15",
    title: "创驰官方资讯站正式上线",
    summary:
      "chuangchi.cc 将作为创驰面向公众发布公司进展、重要公告与观点内容的统一窗口。",
    content: [
      "今天起，chuangchi.cc 正式启用。网站将持续收录创驰的最新动态、重要公告与阶段性思考，让每一次更新都有清晰、稳定的公开出处。",
      "当前版本首先完成资讯发布与浏览体验。后续内容将按照时间与类别持续更新，并在资料确认后补充正式的公司介绍、业务信息与联络方式。",
      "感谢关注创驰。所有正式发布均以本网站展示内容为准。",
    ],
    featured: true,
  },
  {
    id: 2,
    category: "官方公告",
    date: "2026-07-15",
    title: "关于网站内容发布与更新的说明",
    summary:
      "建立清晰的信息发布规则，确保每条消息来源明确、时间准确、内容可追溯。",
    content: [
      "本站发布内容分为公司动态、官方公告和创驰观察三类。公司动态记录业务与团队进展；官方公告用于重要事项说明；创驰观察用于分享经过审核的行业观点。",
      "每条内容会标注发布日期与所属类别。内容如有更新，将在正文中说明变更时间，避免过期信息造成误解。",
      "未经本站发布或确认的信息，不代表创驰官方立场。",
    ],
  },
  {
    id: 3,
    category: "创驰观察",
    date: "2026-07-15",
    title: "从信息到信任：为什么要建立长期资讯窗口",
    summary:
      "稳定、准确、可检索的公开信息，是公司与客户、伙伴保持有效沟通的基础。",
    content: [
      "信息发布不只是告知，更是长期信任的一部分。零散消息容易被遗漏，也难以形成连续的认知。",
      "创驰资讯站会把重要进展沉淀为可检索的公开记录，让关注者可以快速了解最新状态，也能回看变化的过程。",
      "我们会优先保证准确与清晰，再逐步丰富内容形式。",
    ],
  },
];

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
  const [selected, setSelected] = useState<NewsItem | null>(null);

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

  const featured = NEWS.find((item) => item.featured) ?? NEWS[0];

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="创驰资讯首页">
          <span className="brand-mark" aria-hidden="true">
            CC
          </span>
          <span className="brand-name">
            创驰
            <small>CHUANGCHI</small>
          </span>
        </a>
        <nav aria-label="主导航">
          <a href="#latest">最新消息</a>
          <a href="#about">关于创驰</a>
        </nav>
        <span className="status"><i />持续更新中</span>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">CHUANGCHI NEWSROOM · 官方资讯</p>
          <h1>让每一次进展，<br />都被清晰看见。</h1>
          <p className="hero-intro">
            汇集创驰最新动态、官方公告与阶段性思考。准确发布，持续记录。
          </p>
          <a className="primary-link" href="#latest">
            浏览最新消息 <span aria-hidden="true">↓</span>
          </a>
        </div>

        <article className="featured-card">
          <div className="featured-topline">
            <span>最新发布</span>
            <time dateTime={featured.date}>{formatDate(featured.date)}</time>
          </div>
          <div className="feature-number" aria-hidden="true">01</div>
          <div className="featured-body">
            <span className="category-tag">{featured.category}</span>
            <h2>{featured.title}</h2>
            <p>{featured.summary}</p>
            <button type="button" onClick={() => setSelected(featured)}>
              阅读全文 <span aria-hidden="true">↗</span>
            </button>
          </div>
        </article>
      </section>

      <section className="pulse-band" aria-label="站点概况">
        <div><strong>01</strong><span>统一发布窗口</span></div>
        <div><strong>03</strong><span>资讯内容分类</span></div>
        <div><strong>2026.07</strong><span>正式启用</span></div>
        <div className="ticker"><span>CHUANGCHI.CC</span><span>清晰 · 准确 · 持续</span></div>
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
              <button
                className="round-button"
                type="button"
                onClick={() => setSelected(item)}
                aria-label={`阅读：${item.title}`}
                title="阅读全文"
              >
                ↗
              </button>
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
            创驰正在建立面向客户、伙伴与公众的长期信息窗口。正式公司介绍、业务范围与联络方式将在资料确认后发布。
          </p>
          <p className="about-note">官方域名 · chuangchi.cc</p>
        </div>
      </section>

      <footer>
        <div className="footer-brand">创驰 <span>CHUANGCHI</span></div>
        <p>© 2026 创驰 · 官方资讯站</p>
        <a href="#top">返回顶部 ↑</a>
      </footer>

      {selected && (
        <div className="dialog-backdrop" role="presentation" onMouseDown={() => setSelected(null)}>
          <article
            className="article-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="close-button"
              type="button"
              onClick={() => setSelected(null)}
              aria-label="关闭文章"
              title="关闭"
            >
              ×
            </button>
            <div className="dialog-meta">
              <span className="category-tag">{selected.category}</span>
              <time dateTime={selected.date}>{formatDate(selected.date)}</time>
            </div>
            <h2 id="article-title">{selected.title}</h2>
            <p className="dialog-lead">{selected.summary}</p>
            <div className="dialog-content">
              {selected.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <p className="article-source">发布于 chuangchi.cc</p>
          </article>
        </div>
      )}
    </main>
  );
}
