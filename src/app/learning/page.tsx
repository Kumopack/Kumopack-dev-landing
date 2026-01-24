"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, ChevronRight, GraduationCap, ShoppingBag, Factory, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { learningArticles } from "@/data/learning";
import { SafeImage } from "@/components/ui/safe-image";
import { useLanguage } from "@/context/LanguageContext";

export default function LearningPage() {
    const [audience, setAudience] = useState<"buyer" | "supplier">("buyer");
    const [search, setSearch] = useState("");
    const { t } = useLanguage();

    const filteredArticles = learningArticles.filter(a =>
        a.audience === audience &&
        (a.title.toLowerCase().includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4 md:px-8 bg-muted/20">
                <div className="container mx-auto max-w-6xl text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-8 flex items-center justify-center gap-4">
                        <GraduationCap className="w-12 h-12 text-primary" />
                        Learning <span className="text-primary">Center</span>
                    </h1>

                    {/* Audience Toggle */}
                    <div className="inline-flex p-1 bg-white/50 backdrop-blur-md rounded-2xl border border-border/50 mb-12">
                        <button
                            onClick={() => setAudience("buyer")}
                            className={`flex items-center gap-2 px-6 py-2 rounded-xl transition-all ${audience === "buyer" ? "bg-white shadow-soft text-primary font-bold" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            <ShoppingBag className="w-4 h-4" />
                            For Buyers
                        </button>
                        <button
                            onClick={() => setAudience("supplier")}
                            className={`flex items-center gap-2 px-6 py-2 rounded-xl transition-all ${audience === "supplier" ? "bg-white shadow-soft text-primary font-bold" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            <Factory className="w-4 h-4" />
                            For Suppliers
                        </button>
                    </div>

                    <div className="max-w-2xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search articles, guides..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white border border-border/50 rounded-2xl px-12 py-4 shadow-soft focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="py-24 px-4 md:px-8">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredArticles.map((article, idx) => (
                                <motion.div
                                    key={article.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group bg-card rounded-[2rem] overflow-hidden border border-border/50 hover:shadow-float transition-all"
                                >
                                    <div className="aspect-[16/10] relative overflow-hidden">
                                        <SafeImage src={article.image} alt={article.title} className="w-full h-full group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm shadow-soft text-xs font-bold text-primary">
                                                {article.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {article.date}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                5 min read
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{article.title}</h3>
                                        <p className="text-muted-foreground text-sm line-clamp-2 mb-6">{article.description}</p>
                                        <Link
                                            href={`/learning/${article.id}`}
                                            className="text-primary font-bold text-sm flex items-center gap-1 group/link"
                                        >
                                            Read More
                                            <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredArticles.length === 0 && (
                        <div className="text-center py-24">
                            <GraduationCap className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                            <h3 className="text-2xl font-bold text-muted-foreground">No resources found</h3>
                            <p className="text-muted-foreground">Try adjusting your search or switching audiences.</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
