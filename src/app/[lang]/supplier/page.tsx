import SupplierClient from "./SupplierClient";
import { getDictionary, Locale } from "@/lib/dictionary";

export default async function SupplierPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <SupplierClient lang={lang} dict={dict} />;
}
