import { API_BASE_URL } from "./api-config";
import { apiGet } from "./api-client";

const LEARNING_BASE = `${API_BASE_URL}/learning-center`;

export interface Category {
  id: string | number;
  name: string;
  slug: string;
  url?: string;
  articleCount?: number;
}

export interface Tag {
  id: string | number;
  name: string;
  slug: string;
  url?: string;
  color?: string;
  articleCount?: number;
}

export interface LearningVideo {
  id: number;
  videoUrl: string;
  duration?: string | number;
  length?: string | number;
  platform?: string;
}

export interface LearningArticle {
  id: string | number;
  title: string;
  description: string;
  excerpt: string;
  content: string | null;
  category: string | Category | null;
  tags: Tag[];
  audience: string | string[];
  image: string;
  featuredImagePath: string | null;
  thumbnailPath: string | null;
  videoUrl?: string;
  videos: LearningVideo[];
  date: string;
  publishedAt: string | null;
  views: number;
  viewCount: number;
  slug: string;
  lang?: "th" | "en";
  url: string;
  difficultyLevel?: "beginner" | "intermediate" | "advanced";
  difficultyText?: string;
  readingTime?: number;
  readingTimeText?: string;
  isPinned?: boolean;
  pinnedOrder?: number | null;
  featuredImageAlt?: string | null;
  meta?: {
    title?: string;
    description?: string;
    keywords?: string | null;
    content?: string;
  };
  tutorial?: {
    url?: string;
    title?: string | null;
  };
  tutorialUrl?: string;
  isFeatured?: boolean;
  isPremium?: boolean;
}

export interface ArticlesResponse {
  data: LearningArticle[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ArticleParams {
  category?: string;
  tag?: string;
  search?: string;
  featured?: boolean;
  difficulty?: string;
  targetAudience?: "buyer" | "supplier";
  lang?: "th" | "en";
  page?: number;
  limit?: number;
}

// ---------------------------------------------------------------------------
// Helper: build query string from ArticleParams
// ---------------------------------------------------------------------------

function buildArticleQuery(params: ArticleParams): string {
  const q = new URLSearchParams();

  if (params.category && params.category !== "all")
    q.append("categorySlug", params.category);
  if (params.tag) q.append("tagSlug", params.tag);
  if (params.search) q.append("search", params.search);
  if (params.featured !== undefined)
    q.append("featured", String(params.featured));
  if (params.difficulty) q.append("difficulty", params.difficulty);
  q.append("targetAudience", params.targetAudience || "buyer");
  q.append("lang", params.lang || "th");
  if (params.page) q.append("page", String(params.page));
  if (params.limit) q.append("limit", String(params.limit));

  return q.toString();
}

function extractArray(result: any): any[] {
  return Array.isArray(result) ? result : result.data || [];
}

// ---------------------------------------------------------------------------
// API
// ---------------------------------------------------------------------------

export const learningApi = {
  async getArticles(params: ArticleParams = {}): Promise<ArticlesResponse> {
    try {
      return await apiGet<ArticlesResponse>(
        `${LEARNING_BASE}/articles?${buildArticleQuery(params)}`,
      );
    } catch (error) {
      console.error("Error fetching learning articles:", error);
      return {
        data: [],
        pagination: { page: 1, limit: 12, total: 0, totalPages: 0 },
      };
    }
  },

  async getArticleBySlug(
    slug: string,
    lang: string = "th",
    id?: string | number,
  ): Promise<LearningArticle | null> {
    try {
      const q = new URLSearchParams();
      if (id) {
        q.append("id", String(id));
      } else {
        q.append("slug", slug);
      }
      q.append("lang", lang);

      return await apiGet<LearningArticle>(
        `${LEARNING_BASE}/article?${q.toString()}`,
      );
    } catch (error) {
      if ((error as any)?.status === 404) return null;
      console.error(`Error fetching learning article ${id || slug}:`, error);
      return null;
    }
  },

  async getArticlesByCategory(
    slug: string,
    audience: "buyer" | "supplier",
    lang: string = "th",
  ): Promise<LearningArticle[]> {
    try {
      const result = await apiGet<any>(
        `${LEARNING_BASE}/${lang}/category/${encodeURIComponent(slug)}?targetAudience=${audience}`,
      );
      return extractArray(result);
    } catch (error) {
      console.error(`Error fetching articles for category ${slug}:`, error);
      return [];
    }
  },

  async getArticlesByTag(
    slug: string,
    audience: "buyer" | "supplier",
    lang: string = "th",
  ): Promise<LearningArticle[]> {
    try {
      const result = await apiGet<any>(
        `${LEARNING_BASE}/${lang}/tag/${encodeURIComponent(slug)}?targetAudience=${audience}`,
      );
      return extractArray(result);
    } catch (error) {
      console.error(`Error fetching articles for tag ${slug}:`, error);
      return [];
    }
  },

  async searchArticles(params: {
    q: string;
    targetAudience: "buyer" | "supplier";
    lang?: string;
    category?: string;
    tag?: string;
    page?: number;
    limit?: number;
  }): Promise<LearningArticle[]> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("q", params.q);
      queryParams.append("targetAudience", params.targetAudience);
      queryParams.append("lang", params.lang || "th");
      if (params.category) queryParams.append("category", params.category);
      if (params.tag) queryParams.append("tag", params.tag);
      if (params.page) queryParams.append("page", String(params.page));
      if (params.limit) queryParams.append("limit", String(params.limit));

      const result = await apiGet<any>(
        `${LEARNING_BASE}/search?${queryParams.toString()}`,
      );
      return extractArray(result);
    } catch (error) {
      console.error(`Error searching articles for ${params.q}:`, error);
      return [];
    }
  },

