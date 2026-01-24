"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "lucide-react";
import NextLink from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import SafeImage from "@/components/SafeImage";

export default function MaterialsPage() {
    const { dict } = useLanguage();

    const materials = [
        { id: 1, name: dict.materials.kraftPaper, image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&q=80&w=2070", desc: dict.materials.kraftPaperDesc },
        { id: 2, name: dict.materials.corrugatedCardboard, image: "https://images.unsplash.com/photo-1595113316349-9fa4ee24ef84?auto=format&fit=crop&q=80&w=2070", desc: dict.materials.corrugatedCardboardDesc },
        { id: 3, name: dict.materials.specialtyArtPaper, image: "https://images.unsplash.com/photo-1586075010620-2d4309bc670d?auto=format&fit=crop&q=80&w=2070", desc: dict.materials.specialtyArtPaperDesc },
        { id: 4, name: dict.materials.recycledBoard, image: "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&q=80&w=2070", desc: dict.materials.recycledBoardDesc }
    ];

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <section className="pt-32 pb-24 px-4 md:px-8">
                <div className="container mx-auto max-w-6xl">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">{dict.materials.title.split(' ')[0]} <span className="text-primary">{dict.materials.title.split(' ')[1] || ""}</span></h1>
                    <p className="text-xl text-muted-foreground mb-16 max-w-2xl text-left">
                        {dict.materials.subtitle}
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {materials.map((m, idx) => (
                            <motion.div
                                key={m.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative bg-card rounded-3xl overflow-hidden border border-border/50 hover:shadow-float transition-all"
                            >
                                <div className="aspect-square relative overflow-hidden">
                                    <SafeImage
                                        src={m.image}
                                        alt={m.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">{m.name}</h3>
                                    <p className="text-sm text-muted-foreground mb-6">{m.desc}</p>
                                    <NextLink
                                        href={`/materials/${m.id}`}
                                        className="text-primary font-semibold text-sm flex items-center gap-2"
                                    >
                                        {dict.materials.details}
                                        <Link className="w-4 h-4" />
                                    </NextLink>
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
