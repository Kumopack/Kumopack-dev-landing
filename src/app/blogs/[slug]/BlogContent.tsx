"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Share2,
  Eye,
  Loader2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogApi, Article } from "@/lib/blog-api";
import { SafeImage } from "@/components/ui/safe-image";
import { useLanguage } from "@/context/LanguageContext";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function BlogContent({ blog }: { blog: Article }) {
  const { language, setLanguage } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Simplified URL sync to prevent flickering/loops
  useEffect(() => {
    const urlLang = searchParams.get("lang");
    if (
      urlLang &&
      (urlLang === "th" || urlLang === "en") &&
      urlLang !== language
    ) {
      setLanguage(urlLang as "th" | "en");
    }
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get("lang") !== language) {
      params.set("lang", language);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [language, pathname, router]);
  const [related, setRelated] = useState<Article[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const [anchors, setAnchors] = useState<{ id: string; text: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isTh = language === "th";
  const hasEnVersion = !!(blog.nameEn && blog.descriptionEn);
  const isFallback = !isTh && !hasEnVersion;

  const name = isTh ? blog.nameTh : blog.nameEn || blog.nameTh;
  const description = isTh
    ? blog.descriptionTh
    : blog.descriptionEn || blog.descriptionTh;
  const shortDescription = isTh
    ? blog.shortDescriptionTh
    : blog.shortDescriptionEn || blog.shortDescriptionTh;
  const conclusion = isTh
    ? blog.conclusionTh
    : blog.conclusionEn || blog.conclusionTh;

  useEffect(() => {
    const fetchRelated = async () => {
      setLoadingRelated(true);
      try {
        const response = await blogApi.getArticles(1, 20);
        setRelated(response.data.filter((a) => a.id !== blog.id));
      } catch (err) {
        console.error("Error fetching related articles", err);
      } finally {
        setLoadingRelated(false);
      }
    };
    fetchRelated();

    if (typeof window !== "undefined") {
      const parser = new DOMParser();
      const doc = parser.parseFromString(description || "", "text/html");
      const headers = Array.from(
        doc.querySelectorAll("h1, h2, h3, h4, h5, h6"),
      );

      const anchorData: { id: string; text: string }[] = [
        { id: "post-header", text: isTh ? "เริ่มต้น" : "Top" },
        { id: "post-story-landmark", text: isTh ? "เนื้อหา" : "Story" },
      ];

      headers.forEach((header, index) => {
        const id = header.id || `section-${index}`;
        anchorData.push({ id, text: header.textContent || "" });
      });

      if (conclusion) {
        anchorData.push({
          id: "post-conclusion",
          text: isTh ? "บทสรุป" : "Summary",
        });
      }

      setAnchors(anchorData);
    }

    blogApi.incrementView(blog.slug);
  }, [blog.slug, description, isTh, conclusion, blog.id]);

  // Update document title on client when language changes (since server metadata is static for export)
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = `${name} | Kumopack Blog`;
    }
  }, [name]);

  const handleShare = (platform: "facebook" | "twitter" | "line") => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(name);
    let shareUrl = "";
    if (platform === "facebook")
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    if (platform === "twitter")
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
    if (platform === "line")
      shareUrl = `https://social-plugins.line.me/lineit/share?url=${url}`;
    if (shareUrl) window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth * 0.8
          : scrollLeft + clientWidth * 0.8;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-kumopack-base-white text-foreground overflow-x-hidden">
      <Navbar />

      <style jsx global>{`
        .blog-content {
          font-size: 16px;
          line-height: 1.8;
          color: hsl(var(--foreground) / 0.85);
        }
        .blog-content p {
          margin-bottom: 1.5rem;
        }
        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4,
        .blog-content h5,
        .blog-content h6 {
          font-weight: 800;
          line-height: 1.3;
          margin-bottom: 1.25rem;
          scroll-margin-top: 100px;
        }
        .blog-content h1 {
          font-size: 2.5rem;
        }
        .blog-content h2 {
          font-size: 1.75rem;
          margin-top: 3rem;
          border-left: 4px solid #b15fce;
          padding-left: 1.25rem;
          color: hsl(var(--foreground));
        }
        .blog-content h3 {
          font-size: 1.5rem;
          margin-top: 2.5rem;
          border-left: 4px solid #db99f2;
          padding-left: 1.1rem;
          color: hsl(var(--foreground) / 0.9);
        }

        .blog-content ul,
        .blog-content ol {
          margin: 1.5rem 0 1.5rem 2rem;
        }
        .blog-content ul {
          list-style-type: disc;
        }
        .blog-content ol {
          list-style-type: decimal;
        }

        .blog-content .ql-align-center {
          text-align: center;
        }
        .blog-content .ql-align-right {
          text-align: right;
        }
        .blog-content .ql-align-justify {
          text-align: justify;
        }

        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 1.5rem;
          margin: 2.5rem auto !important;
          display: block;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        @media (max-width: 768px) {
          .blog-content {
            font-size: 15px;
          }
          .blog-content h1 {
            font-size: 2rem;
          }
          .blog-content h2 {
            font-size: 1.5rem;
          }
          .blog-content h3 {
            font-size: 1.3rem;
          }
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <article className="pt-32 pb-8">
        <div className="max-w-[1440px] mx-auto px-2 md:px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-16">
            {/* LEFT SIDEBAR */}
            <aside className="lg:w-[320px] shrink-0">
              <div className="lg:sticky lg:top-32 space-y-12">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-3 hover:text-primary transition-all duration-300 font-black text-xs text-muted-foreground/50  group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  {isTh ? "กลับไปที่หน้ารวม" : "Back to Blog"}
                </Link>

                {anchors.length > 0 && (
                  <div className="space-y-6">
                    <h3 className="text-[11px] font-black  text-foreground/30 flex items-center gap-3">
                      <span className="w-5 h-[2.5px] bg-primary rounded-full" />
                      {isTh ? "สารบัญข่าว" : "Guide Contents"}
                    </h3>
                    <nav className="flex flex-col gap-1">
                      {anchors.map((anchor) => (
                        <a
                          key={anchor.id}
                          href={`#${anchor.id}`}
                          className="block py-2.5 px-4 rounded-xl text-[13px] font-bold text-foreground/50 hover:text-primary hover:bg-primary/5 transition-all truncate border border-transparent hover:border-primary/10"
                        >
                          {anchor.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                <div className="p-8 pb-10 rounded-[2.5rem] bg-neutral-50/80 border border-neutral-200/50 shadow-sm relative overflow-hidden group">
                  <h5 className="text-[10px] font-black  text-primary mb-5 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Expert Insight
                  </h5>
                  <p className="text-[13.5px] font-bold leading-relaxed text-foreground/70 mb-8">
                    {isTh
                      ? "ความรู้และเคล็ดลับจากผู้เชี่ยวชาญด้านแพ็คเกจจิ้งของ KUMOPACK"
                      : "Exclusive insights from KUMOPACK packaging experts."}
                  </p>
                  <div className="flex items-center gap-4 pt-6 border-t border-neutral-200/60">
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center font-black text-primary text-xs italic shadow-inner">
                      KP
                    </div>
                    <div>
                      <div className="text-[12px] font-black text-foreground">
                        KUMOPACK Team
                      </div>
                      <div className="text-[10px] font-bold text-primary/50 uppercase tracking-widest">
                        Article Writer
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={() => handleShare("facebook")}
                    className="flex-1 h-12 rounded-2xl bg-neutral-100 hover:bg-primary/10 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all border border-transparent hover:border-primary/20 text-foreground/60 hover:text-primary"
                  >
                    <Share2 className="w-3.5 h-3.5" /> FB
                  </button>
                  <button
                    onClick={() => handleShare("line")}
                    className="flex-1 h-12 rounded-2xl bg-neutral-100 hover:bg-primary/10 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all border border-transparent hover:border-primary/20 text-foreground/60 hover:text-primary"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Line
                  </button>
                </div>
              </div>
            </aside>

            {/* RIGHT MAIN CONTENT AREA */}
            <div className="flex-1">
              <header className="mb-8" id="post-header">
                {/* Language Fallback Tag */}
                {isFallback && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-xl text-[11px] font-black uppercase tracking-widest mb-8 border border-amber-100 animate-pulse">
                    <AlertCircle className="w-4 h-4" />
                    {isTh
                      ? "ไม่รองรับภาษาที่เลือก จึงแสดงภาษาค่าเริ่มต้น"
                      : "Not supported in selected language, showing default language instead"}
                  </div>
                )}

                <h1 className="text-3xl md:text-5xl lg:text-[3.25rem] font-black leading-[1.15] tracking-tight text-foreground">
                  {name}
                </h1>

                {/* Categories below title */}
                <div className="flex flex-wrap gap-2 mb-0 mt-4">
                  {(blog.categories || []).map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/blogs?category=${cat.slug}`}
                      className="px-6 py-2 rounded-xl text-sm font-bold transition-all bg-muted/50 text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-glow"
                    >
                      {isTh ? cat.nameTh : cat.nameEn || cat.nameTh}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-10 text-[11px] font-black  text-muted-foreground/40 py-8 border-y border-neutral-100/80">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-primary/40" />
                    {new Date(blog.publishedDate).toLocaleDateString(
                      isTh ? "th-TH" : "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Eye className="w-4 h-4 text-primary/40" />
                    {blog.totalView.toLocaleString()}{" "}
                    {isTh ? "การเข้าชม" : "Views"}
                  </div>
                </div>
              </header>

              <div className="relative w-full h-[420px] md:h-[520px] lg:h-[640px] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl bg-neutral-50 border border-neutral-100/50">
                <SafeImage
                  src={blogApi.getAssetPath(blog.featurePicturePath)}
                  alt={name}
                  fill={true}
                  className="object-cover"
                />
              </div>

              {shortDescription && (
                <div className="mb-14 text-xl md:text-2xl font-medium leading-[1.8] text-foreground/60 italic border-l-4 border-primary/20 pl-8 lg:pl-12">
                  {shortDescription}
                </div>
              )}

              <section className="blog-content" id="post-story-landmark">
                <div
                  className="rich-text"
                  dangerouslySetInnerHTML={{
                    __html: (description || "")
                      .replace(
                        /<(h[1-6])>(.*?)<\/h[1-6]>/g,
                        (match, tag, content, offset) => {
                          const id = `section-${offset}`;
                          return `<${tag} id="${id}">${content}</${tag}>`;
                        },
                      )
                      .replace(/<img[^>]+src="([^">]+)"/g, (match, src) => {
                        const decodedSrc = src
                          .replace(/&quot;/g, "")
                          .replace(/"/g, "");
                        if (decodedSrc.startsWith("data:"))
                          return `<img src="${decodedSrc}"`;
                        return `<img src="${blogApi.getAssetPath(decodedSrc)}"`;
                      }),
                  }}
                />

                {conclusion && (
                  <div
                    className="mt-16 p-4 md:p-8 rounded-[4rem] bg-neutral-50 border border-neutral-200/60 shadow-sm relative overflow-hidden"
                    id="post-conclusion"
                  >
                    <div className="absolute top-0 left-0 w-2.5 h-full bg-primary" />
                    <h4 className="text-primary font-black  text-2xl md:text-4xl mb-8 flex items-center gap-4">
                      <Sparkles className="w-8 h-8" />
                      {isTh ? "บทสรุป" : "Summary"}
                    </h4>
                    <div
                      className="rich-text font-normal text-sm md:text-base leading-relaxed text-foreground/70 mt-4"
                      dangerouslySetInnerHTML={{ __html: conclusion }}
                    />
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>

        {/* KEEP LEARNING SECTION */}
        <section className="mt-32 pt-8 border-t border-neutral-100 bg-neutral-50/30">
          <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-16 mb-16">
            <div className="flex flex-col md:flex-row items-end justify-between gap-8">
              <div className="space-y-4">
                <h3 className="text-[12px] font-black  text-primary">
                  {isTh ? "ยังมีความรู้อื่นๆ" : "Explore More"}
                </h3>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground">
                  {isTh ? "บทความ" : "Keep"}{" "}
                  <span className="text-primary italic">
                    {isTh ? "น่าสนใจ" : "Learning"}
                  </span>
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => scroll("left")}
                  className="w-14 h-14 rounded-full border border-neutral-200 bg-white shadow-sm flex items-center justify-center hover:bg-neutral-50 hover:border-primary/30 transition-all group"
                >
                  <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="w-14 h-14 rounded-full border border-neutral-200 bg-white shadow-sm flex items-center justify-center hover:bg-neutral-50 hover:border-primary/30 transition-all group"
                >
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-10 px-4 md:px-8 lg:px-16 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-20"
          >
            {loadingRelated ? (
              <div className="w-full flex justify-center items-center py-40">
                <Loader2 className="w-10 h-10 text-primary animate-spin opacity-20" />
              </div>
            ) : (
              related.map((article) => {
                const aName = isTh
                  ? article.nameTh
                  : article.nameEn || article.nameTh;
                const aDesc = isTh
                  ? article.shortDescriptionTh
                  : article.shortDescriptionEn || article.shortDescriptionTh;
                return (
                  <Link
                    key={article.id}
                    href={`/blogs/${article.slug}`}
                    className="group block min-w-[320px] md:min-w-[480px] snap-center"
                  >
                    <div className="aspect-square rounded-[3.5rem] overflow-hidden border border-neutral-200/60 relative bg-white shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-700">
                      <SafeImage
                        src={blogApi.getAssetPath(article.featurePicturePath)}
                        alt={aName}
                        fill={true}
                        className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-10 md:p-14 flex flex-col justify-end">
                        <div className="flex items-center gap-3 mb-5">
                          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                          <span className="text-[11px] font-black  text-white/50">
                            {isTh ? "อ่านต่อ" : "Insight"}
                          </span>
                        </div>
                        <h4 className="font-black text-2xl md:text-3xl text-white leading-[1.2] line-clamp-2 mb-6 group-hover:text-primary transition-colors">
                          {aName}
                        </h4>
                        <p className="text-[14px] text-white/40 font-medium line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-white">
                          {aDesc}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
            <div className="min-w-[40px] md:min-w-[100px] shrink-0" />
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
