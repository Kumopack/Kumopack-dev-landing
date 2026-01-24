"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Target, Shield, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import SafeImage from "@/components/SafeImage";

export default function AboutUsPage() {
    const { dict } = useLanguage();

    const coreValues = [
        { icon: Shield, title: dict.aboutUs.values.transparency, desc: dict.aboutUs.values.transparencyDesc },
        { icon: Zap, title: dict.aboutUs.values.speed, desc: dict.aboutUs.values.speedDesc },
        { icon: Target, title: dict.aboutUs.values.quality, desc: dict.aboutUs.values.qualityDesc },
        { icon: Users, title: dict.aboutUs.values.community, desc: dict.aboutUs.values.communityDesc },
    ];
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 md:px-8 bg-gradient-to-b from-primary/5 to-transparent">
                <div className="container mx-auto max-w-6xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-8">
                            {dict.aboutUs.title} <span className="text-primary">Kumopack</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            {dict.aboutUs.subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 px-4 md:px-8">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <h2 className="text-4xl font-bold">{dict.aboutUs.missionTitle}</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {dict.aboutUs.missionDesc}
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <div className="text-4xl font-bold text-primary">500+</div>
                                    <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">{dict.aboutUs.brandsTrusted}</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-4xl font-bold text-primary">200+</div>
                                    <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">{dict.aboutUs.factoryPartners}</div>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative aspect-square rounded-3xl overflow-hidden shadow-float border border-border/50"
                        >
                            <SafeImage
                                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=2074"
                                alt="Our Team"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-24 px-4 md:px-8 bg-muted/20">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">{dict.aboutUs.coreValuesTitle}</h2>
                        <p className="text-muted-foreground">{dict.aboutUs.coreValuesSubtitle}</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {coreValues.map((value, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-card p-8 rounded-3xl border border-border/50 hover:shadow-soft transition-all"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                    <value.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
