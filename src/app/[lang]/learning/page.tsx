"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useSearchParams,
  useLocalizedRouter as useRouter,
  usePathname,
} from "@/hooks/useLocalizedRouter";
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
import Link from "@/components/common/LocalizedLink";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SafeImage } from "@/components/ui/safe-image";
import { useLanguage } from "@/context/LanguageContext";
import { learningApi, LearningArticle, Category } from "@/lib/learning-api";
import { getSafeSlug } from "@/lib/slug-utils";

function LearningPageContent() {
  const { language, setLanguage } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isTh = language === "th";

  const [search, setSearch] = useState("");
  const [selectedCategorySlug, setSelectedCategorySlug] = useState("all");
  const [articles, setArticles] = useState<LearningArticle[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredArticle, setFeaturedArticle] =
    useState<LearningArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

  const initialAudience =
    (searchParams?.get("audience") as "buyer" | "supplier") || "buyer";
  const [currentAudience, setCurrentAudience] = useState<"buyer" | "supplier">(
    initialAudience,
  );

  useEffect(() => {
    const aud = searchParams?.get("audience") as "buyer" | "supplier";
    if (aud && aud !== currentAudience) {
      setCurrentAudience(aud);
    }
  }, [searchParams]);

  useEffect(() => {
    const urlLang = searchParams?.get("lang");
    if (
      urlLang &&
      (urlLang === "th" || urlLang === "en") &&
      urlLang !== language
    ) {
      setLanguage(urlLang as "th" | "en");
    }
  }, []);

  useEffect(() => {
    const urlLang = searchParams?.get("lang");
    if (urlLang !== language) {
      const params = new URLSearchParams(searchParams?.toString());
      params.set("lang", language);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [language, pathname, router, searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
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

        const allArticlesRes = await learningApi.getArticles({
          targetAudience: currentAudience,
          lang: language as "th" | "en",
          limit: 100,
        });

        const pinned =
          allArticlesRes.data.find((a) => a.isPinned && a.pinnedOrder === 1) ||
          allArticlesRes.data.find((a) => a.isPinned) ||
          allArticlesRes.data[0];
        setFeaturedArticle(pinned || null);

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
    setCurrentAudience(newAudience);
    setSelectedCategorySlug("all");
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams?.toString());
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

      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-10" />

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleAudienceChange("buyer")}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${currentAudience === "buyer" ? "bg-primary text-white shadow-md" : "bg-white border border-neutral-200 text-muted-foreground hover:border-primary/30"}`}
                >
                  {isTh ? "สำหรับผู้ซื้อ (Buyer)" : "For Buyers"}
                </button>
                <button
                  onClick={() => handleAudienceChange("supplier")}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${currentAudience === "supplier" ? "bg-primary text-white shadow-md" : "bg-white border border-neutral-200 text-muted-foreground hover:border-primary/30"}`}
                >
                  {isTh ? "สำหรับผู้ผลิต (Supplier)" : "For Suppliers"}
                </button>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground">
                  {isTh ? "ศูนย์การ" : "Learning"}
                  <span className="text-primary italic inline-block ml-2">
                    {isTh ? "เรียนรู้" : "Center"}
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground font-medium max-w-md leading-relaxed">
                  {isTh
                    ? `คู่มือและข้อมูลเชิงลึกสำหรับ${currentAudience === "buyer" ? "ผู้ซื้อ" : "ผู้ผลิต"} เพื่อยกระดับธุรกิจบรรจุภัณฑ์ของคุณ`
                    : `In-depth guides and insights for ${currentAudience}s to elevate your packaging business.`}
                </p>
              </div>

              <div className="relative max-w-md group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground/40 w-5 h-5 group-focus-within:text-primary transition-all" />
                <input
                  type="text"
                  placeholder={isTh ? "ค้นหาบทความ..." : "Search articles..."}
                  value={search}
                  onChange={handleSearchChange}
                  className="w-full bg-white border border-neutral-200 rounded-2xl px-12 py-4 text-base font-medium focus:ring-4 focus:ring-primary/5 focus:border-primary/30 outline-none transition-all shadow-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    const baseUrl =
                      currentAudience === "buyer"
                        ? process.env.NEXT_PUBLIC_BUYER_URL ||
                          "https://buyer.kumopack.com"
                        : process.env.NEXT_PUBLIC_SUPPLIER_URL ||
                          "https://supplier.kumopack.com";
                    window.open(`${baseUrl}/auth`, "_blank");
                  }}
                  className="px-8 py-4 rounded-xl bg-foreground text-background font-bold text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
                >
                  {isTh ? "เริ่มต้นใช้งานฟรี" : "Get Started Free"}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-video rounded-[2rem] overflow-hidden shadow-xl border-4 border-white group cursor-pointer"
              onClick={() => {
                if (featuredArticle) {
                  router.push(
                    `/learning/${getSafeSlug(featuredArticle.slug)}?audience=${currentAudience}&lang=${language}&articleId=${featuredArticle.id}`,
                  );
                }
              }}
            >
              <SafeImage
                src={
                  featuredArticle
                    ? learningApi.getAssetPath(
                        featuredArticle.featuredImagePath ||
                          featuredArticle.thumbnailPath,
                      )
                    : currentAudience === "supplier"
                      ? "/asset/marketplace-premium.png"
                      : "/asset/hero-bg-premium.jpg"
                }
                alt={featuredArticle?.title || "Learning Center"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-[3000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-3 text-white font-bold text-[10px] uppercase tracking-wider mb-2">
                  <span className="px-2 py-1 rounded bg-primary/90 text-white">
                    {featuredArticle?.isPinned
                      ? isTh
                        ? "แนะนำ"
                        : "Featured"
                      : isTh
                        ? "ล่าสุด"
                        : "Latest"}
                  </span>
                </div>
                <div className="text-xl md:text-2xl font-bold text-white leading-tight mb-2">
                  {featuredArticle?.title ||
                    (isTh
                      ? "เทคนิคการลดต้นทุนบรรจุภัณฑ์"
                      : "Modern Packaging Cost Optimization")}
                </div>
                <div className="inline-flex items-center gap-2 text-white/90 text-xs font-bold group-hover:text-primary transition-colors">
                  {isTh ? "อ่านต่อ" : "Read More"}{" "}
                  <ArrowLeft className="w-3 h-3 rotate-180" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="sticky top-20 z-30 bg-kumopack-base-white/95 backdrop-blur-sm border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-start md:justify-center py-4 overflow-x-auto no-scrollbar gap-2">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${selectedCategorySlug === "all" ? "bg-primary text-white border-primary shadow-sm" : "bg-white border-neutral-200 text-muted-foreground hover:border-primary/30 hover:text-foreground"}`}
            >
              {isTh ? "ทั้งหมด" : "All"}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${selectedCategorySlug === cat.slug ? "bg-primary text-white border-primary shadow-sm" : "bg-white border-neutral-200 text-muted-foreground hover:border-primary/30 hover:text-foreground"}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-neutral-50/50">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-6">
              <Loader2 className="w-10 h-10 text-primary animate-spin opacity-30" />
              <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs animate-pulse">
                Fetching Knowledge...
              </p>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                <AnimatePresence mode="popLayout">
                  {articles.map((article, index) => {
                    const displayTitle = article.meta?.title || article.title;
                    const displayDescription =
                      article.meta?.content || article.content || "";

                    return (
                      <motion.article
                        key={article.id}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: (index % 4) * 0.05,
                        }}
                        className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-lg transition-all duration-300"
                      >
                        <Link
                          href={`/learning/${getSafeSlug(article.slug)}?audience=${currentAudience}&lang=${language}&articleId=${article.id}`}
                          className="flex flex-col h-full"
                        >
                          <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                            <SafeImage
                              src={learningApi.getAssetPath(
                                article.thumbnailPath ||
                                  article.featuredImagePath,
                              )}
                              alt={article.featuredImageAlt || article.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />

                            {article.isPinned && (
                              <div className="absolute top-3 right-3 z-10">
                                <span className="w-2 h-2 rounded-full bg-primary shadow-glow ring-2 ring-white" />
                              </div>
                            )}

                            <div className="absolute top-3 left-3">
                              <span className="px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-[10px] font-bold text-foreground shadow-sm uppercase tracking-wide">
                                {article.category
                                  ? typeof article.category === "object"
                                    ? article.category.name
                                    : article.category
                                  : "Insight"}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col flex-1 p-5">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground/70 mb-3">
                              <Calendar className="w-3.5 h-3.5" />
                              {article.publishedAt || (article as any).date
                                ? new Date(
                                    article.publishedAt ||
                                      (article as any).date,
                                  ).toLocaleDateString(
                                    isTh ? "th-TH" : "en-US",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    },
                                  )
                                : "Recent"}
                              <span className="text-neutral-300">•</span>
                              {article.readingTimeText || "5 min read"}
                            </div>

                            <h3 className="text-lg font-bold text-foreground leading-snug mb-3 group-hover:text-primary transition-colors">
                              {displayTitle}
                            </h3>

                            <div
                              className="text-xs text-muted-foreground/80 line-clamp-3 font-medium leading-relaxed mb-4 flex-1"
                              dangerouslySetInnerHTML={{
                                __html: displayDescription,
                              }}
                            />

                            {article.tags && article.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 pt-2 mt-auto border-t border-neutral-50">
                                {article.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag.id}
                                    className="text-[10px] font-bold text-muted-foreground/60 bg-neutral-50 px-2.5 py-1 rounded-md"
                                  >
                                    #{tag.name}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </Link>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </div>

              {totalPages > 1 && (
                <div className="mt-20 flex justify-center items-center gap-6">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 disabled:opacity-50 transition-all shadow-sm"
                  >
                    <ChevronLeft className="w-5 h-5 text-foreground" />
                  </button>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Page <span className="text-primary">{currentPage}</span> /{" "}
                    {totalPages}
                  </div>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 disabled:opacity-50 transition-all shadow-sm"
                  >
                    <ChevronRight className="w-5 h-5 text-foreground" />
                  </button>
                </div>
              )}
            </>
          )}

          {!isLoading && articles.length === 0 && (
            <div className="text-center py-32 rounded-3xl bg-white border border-neutral-100 shadow-sm">
              <Search className="w-12 h-12 text-muted-foreground/10 mx-auto mb-6" />
              <h3 className="text-lg font-bold text-foreground mb-2">
                {isTh ? "ไม่พบเนื้อหาที่คุณค้นหา" : "No Resources Found"}
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                {isTh
                  ? "ลองเปลี่ยนคำค้นหาหรือตัวกรองหมวดหมู่ใหม่อีกครั้ง"
                  : "Try adjusting your search or filters to find what you're looking for."}
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
