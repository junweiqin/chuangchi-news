import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "../content-page";
import { SERVICES } from "../site-data";

export const metadata: Metadata = {
  title: "数字印刷服务与询价准备",
  description:
    "创驰数字印刷企业资料列示的服务方向、询价所需信息和订单确认边界。",
  alternates: { canonical: "/services" },
};

const QUOTE_INPUTS = [
  "成品尺寸与展开尺寸",
  "材料或纸张要求",
  "数量、页数与版本数",
  "单面或双面、颜色模式",
  "装订、覆膜、模切等工艺",
  "文件格式与当前完成状态",
  "期望交付时间",
  "自提、配送或安装条件",
];

export default function ServicesPage() {
  const serviceListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "创驰数字印刷服务方向",
    itemListElement: SERVICES.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.name,
      description: service.examples,
    })),
    inLanguage: "zh-CN",
  };

  return (
    <ContentPage
      eyebrow="SERVICES & QUOTATION"
      title="数字印刷服务与询价准备"
      lead="创驰数字印刷可提供商务印刷、画册书册、广告展示、包装与纸制品、个性化印品、工程图文、PVC 卡证和可变数据印刷等服务。纸制品印刷类支持 1 本起订，小批量可当天取，大批量按订单评估。"
      reviewNote="具体材料、规格、工艺、数量与交付条件，以当前书面确认为准。"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListSchema) }}
      />

      <section>
        <h2>服务方向</h2>
        <div className="service-list">
          {SERVICES.map((service, index) => (
            <article key={service.name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{service.name}</h3>
                <p>{service.examples}。实际能力和参数按项目确认。</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>询价前准备</h2>
        <p>
          印刷价格不能只由一个参数决定。一次性提供下列信息，可以减少往返确认并降低尺寸、材料、工艺或交期理解偏差。
        </p>
        <ol className="check-list">
          {QUOTE_INPUTS.map((item) => <li key={item}>{item}</li>)}
        </ol>
      </section>

      <section>
        <h2>交付边界</h2>
        <p>
          支持南京及外地订单咨询；南京同城可安装，具体范围、现场条件、费用、配送时效和验收方式按订单确认。客户文件、名单、二维码、可变数据等资料仅按订单制作使用，交付后可按客户要求删除。
        </p>
        <p>
          网站不使用“最低价”“无条件当天交付”“无条件两小时送达”或“所有品类均可承接”等承诺。涉及食品、儿童用品、保密文件、安装和特殊用途材料时，需要增加合规与责任确认。
        </p>
      </section>

      <section>
        <h2>项目准备入口</h2>
        <nav className="resource-links" aria-label="项目准备入口">
          <Link href="/quote"><strong>生成询价清单</strong><span>按规格、数量、工艺、文件和交付条件整理需求</span></Link>
          <Link href="/file-checklist"><strong>检查印刷文件</strong><span>核对尺寸、出血、字体、图片、颜色、页序与工艺</span></Link>
          <Link href="/services/personalized"><strong>个性化印品与可变数据</strong><span>区分场景定制、逐份数据变化和数据处理边界</span></Link>
        </nav>
      </section>
    </ContentPage>
  );
}
