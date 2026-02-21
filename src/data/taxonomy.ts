import { API_BASE_URL } from "@/lib/api-config";
import { apiGet } from "@/lib/api-client";

export interface TaxonomyOption {
  id: string | number;
  label: string;
  nameEn?: string;
  nameTh?: string;
}

export const FALLBACK_CATEGORIES = [
  { id: "flexible", label: "Flexible Packaging" },
  { id: "corrugated", label: "Corrugated Box" },
  { id: "rigid", label: "Rigid Box" },
  { id: "paper", label: "Paper Packaging" },
  { id: "label", label: "Sticker & Label" },
  { id: "tube", label: "Tube Packaging" },
];

export const FALLBACK_FEATURES = [
  { id: "fast", label: "Fast Production (5-7 days)" },
  { id: "ondemand", label: "No Minimum (On Demand)" },
  { id: "design", label: "Design Services" },
  { id: "fda", label: "FDA Certified" },
  { id: "iso", label: "ISO Certified" },
];

export async function getCategories(): Promise<TaxonomyOption[]> {
  try {
    const data = await apiGet<any[]>(`/options/product-lines`);

    return Array.isArray(data)
      ? data.map((item: any) => ({
          id: String(item.id),
          label: item.nameEn || item.nameTh || "Unknown",
          nameEn: item.nameEn,
          nameTh: item.nameTh,
        }))
      : FALLBACK_CATEGORIES;
  } catch (error) {
    console.warn("Using fallback categories due to API error:", error);
    return FALLBACK_CATEGORIES;
  }
}

export async function getFeatures(): Promise<TaxonomyOption[]> {
  try {
    const data = await apiGet<any[]>(`/options/supplier-features`);

    return Array.isArray(data)
      ? data.map((item: any) => ({
          id: String(item.id),
          label: item.nameEn || item.nameTh || "Unknown",
          nameEn: item.nameEn,
          nameTh: item.nameTh,
        }))
      : FALLBACK_FEATURES;
  } catch (error) {
    console.warn("Using fallback features due to API error:", error);
    return FALLBACK_FEATURES;
  }
}
