import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Tool, ToolFrontmatter, Category } from './types';

const toolsDir = path.join(process.cwd(), 'content', 'tools');
const categoriesDir = path.join(process.cwd(), 'content', 'categories');

export function getAllTools(): Tool[] {
  if (!fs.existsSync(toolsDir)) return [];

  const files = fs.readdirSync(toolsDir).filter((f) => f.endsWith('.md'));

  const tools = files.map((file) => {
    const raw = fs.readFileSync(path.join(toolsDir, file), 'utf-8');
    const { data, content } = matter(raw);
    const front = data as ToolFrontmatter;
    return {
      slug: file.replace('.md', ''),
      name: front.name,
      tagline: front.tagline,
      description: content.trim(),
      url: front.url,
      category: front.category,
      pricing: front.pricing,
      featured: front.featured ?? false,
      deploy_url: front.deploy_url,
      deploy_cn_url: front.deploy_cn_url,
      affiliate: front.affiliate,
      logo: front.logo,
    } satisfies Tool;
  });

  return tools.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
}

export function getToolBySlug(slug: string): Tool | null {
  const filePath = path.join(toolsDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const front = data as ToolFrontmatter;
  return {
    slug,
    name: front.name,
    tagline: front.tagline,
    description: content.trim(),
    url: front.url,
    category: front.category,
    pricing: front.pricing,
    featured: front.featured ?? false,
    deploy_url: front.deploy_url,
    deploy_cn_url: front.deploy_cn_url,
    affiliate: front.affiliate,
    logo: front.logo,
  };
}

export function getToolsByCategory(categorySlug: string): Tool[] {
  return getAllTools().filter((t) => t.category === categorySlug);
}

export function getFeaturedTools(): Tool[] {
  return getAllTools().filter((t) => t.featured);
}

export function getAllCategories(): Category[] {
  if (!fs.existsSync(categoriesDir)) return [];

  const files = fs.readdirSync(categoriesDir).filter((f) => f.endsWith('.md'));

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(categoriesDir, file), 'utf-8');
    const { data } = matter(raw);
    return {
      slug: file.replace('.md', ''),
      name: data.name,
      description: data.description,
      icon: data.icon,
    } satisfies Category;
  });
}

export function getCategoryBySlug(slug: string): Category | null {
  const filePath = path.join(categoriesDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(raw);
  return {
    slug,
    name: data.name,
    description: data.description,
    icon: data.icon,
  };
}
