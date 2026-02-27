import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { learningApi, Category } from "@/lib/learning-api";
import LearningPageClient from "./_components/LearningPageClient";

export default async function LearningPage() {
  const defaultAudience = "buyer";
  const defaultLang = "th";
  const defaultPage = 1;
  const limit = 12;

  const qParams: any = {
    targetAudience: defaultAudience,
    lang: defaultLang,
    page: defaultPage,
    limit,
  };

  // Execute initial data fetch concurrently for the default SSG view
  const [articlesRes, allArticlesRes] = await Promise.all([
    learningApi.getArticles(qParams),
    
    // Fetch all for categories mapping
    learningApi.getArticles({
      targetAudience: defaultAudience,
      lang: defaultLang,
      limit: 100, // Sufficient for category extraction
    }),
  ]);

  const initialArticles = Array.isArray(articlesRes) ? articlesRes : articlesRes.data || [];
  const initialTotalPages = !Array.isArray(articlesRes) && articlesRes.pagination 
    ? articlesRes.pagination.totalPages 
    : 1;

  // Extract Feature Article
  const pinned =
    allArticlesRes.data.find((a) => a.isPinned && a.pinnedOrder === 1) ||
    allArticlesRes.data.find((a) => a.isPinned) ||
    allArticlesRes.data[0];
  const initialFeaturedArticle = pinned || null;

  // Derive Categories
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

  return (
    <main className="min-h-screen bg-kumopack-base-white text-foreground overflow-x-hidden">
      <Navbar />
      
      <Suspense
        fallback={
          <div className="min-h-[60vh] flex items-center justify-center bg-kumopack-base-white">
            <Loader2 className="w-12 h-12 text-primary animate-spin opacity-20" />
          </div>
        }
      >
        <LearningPageClient 
          initialArticles={initialArticles}
          initialCategories={derivedCategories}
          initialFeaturedArticle={initialFeaturedArticle}
          initialTotalPages={initialTotalPages}
        />
      </Suspense>

      <Footer />
    </main>
  );
}
