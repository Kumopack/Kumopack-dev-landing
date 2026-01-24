"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogs, Blog } from "@/data/blogs";
import { Button } from "@/components/ui/button";

export default function BlogsPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4 md:px-8 border-b border-border/50">
                <div className="container mx-auto max-w-6xl">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Our <span className="text-primary">Packaging</span> Blog
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Discover industry secrets, sustainability tips, and innovative packaging solutions to help your brand stand out.
                        </p>
                    </div>
                </div>
            </section>

            {/* Blogs Grid */}
            <section className="py-16 px-4 md:px-8">
                <div className="container mx-auto max-w-6xl">
                    {blogs.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((blog: Blog, index: number) => (
                                <motion.article
                                    key={blog.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group bg-card border border-border/50 rounded-3xl overflow-hidden hover:shadow-float transition-all duration-300"
                                >
                                    <Link href={`/blogs/${blog.slug}`} className="flex flex-col h-full">
                                        <div className="relative aspect-video overflow-hidden">
                                            <img
                                                src={blog.image}
                                                alt={blog.title}
                                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-8 flex flex-col flex-1">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                                                <Calendar className="w-3 h-3" />
                                                {blog.date}
                                            </div>
                                            <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                                                {blog.title}
                                            </h2>
                                            <p className="text-muted-foreground text-sm line-clamp-3 mb-8">
                                                {blog.description}
                                            </p>
                                            <div className="mt-auto">
                                                <span className="text-primary font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                                    Read Full Article
                                                    <ArrowLeft className="w-4 h-4 rotate-180" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-40">
                            <div className="text-xl text-muted-foreground">No articles found.</div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
