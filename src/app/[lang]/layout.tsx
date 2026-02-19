import type { Metadata } from "next";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Kumopack | The Absolute Packaging Solutions",
  description:
    "Design and order custom packaging that elevates your brand. Get instant quotes from top-tier factories. Compare, choose, and create—all in one place.",
};

export async function generateStaticParams() {
  return [{ lang: "th" }, { lang: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  // We await params even if not currently using lang here,
  // to avoid Next.js warnings about unwrapped promises in layouts.
  await params;

  return <LanguageProvider>{children}</LanguageProvider>;
}
