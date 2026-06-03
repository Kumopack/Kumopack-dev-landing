import { getStoragePath } from "@/lib/utils";
import { API_IMAGE_URL } from "@/lib/api-config";
import { apiGet, apiFetch } from "@/lib/api-client";

// Re-export types for backwards compatibility
export type {
  Supplier,
  SupplierFeature,
  ProductCategory,
} from "@/types/supplier";
import type {
  Supplier,
  SupplierFeature,
  ProductCategory,
} from "@/types/supplier";

const PROVINCE_MAP: Record<string, string> = {
  กทม: "Bangkok",
  กรุงเทพ: "Bangkok",
  bangkok: "Bangkok",
  สมุทรปราการ: "Samut Prakan",
  "samut prakan": "Samut Prakan",
  นนทบุรี: "Nonthaburi",
  nonthaburi: "Nonthaburi",
  ปทุมธานี: "Pathum Thani",
  "pathum thani": "Pathum Thani",
  ชลบุรี: "Chonburi",
  chonburi: "Chonburi",
  สมุทรสาคร: "Samut Sakhon",
  "samut sakhon": "Samut Sakhon",
  นครปฐม: "Nakhon Pathom",
  "nakhon pathom": "Nakhon Pathom",
};

function extractProvince(address: string): string {
  if (!address) return "Thailand";
  const lowerAddr = address.toLowerCase();

  for (const [key, value] of Object.entries(PROVINCE_MAP)) {
    if (lowerAddr.includes(key)) {
      return value;
    }
  }

  const parts = address.split(" ");
  if (parts.length > 2) {
    const possibleProvince = parts[parts.length - 2];
    if (possibleProvince && /^[a-zA-Z]+$/.test(possibleProvince)) {
      return possibleProvince;
    }
  }

  return "Thailand";
}

const CATEGORY_MAP: Record<string, string> = {
  "flexible packaging": "flexible",
  "corrugated box": "corrugated",
  "rigid box": "rigid",
  "paper packaging": "paper",
  "sticker & label": "label",
  "tube packaging": "tube",
};

const FEATURE_MAP: Record<string, string> = {
  "fast production": "fast",
  "no minimum": "ondemand",
  "design services": "design",
  "fda certified": "fda",
  "iso certified": "iso",
  "on demand": "ondemand",
};

function normalizeCategory(name: string): string {
  if (!name) return "";
  return CATEGORY_MAP[name.toLowerCase()] || name.toLowerCase();
}

 
interface TaxonomyRef {
  id?: string | number;
  slug?: string;
  nameTh?: string;
  nameEn?: string;
  descriptionTh?: string;
  descriptionEn?: string;
  featurePicturePath?: string;
  shortName?: string;
  colorLabel?: string;
}

interface SupplierFeatureRaw {
  id: string | number;
  taxonomyId?: string | number;
  taxonomy?: TaxonomyRef;
}

interface SupplierProductCategoryRaw {
  productLine?: { id: string | number; nameEn?: string; nameTh?: string };
}

interface SupplierProductRaw {
  categoryId?: string | number;
  product?: {
    id: string | number;
    nameEn?: string;
    nameTh?: string;
    featurePicturePath?: string;
  };
}

interface SupplierApiData {
  id: string | number;
  slug?: string;
  code?: string;
  uuId?: string;
  displayTitle?: string;
  companyName?: string;
  companyAddress?: string;
  companyCard?: string;
  companyPictureCover?: string;
  companyLogo?: string;
  companyTaxNo?: string;
  tagline?: string;
  businessDescription?: string;
  cardDescription?: string;
  website?: string;
  email?: string;
  phone?: string;
  review?: number;
  reviewAmount?: number;
  orderAmount?: number;
  minimumProductionQuantity?: string;
  deliveryDateAmount?: number;
  createdAt?: string;
  isActive?: boolean;
  supplierType?: string;
  membershipTypeTitle?: string;
  supplierFeatures?: SupplierFeatureRaw[];
  supplierProductCategories?: SupplierProductCategoryRaw[];
  supplierProducts?: SupplierProductRaw[];
  supplierCertificates?: { taxonomy?: TaxonomyRef }[];
  galleryImages?: { path: string }[];
}

interface SupplierListResponse {
  data?: SupplierApiData[];
  totalItems?: number;
  total?: number;
}
 

