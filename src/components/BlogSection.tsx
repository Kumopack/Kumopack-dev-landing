"use client";

import Link from "@/components/common/LocalizedLink";
import { MoveRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Article } from "@/lib/blog-api";
import BlogCard from "@/components/BlogCard";

interface BlogSectionProps {
  articles: Article[];
}

const BlogSection = ({ articles = [] }: BlogSectionProps) => {
  const { t } = useLanguage();
  return (
    <section id="blogs" className="px-4 md:px-8 py-16 md:py-24 scroll-mt-24">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("blog.title")}{" "}
              <span className="text-primary">{t("blog.highlight")}</span>
              {t("blog.titleEnd")}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              {t("blog.subtitle")}
            </p>
          </div>
          <Link href="/blogs">
            <Button variant="outline" className="rounded-2xl group">
              {t("blog.cta")}
              <MoveRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
