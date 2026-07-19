import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentPage } from "../../content-page";
import { getGuide, GUIDES } from "../../guide-data";
import { COMPANY, SITE_URL } from "../../site-data";

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
      url: `${SITE_URL}/guides/${guide.slug}`,
    },
  };
}

export default async function GuideDetailPage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) notFound();

  const pageUrl = `${SITE_URL}/guides/${guide.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: guide.title,
        description: guide.description,
        dateCreated: "2026-07-19",
        dateModified: "2026-07-19",
        inLanguage: "zh-CN",
        mainEntityOfPage: pageUrl,
        author: {
          "@type": "Organization",
          name: COMPANY.legalName,
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: COMPANY.legalName,
          url: SITE_URL,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: guide.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
        inLanguage: "zh-CN",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "首页", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "决策指南", item: `${SITE_URL}/guides` },
          { "@type": "ListItem", position: 3, name: guide.title, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <ContentPage
      eyebrow={guide.eyebrow}
      title={guide.title}
      lead={guide.lead}
      reviewNote={guide.reviewNote}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <nav className="breadcrumbs" aria-label="面包屑">
        <Link href="/">首页</Link><span aria-hidden="true">/</span>
        <Link href="/guides">决策指南</Link><span aria-hidden="true">/</span>
        <span>{guide.title}</span>
      </nav>

      <section className="direct-answer">
        <h2>直接答案</h2>
        <p className="answer-lead">{guide.directAnswer}</p>
        <dl className="fact-list">
          {guide.summary.map((item) => (
            <div key={item.title}><dt>{item.title}</dt><dd>{item.answer}</dd></div>
          ))}
        </dl>
      </section>

      <section>
        <h2>判断框架</h2>
        <div className="service-list">
          {guide.decisions.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{item.title}</h3><p>{item.answer}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>项目准备清单</h2>
        <ol className="check-list">
          {guide.checklist.map((item) => <li key={item}>{item}</li>)}
        </ol>
      </section>

      <section>
        <h2>风险与使用边界</h2>
        <dl className="fact-list">
          {guide.risks.map((item) => (
            <div key={item.title}><dt>{item.title}</dt><dd>{item.answer}</dd></div>
          ))}
        </dl>
      </section>

      <section>
        <h2>常见问题</h2>
        <div className="faq-list">
          {guide.faq.map((item, index) => (
            <article key={item.question}>
              <span>Q{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{item.question}</h3><p>{item.answer}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>核验与下一步</h2>
        <nav className="resource-links" aria-label="核验与下一步">
          <Link href="/evidence"><strong>核验主体与资质</strong><span>查看法定主体、许可证和公开证据的适用边界</span></Link>
          <Link href="/quote"><strong>生成结构化询价清单</strong><span>整理尺寸、材料、数量、工艺、文件、交付和来源码</span></Link>
          <Link href="/file-checklist"><strong>检查印刷文件</strong><span>核对尺寸、出血、字体、图片、颜色、页序和校样</span></Link>
        </nav>
        <p className="source-label">内容维护：{COMPANY.legalName} · 最近更新：2026-07-19</p>
      </section>
    </ContentPage>
  );
}
