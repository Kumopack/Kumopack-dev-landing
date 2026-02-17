export interface SupplierFeature {
    id: string;
    title: string;
    description: string;
    icon: string;
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
    name: string;
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
}

import { getStoragePath } from "@/lib/utils";

export async function getSupplierData(slug: string): Promise<Supplier | null> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT || "https://api.kumopack.com/v1"}/supplier/${slug}`);

        // Find mock fallback just in case
        const fallback = suppliers.find(s => s.id === slug);

        if (!response.ok) return fallback || null;
        const data = await response.json();

        if (!data || Object.keys(data).length === 0) return fallback || null;

        return {
            id: data.slug || String(data.id) || slug,
            name: data.displayTitle || data.companyName || fallback?.name || "Unknown Supplier",
            rating: data.review || fallback?.rating || 5,
            reviewCount: data.reviewAmount || fallback?.reviewCount || 0,
            location: data.companyAddress?.split(',').pop()?.trim() || fallback?.location || "Thailand",
            address: data.companyAddress || fallback?.address || "",
            specialized: data.supplierProductCategories?.[0]?.productLine?.nameEn || fallback?.specialized || "Packaging",
            image: getStoragePath(data.companyCard) || fallback?.image || "",
            logo: getStoragePath(data.companyLogo) || fallback?.logo || "",
            tagline: data.tagline || fallback?.tagline || "Strength in Every Layer.",
            description: data.businessDescription || data.cardDescription || fallback?.description || "",
            website: data.website || fallback?.website || "",
            email: data.email || fallback?.email || "",
            phone: data.phone || fallback?.phone || "",
            features: (data.supplierFeatures || []).length > 0
                ? data.supplierFeatures.map((f: any) => ({
                    id: String(f.id),
                    title: f.taxonomy?.nameEn,
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
            }
        };
    } catch (error) {
        // Return mock data if API is down
        return suppliers.find(s => s.id === slug) || null;
    }
}


export async function getSuppliersList(): Promise<Supplier[]> {
    const primaryUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT || "https://api.kumopack.com/v1"}/supplier?limit=24`;
    const productionUrl = "https://api.kumopack.com/v1/supplier?limit=24";

    try {
        let response = await fetch(primaryUrl);
        
        // Failover to production if local/primary fails (e.g. 500 Error due to schema mismatch)
        if (!response.ok && primaryUrl !== productionUrl) {
            console.warn(`[SupplierAPI] Primary API failed (${response.status}), failing over to Production...`);
            response = await fetch(productionUrl);
        }

        if (!response.ok) return suppliers;
        const data = await response.json();

        if (!data?.data || !Array.isArray(data.data)) return suppliers;

        return data.data.map((s: any) => ({
            id: String(s.slug || s.id),
            name: s.displayTitle || s.companyName,
            rating: Number(s.review || 5),
            reviewCount: Number(s.reviewAmount || 0),
            location: s.companyAddress?.split(',').pop()?.trim() || "Thailand",
            address: s.companyAddress || "",
            specialized: s.supplierFeatures?.[0]?.taxonomy?.nameEn || "Packaging",
            image: getStoragePath(s.companyPictureCover),
            logo: getStoragePath(s.companyLogo),
            tagline: s.tagline || "",
            description: s.cardDescription || "",
            website: s.website || "",
            email: s.email || "",
            features: [],
            categories: [],
            gallery: [],
            stats: {
                experience: "N/A",
                capacity: "N/A",
                certifications: "ISO",
                leadTime: "N/A",
                orderAmount: String(s.orderAmount || 0)
            }
        }));
    } catch (error) {
        console.error("[SupplierAPI] Error fetching suppliers:", error);
        // Try production one last time if the error was network-related on primary
        if (primaryUrl !== productionUrl) {
            try {
                const prodResponse = await fetch(productionUrl);
                if (prodResponse.ok) {
                    const data = await prodResponse.json();
                    if (data?.data && Array.isArray(data.data)) {
                         return data.data.map((s: any) => ({
                            id: String(s.slug || s.id),
                            name: s.displayTitle || s.companyName,
                            rating: Number(s.review || 5),
                            reviewCount: Number(s.reviewAmount || 0),
                            location: s.companyAddress?.split(',').pop()?.trim() || "Thailand",
                            address: s.companyAddress || "",
                            specialized: s.supplierFeatures?.[0]?.taxonomy?.nameEn || "Packaging",
                            image: getStoragePath(s.companyPictureCover),
                            logo: getStoragePath(s.companyLogo),
                            tagline: s.tagline || "",
                            description: s.cardDescription || "",
                            website: s.website || "",
                            email: s.email || "",
                            features: [],
                            categories: [],
                            gallery: [],
                            stats: {
                                experience: "N/A",
                                capacity: "N/A",
                                certifications: "ISO",
                                leadTime: "N/A",
                                orderAmount: String(s.orderAmount || 0)
                            }
                        }));
                    }
                }
            } catch (prodError) {
                console.error("[SupplierAPI] Production failover also failed:", prodError);
            }
        }
        return suppliers;
    }
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
        }
    }
];


