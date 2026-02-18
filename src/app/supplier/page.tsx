"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LayoutGrid, List } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

import { getSuppliersList, Supplier } from "@/data/suppliers";
import { useState, useEffect, useCallback } from "react";
import SupplierCard from "@/components/SupplierCard";
import SupplierFilters, { FilterState } from "@/components/SupplierFilters";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function SupplierPage() {
  const { dict } = useLanguage();
  const [supplierList, setSupplierList] = useState<Supplier[]>([]);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 12;

  const [activeFilters, setActiveFilters] = useState<FilterState>({
    search: "",
    location: "All Locations",
    categories: [],
    features: [],
  });

  const fetchSuppliers = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, total } = await getSuppliersList(
        currentPage,
        itemsPerPage,
        activeFilters,
      );
      setSupplierList(data);
      setTotalItems(total);
    } catch (error) {
      console.error("Failed to fetch suppliers", error);
      setSupplierList([]);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, activeFilters]);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setActiveFilters((prev) => {
      if (JSON.stringify(prev) === JSON.stringify(newFilters)) return prev;
      return newFilters;
    });
    setCurrentPage(1);
  }, []);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <main className="min-h-screen bg-neutral-50/50 text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />

      {/* Header Section */}
      <section className="pt-32 pb-12 px-4 md:px-8 bg-white border-b border-neutral-100">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Verified Partners
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-4 tracking-tight">
                {dict.supplier.title.split(" ")[0]}{" "}
                <span className="text-primary">{dict.supplier.trusted}</span>{" "}
                {dict.supplier.title.split(" ")[1] || ""}
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                {dict.supplier.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 md:px-8">
        <div className="container mx-auto max-w-8xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Sidebar Filters (Left Side) */}
            <div className="lg:col-span-1 order-1 lg:order-1">
              <SupplierFilters
                onSearch={() => {}}
                onFilterChange={handleFilterChange}
              />
            </div>

            {/* Main Content (Supplier List) */}
            <div className="lg:col-span-3 order-2 lg:order-2">
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                  Showing {supplierList.length} of {totalItems} Suppliers
                </p>
                <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-neutral-100 shadow-sm">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === "grid"
                        ? "bg-primary/10 text-primary shadow-sm"
                        : "text-muted-foreground hover:bg-neutral-50 hover:text-foreground"
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === "list"
                        ? "bg-primary/10 text-primary shadow-sm"
                        : "text-muted-foreground hover:bg-neutral-50 hover:text-foreground"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {isLoading ? (
                <div className="grid md:grid-cols-2 gap-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-96 rounded-3xl bg-white border border-neutral-100 animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                <TooltipProvider>
                  <div className="space-y-12">
                    {/* List */}
                    <div
                      className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}
                    >
                      {supplierList.map((s, idx) => (
                        <SupplierCard
                          key={s.id}
                          supplier={s}
                          layout={viewMode}
                          index={idx}
                        />
                      ))}
                      {supplierList.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border border-dashed border-neutral-200">
                          <p className="text-muted-foreground font-medium">
                            No suppliers found matching your criteria.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-2">
                        <button
                          disabled={currentPage === 1}
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(1, prev - 1))
                          }
                          className="px-4 py-2 rounded-xl bg-white border border-neutral-200 text-sm font-bold disabled:opacity-50 hover:bg-neutral-50 transition-colors"
                        >
                          Previous
                        </button>
                        <div className="flex items-center gap-1">
                          {[...Array(totalPages)].map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setCurrentPage(i + 1)}
                              className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                                currentPage === i + 1
                                  ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                                  : "bg-white text-muted-foreground hover:bg-neutral-50 border border-neutral-200"
                              }`}
                            >
                              {i + 1}
                            </button>
                          ))}
                        </div>
                        <button
                          disabled={currentPage === totalPages}
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(totalPages, prev + 1),
                            )
                          }
                          className="px-4 py-2 rounded-xl bg-white border border-neutral-200 text-sm font-bold disabled:opacity-50 hover:bg-neutral-50 transition-colors"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </div>
                </TooltipProvider>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
