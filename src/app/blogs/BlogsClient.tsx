"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  LayoutGrid,
  List,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { SafeImage } from "@/components/ui/safe-image";
import { blogApi, Article, Category } from "@/lib/blog-api";
import { useLanguage } from "@/context/LanguageContext";
import { getSafeSlug } from "@/lib/slug-utils";
import BlogCard from "@/components/BlogCard";

interface BlogsClientProps {
  initialArticles: Article[];
  initialTotalItems: number;
  initialCategories: Category[];
}

export default function BlogsClient({
  initialArticles,
  initialTotalItems,
  initialCategories,
}: BlogsClientProps) {
  const { language, setLanguage } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isTh = language === "th";

  const [search, setSearch] = useState("");
  const [articles, setArticles] = useState<Article[]>(initialArticles || []);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(initialTotalItems);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const selectedCategory = searchParams?.get("category") || "All";
  const limit = 6;

  useEffect(() => {
    setArticles(initialArticles || []);
    setTotalItems(initialTotalItems);
    setCategories(initialCategories);
    setCurrentPage(1);
    console.log("BlogsClient: Props updated", {
      initialArticlesCount: initialArticles?.length,
    });
  }, [initialArticles, initialTotalItems, initialCategories]);

  useEffect(() => {
    console.log("BlogsClient: Mount - Forcing router.refresh()");
    router.refresh();
  }, [router]);

  useEffect(() => {
    if (currentPage === 1) return;

    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await blogApi.getArticles(
          currentPage,
          limit,
          selectedCategory || "All",
        );
        setArticles(response.data || []);
        setTotalItems(response.totalItems);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage, selectedCategory, limit]);

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
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (params.get("lang") !== language) {
      params.set("lang", language);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [language, pathname, router]);

  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (slug === "All") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    setCurrentPage(1);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filteredArticles = (articles || []).filter((article) => {
    const name = isTh ? article.nameTh : article.nameEn || article.nameTh;
    const desc = isTh
      ? article.shortDescriptionTh
      : article.shortDescriptionEn || article.shortDescriptionTh;

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      desc.toLowerCase().includes(search.toLowerCase())
    );
  });

  const totalPages = Math.ceil(totalItems / limit);

  return (
    <main className="min-h-screen bg-kumopack-base-white selection:bg-primary/20 selection:text-primary">
      <Navbar />

      <PageHeader
        badgeTh="บรรจุภัณฑ์และนวัตกรรม"
        badgeEn="Packaging & Innovation"
        titleTh="บทความจาก KUMOPACK"
        titleEn="Stories from KUMOPACK"
        descriptionTh="เจาะลึกทุกเรื่องราวของบรรจุภัณฑ์ เทรนด์โลก และเทคโนโลยีที่คุณไม่ควรพลาด"
        descriptionEn="Deep dive into packaging stories, global trends, and technologies you shouldn't miss."
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
        <div className="max-w-[1140px] mx-auto px-0 overflow-x-auto no-scrollbar">
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
              <div className="flex justify-between items-center mb-8">
                <p className="text-sm font-bold text-muted-foreground/60 uppercase tracking-widest">
                  Showing {filteredArticles.length} Stories
                </p>
                <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === "grid"
                        ? "bg-white text-primary shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === "list"
                        ? "bg-white text-primary shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div
                className={`grid gap-6 md:gap-8 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1 md:grid-cols-2"
                }`}
              >
                <AnimatePresence mode="popLayout">
                  {filteredArticles.map((article, index) => (
                    <BlogCard
                      key={article.id}
                      blog={article}
                      index={index}
                      layout={viewMode}
                    />
                  ))}
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
