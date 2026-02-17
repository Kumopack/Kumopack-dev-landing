const API_BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://api.kumopack.com/v1';
const API_PRODUCTION_URL = 'https://api.kumopack.com/v1';

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
    author?: string; // Legacy/Fallback
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
    totalItems: number;
    currentPage: number;
    pageSize: number;
}

const TIMEOUT_MS = 15000; // 15s for slower local dev

async function fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
    const fetchWithSignal = async (targetUrl: string, signal: AbortSignal) => {
        return fetch(targetUrl, { ...options, signal });
    };

    const runFetch = async (targetUrl: string) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), TIMEOUT_MS);
        try {
            const response = await fetchWithSignal(targetUrl, controller.signal);
            clearTimeout(id);
            return response;
        } catch (error: any) {
            clearTimeout(id);
            throw error;
        }
    };

    try {
        return await runFetch(url);
    } catch (error: any) {
        const isLocal = url.includes('localhost') || url.includes('127.0.0.1');
        // Browser connection refusal usually throws a TypeError with "Failed to fetch"
        const isConnectionError = 
            error?.cause?.code === 'ECONNREFUSED' || 
            error?.name === 'AbortError' || 
            error?.message?.includes('Timeout') || 
            error?.message?.includes('Failed to fetch') ||
            error instanceof TypeError;
        
        if (isLocal && isConnectionError && API_BASE_URL !== API_PRODUCTION_URL) {
            console.warn(`[blogApi] Client-side Failover to Production: ${url.replace(API_BASE_URL, API_PRODUCTION_URL)}`);
            try {
                return await runFetch(url.replace(API_BASE_URL, API_PRODUCTION_URL));
            } catch (prodError) {
                throw prodError;
            }
        }
        throw error;
    }
}

export const blogApi = {
    async getCategories(): Promise<Category[]> {
        try {
            const res = await fetchWithTimeout(`${API_BASE_URL}/articles/category`, { next: { revalidate: 3600 } });
            if (!res.ok) throw new Error('Failed to fetch categories');
            return await res.json();
        } catch (error) {
            console.error('Error fetching blog categories:', error);
            return [];
        }
    },

    async getArticles(page = 1, limit = 12, category?: string): Promise<ArticlesResponse> {
        try {
            let url = `${API_BASE_URL}/articles?page=${page}&limit=${limit}`;
            if (category && category !== 'All') {
                url += `&category[]=${encodeURIComponent(category)}`;
            }
            const res = await fetchWithTimeout(url, { next: { revalidate: 60 } }); // Cache for 1 min
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
            const res = await fetchWithTimeout(url, { next: { revalidate: 60 } });
            if (!res.ok) return null;
            const article = await res.json();

            // Mock/Inject data for demonstration as requested
            // In a real app, this would come from the API
            if (article) {
                // If it's the mascot article (ID 93) or we want to demonstrate it generally
                // Using the specific ID from the user request '93'
                if (article.id == 93 || article.id === '93') {
                     article.createdBy = {
                        id: "40",
                        name: "Phontakorn Jarutrassana",
                        pictureProfilePath: "admin/1707147170334-Screen Shot 2022-02-08 at 10.21.57 AM.png"
                    };
                    article.keywords = [
                        { "id": "411", "keyword": "kumopack", "articleId": "93" },
                        { "id": "412", "keyword": "kumosan", "articleId": "93" },
                        { "id": "413", "keyword": "คุโมะซัง", "articleId": "93" },
                        { "id": "414", "keyword": "mascot", "articleId": "93" },
                        { "id": "415", "keyword": "character", "articleId": "93" },
                        { "id": "416", "keyword": "การออกแบบ", "articleId": "93" }
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
            const res = await fetchWithTimeout(`${API_BASE_URL}/articles/${encodeURIComponent(slug)}/related`, { next: { revalidate: 3600 } });
            if (!res.ok) return [];
            return await res.json();
        } catch (error) {
            console.error(`Error fetching related articles for ${slug}:`, error);
            return [];
        }
    },

    async incrementView(slug: string): Promise<void> {
        try {
            await fetchWithTimeout(`${API_BASE_URL}/articles/${encodeURIComponent(slug)}/increment-view`, {
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
        if (path.startsWith('/') && !path.startsWith('//') && !path.includes('articles') && !path.includes('admin')) {
             // For public folder assets, let the local utility handle it (or Next.js)
             return path; 
        }

        const storageBase = (process.env.NEXT_PUBLIC_IMAGE_URL || 'https://api.kumopack.com/v1/images') + '/';
        // Remove leading slash if present to avoid double slashes with storageBase
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        return `${storageBase}${cleanPath}`;
    }
};
