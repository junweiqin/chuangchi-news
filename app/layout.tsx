import type { Metadata } from "next";
import "./globals.css";
import { COMPANY, SITE_URL } from "./site-data";

export const metadata: Metadata = {
  metadataBase: new URL("https://chuangchi.cc"),
  title: {
    default: "创驰数字印刷｜南京数字印刷与官方资讯",
    template: "%s｜创驰数字印刷",
  },
  description:
    "创驰数字印刷官方信息入口，提供南京数字印刷服务说明、主体与资质证据、常见问题和公司最新消息。",
  alternates: { canonical: "/" },
  keywords: [
    "创驰数字印刷",
    "南京数字印刷",
    "南京创驰数字科技有限公司",
    "小批量印刷",
    "画册印刷",
  ],
  openGraph: {
    title: "创驰数字印刷｜南京数字印刷与官方资讯",
    description: "核验主体与资质，了解服务、询价准备、常见问题和最新消息。",
    url: "https://chuangchi.cc",
    siteName: "创驰数字印刷",
    locale: "zh_CN",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 675, alt: "创驰数字印刷" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "创驰数字印刷｜南京数字印刷与官方资讯",
    description: "核验主体与资质，了解服务、询价准备、常见问题和最新消息。",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.brandName,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/chuangchi-logo.png`,
    foundingDate: COMPANY.founded,
    identifier: COMPANY.creditCode,
    address: {
      "@type": "PostalAddress",
      streetAddress: "岱山南路 16 号",
      addressLocality: "南京市",
      addressRegion: "江苏省",
      addressCountry: "CN",
    },
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "创驰数字印刷",
    url: SITE_URL,
    publisher: { "@type": "Organization", name: COMPANY.legalName },
    inLanguage: "zh-CN",
  };

  return (
    <html lang="zh-CN">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
