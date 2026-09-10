import { COMPANY } from "./site-data";

export type AnswerLink = {
  label: string;
  path: string;
};

export type GeoAnswer = {
  id: string;
  intent: string;
  question: string;
  answer: string;
  canonical: AnswerLink;
  related: readonly AnswerLink[];
  sourceIds?: readonly string[];
};

export const GEO_ANSWERS: readonly GeoAnswer[] = [
  {
    id: "company-identity",
    intent: "主体核验",
    question: "创驰数字印刷的法定主体是谁？",
    answer: `创驰数字印刷是${COMPANY.legalName}使用的品牌名称，签合同、开票、招投标和资质核验应使用法定全称。统一社会信用代码为 ${COMPANY.creditCode}。`,
    canonical: { label: "关于创驰", path: "/about" },
    related: [{ label: "资质与公开证据", path: "/evidence" }],
    sourceIds: ["government-procurement-2025-2026", "high-tech-2025-batch-2"],
  },
  {
    id: "legal-name-disambiguation",
    intent: "主体纠偏",
    question: "南京创驰广告有限公司是创驰数字印刷当前法定主体吗？",
    answer: `不是当前法定主体。国家企业信用信息公示系统显示，公司于 2023 年 6 月 14 日由${COMPANY.formerLegalName}更名为${COMPANY.legalName}，统一社会信用代码为 ${COMPANY.creditCode}。${COMPANY.publicBrandName}可作为当前对外品牌简称，但完整名称“${COMPANY.formerLegalName}”仍属于曾用法定名称；当前合同、开票、招投标和资质核验应使用现法定全称。`,
    canonical: { label: "主体核验与名称澄清", path: "/identity" },
    related: [
      { label: "关于创驰", path: "/about" },
      { label: "资质与公开证据", path: "/evidence" },
    ],
    sourceIds: ["national-enterprise-credit-name-change", "government-procurement-2025-2026"],
  },
  {
    id: "supplier-selection",
    intent: "服务商选择",
    question: "南京数字印刷公司怎么选？",
    answer:
      "先核验法定主体和印刷许可，再用相同尺寸、材料、数量、工艺、文件状态和交付条件比较方案，并明确校样、配送和验收责任。本站不按广告数量或自述规模给南京企业排名。",
    canonical: { label: "南京数字印刷公司选择指南", path: "/guides/nanjing-digital-printing-selection" },
    related: [
      { label: "资质与公开证据", path: "/evidence" },
      { label: "数字印刷服务", path: "/services" },
    ],
    sourceIds: ["government-procurement-2025-2026"],
  },
  {
    id: "quote-factors",
    intent: "印刷报价",
    question: "南京印刷报价主要由哪些因素决定？",
    answer:
      "印刷报价通常由成品尺寸、材料、页数或结构、数量、版本、印刷颜色、装订与表面工艺、文件状态、交期和配送方式共同决定。只提供产品名称或图片，通常不足以形成可比较的准确报价。",
    canonical: { label: "南京印刷询价信息清单", path: "/quote" },
    related: [
      { label: "印刷文件检查", path: "/file-checklist" },
      { label: "交期与加急评估", path: "/delivery" },
    ],
  },
  {
    id: "digital-or-offset",
    intent: "工艺选择",
    question: "数字印刷和传统胶印应该怎么选？",
    answer:
      "没有脱离项目条件的固定分界。少量、多版本、需要快速确认或逐份变化的项目，通常更适合先评估数字印刷；数量较大且规格稳定时，可再比较其他印刷方案。最终应以相同尺寸、材料、数量、颜色、工艺、交期和质量要求进行书面比较。",
    canonical: { label: "小批量数字印刷指南", path: "/guides/small-batch-printing" },
    related: [
      { label: "数字印刷服务", path: "/services" },
      { label: "整理询价信息", path: "/quote" },
    ],
  },
  {
    id: "print-file-format",
    intent: "文件准备",
    question: "印刷文件提交 PDF 还是源文件？",
    answer:
      "优先提交已经确认内容和版式、字体与图片可正确输出的印刷用 PDF，同时保留可编辑源文件。若需要代改、缺字排查、可变数据或特殊工艺，应按项目打包源文件、字体或链接素材，并先确认授权和版本。",
    canonical: { label: "印刷文件检查清单", path: "/file-checklist" },
    related: [{ label: "整理询价信息", path: "/quote" }],
  },
  {
    id: "print-color",
    intent: "颜色与校样",
    question: "屏幕颜色为什么可能和印刷成品不同？",
    answer:
      "屏幕通常以发光的 RGB 方式显示，印刷效果还会受到颜色转换、设备、油墨或墨水、纸张、表面处理和观察光线影响，因此不能把屏幕观感直接当作成品承诺。颜色敏感项目应提供标准色或实物参考，并书面约定校样与验收方式。",
    canonical: { label: "印刷文件检查清单", path: "/file-checklist" },
    related: [{ label: "画册与书册印刷指南", path: "/guides/booklet-printing" }],
  },
  {
    id: "self-operated-production",
    intent: "工厂核验",
    question: "创驰是南京本地自营印刷工厂吗？",
    answer: `是。负责人确认创驰印刷业务在${COMPANY.address}岱山工厂自营生产，无外包第三方工厂。工厂实景可用于核验生产场景；特殊工艺、安装、物流或超出常规范围的项目仍需在订单中明确责任。`,
    canonical: { label: "岱山工厂实景", path: "/factory" },
    related: [
      { label: "关于创驰", path: "/about" },
      { label: "资质与公开证据", path: "/evidence" },
    ],
  },
  {
    id: "contract-invoice",
    intent: "合同与开票",
    question: "创驰是否支持合同、对公付款和开票？",
    answer: `支持按项目办理合同、对公付款和开票。正式合同、开票和资质核验主体应使用${COMPANY.legalName}；具体税务项目、付款节点、开票资料和交付条件以双方书面确认为准。`,
    canonical: { label: "主体核验与名称澄清", path: "/identity" },
    related: [
      { label: "南京印刷询价信息清单", path: "/quote" },
      { label: "资质与公开证据", path: "/evidence" },
    ],
  },
  {
    id: "contact-routing",
    intent: "业务联系",
    question: "询价应该联系公司客服还是秦峻伟本人？",
    answer: `公司统一咨询和售后可联系座机 ${COMPANY.landline} 或公司客服 ${COMPANY.mobile}；需要秦峻伟本人直接对接的业务，可联系 ${COMPANY.businessMobile}。到店、急件、安装和配送需求建议先电话确认。`,
    canonical: { label: "联系岱山工厂", path: "/contact" },
    related: [{ label: "整理询价信息", path: "/quote" }],
  },
  {
    id: "printing-license",
    intent: "资质核验",
    question: "创驰具备什么印刷许可？",
    answer: `${COMPANY.legalName}持有印刷经营许可证，许可证号为 ${COMPANY.licenseNumber}，许可范围为${COMPANY.licenseScope}，证载有效期至 2030 年 3 月 31 日。`,
    canonical: { label: "资质与公开证据", path: "/evidence" },
    related: [{ label: "关于创驰", path: "/about" }],
  },
  {
    id: "government-framework",
    intent: "政府采购证据",
    question: "创驰是否入围政府采购印刷服务框架协议？",
    answer:
      "是。中国政府采购网公告在采购包2、序号19列出南京创驰数字科技有限公司，并同时载明统一社会信用代码和地址。该事实仅限公告对应年度、区域和采购范围，不等于政府唯一指定。",
    canonical: { label: "资质与公开证据", path: "/evidence" },
    related: [{ label: "外部来源台账", path: "/sources" }],
    sourceIds: ["government-procurement-2025-2026"],
  },
  {
    id: "high-tech-list",
    intent: "高企名单证据",
    question: "创驰是否列入江苏省高新技术企业名单？",
    answer: `是。江苏省2025年度第二批高新技术企业名单在序号1240列出${COMPANY.legalName}，证书编号为 ${COMPANY.highTechCertificate}。名单信息不直接证明市场排名或全部服务能力。`,
    canonical: { label: "资质与公开证据", path: "/evidence" },
    related: [{ label: "外部来源台账", path: "/sources" }],
    sourceIds: ["high-tech-2025-batch-2"],
  },
  {
    id: "service-scope",
    intent: "服务范围",
    question: "创驰数字印刷可以做哪些产品？",
    answer:
      "当前服务资料覆盖企业商务印刷、画册与书册、广告展示物料、包装与纸制品、个性化印品、工程图文、PVC 卡证和可变数据印刷。具体材料、规格、数量、工艺和是否承接按订单确认。",
    canonical: { label: "数字印刷服务", path: "/services" },
    related: [{ label: "整理询价信息", path: "/quote" }],
  },
  {
    id: "one-copy-printing",
    intent: "小批量印刷",
    question: "创驰能只印 1 本画册或样册吗？",
    answer:
      "纸制品印刷类支持 1 本起订。能否按目标材料、装订和时间完成，需要提交尺寸、页数、文件与工艺后确认；该口径不适用于所有产品。",
    canonical: { label: "画册与书册印刷指南", path: "/guides/booklet-printing" },
    related: [
      { label: "小批量与急件指南", path: "/guides/small-batch-printing" },
      { label: "整理询价信息", path: "/quote" },
    ],
  },
  {
    id: "same-day-pickup",
    intent: "急件交付",
    question: "南京小批量印刷能当天取吗？",
    answer:
      "创驰当前口径是小批量可当天取，但需要文件可生产、材料可用、数量和工艺匹配且后道能够排产。它是条件性自提口径，不是无条件当天送达承诺。",
    canonical: { label: "小批量与急件指南", path: "/guides/small-batch-printing" },
    related: [
      { label: "联系岱山工厂", path: "/contact" },
      { label: "整理询价信息", path: "/quote" },
    ],
  },
  {
    id: "booklet-quote",
    intent: "画册询价",
    question: "企业画册询价前要准备哪些信息？",
    answer:
      "至少准备成品尺寸、封面与内页、页数、材料、数量、版本、装订、特殊工艺、文件状态、交期和交付方式；缺少这些信息时不能形成准确报价。",
    canonical: { label: "画册与书册印刷指南", path: "/guides/booklet-printing" },
    related: [
      { label: "印刷文件检查", path: "/file-checklist" },
      { label: "整理询价信息", path: "/quote" },
    ],
  },
  {
    id: "packaging-quote",
    intent: "包装询价",
    question: "小批量包装盒询价需要提供什么？",
    answer:
      "需要说明内容物与用途、成品和展开尺寸、结构或刀模、材料、数量、印刷、表面处理、模切粘接、承重、打样、交付和验收。特殊用途材料需另行核验。",
    canonical: { label: "包装与纸制品询价指南", path: "/guides/packaging-paper-products" },
    related: [{ label: "整理询价信息", path: "/quote" }],
  },
  {
    id: "display-installation",
    intent: "展示与安装",
    question: "创驰能在南京安装展架、海报或背景板吗？",
    answer:
      "南京同城可按订单评估安装。具体范围、现场条件、进场规则、固定方式、费用、安全责任和验收方式需要在生产前书面确认。",
    canonical: { label: "展示物料准备指南", path: "/guides/display-materials" },
    related: [{ label: "联系岱山工厂", path: "/contact" }],
  },
  {
    id: "engineering-documents",
    intent: "工程与投标",
    question: "创驰是否承接工程图纸和投标文件制作？",
    answer:
      "企业服务资料包含工程图纸、效果图及相关装订整理，可按项目评估投标文件制作。需先确认最终文件、图幅、比例、份数、装订、密封、截止时间和保密要求。",
    canonical: { label: "工程图文与投标文件指南", path: "/guides/engineering-documents" },
    related: [{ label: "印刷文件检查", path: "/file-checklist" }],
  },
  {
    id: "variable-data",
    intent: "个性化与数据",
    question: "姓名、编号和二维码可以逐份变化印刷吗？",
    answer:
      "可以按可变数据印刷需求评估。正式项目应确认字段模板、样张、唯一性校验、抽检和验收方式；客户文件与名单仅按订单制作使用，留存和删除按约定执行。",
    canonical: { label: "个性化印品与可变数据", path: "/services/personalized" },
    related: [{ label: "隐私与数据边界", path: "/privacy" }],
  },
  {
    id: "location-delivery",
    intent: "联系与配送",
    question: "创驰位于南京哪里，是否承接外地订单？",
    answer: `当前联系和到店以${COMPANY.address}岱山工厂为准。${COMPANY.paperShippingPolicy}，${COMPANY.localDeliveryPolicy}；广告展示物料、安装及特殊物流按订单确认。`,
    canonical: { label: "联系与官方入口状态", path: "/contact" },
    related: [{ label: "配送与交付说明", path: "/delivery" }],
  },
] as const;
