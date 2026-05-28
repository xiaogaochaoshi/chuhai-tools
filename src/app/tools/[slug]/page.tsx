import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getToolBySlug, getAllTools, getCategoryBySlug } from "@/lib/tools";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllTools().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "404" };
  return {
    title: `${tool.name} - ${tool.tagline} - 出海工具箱`,
    description: tool.tagline,
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const category = getCategoryBySlug(tool.category);
  const related = getAllTools()
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 3);

  const pricingLabel =
    tool.pricing === "free"
      ? "免费"
      : tool.pricing === "freemium"
      ? "免费增值"
      : "付费";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-text-muted mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          首页
        </Link>
        <span className="mx-2">/</span>
        {category && (
          <>
            <Link
              href={`/categories/${category.slug}`}
              className="hover:text-primary transition-colors"
            >
              {category.name}
            </Link>
            <span className="mx-2">/</span>
          </>
        )}
        <span className="text-text">{tool.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-4 flex-wrap">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-text">
              {tool.name}
            </h1>
            <p className="mt-2 text-lg text-text-muted">{tool.tagline}</p>
          </div>
          <span
            className={`text-sm px-3 py-1 rounded-full font-medium ${
              tool.pricing === "free"
                ? "bg-green-50 text-green-700"
                : tool.pricing === "freemium"
                ? "bg-blue-50 text-blue-700"
                : "bg-amber-50 text-amber-700"
            }`}
          >
            {pricingLabel}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-3 flex-wrap">
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-primary-dark transition-colors font-medium"
          >
            访问官网 &rarr;
          </a>
          {tool.deploy_url && (
            <a
              href={tool.deploy_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              AI一键部署
            </a>
          )}
          {tool.deploy_cn_url && (
            <a
              href={tool.deploy_cn_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              国内部署
            </a>
          )}
          {tool.affiliate ? (
            <span className="text-xs bg-amber-50 text-amber-800 px-2 py-0.5 rounded">
              🔗 含联盟链接 — 通过此链接购买我们可能获得佣金，不影响您的价格
            </span>
          ) : (
            <span className="text-xs bg-slate-50 text-text-muted px-2 py-0.5 rounded">
              本站与 {tool.name} 无任何商业合作关系
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="prose bg-card border border-border rounded-lg p-6 sm:p-8">
        <ReactMarkdown>{tool.description}</ReactMarkdown>
      </div>

      {/* Related tools */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-bold text-text mb-4">
            同类工具推荐
          </h2>
          <div className="grid gap-3">
            {related.map((t) => (
              <Link
                key={t.slug}
                href={`/tools/${t.slug}`}
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all"
              >
                <div>
                  <h3 className="font-semibold text-text">{t.name}</h3>
                  <p className="text-sm text-text-muted mt-0.5">
                    {t.tagline}
                  </p>
                </div>
                <span className="text-text-muted text-sm">&rarr;</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
