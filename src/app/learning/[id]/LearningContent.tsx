"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, Clock, Share2, Play, Sparkles } from "lucide-react";
// Note: actual imports might differ, I'll copy from the original file
import { learningArticles, LearningArticle } from "@/data/learning";
import { SafeImage } from "@/components/ui/safe-image";
import Link from "next/link";
import { ArrowLeft as ArrowLeftIcon, Calendar as CalendarIcon, Clock as ClockIcon, Share2 as Share2Icon, Play as PlayIcon } from "lucide-react";

export default function LearningContent({ article }: { article: LearningArticle }) {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <article className="pt-32 pb-24 px-4 md:px-8">
                <div className="container mx-auto max-w-4xl">
                    <Link
                        href="/learning"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12 group"
                    >
                        <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Learning Center
                    </Link>

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                                    {article.category}
                                </span>
                                <span className="text-muted-foreground text-sm">•</span>
                                <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-bold uppercase tracking-wider">
                                    For {article.audience}s
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-foreground">
                                {article.title}
                            </h1>
                            <div className="flex items-center gap-6 text-sm text-muted-foreground pt-4 border-b border-border/50 pb-8">
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className="w-4 h-4" />
                                    {article.date}
                                </div>
                                <div className="flex items-center gap-2">
                                    <ClockIcon className="w-4 h-4" />
                                    10 min read
                                </div>
                                <button className="flex items-center gap-2 ml-auto hover:text-primary transition-colors">
                                    <Share2Icon className="w-4 h-4" />
                                    Share
                                </button>
                            </div>
                        </div>

                        {/* Video / Image Header */}
                        <div className="aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-float border border-border/50 bg-black relative group">
                            {article.videoUrl && isPlaying ? (
                                <iframe
                                    src={`${article.videoUrl}?autoplay=1`}
                                    className="w-full h-full"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                />
                            ) : (
                                <>
                                    <SafeImage
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full"
                                    />
                                    {article.videoUrl && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                                            <button
                                                onClick={() => setIsPlaying(true)}
                                                className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-glow transform transition-transform group-hover:scale-110"
                                            >
                                                <PlayIcon className="w-8 h-8 fill-current" />
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-8 pt-8">
                            <p className="text-xl md:text-2xl text-foreground font-semibold leading-relaxed">
                                {article.description}
                            </p>

                            <div className="grid md:grid-cols-2 gap-12 mt-12">
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-black text-foreground tracking-tight">
                                        Understanding <span className="text-primary italic">Context</span>
                                    </h2>
                                    <p>
                                        In the rapidly evolving landscape of sustainable packaging, staying ahead of the curve is no longer optional—it's a requirement for survival. This guide dives deep into the methodologies that top brands use to bridge the gap between design vision and factory-ready specifications.
                                    </p>
                                    <p>
                                        Whether you are a startup looking to make your first batch or a seasoned enterprise scaling production, high-fidelity 3D mockups are the lynchpin of error-free manufacturing.
                                    </p>
                                </div>
                                <div className="bg-muted/30 p-8 rounded-[2rem] border border-border/50">
                                    <h3 className="text-xl font-bold text-foreground mb-6">Key Takeaways</h3>
                                    <ul className="space-y-4">
                                        {[
                                            "Master the primary requirements for sustainable production.",
                                            "Techniques for negotiating with global factory partners.",
                                            "The role of 3D mockups in reducing prototyping costs.",
                                            "Optimizing supply chain logic for just-in-time delivery."
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-4 items-start">
                                                <div className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-1">
                                                    <span className="text-xs font-bold">{i + 1}</span>
                                                </div>
                                                <span className="text-foreground/80 font-medium">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-primary/5 p-12 rounded-[3rem] border border-primary/20 mt-16 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                                    <Sparkles className="w-24 h-24" />
                                </div>
                                <div className="relative z-10 max-w-2xl">
                                    <h3 className="text-2xl md:text-3xl font-black text-primary mb-4 tracking-tight">Elevate Your Knowledge</h3>
                                    <p className="text-lg mb-8 text-foreground/70">Our dedicated success managers are available for 1-on-1 strategy sessions for Premium and Pro members to help you optimize your packaging strategy.</p>
                                    <Link href="/pricing">
                                        <button className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:shadow-glow hover:scale-105 transition-all text-lg">
                                            Explore Membership Plans
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="pt-16 border-t border-border/50 flex flex-wrap gap-2">
                            {["Packaging", "Sustainability", "Sourcing", "Brand Identity"].map((tag) => (
                                <span key={tag} className="px-4 py-2 rounded-xl bg-muted/50 text-muted-foreground text-sm font-medium hover:bg-muted transition-colors cursor-pointer">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
