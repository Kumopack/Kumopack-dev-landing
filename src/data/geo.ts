
export interface Province {
    id: number;
    code: string;
    nameTh: string;
    nameEn: string;
}

export async function getProvinces(): Promise<Province[]> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:8000/v1"}/options/provinces`);
        if (!response.ok) return [];
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Failed to fetch provinces:", error);
        return [];
    }
}
