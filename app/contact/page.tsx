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
      lead="本页列出已确认可公开的官方域名、证照地址、业务咨询电话和工厂营业时间。涉及到店、加急、安装或大批量订单，建议先电话确认。"
      reviewNote="节假日、特殊排产、现场安装范围和地图平台入口仍按当次沟通确认。"
    >
      <section>
        <h2>已核验信息</h2>
        <dl className="fact-list">
          <div><dt>官方资讯域名</dt><dd>{SITE_URL}</dd></div>
          <div><dt>法定主体</dt><dd>{COMPANY.legalName}</dd></div>
          <div><dt>证照地址</dt><dd>{COMPANY.address}</dd></div>
          <div><dt>业务咨询电话/微信同号</dt><dd>{COMPANY.phone}</dd></div>
          <div><dt>工厂营业时间</dt><dd>{COMPANY.weekdayHours}；{COMPANY.weekendHours}</dd></div>
          <div><dt>安装范围</dt><dd>南京同城可安装，具体范围、现场条件和费用按订单确认。</dd></div>
        </dl>
      </section>

      <section>
        <h2>到访与沟通建议</h2>
        <ul className="boundary-list">
          <li>到店前建议电话确认当日排产、取件时间和接待安排。</li>
          <li>小批量可当天取，大批量按订单评估。</li>
          <li>支持南京及外地订单咨询，配送和时效按订单确认。</li>
          <li>地图平台中的官方门店入口</li>
        </ul>
      </section>
    </ContentPage>
  );
}
