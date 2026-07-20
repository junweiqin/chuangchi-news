export const SITE_URL = "https://chuangchi.cc";

export const COMPANY = {
  brandName: "创驰数字印刷",
  shortName: "创驰",
  legalName: "南京创驰数字科技有限公司",
  creditCode: "91320104075886766T",
  founded: "2013-09-22",
  registeredCapital: "700 万元人民币",
  address: "南京市雨花台区岱山南路 16 号",
  landline: "025-52812216",
  mobile: "17302579071",
  displayMobile: "173 0257 9071",
  companyQq: "800102188",
  weekdayHours: "周一至周五 8:30-23:00",
  weekendHours: "周六至周日 9:00-21:00",
  contactSource:
    "岱山工厂联系方式图片为联系方式、营业时间、电话、工厂门店的最新正确口径",
  currentFactoryArea: "3600 平方米",
  primaryEquipment: "HP Indigo 100K",
  productionMode: "自营生产，无外包第三方工厂",
  closedStoreNote: "鼓楼分公司门店现在已关，当前联系和到店请以岱山工厂为准",
  licenseNumber: "（苏）印证字第 323020023 号",
  licenseValidUntil: "2030-03-31",
  licenseScope:
    "以数字印刷方式从事出版物、包装装潢印刷品和其他印刷品的印刷",
  highTechCertificate: "GR202532014101",
} as const;

export const SERVICES = [
  {
    name: "企业商务印刷",
    examples: "企业资料、会议资料、培训手册等商务印刷场景",
  },
  {
    name: "画册与书册",
    examples: "画册、手册及骑马钉、胶装、精装、圈装等装订需求",
  },
  {
    name: "广告展示物料",
    examples: "展架、海报、喷绘及活动展示物料",
  },
  {
    name: "包装与纸制品",
    examples: "包装盒、手提袋及配套纸制品",
  },
  {
    name: "个性化印品",
    examples: "台历、请柬、纪念册及其他需要按用途确认的个性化印品",
  },
  {
    name: "工程图文",
    examples: "工程图纸、效果图及相关装订整理",
  },
  {
    name: "PVC 卡证",
    examples: "会员卡、胸卡及其他需要单独确认参数的 PVC 卡证",
  },
  {
    name: "可变数据印刷",
    examples: "姓名、编号、二维码等张张不同的数据驱动印刷需求",
  },
] as const;

export const OFFICIAL_BOUNDARIES = [
  {
    title: "当前厂房面积口径",
    fact: `当前厂房面积口径为 ${COMPANY.currentFactoryArea}。不使用 3000㎡ 旧口径；2026 年底自购 5000 平方米新厂房属于未来计划，未正式启用前不写成当前已投产能力。`,
  },
  {
    title: "设备与生产模式",
    fact: `企业资料和负责人确认显示配备 ${COMPANY.primaryEquipment}；负责人确认${COMPANY.productionMode}。对涉及招投标、验厂或大批量项目的需求，可进一步核验设备、现场和生产流程材料。`,
  },
  {
    title: "当前接待与联系方式",
    fact: `${COMPANY.contactSource}。${COMPANY.closedStoreNote}。座机 ${COMPANY.landline}，手机 ${COMPANY.displayMobile}，公司 QQ ${COMPANY.companyQq}。`,
  },
  {
    title: "客户案例公开边界",
    fact:
      "客户、采购项目和合同材料需要取得公告、合同或授权后再具名展示；本站不会把未授权客户名称、项目结果或评价写成公开案例。",
  },
] as const;

