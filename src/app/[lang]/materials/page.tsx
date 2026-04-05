import MaterialsClient from "./MaterialsClient";
import { getDictionary, Locale } from "@/lib/dictionary";

export default async function MaterialsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <MaterialsClient lang={lang} dict={dict} />;
}
