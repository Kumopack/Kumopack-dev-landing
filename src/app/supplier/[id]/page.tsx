"use client";

import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
    ArrowLeft, Star, MapPin, ShieldCheck, Factory, Award,
    Globe, Mail, Heart, MessageSquare, ChevronRight,
    Zap, Boxes, Clock, ExternalLink
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { suppliers, Supplier } from "@/data/suppliers";
import { SafeImage } from "@/components/ui/safe-image";

export default function SupplierDetailPage({ params }: { params: { id: string } }) {
    const supplier = suppliers.find(s => s.id === params.id) || suppliers[0];

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <section className="pt-32 pb-24 overflow-x-hidden">
                <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                    <Link href="/supplier" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-12 group">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        </div>
                        Back to Suppliers
                    </Link>

                    {/* Hero Section - Immersive Design */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative mb-32"
                    >
                        {/* Immersive Cover Image */}
                        <div className="h-[350px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-float border border-border/10 relative">
                            <SafeImage
                                src={supplier.image}
                                alt={supplier.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-black/20" />

                            {/* Floating Identity Badge Overlay */}
                            <div className="absolute -bottom-16 left-6 md:left-12 flex items-end gap-6 md:gap-8">
                                <div className="w-32 h-32 md:w-52 md:h-52 rounded-[2.5rem] bg-card p-6 md:p-8 shadow-float border border-border/50 backdrop-blur-xl group hover:-translate-y-2 transition-transform duration-500">
                                    <SafeImage
                                        src={supplier.logo}
                                        alt={`${supplier.name} Logo`}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="pb-20 hidden md:block">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="space-y-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="px-4 py-1.5 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest backdrop-blur-sm border border-primary/10">
                                                Verified Supplier
                                            </span>
                                            <span className="px-4 py-1.5 rounded-full bg-green-500/20 text-green-600 text-[10px] font-black uppercase tracking-widest backdrop-blur-sm border border-green-500/10">
                                                Gold Member
                                            </span>
                                        </div>
                                        <h1 className="text-4xl md:text-7xl font-black tracking-tight text-foreground drop-shadow-sm">{supplier.name}</h1>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Title */}
                        <div className="mt-20 md:hidden space-y-4 px-2">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest border border-primary/5">Verified</span>
                                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-[8px] font-black uppercase tracking-widest border border-green-500/5">Gold</span>
                            </div>
                            <h1 className="text-4xl font-black tracking-tight">{supplier.name}</h1>
                        </div>
                    </motion.div>

                    <div className="grid lg:grid-cols-12 gap-12 mt-12 md:mt-32">
                        {/* Main Content Area */}
                        <div className="lg:col-span-8 space-y-24">

                            {/* Factory Overview */}
                            <section className="space-y-8 animate-fade-up">
                                <h2 className="text-3xl font-black tracking-tight flex items-center gap-4">
                                    <span className="p-3 rounded-2xl bg-lavender/50 text-purple-soft">
                                        <Factory className="w-6 h-6" />
                                    </span>
                                    Factory <span className="text-primary italic">Overview</span>
                                </h2>
                                <div className="bg-card/40 backdrop-blur-sm p-6 md:p-12 rounded-[3.5rem] border border-border/50 shadow-soft space-y-12 group hover:bg-card/60 transition-colors duration-500">
                                    <p className="text-2xl md:text-4xl font-black text-foreground/90 leading-[1.1] tracking-tight">
                                        "{supplier.tagline}"
                                    </p>
                                    <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed font-medium">
                                        <p>{supplier.description}</p>
                                    </div>

                                    {/* Location Info Card - Glass Design */}
                                    <div className="flex flex-col md:flex-row gap-8 p-10 rounded-[2.5rem] bg-accent/30 border border-border/20 items-center hover:shadow-float transition-all group/loc">
                                        <div className="w-20 h-20 rounded-[1.5rem] bg-[hsl(var(--glass))] backdrop-blur-md border border-[hsl(var(--glass-border))] flex items-center justify-center shrink-0 shadow-soft group-hover/loc:scale-110 transition-transform">
                                            <MapPin className="w-10 h-10 text-primary" />
                                        </div>
                                        <div className="text-center md:text-left space-y-1">
                                            <div className="text-[10px] font-black uppercase text-primary tracking-[0.2em] mb-2">FACTORY HEADQUARTER</div>
                                            <div className="text-xl md:text-2xl font-black">{supplier.address}</div>
                                            <div className="text-muted-foreground font-bold tracking-tight">{supplier.location}, Thailand</div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Bento-Style Stats Grid */}
                            <section className="space-y-8">
                                <h2 className="text-3xl font-black tracking-tight flex items-center gap-4">
                                    <span className="p-3 rounded-2xl bg-mint/50 text-mint-foreground">
                                        <Zap className="w-6 h-6" />
                                    </span>
                                    Operational <span className="text-primary italic">DNA</span>
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {[
                                        { icon: Clock, label: "Heritage", value: supplier.stats.experience, color: "lavender" },
                                        { icon: Boxes, label: "Outflow", value: supplier.stats.capacity, color: "mint" },
                                        { icon: ShieldCheck, label: "Certs", value: supplier.stats.certifications, color: "sky" },
                                        { icon: Zap, label: "Lead", value: supplier.stats.leadTime, color: "coral" }
                                    ].map((stat, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ y: -10 }}
                                            className={`p-8 rounded-[2.5rem] border border-border/30 shadow-soft bg-card overflow-hidden group text-center flex flex-col items-center gap-4 hover:border-primary/20 transition-all`}
                                        >
                                            <div className={`w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500`}>
                                                <stat.icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="text-2xl md:text-3xl font-black text-foreground mb-1 tracking-tighter">{stat.value}</div>
                                                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>

                            {/* Core Capabilities */}
                            <section className="space-y-8">
                                <h2 className="text-3xl font-black tracking-tight flex items-center gap-4">
                                    <span className="p-3 rounded-2xl bg-coral/50 text-coral-foreground">
                                        <Award className="w-6 h-6" />
                                    </span>
                                    Industry <span className="text-primary italic">Expertise</span>
                                </h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    {supplier.features.map((feature, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ scale: 1.02 }}
                                            className="p-10 rounded-[3rem] bg-card border border-border/50 hover:border-primary/40 hover:shadow-float transition-all group flex flex-col gap-8"
                                        >
                                            <div className="w-20 h-20 rounded-[1.5rem] bg-accent/50 flex items-center justify-center p-5 group-hover:rotate-6 transition-transform">
                                                <SafeImage src={feature.icon} alt={feature.title} className="w-full h-full object-contain" />
                                            </div>
                                            <div className="space-y-4">
                                                <h3 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">{feature.title}</h3>
                                                <p className="text-muted-foreground font-medium leading-relaxed">{feature.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>

                            {/* Product Portfolio */}
                            <section className="space-y-8">
                                <h2 className="text-3xl font-black tracking-tight flex items-center gap-4">
                                    <span className="p-3 rounded-2xl bg-sky/50 text-sky-foreground">
                                        <Boxes className="w-6 h-6" />
                                    </span>
                                    Product <span className="text-primary italic">Portfolio</span>
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {supplier.categories.map((cat, idx) => (
                                        <div key={idx} className="p-10 rounded-[3rem] bg-accent/20 border border-border/10 space-y-6">
                                            <h3 className="text-xl font-black flex items-center gap-2">
                                                <div className="w-2 h-8 bg-primary rounded-full" />
                                                {cat.name}
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {cat.items.map((item, i) => (
                                                    <span key={i} className="px-4 py-2 rounded-xl bg-card border border-border/50 text-xs font-bold text-muted-foreground">
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Production Gallery */}
                            <section className="space-y-8">
                                <div className="flex items-end justify-between px-2">
                                    <h2 className="text-3xl font-black tracking-tight flex items-center gap-4">
                                        <span className="p-3 rounded-2xl bg-sky/50 text-sky-foreground">
                                            <Boxes className="w-6 h-6" />
                                        </span>
                                        Inside the <span className="text-primary italic">Floor</span>
                                    </h2>
                                    <span className="text-[10px] font-black text-muted-foreground tracking-[0.2em]">{supplier.gallery.length} ASSETS VIEWABLE</span>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    {supplier.gallery.map((img, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ scale: 1.04, rotate: idx % 2 === 0 ? 1 : -1 }}
                                            className={`aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-border/50 shadow-soft cursor-pointer relative group ${idx === 0 ? 'md:col-span-2 md:aspect-[16/9]' : ''}`}
                                        >
                                            <SafeImage
                                                src={img}
                                                alt={`Production ${idx + 1}`}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Sticky Action Center - The Floating Hub */}
                        <aside className="lg:col-span-4 lg:sticky lg:top-36 h-fit pt-12 lg:pt-0">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-[hsl(var(--glass))] backdrop-blur-3xl border border-[hsl(var(--glass-border))] p-10 rounded-[4rem] shadow-float space-y-12 relative overflow-hidden group/hub"
                            >
                                {/* Decorative Gradient */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] -z-10 group-hover/hub:scale-150 transition-transform duration-1000" />

                                <div className="space-y-10">
                                    <div className="flex items-center justify-between px-2">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black text-primary tracking-[0.2em] uppercase">PEOPLE SCORE</span>
                                            <div className="flex items-center gap-3">
                                                <div className="flex text-primary">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`w-5 h-5 ${i < Math.floor(supplier.rating) ? 'fill-primary' : 'opacity-20'}`} />
                                                    ))}
                                                </div>
                                                <span className="font-black text-2xl tracking-tighter">{supplier.rating}</span>
                                            </div>
                                        </div>
                                        <div className="text-right space-y-1">
                                            <span className="text-[10px] font-black text-muted-foreground tracking-[0.2em] uppercase">VERIFIED</span>
                                            <div className="font-black text-xl tracking-tighter">{supplier.reviewCount}+</div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <Button size="xl" className="w-full rounded-[2rem] shadow-glow h-24 text-2xl font-black gap-4 group/btn bg-gradient-to-r from-primary to-primary/80 border-none transition-all hover:scale-[1.02] active:scale-[0.98]">
                                            <MessageSquare className="w-7 h-7 group-hover/btn:rotate-12 transition-transform" />
                                            Direct Chat
                                        </Button>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Button variant="outline" size="xl" className="w-full rounded-2xl h-16 font-black gap-2 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all">
                                                <Heart className="w-5 h-5" />
                                                Like
                                            </Button>
                                            <Button variant="outline" size="xl" className="w-full rounded-2xl h-16 font-black gap-2 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200 transition-all">
                                                <Zap className="w-5 h-5" />
                                                Quote
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8 pt-10 border-t border-border/20">
                                    <div className="flex items-center gap-5 group/item">
                                        <div className="w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center group-hover/item:bg-primary group-hover/item:text-white transition-all duration-300 shadow-soft">
                                            <Globe className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-[10px] font-black text-muted-foreground tracking-[0.15em] mb-1">CONNECT ONLINE</div>
                                            <a href={supplier.website} target="_blank" className="font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1.5 truncate">
                                                <span className="truncate">{supplier.website.replace('https://', '')}</span>
                                                <ExternalLink className="w-3 h-3 shrink-0" />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-5 group/item">
                                        <div className="w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center group-hover/item:bg-primary group-hover/item:text-white transition-all duration-300 shadow-soft">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-[10px] font-black text-muted-foreground tracking-[0.15em] mb-1">SECURE MESSAGE</div>
                                            <a href={`mailto:${supplier.email}`} className="font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1.5 truncate">
                                                <span className="truncate">{supplier.email}</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-transparent border border-primary/10 relative group/trust"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                            <ShieldCheck className="w-4 h-4 text-primary" />
                                        </div>
                                        <span className="font-black text-xs tracking-tight">Kumo Secure Shield™</span>
                                    </div>
                                    <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
                                        This facility has passed our <span className="text-foreground font-black">14-point audit</span> including financial stability and ethics check.
                                    </p>
                                    <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-primary/5 blur-2xl group-hover/trust:bg-primary/20 transition-all duration-700" />
                                </motion.div>
                            </motion.div>
                        </aside>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

export async function generateStaticParams() {
    return suppliers.map(s => ({ id: s.id }));
}
