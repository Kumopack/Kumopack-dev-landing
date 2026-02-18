"use client";

import { Factory, MapPin } from "lucide-react";
import { Supplier } from "@/data/suppliers";
import { useLanguage } from "@/context/LanguageContext";

interface SupplierOverviewProps {
  supplier: Supplier;
}

export const SupplierOverview = ({ supplier }: SupplierOverviewProps) => {
  const { language } = useLanguage();

  return (
    <section className="space-y-6 animate-fade-up">
      <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
        <span className="p-2 rounded-xl bg-lavender/50 text-purple-soft">
          <Factory className="w-5 h-5" />
        </span>
        {language === "th" ? (
          <>
            ข้อมูลโรงงาน{" "}
            <span className="text-primary italic">(Factory Overview)</span>
          </>
        ) : (
          <>
            Factory <span className="text-primary italic">Overview</span>
          </>
        )}
      </h2>
      <div className="bg-card/40 backdrop-blur-sm p-6 md:p-8 rounded-[2.5rem] border border-border/50 shadow-soft space-y-8 group hover:bg-card/60 transition-colors duration-500">
        <div className="space-y-4">
          <p className="text-xl md:text-2xl font-black text-foreground/90 leading-tight tracking-tight">
            "{supplier.tagline}"
          </p>
          <div
            className="max-w-none text-muted-foreground leading-relaxed font-medium space-y-4 text-sm [&_p]:mb-3"
            dangerouslySetInnerHTML={{ __html: supplier.description }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Address Info */}
          <div className="lg:col-span-2 flex flex-col justify-center gap-4 p-6 rounded-[2rem] bg-accent/30 border border-border/20 hover:shadow-float transition-all group/loc">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[hsl(var(--glass))] backdrop-blur-md border border-[hsl(var(--glass-border))] flex items-center justify-center shrink-0 shadow-soft group-hover/loc:scale-110 transition-transform">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div className="text-[10px] font-black uppercase text-primary tracking-[0.2em]">
                LOCATION
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-base font-black leading-tight">
                {supplier.address}
              </div>
              <div className="text-xs text-muted-foreground font-bold tracking-tight">
                {supplier.location}, Thailand
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="lg:col-span-3 h-[250px] lg:h-auto min-h-[200px] rounded-[2rem] overflow-hidden border border-border/20 shadow-sm relative bg-neutral-100">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                supplier.address + " " + supplier.location + " Thailand",
              )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              className="absolute inset-0 w-full h-full opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
