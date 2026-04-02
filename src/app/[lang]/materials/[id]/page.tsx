import { getAllMaterialIds } from "@/lib/static-params";
import MaterialDetailClient from "./MaterialDetailClient";
import { getDictionary, Locale } from "@/lib/dictionary";

export async function generateStaticParams() {
  return await getAllMaterialIds();
}

export default async function Page(props: { params: Promise<{ lang: Locale; id: string }> }) {
  const params = await props.params;
  const dict = await getDictionary(params.lang);
  return <MaterialDetailClient id={params.id} lang={params.lang} dict={dict} />;
}
