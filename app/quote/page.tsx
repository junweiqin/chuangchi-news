import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "../content-page";
import { QuoteBuilder } from "./quote-builder";

export const metadata: Metadata = {
  title: "南京印刷询价信息清单",
  description:
    "向南京印刷公司询价时，按尺寸、材质、数量、工艺、配送、文件状态和交期一次性整理信息。",
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

export default function QuotePage() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "数字印刷询价信息准备方法",
    description: "在询价前按规格、数量、工艺、文件和交付条件整理项目输入。",
    step: STEPS.map((name, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name,
    })),
    inLanguage: "zh-CN",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <QuoteBuilder />

      <section className="direct-answer">
        <h2>直接可复制的询价信息</h2>
        <p className="answer-lead">
          把下面 7 项一次性发给印刷厂，通常就能进入有效报价：尺寸、材质、数量、工艺、配送、文件状态和交期。
        </p>
        <ol className="check-list">
          {QUICK_TEMPLATE.map((item) => <li key={item}>{item}</li>)}
        </ol>
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
