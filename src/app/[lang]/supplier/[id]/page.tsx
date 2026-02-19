import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "@/components/common/LocalizedLink";
import { suppliers, getSupplierData } from "@/data/suppliers";
import { SupplierHero } from "@/components/supplier/SupplierHero";
import { SupplierOverview } from "@/components/supplier/SupplierOverview";
import { SupplierStats } from "@/components/supplier/SupplierStats";
import { SupplierCapabilities } from "@/components/supplier/SupplierCapabilities";
import { SupplierPortfolio } from "@/components/supplier/SupplierPortfolio";
import { SupplierGallery } from "@/components/supplier/SupplierGallery";
import { SupplierActionCenter } from "@/components/supplier/SupplierActionCenter";

import { notFound } from "next/navigation";
import { Supplier } from "@/data/suppliers";

export const dynamicParams = false;

export default async function SupplierDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supplier = await getSupplierData(id);

  if (!supplier) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-32 pb-24 overflow-x-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <Link
            href="/supplier"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-12 group"
          >
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
            Back to Suppliers
          </Link>

          <SupplierHero supplier={supplier} />

          <div className="grid lg:grid-cols-12 gap-12 mt-12 md:mt-32">
            <div className="lg:col-span-8 space-y-24">
              <SupplierOverview supplier={supplier} />
              <SupplierStats stats={supplier.stats} />
              <SupplierCapabilities features={supplier.features} />
              <SupplierPortfolio categories={supplier.categories} />
              <SupplierGallery gallery={supplier.gallery} />
            </div>

            <SupplierActionCenter supplier={supplier} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export async function generateStaticParams() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT || "https://api.kumopack.com/v1"}/supplier?limit=24`,
    );
    const data = await response.json();
    const apiSuppliers = data?.data || [];

    const allSlugs = new Set([
      ...apiSuppliers.map((s: any) => String(s.slug || s.id)),
      ...suppliers.map((s) => s.id),
    ]);

    return Array.from(allSlugs).map((id) => ({
      id: String(id),
    }));
  } catch (error) {
    return suppliers.map((s) => ({ id: s.id }));
  }
}
