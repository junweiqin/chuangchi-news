import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "../../content-page";

export const metadata: Metadata = {
  title: "个性化印品与可变数据需求",
  description:
    "个性化印品与可变数据印刷的区别、场景、询价输入、样张和数据边界。",
  alternates: { canonical: "/services/personalized" },
};

const FAQ = [
  {
    question: "个性化印品和可变数据印刷是一回事吗？",
    answer: "不完全相同。个性化印品可以按场景、外观或内容定制；可变数据印刷强调每份成品中的姓名、编号、二维码等数据按记录变化。",
  },
  {
    question: "询价前需要提供哪些信息？",
    answer: "至少应说明用途、尺寸、材料倾向、数量、版本或数据记录数、工艺、文件状态、期望日期和交付方式。",
  },
  {
    question: "涉及姓名或二维码时先做什么？",
    answer: "先确认数据来源和授权，再约定字段模板、样张、唯一性校验、抽检、重印、留存和删除规则。客户文件、名单、二维码、可变数据等资料仅按订单制作使用，交付后可按客户要求删除。",
  },
] as const;

export default function PersonalizedPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
    inLanguage: "zh-CN",
  };

  return (
    <ContentPage
      eyebrow="PERSONALIZED PRINT"
      title="个性化印品与可变数据需求"
      lead="先区分“按场景定制”与“每份数据变化”，再决定设计、文件、数据模板、样张和验收方法。客户文件、名单、二维码、可变数据等资料仅按订单制作使用，交付后可按客户要求删除。"
      reviewNote="该分类来自企业服务资料；具体材料、数量、工艺、数据处理和是否承接，以项目书面确认为准。"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section>
        <h2>两类需求如何区分</h2>
        <dl className="fact-list">
          <div><dt>个性化印品</dt><dd>围绕活动、纪念、礼赠、身份或特定使用场景，调整内容、版式、材料或组合方式。</dd></div>
          <div><dt>可变数据印刷</dt><dd>每份成品中的姓名、编号、二维码、地址或其他字段按数据记录变化，需要模板和数据校验。</dd></div>
          <div><dt>组合需求</dt><dd>同一项目既有外观定制又有逐份变化数据时，应分别确认设计版本和数据记录。</dd></div>
        </dl>
      </section>

      <section>
        <h2>询价输入</h2>
        <ol className="check-list">
          <li>用途、受众和使用日期</li>
          <li>成品尺寸、数量和版本数</li>
          <li>材料倾向、装订和特殊工艺</li>
          <li>设计文件、素材或模板状态</li>
          <li>可变字段、记录数和唯一性要求</li>
          <li>样张、抽检、重印和验收规则</li>
          <li>自提、配送或安装条件</li>
          <li>数据权限、留存和删除要求</li>
        </ol>
      </section>

      <section>
        <h2>常见问题</h2>
        <div className="faq-list">
          {FAQ.map((item, index) => (
            <article key={item.question}>
              <span>Q{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{item.question}</h3><p>{item.answer}</p></div>
            </article>
          ))}
        </div>
        <p>
          可以直接生成 <Link className="inline-link" href="/quote">询价清单</Link>，涉及逐份变化数据时继续查看 <Link className="inline-link" href="/privacy">数据与来源说明</Link>。
        </p>
      </section>
    </ContentPage>
  );
}
