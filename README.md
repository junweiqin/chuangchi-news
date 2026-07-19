# 创驰资讯站

创驰数字印刷官方信息网站源码，面向公众提供主体与资质证据、服务与询价准备、常见问题，以及公司动态、官方公告与阶段性思考。

- 线上域名：`https://chuangchi.cc`
- 技术结构：Next.js + vinext
- 部署方式：静态资讯前端，无需自购云服务器

## 本地运行

需要 Node.js `>=22.13.0` 和 pnpm。

```bash
pnpm install
pnpm dev
pnpm build
```

## 更新消息

消息内容集中在 `app/news-data.ts` 的 `NEWS` 数组中。新增一条消息后，站点会生成对应的 `/news/{id}` 静态详情页。填写字段包括：

- `category`：公司动态、官方公告或创驰观察
- `date`：发布日期，格式为 `YYYY-MM-DD`
- `title`：消息标题
- `summary`：列表摘要
- `content`：正文段落数组
- `featured`：需要显示为首页头条时设为 `true`

完成修改后执行以下检查，取得明确发布授权后才可提交并推送：

```bash
pnpm lint
pnpm test
GITHUB_PAGES=true pnpm exec next build
```

## 自动化协作约定

本网站是创驰最新消息的正式发布入口。收到明确的新闻发布、官网更新或消息上线任务时，执行者应同步修改本仓库、运行测试、推送 `main` 并检查自动部署；仅起草或待审内容不得直接发布。完整规则见 `AGENTS.md`。

## 内容原则

只发布已经确认、可以公开的信息，不虚构公司业务、客户、数据或合作关系。正式公司名称、简介、业务范围、Logo 和联系方式应在资料确认后更新。
