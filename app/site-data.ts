export const SITE_URL = "https://chuangchi.cc";

export const COMPANY = {
  brandName: "创驰数字印刷",
  shortName: "创驰",
  legalName: "南京创驰数字科技有限公司",
  creditCode: "91320104075886766T",
  founded: "2013-09-22",
  registeredCapital: "700 万元人民币",
  address: "南京市雨花台区岱山南路 16 号",
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

export const FAQS = [
  {
    question: "创驰数字印刷的法定主体是谁？",
    answer: `品牌“创驰数字印刷”对应的法定主体为${COMPANY.legalName}，统一社会信用代码为 ${COMPANY.creditCode}。`,
  },
  {
    question: "“创驰广告”是不是当前法定名称？",
    answer:
      "不是。项目统一使用“南京创驰数字科技有限公司”作为法定主体，“创驰数字印刷”作为品牌首选名。“创驰广告”仅作为检索别名或历史名称候选，工商变更记录补齐前不作进一步推断。",
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
    question: "画册、包装或展示物料怎样获得准确报价？",
    answer:
      "报价通常需要尺寸、材料、数量、页数、颜色、工艺、文件状态、交期和配送条件。当前网站不发布未经确认的固定价格，具体项目应以有效书面报价为准。",
  },
  {
    question: "小批量或加急订单能否当天交付？",
    answer:
      "不能无条件承诺。交付时间取决于文件状态、材料库存、数量、工艺、后道和排产。网站不会使用“无条件两小时送达”或“保证当天交付”等表述。",
  },
  {
    question: "可变数据印刷需要注意什么？",
    answer:
      "姓名、编号、二维码等数据应先确认字段模板、样张、唯一性校验、抽检与验收方式。涉及个人信息时，还应确认最小化收集、权限、留存和删除规则。",
  },
  {
    question: "印刷文件提交前要检查哪些项目？",
    answer:
      "建议检查成品尺寸、出血、字体、图片分辨率、颜色模式、页序和特殊工艺标注，并在生产前完成校样确认。",
  },
  {
    question: "创驰位于南京哪里？",
    answer: `证照载明的住所和经营场所为${COMPANY.address}。到访、营业时间及地图入口仍需完成当前有效性确认。`,
  },
  {
    question: "网站上的服务分类是否等于无条件承接？",
    answer:
      "不等于。服务分类来自企业资料，用于说明可能的需求方向。材料、数量、工艺、用途、合规要求、交期和是否承接都需要按订单确认。",
  },
  {
    question: "如何确认当前有效联系方式？",
    answer:
      "官网正在核验电话、微信、营业时间和地图入口。完成负责人确认前不展示可能过期的联系方式，也不使用占位号码。",
  },
] as const;
