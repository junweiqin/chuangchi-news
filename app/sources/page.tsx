import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "../content-page";
import { EXTERNAL_SOURCES, GEO_LAST_REVIEWED, SITE_URL } from "../site-data";
import {
  breadcrumbSchema,
  organizationRef,
  StructuredData,
  websiteRef,
} from "../structured-data";

export const metadata: Metadata = {
  title: "创驰外部来源与引用台账",
  description:
    "查看创驰数字印刷工商名称变更记录、政府采购公告和高新技术企业名单的官方来源、精确位置、身份匹配字段及可引用边界。",
  alternates: { canonical: "/sources" },
};

export default function SourcesPage() {
  const pageUrl = `${SITE_URL}/sources`;
  const sourceListId = `${pageUrl}#source-list`;
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "创驰外部来源与引用台账",
      description: metadata.description,
      isPartOf: websiteRef(),
      about: organizationRef(),
      publisher: organizationRef(),
      mainEntity: { "@id": sourceListId },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      dateModified: GEO_LAST_REVIEWED,
      inLanguage: "zh-CN",
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": sourceListId,
      name: "创驰数字印刷外部公开来源",
      numberOfItems: EXTERNAL_SOURCES.length,
      itemListElement: EXTERNAL_SOURCES.map((source, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "DigitalDocument",
          "@id": `${pageUrl}#${source.id}`,
          name: source.title,
          url: source.url,
          identifier: source.identifier,
          [source.schemaDateProperty]: source.documentDate,
          publisher: {
            "@type": "Organization",
            name: source.issuingOrganization,
          },
          about: organizationRef(),
          description: source.supports,
        },
      })),
    },
    breadcrumbSchema(pageUrl, [
      { name: "首页", path: "" },
      { name: "外部来源与引用台账", path: "/sources" },
    ]),
  ];

  return (
    <ContentPage
      eyebrow="EXTERNAL SOURCE LEDGER"
      title="创驰外部来源与引用台账"
      lead="本页把可公开访问的第三方来源、文档定位、身份匹配字段和可引用边界放在一起，便于搜索引擎、AI 系统和采购核验人员复查。"
      reviewNote="外部来源只支持其文档明确载明的事实，不替代当前订单、证照原件或书面服务确认。"
    >
      <StructuredData data={schema} />

      <section>
        <h2>公开来源记录</h2>
        <div className="evidence-list">
          {EXTERNAL_SOURCES.map((source) => (
            <article id={source.id} key={source.id}>
              <div className="evidence-heading">
                <h3>{source.title}</h3>
                <span>外部公开来源</span>
              </div>
              <dl className="fact-list">
                <div><dt>来源</dt><dd>{source.sourceName}</dd></div>
                <div><dt>发布或文件机构</dt><dd>{source.issuingOrganization}</dd></div>
                <div><dt>{source.documentDateLabel}</dt><dd>{source.documentDate}</dd></div>
                <div><dt>标识编号</dt><dd>{source.identifier}</dd></div>
                <div><dt>精确位置</dt><dd>{source.locator}</dd></div>
                <div><dt>身份匹配字段</dt><dd>{source.matchedIdentity}</dd></div>
                <div><dt>能够证明</dt><dd>{source.supports}</dd></div>
                <div><dt>不能扩展为</dt><dd>{source.limitation}</dd></div>
                <div><dt>最近核验</dt><dd>{source.verifiedAt}</dd></div>
              </dl>
              <a href={source.url} target="_blank" rel="noreferrer">
                打开原始来源 <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>引用规则</h2>
        <ul className="boundary-list">
          <li>引用时同时保留公司法定全称、项目或证书编号以及精确位置。</li>
          <li>框架协议入围只按公告对应年度、区域、采购包和服务范围表述。</li>
          <li>高新技术企业名单只证明名单收录和证书编号，不替代具体印刷能力证据。</li>
          <li>厂房、设备、交期、价格和订单能力使用各自证据，不由名单或公告推导。</li>
        </ul>
      </section>

      <section>
        <h2>返回官方答案</h2>
        <nav className="resource-links" aria-label="返回官方答案">
          <Link href="/answers"><strong>官方答案索引</strong><span>查看问题、标准答案与来源的对应关系</span></Link>
          <Link href="/evidence"><strong>资质与公开证据</strong><span>查看证照、公告、名单及事实边界</span></Link>
          <Link href="/about"><strong>主体事实</strong><span>核对品牌、法定主体和官网关系</span></Link>
        </nav>
      </section>
    </ContentPage>
  );
}
