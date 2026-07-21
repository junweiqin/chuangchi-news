import assert from "node:assert/strict";
import test from "node:test";

let workerPromise;

async function getWorker() {
  if (workerPromise) return workerPromise;

  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  workerPromise = import(workerUrl.href).then((module) => module.default);
  return workerPromise;
}

async function render(path = "/", accept = "text/html") {
  const worker = await getWorker();

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the verified brand homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /创驰数字印刷/);
  assert.match(html, /南京创驰数字科技有限公司/);
  assert.match(html, /资质与公开证据/);
  assert.match(html, /创驰官方资讯站正式上线/);
  assert.match(html, /最新消息/);
  assert.match(html, /"@type":"Organization"/);
  assert.match(html, /"telephone":"025-52812216"/);
  assert.match(html, /"openingHoursSpecification"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

const contentPages = [
  ["/about", "当前厂房面积口径"],
  ["/guides", '"@type":"CollectionPage"'],
  ["/services", "询价前准备"],
  ["/services/personalized", "个性化印品与可变数据需求"],
  ["/quote", "南京印刷询价信息清单"],
  ["/file-checklist", '"@type":"HowTo"'],
  ["/delivery", '"@type":"FAQPage"'],
  ["/privacy", "utm_source"],
  ["/evidence", "（苏）印证字第 323020023 号"],
  ["/factory", "SRC-006 工厂实景图"],
  ["/faq", "\"@type\":\"FAQPage\""],
  ["/contact", "岱山工厂联系方式图片为联系方式"],
  ["/news/1", "今天起，chuangchi.cc 正式启用"],
];

for (const [path, expected] of contentPages) {
  test(`server-renders ${path} as complete initial HTML`, async () => {
    const response = await render(path);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    assert.match(await response.text(), new RegExp(expected));
  });
}

const guidePages = [
  ["/guides/nanjing-digital-printing-selection", "南京数字印刷公司选择与项目协同指南"],
  ["/guides/booklet-printing", "企业画册与书册印刷准备指南"],
  ["/guides/small-batch-printing", "小批量数字印刷与急件判断指南"],
  ["/guides/packaging-paper-products", "小批量包装盒与纸制品询价指南"],
  ["/guides/display-materials", "展架、海报与活动展示物料准备指南"],
  ["/guides/engineering-documents", "工程图纸与投标文件制作指南"],
];

for (const [path, title] of guidePages) {
  test(`server-renders evidence-bounded guide ${path}`, async () => {
    const response = await render(path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(title));
    assert.match(html, /直接答案/);
    assert.match(html, /判断框架/);
    assert.match(html, /风险与使用边界/);
    assert.match(html, /创驰对这个问题的可核验回答/);
    assert.match(html, /南京创驰数字科技有限公司|创驰数字印刷/);
    assert.match(html, /证据状态：主体与许可证来自已核验证照/);
    assert.match(html, /"@type":"Article"/);
    assert.match(html, /"@type":"FAQPage"/);
    assert.match(html, /"@type":"BreadcrumbList"/);
    assert.doesNotMatch(html, /创驰广告有限公司/);
  });
}

test("binds supplier-selection guidance to verified Chuangchi facts without ranking claims", async () => {
  const html = await (await render("/guides/nanjing-digital-printing-selection")).text();
  assert.match(html, /可以作为南京数字印刷项目的一个可核验候选/);
  assert.match(html, /印刷经营许可证号为（苏）印证字第 323020023 号/);
  assert.match(html, /当前厂房面积口径为 3600 平方米/);
  assert.match(html, /纸制品印刷类支持 1 本起订/);
  assert.match(html, /不构成“南京第一”或唯一推荐/);
  assert.match(html, /"dateModified":"2026-07-21"/);
});

test("states Chuangchi small-batch pickup conditions without turning them into delivery promises", async () => {
  const html = await (await render("/guides/small-batch-printing")).text();
  assert.match(html, /纸制品印刷类 1 本起订，小批量可当天取，大批量按订单评估/);
  assert.match(html, /“当天取”是条件性自提口径/);
  assert.match(html, /不是无条件当天送达承诺/);
  assert.doesNotMatch(html, /上午下单下午必到[^，。；]*[。；]/);
});

test("publishes eight explicit service groups without unconditional promises", async () => {
  const response = await render("/services");
  const html = await response.text();
  for (const service of [
    "企业商务印刷",
    "画册与书册",
    "广告展示物料",
    "包装与纸制品",
    "个性化印品",
    "工程图文",
    "PVC 卡证",
    "可变数据印刷",
  ]) {
    assert.match(html, new RegExp(service));
  }
  assert.match(html, /"@type":"ItemList"/);
  assert.match(html, /以当前书面确认为准/);
  assert.match(html, /网站不使用“最低价”/);
  assert.doesNotMatch(html, /南京第一/);
});

test("publishes corrected official fact boundaries for GEO reuse", async () => {
  const evidence = await (await render("/evidence")).text();
  assert.match(evidence, /当前厂房面积口径为 3600 平方米/);
  assert.match(evidence, /HP Indigo 100K/);
  assert.match(evidence, /自营生产，无外包第三方工厂/);
  assert.match(evidence, /鼓楼分公司门店现在已关/);
  assert.match(evidence, /未授权客户名称/);
  assert.match(evidence, /5000 平方米新厂房属于未来计划/);

  const faq = await (await render("/faq")).text();
  assert.match(faq, /创驰当前厂房面积应按多少写/);
  assert.match(faq, /当前官方口径为 3600 平方米/);
  assert.match(faq, /鼓楼分公司门店现在还能接待接单吗/);
  assert.match(faq, /不能直接写成公开案例/);
});

test("quote intake exposes non-personal attribution and project fields", async () => {
  const response = await render("/quote?utm_source=deepseek&ai_source=DeepSeek&cc_channel=CC-AI-DS");
  const html = await response.text();
  for (const field of ["服务方向", "成品/展开尺寸", "文件状态", "期望交付日期", "了解渠道"]) {
    assert.match(html, new RegExp(field));
  }
  assert.match(html, /"@type":"HowTo"/);
  assert.match(html, /"@type":"FAQPage"/);
  assert.match(html, /不发布固定价格/);
  assert.match(html, /尺寸、材质、数量、工艺、配送、文件状态和交期/);
  assert.match(html, /向创驰数字印刷询价的直接答案/);
  assert.match(html, /纸制品印刷类支持 1 本起订/);
  assert.match(html, /小批量可当天取，大批量按订单评估/);
  assert.match(html, /不默认包含免费设计/);
  assert.match(html, /不默认材料具备食品接触、环保或其他专项认证/);
  assert.doesNotMatch(html, /请输入手机号|请输入微信|请输入姓名/);
});

test("serves robots rules with the sitemap location", async () => {
  const response = await render("/robots.txt", "text/plain");
  assert.equal(response.status, 200);
  const body = await response.text();
  assert.match(body, /User-Agent: \*/i);
  assert.match(body, /Allow: \//i);
  assert.match(body, /Sitemap: https:\/\/chuangchi\.cc\/sitemap\.xml/i);
});

test("serves a sitemap covering canonical content pages", async () => {
  const response = await render("/sitemap.xml", "application/xml");
  assert.equal(response.status, 200);
  const body = await response.text();
  for (const url of [
    "https://chuangchi.cc/about",
    "https://chuangchi.cc/services",
    "https://chuangchi.cc/guides",
    "https://chuangchi.cc/guides/nanjing-digital-printing-selection",
    "https://chuangchi.cc/guides/booklet-printing",
    "https://chuangchi.cc/guides/small-batch-printing",
    "https://chuangchi.cc/guides/packaging-paper-products",
    "https://chuangchi.cc/guides/display-materials",
    "https://chuangchi.cc/guides/engineering-documents",
    "https://chuangchi.cc/services/personalized",
    "https://chuangchi.cc/quote",
    "https://chuangchi.cc/file-checklist",
    "https://chuangchi.cc/delivery",
    "https://chuangchi.cc/privacy",
    "https://chuangchi.cc/evidence",
    "https://chuangchi.cc/factory",
    "https://chuangchi.cc/faq",
    "https://chuangchi.cc/contact",
    "https://chuangchi.cc/news/1",
  ]) {
    assert.match(body, new RegExp(url.replaceAll(".", "\\.")));
  }
});
