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
  User,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogApi, Article } from "@/lib/blog-api";
import { SafeImage } from "@/components/ui/safe-image";
import { useLanguage } from "@/context/LanguageContext";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { getSafeSlug } from "@/lib/slug-utils";

export default function BlogContent({ blog }: { blog: Article }) {
  const { language, setLanguage } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Simplified URL sync to prevent flickering/loops
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
  const [related, setRelated] = useState<Article[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const [anchors, setAnchors] = useState<{ id: string; text: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isTh = language === "th";
  const hasEnVersion = !!(blog.nameEn && blog.descriptionEn);
  const isFallback = !isTh && !hasEnVersion;

  const name = isTh ? blog.nameTh : blog.nameEn || blog.nameTh;
  const description =
    (isTh
      ? blog.descriptionTh || (blog as any).contentTh
      : blog.descriptionEn ||
        (blog as any).contentEn ||
        blog.descriptionTh ||
        (blog as any).contentTh) || "";

  const shortDescription = isTh
    ? blog.shortDescriptionTh
    : blog.shortDescriptionEn || blog.shortDescriptionTh;

  const conclusion = isTh
    ? blog.conclusionTh || (blog as any).conclusionTh
    : blog.conclusionEn ||
      (blog as any).conclusionEn ||
      blog.conclusionTh ||
      (blog as any).conclusionTh;

  useEffect(() => {
    const fetchRelated = async () => {
      setLoadingRelated(true);
      try {
        const response = await blogApi.getArticles(1, 10);
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
          font-size: 1.125rem;
          line-height: 1.9;
          color: hsl(var(--foreground) / 0.85);
          letter-spacing: -0.01em;
        }
        .blog-content p {
          margin-bottom: 0px;
          font-size: 18px;
        }
        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4,
        .blog-content h5,
        .blog-content h6 {
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 0px;
          scroll-margin-top: 120px;
          color: #b5a4d4;
          letter-spacing: -0.03em;
        }
        .blog-content h1 {
          font-size: 3rem;
        }
        .blog-content h2 {
          font-size: 2.25rem;
          margin-top: 4.5rem;
        }
        .blog-content h3 {
          font-size: 1.75rem;
          margin-top: 3.5rem;
        }

        .blog-content ul,
        .blog-content ol {
          margin: 0 0 0 1.5rem;
          padding-left: 1rem;
        }
        .blog-content li {
          margin-bottom: 0;
        }
        .blog-content ul {
          list-style-type: none;
        }
        .blog-content ul li {
          position: relative;
        }
        .blog-content ul li::before {
          content: "•";
          color: hsl(var(--primary));
          font-weight: bold;
          display: inline-block;
          width: 1em;
          margin-left: -1em;
        }
        .blog-content ol {
          list-style-type: decimal;
        }

        .blog-content blockquote {
          margin: 3rem 0;
          padding: 2rem 2.5rem;
          border-left: 4px solid hsl(var(--primary));
          background: hsl(var(--lavender) / 0.3);
          border-radius: 0 2rem 2rem 0;
          font-style: italic;
          font-size: 1.25rem;
          color: hsl(var(--foreground) / 0.7);
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

        /* Text Formatting */
        .blog-content strong,
        .blog-content b {
          font-weight: 700;
        }
        .blog-content em,
        .blog-content i {
          font-style: italic;
        }
        .blog-content u {
          text-decoration: underline;
        }
        .blog-content s {
          text-decoration: line-through;
        }

        /* Font Sizes */
        .blog-content .ql-size-small {
          font-size: 0.75em;
        }
        .blog-content .ql-size-large {
          font-size: 1.5em;
        }
        .blog-content .ql-size-huge {
          font-size: 2.5em;
        }

        /* Code Block */
        .blog-content pre,
        .blog-content code {
          background: hsl(var(--muted));
          padding: 0.2em 0.4em;
          border-radius: 0.5rem;
          font-family: "Courier New", monospace;
          font-size: 0.9em;
        }
        .blog-content pre {
          padding: 1.5rem;
          overflow-x: auto;
          margin: 2rem 0;
        }

        /* Subscript & Superscript */
        .blog-content sub {
          vertical-align: sub;
          font-size: 0.75em;
        }
        .blog-content sup {
          vertical-align: super;
          font-size: 0.75em;
        }

        /* Video */
        .blog-content iframe,
        .blog-content video {
          max-width: 100%;
          height: auto;
          border-radius: 2.5rem;
          margin: 4rem auto !important;
          display: block;
          box-shadow: var(--shadow-float);
        }

        .blog-content img {
          max-width: 95%;
          height: auto;
          display: block;
          margin: 0.5rem auto !important;
          border-radius: 1.5rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(229, 231, 235, 0.5);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: zoom-in;
        }

        .blog-content img:hover {
          transform: scale(1.02);
          box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
        }

        @media (min-width: 768px) {
          .blog-content img {
            max-width: 100%;
            margin: 0 auto !important;
            border-radius: 1.5rem;
          }
        }

        /* Spacing adjustment for content paragraphs that just wrap an image */
        .blog-content p:has(img) {
          margin-bottom: 0px !important;
        }

        @media (max-width: 768px) {
          .blog-content {
            font-size: 1rem;
          }
          .blog-content h1 {
            font-size: 2.25rem;
          }
          .blog-content h2 {
            font-size: 1.75rem;
            margin-top: 3.5rem;
          }
          .blog-content h3 {
            font-size: 1.5rem;
            margin-top: 2.5rem;
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

      <article className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
            <aside className="w-full lg:w-[280px] shrink-0 lg:sticky lg:top-32 space-y-12 order-2 lg:order-1">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-neutral-100/80 hover:bg-primary/10 hover:text-primary transition-all duration-300 font-bold text-xs text-muted-foreground group border border-transparent hover:border-primary/20 backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                {isTh ? "กลับไปที่หน้ารวม" : "Back to Blog"}
              </Link>

              {anchors.length > 0 && (
                <div className="hidden lg:block space-y-6">
                  <h3 className="text-[11px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-3 px-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {isTh ? "สารบัญ" : "Contents"}
                  </h3>
                  <nav className="flex flex-col gap-1">
                    {anchors.map((anchor) => (
                      <a
                        key={anchor.id}
                        href={`#${anchor.id}`}
                        className="block py-3 px-5 rounded-xl text-[13px] font-bold text-foreground/50 hover:text-primary hover:bg-primary/5 transition-all truncate border border-transparent hover:border-primary/10"
                      >
                        {anchor.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              <div className="glass-premium p-8 rounded-[2.5rem] relative overflow-hidden group border border-white/40 shadow-soft">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <Sparkles className="w-12 h-12 text-primary" />
                </div>
                <h5 className="text-[14px] font-black text-primary mb-4 flex items-center gap-2 uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  Expert Insight
                </h5>
                <p className="text-[16px] font-bold leading-relaxed text-foreground/70 mb-8">
                  {isTh
                    ? "ความรู้และเคล็ดลับจากผู้เชี่ยวชาญด้านแพ็คเกจจิ้งของ KUMOPACK"
                    : "Exclusive insights from KUMOPACK packaging experts."}
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-neutral-200/40">
                  <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center font-black text-white text-xs italic shadow-glow overflow-hidden">
                    {blog.createdBy?.pictureProfilePath ? (
                      <SafeImage
                        src={blogApi.getAssetPath(
                          blog.createdBy.pictureProfilePath,
                        )}
                        alt={blog.createdBy.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      "KP"
                    )}
                  </div>
                  <div>
                    <div className="text-[16px] font-black text-foreground">
                      {blog.createdBy?.name || "KUMOPACK Team"}
                    </div>
                    <div className="text-[14px] font-bold text-primary/60 uppercase tracking-widest">
                      Article Writer
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleShare("facebook")}
                  className="flex-1 h-14 rounded-2xl bg-neutral-100/50 hover:bg-primary/10 text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all border border-transparent hover:border-primary/20 text-foreground/60 hover:text-primary group"
                >
                  <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />{" "}
                  FB
                </button>
                <button
                  onClick={() => handleShare("line")}
                  className="flex-1 h-14 rounded-2xl bg-neutral-100/50 hover:bg-primary/10 text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all border border-transparent hover:border-primary/20 text-foreground/60 hover:text-primary group"
                >
                  <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />{" "}
                  Line
                </button>
              </div>
            </aside>

            <div className="flex-1 w-full lg:max-w-[1000px] order-1 lg:order-2">
              <header className="mb-6" id="post-header">
                {isFallback && (
                  <div className="flex items-center gap-3 px-5 py-3 bg-amber-50 text-amber-700 rounded-2xl text-[12px] font-black uppercase tracking-widest mb-10 border border-amber-100/50 animate-pulse">
                    <AlertCircle className="w-5 h-5" />
                    {isTh
                      ? "ไม่รองรับภาษาที่เลือก จึงแสดงภาษาค่าเริ่มต้น"
                      : "Not supported in selected language, showing default language instead"}
                  </div>
                )}

                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-4"
                  style={{ color: "#b5a4d4" }}
                >
                  {name}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-[12px] font-bold text-muted-foreground/60 py-2 border-y border-neutral-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center overflow-hidden">
                      {blog.createdBy?.pictureProfilePath ? (
                        <SafeImage
                          src={blogApi.getAssetPath(
                            blog.createdBy.pictureProfilePath,
                          )}
                          alt={blog.createdBy.name}
                          width={36}
                          height={36}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    {blog.createdBy?.name || "KUMOPACK Team"}
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    {new Date(blog.publishedDate).toLocaleDateString(
                      isTh ? "th-TH" : "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center">
                      <Eye className="w-4 h-4 text-primary" />
                    </div>
                    {(blog.totalView || 0).toLocaleString()}{" "}
                    {isTh ? "การเข้าชม" : "Views"}
                  </div>
                  <div className="hidden sm:flex items-center gap-2.5 ml-auto">
                    <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-green-50 text-green-700 font-black text-[14px] uppercase tracking-widest border border-green-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      5 Min Read
                    </div>
                  </div>
                </div>
              </header>

              <div className="relative w-full aspect-[16/16] md:aspect-[16/16] rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl border border-neutral-100/50 group">
                <SafeImage
                  src={blogApi.getAssetPath(blog.featurePicturePath)}
                  alt={name}
                  fill={true}
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>

              {shortDescription && (
                <div className="mb-8 relative px-2 md:px-4 py-2 md:py-4 bg-neutral-50/50 rounded-3xl border border-neutral-100">
                  <div className="absolute -top-6 left-6 text-primary/20 text-[60px] md:text-[80px] font-serif leading-none select-none">
                    “
                  </div>
                  <p className="text-xl md:text-2xl font-bold leading-relaxed text-foreground/70 italic text-center relative z-10 px-4">
                    {shortDescription}
                  </p>
                  <div className="absolute -bottom-0 right-6 text-primary/20 text-[60px] md:text-[80px] font-serif leading-none select-none rotate-180">
                    “
                  </div>
                </div>
              )}

              <section className="blog-content" id="post-story-landmark">
                <div
                  className="rich-text leading-relaxed text-lg md:text-xl text-foreground/80 space-y-8"
                  dangerouslySetInnerHTML={{
                    __html: (() => {
                      let headerCount = 0;
                      return (description || "")
                        .replace(
                          /<(h[1-6])(.*?)>([\s\S]*?)<\/h[1-6]>/g,
                          (
                            _match: string,
                            tag: string,
                            attrs: string,
                            content: string,
                          ) => {
                            const currentId = `section-${headerCount}`;
                            headerCount++;

                            const cleanAttrs = attrs
                              .replace(/\sid=".*?"/g, "")
                              .replace(/\sid='.*?'/g, "");

                            return `<${tag}${cleanAttrs} id="${currentId}" style="scroll-margin-top: 100px;">${content}</${tag}>`;
                          },
                        )
                        .replace(
                          /<p>\s*<img[^>]+src="([^">]+)"[^>]*>\s*<\/p>|<img[^>]+src="([^">]+)"[^>]*>/g,
                          (
                            _match: string,
                            pSrc: string,
                            imgOnlySrc: string,
                          ) => {
                            const src = pSrc || imgOnlySrc;
                            const decodedSrc = src
                              .replace(/&quot;/g, "")
                              .replace(/"/g, "");
                            const finalSrc = decodedSrc.startsWith("data:")
                              ? decodedSrc
                              : blogApi.getAssetPath(decodedSrc);

                            // Move logic to CSS class for a cleaner HTML output as requested
                            return `<img src="${finalSrc}" alt="Article Illustration" />`;
                          },
                        );
                    })(),
                  }}
                />

                {conclusion && (
                  <div
                    id="post-conclusion"
                    className="mt-16 p-8 md:p-12 rounded-lg bg-[#b5a4d4]/5 border border-[#b5a4d4]/10 relative group transition-colors hover:bg-white hover:border-primary/10"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#b5a4d4] transition-all duration-700"></div>
                    <h4
                      className="font-black text-2xl md:text-3xl mb-8 flex items-center gap-4"
                      style={{ color: "#b5a4d4" }}
                    >
                      <Sparkles className="w-8 h-8 opacity-50" />
                      {isTh ? "บทสรุป" : "Summary"}
                    </h4>
                    <div
                      className="mt-8 rich-text font-medium text-base md:text-[18px] leading-relaxed text-foreground/70"
                      dangerouslySetInnerHTML={{ __html: conclusion }}
                    />
                  </div>
                )}

                {blog.keywords && blog.keywords.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-dashed border-neutral-200">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-muted-foreground mr-2">
                        Tags:
                      </span>
                      {blog.keywords.map((kw) => (
                        <div
                          key={kw.id}
                          className="px-3 py-1.5 rounded-lg bg-neutral-100/80 text-xs font-medium text-foreground/70 hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                        >
                          #{kw.keyword}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>

        <section className="mt-24 pt-16 border-t border-neutral-200 bg-neutral-50/30 overflow-hidden">
          <div className="max-w-7xl mx-auto px-2 md:px-8 mb-16">
            <div className="flex flex-col md:flex-row items-end justify-between gap-8">
              <div className="space-y-4">
                <h3 className="text-[12px] font-black text-primary uppercase tracking-[0.2em]">
                  {isTh ? "ยังมีความรู้อื่นๆ" : "Next for You"}
                </h3>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground leading-none">
                  {isTh ? "บทความ" : "Keep"}{" "}
                  <span className="text-primary italic">
                    {isTh ? "น่าสนใจ" : "Reading"}
                  </span>
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => scroll("left")}
                  className="w-14 h-14 rounded-full border border-neutral-200 bg-white shadow-soft flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all group"
                >
                  <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="w-14 h-14 rounded-full border border-neutral-200 bg-white shadow-soft flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all group"
                >
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-8 px-2 md:px-4 lg:px-16 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-0"
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
                    href={`/blogs/${getSafeSlug(article.slug)}`}
                    className="group block min-w-[220px] md:min-w-[280px] snap-center"
                  >
                    <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-neutral-200/60 relative bg-white shadow-sm hover:shadow-md transition-all duration-500">
                      <SafeImage
                        src={blogApi.getAssetPath(article.featurePicturePath)}
                        alt={aName}
                        fill={true}
                        className="object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent p-5 flex flex-col justify-end">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest">
                            {isTh ? "อ่านต่อ" : "Read"}
                          </span>
                        </div>
                        <h4 className="font-bold text-lg md:text-xl text-white leading-tight line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                          {aName}
                        </h4>
                        <div className="text-[10px] font-medium text-white/60 flex items-center gap-2 mt-2">
                          <span className="w-5 h-[1px] bg-white/40" />
                          {article.createdBy?.name ||
                            article.author ||
                            "KUMOPACK Team"}
                        </div>
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
