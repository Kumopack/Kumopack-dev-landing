import AboutUsClient from "./AboutUsClient";
import { getDictionary, Locale } from "@/lib/dictionary";

export default async function AboutUsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <AboutUsClient lang={lang} dict={dict} />;
}
