import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getCategoryBySlug,
  getToolsByCategory,
  getAllCategories,
} from "@/lib/tools";
import type { Tool } from "@/lib/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return { title: "404" };
  return {
    title: `${cat.name} - 出海工具箱`,
    description: cat.description,
  };
}

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

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  const tools = getToolsByCategory(slug);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <nav className="text-sm text-text-muted mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          首页
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">{cat.name}</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{cat.icon}</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text">
            {cat.name}
          </h1>
        </div>
        <p className="text-text-muted">{cat.description}</p>
      </div>

      {tools.length === 0 ? (
        <p className="text-text-muted text-center py-16">
          该分类暂无工具，快来
          <Link href="/submit" className="text-primary hover:underline mx-1">
            提交
          </Link>
          第一个吧
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
