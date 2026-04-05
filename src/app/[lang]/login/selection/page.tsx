import SelectionClient from "./SelectionClient";
import { getDictionary, Locale } from "@/lib/dictionary";

export default async function SelectionPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <SelectionClient lang={lang} dict={dict} />;
}
