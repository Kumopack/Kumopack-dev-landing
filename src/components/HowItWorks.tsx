"use client";

import { motion } from "framer-motion";
import { Paintbrush, MessageSquare, Package, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const steps = [
  {
    icon: <Paintbrush className="w-8 h-8" />,
    titleKey: "howItWorks.steps.design.title",
    descKey: "howItWorks.steps.design.desc",
    color: "bg-primary/20 text-primary",
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    titleKey: "howItWorks.steps.quote.title",
    descKey: "howItWorks.steps.quote.desc",
    color: "bg-mint/20 text-mint-foreground",
  },
  {
    icon: <Package className="w-8 h-8" />,
    titleKey: "howItWorks.steps.order.title",
    descKey: "howItWorks.steps.order.desc",
    color: "bg-blue-500/20 text-blue-600",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    titleKey: "howItWorks.steps.scale.title",
    descKey: "howItWorks.steps.scale.desc",
    color: "bg-coral/20 text-coral-foreground",
  },
];

const HowItWorks = () => {
  const { t } = useLanguage();

  return (
    <section
      id="how-it-works"
      className="py-24 bg-background relative overflow-hidden scroll-mt-24"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-black text-foreground mb-6"
          >
            {t("howItWorks.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-muted-foreground font-medium"
          >
            {t("howItWorks.subtitle")}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative p-8 rounded-[2.5rem] bg-card border border-border/50 hover:border-primary/40 hover:shadow-float transition-all duration-500"
            >
              <div className="absolute top-6 right-8 text-4xl font-black text-muted/20 group-hover:text-primary/10 transition-colors">
                0{index + 1}
              </div>

              <div
                className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}
              >
                {step.icon}
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-4">
                {t(step.titleKey)}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t(step.descKey)}
              </p>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-full -translate-y-1/2 text-muted/30">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                  >
                    <path
                      d="M5 12H19M19 12L13 6M19 12L13 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
