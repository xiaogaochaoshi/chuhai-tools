import Link from "next/link";
import {
  getFeaturedTools,
  getAllCategories,
  getAllTools,
} from "@/lib/tools";
import type { Tool, Category } from "@/lib/types";

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="block p-5 rounded-lg border border-border bg-card hover:shadow-md hover:border-primary/30 transition-all group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text group-hover:text-primary transition-colors truncate">
            {tool.name}
          </h3>
          <p className="text-sm text-text-muted mt-1 line-clamp-2">
            {tool.tagline}
          </p>
        </div>
        <span
          className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
            tool.pricing === "free"
              ? "bg-green-50 text-green-700"
              : tool.pricing === "freemium"
              ? "bg-blue-50 text-blue-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {tool.pricing === "free" ? "免费" : tool.pricing === "freemium" ? "免费增值" : "付费"}
        </span>
      </div>
    </Link>
  );
}

function CategoryCard({ category, count }: { category: Category; count: number }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card hover:shadow-md hover:border-primary/30 transition-all group"
    >
      <span className="text-2xl">{category.icon}</span>
      <div>
        <h3 className="font-semibold text-text group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        <p className="text-xs text-text-muted mt-0.5">
          {count} 个工具
        </p>
      </div>
    </Link>
  );
}

export default function Home() {
  const featured = getFeaturedTools();
  const categories = getAllCategories();
  const allTools = getAllTools();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero */}
      <section className="text-center py-10 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">
          独立开发者<span className="text-primary">出海</span>工具导航
        </h1>
        <p className="mt-4 text-lg text-text-muted max-w-xl mx-auto">
          精选 AI 编程、支付收款、部署托管、邮件营销等工具，
          <br />
          每款都经过实测，帮你做出最佳选择。
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/categories/ai-coding"
            className="text-sm bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-primary-dark transition-colors font-medium"
          >
            开始探索
          </Link>
          <Link
            href="/submit"
            className="text-sm border border-border text-text-muted px-5 py-2.5 rounded-lg hover:bg-card transition-colors font-medium"
          >
            提交工具
          </Link>
        </div>
      </section>

      {/* Featured tools */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-text">精选推荐</h2>
          <Link
            href="/categories/ai-coding"
            className="text-sm text-primary hover:underline"
          >
            查看全部 &rarr;
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-text mb-5">分类浏览</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.slug}
              category={cat}
              count={allTools.filter((t) => t.category === cat.slug).length}
            />
          ))}
        </div>
      </section>

      {/* All tools */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-text mb-5">
          全部工具 ({allTools.length})
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
}
