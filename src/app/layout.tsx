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
  { href: "/blog", label: "博客" },
  { href: "/categories/ai-coding", label: "AI编程" },
  { href: "/categories/payment", label: "支付" },
  { href: "/categories/hosting", label: "部署" },
  { href: "/categories/email-marketing", label: "邮件" },
  { href: "/categories/domain-brand", label: "品牌" },
  { href: "/categories/analytics", label: "数据" },
  { href: "/categories/ai-models", label: "大模型" },
  { href: "/categories/ai-deploy", label: "部署" },
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
          <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-text-muted">
            <div className="grid sm:grid-cols-2 gap-6 mb-6 text-left">
              <div>
                <h4 className="font-semibold text-text mb-2">关于本站</h4>
                <p>
                  出海工具箱是独立开发者的工具导航站，精选 AI
                  编程、支付、部署等出海必备工具，每款都经过实测。
                </p>
                <p className="mt-2">
                  <Link href="/submit" className="text-primary hover:underline">
                    提交工具
                  </Link>
                  {" · "}
                  <a href="mailto:hi@chuhai.tools" className="text-primary hover:underline">
                    联系我们
                  </a>
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-text mb-2">声明</h4>
                <ul className="space-y-1">
                  <li>
                    <strong>免责声明：</strong>
                    本站所有工具信息仅供参考，我们不保证其准确性、可用性或安全性。使用任何第三方工具前，请自行评估风险。
                  </li>
                  <li>
                    <strong>商标声明：</strong>
                    本站提及的所有产品名称、Logo、商标均归各自所有者所有。本站与所列工具无任何隶属、赞助或关联关系。
                  </li>
                  <li>
                    <strong>联盟链接：</strong>
                    本站部分链接含联盟佣金（Affiliate
                    Link），您通过本站链接注册或购买，我们可能获得收入。这不影响您的购买价格，也不会影响我们的推荐排序。
                  </li>
                  <li>
                    <strong>用户行为：</strong>
                    用户通过本站访问第三方网站、使用第三方工具的行为，与本站无关。因使用第三方工具产生的任何纠纷、损失，由用户与工具提供方自行解决。
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border pt-4 text-center text-xs">
              <p>&copy; {new Date().getFullYear()} 出海工具箱 — 仅供学习交流，不构成任何投资或商业建议</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
