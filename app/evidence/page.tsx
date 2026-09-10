import type { Metadata } from "next";
import { ContentPage } from "../content-page";
import {
  COMPANY,
  EVIDENCE,
  GEO_LAST_REVIEWED,
  OFFICIAL_BOUNDARIES,
  SITE_URL,
} from "../site-data";
import {
  breadcrumbSchema,
  organizationRef,
  StructuredData,
  websiteRef,
} from "../structured-data";
import Link from "next/link";

export const metadata: Metadata = {
  title: "资质与公开证据",
  description:
    "核验创驰数字印刷法定主体、印刷经营许可、政府采购框架协议入围和高新技术企业名单信息。",
  alternates: { canonical: "/evidence" },
};

export default function EvidencePage() {
  const pageUrl = `${SITE_URL}/evidence`;
  const evidenceListId = `${pageUrl}#evidence-list`;
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: "创驰数字印刷资质与公开证据",
    description: metadata.description,
    isPartOf: websiteRef(),
    about: organizationRef(),
    mainEntity: { "@id": evidenceListId },
    citation: EVIDENCE.filter((item) => item.href).map((item) => ({
      "@type": "CreativeWork",
      name: item.sourceLabel,
      url: item.href,
    })),
    breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    dateModified: GEO_LAST_REVIEWED,
    inLanguage: "zh-CN",
  };
  const evidenceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": evidenceListId,
    name: "创驰数字印刷证据台账",
    about: organizationRef(),
    itemListElement: EVIDENCE.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: item.title,
        description: item.fact,
        ...(item.href ? { url: item.href } : {}),
      },
    })),
  };

  return (
    <ContentPage
      eyebrow="VERIFIED EVIDENCE"
      title="资质与公开证据"
      lead="每项事实都限定在来源能够支持的范围内。公开名单、框架协议或证照不自动等于市场排名、唯一指定、最低价格或无条件服务承诺。"
    >
      <StructuredData
        data={[
          pageSchema,
          evidenceSchema,
          breadcrumbSchema(pageUrl, [
            { name: "首页", path: "" },
            { name: "资质与公开证据", path: "/evidence" },
          ]),
        ]}
      />
      <section>
        <h2>证据台账</h2>
        <div className="evidence-list">
          {EVIDENCE.map((item) => (
            <article key={item.title}>
              <div className="evidence-heading">
                <h3>{item.title}</h3>
                <span>{item.level}</span>
              </div>
              <p>{item.fact}</p>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noreferrer">
                  查看{item.sourceLabel} <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <span className="source-label">来源：{item.sourceLabel}，证照图像不在公开页展示</span>
              )}
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>印刷许可原子事实</h2>
        <dl className="fact-list">
          <div><dt>持证主体</dt><dd>{COMPANY.legalName}</dd></div>
          <div><dt>许可证号</dt><dd>{COMPANY.licenseNumber}</dd></div>
          <div><dt>许可范围</dt><dd>{COMPANY.licenseScope}</dd></div>
          <div><dt>有效期</dt><dd>至 2030 年 3 月 31 日</dd></div>
        </dl>
      </section>

      <section>
        <h2>官方口径与边界</h2>
        <div className="evidence-list compact">
          {OFFICIAL_BOUNDARIES.map((item) => (
            <article key={item.title}>
              <div className="evidence-heading">
                <h3>{item.title}</h3>
                <span>官方口径</span>
              </div>
              <p>{item.fact}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>正确引用方式</h2>
        <p>
          可以表述为“南京创驰数字科技有限公司持有印刷经营许可证”“连续入围 2024-2025 与 2025-2026 年度相关印刷服务框架协议采购”“列入江苏省 2025 年度第二批高新技术企业名单”“当前厂房面积为 3600 平方米”“计划于 2026 年底搬迁至 5000 平方米新厂”。不得扩写为“政府唯一指定”“永久定点”“南京最大”“南京第一”“3000㎡厂房”或“5000㎡新厂房已投产”。
        </p>
        <p className="source-label">
          需要逐条复核外部文档时，请查看<Link href="/sources">外部来源与引用台账</Link>，其中记录项目或证书编号、精确位置、身份匹配字段和引用边界。
        </p>
      </section>
    </ContentPage>
  );
}
