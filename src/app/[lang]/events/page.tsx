import EventsClient from "./EventsClient";
import { getDictionary, Locale } from "@/lib/dictionary";

export default async function EventsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <EventsClient lang={lang} dict={dict} />;
}
