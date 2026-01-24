"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, Search, Eye, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogs, Blog } from "@/data/blogs";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/ui/safe-image";

export default function BlogsPage() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", ...Array.from(new Set(blogs.map(b => b.category)))];

    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(search.toLowerCase()) ||
            blog.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4 md:px-8">
                <div className="container mx-auto max-w-6xl">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                        <div className="max-w-2xl">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                Our <span className="text-primary">Packaging</span> Blog
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                Discover industry secrets, sustainability tips, and innovative packaging solutions.
                            </p>
                        </div>
                        <div className="w-full md:w-80 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white border border-border/50 rounded-2xl px-12 py-4 shadow-soft focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                        </div>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2 mb-12">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${selectedCategory === cat ? "bg-primary text-primary-foreground shadow-glow" : "bg-muted/50 text-muted-foreground hover:bg-muted"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blogs Grid */}
            <section className="pb-24 px-4 md:px-8">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <AnimatePresence mode="popLayout">
                            {filteredBlogs.map((blog: Blog, index: number) => (
                                <motion.article
                                    key={blog.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-float transition-all duration-300"
                                >
                                    <Link href={`/blogs/${blog.slug}`} className="flex flex-col h-full">
                                        <div className="relative aspect-square overflow-hidden">
                                            <SafeImage
                                                src={blog.image}
                                                alt={blog.title}
                                                className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-[10px] font-bold text-primary shadow-soft">
                                                    {blog.category.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-8 flex flex-col flex-1">
                                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-3 h-3" />
                                                    {blog.date}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Eye className="w-3 h-3" />
                                                    {blog.views.toLocaleString()} views
                                                </div>
                                            </div>
                                            <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                                                {blog.title}
                                            </h2>
                                            <p className="text-muted-foreground text-sm line-clamp-3 mb-8 flex-1">
                                                {blog.description}
                                            </p>
                                            <div className="pt-4 border-t border-border/50">
                                                <span className="text-primary font-bold inline-flex items-center gap-2 group-hover:gap-3 transition-all text-sm">
                                                    Read Full Article
                                                    <ArrowLeft className="w-4 h-4 rotate-180" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.article>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredBlogs.length === 0 && (
                        <div className="text-center py-40 bg-muted/20 rounded-[3rem] border border-dashed border-border">
                            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
                            <div className="text-xl font-bold text-muted-foreground">No matching articles found</div>
                            <p className="text-muted-foreground mt-2">Try searching with different keywords</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
