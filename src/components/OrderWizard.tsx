"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Package,
  Truck,
  CreditCard,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

const steps = [
  {
    id: "product",
    title: "Select Product",
    icon: Package,
    description: "Choose your box style and size",
  },
  {
    id: "design",
    title: "Design",
    icon: CheckCircle,
    description: "Upload or create your artwork",
  },
  {
    id: "shipping",
    title: "Shipping",
    icon: Truck,
    description: "Enter delivery details",
  },
  {
    id: "payment",
    title: "Payment",
    icon: CreditCard,
    description: "Secure checkout",
  },
];

export const OrderWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const activeStep = steps[currentStep];

  return (
    <div className="bg-card border border-border/50 rounded-3xl p-6 md:p-10 shadow-float">
      <div className="flex justify-between items-center mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -translate-y-1/2 -z-10" />
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-brand-purple -translate-y-1/2 -z-10 transition-all duration-500"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= currentStep;
          return (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                  isActive
                    ? "bg-brand-purple border-brand-purple text-white shadow-glow"
                    : "bg-background border-muted text-muted-foreground"
                }`}
              >
                <Icon size={18} />
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${isActive ? "text-foreground" : "text-muted-foreground"}`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      <div className="min-h-[300px] flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">{activeStep.title}</h2>
              <p className="text-muted-foreground">{activeStep.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="aspect-square rounded-2xl border border-border/50 bg-muted/20 flex items-center justify-center hover:border-brand-purple/30 cursor-pointer transition-all"
                >
                  <p className="text-sm text-muted-foreground">Option {item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-auto pt-6 border-t border-border/30">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="rounded-xl"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back
          </Button>
          <Button onClick={nextStep} className="rounded-xl shadow-glow">
            {currentStep === steps.length - 1 ? "Finish Order" : "Next Step"}
            {currentStep !== steps.length - 1 && (
              <ArrowRight className="ml-2 w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
