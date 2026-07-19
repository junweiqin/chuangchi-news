import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "../content-page";

export const metadata: Metadata = {
  title: "印刷交期与加急评估",
  description:
    "数字印刷交期和加急需求的文件、材料、数量、工艺、排产、配送与验收条件核对方法。",
  alternates: { canonical: "/delivery" },
};

const DELIVERY_FACTORS = [
  ["文件", "是否为可生产文件，是否完成内容、尺寸、页序、工艺与校样确认。"],
  ["材料", "所需纸张、板材、配件或包装是否需要采购、替代或再次确认。"],
  ["数量", "总数量、版本数、分批方式和损耗要求会影响生产安排。"],
  ["工艺", "装订、覆膜、模切、粘接、安装等后道环节需要单独核对。"],
  ["排产", "可用设备、当前任务和各工序衔接情况需要在接单时确认。"],
  ["交付", "自提、配送、安装、分批交付、地点条件和验收人都可能影响完成时间。"],
] as const;

const FAQ = [
  {
    question: "加急订单能否无条件当天交付？",
    answer: "不能。应先核对文件、材料、数量、工艺、排产和交付条件，再形成书面时间节点。",
  },
  {
    question: "交期从什么时候开始计算？",
    answer: "应在项目中明确起算条件。常见起算节点涉及文件、方案、校样、材料和付款等确认，但具体以双方书面约定为准。",
  },
  {
    question: "怎样降低急件风险？",
    answer: "尽早提供完整文件和规格，减少未确认版本，明确可替代材料、分批交付方案和最终验收人。",
  },
] as const;

export default function DeliveryPage() {
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
      eyebrow="DELIVERY CONDITIONS"
      title="印刷交期与加急评估"
      lead="交期不是孤立数字。先确认文件、材料、数量、工艺、排产和交付六类条件，再约定可验收的时间节点。"
      reviewNote="网站不作“保证当天交付”或“无条件加急”承诺，实际时间以项目书面确认为准。"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section>
        <h2>六类交期条件</h2>
        <dl className="fact-list">
          {DELIVERY_FACTORS.map(([name, text]) => (
            <div key={name}><dt>{name}</dt><dd>{text}</dd></div>
          ))}
        </dl>
      </section>

      <section>
        <h2>急件沟通顺序</h2>
        <ol className="check-list">
          <li>提供期望日期、最晚验收时间和使用场景</li>
          <li>提交可检查文件并冻结版本</li>
          <li>确认可用材料和可替代方案</li>
          <li>拆分必须工艺与可调整工艺</li>
          <li>确认自提、配送、安装和分批方式</li>
          <li>以书面节点确认生产与验收责任</li>
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
          准备询价时，可把目标日期和交付方式写入 <Link className="inline-link" href="/quote">询价清单</Link>。
        </p>
      </section>
    </ContentPage>
  );
}
