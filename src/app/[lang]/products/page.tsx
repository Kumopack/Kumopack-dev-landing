import ProductsClient from "./ProductsClient";
import { getDictionary, Locale } from "@/lib/dictionary";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ProductsClient lang={lang} dict={dict} />;
}
