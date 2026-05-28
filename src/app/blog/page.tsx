import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <nav className="text-sm text-text-muted mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          首页
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">博客</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold text-text mb-3">
        博客
      </h1>
      <p className="text-text-muted mb-8">
        独立开发者出海经验、工具对比测评、SEO 优化技巧。
      </p>

      {posts.length === 0 ? (
        <p className="text-text-muted text-center py-16">暂无文章</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-5 rounded-lg border border-border bg-card hover:shadow-md hover:border-primary/30 transition-all group"
            >
              <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
                <time>{post.date}</time>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded bg-bg text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-lg font-semibold text-text group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-text-muted mt-1.5 line-clamp-2">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
