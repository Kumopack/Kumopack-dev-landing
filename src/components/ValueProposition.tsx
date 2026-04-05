"use client";

import { motion } from "framer-motion";

const ValueProposition = ({ dict }: { dict: Record<string, any> }) => {
  const t = (path: string) => path.split('.').reduce((obj: any, key) => obj?.[key], dict) || path;

  return (
    <section
      id="about"
      className="px-4 md:px-8 py-10 md:py-16 bg-gradient-to-b from-background to-muted/30 scroll-mt-24"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-soft border border-border/50 aspect-video">
              <iframe
                src="https://www.youtube.com/embed/nYUe1ruHsac"
                title="Kumopack Introduction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {t("valueProposition.titleMain")}
                <span className="text-primary font-extrabold">
                  {t("valueProposition.titleHighlight")}
                </span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {t("valueProposition.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {[
                { value: t("valueProposition.stats.projects.value"), label: t("valueProposition.stats.projects.label") },
                { value: t("valueProposition.stats.savings.value"), label: t("valueProposition.stats.savings.label") },
                { value: t("valueProposition.stats.satisfaction.value"), label: t("valueProposition.stats.satisfaction.label") },
                { value: t("valueProposition.stats.manufacturers.value"), label: t("valueProposition.stats.manufacturers.label") },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-4 md:p-5 text-center hover:border-primary/30 hover:shadow-soft transition-all duration-300"
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