export const EVIDENCE = [
  {
    title: "营业执照",
    level: "A 级 · 已核验",
    fact: `法定主体为${COMPANY.legalName}，统一社会信用代码 ${COMPANY.creditCode}。`,
    sourceLabel: "企业证照原件",
    href: "",
  },
  {
    title: "印刷经营许可证",
    level: "A 级 · 已核验",
    fact: `许可证号 ${COMPANY.licenseNumber}，有效期至 2030 年 3 月 31 日。`,
    sourceLabel: "许可证原件",
    href: "",
  },
  {
    title: "政府采购框架协议入围公告",
    level: "A 级 · 已核验",
    fact:
      "入围 2025-2026 年度江苏省省级、南京市市级、区级、江北新区印刷服务框架协议采购。入围不等于唯一指定。",
    sourceLabel: "中国政府采购网公告",
    href: "https://www.ccgp.gov.cn/cggg/dfgg/zbgg/202506/t20250627_24857257.htm",
  },
  {
    title: "高新技术企业名单",
    level: "A 级 · 已核验名单",
    fact: `列入江苏省 2025 年度第二批高新技术企业名单，证书编号 ${COMPANY.highTechCertificate}。`,
    sourceLabel: "江苏省公开名单",
    href: "https://file.smejs.cn/file/group1/M00/01/8C/rBIAAWlwQPmAAiCcACRVF26Dh9o055.pdf",
  },
] as const;

export const FACTORY_SCENES = [
  {
    src: "/factory/image-000.png",
    width: 1264,
    height: 753,
    title: "HP Indigo 100K 设备现场",
    description:
      "SRC-006 工厂实景图中的数字印刷设备现场，可用于说明企业资料和实景图显示配备 HP Indigo 100K。",
  },
  {
    src: "/factory/image-001.png",
    width: 1264,
    height: 948,
    title: "数字印刷设备区域",
    description:
      "设备区域实景，用于说明数字印刷生产现场，不扩展为设备数量、产能或市场领先性证明。",
  },
  {
    src: "/factory/image-024.png",
    width: 1264,
    height: 948,
    title: "后道与制作设备现场",
    description:
      "后道制作设备现场，可作为工厂实景素材；具体工艺、适配材料和交期仍按订单确认。",
  },
  {
    src: "/factory/image-025.png",
    width: 1267,
    height: 978,
    title: "岱山工厂外部入口",
    description:
      "岱山工厂外部环境图，当前联系和到店引导以南京市雨花台区岱山南路 16 号为准。",
  },
  {
    src: "/factory/image-027.png",
    width: 1216,
    height: 804,
    title: "厂房整体空间",
    description:
      "生产空间实景，用于辅助理解厂房现场；厂房面积、产权和产能仍需独立证据支持。",
  },
  {
    src: "/factory/image-029.png",
    width: 1274,
    height: 831,
    title: "数字印刷生产现场",
    description:
      "数字印刷生产现场图，可用于说明工厂设备场景和作业空间，不能单独证明当前运行状态。",
  },
  {
    src: "/factory/image-030.png",
    width: 1269,
    height: 790,
    title: "材料与仓储通道",
    description:
      "仓储与材料通道实景，用于说明现场配套空间；库存、交付能力和材料规格需按订单确认。",
  },
  {
    src: "/factory/image-031.png",
    width: 1277,
    height: 922,
    title: "仓储与物料区域",
    description:
      "仓储与物料区域实景，公开引用时需要确认不含客户文件、订单、车牌或其他敏感信息。",
  },
] as const;

