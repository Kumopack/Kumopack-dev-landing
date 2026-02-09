import type { Metadata } from "next";
import { Noto_Sans_Thai, Noto_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

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
  keywords: [
    "packaging",
    "custom boxes",
    "sourcing",
    "factory",
    "b2b",
    "printing",
  ],
  openGraph: {
    title: "Kumopack | The Absolute Packaging Solutions",
    description: "Design and order custom packaging that elevates your brand.",
    url: "https://kumopack.com",
    siteName: "Kumopack",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoTh.variable} ${notoEn.variable}`}
      suppressHydrationWarning
    >
      <body
        className="antialiased font-sans overflow-x-hidden"
        suppressHydrationWarning
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
