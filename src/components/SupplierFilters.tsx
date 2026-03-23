"use client";

import { useState, useEffect } from "react";
import { Search, Filter, X, MapPin, Package, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getProvinces, Province } from "@/data/geo";
import { getCategories, getFeatures, TaxonomyOption } from "@/data/taxonomy";
import { useLanguage } from "@/context/LanguageContext";

interface SupplierFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  search: string;
  categories: string[];
  location: string;
  features: string[];
}

export default function SupplierFilters({
  onSearch,
  onFilterChange,
}: SupplierFiltersProps) {
  const { t } = useLanguage();
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    categories: [],
    location: "All Locations",
    features: [],
  });

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<TaxonomyOption[]>([]);
  const [featureOptions, setFeatureOptions] = useState<TaxonomyOption[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getProvinces().then(setProvinces);
    getCategories().then(setCategoryOptions);
    getFeatures().then(setFeatureOptions);
  }, []);

  const toggleCategory = (id: string) => {
    const newCategories = filters.categories.includes(id)
      ? filters.categories.filter((c) => c !== id)
      : [...filters.categories, id];
    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleFeature = (id: string) => {
    const newFeatures = filters.features.includes(id)
      ? filters.features.filter((f) => f !== id)
      : [...filters.features, id];
    const newFilters = { ...filters, features: newFeatures };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const activeFilterCount =
    filters.categories.length +
    filters.features.length +
    (filters.location !== "All Locations" ? 1 : 0) +
    (filters.search ? 1 : 0);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-full flex items-center justify-between p-3 rounded-xl bg-white border border-neutral-200 shadow-sm"
        >
          <div className="flex items-center gap-2 font-bold text-sm">
            <Filter className="w-4 h-4 text-primary" />
            {t("supplier.filters.title")}
            {activeFilterCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-primary text-white rounded-full">
                {activeFilterCount}
              </span>
            )}
          </div>
          <X
            className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? "rotate-0" : "rotate-45"}`}
          />
        </button>

        {}
        <h3 className="hidden lg:flex font-bold text-lg items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          {t("supplier.filters.title")}
        </h3>

        {}
        <div className={`${isOpen ? "block" : "hidden"} lg:block space-y-4`}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("supplier.filters.searchPlaceholder")}
              value={filters.search}
              onChange={(e) => {
                const newFilters = { ...filters, search: e.target.value };
                setFilters(newFilters);
                onSearch(e.target.value);
              }}
              className="w-full pl-9 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {(filters.categories.length > 0 ||
            filters.features.length > 0 ||
            filters.location !== "All Locations" ||
            filters.search !== "") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const reset = {
                  search: "",
                  categories: [],
                  location: "All Locations",
                  features: [],
                };
                setFilters(reset);
                onFilterChange(reset);
                onSearch("");
              }}
              className="w-full text-xs text-muted-foreground hover:text-primary h-8"
            >
              <X className="w-3 h-3 mr-1" />
              {t("supplier.filters.clearAll")}
            </Button>
          )}

          <Accordion
            type="multiple"
            defaultValue={["location", "category", "features"]}
            className="w-full"
          >
            <AccordionItem
              value="location"
              className="border-b-neutral-100 px-5"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  {t("supplier.filters.location")}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="space-y-1">
                  <Select
                    value={filters.location}
                    onValueChange={(value) => {
                      const newFilters = { ...filters, location: value };
                      setFilters(newFilters);
                      onFilterChange(newFilters);
                    }}
                  >
                    <SelectTrigger className="w-full bg-neutral-50 border-neutral-200 h-11">
                      <SelectValue
                        placeholder={t("supplier.filters.selectLocation")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Locations">
                        {t("supplier.filters.allLocations")}
                      </SelectItem>
                      {provinces.map((p) => (
                        <SelectItem key={p.id} value={String(p.id)}>
                          {p.nameEn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="category"
              className="border-b-neutral-100 px-5"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Package className="w-4 h-4 text-primary" />
                  {t("supplier.filters.categories")}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="space-y-3">
                  {categoryOptions.map((cat) => (
                    <div key={cat.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={`cat-${cat.id}`}
                        checked={filters.categories.includes(String(cat.id))}
                        onCheckedChange={() => toggleCategory(String(cat.id))}
                        className="rounded-md border-neutral-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <Label
                        htmlFor={`cat-${cat.id}`}
                        className="text-sm text-foreground font-medium cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {cat.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="features" className="border-none px-5">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Settings2 className="w-4 h-4 text-primary" />
                  {t("supplier.filters.features")}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="space-y-3">
                  {featureOptions.map((feat) => (
                    <div key={feat.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={`feat-${feat.id}`}
                        checked={filters.features.includes(String(feat.id))}
                        onCheckedChange={() => toggleFeature(String(feat.id))}
                        className="rounded-md border-neutral-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <Label
                        htmlFor={`feat-${feat.id}`}
                        className="text-sm text-foreground font-medium cursor-pointer leading-none"
                      >
                        {feat.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {}
      <div className="hidden lg:block bg-gradient-to-br from-primary/5 to-primary/10 rounded-[1.5rem] border border-primary/10 p-5">
        <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          {t("supplier.filters.whyKumopack")}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-4">
          {t("supplier.filters.whyDesc")}
        </p>
        <ul className="space-y-2 text-xs font-medium text-foreground">
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            {t("supplier.filters.verifiedManufacturers")}
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            {t("supplier.filters.qualityControl")}
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            {t("supplier.filters.securePayments")}
          </li>
        </ul>
      </div>
    </div>
  );
}
