import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "出海工具箱 - 独立开发者出海工具导航",
  description:
    "精选独立开发者出海必备工具：AI编程、支付收款、部署托管、邮件营销、域名品牌、数据分析。每款工具都经过实测，帮你做出最佳选择。",
};

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/categories/ai-coding", label: "AI编程" },
  { href: "/categories/payment", label: "支付" },
  { href: "/categories/hosting", label: "部署" },
  { href: "/categories/email-marketing", label: "邮件" },
  { href: "/categories/domain-brand", label: "品牌" },
  { href: "/categories/analytics", label: "数据" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-border bg-card sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link
              href="/"
              className="font-bold text-lg text-primary tracking-tight"
            >
              出海工具箱
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 text-sm text-text-muted hover:text-text rounded-md hover:bg-bg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/submit"
              className="text-sm bg-primary text-white px-4 py-1.5 rounded-md hover:bg-primary-dark transition-colors"
            >
              提交工具
            </Link>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border bg-card mt-16">
          <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-text-muted">
            <p>
              出海工具箱 — 独立开发者的工具导航站 · 每款工具都经过实测
            </p>
            <p className="mt-1">
              <Link href="/submit" className="text-primary hover:underline">
                提交工具
              </Link>
              {" · "}
              <a
                href="mailto:hi@chuhai.tools"
                className="text-primary hover:underline"
              >
                联系我们
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
