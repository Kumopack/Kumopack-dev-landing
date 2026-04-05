import { Locale, getDictionary } from "@/lib/dictionary";
import HelpClient from "./HelpClient";

export default async function HelpPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return <HelpClient lang={lang} dict={dict} />;
}
