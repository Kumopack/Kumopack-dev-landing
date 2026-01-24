"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { blogs, Blog } from '@/data/blogs';
import { SafeImage } from '@/components/ui/safe-image';

const BlogSection = () => {
    return (
        <section id="blogs" className="px-4 md:px-8 py-16 md:py-24">
            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                            Latest <span className="text-primary">Packaging</span> Insights
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Stay updated with the latest trends, materials, and tips in the world of custom packaging.
                        </p>
                    </div>
                    <Link href="/blogs">
                        <Button variant="outline" className="rounded-2xl group">
                            View All Articles
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.slice(0, 3).map((blog: Blog, index: number) => (
                        <motion.article
                            key={blog.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group flex flex-col bg-card border border-border/50 rounded-3xl overflow-hidden hover:shadow-float transition-all duration-300"
                        >
                            <Link href={`/blogs/${blog.slug}`} className="flex flex-col h-full">
                                <div className="relative aspect-square overflow-hidden">
                                    <SafeImage
                                        src={blog.image}
                                        alt={blog.title}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <div className="px-3 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-[10px] font-bold text-primary shadow-soft">
                                            {blog.category.toUpperCase()}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground mb-3">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-3 h-3 text-primary" />
                                            {blog.date}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Eye className="w-3 h-3 text-primary" />
                                            {blog.views}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                        {blog.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
                                        {blog.description}
                                    </p>
                                    <div className="mt-auto">
                                        <div className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Read More
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
