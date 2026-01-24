import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight, Star, MapPin, ShieldCheck, Factory, Award, Globe, Mail, Heart, MessageSquare, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { suppliers, Supplier } from "@/data/suppliers";
import { SafeImage } from "@/components/ui/safe-image";

export async function generateStaticParams() {
    return suppliers.map(s => ({ id: s.id }));
}

export default async function SupplierDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supplier = suppliers.find(s => s.id === id) || suppliers[0];

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <section className="pt-32 pb-24 px-4 md:px-8">
                <div className="container mx-auto max-w-6xl">
                    <Link href="/supplier" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Suppliers
                    </Link>

                    {/* Factory Cover Image */}
                    <div className="relative w-full h-[300px] md:h-[450px] rounded-[2.5rem] overflow-hidden shadow-float border border-border/50 mb-12">
                        <SafeImage
                            src={supplier.image}
                            alt={supplier.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Logo Overlay */}
                        <div className="absolute -bottom-6 left-10 w-32 h-32 rounded-3xl bg-white p-4 shadow-float border border-border/50 hidden md:block">
                            <SafeImage
                                src={supplier.logo}
                                alt={`${supplier.name} Logo`}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Basic Info & Actions */}
                    <div className="grid lg:grid-cols-3 gap-12 items-start mb-20">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                <div className="pt-4">
                                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{supplier.name}</h1>
                                    <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <div className="flex text-primary">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(supplier.rating) ? 'fill-primary' : ''}`} />
                                                ))}
                                            </div>
                                            <span className="font-bold text-foreground">({supplier.reviewCount} reviews)</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {supplier.location}, Thailand
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-xl text-muted-foreground italic leading-relaxed">
                                "{supplier.tagline}"
                            </p>

                            <div className="prose prose-lg dark:prose-invert">
                                <p>{supplier.description}</p>
                            </div>
                        </div>

                        {/* Sidebar Actions & Contacts */}
                        <div className="space-y-6 lg:sticky lg:top-32">
                            <div className="p-8 rounded-[2rem] bg-card border border-border/50 shadow-soft space-y-4">
                                <Button size="xl" className="w-full rounded-2xl shadow-glow gap-2">
                                    <MessageSquare className="w-5 h-5" />
                                    Chat Now
                                </Button>
                                <Button variant="outline" size="xl" className="w-full rounded-2xl gap-2">
                                    <Heart className="w-5 h-5 text-red-500" />
                                    Save to Favorites
                                </Button>

                                <hr className="border-border/50 my-6" />

                                <div className="space-y-4 text-sm font-medium">
                                    <div className="space-y-1">
                                        <span className="text-muted-foreground text-xs uppercase tracking-widest">Website</span>
                                        <a href={supplier.website} target="_blank" className="flex items-center gap-2 text-primary hover:underline">
                                            <Globe className="w-4 h-4" />
                                            {supplier.website.replace('https://', '')}
                                        </a>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-muted-foreground text-xs uppercase tracking-widest">Email</span>
                                        <a href={`mailto:${supplier.email}`} className="flex items-center gap-2 text-primary hover:underline">
                                            <Mail className="w-4 h-4" />
                                            {supplier.email}
                                        </a>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-muted-foreground text-xs uppercase tracking-widest">Location</span>
                                        <div className="text-foreground">
                                            {supplier.address}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 rounded-2xl bg-muted/30 border border-border/50">
                                    <div className="text-primary font-bold text-2xl mb-1">{supplier.stats.experience}</div>
                                    <div className="text-xs text-muted-foreground uppercase font-bold">Experience</div>
                                </div>
                                <div className="p-6 rounded-2xl bg-muted/30 border border-border/50">
                                    <div className="text-primary font-bold text-2xl mb-1">{supplier.stats.capacity}</div>
                                    <div className="text-xs text-muted-foreground uppercase font-bold">Capacity</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="mb-24 space-y-12">
                        <h2 className="text-3xl font-bold flex items-center gap-3">
                            <ShieldCheck className="w-10 h-10 text-primary" />
                            Core Capabilities & Features
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {supplier.features.map((feature, idx) => (
                                <div key={idx} className="p-8 rounded-[2rem] bg-card border border-border/50 shadow-soft flex flex-col items-center text-center space-y-4">
                                    <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center p-3">
                                        <SafeImage src={feature.icon} alt={feature.title} className="w-full h-full object-contain" />
                                    </div>
                                    <h3 className="text-xl font-bold">{feature.title}</h3>
                                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Gallery Section */}
                    <div className="space-y-12">
                        <h2 className="text-3xl font-bold flex items-center gap-3">
                            <ArrowRight className="w-8 h-8 text-primary" />
                            Production Gallery
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {supplier.gallery.map((img, idx) => (
                                <div key={idx} className="aspect-square rounded-[2rem] overflow-hidden border border-border/50 shadow-soft group cursor-pointer">
                                    <SafeImage
                                        src={img}
                                        alt={`Gallery ${idx + 1}`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
