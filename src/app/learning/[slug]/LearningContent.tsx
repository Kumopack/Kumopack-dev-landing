"use client";

import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Calendar,
  Share2,
  Play,
  Sparkles,
  Eye,
  Clock,
  Copy,
  Layout,
  Grid,
  BookOpen,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LearningArticle, learningApi } from "@/lib/learning-api";
import { SafeImage } from "@/components/ui/safe-image";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { getSafeSlug } from "@/lib/slug-utils";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function LearningContent({
  article: initialArticle,
  audience: initialAudience = "buyer",
  isFallback: initialFallback = false,
}: {
  article: LearningArticle;
  audience?: "buyer" | "supplier";
  isFallback?: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [article, setArticle] = useState<LearningArticle>(initialArticle);
  const [relatedArticles, setRelatedArticles] = useState<LearningArticle[]>([]);
  const [audience, setAudience] = useState<"buyer" | "supplier">(
    initialAudience,
  );
  const [isFallback, setIsFallback] = useState(initialFallback);
  const { language, setLanguage } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Reference to avoid redundant fetches of the main article
  const lastArticleFetchRef = useRef<string | null>(null);

  // 1. Sync Context from URL on Mount
  useEffect(() => {
    const urlLang = searchParams.get("lang");
    const urlAudience = searchParams.get("audience") as "buyer" | "supplier";

    if (
      urlLang &&
      (urlLang === "th" || urlLang === "en") &&
      urlLang !== language
    ) {
      setLanguage(urlLang as "th" | "en");
    }
    if (
      urlAudience &&
      (urlAudience === "buyer" || urlAudience === "supplier")
    ) {
      setAudience(urlAudience);
    }
  }, []);

  // 2. Sync URL from Context when language changes
  useEffect(() => {
    const urlLang = searchParams.get("lang");
    if (urlLang !== language) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("lang", language);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [language, pathname, router, searchParams]);

  // 3. Dynamic Article Fetching (Crucial for static export)
  // If language or articleId in URL differs from the current article state, fetch the correct one.
  useEffect(() => {
    const urlLang = searchParams.get("lang") || language;
    const urlId = searchParams.get("articleId") || searchParams.get("id");
    const fetchKey = `${initialArticle.slug}-${urlLang}-${urlId}`;

    if (lastArticleFetchRef.current === fetchKey) return;

    // Only fetch if there's a mismatch (e.g., lang in URL is different from the current display article's lang)
    const needsFetch =
      (urlLang && article.lang !== urlLang) ||
      (urlId && String(article.id) !== String(urlId));

    if (needsFetch) {
      const fetchArticle = async () => {
        try {
          const freshArticle = await learningApi.getArticleBySlug(
            String(initialArticle.slug),
            urlLang as "th" | "en",
            urlId || undefined,
          );
          if (freshArticle) {
            setArticle(freshArticle);
            // Re-calculate fallback status
            setIsFallback(freshArticle.lang !== urlLang);
          }
        } catch (err) {
          console.error("[LearningContent] Dynamic fetch failed:", err);
        } finally {
          lastArticleFetchRef.current = fetchKey;
        }
      };
      fetchArticle();
    } else {
      lastArticleFetchRef.current = fetchKey;
    }
  }, [language, searchParams, initialArticle.slug, article.lang, article.id]);

  const isTh = language === "th";

  // Robust content extraction: prioritize showing something over nothing
  const rawContents = [
    article.excerpt,
    article.meta?.description,
    article.content,
  ].filter(Boolean) as string[];

  // Filter out strings that are just empty HTML tags like <p><br></p>
  const cleanContents = rawContents.filter(
    (str) => str.replace(/<[^>]*>/g, "").trim().length > 0,
  );

  const mainContentHtml = cleanContents.join(
    '<div class="my-12 h-px bg-neutral-100/50 shadow-inner"></div>',
  );

  const hasAnyContent = cleanContents.length > 0;

  const lastFetchedRef = useRef<{ slug: string; lang: string } | null>(null);

  useEffect(() => {
    if (
      lastFetchedRef.current?.slug === article.slug &&
      lastFetchedRef.current?.lang === language
    ) {
      return;
    }

    const fetchRelated = async () => {
      try {
        const related = await learningApi.getRelatedArticles(
          article.slug,
          language,
        );
        setRelatedArticles(related);
        lastFetchedRef.current = { slug: article.slug, lang: language };
      } catch (err) {
        console.error("Failed to fetch related articles:", err);
      }
    };
    fetchRelated();
  }, [article.slug, language]);

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      alert(isTh ? "คัดลอกลิงก์แล้ว!" : "Link copied to clipboard!");
    }
  };

  return (
    <main className="min-h-screen bg-kumopack-base-white text-foreground">
      <Navbar />

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>

      {/* Background Accents */}
      <div className="fixed top-0 inset-x-0 h-screen pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-mint/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <article className="pt-32 pb-24 px-4 md:px-10 lg:px-20">
        <div className="max-w-[1440px] mx-auto">
          {/* Breadcrumbs / Back button */}
          <div className="mb-12">
            <Link
              href={`/learning?audience=${audience}&lang=${language}`}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-neutral-100 shadow-soft text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary hover:border-primary/20 transition-all group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {isTh ? "กลับสู่ศูนย์การเรียนรู้" : "Back to Learning Center"}
            </Link>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-20">
            {/* Main Content Area */}
            <div className="space-y-10">
              {/* Video / Featured Image Section */}
              <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-black shadow-2xl border border-neutral-100 group">
                {article.videos?.length > 0 && isPlaying ? (
                  <video
                    src={learningApi.getAssetPath(article.videos[0].videoUrl)}
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <>
                    <SafeImage
                      src={learningApi.getAssetPath(
                        article.featuredImagePath || article.image,
                      )}
                      alt={article.featuredImageAlt || article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms]"
                    />
                    {(article.videos?.length > 0 || article.videoUrl) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                        <button
                          onClick={() => setIsPlaying(true)}
                          className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center shadow-glow transform transition-all group-hover:scale-110 active:scale-95"
                        >
                          <Play className="w-10 h-10 fill-current" />
                        </button>
                      </div>
                    )}
                    <div className="absolute top-8 left-8 z-20 flex gap-2">
                      <span className="px-6 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl text-[10px] font-black text-primary shadow-2xl border border-primary/5 uppercase tracking-[0.2em]">
                        {article.category &&
                        typeof article.category === "object"
                          ? article.category.name
                          : article.category || "Insight"}
                      </span>
                      {article.isPinned && article.pinnedOrder === 1 && (
                        <span className="px-6 py-2.5 rounded-2xl bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-glow flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Recommended
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Header Info */}
              <div className="space-y-6">
                {isFallback && (
                  <div className="flex items-center gap-3 px-6 py-4 bg-amber-50 text-amber-700 rounded-3xl text-[12px] font-black uppercase tracking-widest border border-amber-100/50 animate-pulse mb-8 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {isTh
                      ? "การแสดงผลนี้ใช้ภาษาเริ่มต้น เนื่องจากยังไม่รองรับภาษาที่คุณเลือก"
                      : "Showing default language as the selected language is currently unavailable"}
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground leading-[1.1]">
                    {article.meta?.title || article.title}
                  </h1>
                  {article.isPinned && article.pinnedOrder === 1 && (
                    <div className="flex-shrink-0 hidden md:block">
                      <span className="px-4 py-2 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-glow flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Featured #1
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-8 py-8 border-y border-neutral-100">
                  <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-muted-foreground/60">
                    <Calendar className="w-4 h-4 text-primary" />
                    {article.publishedAt || (article as any).date
                      ? new Date(
                          article.publishedAt || (article as any).date,
                        ).toLocaleDateString(isTh ? "th-TH" : "en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Recent"}
                  </div>
                  <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-muted-foreground/60">
                    <Eye className="w-4 h-4 text-primary" />
                    {(
                      article.viewCount ||
                      article.views ||
                      0
                    ).toLocaleString()}{" "}
                    {isTh ? "การเข้าชม" : "Views"}
                  </div>
                  <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-muted-foreground/60">
                    <Clock className="w-4 h-4 text-primary" />
                    {article.readingTimeText || "5 min read"}
                  </div>
                  <button
                    onClick={handleShare}
                    className="ml-auto flex items-center gap-3 px-6 py-3 rounded-2xl bg-neutral-50 text-xs font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                  >
                    <Share2 className="w-4 h-4" />
                    {isTh ? "แชร์บทความ" : "Share"}
                  </button>
                </div>
              </div>

              {/* Main Content Body */}
              <div className="prose prose-xl max-w-none prose-neutral prose-p:leading-relaxed prose-p:text-muted-foreground/80 prose-headings:font-black prose-headings:tracking-tighter py-10">
                {article.description &&
                  !article.excerpt?.includes(article.description) && (
                    <div
                      className="text-2xl font-bold text-foreground leading-relaxed mb-12 border-l-4 border-primary pl-8 italic rich-text-area"
                      dangerouslySetInnerHTML={{ __html: article.description }}
                    />
                  )}

                {hasAnyContent ? (
                  <div
                    className="article-content rich-text-area"
                    dangerouslySetInnerHTML={{
                      __html: mainContentHtml,
                    }}
                  />
                ) : (
                  <div className="py-20 text-center border-2 border-dashed border-neutral-100 rounded-[3rem]">
                    <p className="text-muted-foreground font-bold italic opacity-40">
                      {isTh
                        ? "ขออภัย ไม่พบเนื้อหาในส่วนนี้"
                        : "No content available for this section."}
                    </p>
                  </div>
                )}
              </div>

              {/* Tags Section */}
              <div className="pt-20 border-t border-neutral-100">
                <div className="flex flex-wrap gap-3">
                  {article.tags?.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-5 py-2.5 rounded-2xl bg-neutral-50 border border-neutral-100 text-xs font-black text-muted-foreground/60 hover:text-primary hover:border-primary/20 cursor-pointer transition-all"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-12">
              {/* Difficulty / Info Card */}
              <div className="sticky top-32 space-y-12">
                <div className="p-10 rounded-[3rem] bg-white border border-neutral-100 shadow-float space-y-8">
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                      Metadata
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-4 border-b border-neutral-50">
                        <div className="flex items-center gap-3 text-sm font-bold text-muted-foreground/60">
                          <BookOpen className="w-4 h-4" />
                          Difficulty
                        </div>
                        <span className="px-3 py-1 rounded-lg bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest">
                          {article.difficultyText || "Beginner"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-4 border-b border-neutral-50">
                        <div className="flex items-center gap-3 text-sm font-bold text-muted-foreground/60">
                          <Layout className="w-4 h-4" />
                          Audience
                        </div>
                        <span className="px-3 py-1 rounded-lg bg-mint/5 text-mint text-[10px] font-black uppercase tracking-widest">
                          {Array.isArray(article.audience)
                            ? article.audience[0]
                            : article.audience || "Everyone"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                      {isTh ? "เนื้อหาเพิ่มเติม" : "Additional Content"}
                    </h3>
                    <div className="text-sm text-muted-foreground leading-relaxed rich-text-area prose-sm prose-neutral">
                      {article.content ? (
                        <div
                          dangerouslySetInnerHTML={{ __html: article.content }}
                        />
                      ) : (
                        <p>
                          {isTh
                            ? "ไม่มีเนื้อหาเพิ่มเติม"
                            : "No additional content"}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Card - Only show if tutorial URL exists or for premium prompt */}
                  {(article.tutorialUrl || article.tutorial?.url) && (
                    <div className="p-8 rounded-[2rem] bg-gradient-to-br from-primary/5 to-mint/5 border border-primary/10 relative overflow-hidden group">
                      <div className="relative z-10 space-y-4">
                        <Sparkles className="w-8 h-8 text-primary opacity-50" />
                        <h4 className="text-xl font-black text-foreground">
                          {isTh ? "พร้อมเริ่มต้นทบทวน?" : "Ready to Start?"}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {isTh
                            ? "เข้าสู่หน้าสำหรับการทดลองทำ หรือดูรายละเอียดเพิ่มเติมได้ทันที"
                            : "Navigate directly to the tutorial or supplementary resources."}
                        </p>
                        <a
                          href={article.tutorialUrl || article.tutorial?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block pt-2"
                        >
                          <button className="w-full py-4 rounded-xl bg-primary text-white font-black text-xs uppercase tracking-[0.2em] shadow-glow hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                            {isTh ? "ลองทำเลย!" : "Get Started!"}
                            <ArrowLeft className="w-4 h-4 rotate-180" />
                          </button>
                        </a>
                      </div>
                    </div>
                  )}

                  {!article.tutorialUrl && !article.tutorial?.url && (
                    <div className="p-8 rounded-[2rem] bg-neutral-50 border border-neutral-100 relative overflow-hidden group">
                      <div className="relative z-10 space-y-4">
                        <BookOpen className="w-8 h-8 text-primary opacity-30" />
                        <h4 className="text-xl font-black text-foreground">
                          {isTh ? "ต้องการแผนกลยุทธ์?" : "Premium Strategy?"}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {isTh
                            ? "ยกระดับธุรกิจของคุณด้วยคำแนะนำจากผู้เชี่ยวชาญแบบ 1-ต่อ-1"
                            : "Optimize your packaging strategy with our 1-on-1 expert sessions."}
                        </p>
                        <Link href="/pricing" className="block pt-2">
                          <button className="w-full py-4 rounded-xl bg-white border border-neutral-200 text-foreground font-black text-xs uppercase tracking-[0.2em] hover:bg-neutral-50 transition-all">
                            {isTh ? "ดูแผนราคา" : "Explore Plans"}
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Short Related Articles Sidebar */}
                {relatedArticles.length > 0 && (
                  <div className="space-y-8">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary px-4">
                      Recommended
                    </h3>
                    <div className="space-y-6">
                      {relatedArticles.slice(0, 3).map((rel) => (
                        <Link
                          key={rel.id}
                          href={`/learning/${getSafeSlug(rel.slug)}?audience=${audience}&lang=${language}&articleId=${rel.id}`}
                          className="group flex gap-6 p-4 rounded-[2rem] hover:bg-white hover:shadow-soft transition-all"
                        >
                          <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-neutral-100 bg-neutral-50 shadow-inner">
                            <SafeImage
                              src={learningApi.getAssetPath(
                                rel.thumbnailPath || rel.featuredImagePath,
                              )}
                              alt={rel.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          </div>
                          <div className="flex flex-col justify-center gap-2">
                            <span className="text-[8px] font-black uppercase tracking-widest text-primary/40">
                              {rel.category && typeof rel.category === "object"
                                ? rel.category.name
                                : rel.category || "General"}
                            </span>
                            <h4 className="font-bold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                              {rel.title}
                            </h4>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>

          {/* Footer Related Section (Full Grid) */}
          {relatedArticles.length > 3 && (
            <div className="pt-40 border-t border-neutral-100 mt-40">
              <h3 className="text-3xl font-black tracking-tighter mb-16 px-4">
                {isTh ? "บทความที่เกี่ยวข้อง" : "Related Insights"}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedArticles.slice(3, 7).map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/learning/${getSafeSlug(rel.slug)}?audience=${audience}&lang=${language}&articleId=${rel.id}`}
                    className="group block space-y-6"
                  >
                    <div className="aspect-square relative rounded-[2.5rem] overflow-hidden border border-neutral-100 bg-neutral-50 shadow-sm transition-all duration-700 group-hover:shadow-soft group-hover:-translate-y-2">
                      <SafeImage
                        src={learningApi.getAssetPath(
                          rel.thumbnailPath || rel.featuredImagePath,
                        )}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                      />
                    </div>
                    <div className="px-2 space-y-3">
                      <span className="text-[8px] font-black uppercase tracking-widest text-primary/40">
                        {rel.category && typeof rel.category === "object"
                          ? rel.category.name
                          : rel.category || "General"}
                      </span>
                      <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </main>
  );
}
