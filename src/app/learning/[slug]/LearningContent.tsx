"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LearningArticle, learningApi } from "@/lib/learning-api";
import { SafeImage } from "@/components/ui/safe-image";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";

export default function LearningContent({
  article,
  audience = "buyer",
}: {
  article: LearningArticle;
  audience?: "buyer" | "supplier";
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState<LearningArticle[]>([]);
  const { language } = useLanguage();
  const isTh = language === "th";

  useEffect(() => {
    const fetchRelated = async () => {
      const related = await learningApi.getRelatedArticles(
        article.slug,
        language,
      );
      setRelatedArticles(related);
    };
    fetchRelated();
  }, [article.slug, language]);

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      // In a real app, we'd use a toast here
      alert(isTh ? "คัดลอกลิงก์แล้ว!" : "Link copied to clipboard!");
    }
  };

  return (
    <main className="min-h-screen bg-kumopack-base-white text-foreground">
      <Navbar />

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
              href={`/learning?audience=${audience}`}
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
                      alt={article.title}
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
                    <div className="absolute top-8 left-8 z-20">
                      <span className="px-6 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl text-[10px] font-black text-primary shadow-2xl border border-primary/5 uppercase tracking-[0.2em]">
                        {article.category &&
                        typeof article.category === "object"
                          ? article.category.name
                          : article.category || "Insight"}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Header Info */}
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground leading-[1.1]">
                  {article.title}
                </h1>
                <div className="flex flex-wrap items-center gap-8 py-8 border-y border-neutral-100">
                  <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-muted-foreground/60">
                    <Calendar className="w-4 h-4 text-primary" />
                    {article.publishedAt
                      ? new Date(article.publishedAt).toLocaleDateString()
                      : "Recent"}
                  </div>
                  <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-muted-foreground/60">
                    <Eye className="w-4 h-4 text-primary" />
                    {(
                      article.viewCount ||
                      article.views ||
                      0
                    ).toLocaleString()}{" "}
                    Views
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
              <div className="prose prose-xl max-w-none prose-neutral prose-p:leading-relaxed prose-p:text-muted-foreground/80 prose-headings:font-black prose-headings:tracking-tighter">
                {article.description && (
                  <p className="text-2xl font-bold text-foreground leading-relaxed mb-12 border-l-4 border-primary pl-8 italic">
                    {/* Render HTML if it contains tags, otherwise just text */}
                    {article.description.includes("<") ? (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: article.description,
                        }}
                      />
                    ) : (
                      article.description
                    )}
                  </p>
                )}
                <div
                  className="article-content rich-text-area"
                  dangerouslySetInnerHTML={{
                    __html:
                      article.content ||
                      article.excerpt ||
                      article.description ||
                      "",
                  }}
                />
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

                  {/* Action Card */}
                  <div className="p-8 rounded-[2rem] bg-gradient-to-br from-primary/5 to-mint/5 border border-primary/10 relative overflow-hidden group">
                    <div className="relative z-10 space-y-4">
                      <Sparkles className="w-8 h-8 text-primary opacity-50" />
                      <h4 className="text-xl font-black text-foreground">
                        Premium Strategy?
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Optimized your packaging strategy with our 1-on-1 expert
                        sessions.
                      </p>
                      <Link href="/pricing" className="block pt-2">
                        <button className="w-full py-4 rounded-xl bg-primary text-white font-black text-xs uppercase tracking-[0.2em] shadow-glow hover:scale-[1.02] transition-all">
                          Explore Plans
                        </button>
                      </Link>
                    </div>
                  </div>
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
                          href={`/learning/${rel.slug}?audience=${audience}`}
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
                    href={`/learning/${rel.slug}?audience=${audience}`}
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
