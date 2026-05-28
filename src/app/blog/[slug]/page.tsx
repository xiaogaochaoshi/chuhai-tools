import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getPostBySlug, getAllPosts } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "404" };
  return {
    title: `${post.title} - 出海工具箱`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const idx = allPosts.findIndex((p) => p.slug === slug);
  const prev = idx < allPosts.length - 1 ? allPosts[idx + 1] : null;
  const next = idx > 0 ? allPosts[idx - 1] : null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <nav className="text-sm text-text-muted mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          首页
        </Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-primary transition-colors">
          博客
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text truncate max-w-[200px] inline-block align-bottom">
          {post.title}
        </span>
      </nav>

      <article>
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-text mb-3">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-text-muted">
            <time>{post.date}</time>
            <span className="flex gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded bg-bg text-xs"
                >
                  {tag}
                </span>
              ))}
            </span>
          </div>
        </header>

        <div className="prose bg-card border border-border rounded-lg p-6 sm:p-8">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>

      {/* Prev/Next */}
      <nav className="mt-12 grid sm:grid-cols-2 gap-4">
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="p-4 rounded-lg border border-border bg-card hover:border-primary/30 transition-all text-left"
          >
            <span className="text-xs text-text-muted">上一篇</span>
            <p className="text-sm font-medium text-text mt-1 line-clamp-1">
              {prev.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="p-4 rounded-lg border border-border bg-card hover:border-primary/30 transition-all text-right"
          >
            <span className="text-xs text-text-muted">下一篇</span>
            <p className="text-sm font-medium text-text mt-1 line-clamp-1">
              {next.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
