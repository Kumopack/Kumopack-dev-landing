import { getAllProductIds } from "@/lib/static-params";
import ProductDetailClient from "./ProductDetailClient";
import { getDictionary, Locale } from "@/lib/dictionary";
import { productApi } from "@/lib/product-api";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return await getAllProductIds();
}

type Props = { 
  params: Promise<{ id: string; lang: Locale }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const decodedId = decodeURIComponent(params.id);
  const isTh = params.lang === "th";
  
  let product = await productApi.getProductBySlug(decodedId);
  
  // Fallback search if product not found by slug
  if (!product) {
    try {
      const allProducts = await productApi.getAllProducts(1, 1000);
      product = allProducts.data.find(
        (p) => p.slug === decodedId || p.nameEn === decodedId || p.nameTh === decodedId
      ) || null;
    } catch (e) {
      console.error("Fallback search failed in metadata", e);
    }
  }

  if (!product) {
    return {
      title: "Product Not Found | KumoPack",
    };
  }

  const title = isTh ? product.nameTh : product.nameEn;
  const description = isTh 
    ? product.shortDescription || "" 
    : product.shortDescriptionEn || product.shortDescription || "";
    
  const image = product.featurePicturePath || (product.images?.[0]?.path);
  const imageUrl = image && image !== "/placeholder-box.png" 
    ? productApi.getProductImage(image) 
    : undefined;

  return {
    title: `${title} | KumoPack`,
    description: description || `Discover ${title} at KumoPack.`,
    ...(imageUrl && {
      openGraph: {
        images: [{ url: imageUrl, alt: title }],
      },
    }),
  };
}

export default async function Page(props: Props) {
  const params = await props.params;
  const dict = await getDictionary(params.lang);
  return <ProductDetailClient id={params.id} lang={params.lang} dict={dict} />;
}
