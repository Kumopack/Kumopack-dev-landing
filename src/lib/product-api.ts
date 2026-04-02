import { getStoragePath } from "@/lib/utils";
import { apiGet } from "./api-client";

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
  async getAllProducts(
    page = 1,
    limit = 10,
    productLineId?: number,
  ): Promise<ProductsResponse> {
    try {
      let path = `/product?page=${page}&limit=${limit}`;
      if (productLineId) {
        path += `&productLine=${productLineId}`;
      }

      return await apiGet<ProductsResponse>(path, {
        next: { revalidate: 60 },
        headers: { Accept: "application/json" },
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      return { data: [], totalItems: 0, currentPage: page, pageSize: limit };
    }
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    try {
      return await apiGet<Product>(`/product/${slug}`, {
        next: { revalidate: 60 },
      });
    } catch (error) {
      console.error(`Error fetching product ${slug}:`, error);
      return null;
    }
  },

  async getProductLines(): Promise<ProductLine[]> {
    try {
      return await apiGet<ProductLine[]>(`/product/product-lines`, {
        next: { revalidate: 3600 },
      });
    } catch (error) {
      console.error("Error fetching product lines:", error);
      return [];
    }
  },

  async getProductById(id: number | string): Promise<Product | null> {
    return this.getProductBySlug(String(id));
  },

  getProductImage(path: string | null): string {
    return getStoragePath(path);
  },
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
  async getAllMaterials(
    page = 1,
    limit = 100,
    productLineId?: number,
  ): Promise<MaterialsResponse> {
    try {
      let path = `/product/materials?page=${page}&limit=${limit}`;
      if (productLineId) {
        path += `&productLine=${productLineId}`;
      }

      return await apiGet<MaterialsResponse>(path, {
        next: { revalidate: 60 },
        headers: { Accept: "application/json" },
      });
    } catch (error) {
      console.error("Error fetching materials:", error);
      return { data: [], totalItems: 0, currentPage: page, pageSize: limit };
    }
  },

  async getMaterialBySlug(slug: string): Promise<Material | null> {
    try {
      return await apiGet<Material>(`/product/materials/${slug}`, {
        next: { revalidate: 60 },
      });
    } catch (error) {
      console.error(`Error fetching material ${slug}:`, error);
      return null;
    }
  },

  getMaterialImage(path: string | null): string {
    return getStoragePath(path);
  },
};
