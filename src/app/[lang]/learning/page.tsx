import LearningClient from "./LearningClient";
import { getDictionary, Locale } from "@/lib/dictionary";

export default async function LearningPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <LearningClient lang={lang} dict={dict} />;
}
