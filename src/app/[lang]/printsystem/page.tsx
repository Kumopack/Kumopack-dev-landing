import { Locale, getDictionary } from "@/lib/dictionary";
import PrintSystemClient from "./PrintSystemClient";

export default async function PrintSystemPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return <PrintSystemClient lang={lang} dict={dict} />;
}
