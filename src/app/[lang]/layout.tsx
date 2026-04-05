import type { Metadata } from "next";
import { Noto_Sans_Thai, Noto_Sans } from "next/font/google";
import "@/app/globals.css";
import QueryProvider from "@/providers/QueryProvider";

const notoTh = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const notoEn = Noto_Sans({
  variable: "--font-noto-en",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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
  const { lang } = await params;

  return (
    <html
      lang={lang}
      className={`${notoTh.variable} ${notoEn.variable}`}
      suppressHydrationWarning
    >
      <body
        className="antialiased font-sans overflow-x-hidden"
        suppressHydrationWarning
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
