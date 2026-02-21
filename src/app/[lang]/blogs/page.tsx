import { Suspense } from "react";
import { blogApi } from "@/lib/blog-api";
import BlogsClient from "./BlogsClient";
import { Loader2 } from "lucide-react";

export default async function BlogsPage() {
  const category = "All";

  try {
    const [articlesRes, categories] = await Promise.all([
      blogApi.getArticles(1, 6, category),
      blogApi.getCategories(),
    ]);

    return (
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-kumopack-base-white">
            <Loader2 className="w-12 h-12 text-primary animate-spin opacity-20" />
          </div>
        }
      >
        <BlogsClient
          initialArticles={articlesRes?.data || []}
          initialTotalItems={articlesRes.totalItems}
          initialCategories={categories}
        />
      </Suspense>
    );
  } catch (error) {
    console.error("Error pre-fetching blog data:", error);

    return (
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-kumopack-base-white">
            <Loader2 className="w-12 h-12 text-primary animate-spin opacity-20" />
          </div>
        }
      >
        <BlogsClient
          initialArticles={[]}
          initialTotalItems={0}
          initialCategories={[]}
        />
      </Suspense>
    );
  }
}