function checkIsVerified(features: SupplierFeatureRaw[]): boolean {
  if (!features || !Array.isArray(features)) return false;
  return features.some(
    (f) =>
      f.taxonomy?.slug === "Guarantee by Kumopack" ||
      f.taxonomy?.id === "32" ||
      String(f.taxonomyId) === "32",
  );
}

export const suppliers: Supplier[] = [
  {
    id: "siampackaging",
    name: "Siam Packaging",
    rating: 5,
    reviewCount: 54,
    location: "Bangkok",
    address: "674 On Nut 30, Suan Luang, Bangkok 10250",
    specialized: "Corrugated Boxes",
    image: `${API_IMAGE_URL}/supplier/SA000004/1707639759503-280474020_5350219308368770_4275505670421887387_n.jpg`,
    logo: `${API_IMAGE_URL}/supplier/SA000004/1751899692205-.png`,
    tagline: "Strength in Every Layer.",
    description:
      "รับผลิตกล่องบรรจุภัณฑ์พิมพ์ลาย, กล่องกระดาษราคาถูก, กล่องส่งออกสภาพเเข็งเเรง",
    website: "https://www.siampackaging.co.th",
    email: "support@siampackaging.co.th",
    features: [],
    categories: [],
    gallery: [],
    stats: {
      experience: "1y",
      capacity: "500,000 pcs",
      certifications: "ISO, COA, SGS",
      leadTime: "15 days",
      orderAmount: "34",
    },
    isVerified: true,
  },
];

export async function getSupplierData(slug: string): Promise<Supplier | null> {
  try {
    const data = await apiGet<SupplierApiData>(`/supplier/${slug}`);

    const fallback = suppliers.find((s) => s.id === slug);

    if (!data || Object.keys(data).length === 0) return fallback || null;

    return {
      id: String(data.id),
      slug: data.slug || slug,
      code: data.code,
      name:
        data.displayTitle ||
        data.companyName ||
        fallback?.name ||
        "Unknown Supplier",
      displayTitle: data.displayTitle,
      rating: data.review || fallback?.rating || 5,
      reviewCount: data.reviewAmount || fallback?.reviewCount || 0,
      location:
        extractProvince(data.companyAddress || "") ||
        fallback?.location ||
        "Thailand",
      address: data.companyAddress || fallback?.address || "",
      specialized:
        data.supplierProductCategories?.[0]?.productLine?.nameEn ||
        fallback?.specialized ||
        "Packaging",
      image:
        getStoragePath(data.companyCard || data.companyPictureCover) ||
        fallback?.image,
      logo: getStoragePath(data.companyLogo) || fallback?.logo,
      tagline: data.tagline || fallback?.tagline || "Strength in Every Layer.",
      description:
        data.businessDescription ||
        data.cardDescription ||
        fallback?.description ||
        "",
      website: data.website || fallback?.website || "",
      email: data.email || fallback?.email || "",
      phone: data.phone || fallback?.phone || "",
      features:
        (data.supplierFeatures || []).length > 0
          ? data.supplierFeatures!.map((f) => ({
              id: String(f.id),
              title: f.taxonomy?.nameEn || f.taxonomy?.nameTh || "",
              description:
                f.taxonomy?.descriptionEn || f.taxonomy?.descriptionTh || "",
              icon: getStoragePath(f.taxonomy?.featurePicturePath),
              nameTh: f.taxonomy?.nameTh,
              nameEn: f.taxonomy?.nameEn,
              descriptionTh: f.taxonomy?.descriptionTh,
              descriptionEn: f.taxonomy?.descriptionEn,
            }))
          : fallback?.features || [],
      categories:
        (data.supplierProductCategories || []).length > 0
          ? data
              .supplierProductCategories!.map((cat) => ({
                id: String(cat.productLine?.id),
                name: cat.productLine?.nameEn || "",
                items: (data.supplierProducts || [])
                  .filter(
                    (p) => String(p.categoryId) === String(cat.productLine?.id),
                  )
                  .map((p) => ({
                    id: String(p.product?.id),
                    name: p.product?.nameEn || p.product?.nameTh || "",
                    image: getStoragePath(p.product?.featurePicturePath),
                  })),
              }))
              .filter((c) => c.items.length > 0)
          : fallback?.categories || [],
      gallery:
        (data.galleryImages || []).length > 0
          ? data.galleryImages!.map((img) => getStoragePath(img.path))
          : fallback?.gallery || [],
      stats: {
        experience: data.createdAt
          ? `${new Date().getFullYear() - new Date(data.createdAt).getFullYear()}y`
          : fallback?.stats.experience || "1y",
        capacity:
          data.minimumProductionQuantity || fallback?.stats.capacity || "N/A",
        certifications:
          (data.supplierCertificates || []).length > 0
            ? data
                .supplierCertificates!.map((c) => c.taxonomy?.shortName)
                .join(", ")
            : fallback?.stats.certifications || "ISO",
        leadTime: data.deliveryDateAmount
          ? `${data.deliveryDateAmount} days`
          : fallback?.stats.leadTime || "7 days",
        orderAmount: String(
          data.orderAmount || fallback?.stats.orderAmount || 0,
        ),
      },
      isActive: data.isActive,
      supplierType: data.supplierType,
      companyTaxNo: data.companyTaxNo,
      membershipTypeTitle: data.membershipTypeTitle,
      isVerified: checkIsVerified(data.supplierFeatures || []),
    };
  } catch {
    return suppliers.find((s) => s.id === slug) || null;
  }
}

