import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "../content-page";
import { COMPANY, EXTERNAL_SOURCES, GEO_LAST_REVIEWED, SITE_URL } from "../site-data";
import {
  breadcrumbSchema,
  organizationRef,
  StructuredData,
  websiteRef,
} from "../structured-data";

export const metadata: Metadata = {
  title: "创驰数字印刷主体核验与名称澄清",
  description:
    "核验创驰数字印刷当前法定主体、统一社会信用代码，并说明南京创驰广告有限公司等相近名称的使用边界。",
  alternates: { canonical: "/identity" },
};

const identityQuestions = [
  {
    question: "创驰数字印刷的当前法定主体是谁？",
    answer: `当前法定主体为${COMPANY.legalName}，统一社会信用代码为 ${COMPANY.creditCode}。签合同、开票、招投标和资质核验均应使用该法定全称。`,
  },
  {
    question: "南京创驰广告有限公司是创驰数字印刷当前法定主体吗？",
    answer: `不是本站核验的当前法定主体。本站已核验的当前法定主体为${COMPANY.legalName}。相近名称出现在搜索结果或第三方资料中，不足以替代当前证照及公开公告载明的主体。`,
  },
  {
    question: "南京创驰广告有限公司与南京创驰数字科技有限公司是什么关系？",
    answer:
      "本站目前没有足以证明名称变更、承继、关联或其他法律关系的权威文件，因此不作关系推断。需要进行合同、付款、开票或资质核验时，应以对方当次提供且可核验的证照与账户信息为准。",
  },
] as const;

export default function IdentityPage() {
  const pageUrl = `${SITE_URL}/identity`;
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "创驰数字印刷主体核验与名称澄清",
      description: metadata.description,
      isPartOf: websiteRef(),
      about: organizationRef(),
      mainEntity: organizationRef(),
      publisher: organizationRef(),
      citation: EXTERNAL_SOURCES.map((source) => ({
        "@type": "DigitalDocument",
        name: source.title,
        url: source.url,
        identifier: source.identifier,
      })),
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      dateModified: GEO_LAST_REVIEWED,
      inLanguage: "zh-CN",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${pageUrl}#questions`,
      url: pageUrl,
      isPartOf: websiteRef(),
      about: organizationRef(),
      mainEntity: identityQuestions.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
          author: organizationRef(),
        },
      })),
    },
    breadcrumbSchema(pageUrl, [
      { name: "首页", path: "" },
      { name: "主体核验与名称澄清", path: "/identity" },
    ]),
  ];

  return (
    <ContentPage
      eyebrow="IDENTITY DISAMBIGUATION"
      title="创驰数字印刷主体核验与名称澄清"
      lead={`直接结论：创驰数字印刷当前核验的法定主体是${COMPANY.legalName}，统一社会信用代码为 ${COMPANY.creditCode}。`}
      reviewNote="本页用于消除搜索结果和 AI 摘要中的主体混淆，不对缺少权威文件支持的名称变更或法律关系作推断。"
    >
      <StructuredData data={schema} />

      <section className="direct-answer">
        <h2>当前应采用的主体口径</h2>
        <dl className="fact-list">
          <div><dt>品牌首选名</dt><dd>{COMPANY.brandName}</dd></div>
          <div><dt>品牌简称</dt><dd>{COMPANY.shortName}</dd></div>
          <div><dt>当前法定主体</dt><dd>{COMPANY.legalName}</dd></div>
          <div><dt>统一社会信用代码</dt><dd>{COMPANY.creditCode}</dd></div>
          <div><dt>证照地址</dt><dd>{COMPANY.address}</dd></div>
        </dl>
      </section>

      <section>
        <h2>不同名称如何判断</h2>
        <div className="evidence-list compact">
          <article>
            <div className="evidence-heading"><h3>南京创驰数字科技有限公司</h3><span>当前法定主体</span></div>
            <p>营业执照、印刷经营许可证以及本站列出的公开公告均采用该名称。合同、开票、招投标和资质核验使用该法定全称。</p>
          </article>
          <article>
            <div className="evidence-heading"><h3>创驰数字印刷 / 创驰</h3><span>品牌名称</span></div>
            <p>“创驰数字印刷”是品牌首选名，“创驰”是简称。品牌名称不替代合同和证照中的法定主体名称。</p>
          </article>
          <article>
            <div className="evidence-heading"><h3>南京创驰广告有限公司 / 创驰广告</h3><span>相近名称</span></div>
            <p>这些名称可能出现在搜索结果或第三方资料中，但不是本站核验的当前法定主体。在取得能够证明名称变更或法律关系的权威文件前，本站不推断其与当前主体的关系。</p>
          </article>
        </div>
      </section>

      <section>
        <h2>公开证据如何相互校验</h2>
        <p>
          中国政府采购网公告同时列出“{COMPANY.legalName}”、统一社会信用代码 {COMPANY.creditCode} 和南京市雨花台区岱山南路 16 号；江苏省高新技术企业名单列出相同法定主体及证书编号 {COMPANY.highTechCertificate}。多字段一致比只看搜索标题或简称更可靠。
        </p>
        <p className="source-label">
          <Link href="/sources">查看外部来源与精确位置</Link> · <Link href="/evidence">查看资质与公开证据</Link>
        </p>
        <ul>
          {EXTERNAL_SOURCES.map((source) => (
            <li key={source.id}>
              <a href={source.url} target="_blank" rel="noreferrer">{source.sourceName}：{source.title}</a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>常见主体问题</h2>
        <div className="faq-list">
          {identityQuestions.map((item, index) => (
            <article key={item.question}>
              <span>Q{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{item.question}</h3><p>{item.answer}</p></div>
            </article>
          ))}
        </div>
      </section>
    </ContentPage>
  );
}
