const API_BASE_URL = 'https://api.kumopack.com/v1';

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
            const res = await fetch(`${API_BASE_URL}/articles?page=${page}&limit=${limit}`, {
                next: { revalidate: 3600 } // Cache for 1 hour
            });

            if (!res.ok) {
                throw new Error('Failed to fetch articles');
            }

            return await res.json();
        } catch (error) {
            console.error('Error fetching articles:', error);
            return { data: [], totalItems: 0 };
        }
    },

    async getArticleBySlug(slug: string): Promise<Article | null> {
        try {
            const res = await fetch(`${API_BASE_URL}/articles/${slug}`, {
                next: { revalidate: 3600 }
            });

            if (!res.ok) {
                return null;
            }

            return await res.json();
        } catch (error) {
            console.error(`Error fetching article ${slug}:`, error);
            return null;
        }
    }
};