export async function getSuppliersList(
  page: number = 1,
  limit: number = 24,
  filters?: {
    search?: string;
    location?: string;
    categories?: string[];
    features?: string[];
  },
): Promise<{ data: Supplier[]; total: number }> {
  let path = `/supplier?page=${page}&limit=${limit}`;
  if (filters) {
    if (filters.search) path += `&q=${encodeURIComponent(filters.search)}`;
    if (filters.categories && filters.categories.length > 0) {
      path += `&categories=${encodeURIComponent(filters.categories.join(","))}`;
    }
    if (filters.features && filters.features.length > 0) {
      path += `&features=${encodeURIComponent(filters.features.join(","))}`;
    }
    if (filters.location && filters.location !== "All Locations") {
      path += `&province=${encodeURIComponent(filters.location)}`;
    }
  }

  try {
    const res = await apiFetch(path);
    const data: SupplierListResponse | SupplierApiData[] = await res.json();
    const list = Array.isArray(data) ? data : data.data || [];
    const total = Array.isArray(data)
      ? data.length
      : data.totalItems || data.total || list.length;

    const mapped = list.map((s: SupplierApiData) => ({
      id: s.uuId || String(s.id),
      code: s.code,
      name: s.companyName || "",
      status: "Gold Supplier",
      rating: Number(s.review || 4.5),
      reviewCount: Number(s.reviewAmount || 120),
      specialized: (s.supplierProductCategories || [])
        .map((c: SupplierProductCategoryRaw) => c.productLine?.nameEn)
        .join(", "),
      location: extractProvince(s.companyAddress || ""),
      tagline: s.tagline || "",
      image: getStoragePath(s.companyPictureCover),
      website: s.website || "",
      email: s.email || "",
      phone: s.phone || "",
      displayTitle: s.displayTitle || s.companyName,
      address: s.companyAddress || "",
      logo: getStoragePath(s.companyLogo) || "",
      description: s.cardDescription || "",
      features: (s.supplierFeatures || []).map((f: SupplierFeatureRaw) => ({
        id: String(f.taxonomy?.id || f.id),
        title: f.taxonomy?.nameEn || f.taxonomy?.nameTh || "",
        description:
          f.taxonomy?.descriptionEn || f.taxonomy?.descriptionTh || "",
        icon: getStoragePath(f.taxonomy?.featurePicturePath),
        nameTh: f.taxonomy?.nameTh,
        nameEn: f.taxonomy?.nameEn,
        descriptionTh: f.taxonomy?.descriptionTh,
        descriptionEn: f.taxonomy?.descriptionEn,
      })),
      categories: (s.supplierProductCategories || []).map(
        (c: SupplierProductCategoryRaw) => ({
          id: normalizeCategory(c.productLine?.nameEn || ""),
          name: c.productLine?.nameEn || "",
          items: [],
        }),
      ),
      gallery: [],
      stats: {
        experience: "N/A",
        capacity: "N/A",
        certifications: "ISO",
        leadTime: "N/A",
        orderAmount: s.orderAmount ? `${s.orderAmount} Orders` : "No Minimum",
      },
      isActive: s.isActive,
      slug: s.slug || s.uuId || String(s.id),
      supplierType: s.supplierType,
      companyTaxNo: s.companyTaxNo,
      membershipTypeTitle: s.membershipTypeTitle,
      isVerified: checkIsVerified(s.supplierFeatures || []),
    }));

    return { data: mapped, total };
  } catch {
    return { data: suppliers, total: suppliers.length };
  }
}
