"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Factory, ArrowRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect, Suspense } from "react";

function LoginSelectionContent() {
    const searchParams = useSearchParams();
    const ref = searchParams.get("ref");
    const code = searchParams.get("code");
    const { t } = useLanguage();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSelect = (role: "buyer" | "supplier") => {
        const baseUrl = role === "buyer" ? "https://buyer.kumopack.com" : "https://supplier.kumopack.com";
        const params = new URLSearchParams();
        if (ref) params.append("ref", ref);
        if (code) params.append("code", code);

        const finalUrl = params.toString() ? `${baseUrl}/auth?${params.toString()}` : `${baseUrl}/auth`;

        console.log(`Redirecting to: ${finalUrl}`);

        // Mock token for testing "Enter App" button in Navbar
        auth.setToken("mock_token_123");

        // In a real app, we would redirect:
        // window.location.href = finalUrl;
        alert(`Redirecting to ${role} portal: ${finalUrl}\n(Mock token set for Navbar testing)`);
        window.location.href = "/";
    };

    if (!isMounted) return null;

    return (
        <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <Link href="/" className="absolute top-8 left-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-soft">
                    <img src="/logo/logo-icon.png" alt="Logo" className="w-full h-full object-cover" />
                </div>
                <span className="text-xl font-bold">Kumopack</span>
            </Link>

            <div className="max-w-4xl w-full text-center space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('login.title')}</h1>
                    <p className="text-muted-foreground text-lg">{t('login.subtitle')}</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Buyer Option */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="bg-card p-10 rounded-[2.5rem] border border-border/50 shadow-float cursor-pointer group flex flex-col items-center"
                        onClick={() => handleSelect("buyer")}
                    >
                        <div className="w-24 h-24 rounded-3xl bg-mint/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                            <ShoppingBag className="w-12 h-12 text-mint-foreground" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">{t('login.iamBuyer')}</h2>
                        <p className="text-muted-foreground mb-8 text-center">{t('login.buyerDesc')}</p>
                        <Button className="w-full py-6 rounded-2xl group-hover:shadow-glow transition-all">
                            {t('login.continue')} as Buyer
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </motion.div>

                    {/* Supplier Option */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="bg-card p-10 rounded-[2.5rem] border border-border/50 shadow-float cursor-pointer group flex flex-col items-center"
                        onClick={() => handleSelect("supplier")}
                    >
                        <div className="w-24 h-24 rounded-3xl bg-sky/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                            <Factory className="w-12 h-12 text-sky-foreground" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">{t('login.iamSupplier')}</h2>
                        <p className="text-muted-foreground mb-8 text-center">{t('login.supplierDesc')}</p>
                        <Button variant="outline" className="w-full py-6 rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                            {t('login.continue')} as Supplier
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </motion.div>
                </div>

                <div className="pt-8 text-sm text-muted-foreground">
                    New to Kumopack? <Link href="/pricing" className="text-primary font-bold">Explore our plans</Link>
                </div>
            </div>
        </main>
    );
}

export default function LoginSelectionPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
            <LoginSelectionContent />
        </Suspense>
    );
}
