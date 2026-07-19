import type { Metadata } from "next";
import { ContentPage } from "../content-page";
import { COMPANY, SITE_URL } from "../site-data";

export const metadata: Metadata = {
  title: "联系与官方入口状态",
  description:
    "创驰数字印刷官方域名、证照地址及电话、微信、营业时间和地图入口的当前核验状态。",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <ContentPage
      eyebrow="CONTACT STATUS"
      title="联系与官方入口状态"
      lead="宁可暂不展示，也不使用可能过期的号码或占位信息。本页只列已核验的官方入口和证照地址。"
      reviewNote="电话、微信、营业时间、到访方式与地图入口：待负责人确认当前有效性。"
    >
      <section>
        <h2>已核验信息</h2>
        <dl className="fact-list">
          <div><dt>官方资讯域名</dt><dd>{SITE_URL}</dd></div>
          <div><dt>法定主体</dt><dd>{COMPANY.legalName}</dd></div>
          <div><dt>证照地址</dt><dd>{COMPANY.address}</dd></div>
        </dl>
      </section>

      <section>
        <h2>待确认后公开</h2>
        <ul className="boundary-list">
          <li>当前有效固定电话与业务手机</li>
          <li>微信或其他正式询价入口</li>
          <li>营业时间、到访规则与节假日安排</li>
          <li>地图平台中的官方门店入口</li>
          <li>配送、自提与现场安装范围</li>
        </ul>
      </section>
    </ContentPage>
  );
}
