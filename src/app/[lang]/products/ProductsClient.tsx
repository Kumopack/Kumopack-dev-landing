"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Box, Layers, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { MinimalTabs } from "@/components/ui/minimal-tabs";
import NextLink from "@/components/common/LocalizedLink";
import { SafeImage } from "@/components/ui/safe-image";
import { useEffect, useState, useCallback } from "react";
import { Product, ProductLine, productApi } from "@/lib/product-api";

export default function ProductsClient({ dict, lang }: { dict: any; lang: string }) {
  const language = lang;
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductLine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const categoriesRes = await productApi.getProductLines();
        setCategories(categoriesRes);

        const defaultCategory =
          categoriesRes.find(
            (c) =>
              c.nameEn.toLowerCase().includes("corrugated") ||
              c.nameTh.includes("ลูกฟูก"),
          ) || categoriesRes[0];

        if (defaultCategory) {
          setSelectedCategory(defaultCategory.id);
          const productsRes = await productApi.getAllProducts(
            1,
            itemsPerPage,
            defaultCategory.id,
          );
          setProducts(productsRes.data);
          setTotalItems(productsRes.totalItems);
        }
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const fetchProducts = useCallback(async (page: number, categoryId: number | null) => {
    setIsLoading(true);
    try {
      const productsRes = await productApi.getAllProducts(page, itemsPerPage, categoryId || undefined);
      setProducts(productsRes.data);
      setTotalItems(productsRes.totalItems);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    fetchProducts(1, categoryId);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchProducts(newPage, selectedCategory);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const isTh = language === "th";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar lang={lang} dict={dict} />

      <section className="pt-32 pb-24 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {dict.products.title} <span className="text-primary">Packages</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-16 max-w-2xl text-left">
            {dict.products.subtitle}
          </p>

          <div className="space-y-12">
            {categories.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Layers className="w-6 h-6 text-primary" />
                  {dict.common.category || "Categories"}
                </h2>
                <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
                  <MinimalTabs
                    tabs={categories.map((cat) => ({
                      id: cat.id.toString(),
                      label: isTh ? cat.nameTh : cat.nameEn,
                    }))}
                    activeTab={selectedCategory?.toString() || ""}
                    onChange={(id) => {
                      handleCategoryClick(Number(id));
                    }}
                  />
                </div>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <Box className="w-6 h-6 text-primary" />
                {selectedCategory
                  ? isTh
                    ? categories.find((c) => c.id === selectedCategory)?.nameTh
                    : categories.find((c) => c.id === selectedCategory)?.nameEn
                  : dict.common.all || "All Products"}
              </h2>

              {isLoading ? (
                <div className="flex justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12 bg-muted/10 rounded-3xl border border-dashed border-border">
                  <p className="text-muted-foreground">
                    No products found for this category.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((p, idx) => (
                      <motion.div
                        key={p.id || idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className="h-full"
                      >
                        <NextLink
                          href={`/products/${p.slug}`}
                          className="group relative bg-card rounded-3xl overflow-hidden border border-border/50 hover:border-primary/50 hover:shadow-glow transition-all duration-300 h-full flex flex-col block"
                        >
                          <div className="aspect-square relative overflow-hidden bg-muted/20">
                            <SafeImage
                              src={
                                p.featurePicturePath
                                  ? productApi.getProductImage(
                                      p.featurePicturePath,
                                    )
                                  : "/placeholder-box.png"
                              }
                              alt={isTh ? p.nameTh : p.nameEn}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                              <div className="bg-background/90 p-2.5 rounded-full shadow-lg backdrop-blur-sm">
                                <ArrowUpRight className="w-5 h-5 text-primary" />
                              </div>
                            </div>
                          </div>
                          <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                              {isTh ? p.nameTh : p.nameEn}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                              {p.shortDescription || p.description}
                            </p>
                          </div>
                        </NextLink>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex justify-center items-center gap-2 md:gap-3">
                      <button
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-border/50 flex items-center justify-center hover:bg-card hover:border-primary hover:text-primary disabled:opacity-30 transition-all shadow-sm"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      {(() => {
                        const pages: (number | string)[] = [];
                        if (totalPages <= 7) {
                          for (let i = 1; i <= totalPages; i++) pages.push(i);
                        } else {
                          pages.push(1);
                          if (currentPage > 3) pages.push("...");
                          const start = Math.max(2, currentPage - 1);
                          const end = Math.min(totalPages - 1, currentPage + 1);
                          for (let i = start; i <= end; i++) pages.push(i);
                          if (currentPage < totalPages - 2) pages.push("...");
                          pages.push(totalPages);
                        }
                        return pages.map((p, idx) =>
                          typeof p === "string" ? (
                            <span
                              key={`ellipsis-${idx}`}
                              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-muted-foreground/40 font-bold text-sm select-none"
                            >
                              ···
                            </span>
                          ) : (
                            <button
                              key={p}
                              onClick={() => handlePageChange(p)}
                              className={`w-10 h-10 md:w-12 md:h-12 rounded-xl text-sm font-black transition-all duration-300 ${
                                currentPage === p
                                  ? "bg-primary text-white shadow-glow scale-105"
                                  : "border border-border/50 text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5"
                              }`}
                            >
                              {p}
                            </button>
                          ),
                        );
                      })()}

                      <button
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-border/50 flex items-center justify-center hover:bg-card hover:border-primary hover:text-primary disabled:opacity-30 transition-all shadow-sm"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer dict={dict} />
    </main>
  );
}
