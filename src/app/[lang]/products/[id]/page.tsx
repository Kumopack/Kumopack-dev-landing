import { getAllProductIds } from "@/lib/static-params";
import ProductDetailClient from "./ProductDetailClient";
import { getDictionary, Locale } from "@/lib/dictionary";

export async function generateStaticParams() {
  return await getAllProductIds();
}

export default async function Page(props: { params: Promise<{ lang: Locale; id: string }> }) {
  const params = await props.params;
  const dict = await getDictionary(params.lang);
  return <ProductDetailClient id={params.id} lang={params.lang} dict={dict} />;
}
