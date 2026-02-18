import type { Metadata } from "next";
import FAQPage from "./FAQClient";
import { faqSections } from "./faqData";

function generateFAQJsonLd() {
  const allFAQs = faqSections.flatMap((section) =>
    section.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  );

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFAQs,
  };
}

export const metadata: Metadata = {
  title: "คำถามที่พบบ่อย (FAQ) | Kumopack — แพลตฟอร์มบรรจุภัณฑ์ครบวงจร",
  description:
    "รวมคำถามที่พบบ่อยเกี่ยวกับ Kumopack แพลตฟอร์มบรรจุภัณฑ์ครบวงจร ทั้งสำหรับผู้ซื้อและผู้ผลิต พร้อมคำตอบที่ชัดเจน ครอบคลุมทุกเรื่องที่คุณอยากรู้",
  keywords: [
    "Kumopack FAQ",
    "คำถามที่พบบ่อย",
    "บรรจุภัณฑ์",
    "packaging",
    "OEM",
    "Marketplace",
    "ผู้ซื้อ",
    "ผู้ผลิต",
    "Kumo Coin",
  ],
  openGraph: {
    title: "คำถามที่พบบ่อย | Kumopack",
    description: "รวมคำตอบทุกเรื่องที่คุณอยากรู้เกี่ยวกับ Kumopack",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQJsonLd()),
        }}
      />
      <FAQPage />
    </>
  );
}
