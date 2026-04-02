"use client";

import { motion } from "framer-motion";
import { Paintbrush, MessageSquare, Package, Zap } from "lucide-react";

const steps = [
  {
    icon: <Paintbrush className="w-8 h-8" />,
    titleKey: "howItWorks.step1Title",
    descKey: "howItWorks.step1Desc",
    defaultTitle: "Design Your Vision",
    defaultDesc:
      "Choose your box style and upload your artwork using our intuitive 3D editor.",
    color: "bg-primary/20 text-primary",
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    titleKey: "howItWorks.step2Title",
    descKey: "howItWorks.step2Desc",
    defaultTitle: "Get Instant Quotes",
    defaultDesc:
      "Receive competitive bids from our network of certified manufacturers in real-time.",
    color: "bg-mint/20 text-mint-foreground",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    titleKey: "howItWorks.step3Title",
    descKey: "howItWorks.step3Desc",
    defaultTitle: "Order Samples",
    defaultDesc:
      "Test the quality with a physical sample before committing to a full production run.",
    color: "bg-coral/20 text-coral-foreground",
  },
  {
    icon: <Package className="w-8 h-8" />,
    titleKey: "howItWorks.step4Title",
    descKey: "howItWorks.step4Desc",
    defaultTitle: "Scale Production",
    defaultDesc:
      "Once approved, your packaging goes into production and ships directly to your door.",
    color: "bg-sky/20 text-sky-foreground",
  },
];

const HowItWorks = ({ dict }: { dict: any }) => {
  const t = (path: string) => path.split('.').reduce((obj: any, key) => obj?.[key], dict) || path;

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
            {t("howItWorks.title") || "Streamlined from Idea to Unboxing"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-muted-foreground font-medium"
          >
            {t("howItWorks.subtitle") ||
              "We've simplified the complex world of packaging sourcing into four simple steps."}
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
                {t(step.titleKey) !== step.titleKey
                  ? t(step.titleKey)
                  : step.defaultTitle}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t(step.descKey) !== step.descKey
                  ? t(step.descKey)
                  : step.defaultDesc}
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
