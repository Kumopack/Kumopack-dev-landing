"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "@/components/common/LocalizedLink";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Package,
  ChevronDown,
  BookOpen,
  Layers,
  Box,
  Shield,
  MessageCircle,
  Sparkles,
  GraduationCap,
  Menu,
  X,
  Info,
  CreditCard,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { getAssetPath } from "@/lib/utils";
import { useLanguageSwitcher } from "./LanguageSwitcher";
import EventsNavCard from "@/components/EventsNavCard";
import WorkshopNavLink from "@/components/WorkshopNavLink";

// Subscribe to storage events so auth state stays in sync across tabs
const subscribeToAuth = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};
const getAuthSnapshot = () => auth.isAuthenticated();
const getAuthServerSnapshot = (): boolean | null => null;

const Navbar = ({ lang, dict }: { lang: string; dict: unknown }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const isLoggedIn = useSyncExternalStore(subscribeToAuth, getAuthSnapshot, getAuthServerSnapshot);
  const { switchLanguage } = useLanguageSwitcher(lang);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const t = (path: string) => (path.split('.').reduce((obj: unknown, key) => (obj as Record<string, unknown>)?.[key], dict) as string) || path;

  const handleMouseEnter = (menu: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
    setTimeoutId(id);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-2 md:mx-4 mt-3 md:mt-4">
        <div className="container mx-auto px-3 md:px-6 py-3 rounded-3xl bg-[hsl(var(--glass))] backdrop-blur-xl border border-[hsl(var(--glass-border))] shadow-float">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="h-10 w-auto group-hover:scale-105 transition-transform flex items-center">
                <Image
                  src={getAssetPath("/logo/logo-icon.png")}
                  alt="Kumopack Logo"
                  width={40}
                  height={40}
                  className="h-full w-auto object-contain"
                  priority
                />
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("buyer")}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center gap-1 px-4 py-2 rounded-2xl text-muted-foreground hover:text-foreground hover:bg-mint/20 transition-all duration-200">
                  <span>{t("nav.forBuyer")}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "buyer" ? "rotate-180" : ""}`}
                  />
                </button>
                {activeDropdown === "buyer" && (
                  <div className="absolute top-full left-0 mt-2 w-56 rounded-2xl bg-card/95 backdrop-blur-xl border border-border/50 shadow-float p-2 animate-fade-in">
                    <Link
                      href="/products"
                      prefetch={false}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-mint/20 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl bg-mint/30 flex items-center justify-center">
                        <Box className="w-4 h-4 text-mint-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">
                          {t("nav.products")}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {t("nav.desc.products")}
                        </div>
                      </div>
                    </Link>
                    <Link
                      href="/supplier"
                      prefetch={false}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-mint/20 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl bg-mint/30 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-mint-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">
                          {t("nav.getQuotes")}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {t("nav.desc.getQuotes")}
                        </div>
                      </div>
                    </Link>
                    <Link
                      href="/learning?audience=buyer"
                      prefetch={false}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-mint/20 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl bg-mint/30 flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-mint-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">
                          {t("nav.learning")}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {t("nav.desc.learningBuyer")}
                        </div>
                      </div>
                    </Link>
                    <Link
                      href="/pricing?type=buyer"
                      prefetch={false}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-mint/20 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl bg-mint/30 flex items-center justify-center">
                        <div className="font-bold text-mint-foreground text-xs">
                          ฿
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">
                          {t("pricing.title")}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {t("nav.desc.pricing")}
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("supplier")}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center gap-1 px-4 py-2 rounded-2xl text-muted-foreground hover:text-foreground hover:bg-sky/20 transition-all duration-200">
                  <span>{t("nav.forSupplier")}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "supplier" ? "rotate-180" : ""}`}
                  />
                </button>
                {activeDropdown === "supplier" && (
                  <div className="absolute top-full left-0 mt-2 w-56 rounded-2xl bg-card/95 backdrop-blur-xl border border-border/50 shadow-float p-2 animate-fade-in">
                    <Link
                      href="/contact"
                      prefetch={false}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sky/20 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl bg-sky/30 flex items-center justify-center">
                        <Package className="w-4 h-4 text-sky-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">
                          {t("nav.joinNetwork")}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {t("nav.desc.joinNetwork")}
                        </div>
                      </div>
                    </Link>
                    <Link
                      href="/learning?audience=supplier"
                      prefetch={false}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sky/20 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl bg-sky/30 flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-sky-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">
                          {t("nav.learning")}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {t("nav.desc.learningSupplier")}
                        </div>
                      </div>
                    </Link>
                    <Link
                      href="/pricing?type=supplier"
                      prefetch={false}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sky/20 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl bg-sky/30 flex items-center justify-center">
                        <div className="font-bold text-sky-foreground text-xs">
                          ฿
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">
                          {lang === "th"
                            ? "แพ็กเกจราคา"
                            : "Pricing Packages"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {t("nav.desc.pricingSupplier")}
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* 
              <Link href="/products" className="relative flex items-center gap-2 px-4 py-2 rounded-2xl text-muted-foreground hover:text-foreground hover:bg-coral/20 transition-all duration-200">
                <span>{t('nav.marketplace')}</span>
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase rounded-full bg-coral text-coral-foreground">
                  New
                </span>
              </Link>
              */}

              <WorkshopNavLink />

              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("etc")}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center gap-1 px-4 py-2 rounded-2xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200">
                  <span>{t("nav.etc")}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "etc" ? "rotate-180" : ""}`}
                  />
                </button>
                {activeDropdown === "etc" && (
                  <div className="absolute top-full right-0 mt-2 w-[480px] rounded-3xl bg-card/95 backdrop-blur-xl border border-border/50 shadow-float p-6 animate-fade-in">
                    <div className="col-span-2 mb-4">
                      <ETCCard
                        icon={BookOpen}
                        title={t("nav.blog")}
                        description={t("nav.desc.blog")}
                        color="mint"
                        href="/blogs"
                      />{" "}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <ETCCard
                        icon={Layers}
                        title={t("nav.materials")}
                        description={t("nav.desc.materials")}
                        color="sky"
                        href="/materials"
                      />
                      <ETCCard
                        icon={Box}
                        title={t("nav.products")}
                        description={t("nav.desc.productsDetail")}
                        color="amber"
                        href="/products"
                      />
                      <ETCCard
                        icon={Shield}
                        title={t("nav.policy")}
                        description={t("nav.desc.policy")}
                        color="rose"
                        href="/policy"
                      />
                      <ETCCard
                        icon={Package}
                        title={t("nav.faq")}
                        description={t("nav.desc.faq")}
                        color="teal"
                        href="/faq"
                      />
                      <div className="col-span-2 grid grid-cols-2 grid-rows-2 gap-4">
                        <ETCCard
                          icon={MessageCircle}
                          title={t("nav.contact")}
                          description={t("nav.desc.contact")}
                          color="purple"
                          href="/contact"
                        />
                        <div className="row-span-2">
                          <EventsNavCard />
                        </div>
                        <ETCCard
                          icon={Info}
                          title={t("nav.aboutUs") || "About Us"}
                          description={
                            t("nav.desc.aboutUs") ||
                            "Learn about our story and team"
                          }
                          color="lavender"
                          href="/about-us"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:hidden flex items-center gap-3">
              <div className="flex p-1 bg-muted/30 rounded-xl">
                <button
                  onClick={() => switchLanguage(lang === "th" ? "en" : "th")}
                  className="px-3 py-1 text-xs font-bold text-primary"
                >
                  {lang.toUpperCase()}
                </button>
              </div>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl bg-muted/30 text-foreground"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <div className="hidden sm:flex p-1 bg-muted/30 rounded-xl mr-2">
                <button
                  onClick={() => switchLanguage("th")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${lang === "th" ? "bg-white shadow-soft text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  TH
                </button>
                <button
                  onClick={() => switchLanguage("en")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${lang === "en" ? "bg-white shadow-soft text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  EN
                </button>
              </div>

              {isLoggedIn !== null &&
                (isLoggedIn ? (
                  <>
                    <Link href="/login/selection">
                      <Button
                        variant="hero"
                        size="sm"
                        className="rounded-2xl shadow-glow"
                      >
                        {t("common.enterApp")}
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-2xl"
                      onClick={() => auth.logout()}
                    >
                      {t("common.signOut")}
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login/selection">
                      <Button variant="ghost" size="sm" className="rounded-2xl">
                        {t("common.signIn")}
                      </Button>
                    </Link>
                    <Link href="/pricing">
                      <Button
                        variant="hero"
                        size="sm"
                        className="rounded-2xl shadow-soft"
                      >
                        {t("common.getStarted")}
                      </Button>
                    </Link>
                  </>
                ))}
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-2 p-5 rounded-3xl bg-card/95 backdrop-blur-xl border border-border/50 shadow-float animate-in slide-in-from-top-4 duration-300 overflow-y-auto max-h-[80vh]">
            <div className="flex flex-col gap-1">
              {}
              <a
                href={
                  process.env.NEXT_PUBLIC_MOCKUP_SITE_URL ||
                  "https://mockup.kumopack.com"
                }
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="relative flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-amber-400/15 via-orange-400/10 to-pink-400/15 border border-amber-300/30 mb-3"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm">{t("nav.workshop")}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {t("nav.desc.workshop") || "ออกแบบกล่อง 3D แบบเรียลไทม์"}
                  </div>
                </div>
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                </span>
              </a>

              {}
              <div className="px-3 py-2 text-[10px] font-black text-primary tracking-widest uppercase opacity-60">
                {t("nav.forBuyer")}
              </div>
              <Link
                href="/products"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-2xl hover:bg-accent/50 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Box className="w-4 h-4 text-amber-600" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">
                    {t("nav.products")}
                  </div>
                </div>
              </Link>
              <Link
                href="/supplier"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-2xl hover:bg-accent/50 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-mint/30 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-mint-foreground" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">
                    {t("nav.getQuotes")}
                  </div>
                </div>
              </Link>
              <Link
                href="/pricing"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-2xl hover:bg-accent/50 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">
                    {t("nav.pricing")}
                  </div>
                </div>
              </Link>

              {}
              <div className="px-3 py-2 mt-2 text-[10px] font-black text-primary tracking-widest uppercase opacity-60">
                {t("nav.forSupplier")}
              </div>
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-2xl hover:bg-accent/50 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-sky/30 flex items-center justify-center">
                  <Package className="w-4 h-4 text-sky-foreground" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">
                    {t("nav.joinNetwork")}
                  </div>
                </div>
              </Link>
              <Link
                href="/learning?audience=supplier"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-2xl hover:bg-accent/50 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">
                    {t("nav.learning")}
                  </div>
                </div>
              </Link>

              {}
              <div className="px-3 py-2 mt-2 text-[10px] font-black text-muted-foreground tracking-widest uppercase opacity-60">
                {t("nav.etc")}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/blogs"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2.5 p-3 rounded-2xl hover:bg-accent/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="font-semibold text-sm">{t("nav.blog")}</span>
                </Link>
                <Link
                  href="/materials"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2.5 p-3 rounded-2xl hover:bg-accent/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center">
                    <Layers className="w-3.5 h-3.5 text-sky-600" />
                  </div>
                  <span className="font-semibold text-sm">
                    {t("nav.materials")}
                  </span>
                </Link>
                <Link
                  href="/faq"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2.5 p-3 rounded-2xl hover:bg-accent/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                    <Package className="w-3.5 h-3.5 text-teal-600" />
                  </div>
                  <span className="font-semibold text-sm">{t("nav.faq")}</span>
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2.5 p-3 rounded-2xl hover:bg-accent/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                    <MessageCircle className="w-3.5 h-3.5 text-purple-600" />
                  </div>
                  <span className="font-semibold text-sm">
                    {t("nav.contact")}
                  </span>
                </Link>
                <Link
                  href="/policy"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2.5 p-3 rounded-2xl hover:bg-accent/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
                    <Shield className="w-3.5 h-3.5 text-rose-600" />
                  </div>
                  <span className="font-semibold text-sm">
                    {t("nav.policy")}
                  </span>
                </Link>
                <Link
                  href="/about-us"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2.5 p-3 rounded-2xl hover:bg-accent/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <Info className="w-3.5 h-3.5 text-indigo-600" />
                  </div>
                  <span className="font-semibold text-sm">
                    {t("nav.aboutUs") || "About Us"}
                  </span>
                </Link>
              </div>

              {}
              <Link
                href="/events"
                onClick={() => setIsMenuOpen(false)}
                className="mt-3 flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-orange-400/15 via-pink-400/10 to-purple-400/15 border border-coral/20"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm">{t("nav.events")}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {t("nav.desc.events")}
                  </div>
                </div>
              </Link>

              {}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-border/30">
                <Link
                  href="/login/selection"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full"
                >
                  <Button
                    variant="ghost"
                    className="w-full h-12 rounded-2xl font-bold"
                  >
                    {t("common.signIn")}
                  </Button>
                </Link>
                <Link
                  href="/pricing"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full"
                >
                  <Button
                    variant="hero"
                    className="w-full h-12 rounded-2xl font-bold shadow-soft"
                  >
                    {t("common.getStarted")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

interface ETCCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  color:
    | "mint"
    | "sky"
    | "coral"
    | "lavender"
    | "purple"
    | "amber"
    | "rose"
    | "teal";
  fullWidth?: boolean;
  href: string;
  className?: string;
}

const ETCCard = ({
  icon: Icon,
  title,
  description,
  color,
  fullWidth,
  href,
  className,
}: ETCCardProps) => {
  const colorClasses = {
    mint: "bg-mint/30 text-mint-foreground hover:bg-mint/40",
    sky: "bg-sky/30 text-sky-foreground hover:bg-sky/40",
    coral: "bg-coral/30 text-coral-foreground hover:bg-coral/40",
    lavender: "bg-lavender/50 text-foreground hover:bg-lavender/70",
    purple: "bg-primary/20 text-primary hover:bg-primary/30",
    amber: "bg-amber-100/60 text-amber-800 hover:bg-amber-100/80",
    rose: "bg-rose-100/60 text-rose-700 hover:bg-rose-100/80",
    teal: "bg-teal-100/60 text-teal-700 hover:bg-teal-100/80",
  };

  const iconBgClasses = {
    mint: "bg-mint/50",
    sky: "bg-sky/50",
    coral: "bg-coral/50",
    lavender: "bg-lavender-deep/30",
    purple: "bg-primary/30",
    amber: "bg-amber-200/60",
    rose: "bg-rose-200/60",
    teal: "bg-teal-200/60",
  };

  return (
    <Link
      href={href}
      className={`group flex items-start gap-4 p-4 rounded-2xl transition-all duration-200 ${colorClasses[color]} ${fullWidth ? "" : ""} ${className || ""}`}
    >
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${iconBgClasses[color]}`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="font-semibold text-foreground group-hover:text-foreground">
          {title}
        </div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
    </Link>
  );
};

export default Navbar;
