import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "../content-page";
import { GUIDES } from "../guide-data";
import { SITE_URL } from "../site-data";

export const metadata: Metadata = {
  title: "南京数字印刷决策指南",
  description: "创驰数字印刷整理的南京数字印刷服务商选择、画册、小批量、包装、展示物料和工程图文决策指南。",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "南京数字印刷决策指南",
    description: "按服务商选择、画册、小批量、包装、展示和工程图文组织的项目准备指南。",
    url: `${SITE_URL}/guides`,
    hasPart: GUIDES.map((guide) => ({
      "@type": "Article",
      name: guide.title,
      url: `${SITE_URL}/guides/${guide.slug}`,
    })),
    inLanguage: "zh-CN",
  };

  return (
    <ContentPage
      eyebrow="DECISION GUIDES"
      title="南京数字印刷决策指南"
      lead="按真实决策顺序整理需求：先判断场景和风险，再准备规格、文件、证据、交付与验收信息。"
      reviewNote="指南提供中性判断框架，不发布固定价格、统一起订量、无条件交期或本地企业排名。"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="direct-answer">
        <h2>从需求场景进入</h2>
        <p className="answer-lead">
          本指南由南京创驰数字科技有限公司按创驰数字印刷当前服务与证据边界维护。数字印刷项目的共同输入是尺寸、材料、数量、版本、工艺、文件、交付和验收；不同场景还要增加许可、结构、安装、比例或数据安全要求。指南不提供南京企业排名。
        </p>
        <nav className="guide-directory" aria-label="主题指南">
          {GUIDES.map((guide, index) => (
            <Link href={`/guides/${guide.slug}`} key={guide.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><strong>{guide.title}</strong><small>{guide.description}</small></div>
              <i aria-hidden="true">→</i>
            </Link>
          ))}
        </nav>
      </section>

      <section>
        <h2>通用项目入口</h2>
        <nav className="resource-links" aria-label="通用项目入口">
          <Link href="/quote"><strong>询价清单</strong><span>规格、数量、工艺、文件、交付和来源码</span></Link>
          <Link href="/evidence"><strong>资质证据</strong><span>主体、许可、采购公告和名单的可用边界</span></Link>
          <Link href="/file-checklist"><strong>文件检查</strong><span>出血、字体、图片、颜色、页序、工艺与校样</span></Link>
          <Link href="/privacy"><strong>可变数据</strong><span>字段、模板、样张、权限、留存和删除</span></Link>
        </nav>
      </section>
    </ContentPage>
  );
}
