"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Loader2,
  BookOpen,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/ui/safe-image";
import { blogApi, Article, Category } from "@/lib/blog-api";
import { useLanguage } from "@/context/LanguageContext";
import { getSafeSlug } from "@/lib/slug-utils";

function BlogsContent() {
  const { language, setLanguage } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isTh = language === "th";

  const [search, setSearch] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const selectedCategory = searchParams?.get("category") || "All";
  const limit = 12;

  useEffect(() => {
    const fetchCategories = async () => {
      const cats = await blogApi.getCategories();
      setCategories(cats);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await blogApi.getArticles(currentPage, limit);
        setArticles(response.data);
        setTotalItems(response.totalItems);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [currentPage]);

  // URL Sync for Language
  useEffect(() => {
    const urlLang = searchParams?.get("lang");
    if (
      urlLang &&
      (urlLang === "th" || urlLang === "en") &&
      urlLang !== language
    ) {
      setLanguage(urlLang as "th" | "en");
    }
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString());
    if (params.get("lang") !== language) {
      params.set("lang", language);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [language, pathname, router]);

  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (slug === "All") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filteredArticles = articles.filter((article) => {
    const name = isTh ? article.nameTh : article.nameEn || article.nameTh;
    const desc = isTh
      ? article.shortDescriptionTh
      : article.shortDescriptionEn || article.shortDescriptionTh;

    const matchesSearch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      desc.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      article.categories.some((c) => c.slug === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(totalItems / limit);

  return (
    <main className="min-h-screen bg-kumopack-base-white text-foreground overflow-x-hidden">
      <Navbar />

      {/* Header Section with Balanced Elite Aesthetics */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        {/* Mesh Gradient Background Elements */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-mint/10 rounded-full blur-[80px] translate-y-1/2 -z-10" />

        {/* Floating Abstract Elements */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[15%] w-16 h-16 bg-gradient-to-br from-primary/15 to-transparent border border-primary/10 rounded-2xl backdrop-blur-3xl -z-10 hidden lg:block"
        />
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 left-[20%] w-12 h-12 bg-gradient-to-tr from-mint/15 to-transparent border border-mint/10 rounded-xl backdrop-blur-2xl -z-10 hidden lg:block"
        />

        <div className="max-w-[1440px] mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/40 backdrop-blur-xl text-primary text-[9px] font-black border border-primary/20 shadow-soft"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              {isTh ? "บทความและสาระน่ารู้" : "The Knowledge Hub"}
            </motion.div>

            <div className="flex flex-col items-center text-center gap-4">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground">
                {isTh ? "บทความจาก" : "Articles from"}
                <span className="text-primary italic">
                  {isTh ? " KUMOPACK" : "KUMO"}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground/50 font-medium max-w-2xl leading-relaxed">
                {isTh
                  ? "ก้าวข้ามขีดจำกัดของบรรจุภัณฑ์เดิมๆ ด้วยนวัตกรรมและเทรนด์ใหม่ที่นี่"
                  : "Elevating packaging standards through innovation, research, and expert storytelling."}
              </p>
            </div>
          </motion.div>

          {/* Glassmorphic Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className="mt-12 max-w-xl mx-auto relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-mint/10 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/30 w-5 h-5 group-focus-within:text-primary transition-all duration-300" />
              <input
                type="text"
                placeholder={
                  isTh
                    ? "ลองค้นหาเรื่องที่น่าสนใจ..."
                    : "What are you curious about today?"
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/60 backdrop-blur-3xl border border-white/40 rounded-[2rem] px-16 py-6 font-bold text-base focus:ring-4 focus:ring-primary/5 focus:bg-white outline-none transition-all shadow-soft placeholder:text-muted-foreground/20"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 px-3 py-1.5 bg-neutral-100/50 rounded-lg text-[9px] font-black text-muted-foreground/30 border border-neutral-200/50">
                ⌘ K
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Centered Category Tabs - Compact Design */}
      <section className="sticky top-24 z-30 bg-kumopack-base-white/80 backdrop-blur-md border-y border-neutral-100">
        <div className="max-w-[1440px] mx-auto overflow-hidden">
          <div className="flex items-center justify-center py-2.5 px-4 overflow-x-auto no-scrollbar gap-2 scroll-smooth">
            <button
              onClick={() => handleCategoryChange("All")}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${selectedCategory === "All" ? "bg-primary text-white shadow-glow translate-y-[-1px]" : "hover:bg-neutral-100 text-muted-foreground"}`}
            >
              {isTh ? "ทั้งหมด" : "All Articles"}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${selectedCategory === cat.slug ? "bg-primary text-white shadow-glow translate-y-[-1px]" : "hover:bg-neutral-100 text-muted-foreground"}`}
              >
                {isTh ? cat.nameTh : cat.nameEn || cat.nameTh}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24 px-4 md:px-10 lg:px-20">
        <div className="max-w-[1440px] mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-60 gap-8">
              <Loader2 className="w-16 h-16 text-primary animate-spin opacity-20" />
              <p className="text-muted-foreground font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">
                Gathering Insights...
              </p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-16 lg:gap-24">
                <AnimatePresence mode="popLayout">
                  {filteredArticles.map((article, index) => {
                    const name = isTh
                      ? article.nameTh
                      : article.nameEn || article.nameTh;
                    const desc = isTh
                      ? article.shortDescriptionTh
                      : article.shortDescriptionEn ||
                        article.shortDescriptionTh;

                    return (
                      <motion.article
                        key={article.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                        className="group"
                      >
                        <Link
                          href={`/blogs/${getSafeSlug(article.slug)}`}
                          className="flex flex-col h-full gap-8"
                        >
                          {/* 1:1 Aspect Ratio Image */}
                          <div className="relative aspect-square rounded-[3.5rem] overflow-hidden border border-neutral-100 bg-neutral-50 shadow-sm transition-all duration-700 group-hover:shadow-[0_40px_80px_-20px_rgba(177,95,206,0.15)] group-hover:-translate-y-4">
                            <SafeImage
                              src={blogApi.getAssetPath(
                                article.featurePicturePath,
                              )}
                              alt={name}
                              fill={true}
                              className="object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out shadow-inner"
                            />
                            {/* Subtle Glare/Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <div className="absolute top-8 left-8 flex flex-wrap gap-2">
                              {article.categories.slice(0, 1).map((cat) => (
                                <span
                                  key={cat.id}
                                  className="px-5 py-2 rounded-2xl bg-white/95 backdrop-blur-md text-[10px] font-black text-primary shadow-xl border border-primary/5 uppercase tracking-widest"
                                >
                                  {isTh ? cat.nameTh : cat.nameEn || cat.nameTh}
                                </span>
                              ))}
                            </div>

                            {/* View Count Overlay */}
                            <div className="absolute bottom-8 right-8 flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-xl text-white text-[10px] font-black tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                              <Eye className="w-3.5 h-3.5 text-primary" />
                              {article.totalView.toLocaleString()}
                            </div>
                          </div>

                          <div className="px-4 space-y-4">
                            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">
                              <Calendar className="w-4 h-4 text-primary/30" />
                              {new Date(
                                article.publishedDate,
                              ).toLocaleDateString(isTh ? "th-TH" : "en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </div>
                            <h2 className="text-2xl lg:text-3xl font-black text-foreground group-hover:text-primary transition-colors duration-500 leading-tight line-clamp-2">
                              {name}
                            </h2>
                            <p className="text-muted-foreground/60 text-sm font-medium line-clamp-3 leading-relaxed">
                              {desc}
                            </p>
                            <div className="pt-6 border-t border-neutral-100 group-hover:border-primary/20 transition-colors duration-500">
                              <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-primary group-hover:gap-6 transition-all duration-500">
                                {isTh
                                  ? "อ่านรายละเอียดเพิ่มเติม"
                                  : "Learn More Story"}
                                <ArrowLeft className="w-4 h-4 rotate-180" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-40 flex justify-center items-center gap-8">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-14 h-14 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-white hover:border-primary hover:text-primary disabled:opacity-30 transition-all shadow-sm"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <div className="text-[12px] font-black text-muted-foreground uppercase tracking-[0.4em]">
                    Page{" "}
                    <span className="text-primary italic">{currentPage}</span>{" "}
                    of {totalPages}
                  </div>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="w-14 h-14 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-white hover:border-primary hover:text-primary disabled:opacity-30 transition-all shadow-sm"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              )}
            </>
          )}

          {!loading && filteredArticles.length === 0 && (
            <div className="text-center py-60 border-2 border-dashed border-neutral-200 rounded-[5rem] bg-neutral-50/50">
              <Search className="w-20 h-20 text-muted-foreground/10 mx-auto mb-8" />
              <h3 className="text-2xl font-black text-muted-foreground/50 uppercase tracking-[0.2em] mb-4">
                {isTh ? "ไม่พบเรื่องที่คุณตามหา" : "No Stories Found"}
              </h3>
              <p className="text-muted-foreground/30 font-bold italic">
                {isTh
                  ? "ลองค้นหาด้วยคำสำคัญอื่นๆ หรือเปลี่ยนหมวดหมู่"
                  : "Try looking for different keywords or categories."}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function BlogsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-kumopack-base-white">
          <Loader2 className="w-12 h-12 text-primary animate-spin opacity-20" />
        </div>
      }
    >
      <BlogsContent />
    </Suspense>
  );
}
