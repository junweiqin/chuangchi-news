import type { Metadata } from "next";
import "./globals.css";
import { COMPANY, SITE_URL } from "./site-data";

export const metadata: Metadata = {
  metadataBase: new URL("https://chuangchi.cc"),
  title: {
    default: "南京印刷厂｜企业物料与数字印刷服务｜创驰数字印刷",
    template: "%s｜创驰数字印刷",
  },
  description:
    "创驰数字印刷为企业、学校、政府事业单位及各类机构提供南京数字印刷和物料制作服务。纸制品印刷全国包邮，南京地区可安排专车送货上门。",
  alternates: { canonical: "/" },
  keywords: [
    "创驰数字印刷",
    "南京印刷厂",
    "南京数字印刷",
    "南京企业物料制作",
    "南京创驰数字科技有限公司",
    "小批量印刷",
    "画册印刷",
  ],
  openGraph: {
    title: "南京印刷厂｜企业物料与数字印刷服务｜创驰数字印刷",
    description: "服务企业、学校和事业单位；纸制品印刷全国包邮，南京地区可安排专车送货上门。",
    url: "https://chuangchi.cc",
    siteName: "创驰数字印刷",
    locale: "zh_CN",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 675, alt: "创驰数字印刷" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "南京印刷厂｜企业物料与数字印刷服务｜创驰数字印刷",
    description: "服务企业、学校和事业单位；纸制品印刷全国包邮，南京地区可安排专车送货上门。",
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
    telephone: COMPANY.landline,
    description: "南京自营数字印刷工厂，为企业、学校、政府事业单位及各类机构提供印刷与物料制作服务。",
    areaServed: "CN",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: COMPANY.landline,
        contactType: "customer service",
        areaServed: "CN-JS",
        availableLanguage: ["zh-CN"],
      },
      {
        "@type": "ContactPoint",
        telephone: COMPANY.mobile,
        contactType: "sales",
        areaServed: "CN",
        availableLanguage: ["zh-CN"],
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "23:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "09:00",
        closes: "21:00",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "岱山南路 16 号",
      addressLocality: "南京市",
      addressRegion: "江苏省",
      addressCountry: "CN",
    },
    sameAs: ["http://njchuangchi.com/"],
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
