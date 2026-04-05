"use client";

import { motion } from "framer-motion";
import { ArrowRight, MoveRight } from "lucide-react";
import Image from "next/image";
import { createTranslator, Dictionary } from "@/lib/translation";
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

const MockupCategoriesV2 = ({ dict }: { dict: Dictionary }) => {
  const t = createTranslator(dict);

  return (
    <section className="py-28 relative overflow-hidden bg-gradient-to-b from-white via-primary/[0.02] to-white">
      {}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        {}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-black uppercase tracking-[0.25em] mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {t("mockupCategories.title")}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-4xl font-black text-foreground tracking-tight leading-[1.1] mb-4"
          >
            {t("mockupCategories.heading")}{" "}
            <span className="text-primary">
              {t("mockupCategories.headingAccent")}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto"
          >
            {t("mockupCategories.subtitle")}
          </motion.p>
        </div>

        {}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative rounded-2xl overflow-hidden h-[140px] select-none pointer-events-none bg-white border border-neutral-100/80 shadow-[0_2px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-500"
            >
              {}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />

              {}
              <div
                className="relative z-10 h-full flex flex-col justify-center pl-6 pr-4"
                style={{ width: "58%" }}
              >
                <div className="space-y-1">
                  <h3 className="text-[15px] font-bold text-foreground tracking-tight line-clamp-2 leading-snug">
                    {t(category.titleKey)}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-primary/40" />
                    <span className="text-muted-foreground/50 text-[10px] font-semibold tracking-wide">
                      {category.count.toLocaleString()} templates
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute right-0 inset-y-0 w-[40%] bg-transparent flex items-center justify-center p-3">
                <div className="relative w-full h-full">
                  <Image
                    src={category.image}
                    alt={t(category.titleKey)}
                    fill
                    className="object-contain mix-blend-multiply"
                    sizes="(max-width: 768px) 40vw, 20vw"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "500+", labelKey: "gallery.stats.brands" },
            { value: "10M+", labelKey: "gallery.stats.boxes" },
            { value: "50+", labelKey: "gallery.stats.factories" },
            { value: "99%", labelKey: "gallery.stats.satisfaction" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center py-5 px-4 rounded-2xl bg-white border border-neutral-100/80 shadow-[0_2px_20px_rgba(0,0,0,0.03)]"
            >
              <p className="text-2xl md:text-3xl font-black bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground font-medium">
                {t(stat.labelKey)}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MockupCategoriesV2;
