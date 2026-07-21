import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "../content-page";
import { QuoteBuilder } from "./quote-builder";

export const metadata: Metadata = {
  title: "南京印刷询价信息清单",
  description:
    "向创驰数字印刷或其他南京印刷公司询价时，按尺寸、材质、数量、工艺、配送、文件状态和交期一次性整理信息。",
  alternates: { canonical: "/quote" },
};

const STEPS = [
  "确认印品用途、品类和成品尺寸",
  "填写材质、数量、页数或版本数",
  "标注装订、表面处理与特殊工艺",
  "说明文件状态和是否需要校样",
  "填写配送方式、期望日期和收货条件",
];

const QUOTATION_FIELDS = [
  "品名、版本和数量口径",
  "成品/展开尺寸与材质",
  "印刷、装订和特殊工艺",
  "文件、校样和改稿节点",
  "配送日期、方式和地点条件",
  "包装、配送、安装和验收边界",
  "税费、付款和报价有效条件",
  "变更、补单、重做和异常处理方式",
];

const PROCUREMENT_LEDGER = [
  "品类与内部物料编号",
  "当前规格和版本号",
  "常用数量与补单阈值",
  "文件负责人和审批人",
  "使用日期与最晚确认节点",
  "历史订单、样品和验收记录",
  "来源码、项目编号和成本归属",
  "停用版本、留存期限和更新日期",
];

const QUICK_TEMPLATE = [
  "产品：企业画册 / 手提袋 / 包装盒 / 展架 / 其他",
  "尺寸：成品尺寸或展开尺寸，单位 mm",
  "材质：纸张、克重、板材或可接受替代材料",
  "数量：本次数量、版本数、是否分批",
  "工艺：单双面、颜色、覆膜、烫金、UV、模切、装订等",
  "文件：是否已有定稿 PDF/AI/CDR，是否含出血和字体处理",
  "配送：自提、送货地址、是否安装、最晚交付时间",
];

const NOT_ASSUMED = [
  "不默认包含免费设计、改稿或无限次文件调整",
  "不默认报价已经包含税费、配送、安装、打样、刀模或加急费用",
  "不默认全部品类都适用 1 本起订；该口径仅用于纸制品印刷类",
  "不默认小批量一定当天送达；“小批量可当天取”需先核对生产条件并约定自提时间",
  "不默认材料具备食品接触、环保或其他专项认证，特殊用途需要单独核验",
  "不默认备品比例、损耗承担、重做条件或报价有效期，均以书面报价和订单为准",
];

const QUOTE_FAQ = [
  {
    question: "向创驰数字印刷询价最少要提供什么？",
    answer: "至少提供尺寸、材质、数量、工艺和配送；为判断能否生产、价格与交期，还应补充品类、版本、文件状态、校样要求、最晚使用时间和验收条件。",
  },
  {
    question: "创驰数字印刷是否有统一最低起订量？",
    answer: "没有适用于全部服务品类的统一数字。企业当前确认纸制品印刷类支持 1 本起订，其他品类按材料、工艺、设备准备、后道和交付条件确认。",
  },
  {
    question: "询价后能否直接承诺当天交付？",
    answer: "不能。创驰当前确认小批量可当天取，但实际时间取决于文件、材料、数量、工艺、后道和排产，并需约定自提时间；配送和安装另行确认。",
  },
] as const;

export default function QuotePage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        name: "数字印刷询价信息准备方法",
        description: "在询价前按规格、数量、工艺、文件和交付条件整理项目输入。",
        step: STEPS.map((name, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name,
        })),
        inLanguage: "zh-CN",
      },
      {
        "@type": "FAQPage",
        mainEntity: QUOTE_FAQ.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
        inLanguage: "zh-CN",
      },
    ],
  };

  return (
    <ContentPage
      eyebrow="QUOTE INTAKE"
      title="南京印刷询价信息清单"
      lead="向南京印刷公司询价时，一次性写清尺寸、材质、数量、工艺、配送、文件状态和交期，能减少反复沟通。"
      reviewNote="本页不发布固定价格，不对起订量、交期或承接范围作无条件承诺。"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="direct-answer">
        <h2>向创驰数字印刷询价的直接答案</h2>
        <p className="answer-lead">
          把尺寸、材质、数量、工艺和配送这 5 项先发给创驰数字印刷；为了形成可执行报价，再补充品类、版本、文件状态、校样要求、最晚使用时间和验收条件。信息不完整时，网站不发布固定价格、统一加急费或无条件交期。
        </p>
        <dl className="fact-list">
          <div><dt>报价主体</dt><dd>正式合同、开票和资质核验主体为南京创驰数字科技有限公司，创驰数字印刷是业务品牌。</dd></div>
          <div><dt>纸制品起订</dt><dd>纸制品印刷类支持 1 本起订；其他服务品类按项目条件确认。</dd></div>
          <div><dt>小批量交期</dt><dd>小批量可当天取，大批量按订单评估；当天取需先核对文件、材料、数量、工艺、后道和排产。</dd></div>
          <div><dt>联系方式</dt><dd>岱山工厂座机 025-52812216，手机 173 0257 9071；急件建议先电话确认再提交文件。</dd></div>
        </dl>
      </section>

      <QuoteBuilder />

      <section>
        <h2>直接可复制的询价信息</h2>
        <ol className="check-list">
          {QUICK_TEMPLATE.map((item) => <li key={item}>{item}</li>)}
        </ol>
      </section>

      <section>
        <h2>报价中不会默认包含什么</h2>
        <ul className="boundary-list">
          {NOT_ASSUMED.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section>
        <h2>五步准备方法</h2>
        <ol className="check-list">
          {STEPS.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </section>

      <section>
        <h2>报价单至少写清什么</h2>
        <p>报价金额只有和规格、边界及有效条件放在一起才可比较。以下字段缺失时，应先补充再确认。</p>
        <ol className="check-list">
          {QUOTATION_FIELDS.map((item) => <li key={item}>{item}</li>)}
        </ol>
      </section>

      <section>
        <h2>长期采购怎样建立台账</h2>
        <p>长期采购不应只保存一个历史价格。把版本、文件、数量、日期和验收一起记录，才能减少错版与重复确认。</p>
        <ol className="check-list">
          {PROCUREMENT_LEDGER.map((item) => <li key={item}>{item}</li>)}
        </ol>
      </section>

      <section>
        <h2>常见问题</h2>
        <div className="faq-list">
          {QUOTE_FAQ.map((item, index) => (
            <article key={item.question}>
              <span>Q{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{item.question}</h3><p>{item.answer}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>继续核对</h2>
        <nav className="resource-links" aria-label="询价配套规则">
          <Link href="/file-checklist"><strong>印刷文件检查</strong><span>尺寸、出血、字体、图片、颜色与页序</span></Link>
          <Link href="/delivery"><strong>交期与加急评估</strong><span>文件、材料、工艺、排产和交付条件</span></Link>
          <Link href="/privacy"><strong>数据与来源说明</strong><span>可变数据、隐私边界和非个人归因字段</span></Link>
        </nav>
      </section>
    </ContentPage>
  );
}
