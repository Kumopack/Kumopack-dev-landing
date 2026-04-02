import { Locale, getDictionary } from "@/lib/dictionary";
import ContactClient from "./ContactClient";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return <ContactClient lang={lang} dict={dict} />;
}
