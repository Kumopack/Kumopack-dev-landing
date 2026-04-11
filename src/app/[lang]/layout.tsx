import type { Metadata } from "next";
import { Noto_Sans_Thai, Noto_Sans } from "next/font/google";
import "@/app/globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { GoogleAnalytics } from "@next/third-parties/google";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isThai = lang === "th";

  return {
    title: "Kumopack | The Absolute Packaging Solutions",
    description: isThai
      ? "ออกแบบและสั่งผลิตบรรจุภัณฑ์ที่ยกระดับแบรนด์ของคุณ รับใบเสนอราคาทันทีจากโรงงานชั้นนำ เปรียบเทียบ เลือก และสร้างสรรค์—ครบจบในที่เดียว"
      : "Design and order custom packaging that elevates your brand. Get instant quotes from top-tier factories. Compare, choose, and create—all in one place.",
    keywords: isThai
      ? ["บรรจุภัณฑ์", "สั่งทำบรรจุภัณฑ์", "ออกแบบบรรจุภัณฑ์", "โรงงานผลิตบรรจุภัณฑ์", "Kumopack", "กล่องกระดาษ", "ถุงพลาสติก"]
      : ["custom packaging", "packaging design", "packaging manufacturer", "Kumopack", "boxes", "bags", "packaging solutions"],
    openGraph: {
      title: "Kumopack | The Absolute Packaging Solutions",
      description: isThai
        ? "ออกแบบและสั่งผลิตบรรจุภัณฑ์ที่ยกระดับแบรนด์ของคุณ รับใบเสนอราคาทันทีจากโรงงานชั้นนำ"
        : "Design and order custom packaging that elevates your brand. Get instant quotes from top-tier factories.",
      url: "https://www.kumopack.com",
      siteName: "Kumopack",
      images: [
        {
          url: "https://www.kumopack.com/images/og-kumopack.jpg", 
          width: 1200,
          height: 630,
          alt: "Kumopack Cover Image",
        },
      ],
      locale: isThai ? "th_TH" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Kumopack | The Absolute Packaging Solutions",
      description: isThai
        ? "ออกแบบและสั่งผลิตบรรจุภัณฑ์ที่ยกระดับแบรนด์ของคุณ รับใบเสนอราคาทันทีจากโรงงานชั้นนำ"
        : "Design and order custom packaging that elevates your brand. Get instant quotes from top-tier factories.",
      images: ["https://www.kumopack.com/images/og-kumopack.jpg"],
    },
    alternates: {
      languages: {
        "th": "https://www.kumopack.com/th",
        "en": "https://www.kumopack.com/en",
      },
      canonical: "https://www.kumopack.com",
    },
  };
}

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
        <GoogleAnalytics gaId="G-V04ED6MQJ7" />
      </body>
    </html>
  );
}
