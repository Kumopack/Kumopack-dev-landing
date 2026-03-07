"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Megaphone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { SafeImage } from "@/components/ui/safe-image";

const POPUP_STORAGE_KEY = "kumopack_promo_closed_at";

export const PromoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsMounted(true);
    const lastClosedAt = localStorage.getItem(POPUP_STORAGE_KEY);
    const now = new Date().getTime();
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

    if (!lastClosedAt || now - parseInt(lastClosedAt) > TWENTY_FOUR_HOURS) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(POPUP_STORAGE_KEY, new Date().getTime().toString());
    }
  };

  const handleAction = () => {
    window.open(
      process.env.NEXT_PUBLIC_EVENT_URL || "https://event.kumopack.com",
      "_blank",
    );
    handleClose();
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-card rounded-[2rem] overflow-hidden shadow-2xl border border-white/20 flex flex-col max-h-[85vh]"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="overflow-y-auto flex-1 overscroll-contain">
              <div className="relative w-full">
                <SafeImage
                  src="/asset/promotion-cny.jpg"
                  alt="Promo"
                  className="w-full h-auto max-h-[45vh] object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card to-transparent" />
              </div>

              <div className="p-6 pt-0 relative z-10 text-center -mt-6">
                <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center mx-auto shadow-lg shadow-red-500/30 mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-2 leading-tight">
                  {t("promo.title")}
                  <span className="text-red-600 block mt-1">
                    {t("promo.highlight")}
                  </span>
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {t("promo.subtitle")}
                </p>

                <div className="flex flex-col gap-3">
                  <Button
                    onClick={handleAction}
                    className="w-full py-6 rounded-xl text-base font-bold shadow-md bg-red-600 hover:bg-red-700 text-white border-none"
                  >
                    <span>{t("promo.cta")}</span>
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                  <button
                    onClick={handleClose}
                    className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                    {t("promo.close")}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
