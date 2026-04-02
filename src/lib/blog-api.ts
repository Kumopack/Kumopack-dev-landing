import { API_IMAGE_URL } from "./api-config";
import { apiFetch } from "./api-client";

export interface Category {
  id: string | number;
  nameTh: string;
  nameEn: string | null;
  slug: string;
  descriptionTh: string;
  descriptionEn: string | null;
  featurePicturePath: string | null;
}

export interface Article {
  id: string | number;
  nameTh: string;
  nameEn: string;
  slug: string;
  shortDescriptionTh: string;
  shortDescriptionEn: string;
  descriptionTh?: string;
  descriptionEn?: string;
  contentTh?: string;
  contentEn?: string;
  conclusionTh?: string;
  conclusionEn?: string;
  featurePicturePath: string;
  totalView: number;
  publishedDate: string;
  createdAt: string;
  updatedAt: string;
  categories: Category[];
  author?: string;
  createdBy?: {
    id: string | number;
    uuId?: string;
    name: string;
    email?: string;
    pictureProfilePath: string | null;
    isChat?: boolean;
    roleId?: number;
    saleTeamId?: number;
    saleTeamPosition?: string;
    description?: string | null;
    code?: string;
  };
  keywords?: {
    id: string | number;
    keyword: string;
    articleId: string | number;
  }[];
}

export interface ArticlesResponse {
  data: Article[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const blogApi = {
  async getCategories(): Promise<Category[]> {
    try {
      const res = await apiFetch(
        `/articles/category`,
        {},
        {
          next: { revalidate: 3600 },
          failoverToProduction: true,
        },
      );
      if (!res.ok) throw new Error("Failed to fetch categories");
      return await res.json();
    } catch (error) {
      console.error("Error fetching blog categories:", error);
      return [];
    }
  },

  async getArticles(
    page = 1,
    limit = 12,
    category?: string,
  ): Promise<ArticlesResponse> {
    console.log("category", category);
    try {
      let path = `/articles?page=${page}&limit=${limit}`;
      if (category && category !== "All") {
        path += `&category[]=${encodeURIComponent(category)}`;
      }
      console.log("path:", path);
      const res = await apiFetch(path, {}, { failoverToProduction: true });
      if (!res.ok) {
        console.error(
          `[blogApi] Failed to fetch articles: ${res.status} ${res.statusText}`,
        );
        throw new Error("Failed to fetch articles");
      }
      const data = await res.json();

      return data;
    } catch (error) {
      console.error("Error fetching articles:", error);
      return {
        data: [],
        pagination: { total: 0, page: 1, limit: 12, totalPages: 1 },
      };
    }
  },

  async getArticleBySlug(slug: string): Promise<Article | null> {
    try {
      const idOrSlug = slug;

      console.log(`[blogApi] Fetching article by slug: ${slug}`);
      const res = await apiFetch(
        `/articles/${encodeURIComponent(idOrSlug)}`,
        {},
        { failoverToProduction: true },
      );
      if (!res.ok) return null;
      const article = await res.json();

      if (article) {
        if (article.id == 93 || article.id === "93") {
          article.createdBy = {
            id: "40",
            name: "Phontakorn Jarutrassana",
            pictureProfilePath:
              "admin/1707147170334-Screen Shot 2022-02-08 at 10.21.57 AM.png",
          };
          article.keywords = [
            { id: "411", keyword: "kumopack", articleId: "93" },
            { id: "412", keyword: "kumosan", articleId: "93" },
            { id: "413", keyword: "คุโมะซัง", articleId: "93" },
            { id: "414", keyword: "mascot", articleId: "93" },
            { id: "415", keyword: "character", articleId: "93" },
            { id: "416", keyword: "การออกแบบ", articleId: "93" },
          ];
        }
      }
      return article;
    } catch (error) {
      console.error(`Error fetching article ${slug}:`, error);
      return null;
    }
  },

  async getRelatedArticles(slug: string): Promise<Article[]> {
    try {
      const res = await apiFetch(
        `/articles/${encodeURIComponent(slug)}/related`,
        {},
        { failoverToProduction: true },
      );
      if (!res.ok) return [];
      return await res.json();
    } catch (error) {
      console.error(`Error fetching related articles for ${slug}:`, error);
      return [];
    }
  },

  async incrementView(slug: string): Promise<void> {
    try {
      await apiFetch(
        `/articles/${encodeURIComponent(slug)}/increment-view`,
        { method: "POST" },
        { failoverToProduction: true },
      );
    } catch (error) {
      console.error(`Error incrementing view for ${slug}:`, error);
    }
  },

  getAssetPath(path: string): string {
    if (!path) return "";

    if (path.startsWith("http") || path.startsWith("data:")) {
      return path;
    }

    if (
      path.startsWith("/") &&
      !path.startsWith("/articles") &&
      !path.startsWith("/admin")
    ) {
      return path;
    }

    const storageBase = API_IMAGE_URL + "/";
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return `${storageBase}${cleanPath}`;
  },
};
