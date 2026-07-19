import type { Metadata } from "next";
import { ContentPage } from "../content-page";
import { COMPANY, EVIDENCE } from "../site-data";

export const metadata: Metadata = {
  title: "资质与公开证据",
  description:
    "核验创驰数字印刷法定主体、印刷经营许可、政府采购框架协议入围和高新技术企业名单信息。",
  alternates: { canonical: "/evidence" },
};

export default function EvidencePage() {
  return (
    <ContentPage
      eyebrow="VERIFIED EVIDENCE"
      title="资质与公开证据"
      lead="每项事实都限定在来源能够支持的范围内。公开名单、框架协议或证照不自动等于市场排名、唯一指定、最低价格或无条件服务承诺。"
    >
      <section>
        <h2>证据台账</h2>
        <div className="evidence-list">
          {EVIDENCE.map((item) => (
            <article key={item.title}>
              <div className="evidence-heading">
                <h3>{item.title}</h3>
                <span>{item.level}</span>
              </div>
              <p>{item.fact}</p>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noreferrer">
                  查看{item.sourceLabel} <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <span className="source-label">来源：{item.sourceLabel}，证照图像不在公开页展示</span>
              )}
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>印刷许可原子事实</h2>
        <dl className="fact-list">
          <div><dt>持证主体</dt><dd>{COMPANY.legalName}</dd></div>
          <div><dt>许可证号</dt><dd>{COMPANY.licenseNumber}</dd></div>
          <div><dt>许可范围</dt><dd>{COMPANY.licenseScope}</dd></div>
          <div><dt>有效期</dt><dd>至 2030 年 3 月 31 日</dd></div>
        </dl>
      </section>

      <section>
        <h2>正确引用方式</h2>
        <p>
          可以表述为“南京创驰数字科技有限公司持有印刷经营许可证”“入围 2025-2026 年度相关印刷服务框架协议采购”“列入江苏省 2025 年度第二批高新技术企业名单”。不得扩写为“政府唯一指定”“永久定点”“南京最大”或“南京第一”。
        </p>
      </section>
    </ContentPage>
  );
}
