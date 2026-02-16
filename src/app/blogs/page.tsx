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
import PageHeader from "@/components/PageHeader";
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
  const limit = 6;

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
      article.categories.some((cat) => cat.slug === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(totalItems / limit);

  return (
    <main className="min-h-screen bg-kumopack-base-white selection:bg-primary/20 selection:text-primary">
      <Navbar />

      <PageHeader
        badgeTh="บทความและสาระน่ารู้"
        badgeEn="The Knowledge Hub"
        titleTh="บทความจาก KUMOPACK"
        titleEn="Articles from KUMO"
        descriptionTh="ก้าวข้ามขีดจำกัดของบรรจุภัณฑ์เดิมๆ ด้วยนวัตกรรมและเทรนด์ใหม่ที่นี่"
        descriptionEn="Elevating packaging standards through innovation, research, and expert storytelling."
        className="pb-2 md:pb-4"
      />

      <section className="px-2 pb-6 md:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-xl mx-auto relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-mint/10 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/30 w-5 h-3 group-focus-within:text-primary transition-all duration-300" />
            <input
              type="text"
              placeholder={
                isTh ? "ค้นหาบทความที่คุณสนใจ..." : "Search for stories..."
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/60 backdrop-blur-3xl border border-white/40 rounded-xl md:rounded-2xl pl-16 pr-8 md:px-16 py-4 md:py-6 font-bold text-sm md:text-base focus:ring-4 focus:ring-primary/5 focus:bg-white outline-none transition-all shadow-soft placeholder:text-muted-foreground/20"
            />
          </div>
        </motion.div>
      </section>

      <section className="sticky top-20 md:top-24 z-30 bg-kumopack-base-white/90 backdrop-blur-md border-y border-neutral-100">
        <div className="max-w-[1140px] mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-center py-4 md:py-5 gap-1 md:gap-2 min-w-max">
            {[
              {
                id: "all",
                slug: "All",
                nameTh: "ทั้งหมด",
                nameEn: "All Articles",
              },
              ...categories,
            ].map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`relative px-5 md:px-7 py-2.5 md:py-3 text-[11px] md:text-xs font-black uppercase tracking-[0.2em] transition-colors duration-300 whitespace-nowrap ${
                    isSelected
                      ? "text-white"
                      : "text-muted-foreground/40 hover:text-primary"
                  }`}
                >
                  <span className="relative z-10">
                    {isTh ? cat.nameTh : cat.nameEn || cat.nameTh}
                  </span>
                  {isSelected && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-primary shadow-glow-sm z-0 rounded-lg md:rounded-xl"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 px-4 md:px-10 lg:px-20">
        <div className="max-w-[1440px] mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 md:py-60 gap-8">
              <Loader2 className="w-16 h-16 text-primary animate-spin opacity-20" />
              <p className="text-muted-foreground font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">
                Gathering Insights...
              </p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-8 lg:gap-16">
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
                          className="flex flex-col h-full gap-6 md:gap-8"
                        >
                          <div className="relative aspect-square rounded-none overflow-hidden border border-neutral-100 bg-neutral-50 shadow-sm transition-all duration-700 md:group-hover:shadow-[0_40px_80px_-20px_rgba(177,95,206,0.15)] md:group-hover:-translate-y-4">
                            <SafeImage
                              src={blogApi.getAssetPath(
                                article.featurePicturePath,
                              )}
                              alt={name}
                              fill={true}
                              className="object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out shadow-inner"
                            />

                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <div className="absolute top-6 left-6 md:top-8 md:left-8 flex flex-wrap gap-2">
                              {article.categories.slice(0, 1).map((cat) => (
                                <span
                                  key={cat.id}
                                  className="px-4 py-1.5 md:px-5 md:py-2 rounded-none bg-white/95 backdrop-blur-md text-xs font-black text-primary shadow-xl border border-primary/5 uppercase tracking-widest"
                                >
                                  {isTh ? cat.nameTh : cat.nameEn || cat.nameTh}
                                </span>
                              ))}
                            </div>

                            <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-none text-xs font-black tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                              <Eye className="w-3.5 h-3.5 text-primary" />
                              {article.totalView.toLocaleString()}
                            </div>
                          </div>

                          <div className="px-2 md:px-4 space-y-3 md:space-y-4">
                            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-muted-foreground/40">
                              <Calendar className="w-4 h-4 text-primary/30" />
                              {new Date(
                                article.publishedDate,
                              ).toLocaleDateString(isTh ? "th-TH" : "en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </div>
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-foreground group-hover:text-primary transition-colors duration-500 leading-tight line-clamp-2">
                              {name}
                            </h2>
                            <p className="text-muted-foreground/60 text-sm md:text-base font-medium line-clamp-3 leading-relaxed">
                              {desc}
                            </p>
                            <div className="pt-4 md:pt-6 border-t border-neutral-100 group-hover:border-primary/20 transition-colors duration-500">
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

              {!loading && filteredArticles.length === 0 && (
                <div className="text-center py-40 md:py-60 border-2 border-dashed border-neutral-200 rounded-[2rem] md:rounded-[5rem] bg-neutral-50/50">
                  <Search className="w-16 md:w-20 h-16 md:h-20 text-muted-foreground/10 mx-auto mb-8" />
                  <h3 className="text-xl md:text-2xl font-black text-muted-foreground/50 uppercase tracking-[0.2em] mb-4 scale-90 md:scale-100">
                    {isTh ? "ไม่พบเรื่องที่คุณตามหา" : "No Stories Found"}
                  </h3>
                  <p className="text-muted-foreground/30 font-bold italic text-sm px-4">
                    {isTh
                      ? "ลองค้นหาด้วยคำสำคัญอื่นๆ หรือเปลี่ยนหมวดหมู่"
                      : "Try looking for different keywords or categories."}
                  </p>
                </div>
              )}

              {totalPages > 1 && (
                <div className="mt-20 md:mt-40 flex justify-center items-center gap-4 md:gap-8">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 md:w-14 md:h-14 rounded-none border border-neutral-200 flex items-center justify-center hover:bg-white hover:border-primary hover:text-primary disabled:opacity-30 transition-all shadow-sm"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                  <div className="text-[10px] md:text-[12px] font-black text-muted-foreground uppercase tracking-[0.4em]">
                    <span className="hidden sm:inline">Page </span>
                    <span className="text-primary italic">
                      {currentPage}
                    </span>{" "}
                    of {totalPages}
                  </div>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 md:w-14 md:h-14 rounded-none border border-neutral-200 flex items-center justify-center hover:bg-white hover:border-primary hover:text-primary disabled:opacity-30 transition-all shadow-sm"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </div>
              )}
            </>
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
