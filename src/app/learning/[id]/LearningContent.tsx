"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, Clock, Share2, Play } from "lucide-react";
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

                        <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6 pt-8">
                            <p className="text-xl text-foreground font-medium">
                                {article.description}
                            </p>
                            <p>
                                Lorem ipsum dolor sit available, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <h2 className="text-2xl font-bold text-foreground">Key Takeaways</h2>
                            <ul className="list-disc pl-6 space-y-3 font-semibold text-foreground/80">
                                <li>Understand the primary requirements for sustainable production.</li>
                                <li>How to negotiate with factory partners effectively.</li>
                                <li>The importance of high-fidelity 3D mockups.</li>
                            </ul>
                            <p>
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            <div className="bg-primary/5 p-8 rounded-[2rem] border border-primary/20 mt-12">
                                <h3 className="text-xl font-bold text-primary mb-4">Want to learn more?</h3>
                                <p className="text-sm mb-6">Our dedicated success managers are available for 1-on-1 strategy sessions for Premium and Pro members.</p>
                                <Link href="/pricing">
                                    <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:shadow-glow transition-all">
                                        View Pricing Plans
                                    </button>
                                </Link>
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
