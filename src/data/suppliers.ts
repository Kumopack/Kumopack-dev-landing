export interface SupplierFeature {
    id: string;
    title: string;
    description: string;
    icon: string;
    // Extended fields
    nameTh?: string;
    nameEn?: string;
    descriptionTh?: string;
    descriptionEn?: string;
}

export interface ProductCategory {
    id: string;
    name: string;
    description?: string;
    image?: string;
    items: {
        id: string;
        name: string;
        image: string;
    }[];
}

export interface Supplier {
    id: string;
    code?: string;
    name: string;
    displayTitle?: string;
    rating: number;
    reviewCount: number;
    location: string;
    address: string;
    specialized: string;
    image: string;
    logo: string;
    tagline: string;
    description: string;
    website: string;
    email: string;
    phone?: string;
    features: SupplierFeature[];
    categories: ProductCategory[];
    gallery: string[];
    stats: {
        experience: string;
        capacity: string;
        certifications: string;
        leadTime: string;
        orderAmount: string;
    };
    isActive?: boolean;
    slug?: string;
    supplierType?: string;
    companyTaxNo?: string;
    membershipTypeTitle?: string;
    isVerified?: boolean;
}

import { getStoragePath } from "@/lib/utils";

const PROVINCE_MAP: Record<string, string> = {
    "กทม": "Bangkok",
    "กรุงเทพ": "Bangkok",
    "bangkok": "Bangkok",
    "สมุทรปราการ": "Samut Prakan",
    "samut prakan": "Samut Prakan",
    "นนทบุรี": "Nonthaburi",
    "nonthaburi": "Nonthaburi",
    "ปทุมธานี": "Pathum Thani",
    "pathum thani": "Pathum Thani",
    "ชลบุรี": "Chonburi",
    "chonburi": "Chonburi",
    "สมุทรสาคร": "Samut Sakhon",
    "samut sakhon": "Samut Sakhon",
    "นครปฐม": "Nakhon Pathom",
    "nakhon pathom": "Nakhon Pathom"
};

function extractProvince(address: string): string {
    if (!address) return "Thailand";
    const lowerAddr = address.toLowerCase();
    
    for (const [key, value] of Object.entries(PROVINCE_MAP)) {
        if (lowerAddr.includes(key)) {
            return value;
        }
    }
    
    // Fallback: try to find the last part if it looks like a province (naive)
    const parts = address.split(' ');
    if (parts.length > 2) {
        // usually zip code is last, province is before that
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
    "tube packaging": "tube"
};

const FEATURE_MAP: Record<string, string> = {
    "fast production": "fast",
    "no minimum": "ondemand",
    "design services": "design",
    "fda certified": "fda",
    "iso certified": "iso",
    "on demand": "ondemand"
};

const REVERSE_CATEGORY_MAP: Record<string, string> = {
    "flexible": "Flexible Packaging",
    "corrugated": "Corrugated Box",
    "rigid": "Rigid Box",
    "paper": "Paper Packaging",
    "label": "Sticker & Label",
    "tube": "Tube Packaging"
};

const REVERSE_FEATURE_MAP: Record<string, string> = {
    "fast": "Fast Production", 
    "ondemand": "No Minimum",
    "design": "Design Services",
    "fda": "FDA Certified",
    "iso": "ISO Certified"
};

function normalizeCategory(name: string): string {
    if (!name) return "";
    return CATEGORY_MAP[name.toLowerCase()] || name.toLowerCase();
}

function normalizeFeature(name: string): string {
    if (!name) return "";
    const lower = name.toLowerCase();
    for (const [key, value] of Object.entries(FEATURE_MAP)) {
        if (lower.includes(key)) return value;
    }
    return lower;
}

function checkIsVerified(features: any[]): boolean {
    if (!features || !Array.isArray(features)) return false;
    return features.some(f => 
        f.taxonomy?.slug === "Guarantee by Kumopack" || 
        f.taxonomy?.id === "32" || 
        String(f.taxonomyId) === "32"
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
        image: `${process.env.NEXT_PUBLIC_IMAGE_URL || "https://api.kumopack.com/v1/images"}/supplier/SA000004/1707639759503-280474020_5350219308368770_4275505670421887387_n.jpg`,
        logo: `${process.env.NEXT_PUBLIC_IMAGE_URL || "https://api.kumopack.com/v1/images"}/supplier/SA000004/1751899692205-.png`,
        tagline: "Strength in Every Layer.",
        description: "รับผลิตกล่องบรรจุภัณฑ์พิมพ์ลาย, กล่องกระดาษราคาถูก, กล่องส่งออกสภาพเเข็งเเรง",
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
            orderAmount: "34"
        },
        isVerified: true
    }
];

