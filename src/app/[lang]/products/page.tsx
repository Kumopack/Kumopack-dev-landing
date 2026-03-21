"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Box, Layers, ArrowUpRight } from "lucide-react";
import { MinimalTabs } from "@/components/ui/minimal-tabs";
import NextLink from "@/components/common/LocalizedLink";
import { useLanguage } from "@/context/LanguageContext";
import { SafeImage } from "@/components/ui/safe-image";
import { useEffect, useState } from "react";
import { Product, ProductLine, productApi } from "@/lib/product-api";

export default function ProductsPage() {
  const { dict, language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductLine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

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
            100,
            defaultCategory.id,
          );
          setProducts(productsRes.data);
        }
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleCategoryClick = async (categoryId: number) => {
    setSelectedCategory(categoryId);
    setIsLoading(true);
    try {
      const productsRes = await productApi.getAllProducts(1, 100, categoryId);
      setProducts(productsRes.data);
    } catch (error) {
      console.error("Failed to fetch products by category", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isTh = language === "th";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-32 pb-24 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-5">
              <Box className="w-3 h-3" />
              {dict.products.title}
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-5">
              {dict.products.title}{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
                {dict.products.titleAccent}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              {dict.products.subtitle}
            </p>
          </motion.div>

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
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
