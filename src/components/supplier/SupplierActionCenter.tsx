"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  MessageSquare,
  Heart,
  Zap,
  Globe,
  Mail,
  ExternalLink,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Supplier } from "@/types/supplier";
import { getBuyerAuth, BUYER_URLS } from "@/lib/auth-buyer";
import { useLanguage } from "@/context/LanguageContext";

interface SupplierActionCenterProps {
  supplier: Supplier;
}

export const SupplierActionCenter = ({
  supplier,
}: SupplierActionCenterProps) => {
  const { language } = useLanguage();
  const [isLiking, setIsLiking] = useState(false);

  const handleAction = async (action: "chat" | "like" | "quote") => {
    const { isAuthenticated, token } = getBuyerAuth();

    if (!isAuthenticated) {
      window.location.href = BUYER_URLS.AUTH;
      return;
    }

    switch (action) {
      case "chat":
        window.location.href = BUYER_URLS.BASE;
        break;
      case "quote":
        window.location.href = BUYER_URLS.BASE;
        break;
      case "like":
        setIsLiking(true);
        try {
          const response = await fetch(BUYER_URLS.ADD_FAVORITE_API, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ supplierUUID: supplier.id }),
          });

          if (response.ok) {
            window.location.href = BUYER_URLS.FAVORITE;
          } else {
            window.location.href = BUYER_URLS.FAVORITE;
          }
        } catch (error) {
          window.location.href = BUYER_URLS.FAVORITE;
        } finally {
          setIsLiking(false);
        }
        break;
    }
  };

  return (
    <aside className="lg:col-span-4 lg:sticky lg:top-36 h-fit pt-12 lg:pt-0">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-[hsl(var(--glass))] backdrop-blur-3xl border border-[hsl(var(--glass-border))] p-8 rounded-[3rem] shadow-float space-y-10 relative overflow-hidden group/hub"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-[50px] -z-10 group-hover/hub:scale-150 transition-transform duration-1000" />

        <div className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <div className="space-y-1">
              <span className="text-[9px] font-black text-primary tracking-[0.2em] uppercase">
                PEOPLE SCORE
              </span>
              <div className="flex items-center gap-2">
                <div className="flex text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(supplier.rating) ? "fill-primary" : "opacity-20"}`}
                    />
                  ))}
                </div>
                <span className="font-black text-xl tracking-tighter">
                  {supplier.rating}
                </span>
              </div>
            </div>
            <div className="text-right space-y-1">
              <span className="text-[9px] font-black text-muted-foreground tracking-[0.2em] uppercase">
                {language === "th" ? "ยอดขาย" : "SALES"}
              </span>
              <div className="font-black text-lg tracking-tighter">
                {supplier.reviewCount >= 1000000
                  ? `${(supplier.reviewCount / 1000000).toFixed(1)}M`
                  : supplier.reviewCount >= 1000
                    ? `${(supplier.reviewCount / 1000).toFixed(0)}K`
                    : `${supplier.reviewCount}`}+
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              size="xl"
              onClick={() => handleAction("chat")}
              className="w-full rounded-2xl shadow-glow h-16 text-xl font-black gap-3 group/btn bg-gradient-to-r from-primary to-primary/80 border-none transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageSquare className="w-7 h-7 group-hover/btn:rotate-12 transition-transform" />
              Direct Chat
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleAction("like")}
                disabled={isLiking}
                className="w-full rounded-xl h-12 font-black gap-2 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all text-sm"
              >
                {isLiking ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Heart className="w-4 h-4" />
                )}
                Like
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleAction("quote")}
                className="w-full rounded-xl h-12 font-black gap-2 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200 transition-all text-sm"
              >
                <Zap className="w-4 h-4" />
                Quote
              </Button>
            </div>
          </div>
        </div>


      </motion.div>
    </aside>
  );
};
