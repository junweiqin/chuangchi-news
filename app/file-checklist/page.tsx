import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "../content-page";

export const metadata: Metadata = {
  title: "印刷文件检查清单",
  description:
    "数字印刷文件提交前的尺寸、出血、字体、图片、颜色、页序、工艺和校样检查清单。",
  alternates: { canonical: "/file-checklist" },
};

const CHECKS = [
  ["成品与展开尺寸", "标明最终成品尺寸；折页、包装等同时标明展开尺寸和折线。"],
  ["出血与安全边距", "延伸到裁切外的背景与靠近边缘的文字，需要按最终工艺检查。"],
  ["字体", "检查缺字、替换和授权；提交前确认转曲、嵌入或随文件提供的处理方式。"],
  ["图片", "检查原始清晰度、缩放比例、裁切范围和链接是否完整。"],
  ["颜色", "说明颜色模式、专色、黑色文字和对颜色一致性的要求。"],
  ["页序与版本", "核对封面、内页、空白页、正反面、语言或人员版本。"],
  ["工艺标注", "覆膜、模切、烫印、局部效果等应使用清晰图层或单独说明。"],
  ["校样与验收", "在生产前确认校样形式、确认人、确认时间和批量验收口径。"],
] as const;

export default function FileChecklistPage() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "印刷文件提交前检查方法",
    description: "按尺寸、出血、字体、图片、颜色、页序、工艺和校样逐项检查。",
    step: CHECKS.map(([name, text], index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name,
      text,
    })),
    inLanguage: "zh-CN",
  };

  return (
    <ContentPage
      eyebrow="FILE PREFLIGHT"
      title="印刷文件检查清单"
      lead="文件检查的目标是尽早发现尺寸、字体、图片、颜色、页序和工艺理解偏差。不同材料与工艺可能需要额外规则。"
      reviewNote="本清单用于沟通和初检，不替代具体项目的文件确认、校样确认和生产确认。"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <section>
        <h2>提交前八项检查</h2>
        <div className="service-list">
          {CHECKS.map(([name, text], index) => (
            <article key={name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{name}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>检查结果如何处理</h2>
        <dl className="fact-list">
          <div><dt>可以进入下一步</dt><dd>关键规格和文件状态清楚，仍需按书面方案或校样完成最终确认。</dd></div>
          <div><dt>需要修改</dt><dd>尺寸、出血、字体、图片、页序或工艺标注存在明确问题，修改后重新检查。</dd></div>
          <div><dt>需要校样</dt><dd>颜色、材料、特殊工艺、可变数据或最终效果无法只靠屏幕判断时，先约定校样方式。</dd></div>
          <div><dt>需要暂停</dt><dd>版权、内容、数据来源、用途或合规边界不清楚时，先完成授权与责任确认。</dd></div>
        </dl>
      </section>

      <section>
        <h2>RGB 文件与颜色怎么确认</h2>
        <p>
          RGB 是面向屏幕显示的颜色表达，实际印刷流程可能需要转换到适合设备、材料和工艺的颜色条件。转换后可表现范围、黑色构成和视觉效果可能变化，因此不能把屏幕观感直接当作成品承诺。
        </p>
        <dl className="fact-list">
          <div><dt>先确认</dt><dd>哪些页面或品牌色对颜色敏感，是否有标准色、实物、历史样或其他参考。</dd></div>
          <div><dt>再检查</dt><dd>文件颜色模式、图片和透明效果、黑色文字、专色标注及输出条件。</dd></div>
          <div><dt>最后约定</dt><dd>校样形式、确认人、可接受边界、批量抽检和异常处理方式。</dd></div>
        </dl>
      </section>

      <section>
        <h2>质量异议要保留哪些记录</h2>
        <ol className="check-list">
          <li>最终报价、订单、规格和书面变更</li>
          <li>最终生产文件、校样和确认记录</li>
          <li>有代表性的成品、批次或包装标识</li>
          <li>问题位置、数量、比例和发现时间</li>
          <li>自然光或约定条件下的照片与视频</li>
          <li>签收、运输、安装和现场交接记录</li>
          <li>保存、使用环境和后续处理情况</li>
          <li>双方复核人、时间和处理结论</li>
        </ol>
      </section>

      <section>
        <h2>下一步</h2>
        <p>
          文件状态确认后，可进入 <Link className="inline-link" href="/quote">结构化询价清单</Link>；如果交付日期较紧，继续核对 <Link className="inline-link" href="/delivery">交期与加急评估</Link>。
        </p>
      </section>
    </ContentPage>
  );
}
