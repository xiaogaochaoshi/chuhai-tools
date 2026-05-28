import Link from "next/link";

export default function SubmitPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <nav className="text-sm text-text-muted mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          首页
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">提交工具</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold text-text mb-4">
        提交工具
      </h1>
      <p className="text-text-muted mb-8">
        发现了好用的出海工具？欢迎推荐。审核通过后我们会添加到对应分类中。
      </p>

      {/* Static form that posts to nowhere for now */}
      <form className="space-y-5 bg-card border border-border rounded-lg p-6 sm:p-8">
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">
            工具名称 *
          </label>
          <input
            type="text"
            required
            placeholder="例如：Cursor"
            className="w-full px-3 py-2 border border-border rounded-md bg-bg text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1.5">
            官网地址 *
          </label>
          <input
            type="url"
            required
            placeholder="https://"
            className="w-full px-3 py-2 border border-border rounded-md bg-bg text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1.5">
            一句话简介 *
          </label>
          <input
            type="text"
            required
            placeholder="用一句话描述这个工具"
            className="w-full px-3 py-2 border border-border rounded-md bg-bg text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1.5">
            所属分类 *
          </label>
          <select
            required
            defaultValue=""
            className="w-full px-3 py-2 border border-border rounded-md bg-bg text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          >
            <option value="" disabled>
              请选择分类
            </option>
            <option value="ai-coding">AI编程助手</option>
            <option value="payment">出海支付</option>
            <option value="hosting">部署托管</option>
            <option value="email-marketing">邮件营销</option>
            <option value="domain-brand">域名/品牌</option>
            <option value="analytics">数据分析</option>
            <option value="ai-deploy">AI一键部署</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1.5">
            定价模式 *
          </label>
          <div className="flex gap-4">
            {[
              { value: "free", label: "免费" },
              { value: "freemium", label: "免费增值" },
              { value: "paid", label: "付费" },
            ].map((opt) => (
              <label key={opt.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="pricing"
                  value={opt.value}
                  className="accent-primary"
                />
                <span className="text-sm text-text">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1.5">
            推荐理由
          </label>
          <textarea
            rows={4}
            placeholder="说说你为什么推荐这个工具？有哪些亮点？"
            className="w-full px-3 py-2 border border-border rounded-md bg-bg text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1.5">
            你的邮箱
          </label>
          <input
            type="email"
            placeholder="选填，方便我们通知审核结果"
            className="w-full px-3 py-2 border border-border rounded-md bg-bg text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary-dark transition-colors font-medium"
        >
          提交推荐
        </button>
      </form>

      <p className="text-sm text-text-muted mt-4 text-center">
        提交后我们会人工审核，通常 1-3 个工作日内处理。
      </p>
    </div>
  );
}
