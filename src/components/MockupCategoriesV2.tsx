"use client";

import { motion } from "framer-motion";
import { ArrowRight, MoveRight } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { getAssetPath } from "@/lib/utils";

const categories = [
  {
    id: "corrugated-mailer",
    titleKey: "products.corrugatedMailerBox",
    count: 1653,
    image: getAssetPath("/img/box/corrugated-mailer-box.jpg"),
  },
  {
    id: "corrugated-pizza",
    titleKey: "products.corrugatedPizzaBox",
    count: 828,
    image: getAssetPath("/img/box/corrugated-pizza-box.jpg"),
  },
  {
    id: "die-cut-fruit",
    titleKey: "products.dieCutFruitBox",
    count: 1863,
    image: getAssetPath("/img/box/die-cut-fruit-box.jpg"),
  },
  {
    id: "document-box",
    titleKey: "products.documentBox",
    count: 660,
    image: getAssetPath("/img/box/document-box.jpg"),
  },
  {
    id: "drawer-box",
    titleKey: "products.drawerBox",
    count: 202,
    image: getAssetPath("/img/box/drawer-box.jpg"),
  },
  {
    id: "folding-carton",
    titleKey: "products.foldingCartonBox",
    count: 338,
    image: getAssetPath("/img/box/folding-carton-box.jpg"),
  },
  {
    id: "full-telescope",
    titleKey: "products.fullTelescope",
    count: 437,
    image: getAssetPath("/img/box/full-telescope-ftd.jpg"),
  },
  {
    id: "handle-box",
    titleKey: "products.handleBox",
    count: 195,
    image: getAssetPath("/img/box/handle-box.jpg"),
  },
  {
    id: "rsc",
    titleKey: "products.regularSlottedContainer",
    count: 143,
    image: getAssetPath("/img/box/regular-slotted-container-rsc.jpg"),
  },
  {
    id: "rte",
    titleKey: "products.reverseTuckEnd",
    count: 79,
    image: getAssetPath("/img/box/reverse-tuck-end-rte.jpg"),
  },
  {
    id: "roll-end-tray",
    titleKey: "products.rollEndTray",
    count: 81,
    image: getAssetPath("/img/box/roll-end-tray.jpg"),
  },
  {
    id: "shoe-box",
    titleKey: "products.shoeBox",
    count: 178,
    image: getAssetPath("/img/box/shoe-box.jpg"),
  },
];

const MockupCategoriesV2 = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Playful Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-500 text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
            {t("mockupCategories.title")}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter leading-none">
            Choose Your <span className="text-neutral-300">Style</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative bg-white rounded-[2rem] p-6 border border-neutral-100 shadow-[0_5px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden h-[150px] select-none pointer-events-none"
            >
              <div className="relative z-10 h-full flex flex-col justify-center">
                <div className="space-y-0.5">
                  <h3 className="text-md font-black text-foreground tracking-tighter group-hover:text-primary transition-colors duration-500 line-clamp-2 pr-20">
                    {t(category.titleKey)}
                  </h3>
                  <div className="text-muted-foreground/40 text-[9px] font-black uppercase tracking-widest">
                    {category.count.toLocaleString()} Templates
                  </div>
                </div>
              </div>

              {/* Seamless Image Container */}
              <div className="absolute right-2 inset-y-2 w-[45%] group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <div className="relative w-full h-full mix-blend-multiply flex items-center justify-end">
                  <Image
                    src={category.image}
                    alt={t(category.titleKey)}
                    fill
                    className="object-contain object-right"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </div>

              {/* Decorative Corner Element */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-[60px] -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-1000" />
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <p className="text-neutral-300 font-black text-[10px] uppercase tracking-[0.4em]">
            {t("mockupCategories.viewAll")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MockupCategoriesV2;
