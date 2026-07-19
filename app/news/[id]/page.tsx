import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentPage } from "../../content-page";
import { getNewsItem, NEWS } from "../../news-data";
import { SITE_URL } from "../../site-data";

type NewsPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return NEWS.map((item) => ({ id: String(item.id) }));
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { id } = await params;
  const item = getNewsItem(id);

  if (!item) return {};

  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: `/news/${item.id}` },
    openGraph: {
      title: item.title,
      description: item.summary,
      type: "article",
      url: `${SITE_URL}/news/${item.id}`,
      publishedTime: item.date,
    },
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { id } = await params;
  const item = getNewsItem(id);

  if (!item) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    description: item.summary,
    datePublished: item.date,
    dateModified: item.date,
    mainEntityOfPage: `${SITE_URL}/news/${item.id}`,
    publisher: {
      "@type": "Organization",
      name: "南京创驰数字科技有限公司",
      url: SITE_URL,
    },
  };

  return (
    <ContentPage
      eyebrow={`${item.category} · ${item.date}`}
      title={item.title}
      lead={item.summary}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="news-article-copy">
        {item.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <p className="source-label">发布者：南京创驰数字科技有限公司 · 发布于 chuangchi.cc</p>
      </section>
      <nav className="article-navigation" aria-label="文章导航">
        <Link href="/#latest">返回最新消息</Link>
        <Link href="/evidence">核验品牌事实</Link>
      </nav>
    </ContentPage>
  );
}
