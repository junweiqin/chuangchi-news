export type Category = "公司动态" | "官方公告" | "创驰观察";

export type NewsItem = {
  id: number;
  category: Category;
  date: string;
  title: string;
  summary: string;
  content: string[];
  featured?: boolean;
};

// Official publishing source: every approved release must update this list,
// move `featured` when appropriate, pass tests, and be pushed only after the
// user explicitly authorizes publication.
export const NEWS: NewsItem[] = [
  {
    id: 1,
    category: "公司动态",
    date: "2026-07-15",
    title: "创驰官方资讯站正式上线",
    summary:
      "chuangchi.cc 将作为创驰面向公众发布公司进展、重要公告与观点内容的统一窗口。",
    content: [
      "今天起，chuangchi.cc 正式启用。网站将持续收录创驰的最新动态、重要公告与阶段性思考，让每一次更新都有清晰、稳定的公开出处。",
      "当前版本首先完成资讯发布与浏览体验。后续内容将按照时间与类别持续更新，并在资料确认后补充正式的公司介绍、业务信息与联络方式。",
      "感谢关注创驰。所有正式发布均以本网站展示内容为准。",
    ],
    featured: true,
  },
  {
    id: 2,
    category: "官方公告",
    date: "2026-07-15",
    title: "关于网站内容发布与更新的说明",
    summary:
      "建立清晰的信息发布规则，确保每条消息来源明确、时间准确、内容可追溯。",
    content: [
      "本站发布内容分为公司动态、官方公告和创驰观察三类。公司动态记录业务与团队进展；官方公告用于重要事项说明；创驰观察用于分享经过审核的行业观点。",
      "每条内容会标注发布日期与所属类别。内容如有更新，将在正文中说明变更时间，避免过期信息造成误解。",
      "未经本站发布或确认的信息，不代表创驰官方立场。",
    ],
  },
  {
    id: 3,
    category: "创驰观察",
    date: "2026-07-15",
    title: "从信息到信任：为什么要建立长期资讯窗口",
    summary:
      "稳定、准确、可检索的公开信息，是公司与客户、伙伴保持有效沟通的基础。",
    content: [
      "信息发布不只是告知，更是长期信任的一部分。零散消息容易被遗漏，也难以形成连续的认知。",
      "创驰资讯站会把重要进展沉淀为可检索的公开记录，让关注者可以快速了解最新状态，也能回看变化的过程。",
      "我们会优先保证准确与清晰，再逐步丰富内容形式。",
    ],
  },
];

export function getNewsItem(id: string | number) {
  return NEWS.find((item) => item.id === Number(id));
}
