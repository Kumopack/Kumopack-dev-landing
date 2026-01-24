"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, List, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Blog } from "@/data/blogs";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/ui/safe-image";

export default function BlogContent({ blog }: { blog: Blog }) {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const sections = [
        { id: "intro", title: "Introduction" },
        { id: "trends", title: "Innovative Packaging Trends" },
        { id: "sustainability", title: "Eco-Friendly Future" },
        { id: "conclusion", title: "Conclusion" }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const sectionElements = sections.map(s => document.getElementById(s.id));
            const currentScroll = window.scrollY + 150;

            for (let i = sectionElements.length - 1; i >= 0; i--) {
                const el = sectionElements[i];
                if (el && el.offsetTop <= currentScroll) {
                    setActiveSection(sections[i].id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            window.scrollTo({
                top: el.offsetTop - 120,
                behavior: "smooth"
            });
        }
    };

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            {/* Blog Article */}
            <article className="pt-32 pb-24 px-4 md:px-8">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Sidebar Navigation */}
                        <aside className="lg:w-64 shrink-0 hidden lg:block">
                            <div className="sticky top-32 space-y-8">
                                <Link href="/blogs" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    Back to Articles
                                </Link>

                                <div className="space-y-4">
                                    <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                        <List className="w-3 h-3" />
                                        Table of Contents
                                    </h4>
                                    <nav className="space-y-2">
                                        {sections.map((s) => (
                                            <button
                                                key={s.id}
                                                onClick={() => scrollTo(s.id)}
                                                className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-all flex items-center justify-between group ${activeSection === s.id ? "bg-primary/10 text-primary font-bold border-l-2 border-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                                            >
                                                {s.title}
                                                <ChevronRight className={`w-3 h-3 transition-transform ${activeSection === s.id ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"}`} />
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <div className="flex-1 max-w-4xl">
                            <Link href="/blogs" className="lg:hidden flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Articles
                            </Link>

                            <div className="mb-12">
                                <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-8 leading-tight tracking-tight">
                                    {blog.title}
                                </h1>

                                <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-y border-border/50 py-6">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {blog.date}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        5 min read
                                    </div>
                                    <button className="flex items-center gap-2 hover:text-primary transition-colors ml-auto">
                                        <Share2 className="w-4 h-4" />
                                        Share
                                    </button>
                                </div>
                            </div>

                            <div className="aspect-[21/9] rounded-[2.5rem] overflow-hidden mb-16 shadow-float border border-border/50">
                                <SafeImage
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-full"
                                />
                            </div>

                            <div className="prose prose-lg prose-purple max-w-none dark:prose-invert text-muted-foreground leading-relaxed">
                                <div id="intro" className="mb-12">
                                    <p className="text-2xl font-medium text-foreground mb-8">
                                        {blog.description}
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                </div>

                                <div id="trends" className="mb-12 pt-8">
                                    <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-3">
                                        <span className="w-2 h-8 bg-primary rounded-full" />
                                        Innovative Packaging Trends
                                    </h2>
                                    <p>
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>
                                    <p>
                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                    </p>
                                </div>

                                <div id="sustainability" className="mb-12 pt-8">
                                    <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-3">
                                        <span className="w-2 h-8 bg-mint rounded-full" />
                                        Eco-Friendly Future
                                    </h2>
                                    <p>
                                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.
                                    </p>
                                </div>

                                <div id="conclusion" className="mb-12 pt-8">
                                    <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-3">
                                        <span className="w-2 h-8 bg-coral rounded-full" />
                                        Conclusion
                                    </h2>
                                    <p>
                                        Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-muted/30 p-12 rounded-[3rem] border border-border/50 mt-24">
                                <h3 className="text-2xl font-bold mb-4">Subscribe to our newsletter</h3>
                                <p className="text-muted-foreground mb-8">Get the latest trends and materials innovation delivered to your inbox.</p>
                                <div className="flex gap-4">
                                    <input type="email" placeholder="you@company.com" className="flex-1 bg-background border border-border/50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 outline-none" />
                                    <Button variant="hero">Subscribe</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
