import { apiGet } from "@/lib/api-client";

export interface Province {
  id: number;
  code: string;
  nameTh: string;
  nameEn: string;
}

export async function getProvinces(): Promise<Province[]> {
  try {
    const data = await apiGet<Province[]>(`/options/provinces`);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch provinces:", error);
    return [];
  }
}
