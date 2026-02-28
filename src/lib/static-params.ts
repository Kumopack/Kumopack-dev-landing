import { materialApi, productApi } from "@/lib/product-api";

export async function getAllMaterialIds() {
  try {
    const response = await materialApi.getAllMaterials(1, 100);
    const ids = response.data.map((item) => ({ id: String(item.id) }));
    return ids.length > 0 ? ids : [{ id: "fallback" }];
  } catch (error) {
    console.error("Error fetching material IDs for static params:", error);
    return [{ id: "fallback" }];
  }
}

export async function getAllProductIds() {
  try {
    const response = await productApi.getAllProducts(1, 100);
    const ids = response.data.map((item) => ({ id: String(item.id) }));
    return ids.length > 0 ? ids : [{ id: "fallback" }];
  } catch (error) {
    console.error("Error fetching product IDs for static params:", error);
    return [{ id: "fallback" }];
  }
}
