"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";
import { getAssetPath } from "@/lib/utils";

const partners = [
  {
    name: "depa",
    src: "/img/partner/depa.png",
    bgColor: "bg-white",
    zoom: 1.8,
  },
  {
    name: "ebay",
    src: "/img/partner/ebay.png",
    bgColor: "bg-white",
    zoom: 0.9,
  },
  {
    name: "factory-77",
    src: "/img/partner/factory-77.png",
    bgColor: "bg-white",
    zoom: 1.2,
  },
  {
    name: "flash",
    src: "/img/partner/flash.png",
    bgColor: "bg-[#f8ec20]",
    zoom: 0.95,
  },
  {
    name: "jinda-siam",
    src: "/img/partner/jinda-siam.svg",
    bgColor: "bg-white",
    zoom: 1,
  },
  {
    name: "lactasoy",
    src: "/img/partner/lactasoy.png",
    bgColor: "bg-[#0275c8]",
    zoom: 0.85,
  },
  {
    name: "lazada",
    src: "/img/partner/lazada.png",
    bgColor: "bg-white",
    zoom: 1,
  },
  {
    name: "ninjavan",
    src: "/img/partner/ninjavan.png",
    bgColor: "bg-white",
    zoom: 0.85,
  },
  {
    name: "nokair",
    src: "/img/partner/nokair.png",
    bgColor: "bg-white",
    zoom: 1.8,
  },
  {
    name: "nstda",
    src: "/img/partner/nstda.png",
    bgColor: "bg-white",
    zoom: 0.85,
  },
  {
    name: "peak",
    src: "/img/partner/peak.jpg",
    bgColor: "bg-[#3295fa]",
    zoom: 1.7,
  },
  {
    name: "saemaeul",
    src: "/img/partner/saemaeul.jpg",
    bgColor: "bg-white",
    zoom: 1.7,
  },
  {
    name: "shopee",
    src: "/img/partner/shopee.png",
    bgColor: "bg-white",
    zoom: 0.9,
  },
  {
    name: "yunhee",
    src: "/img/partner/yunhee.png",
    bgColor: "bg-white",
    zoom: 0.85,
  },
];

const LogoTicker = () => {
  const { t } = useTranslation();
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-12 md:py-16 overflow-hidden bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 md:px-8 mb-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm md:text-base font-medium"
        >
          {t("logoTicker.title")}
        </motion.p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-ticker items-center w-max">
          {duplicatedPartners.map((partner, index) => (
            <div key={index} className="flex-shrink-0 px-6 md:px-10 group">
              <div
                className={`flex items-center justify-center w-24 h-16 md:w-32 md:h-20 ${partner.bgColor || "bg-white"} border border-border/30 rounded-xl group-hover:border-primary/30 group-hover:scale-105 transition-all duration-300 p-3 md:p-4 shadow-sm hover:shadow-md`}
              >
                <div
                  className="relative w-full h-full transition-all duration-500"
                  style={{ transform: `scale(${partner.zoom || 1})` }}
                >
                  <Image
                    src={getAssetPath(partner.src)}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoTicker;
