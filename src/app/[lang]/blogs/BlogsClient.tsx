"use client";

import { useState, useEffect } from "react";
import {
  useSearchParams,
  useLocalizedRouter as useRouter,
  usePathname,
} from "@/hooks/useLocalizedRouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Loader2,
  LayoutGrid,
  List,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { blogApi, Article, Category } from "@/lib/blog-api";
import { Dictionary } from "@/lib/dictionary";
import BlogCard from "@/components/BlogCard";
import { Pagination } from "@/components/ui/pagination";

interface BlogsClientProps {
  initialArticles: Article[];
  initialTotalItems: number;
  initialCategories: Category[];
  initialPage: number;
}

export default function BlogsClient({
  initialArticles,
  initialTotalItems,
  initialCategories,
  initialPage,
  lang,
  dict,
}: BlogsClientProps & { lang: string; dict: Dictionary }) {
  const language = lang;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isTh = language === "th";

  const [search, setSearch] = useState("");
  const [articles, setArticles] = useState<Article[]>(initialArticles || []);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalItems, setTotalItems] = useState(initialTotalItems);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const selectedCategory = searchParams?.get("category") || "All";
  const limit = 12;

  // Sync state when server-side props change (e.g. URL navigation)
  useEffect(() => {
    setArticles(initialArticles || []);
    setTotalItems(initialTotalItems);
    setCategories(initialCategories);
    setCurrentPage(initialPage);
  }, [initialArticles, initialTotalItems, initialCategories, initialPage]);

  // Fetch articles when category or page changes client-side
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await blogApi.getArticles(
          currentPage,
          limit,
          selectedCategory || "All",
        );
        setArticles(response.data || []);
        setTotalItems(response.pagination.total);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();

  }, [currentPage, selectedCategory]);




  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams();
    if (slug !== "All") {
      params.set("category", slug);
    }
    // Reset to page 1 on category change
    setCurrentPage(1);
    const qs = params.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Scroll to top of the article grid
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    <main className="min-h-screen bg-[#faf8fc] selection:bg-primary/20 selection:text-primary transition-colors duration-500 text-foreground">
      <Navbar lang={lang} dict={dict} />

      <section className="pt-28 pb-24 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100 min-h-[70vh] overflow-hidden flex flex-col pt-4">
          <PageHeader
            badgeTh="บรรจุภัณฑ์และนวัตกรรม"
            badgeEn="Packaging & Innovation"
            titleTh="บทความจาก KUMOPACK"
            titleEn="Stories from KUMOPACK"
            descriptionTh="เจาะลึกทุกเรื่องราวของบรรจุภัณฑ์ เทรนด์โลก และเทคโนโลยีที่คุณไม่ควรพลาด"
            descriptionEn="Deep dive into packaging stories, global trends, and technologies you shouldn't miss."
            className="pb-2 md:pb-4"
            lang={lang}
          />

      <section className="px-4 pb-6 md:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-xl mx-auto relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-mint/20 blur-2xl opacity-40 group-focus-within:opacity-100 transition-opacity duration-700" />
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/60 w-5 h-5 group-focus-within:text-primary transition-all duration-300" />
            <input
              type="text"
              placeholder={
                isTh ? "ค้นหาบทความที่คุณสนใจ..." : "Search for stories..."
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-primary/5 backdrop-blur-3xl border-2 border-primary/20 rounded-xl md:rounded-2xl pl-14 pr-8 md:pl-16 md:pr-8 py-4 md:py-5 font-bold text-sm md:text-base focus:ring-4 focus:ring-primary/10 focus:border-primary/40 focus:bg-white outline-none transition-all shadow-soft placeholder:text-muted-foreground/40"
            />
          </div>
        </motion.div>
      </section>

      <section className="sticky top-[72px] md:top-24 z-30 bg-kumopack-base-white/90 backdrop-blur-md border-y border-neutral-100">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="flex items-center justify-center flex-wrap py-4 md:py-5 gap-1 md:gap-2">
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
                  className={`cursor-pointer relative px-5 md:px-7 py-2.5 md:py-3 text-[11px] md:text-xs font-black uppercase tracking-[0.2em] transition-colors duration-300 whitespace-nowrap ${
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

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className="mt-10 md:mt-20 pb-10"
              />
            </>
          )}
        </div>
      </section>
        </div>
      </section>

      <Footer dict={dict} />
    </main>
  );
}
