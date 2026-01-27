"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Search,
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  Calendar,
  Eye,
  Loader2,
  ArrowLeft,
  Clock,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SafeImage } from "@/components/ui/safe-image";
import { useLanguage } from "@/context/LanguageContext";
import { learningApi, LearningArticle, Category } from "@/lib/learning-api";
import { getSafeSlug } from "@/lib/slug-utils";

function LearningPageContent() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isTh = language === "th";

  // Read initial audience from URL or default to buyer
  const initialAudience =
    (searchParams.get("audience") as "buyer" | "supplier") || "buyer";
  const [currentAudience, setCurrentAudience] = useState<"buyer" | "supplier">(
    initialAudience,
  );

  const [search, setSearch] = useState("");
  const [selectedCategorySlug, setSelectedCategorySlug] = useState("all");
  const [articles, setArticles] = useState<LearningArticle[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 12;

  // Sync state with URL when it changes externally
  useEffect(() => {
    const aud = searchParams.get("audience") as "buyer" | "supplier";
    if (aud && aud !== currentAudience) {
      setCurrentAudience(aud);
    }
  }, [searchParams]);

  // Hero Segment Images (Based on targetAudience)
  const heroImageUrl =
    currentAudience === "supplier"
      ? "/asset/marketplace-premium.png"
      : "/asset/hero-bg-premium.jpg";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        console.log(
          `[LearningPage] Fetching data: audience=${currentAudience}, category=${selectedCategorySlug}, search=${search}`,
        );

        let articlesRes;
        if (search) {
          articlesRes = await learningApi.searchArticles({
            q: search,
            targetAudience: currentAudience,
            lang: language as "th" | "en",
            category:
              selectedCategorySlug === "all" ? undefined : selectedCategorySlug,
            page: currentPage,
            limit: limit,
          });
          // searchArticles returns LearningArticle[], wrap it to match response structure
          const data = Array.isArray(articlesRes) ? articlesRes : [];
          setArticles(data);
          setTotalPages(1);
        } else {
          articlesRes = await learningApi.getArticles({
            targetAudience: currentAudience,
            lang: language as "th" | "en",
            category:
              selectedCategorySlug === "all" ? undefined : selectedCategorySlug,
            page: currentPage,
            limit: limit,
          });
          setArticles(articlesRes.data);
          setTotalPages(articlesRes.pagination.totalPages);
        }

        // FALLBACK: Since /categories endpoint is 500ing, derive categories from total articles
        // We fetch a larger batch of articles once to get all possible categories for the tabs
        const allArticlesRes = await learningApi.getArticles({
          targetAudience: currentAudience,
          lang: language as "th" | "en",
          limit: 100,
        });

        const derivedCategories = Array.from(
          new Map(
            allArticlesRes.data
              .map((a) => {
                const cat =
                  typeof a.category === "object" && a.category
                    ? a.category
                    : {
                        id: "misc",
                        name: String(a.category || "General"),
                        slug: String(a.category || "general").toLowerCase(),
                      };
                return [cat.slug, cat];
              })
              .filter(([slug]) => slug) as [string, Category][],
          ).values(),
        );

        setCategories(derivedCategories);
      } catch (error) {
        console.error("Error fetching learning data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentAudience, language, search, selectedCategorySlug, currentPage]);

  const handleAudienceChange = (newAudience: "buyer" | "supplier") => {
    // Update local state first for immediate UI feedback
    setCurrentAudience(newAudience);
    setSelectedCategorySlug("all");
    setCurrentPage(1);

    // Update URL to preserve state for navigation/back-button
    const params = new URLSearchParams(searchParams.toString());
    params.set("audience", newAudience);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCategoryChange = (slug: string) => {
    setSelectedCategorySlug(slug);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const displayCategories = ["All", ...categories.map((c) => c.name)];

  return (
    <main className="min-h-screen bg-kumopack-base-white text-foreground overflow-x-hidden">
      <Navbar />

      {/* Header Section with Audience Context */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-10" />

        <div className="max-w-[1440px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleAudienceChange("buyer")}
                  className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${currentAudience === "buyer" ? "bg-primary text-white shadow-glow" : "bg-white border border-neutral-100 text-muted-foreground hover:border-primary/20"}`}
                >
                  {isTh ? "สำหรับผู้ซื้อ (Buyer)" : "For Buyers"}
                </button>
                <button
                  onClick={() => handleAudienceChange("supplier")}
                  className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${currentAudience === "supplier" ? "bg-primary text-white shadow-glow" : "bg-white border border-neutral-100 text-muted-foreground hover:border-primary/20"}`}
                >
                  {isTh ? "สำหรับผู้ผลิต (Supplier)" : "For Suppliers"}
                </button>
              </div>

              <div className="space-y-6">
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                  {isTh ? "ศูนย์การ" : "Learning"}
                  <br />
                  <span className="text-primary italic">
                    {isTh ? "เรียนรู้" : "Center"}
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground font-medium max-w-lg leading-relaxed">
                  {isTh
                    ? `คู่มือและข้อมูลเชิงลึกสำหรับ${currentAudience === "buyer" ? "ผู้ซื้อ" : "ผู้ผลิต"} เพื่อยกระดับธุรกิจบรรจุภัณฑ์ของคุณ`
                    : `In-depth guides and insights for ${currentAudience}s to elevate your packaging business.`}
                </p>
              </div>

              <div className="relative max-w-md group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/30 w-5 h-5 group-focus-within:text-primary transition-all" />
                <input
                  type="text"
                  placeholder={isTh ? "ค้นหาบทความ..." : "Search articles..."}
                  value={search}
                  onChange={handleSearchChange}
                  className="w-full bg-white border border-neutral-100 rounded-[2rem] px-16 py-5 font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all shadow-soft"
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={() =>
                    window.open(
                      `https://${currentAudience}.kumopack.com/auth`,
                      "_blank",
                    )
                  }
                  className="px-10 py-5 rounded-[2rem] bg-foreground text-background font-black text-xs uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
                >
                  {isTh ? "เริ่มต้นใช้งานฟรี" : "Get Started Free"}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-[4/3] rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white group"
            >
              <SafeImage
                src={heroImageUrl}
                alt="Learning Center"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-[3000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
              <div className="absolute bottom-12 left-12 right-12 p-10 rounded-[2.5rem] bg-white/10 backdrop-blur-2xl border border-white/20">
                <div className="flex items-center gap-4 text-white font-black text-xs uppercase tracking-widest mb-4">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  {isTh ? "ความรู้ใหม่ประจำวัน" : "Daily Insights"}
                </div>
                <div className="text-2xl font-black text-white leading-tight">
                  {isTh
                    ? "เทคนิคการลดต้นทุนบรรจุภัณฑ์"
                    : "Modern Packaging Cost Optimization"}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky Category Navbar */}
      <section className="sticky top-24 z-30 bg-kumopack-base-white/90 backdrop-blur-xl border-y border-neutral-100">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex items-center justify-center py-4 overflow-x-auto no-scrollbar gap-2">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${selectedCategorySlug === "all" ? "bg-primary text-white shadow-glow" : "hover:bg-neutral-50 text-muted-foreground"}`}
            >
              {isTh ? "ทั้งหมด" : "All"}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${selectedCategorySlug === cat.slug ? "bg-primary text-white shadow-glow" : "hover:bg-neutral-50 text-muted-foreground"}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-24 px-4 md:px-10 lg:px-20 bg-neutral-50/50">
        <div className="max-w-[1440px] mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-60 gap-8">
              <Loader2 className="w-16 h-16 text-primary animate-spin opacity-20" />
              <p className="text-muted-foreground font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">
                Fetching Knowledge...
              </p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                <AnimatePresence mode="popLayout">
                  {articles.map((article, index) => (
                    <motion.article
                      key={article.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
                      className="group"
                    >
                      <Link
                        href={`/learning/${getSafeSlug(article.slug)}?audience=${currentAudience}`}
                        className="flex flex-col h-full gap-8"
                      >
                        <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden bg-white border border-neutral-100 shadow-sm group-hover:shadow-2xl group-hover:-translate-y-3 transition-all duration-700">
                          <SafeImage
                            src={learningApi.getAssetPath(
                              article.thumbnailPath ||
                                article.featuredImagePath,
                            )}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                          <div className="absolute top-8 left-8">
                            <span className="px-5 py-2 rounded-2xl bg-white/95 backdrop-blur-xl text-[9px] font-black text-primary shadow-2xl uppercase tracking-widest">
                              {article.category
                                ? typeof article.category === "object"
                                  ? article.category.name
                                  : article.category
                                : "Insight"}
                            </span>
                          </div>

                          <div className="absolute bottom-8 left-8 right-8 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] mb-4">
                              <Eye className="w-4 h-4 text-primary" />
                              {(article.viewCount || 0).toLocaleString()} Views
                            </div>
                            <h2 className="text-xl font-black leading-tight mb-6">
                              {article.title}
                            </h2>
                            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary">
                              {isTh ? "อ่านเพิ่มเติม" : "Learn More"}
                              <ArrowLeft className="w-4 h-4 rotate-180" />
                            </div>
                          </div>
                        </div>

                        <div className="px-4 space-y-4 group-hover:opacity-40 transition-opacity">
                          <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">
                            <Calendar className="w-4 h-4" />
                            {article.publishedAt
                              ? new Date(
                                  article.publishedAt,
                                ).toLocaleDateString()
                              : "Recent"}
                            <span className="w-1 h-1 rounded-full bg-neutral-200" />
                            <Clock className="w-4 h-4" />
                            {article.readingTimeText || "5 min read"}
                          </div>
                          <h2 className="text-2xl font-black text-foreground leading-tight line-clamp-2">
                            {article.title}
                          </h2>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-32 flex justify-center items-center gap-10">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-16 h-16 rounded-full border border-neutral-100 bg-white flex items-center justify-center hover:border-primary hover:text-primary disabled:opacity-30 transition-all shadow-soft"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <div className="text-xs font-black text-muted-foreground uppercase tracking-[0.5em]">
                    Page{" "}
                    <span className="text-primary italic">{currentPage}</span> /{" "}
                    {totalPages}
                  </div>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="w-16 h-16 rounded-full border border-neutral-100 bg-white flex items-center justify-center hover:border-primary hover:text-primary disabled:opacity-30 transition-all shadow-soft"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              )}
            </>
          )}

          {!isLoading && articles.length === 0 && (
            <div className="text-center py-60 rounded-[5rem] bg-white border border-neutral-100 shadow-soft">
              <Search className="w-20 h-20 text-muted-foreground/10 mx-auto mb-10" />
              <h3 className="text-3xl font-black text-muted-foreground/30 uppercase tracking-[0.2em] mb-6">
                {isTh ? "ไม่พบเนื้อหาที่คุณค้นหา" : "No Resources Found"}
              </h3>
              <p className="text-lg text-muted-foreground/20 font-bold italic">
                {isTh
                  ? "ลองเปลี่ยนคำค้นหาหรือหมวดหมู่ใหม่ดูนะ"
                  : "Try different keywords or check other categories."}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function LearningPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-kumopack-base-white">
          <Loader2 className="w-12 h-12 text-primary animate-spin opacity-20" />
        </div>
      }
    >
      <LearningPageContent />
    </Suspense>
  );
}