  async getFeaturedArticles(lang: string = "th"): Promise<LearningArticle[]> {
    try {
      const result = await apiGet<any>(
        `${LEARNING_BASE}/featured?lang=${lang}`,
      );
      return extractArray(result);
    } catch (error) {
      console.error("Error fetching featured articles:", error);
      return [];
    }
  },

  async getRelatedArticles(
    slug: string,
    lang: string = "th",
  ): Promise<LearningArticle[]> {
    try {
      const result = await apiGet<any>(
        `${LEARNING_BASE}/related?slug=${encodeURIComponent(slug)}&lang=${lang}`,
      );
      return extractArray(result);
    } catch (error) {
      console.error(`Error fetching related articles for ${slug}:`, error);
      return [];
    }
  },

  async getCategories(
    targetAudience?: string,
    lang: string = "th",
  ): Promise<Category[]> {
    try {
      const q = new URLSearchParams();
      if (targetAudience) q.append("targetAudience", targetAudience);
      if (lang) q.append("lang", lang);

      return await apiGet<Category[]>(
        `${LEARNING_BASE}/categories?${q.toString()}`,
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },

  async getTags(lang: string = "th"): Promise<Tag[]> {
    try {
      const q = new URLSearchParams();
      q.append("lang", lang);

      return await apiGet<Tag[]>(`${LEARNING_BASE}/tags?${q.toString()}`);
    } catch (error) {
      console.error("Error fetching tags:", error);
      return [];
    }
  },

  async getFaqs(targetAudience?: string, lang: string = "th"): Promise<any[]> {
    try {
      const q = new URLSearchParams();
      if (targetAudience) q.append("targetAudience", targetAudience);
      if (lang) q.append("lang", lang);

      return await apiGet<any[]>(`${LEARNING_BASE}/faq?${q.toString()}`);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      return [];
    }
  },

  async getFaqDetail(slug: string, lang: string = "th"): Promise<any> {
    try {
      return await apiGet<any>(
        `${LEARNING_BASE}/faq/detail?slug=${encodeURIComponent(slug)}&lang=${lang}`,
      );
    } catch (error) {
      console.error(`Error fetching FAQ detail for ${slug}:`, error);
      return null;
    }
  },

  async getSitemap(
    lang: string = "th",
  ): Promise<{
    articles: { slug: string }[];
    categories?: Category[];
    tags?: Tag[];
  }> {
    try {
      return await apiGet<{
        articles: { slug: string }[];
        categories?: Category[];
        tags?: Tag[];
      }>(`${LEARNING_BASE}/sitemap?lang=${lang}`);
    } catch (error) {
      console.error("Error fetching sitemap:", error);
      return { articles: [] };
    }
  },

  async getBreadcrumbs(slug: string, lang: string = "th"): Promise<any[]> {
    try {
      return await apiGet<any[]>(
        `${LEARNING_BASE}/breadcrumbs?slug=${encodeURIComponent(slug)}&lang=${lang}`,
      );
    } catch (error) {
      console.error(`Error fetching breadcrumbs for ${slug}:`, error);
      return [];
    }
  },

  getAssetPath(path: string | null): string {
    const basePath =
      process.env.NODE_ENV === "production" ? "/Kumopack-dev-landing" : "";
    if (!path) return `${basePath}/asset/3d-box.png`;
    if (path.startsWith("http") || path.startsWith("data:")) {
      return path;
    }

    const storageBase = `${API_BASE_URL}/`;
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return `${storageBase}${cleanPath}`;
  },
};
