import type { Metadata } from "next";
import { Noto_Sans_Thai, Noto_Sans } from "next/font/google";
import "./globals.css";

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
  description: "Design and order custom packaging that elevates your brand.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="th"
      className={`${notoTh.variable} ${notoEn.variable} overflow-x-hidden`}
      suppressHydrationWarning
    >
      <body
        className="antialiased font-sans overflow-x-hidden"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
