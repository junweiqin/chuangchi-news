import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "../content-page";
import { QuoteBuilder } from "./quote-builder";

export const metadata: Metadata = {
  title: "南京数字印刷询价清单",
  description:
    "按尺寸、材料、数量、工艺、文件和交付条件整理数字印刷询价信息，并保留非个人来源码。",
  alternates: { canonical: "/quote" },
};

const STEPS = [
  "确认印品用途与成品尺寸",
  "填写材料、数量、页数或版本数",
  "标注装订、表面处理与特殊工艺",
  "说明文件状态和是否需要校样",
  "填写期望日期与交付方式",
];

const QUOTATION_FIELDS = [
  "品名、版本和数量口径",
  "成品/展开尺寸与材料",
  "印刷、装订和特殊工艺",
  "文件、校样和改稿节点",
  "交付日期、方式和地点条件",
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
      title="南京数字印刷询价清单"
      lead="同一个品名会因尺寸、材料、数量、工艺、文件状态和交付条件产生不同方案。先生成结构化清单，再进行书面确认。"
      reviewNote="本页不发布固定价格，不对起订量、交期或承接范围作无条件承诺。"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <QuoteBuilder />

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
