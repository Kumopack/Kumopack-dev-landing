"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  Ruler,
  Paintbrush,
  Box,
  Leaf,
  Award,
  BookOpen,
} from "lucide-react";
import { MinimalTabs } from "@/components/ui/minimal-tabs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import { Product, productApi } from "@/lib/product-api";
import { SafeImage } from "@/components/ui/safe-image";
import { SustainabilityIcon } from "@/components/SustainabilityIcon";
import { motion } from "framer-motion";

export default function ProductDetailClient({
  id: initialId,
}: {
  id?: string;
}) {
  const params = useParams();
  const rawId = params?.id;
  const paramId = Array.isArray(rawId) ? rawId[0] : rawId;
  const id = initialId || paramId;

  const { dict, language } = useLanguage();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "materials" | "standards"
  >("overview");
  const router = useRouter();

  const isTh = language === "th";

  const t = (key: string) => {
    const keys = key.split(".");
    let current: any = dict;
    for (const k of keys) {
      if (current && current[k]) {
        current = current[k];
      } else {
        return key;
      }
    }
    return current;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id || id === "undefined") {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const decodedId = decodeURIComponent(id);
        let foundProduct = await productApi.getProductBySlug(decodedId);

        if (!foundProduct) {
          console.warn(
            `Product not found by slug ${decodedId}, trying fallback search...`,
          );
          try {
            const allProducts = await productApi.getAllProducts(1, 1000);
            foundProduct =
              allProducts.data.find(
                (p) =>
                  p.slug === decodedId ||
                  p.nameEn === decodedId ||
                  p.nameTh === decodedId,
              ) || null;
          } catch (fallbackError) {
            console.error("Fallback search failed", fallbackError);
          }
        }

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Failed to load product", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product || !product.slug) return;

    const expectedPath = `/products/${product.slug}`;
    const expectedQuery = `?lang=${language}`;

    const currentPath = window.location.pathname;
    const currentSearch = window.location.search;

    const isPathMismatch =
      decodeURIComponent(currentPath) !== decodeURIComponent(expectedPath);
    const isQueryMismatch = currentSearch !== expectedQuery;

    if (isPathMismatch || isQueryMismatch) {
      window.history.replaceState(null, "", `${expectedPath}${expectedQuery}`);
    }
  }, [product, language]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link href="/products" className="text-primary hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  const tabBtnClass = (tab: string) =>
    `px-6 py-3 rounded-full text-sm font-bold transition-all ${activeTab === tab ? "bg-primary text-white shadow-lg" : "bg-muted/30 text-muted-foreground hover:bg-muted/50"}`;

  const mainImage =
    product.featurePicturePath ||
    (product.images && product.images[0]?.path) ||
    "";

  const descriptionHtml = isTh
    ? product.longDescription
    : product.longDescriptionEn;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-32 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            href={`/products?lang=${language}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("products.backToProducts")}
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-6">
            <div className="aspect-square relative rounded-[3rem] overflow-hidden bg-muted/20 border border-border/50 shadow-inner">
              <SafeImage
                src={
                  mainImage
                    ? productApi.getProductImage(mainImage)
                    : "/placeholder-box.png"
                }
                alt={isTh ? product.nameTh : product.nameEn}
                fill
                className="object-cover"
                priority
              />

              <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                {product.productLine && (
                  <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold shadow-sm text-primary">
                    {isTh
                      ? product.productLine.nameTh
                      : product.productLine.nameEn}
                  </span>
                )}
              </div>
            </div>

            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-square relative rounded-2xl overflow-hidden bg-muted/20 border border-border/50 cursor-pointer hover:border-primary/50 transition-colors"
                  >
                    <SafeImage
                      src={productApi.getProductImage(img.path)}
                      alt={`Gallery ${idx}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="mb-8">
              <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
                {isTh ? product.nameTh : product.nameEn}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5 bg-muted/30 px-3 py-1 rounded-lg">
                  <Ruler className="w-4 h-4" />
                  {product.code}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-8 border-b border-border/40 pb-6">
              <MinimalTabs
                tabs={[
                  {
                    id: "overview",
                    label: isTh ? "ภาพรวม" : "Overview",
                    icon: <BookOpen className="w-4 h-4" />,
                  },
                  {
                    id: "materials",
                    label: t("materials.title") || "Materials",
                    icon: <Box className="w-4 h-4" />,
                  },
                  {
                    id: "standards",
                    label: isTh
                      ? "มาตรฐาน & ใบรับรอง"
                      : "Standards & Certificates",
                    icon: <Award className="w-4 h-4" />,
                  },
                ]}
                activeTab={activeTab}
                onChange={(id) => setActiveTab(id as any)}
              />
            </div>

            <div className="flex-1 min-h-[300px]">
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                    {descriptionHtml ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: descriptionHtml,
                        }}
                      />
                    ) : (
                      <p>
                        {product.description ||
                          product.shortDescription ||
                          product.shortDescriptionEn ||
                          t("products.mailerBoxDesc")}
                      </p>
                    )}
                  </div>

                  <div className="mt-8 p-6 rounded-3xl bg-primary/5 border border-primary/10">
                    <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
                      <Paintbrush className="w-5 h-5" />
                      {isTh ? "พร้อมสั่งผลิต?" : "Ready to Customize?"}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {isTh
                        ? "ติดต่อเราเพื่อรับใบเสนอราคาและคำปรึกษาฟรี"
                        : "Contact us for a quote and free consultation on your custom packaging."}
                    </p>
                    <Button className="w-full rounded-xl font-bold translate-y-0 hover:-translate-y-1 transition-transform shadow-lg shadow-primary/20">
                      {t("products.startDesigning")}
                    </Button>
                  </div>
                </motion.div>
              )}

              {activeTab === "materials" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <p className="text-muted-foreground">
                    {isTh
                      ? "วัสดุที่มีคุณภาพสูงที่เราคัดสรรมาเพื่อคุณ"
                      : "High-quality materials selected for your packaging needs."}
                  </p>
                  {product.materials && product.materials.length > 0 ? (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {product.materials.map((m: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border/60 hover:border-primary/40 hover:shadow-soft transition-all"
                        >
                          <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0 text-orange-600">
                            <Box className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-bold text-foreground">
                              {m.material
                                ? isTh
                                  ? m.material.nameTh
                                  : m.material.nameEn
                                : `Material ${m.materialId}`}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              Premium Grade
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 text-muted-foreground italic bg-muted/20 rounded-2xl">
                      {isTh
                        ? "ไม่มีข้อมูลวัสดุ"
                        : "No material information available."}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "standards" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                      <Leaf className="w-5 h-5 text-green-600" />
                      {t("common.sustainability") || "Sustainability"}
                    </h3>
                    {product.sustainability &&
                    product.sustainability.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {product.sustainability.map((s: any, idx: number) => (
                          <SustainabilityIcon key={idx} item={s} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">
                        {isTh
                          ? "ไม่มีข้อมูลความยั่งยืนสำหรับสินค้านี้"
                          : "No specific sustainability information available."}
                      </p>
                    )}
                  </div>

                  <hr className="border-border/50" />

                  <div>
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                      <Award className="w-5 h-5 text-blue-600" />
                      {t("common.certificates") || "Certificates"}
                    </h3>
                    {product.certificates && product.certificates.length > 0 ? (
                      <div className="grid sm:grid-cols-2 gap-4">
                        {product.certificates.map((c: any, idx: number) => (
                          <div
                            key={idx}
                            className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30"
                          >
                            <div className="w-10 h-10 rounded-full bg-white dark:bg-black/20 flex items-center justify-center shadow-sm p-1.5">
                              {(c.certificate as any)?.icon ? (
                                <img
                                  src={(c.certificate as any).icon}
                                  className="w-full h-full object-contain"
                                  alt=""
                                />
                              ) : (
                                <Award className="w-5 h-5 text-blue-600" />
                              )}
                            </div>
                            <span className="font-bold text-sm text-blue-800 dark:text-blue-300">
                              {c.certificate
                                ? isTh
                                  ? c.certificate.nameTh
                                  : c.certificate.nameEn
                                : `Certificate ${c.certificateId}`}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">
                        No specific certificates displayed.
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
