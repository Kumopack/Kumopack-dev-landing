
import { materialApi, productApi } from "@/lib/product-api";

export async function getAllMaterialIds() {
  try {
    // Fetch a large number to cover most items for static generation
    const response = await materialApi.getAllMaterials(1, 100);
    return response.data.map((item) => ({ id: String(item.id) }));
  } catch (error) {
    console.error("Error fetching material IDs for static params:", error);
    return [];
  }
}

export async function getAllProductIds() {
  try {
    // Fetch a large number to cover most items for static generation
    const response = await productApi.getAllProducts(1, 100);
    return response.data.map((item) => ({ id: String(item.id) }));
  } catch (error) {
    console.error("Error fetching product IDs for static params:", error);
    return [];
  }
}