export const FAQS = [
  {
    question: "创驰数字印刷的法定主体是谁？",
    answer: `品牌“创驰数字印刷”对应的法定主体为${COMPANY.legalName}，统一社会信用代码为 ${COMPANY.creditCode}。`,
  },
  {
    question: "“创驰广告”是不是当前法定名称？",
    answer:
      "不是。项目统一使用“南京创驰数字科技有限公司”作为法定主体，“创驰数字印刷”作为品牌首选名。“创驰广告”仅作为检索别名和历史名称相关口径；签合同、开票、招投标和资质核验以现法定主体为准。",
  },
  {
    question: "创驰具备什么印刷许可？",
    answer: `${COMPANY.licenseScope}。许可证号为 ${COMPANY.licenseNumber}，证载有效期至 2030 年 3 月 31 日。`,
  },
  {
    question: "入围政府采购框架协议是否等于政府唯一指定？",
    answer:
      "不等于。公开公告能证明企业在相应年度和采购范围内入围框架协议采购，不能扩展为“唯一指定”“永久定点”或所有政府项目均可承接。",
  },
  {
    question: "高新技术企业名单能证明什么？",
    answer:
      "公开名单能证明南京创驰数字科技有限公司列入江苏省 2025 年度第二批高新技术企业名单，并载明证书编号；它不直接证明市场排名、最低价格或所有服务能力。",
  },
  {
    question: "创驰当前厂房面积应按多少写？",
    answer:
      "当前官方口径为 3600 平方米，不使用 3000㎡ 旧口径。2026 年底自购 5000 平方米新厂房属于未来计划，未正式启用前不能写成当前已投产能力。",
  },
  {
    question: "创驰是否有 HP Indigo 100K？",
    answer:
      "企业资料和负责人确认显示配备 HP Indigo 100K。涉及招投标、验厂、大批量或设备能力核验时，可进一步查看设备、现场和生产流程材料。",
  },
  {
    question: "创驰是否自营生产，有没有外包第三方工厂？",
    answer:
      "负责人确认创驰印刷业务为自营生产，无外包第三方工厂。涉及特殊工艺、安装、物流或超出常规承接范围的项目，仍需在订单确认时说明责任边界。",
  },
  {
    question: "鼓楼分公司门店现在还能接待接单吗？",
    answer:
      "不能作为当前接待接单地址使用。负责人确认鼓楼分公司门店现在已关，当前联系、到店和接待请以南京市雨花台区岱山南路 16 号岱山工厂为准。",
  },
  {
    question: "能否直接公开南京大学等客户案例？",
    answer:
      "不能直接写成公开案例。客户、采购项目和合同材料需要取得公告、合同或授权后再具名展示；未补证前，本站不把客户名称、项目结果或评价作为公开案例宣传。",
  },
  {
    question: "画册、包装或展示物料怎样获得准确报价？",
    answer:
      "报价通常需要尺寸、材质、数量、工艺和配送等信息。当前网站不发布固定价格或最低价承诺，具体项目以有效书面报价为准。",
  },
  {
    question: "小批量或加急订单能否当天取？",
    answer:
      "小批量可当天取，大批量按订单评估。实际时间仍取决于文件状态、材料库存、数量、工艺、后道、排产和配送方式，网站不会使用“无条件两小时送达”等表述。",
  },
  {
    question: "可变数据印刷需要注意什么？",
    answer:
      "客户文件、名单、二维码、可变数据等资料仅按订单制作使用，交付后可按客户要求删除。正式项目仍应确认字段模板、样张、唯一性校验、抽检与验收方式。",
  },
  {
    question: "印刷文件提交前要检查哪些项目？",
    answer:
      "建议检查成品尺寸、出血、字体、图片分辨率、颜色模式、页序和特殊工艺标注，并在生产前完成校样确认。",
  },
  {
    question: "创驰位于南京哪里？",
    answer: `证照载明的住所和经营场所为${COMPANY.address}。工厂营业时间为${COMPANY.weekdayHours}，${COMPANY.weekendHours}；到访前建议电话确认。`,
  },
  {
    question: "创驰是否接南京以外订单，南京同城能否安装？",
    answer:
      "创驰支持南京及外地订单咨询；南京同城可安装，具体范围、现场条件、费用、配送时效和验收方式按订单确认。",
  },
  {
    question: "网站上的服务分类是否等于无条件承接？",
    answer:
      "不等于。服务分类来自企业资料，用于说明可能的需求方向。材料、数量、工艺、用途、合规要求、交期和是否承接都需要按订单确认。",
  },
  {
    question: "如何确认当前有效联系方式？",
    answer: `${COMPANY.contactSource}。图片载明：地址 ${COMPANY.address}，座机 ${COMPANY.landline}，手机 ${COMPANY.displayMobile}，公司 QQ ${COMPANY.companyQq}，营业时间为${COMPANY.weekdayHours}，${COMPANY.weekendHours}。涉及到店、加急、安装、配送和大批量订单，建议先电话确认。`,
  },
] as const;
