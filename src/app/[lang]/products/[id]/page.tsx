import { getAllProductIds } from "@/lib/static-params";
import ProductDetailClient from "./ProductDetailClient";

export async function generateStaticParams() {
  return await getAllProductIds();
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return <ProductDetailClient id={params.id} />;
}
