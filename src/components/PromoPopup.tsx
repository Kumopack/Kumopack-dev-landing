"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

const POPUP_STORAGE_KEY = "kumopack_promo_closed_at";

export const PromoPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { language } = useLanguage();

    useEffect(() => {
        setIsMounted(true);
        const lastClosedAt = localStorage.getItem(POPUP_STORAGE_KEY);
        const now = new Date().getTime();
        const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

        if (!lastClosedAt || now - parseInt(lastClosedAt) > TWENTY_FOUR_HOURS) {
            const timer = setTimeout(() => setIsOpen(true), 1500); // Show after 1.5s
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        if (typeof window !== 'undefined') {
            localStorage.setItem(POPUP_STORAGE_KEY, new Date().getTime().toString());
        }
    };

    const handleAction = () => {
        window.open("https://event.kumopack.com", "_blank");
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
                        className="relative w-full max-w-lg bg-card rounded-[2.5rem] overflow-hidden shadow-glow border border-border/50"
                    >
                        <button
                            onClick={handleClose}
                            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="aspect-video relative overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1572333032329-a11f43ee36fd?auto=format&fit=crop&q=80&w=2070"
                                alt="Promo"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                        </div>

                        <div className="p-10 -mt-20 relative z-10 space-y-6 text-center">
                            <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center mx-auto shadow-glow">
                                <Megaphone className="w-10 h-10 text-primary-foreground" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-3xl font-extrabold tracking-tight">
                                    {language === 'en' ? "Summer Packaging Sale!" : "โปรโมชั่นแพ็คเกจหน้าร้อน!"}
                                    <span className="text-primary">{language === 'en' ? "" : " ลดพิเศษ!"}</span>
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {language === 'en'
                                        ? "Get up to 20% off on all eco-friendly mailer boxes this week. Exclusive for new partners."
                                        : "รับส่วนลดสูงสุด 20% สำหรับกล่องพัสดุเป็นมิตรต่อสิ่งแวดล้อมสัปดาห์นี้ เฉพาะพาร์ทเนอร์ใหม่เท่านั้น"
                                    }
                                </p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button
                                    onClick={handleAction}
                                    className="w-full py-8 rounded-2xl text-lg font-bold shadow-soft group"
                                >
                                    {language === 'en' ? "Claim Offer Now" : "รับข้อเสนอตอนนี้"}
                                    <ExternalLink className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </Button>
                                <button
                                    onClick={handleClose}
                                    className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {language === 'en' ? "Maybe later" : "ไว้คราวหน้า"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