export async function getSupplierData(slug: string): Promise<Supplier | null> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT || "https://api.kumopack.com/v1"}/supplier/${slug}`);

        // Find mock fallback just in case
        const fallback = suppliers.find(s => s.id === slug);

        if (!response.ok) return fallback || null;
        const data = await response.json();

        if (!data || Object.keys(data).length === 0) return fallback || null;

        return {
            id: String(data.id),
            slug: data.slug || slug,
            code: data.code,
            name: data.displayTitle || data.companyName || fallback?.name || "Unknown Supplier",
            displayTitle: data.displayTitle,
            rating: data.review || fallback?.rating || 5,
            reviewCount: data.reviewAmount || fallback?.reviewCount || 0,
            location: extractProvince(data.companyAddress) || fallback?.location || "Thailand",
            address: data.companyAddress || fallback?.address || "",
            specialized: data.supplierProductCategories?.[0]?.productLine?.nameEn || fallback?.specialized || "Packaging",
            image: getStoragePath(data.companyCard || data.companyPictureCover) || fallback?.image || "/asset/thumb-supplier-no-img.png",
            logo: getStoragePath(data.companyLogo) || fallback?.logo || "/asset/logo-supplier-no-img.png",
            tagline: data.tagline || fallback?.tagline || "Strength in Every Layer.",
            description: data.businessDescription || data.cardDescription || fallback?.description || "",
            website: data.website || fallback?.website || "",
            email: data.email || fallback?.email || "",
            phone: data.phone || fallback?.phone || "",
            features: (data.supplierFeatures || []).length > 0
                ? data.supplierFeatures.map((f: any) => ({
                    id: String(f.id),
                    title: f.taxonomy?.nameEn || f.taxonomy?.nameTh,
                    description: f.taxonomy?.nameTh,
                    icon: getStoragePath(f.taxonomy?.featurePicturePath)
                }))
                : (fallback?.features || []),
            categories: (data.supplierProductCategories || []).length > 0
                ? data.supplierProductCategories.map((cat: any) => ({
                    id: String(cat.productLine?.id),
                    name: cat.productLine?.nameEn,
                    items: (data.supplierProducts || [])
                        .filter((p: any) => String(p.categoryId) === String(cat.productLine?.id))
                        .map((p: any) => ({
                            id: String(p.product?.id),
                            name: p.product?.nameEn || p.product?.nameTh,
                            image: getStoragePath(p.product?.featurePicturePath)
                        }))
                })).filter((c: any) => c.items.length > 0)
                : (fallback?.categories || []),
            gallery: (data.galleryImages || []).length > 0
                ? data.galleryImages.map((img: any) => getStoragePath(img.path))
                : (fallback?.gallery || []),
            stats: {
                experience: data.createdAt ? `${new Date().getFullYear() - new Date(data.createdAt).getFullYear()}y` : (fallback?.stats.experience || "1y"),
                capacity: data.minimumProductionQuantity || fallback?.stats.capacity || "N/A",
                certifications: (data.supplierCertificates || []).length > 0
                    ? data.supplierCertificates.map((c: any) => c.taxonomy?.shortName).join(", ")
                    : (fallback?.stats.certifications || "ISO"),
                leadTime: data.deliveryDateAmount ? `${data.deliveryDateAmount} days` : (fallback?.stats.leadTime || "7 days"),
                orderAmount: String(data.orderAmount || fallback?.stats.orderAmount || 0)
            },
            isActive: data.isActive,
            supplierType: data.supplierType,
            companyTaxNo: data.companyTaxNo,
            membershipTypeTitle: data.membershipTypeTitle,
            isVerified: checkIsVerified(data.supplierFeatures)
        };
    } catch (error) {
        // Return mock data if API is down
        return suppliers.find(s => s.id === slug) || null;
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
    }
): Promise<{ data: Supplier[], total: number }> {
    const primaryUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:8000/v1"}/supplier?page=${page}&limit=${limit}`;

    let url = primaryUrl;
    if (filters) {
        if (filters.search) url += `&q=${encodeURIComponent(filters.search)}`;
        if (filters.categories && filters.categories.length > 0) {
             url += `&categories=${encodeURIComponent(filters.categories.join(","))}`;
        }
        if (filters.features && filters.features.length > 0) {
             url += `&features=${encodeURIComponent(filters.features.join(","))}`;
        }
        if (filters.location && filters.location !== "All Locations") {
             url += `&province=${encodeURIComponent(filters.location)}`;
        }
    }

    try {
        let response = await fetch(url);
        
        const data = await response.json();
        const list = Array.isArray(data) ? data : (data.data || []);
        const total = data.totalItems || data.total || list.length;

        const mapped = list.map((s: any) => ({
            id: s.uuId || String(s.id),
            code: s.code,
            name: s.companyName,
            status: "Gold Supplier",
            rating: Number(s.review || 4.5),
            reviewCount: Number(s.reviewAmount || 120),
            specialized: (s.supplierProductCategories || []).map((c: any) => c.productLine.nameEn).join(", "),
            location: extractProvince(s.companyAddress),
            tagline: s.tagline || "",
            image: getStoragePath(s.companyPictureCover) || "/asset/placeholder-logo.png",
            website: s.website || "",
            email: s.email || "",
            phone: s.phone || "",
            displayTitle: s.displayTitle || s.companyName,
            address: s.companyAddress || "",
            logo: getStoragePath(s.companyLogo) || "",
            description: s.cardDescription || "",
            features: (s.supplierFeatures || []).map((f: any) => ({
                id: String(f.taxonomy?.id || f.id),
                title: f.taxonomy?.nameEn || f.taxonomy?.nameTh || "",
                description: f.taxonomy?.descriptionEn || f.taxonomy?.descriptionTh || "",
                icon: getStoragePath(f.taxonomy?.featurePicturePath),
                nameTh: f.taxonomy?.nameTh,
                nameEn: f.taxonomy?.nameEn,
                descriptionTh: f.taxonomy?.descriptionTh,
                descriptionEn: f.taxonomy?.descriptionEn
            })),
            categories: (s.supplierProductCategories || []).map((c: any) => ({
                id: normalizeCategory(c.productLine?.nameEn),
                name: c.productLine?.nameEn,
                items: [] 
            })),
            gallery: [],
            stats: {
                experience: "N/A",
                capacity: "N/A",
                certifications: "ISO",
                leadTime: "N/A",
                orderAmount: s.orderAmount ? `${s.orderAmount} Orders` : "No Minimum"
            },
            isActive: s.isActive,
            slug: s.slug || String(s.id),
            supplierType: s.supplierType,
            companyTaxNo: s.companyTaxNo,
            membershipTypeTitle: s.membershipTypeTitle,
            isVerified: checkIsVerified(s.supplierFeatures)
        }));
        
        return { data: mapped, total };

    } catch (error) {
        return { data: suppliers, total: suppliers.length };
    }
}
