"use client";

import { motion } from "framer-motion";
import { Lightbulb, Handshake, PackageCheck, Truck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const steps = [
  {
    icon: <Lightbulb className="w-7 h-7" />,
    labelKey: "howItWorks.steps.design.label",
    titleKey: "howItWorks.steps.design.title",
    descKey: "howItWorks.steps.design.desc",
    gradient: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    icon: <Handshake className="w-7 h-7" />,
    labelKey: "howItWorks.steps.quote.label",
    titleKey: "howItWorks.steps.quote.title",
    descKey: "howItWorks.steps.quote.desc",
    gradient: "from-blue-400 to-indigo-500",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: <PackageCheck className="w-7 h-7" />,
    labelKey: "howItWorks.steps.order.label",
    titleKey: "howItWorks.steps.order.title",
    descKey: "howItWorks.steps.order.desc",
    gradient: "from-emerald-400 to-teal-500",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: <Truck className="w-7 h-7" />,
    labelKey: "howItWorks.steps.scale.label",
    titleKey: "howItWorks.steps.scale.title",
    descKey: "howItWorks.steps.scale.desc",
    gradient: "from-purple-400 to-pink-500",
    bg: "bg-purple-50",
    iconColor: "text-purple-600",
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
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-black text-foreground mb-6"
          >
            {t("howItWorks.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-muted-foreground font-medium leading-relaxed"
          >
            {t("howItWorks.subtitle")}
          </motion.p>
        </div>

        <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-0">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-[52px] left-[12%] right-[12%] h-[2px]">
            <div className="w-full h-full bg-gradient-to-r from-amber-300 via-blue-300 via-emerald-300 to-purple-300 rounded-full opacity-40" />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative flex flex-col items-center text-center px-6 py-8"
            >
              {/* Step number + icon circle */}
              <div className="relative mb-6">
                <div
                  className={`w-[104px] h-[104px] rounded-3xl ${step.bg} flex items-center justify-center relative z-10 border border-white shadow-lg`}
                >
                  <div className={step.iconColor}>{step.icon}</div>
                </div>
                {/* Step number badge */}
                <div
                  className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white text-sm font-bold shadow-md z-20`}
                >
                  {index + 1}
                </div>
              </div>

              {/* Label */}
              <span
                className={`inline-block text-[11px] font-bold uppercase tracking-widest mb-2 bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}
              >
                {t(step.labelKey)}
              </span>

              {/* Title */}
              <h3 className="text-lg font-bold text-foreground mb-3 leading-snug">
                {t(step.titleKey)}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px]">
                {t(step.descKey)}
              </p>

              {/* Arrow connector (mobile) */}
              {index < steps.length - 1 && (
                <div className="lg:hidden flex justify-center my-4">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-muted-foreground/30 rotate-90"
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
