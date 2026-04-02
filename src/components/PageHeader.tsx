"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  badgeTh?: string;
  badgeEn?: string;
  titleTh: string;
  titleEn: string;
  descriptionTh?: string;
  descriptionEn?: string;
  className?: string;
}

export default function PageHeader({
  badgeTh,
  badgeEn,
  titleTh,
  titleEn,
  descriptionTh,
  descriptionEn,
  className = "",
  lang,
}: PageHeaderProps & { lang: string }) {
  const isTh = lang === "th";

  const badge = isTh ? badgeTh : badgeEn;
  const title = isTh ? titleTh : titleEn;
  const description = isTh ? descriptionTh : descriptionEn;

  return (
    <section
      className={`relative pt-16 pb-10 md:pt-32 md:pb-16 px-4 overflow-hidden ${className}`}
    >
      <div className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/5 rounded-full blur-[80px] md:blur-[100px] -translate-y-1/2 -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-mint/5 rounded-full blur-[60px] md:blur-[80px] translate-y-1/2 -z-10" />

      <div className="max-w-[1440px] mx-auto text-center relative px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-4 md:space-y-6"
        >
          {badge && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-xl text-primary text-[10px] md:text-xs font-black border border-primary/20 shadow-soft uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {badge}
            </div>
          )}

          <div className="flex flex-col items-center gap-2 md:gap-3">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-[1.2]">
              {title}
            </h1>

            {description && (
              <p className="text-sm md:text-lg text-muted-foreground/60 font-medium max-w-2xl leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
