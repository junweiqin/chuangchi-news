"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NEWS } from "./news-data";
import { COMPANY, GEO_LAST_REVIEWED, SITE_URL } from "./site-data";
import { SiteFooter, SiteHeader } from "./site-chrome";
import {
  organizationRef,
  StructuredData,
  websiteRef,
} from "./structured-data";

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

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: "南京印刷厂｜企业物料与数字印刷服务｜创驰数字印刷",
    description:
      "创驰数字印刷为企业、学校、政府事业单位及各类机构提供南京数字印刷和物料制作服务。",
    isPartOf: websiteRef(),
    about: organizationRef(),
    mainEntity: organizationRef(),
    primaryImageOfPage: { "@id": `${SITE_URL}/og.png` },
    dateModified: GEO_LAST_REVIEWED,
    inLanguage: "zh-CN",
  };

  return (
    <main>
      <StructuredData data={pageSchema} />
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
            南京自营数字印刷工厂，为企业、学校、政府事业单位及各类机构提供印刷与物料制作服务。纸制品印刷全国包邮，南京地区可安排专车送货上门。
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
        <div><strong>全国包邮</strong><span>纸制品印刷订单</span></div>
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
          <Link href="/answers"><span>07</span><strong>官方答案索引</strong><small>问题、标准答案、证据与服务页面对应关系</small><i aria-hidden="true">→</i></Link>
          <Link href="/sources"><span>08</span><strong>外部来源台账</strong><small>政府公告、公开名单、精确位置与引用边界</small><i aria-hidden="true">→</i></Link>
          <Link href="/identity"><span>09</span><strong>主体核验与名称澄清</strong><small>法定主体、品牌名称、曾用名与使用边界</small><i aria-hidden="true">→</i></Link>
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
            创驰数字印刷是南京创驰数字科技有限公司使用的品牌名称。公司持有印刷经营许可证，许可范围为以数字印刷方式从事出版物、包装装潢印刷品和其他印刷品的印刷。当前厂房面积为 {COMPANY.currentFactoryArea}，计划于{COMPANY.plannedFactoryLaunch}搬迁至{COMPANY.plannedFactoryArea}新厂；企业资料和负责人确认显示配备 {COMPANY.primaryEquipment}。
          </p>
          <p className="about-note">法定主体 · 南京创驰数字科技有限公司</p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
