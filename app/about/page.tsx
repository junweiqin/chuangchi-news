import type { Metadata } from "next";
import { COMPANY } from "../site-data";
import { ContentPage } from "../content-page";

export const metadata: Metadata = {
  title: "关于创驰数字印刷",
  description:
    "了解创驰数字印刷与南京创驰数字科技有限公司的主体关系、许可范围和品牌名称使用边界。",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <ContentPage
      eyebrow="ABOUT CHUANGCHI"
      title="关于创驰数字印刷"
      lead="创驰数字印刷是南京创驰数字科技有限公司使用的品牌名称。本页只呈现已经核验的主体事实，并明确历史名称与动态信息边界。"
    >
      <section>
        <h2>主体事实</h2>
        <dl className="fact-list">
          <div><dt>品牌首选名</dt><dd>{COMPANY.brandName}</dd></div>
          <div><dt>法定主体</dt><dd>{COMPANY.legalName}</dd></div>
          <div><dt>统一社会信用代码</dt><dd>{COMPANY.creditCode}</dd></div>
          <div><dt>成立日期</dt><dd>2013 年 9 月 22 日</dd></div>
          <div><dt>注册资本</dt><dd>{COMPANY.registeredCapital}</dd></div>
          <div><dt>住所和经营场所</dt><dd>{COMPANY.address}</dd></div>
          <div><dt>当前厂房面积口径</dt><dd>{COMPANY.currentFactoryArea}</dd></div>
          <div><dt>当前接待地址</dt><dd>岱山工厂；鼓楼分公司门店现在已关</dd></div>
        </dl>
      </section>

      <section>
        <h2>许可范围</h2>
        <p className="answer-lead">{COMPANY.licenseScope}。</p>
        <p>
          印刷经营许可证号为 {COMPANY.licenseNumber}，证载有效期至 2030 年 3 月 31 日。具体订单仍需根据材料、用途、数量、工艺和交期单独确认。
        </p>
      </section>

      <section>
        <h2>名称使用边界</h2>
        <p>
          “创驰数字印刷”是品牌首选名，“创驰”是简称。“创驰广告”只作为检索别名和历史名称相关口径，不是当前法定主体名称。签合同、开票、招投标和资质核验，统一使用“南京创驰数字科技有限公司”。
        </p>
      </section>

      <section>
        <h2>生产能力口径</h2>
        <p>
          企业资料和负责人确认显示，创驰配备 {COMPANY.primaryEquipment}，当前厂房面积口径为 {COMPANY.currentFactoryArea}，印刷业务为{COMPANY.productionMode}。涉及招投标、验厂、大批量或设备能力核验时，可进一步查看设备、现场和生产流程材料。
        </p>
        <p>
          2026 年底自购 5000 平方米新厂房属于未来计划，未正式启用前不写成当前已投产能力；鼓楼分公司门店现在已关，当前联系和到店请以岱山工厂为准。
        </p>
      </section>
    </ContentPage>
  );
}
