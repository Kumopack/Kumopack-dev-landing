"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, MapPin, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import SafeImage from "@/components/SafeImage";

export default function SupplierPage() {
    const { dict } = useLanguage();

    const suppliers = [
        { id: 1, name: "Premium Print Co.", rating: 4.9, location: "Bangkok", specialized: "Luxury Mailers", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070" },
        { id: 2, name: "EcoBox Industries", rating: 4.8, location: "Samut Prakan", specialized: "Recycled Board", image: "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?auto=format&fit=crop&q=80&w=2071" },
        { id: 3, name: "Digital Pack Solutions", rating: 4.7, location: "Chonburi", specialized: "Fast Turnaround", image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=2074" },
        { id: 4, name: "Creative Carton Ltd.", rating: 4.9, location: "Bangkok", specialized: "Display Cases", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=2070" }
    ];

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <section className="pt-32 pb-24 px-4 md:px-8">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-2xl">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">{dict.supplier.title.split(' ')[0]} <span className="text-primary">{dict.supplier.trusted}</span> {dict.supplier.title.split(' ')[1] || ""}</h1>
                            <p className="text-xl text-muted-foreground">
                                {dict.supplier.subtitle}
                            </p>
                        </div>
                        <Button variant="hero" className="rounded-2xl">{dict.supplier.becomeSupplier}</Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {suppliers.map((s, idx) => (
                            <motion.div
                                key={s.id}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group bg-card p-4 rounded-[2rem] border border-border/50 hover:border-primary/30 hover:shadow-float transition-all"
                            >
                                <div className="flex flex-col sm:flex-row gap-6">
                                    <div className="w-full sm:w-48 h-48 rounded-2xl overflow-hidden shrink-0 relative">
                                        <SafeImage
                                            src={s.image}
                                            alt={s.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="flex-1 py-4 pr-4 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{s.name}</h3>
                                            <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                                                <Star className="w-3 h-3 text-primary fill-primary" />
                                                <span className="text-sm font-bold text-primary">{s.rating}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-4 text-muted-foreground text-sm mb-6">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                {s.location}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <ShieldCheck className="w-4 h-4" />
                                                {dict.supplier.certifiedPartner}
                                            </div>
                                        </div>
                                        <div className="text-sm text-foreground font-medium mb-6">
                                            {dict.supplier.specializedIn} <span className="text-muted-foreground font-normal">{s.specialized}</span>
                                        </div>
                                        <div className="mt-auto">
                                            <Link href={`/supplier/${s.id}`}>
                                                <Button variant="outline" className="rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                                    {dict.supplier.viewProfile}
                                                    <ArrowRight className="ml-2 w-4 h-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
