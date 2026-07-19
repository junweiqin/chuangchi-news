import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "../content-page";

export const metadata: Metadata = {
  title: "可变数据与询价来源说明",
  description:
    "可变数据印刷的数据最小化、传输、样张、权限、留存与删除边界，以及询价页面的非个人来源字段说明。",
  alternates: { canonical: "/privacy" },
};

const DATA_CHECKS = [
  "明确数据用途、处理范围和授权依据",
  "只提供完成项目所必需的最少字段",
  "约定字段模板、格式、唯一性和空值规则",
  "约定传输方式、接收人和访问权限",
  "先用脱敏或测试数据完成样张确认",
  "确认批量生成、抽检、重印和验收方法",
  "约定文件、样张、废品和备份的留存期限",
  "项目完成后按约定返还或删除数据",
] as const;

export default function PrivacyPage() {
  return (
    <ContentPage
      eyebrow="DATA & ATTRIBUTION"
      title="可变数据与询价来源说明"
      lead="姓名、编号、二维码等张张不同的印刷需求，需要同时管理字段准确、数据权限、传输、样张、抽检和项目结束后的处置。"
      reviewNote="本页是项目沟通边界，不替代双方的数据处理协议、保密协议或适用法律要求。"
    >
      <section>
        <h2>可变数据八项确认</h2>
        <ol className="check-list">
          {DATA_CHECKS.map((item) => <li key={item}>{item}</li>)}
        </ol>
      </section>

      <section>
        <h2>询价页面记录什么</h2>
        <dl className="fact-list">
          <div><dt>可能读取</dt><dd><code>utm_source</code>、<code>utm_medium</code>、<code>utm_campaign</code>、<code>cc_source</code>、<code>cc_channel</code>、<code>ai_source</code> 和 <code>prompt_topic</code>。</dd></div>
          <div><dt>本机保存</dt><dd>只保存首次来源等非个人归因字段，用于区分 AI、搜索、内容平台或直接访问。</dd></div>
          <div><dt>不在本机持久保存</dt><dd>询价工具中填写的尺寸、材料、数量、工艺、文件状态和备注。</dd></div>
          <div><dt>不要求填写</dt><dd>姓名、电话、微信、邮箱、身份证号等身份与联系信息。</dd></div>
          <div><dt>用户控制</dt><dd>询价工具提供“清除来源记录”，同时移除当前地址中的来源参数。</dd></div>
        </dl>
      </section>

      <section>
        <h2>归因边界</h2>
        <p>
          来源参数和自报渠道只能说明一次访问或咨询可能来自某个入口，不能单独证明最终成交由某个平台造成。正式复盘需要结合首次来源、顾问补录、线索阶段和成交记录，并区分直接、可恢复和不可观察归因。
        </p>
        <p>
          返回 <Link className="inline-link" href="/quote">结构化询价清单</Link>，或先查看 <Link className="inline-link" href="/services/personalized">个性化印品与可变数据的区别</Link>。
        </p>
      </section>
    </ContentPage>
  );
}
