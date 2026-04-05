import { Locale, getDictionary } from "@/lib/dictionary";
import PolicyClient from "./PolicyClient";

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return <PolicyClient lang={lang} dict={dict} />;
}
