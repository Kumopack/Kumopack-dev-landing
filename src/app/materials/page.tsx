"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link as LinkIcon, Layers } from "lucide-react";
import { MinimalTabs } from "@/components/ui/minimal-tabs";
import NextLink from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { SafeImage } from "@/components/ui/safe-image";
import { useEffect, useState } from "react";
import {
  Material,
  materialApi,
  ProductLine,
  productApi,
} from "@/lib/product-api";

export default function MaterialsPage() {
  const { dict, language } = useLanguage();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [categories, setCategories] = useState<ProductLine[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const cats = await productApi.getProductLines();
        setCategories(cats);

        const defaultCat =
          cats.find((c) => c.nameEn.toLowerCase().includes("corrugated")) ||
          cats[0];

        if (defaultCat) {
          setSelectedCategory(defaultCat.id);

          const matRes = await materialApi.getAllMaterials(
            1,
            100,
            defaultCat.id,
          );
          setMaterials(matRes.data);
        }
      } catch (error) {
        console.error("Failed to load initial data", error);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const handleCategoryClick = async (categoryId: number) => {
    if (selectedCategory === categoryId) return;

    setSelectedCategory(categoryId);
    setIsLoading(true);
    try {
      const res = await materialApi.getAllMaterials(1, 100, categoryId);
      setMaterials(res.data);
    } catch (error) {
      console.error("Failed to filter materials", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isTh = language === "th";

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <section className="pt-32 pb-24 px-4 md:px-8 flex-1">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            {dict.materials.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-16 max-w-2xl text-left font-medium">
            {dict.materials.subtitle}
          </p>

          {categories.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" />
                {dict.common.category || "Categories"}
              </h2>
              <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
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

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-20">
              <div>
                {materials.length === 0 ? (
                  <div className="text-center py-12 bg-muted/10 rounded-3xl border border-dashed border-border">
                    <p className="text-muted-foreground">
                      {isTh
                        ? "ไม่พบวัสดุในหมวดหมู่นี้"
                        : "No materials found in this category."}
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {materials.map((m, idx) => (
                      <motion.div
                        key={m.id || idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="group relative bg-card rounded-3xl overflow-hidden border border-border/50 hover:shadow-float transition-all h-full flex flex-col"
                      >
                        <div className="aspect-square relative overflow-hidden bg-muted/20 shrink-0">
                          <SafeImage
                            src={materialApi.getMaterialImage(
                              m.featurePicturePath || "",
                            )}
                            alt={isTh ? m.nameTh : m.nameEn}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-lg font-bold mb-2 leading-tight">
                            {isTh ? m.nameTh : m.nameEn}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                            {m.shortDescription || m.description}
                          </p>
                          <div className="mt-auto pt-2">
                            <NextLink
                              href={`/materials/${m.slug || m.id}?lang=${language}`}
                              className="text-primary font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
                            >
                              {dict.materials.details}
                              <LinkIcon className="w-4 h-4" />
                            </NextLink>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
