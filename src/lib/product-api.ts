import { getStoragePath } from "@/lib/utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://api.kumopack.com/v1';

export interface Product {
    id?: number;
    slug?: string;
    nameTh: string;
    nameEn: string;
    code?: string;
    description?: string;
    shortDescription?: string;
    shortDescriptionEn?: string;
    longDescription?: string;
    longDescriptionEn?: string;
    featurePicturePath?: string;
    images?: { id: number; path: string }[];
    productLine?: {
        id: number;
        nameTh: string;
        nameEn: string;
    };
    sustainability?: {
        sustainabilityId: string;
        sustainability?: {
            id: string;
            nameTh: string;
            nameEn: string;
            icon?: string;
        };
    }[];
    certificates?: {
        certificateId: string;
        certificate?: {
            id: string;
            nameTh: string;
            nameEn: string;
            icon?: string;
        };
    }[];
    materials?: {
        materialId: string;
        material?: Material;
    }[];
    isActive?: boolean;
    sortOrder: number;
}

export interface ProductsResponse {
    data: Product[];
    totalItems: number;
    currentPage: number;
    pageSize: number;
}

export interface ProductLine {
    id: number;
    nameTh: string;
    nameEn: string;
    imagePath?: string;
    children?: ProductLine[];
    products?: Product[];
}

export const productApi = {

    async getAllProducts(page = 1, limit = 10, productLineId?: number): Promise<ProductsResponse> {
        try {
            // Public Endpoint: /v1/product
            let url = `${API_BASE_URL}/product?page=${page}&limit=${limit}`;
            if (productLineId) {
                url += `&productLine=${productLineId}`;
            }

            const res = await fetch(url, {
                next: { revalidate: 60 },
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!res.ok) {
                console.error(`API call to ${API_BASE_URL}/product failed (${res.status}).`);
                return { data: [], totalItems: 0, currentPage: page, pageSize: limit };
            }

            return await res.json();
        } catch (error) {
            console.error('Error fetching products:', error);
            return { data: [], totalItems: 0, currentPage: page, pageSize: limit };
        }
    },

    async getProductBySlug(slug: string): Promise<Product | null> {
        try {
            // Public Endpoint: /v1/product/:slug
            const res = await fetch(`${API_BASE_URL}/product/${slug}`, {
                next: { revalidate: 60 }
            });

            if (!res.ok) {
               console.error(`API call to ${API_BASE_URL}/product/${slug} failed (${res.status}).`);
               return null;
            }

            return await res.json();
        } catch (error) {
            console.error(`Error fetching product ${slug}:`, error);
            return null;
        }
    },

    async getProductLines(): Promise<ProductLine[]> {
        try {
             // Fetches product lines (categories)
             const res = await fetch(`${API_BASE_URL}/product/product-lines`, {
                next: { revalidate: 3600 }
            });

            if (!res.ok) {
                console.error(`API call to ${API_BASE_URL}/product/product-lines failed (${res.status}).`);
                return [];
            }
            return await res.json();
        } catch (error) {
             console.error('Error fetching product lines:', error);
             return [];
        }
    },

    // Kept for backward compatibility if needed, but redirects to getProductBySlug logic
    async getProductById(id: number | string): Promise<Product | null> {
        return this.getProductBySlug(String(id));
    },

    getProductImage(path: string | null): string {
        return getStoragePath(path);
    }
};

export interface Material {
    id?: number;
    slug?: string;
    nameTh: string;
    nameEn: string;
    shortDescription?: string;
    shortDescriptionEn?: string;
    longDescription?: string;
    longDescriptionEn?: string;
    description?: string;
    featurePicturePath?: string;
    sortOrder?: number;
    sustainability?: {
        materialId: number;
        sustainabilityId: string;
        sustainability?: {
            id: string;
            nameTh: string;
            nameEn: string;
            descriptionTh?: string;
            descriptionEn?: string;
            colorLabel?: string;
        };
    }[];
    products?: {
        productId: number;
        materialId: number;
        product?: Product;
    }[];
}

export interface MaterialsResponse {
    data: Material[];
    totalItems: number;
    currentPage: number;
    pageSize: number;
}

export const materialApi = {
    async getAllMaterials(page = 1, limit = 100, productLineId?: number): Promise<MaterialsResponse> {
        try {
            let url = `${API_BASE_URL}/product/materials?page=${page}&limit=${limit}`;
            if (productLineId) {
                url += `&productLine=${productLineId}`;
            }

            const res = await fetch(url, {
                next: { revalidate: 60 },
                headers: { 'Accept': 'application/json' }
            });

            if (!res.ok) {
                console.error(`API call to ${API_BASE_URL}/product/materials failed (${res.status}).`);
                return { data: [], totalItems: 0, currentPage: page, pageSize: limit };
            }
            return await res.json();
        } catch (error) {
            console.error('Error fetching materials:', error);
            return { data: [], totalItems: 0, currentPage: page, pageSize: limit };
        }
    },

    async getMaterialBySlug(slug: string): Promise<Material | null> {
         try {
            const res = await fetch(`${API_BASE_URL}/product/materials/${slug}`, {
                next: { revalidate: 60 }
            });
            if (!res.ok) return null;
            return await res.json();
        } catch (error) {
            console.error(`Error fetching material ${slug}:`, error);
            return null;
        }
    },

    getMaterialImage(path: string | null): string {
        return getStoragePath(path);
    }
};
