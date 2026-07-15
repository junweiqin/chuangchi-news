import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://chuangchi.cc"),
  title: "创驰资讯｜公司动态与官方公告",
  description: "创驰官方资讯站，发布公司最新动态、官方公告与阶段性思考。",
  openGraph: {
    title: "创驰资讯｜让每一次进展，都被清晰看见",
    description: "汇集创驰最新动态、官方公告与阶段性思考。",
    url: "https://chuangchi.cc",
    siteName: "创驰资讯",
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
