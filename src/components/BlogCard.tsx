"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Eye, ArrowRight, User } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import { getSafeSlug } from "@/lib/slug-utils";
import { blogApi, Article } from "@/lib/blog-api";

interface BlogCardProps {
  blog: Article;
  index?: number;
  layout?: "grid" | "list";
}

const BlogCard = ({ blog, index = 0, layout = "grid" }: BlogCardProps) => {
  const isList = layout === "list";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`group flex h-full bg-white border border-neutral-200/60 hover:border-primary/20 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden ${
        isList ? "flex-col md:flex-row" : "flex-col"
      }`}
    >
      <Link
        href={`/blogs/${getSafeSlug(blog.slug)}`}
        className={`flex h-full ${
          isList ? "flex-row items-stretch" : "flex-col"
        }`}
      >
        {/* Image Container */}
        <div
          className={`relative overflow-hidden bg-neutral-100 shrink-0 ${
            isList ? "w-[250px] aspect-square" : "w-full aspect-[16/16]"
          }`}
        >
          <SafeImage
            src={blogApi.getAssetPath(blog.featurePicturePath)}
            alt={blog.nameTh}
            fill
            priority={index < 2}
            className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
          />

          {/* View Count Badge */}
          <div
            className={`absolute flex items-center gap-1.5 px-2 py-1 bg-white/90 backdrop-blur-md rounded-md text-[9px] font-black tracking-wider text-primary shadow-sm border border-white/50 ${
              isList
                ? "top-2 left-2"
                : "top-4 right-4 px-3 py-1.5 rounded-full text-[10px]"
            }`}
          >
            <Eye className={isList ? "w-3 h-3" : "w-3.5 h-3.5"} />
            {blog.totalView.toLocaleString()}
          </div>
        </div>

        {/* Content Container */}
        <div
          className={`flex flex-col flex-1 min-w-0 ${isList ? "p-4 md:p-5" : "p-6 md:p-8"}`}
        >
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground/60 mb-3">
            <Calendar className="w-3.5 h-3.5 text-primary/40" />
            {new Date(blog.publishedDate).toLocaleDateString("th-TH", {
              year: "numeric",
              month: isList ? "short" : "long",
              day: "numeric",
            })}
          </div>

          <h3
            className={`font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-tight ${
              isList ? "text-base md:text-lg" : "text-xl md:text-2xl"
            }`}
          >
            {blog.nameTh}
          </h3>

          <p
            className={`text-muted-foreground/70 text-sm font-medium leading-relaxed mb-4 ${
              isList ? "text-xs" : ""
            }`}
          >
            {blog.shortDescriptionTh}
          </p>

          <div
            className={`mt-auto pt-4 border-t border-neutral-100 flex items-center justify-between ${
              isList ? "pt-3" : "pt-6"
            }`}
          >
            {/* Author */}
            <div className="flex items-center gap-3">
              <div
                className={`rounded-full bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0 flex items-center justify-center ${
                  isList ? "w-6 h-6" : "w-8 h-8"
                }`}
              >
                {blog.createdBy?.pictureProfilePath ? (
                  <SafeImage
                    src={blogApi.getAssetPath(
                      blog.createdBy.pictureProfilePath,
                    )}
                    alt={blog.createdBy.name}
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <User
                    className={`${isList ? "w-3 h-3" : "w-4 h-4"} text-muted-foreground`}
                  />
                )}
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-bold text-foreground ${
                    isList ? "text-[9px]" : "text-[10px]"
                  }`}
                >
                  {blog.createdBy?.name || blog.author || "KUMOPACK Team"}
                </span>
                <span className="text-[9px] font-medium text-muted-foreground hidden sm:inline-block">
                  Author
                </span>
              </div>
            </div>

            {/* Arrow Button */}
            <div
              className={`rounded-full bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 transform ${
                isList
                  ? "w-6 h-6 group-hover:translate-x-1"
                  : "w-8 h-8 group-hover:-rotate-45"
              }`}
            >
              <ArrowRight className={isList ? "w-3 h-3" : "w-4 h-4"} />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard;
