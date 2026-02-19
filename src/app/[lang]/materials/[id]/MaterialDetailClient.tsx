"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "@/components/common/LocalizedLink";
import { useLanguage } from "@/context/LanguageContext";
import { useParams, useLocalizedRouter as useRouter } from "@/hooks/useLocalizedRouter";
import { useState, useEffect } from "react";
import { Material, materialApi, productApi } from "@/lib/product-api";
import { SustainabilityIcon } from "@/components/SustainabilityIcon";
import { SafeImage } from "@/components/ui/safe-image";
import { motion } from "framer-motion";

export default function MaterialDetailClient({
  id: initialId,
}: {
  id?: string;
}) {
  const params = useParams();
  const rawId = params?.id;
  const paramId = Array.isArray(rawId) ? rawId[0] : rawId;

  const id = initialId || paramId;

  const { dict, language } = useLanguage();

  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);

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
    if (!id || id === "undefined") {
      setLoading(false);
      return;
    }

    const fetchMaterial = async () => {
      setLoading(true);
      try {
        const decodedId = decodeURIComponent(id);

        let foundMaterial = await materialApi.getMaterialBySlug(decodedId);

        if (!foundMaterial) {
          console.warn(
            `Material not found by slug '${decodedId}', trying fallback...`,
          );
          try {
            const allMaterials = await materialApi.getAllMaterials(1, 1000);
            foundMaterial =
              allMaterials.data.find(
                (m) =>
                  m.slug === decodedId ||
                  m.nameEn === decodedId ||
                  m.nameTh === decodedId,
              ) || null;
          } catch (err) {
            console.error("Fallback search failed", err);
          }
        }

        if (foundMaterial) {
          setMaterial(foundMaterial);
        } else {
          setMaterial(null);
        }
      } catch (error) {
        console.error("Failed to load material", error);
        setMaterial(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterial();
  }, [id]);

  useEffect(() => {
    if (!material || !material.slug) return;

    const expectedPath = `/materials/${material.slug}`;
    const expectedQuery = `?lang=${language}`;
    const currentPath = window.location.pathname;
    const currentSearch = window.location.search;

    const isPathMismatch =
      decodeURIComponent(currentPath) !== decodeURIComponent(expectedPath);
    const isQueryMismatch = currentSearch !== expectedQuery;

    if (isPathMismatch || isQueryMismatch) {
      window.history.replaceState(null, "", `${expectedPath}${expectedQuery}`);
    }
  }, [material, language]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!material) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <h1 className="text-2xl font-bold">Material not found</h1>
        <Link href="/materials" className="text-primary hover:underline">
          Back to Materials
        </Link>
      </div>
    );
  }

  const shortDesc = isTh
    ? material.shortDescription || ""
    : material.shortDescriptionEn || material.shortDescription || "";

  const longDesc = isTh
    ? material.longDescription || ""
    : material.longDescriptionEn || material.longDescription || "";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-32 px-4 md:px-8 max-w-7xl mx-auto pb-24">
        <div className="mb-12">
          <Link
            href={`/materials?lang=${language}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("materials.back")}
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square relative rounded-[3rem] overflow-hidden bg-muted/20 border border-border/50 shadow-float"
          >
            <SafeImage
              src={materialApi.getMaterialImage(
                material.featurePicturePath || "",
              )}
              alt={isTh ? material.nameTh : material.nameEn}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                {isTh ? material.nameTh : material.nameEn}
              </h1>

              {/* Short Description */}
              {shortDesc && (
                <p className="text-xl md:text-2xl font-medium text-muted-foreground mb-8 leading-relaxed">
                  {shortDesc}
                </p>
              )}

              {/* Long Description */}
              <div className="prose prose-lg dark:prose-invert text-muted-foreground leading-relaxed">
                {longDesc ? (
                  <div dangerouslySetInnerHTML={{ __html: longDesc }} />
                ) : (
                  <p className="text-muted-foreground/50 italic">
                    {isTh
                      ? "ไม่มีรายละเอียดเพิ่มเติม"
                      : "No additional description available."}
                  </p>
                )}
              </div>
            </div>

            {material.sustainability && material.sustainability.length > 0 && (
              <div className="pt-8 border-t border-border/40">
                <h3 className="font-bold text-xl mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-green-500 rounded-full shadow-glow"></span>
                  {isTh ? "ความยั่งยืน" : "Sustainability"}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {material.sustainability.map((item: any, idx: number) => (
                    <SustainabilityIcon key={idx} item={item} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Products Section - Full Width Bottom */}
        {material.products && material.products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-12 border-t border-border/40"
          >
            <h3 className="font-bold text-2xl mb-8 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-primary rounded-full shadow-glow"></span>
              {isTh ? "สินค้าที่ใช้วัสดุนี้" : "Products using this material"}
            </h3>

            <div className="relative group/carousel">
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted/30 hover:scrollbar-thumb-muted/60">
                {material.products.map((item: any, idx: number) => {
                  const p = item.product;
                  if (!p) return null;
                  return (
                    <Link
                      key={idx}
                      href={`/products/${p.slug}?lang=${language}`}
                      className="snap-start min-w-[180px] w-[180px] flex-shrink-0 group block p-4 rounded-3xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-float hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="aspect-square relative rounded-2xl overflow-hidden bg-muted mb-4 border border-border/20">
                        <SafeImage
                          src={productApi.getProductImage(p.featurePicturePath)}
                          alt={isTh ? p.nameTh : p.nameEn}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-base group-hover:text-primary transition-colors line-clamp-1">
                          {isTh ? p.nameTh : p.nameEn}
                        </h4>
                        <p className="text-xs text-muted-foreground font-medium bg-muted/50 px-2 py-0.5 rounded-md w-fit">
                          {p.code}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </section>
      <Footer />
    </main>
  );
}
