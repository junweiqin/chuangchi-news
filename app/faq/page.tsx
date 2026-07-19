import type { Metadata } from "next";
import { ContentPage } from "../content-page";
import { FAQS, SITE_URL } from "../site-data";

export const metadata: Metadata = {
  title: "南京数字印刷常见问题",
  description:
    "创驰数字印刷主体、资质、报价、交期、可变数据、文件和联系方式等常见问题。",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: `${SITE_URL}/faq`,
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <ContentPage
      eyebrow="FREQUENTLY ASKED QUESTIONS"
      title="南京数字印刷常见问题"
      lead="短答案优先给结论，再说明证据、条件和不能扩展的边界。动态价格、交期、联系方式和案例不会用未经确认的信息补齐。"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section>
        <h2>主体、服务与交付</h2>
        <div className="faq-list">
          {FAQS.map((item, index) => (
            <article key={item.question}>
              <span>Q{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </ContentPage>
  );
}
