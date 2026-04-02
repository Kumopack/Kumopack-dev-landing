import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  learningApi,
  LearningArticle,
  ArticlesResponse,
  Category,
} from "@/lib/learning-api";

// ---------------------------------------------------------------------------
// Query Keys
// ---------------------------------------------------------------------------

export const learningKeys = {
  articles: (params: {
    audience: string;
    lang: string;
    category: string;
    page: number;
    search: string;
    limit: number;
  }) =>
    [
      "learning-articles",
      params.audience,
      params.lang,
      params.category,
      params.page,
      params.search,
      params.limit,
    ] as const,

  allArticles: (audience: string, lang: string) =>
    ["learning-all-articles", audience, lang] as const,
};

// ---------------------------------------------------------------------------
// Derived data helpers
// ---------------------------------------------------------------------------

function deriveFeaturedArticle(
  articles: LearningArticle[],
): LearningArticle | null {
  return (
    articles.find((a) => a.isPinned && a.pinnedOrder === 1) ||
    articles.find((a) => a.isPinned) ||
    articles[0] ||
    null
  );
}

function deriveCategories(articles: LearningArticle[]): Category[] {
  return Array.from(
    new Map(
      articles
        .map((a) => {
          const cat =
            typeof a.category === "object" && a.category
              ? a.category
              : {
                  id: "misc",
                  name: String(a.category || "General"),
                  slug: String(a.category || "general").toLowerCase(),
                };
          return [cat.slug, cat] as [string, Category];
        })
        .filter(([slug]) => slug),
    ).values(),
  );
}

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

interface UseArticlesParams {
  audience: "buyer" | "supplier";
  lang: "th" | "en";
  category: string; // "all" for no filter
  page: number;
  search: string; // debounced search value
  limit?: number;
}

interface UseArticlesInitialData {
  data: LearningArticle[];
  totalPages: number;
}

/**
 * Fetches paginated articles with search/filter.
 * Uses `keepPreviousData` to prevent UI flash while new data loads.
 */
export function useArticles(
  params: UseArticlesParams,
  initialData?: UseArticlesInitialData,
) {
  const limit = params.limit || 12;

  return useQuery({
    queryKey: learningKeys.articles({
      audience: params.audience,
      lang: params.lang,
      category: params.category,
      page: params.page,
      search: params.search,
      limit,
    }),

    queryFn: async (): Promise<{
      data: LearningArticle[];
      totalPages: number;
    }> => {
      if (params.search) {
        const results = await learningApi.searchArticles({
          q: params.search,
          targetAudience: params.audience,
          lang: params.lang,
          category: params.category === "all" ? undefined : params.category,
          page: params.page,
          limit,
        });
        return { data: Array.isArray(results) ? results : [], totalPages: 1 };
      }

      const res = await learningApi.getArticles({
        targetAudience: params.audience,
        lang: params.lang,
        category: params.category === "all" ? undefined : params.category,
        page: params.page,
        limit,
      });
      return { data: res.data, totalPages: res.pagination.totalPages };
    },

    // Show cached data instantly while fetching new results
    placeholderData: keepPreviousData,

    // SSG initial data — only used when cache is completely empty
    ...(initialData ? { initialData } : {}),
  });
}

// ---------------------------------------------------------------------------

interface UseAllArticlesInitialData {
  categories: Category[];
  featured: LearningArticle | null;
}

/**
 * Fetches all articles for a given audience/lang to derive categories + featured article.
 */
export function useAllArticles(
  audience: "buyer" | "supplier",
  lang: "th" | "en",
  initialData?: UseAllArticlesInitialData,
) {
  return useQuery({
    queryKey: learningKeys.allArticles(audience, lang),

    queryFn: async (): Promise<{
      categories: Category[];
      featured: LearningArticle | null;
    }> => {
      const res = await learningApi.getArticles({
        targetAudience: audience,
        lang,
        limit: 100,
      });
      return {
        categories: deriveCategories(res.data),
        featured: deriveFeaturedArticle(res.data),
      };
    },

    // SSG initial data
    ...(initialData ? { initialData } : {}),
  });
}
