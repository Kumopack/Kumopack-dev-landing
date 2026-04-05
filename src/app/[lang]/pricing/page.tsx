import PricingClient from "./PricingClient";
import { getDictionary, Locale } from "@/lib/dictionary";

export default async function PricingPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <PricingClient lang={lang} dict={dict} />;
}
