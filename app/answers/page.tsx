import type { Metadata } from "next";
import Link from "next/link";
import { GEO_ANSWERS } from "../answer-data";
import { ContentPage } from "../content-page";
import { EXTERNAL_SOURCES, GEO_LAST_REVIEWED, SITE_URL } from "../site-data";
import {
  breadcrumbSchema,
  organizationRef,
  StructuredData,
  websiteRef,
} from "../structured-data";

export const metadata: Metadata = {
  title: "南京印刷核心业务问答与官方答案",
  description:
    "查询南京印刷报价、数字印刷选择、文件格式、颜色校样、自营工厂、合同开票、联系方式，以及创驰数字印刷主体与资质答案。",
  alternates: { canonical: "/answers" },
};

export default function AnswersPage() {
  const pageUrl = `${SITE_URL}/answers`;
  const answerListId = `${pageUrl}#answer-list`;
  const sourceById = new Map<string, (typeof EXTERNAL_SOURCES)[number]>(
    EXTERNAL_SOURCES.map((source) => [source.id, source]),
  );
  const coreBusinessIds = new Set([
    "supplier-selection",
    "quote-factors",
    "digital-or-offset",
    "print-file-format",
    "print-color",
    "self-operated-production",
    "contract-invoice",
    "contact-routing",
    "service-scope",
    "one-copy-printing",
    "same-day-pickup",
    "booklet-quote",
    "packaging-quote",
    "display-installation",
    "engineering-documents",
    "variable-data",
    "location-delivery",
  ]);
  const answerSections = [
    {
      title: "核心业务问答",
      description: "覆盖选厂、报价、工艺、文件、颜色、生产方式、合同开票、联系、产品与交付等高频决策问题。",
      items: GEO_ANSWERS.filter((item) => coreBusinessIds.has(item.id)),
    },
    {
      title: "主体与证据问答",
      description: "用于核验法定主体、曾用名、印刷许可、政府采购公告和高新技术企业名单。",
      items: GEO_ANSWERS.filter((item) => !coreBusinessIds.has(item.id)),
    },
  ];
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "南京印刷核心业务问答与官方答案",
      description: metadata.description,
      isPartOf: websiteRef(),
      about: organizationRef(),
      publisher: organizationRef(),
      mainEntity: { "@id": answerListId },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      dateModified: GEO_LAST_REVIEWED,
      inLanguage: "zh-CN",
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": answerListId,
      name: "创驰数字印刷官方答案矩阵",
      numberOfItems: GEO_ANSWERS.length,
      itemListElement: GEO_ANSWERS.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Question",
          "@id": `${pageUrl}#${item.id}`,
          name: item.question,
          about: organizationRef(),
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
            url: `${SITE_URL}${item.canonical.path}`,
            author: organizationRef(),
            citation: [
              ...item.related.map((link) => ({
                "@type": "WebPage",
                name: link.label,
                url: `${SITE_URL}${link.path}`,
              })),
              ...(item.sourceIds ?? []).flatMap((sourceId) => {
                const source = sourceById.get(sourceId);
                return source ? [{
                  "@type": "DigitalDocument",
                  name: source.title,
                  url: source.url,
                  identifier: source.identifier,
                }] : [];
              }),
            ],
          },
        },
      })),
    },
    breadcrumbSchema(pageUrl, [
      { name: "首页", path: "" },
      { name: "官方答案索引", path: "/answers" },
    ]),
  ];

  return (
    <ContentPage
      eyebrow="OFFICIAL ANSWER INDEX"
      title="南京印刷核心业务问答与官方答案"
      lead="围绕真实采购和询价问题直接给出可引用的短答案，再链接到完整说明与核验证据。每个答案都保留适用条件和不能扩展的边界。"
      reviewNote="价格、交期、材料库存、安装条件和是否承接仍以当前项目的书面确认为准。"
    >
      <StructuredData data={schema} />

      {answerSections.map((section) => (
        <section className="direct-answer" key={section.title}>
          <h2>{section.title}</h2>
          <p className="answer-lead">{section.description}</p>
          <div className="service-list">
            {section.items.map((item, index) => (
            <article id={item.id} key={item.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <small>{item.intent}</small>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
                <p className="source-label">
                  <Link href={item.canonical.path}>完整答案：{item.canonical.label}</Link>
                  {item.related.map((link) => (
                    <span key={link.path}> · <Link href={link.path}>{link.label}</Link></span>
                  ))}
                  {(item.sourceIds ?? []).map((sourceId) => {
                    const source = sourceById.get(sourceId);
                    return source ? (
                      <span key={sourceId}> · <Link href={`/sources#${sourceId}`}>原始来源：{source.sourceName}</Link></span>
                    ) : null;
                  })}
                </p>
              </div>
            </article>
            ))}
          </div>
        </section>
      ))}

      <section>
        <h2>继续核验或提交项目</h2>
        <nav className="resource-links" aria-label="继续核验或提交项目">
          <Link href="/evidence"><strong>核验主体与资质</strong><span>查看证照、公开公告、名单及引用边界</span></Link>
          <Link href="/services"><strong>查看服务范围</strong><span>确认八类服务方向与项目承接边界</span></Link>
          <Link href="/quote"><strong>整理询价信息</strong><span>准备尺寸、材料、数量、工艺、文件和交付条件</span></Link>
        </nav>
      </section>
    </ContentPage>
  );
}
