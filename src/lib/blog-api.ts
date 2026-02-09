const API_BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://api.kumopack.com/v1';

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
    descriptionTh?: string; // Rich text
    descriptionEn?: string; // Rich text
    conclusionTh?: string; // Rich text
    conclusionEn?: string; // Rich text
    featurePicturePath: string;
    totalView: number;
    publishedDate: string;
    createdAt: string;
    updatedAt: string;
    categories: Category[];
}

export interface ArticlesResponse {
    data: Article[];
    totalItems: number;
    currentPage: number;
    pageSize: number;
}

export const blogApi = {
    async getCategories(): Promise<Category[]> {
        try {
            const res = await fetch(`${API_BASE_URL}/articles/category`);
            if (!res.ok) throw new Error('Failed to fetch categories');
            return await res.json();
        } catch (error) {
            console.error('Error fetching blog categories:', error);
            return [];
        }
    },

    async getArticles(page = 1, limit = 12): Promise<ArticlesResponse> {
        try {
            const res = await fetch(`${API_BASE_URL}/articles?page=${page}&limit=${limit}`);
            if (!res.ok) throw new Error('Failed to fetch articles');
            return await res.json();
        } catch (error) {
            console.error('Error fetching articles:', error);
            return { data: [], totalItems: 0, currentPage: 1, pageSize: 12 };
        }
    },

    async getArticleBySlug(slug: string): Promise<Article | null> {
        try {
            const url = `${API_BASE_URL}/articles/${encodeURIComponent(slug)}`;
            console.log(`[blogApi] Fetching article from: ${url}`);
            const res = await fetch(url);
            if (!res.ok) {
                console.warn(`[blogApi] Fetch failed for ${slug}: ${res.status}`);
                return null;
            }
            return await res.json();
        } catch (error) {
            console.error(`Error fetching article ${slug}:`, error);
            return null;
        }
    },

    async getRelatedArticles(slug: string): Promise<Article[]> {
        try {
            const res = await fetch(`${API_BASE_URL}/articles/${slug}/related`);
            if (!res.ok) return [];
            return await res.json();
        } catch (error) {
            console.error(`Error fetching related articles for ${slug}:`, error);
            return [];
        }
    },

    async incrementView(slug: string): Promise<void> {
        try {
            await fetch(`${API_BASE_URL}/articles/${slug}/increment-view`, {
                method: 'POST',
            });
        } catch (error) {
            console.error(`Error incrementing view for ${slug}:`, error);
        }
    },

    getAssetPath(path: string): string {
        if (!path) return '';
        // If it's already an absolute URL or data URI, return as is
        if (path.startsWith('http') || path.startsWith('data:')) {
            return path;
        }

        // If it starts with / but is not followed by / (to avoid // protocol-relative)
        // AND it's likely a local asset from the public folder
        if (path.startsWith('/') && !path.startsWith('//') && !path.includes('articles')) {
             // For public folder assets, let the local utility handle it (or Next.js)
             return path; 
        }

        const storageBase = (process.env.NEXT_PUBLIC_IMAGE_URL || 'https://api.kumopack.com/v1/images') + '/';
        // Remove leading slash if present to avoid double slashes with storageBase
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        return `${storageBase}${cleanPath}`;
    }
};
