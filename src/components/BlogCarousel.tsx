"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { blogs, Blog } from "@/data/blogs";
import Link from "@/components/common/LocalizedLink";
import { getSafeSlug } from "@/lib/slug-utils";

const BlogCarousel = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8 mb-12">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Popular Insights
            </h2>
            <p className="text-muted-foreground">
              Expert advice on packaging and branding
            </p>
          </div>
          <Link
            href="/blogs"
            className="text-brand-purple font-semibold flex items-center gap-2 hover:gap-3 transition-all"
          >
            View All <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-8 px-4 md:px-[max(1rem,calc((100vw-72rem)/2))] scrollbar-hide snap-x">
          {blogs.map((blog: Blog, index: number) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-80 md:w-96 snap-start"
            >
              <Link
                href={`/blogs/${getSafeSlug(blog.slug)}`}
                className="group block h-full"
              >
                <div className="bg-card border border-border/50 rounded-3xl overflow-hidden hover:shadow-float transition-all duration-300 h-full flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-brand-purple">
                        Packaging
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Calendar size={14} />
                      {blog.date}
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-brand-purple transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-6">
                      {blog.description}
                    </p>
                    <div className="mt-auto pt-4 border-t border-border/10 flex items-center gap-2 text-brand-purple font-semibold text-sm">
                      Read More <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogCarousel;
