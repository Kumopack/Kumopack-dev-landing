import { API_BASE_URL } from "./api-config";
import { apiGet } from "./api-client";

export interface Article {
  id: string | number;
  title: string;
  slug: string;
  image: string;
  description: string;
  content?: string;
  created_at: string;
  updated_at: string;
  category?: {
    name: string;
  };
}

export interface ArticlesResponse {
  data: Article[];
  totalItems: number;
}

export const api = {
  async getArticles(page = 1, limit = 10): Promise<ArticlesResponse> {
    try {
      return await apiGet<ArticlesResponse>(
        `/articles?page=${page}&limit=${limit}`,
        { next: { revalidate: 3600 } },
      );
    } catch (error) {
      console.error("Error fetching articles:", error);
      return { data: [], totalItems: 0 };
    }
  },

  async getArticleBySlug(slug: string): Promise<Article | null> {
    try {
      return await apiGet<Article>(`/articles/${slug}`, {
        next: { revalidate: 3600 },
      });
    } catch (error) {
      console.error(`Error fetching article ${slug}:`, error);
      return null;
    }
  },
};
