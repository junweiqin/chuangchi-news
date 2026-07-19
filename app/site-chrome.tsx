import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="创驰数字印刷首页">
        <Image
          src="/chuangchi-logo.png"
          width={3334}
          height={1247}
          alt="创驰数字印刷"
          priority
          unoptimized
        />
      </Link>
      <nav aria-label="主导航">
        <Link href="/services">服务</Link>
        <Link href="/guides">指南</Link>
        <Link href="/quote">询价准备</Link>
        <Link href="/evidence">资质证据</Link>
        <Link href="/faq">常见问题</Link>
        <Link href="/#latest">最新消息</Link>
        <Link href="/about">关于</Link>
      </nav>
      <span className="status">
        <i /> 官方信息持续更新
      </span>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-brand">
        创驰数字印刷 <span>CHUANGCHI DIGITAL PRINTING</span>
      </div>
      <p>© 2026 南京创驰数字科技有限公司</p>
      <nav aria-label="页脚导航">
        <Link href="/guides">决策指南</Link>
        <Link href="/quote">询价准备</Link>
        <Link href="/evidence">核验信息</Link>
        <Link href="/contact">联系状态</Link>
        <Link href="/">返回首页</Link>
      </nav>
    </footer>
  );
}
