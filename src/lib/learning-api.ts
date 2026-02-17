const API_BASE_URL = (process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://api.kumopack.com/v1') + '/learning-center';

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
    lang?: 'th' | 'en';
    url: string;
    difficultyLevel?: 'beginner' | 'intermediate' | 'advanced';
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
    targetAudience?: 'buyer' | 'supplier';
    lang?: 'th' | 'en';
    page?: number;
    limit?: number;
}

export const learningApi = {
    // 📚 บทความ (Articles)
    async getArticles(params: ArticleParams = {}): Promise<ArticlesResponse> {
        try {
            const queryParams = new URLSearchParams();
            
            // Align with NestJS Controller: @Query('categorySlug'), @Query('tagSlug')
            if (params.category && params.category !== 'all') {
                queryParams.append('categorySlug', params.category);
            }
            if (params.tag) {
                queryParams.append('tagSlug', params.tag);
            }
            if (params.search) {
                queryParams.append('search', params.search);
            }
            if (params.featured !== undefined) {
                queryParams.append('featured', String(params.featured));
            }
            if (params.difficulty) {
                queryParams.append('difficulty', params.difficulty);
            }
            
            // targetAudience is REQUIRED by the backend in getPublicArticles
            queryParams.append('targetAudience', params.targetAudience || 'buyer');
            queryParams.append('lang', params.lang || 'th');
            
            if (params.page) {
                queryParams.append('page', String(params.page));
            }
            if (params.limit) {
                queryParams.append('limit', String(params.limit));
            }

            const url = `${API_BASE_URL}/articles?${queryParams.toString()}`;
            
            const res = await fetch(url);
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Failed to fetch learning articles: ${res.status} ${errorText}`);
            }
            return await res.json();
        } catch (error) {
            console.error('Error fetching learning articles:', error);
            return { data: [], pagination: { page: 1, limit: 12, total: 0, totalPages: 0 } };
        }
    },

    async getArticleBySlug(slug: string, lang: string = 'th', id?: string | number): Promise<LearningArticle | null> {
        try {
            const queryParams = new URLSearchParams();
            if (id) {
                queryParams.append('id', String(id));
            } else {
                queryParams.append('slug', slug);
            }
            queryParams.append('lang', lang);
            
            const url = `${API_BASE_URL}/article?${queryParams.toString()}`;
            const res = await fetch(url);
            if (!res.ok) {
                if (res.status === 404) return null;
                const errorText = await res.text();
                throw new Error(`Failed to fetch learning article: ${res.status} ${errorText}`);
            }
            return await res.json();
        } catch (error) {
            console.error(`Error fetching learning article ${id || slug}:`, error);
            return null;
        }
    },

    async getArticlesByCategory(slug: string, audience: 'buyer' | 'supplier', lang: string = 'th'): Promise<LearningArticle[]> {
        try {
            // Route: /v1/learning-center/{lang}/category/{categorySlug}?targetAudience={audience}
            const url = `${API_BASE_URL}/${lang}/category/${encodeURIComponent(slug)}?targetAudience=${audience}`;
            const res = await fetch(url);
            if (!res.ok) return [];
            const result = await res.json();
            return Array.isArray(result) ? result : (result.data || []);
        } catch (error) {
            console.error(`Error fetching articles for category ${slug}:`, error);
            return [];
        }
    },

    async getArticlesByTag(slug: string, audience: 'buyer' | 'supplier', lang: string = 'th'): Promise<LearningArticle[]> {
        try {
            // Route: /v1/learning-center/{lang}/tag/{tagSlug}?targetAudience={audience}
            const url = `${API_BASE_URL}/${lang}/tag/${encodeURIComponent(slug)}?targetAudience=${audience}`;
            const res = await fetch(url);
            if (!res.ok) return [];
            const result = await res.json();
            return Array.isArray(result) ? result : (result.data || []);
        } catch (error) {
            console.error(`Error fetching articles for tag ${slug}:`, error);
            return [];
        }
    },

    async searchArticles(params: { q: string; targetAudience: 'buyer' | 'supplier'; lang?: string; category?: string; tag?: string; page?: number; limit?: number }): Promise<LearningArticle[]> {
        try {
            const queryParams = new URLSearchParams();
            queryParams.append('q', params.q);
            queryParams.append('targetAudience', params.targetAudience);
            queryParams.append('lang', params.lang || 'th');
            if (params.category) queryParams.append('category', params.category);
            if (params.tag) queryParams.append('tag', params.tag);
            if (params.page) queryParams.append('page', String(params.page));
            if (params.limit) queryParams.append('limit', String(params.limit));

            const res = await fetch(`${API_BASE_URL}/search?${queryParams.toString()}`);
            if (!res.ok) return [];
            const result = await res.json();
            return Array.isArray(result) ? result : (result.data || []);
        } catch (error) {
            console.error(`Error searching articles for ${params.q}:`, error);
            return [];
        }
    },

    async getFeaturedArticles(lang: string = 'th'): Promise<LearningArticle[]> {
        try {
            const res = await fetch(`${API_BASE_URL}/featured?lang=${lang}`);
            if (!res.ok) return [];
            const result = await res.json();
            return Array.isArray(result) ? result : (result.data || []);
        } catch (error) {
            console.error('Error fetching featured articles:', error);
            return [];
        }
    },

    async getRelatedArticles(slug: string, lang: string = 'th'): Promise<LearningArticle[]> {
        try {
            const res = await fetch(`${API_BASE_URL}/related?slug=${encodeURIComponent(slug)}&lang=${lang}`);
            if (!res.ok) return [];
            const result = await res.json();
            return Array.isArray(result) ? result : (result.data || []);
        } catch (error) {
            console.error(`Error fetching related articles for ${slug}:`, error);
            return [];
        }
    },

    // 🏷️ หมวดหมู่ & แท็ก
    async getCategories(targetAudience?: string, lang: string = 'th'): Promise<Category[]> {
        try {
            const queryParams = new URLSearchParams();
            if (targetAudience) queryParams.append('targetAudience', targetAudience);
            if (lang) queryParams.append('lang', lang);

            const res = await fetch(`${API_BASE_URL}/categories?${queryParams.toString()}`);
            if (!res.ok) throw new Error('Failed to fetch categories');
            return await res.json();
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    },

    async getTags(lang: string = 'th'): Promise<Tag[]> {
        try {
            const queryParams = new URLSearchParams();
            queryParams.append('lang', lang);

            const res = await fetch(`${API_BASE_URL}/tags?${queryParams.toString()}`);
            if (!res.ok) throw new Error('Failed to fetch tags');
            return await res.json();
        } catch (error) {
            console.error('Error fetching tags:', error);
            return [];
        }
    },

    // ❓ FAQ
    async getFaqs(targetAudience?: string, lang: string = 'th'): Promise<any[]> {
        try {
            const queryParams = new URLSearchParams();
            if (targetAudience) queryParams.append('targetAudience', targetAudience);
            if (lang) queryParams.append('lang', lang);

            const res = await fetch(`${API_BASE_URL}/faq?${queryParams.toString()}`);
            if (!res.ok) throw new Error('Failed to fetch FAQs');
            return await res.json();
        } catch (error) {
            console.error('Error fetching FAQs:', error);
            return [];
        }
    },

    async getFaqDetail(slug: string, lang: string = 'th'): Promise<any> {
        try {
            const res = await fetch(`${API_BASE_URL}/faq/detail?slug=${encodeURIComponent(slug)}&lang=${lang}`);
            if (!res.ok) return null;
            return await res.json();
        } catch (error) {
            console.error(`Error fetching FAQ detail for ${slug}:`, error);
            return null;
        }
    },

    // 🔧 Utilities
    async getSitemap(lang: string = 'th'): Promise<{ articles: { slug: string }[], categories?: Category[], tags?: Tag[] }> {
        try {
            const res = await fetch(`${API_BASE_URL}/sitemap?lang=${lang}`);
            if (!res.ok) throw new Error('Failed to fetch sitemap');
            return await res.json();
        } catch (error) {
            console.error('Error fetching sitemap:', error);
            return { articles: [] };
        }
    },

    async getBreadcrumbs(slug: string, lang: string = 'th'): Promise<any[]> {
        try {
            const res = await fetch(`${API_BASE_URL}/breadcrumbs?slug=${encodeURIComponent(slug)}&lang=${lang}`);
            if (!res.ok) return [];
            return await res.json();
        } catch (error) {
            console.error(`Error fetching breadcrumbs for ${slug}:`, error);
            return [];
        }
    },

    getAssetPath(path: string | null): string {
        const basePath = process.env.NODE_ENV === 'production' ? '/Kumopack-dev-landing' : '';
        if (!path) return `${basePath}/asset/3d-box.png`;
        if (path.startsWith('http') || path.startsWith('data:')) {
            return path;
        }
        // Base URL should be the root of the v1 API because paths from backend 
        // already include subfolders like 'images/' or 'videos/'
        const storageBase = 'https://api.kumopack.com/v1/';
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        return `${storageBase}${cleanPath}`;
    }
};
