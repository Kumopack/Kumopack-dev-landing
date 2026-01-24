"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Package, ChevronDown, BookOpen, Layers, Box, Shield, MessageCircle, Sparkles, GraduationCap } from "lucide-react";
import { auth } from "@/lib/auth";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    setIsMounted(true);
    setIsLoggedIn(auth.isAuthenticated());
  }, []);

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
    }, 150); // Small delay to prevent flickering
    setTimeoutId(id);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 mt-4">
        <div className="container mx-auto px-6 py-3 rounded-3xl bg-[hsl(var(--glass))] backdrop-blur-xl border border-[hsl(var(--glass-border))] shadow-float">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="h-10 w-auto group-hover:scale-105 transition-transform flex items-center">
                <img
                  src="/logo/logo-icon.png"
                  alt="Kumopack Logo"
                  className="h-full w-auto object-contain"
                  style={{ maxHeight: '100%', maxWidth: 'none' }}
                />
              </div>
              <span className="text-xl font-bold text-foreground">Kumopack</span>
            </Link>

            {/* Navigation Items */}
            <div className="hidden lg:flex items-center gap-1">
              {/* For Buyer Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('buyer')}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center gap-1 px-4 py-2 rounded-2xl text-muted-foreground hover:text-foreground hover:bg-mint/20 transition-all duration-200">
                  <span>{t('nav.forBuyer')}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'buyer' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'buyer' && (
                  <div className="absolute top-full left-0 mt-2 w-56 rounded-2xl bg-card/95 backdrop-blur-xl border border-border/50 shadow-float p-2 animate-fade-in">
                    <Link href="/products" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-mint/20 transition-colors">
                      <div className="w-8 h-8 rounded-xl bg-mint/30 flex items-center justify-center">
                        <Box className="w-4 h-4 text-mint-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{t('nav.products')}</div>
                        <div className="text-xs text-muted-foreground">Build your packaging</div>
                      </div>
                    </Link>
                    <Link href="/supplier" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-mint/20 transition-colors">
                      <div className="w-8 h-8 rounded-xl bg-mint/30 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-mint-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Get Quotes</div>
                        <div className="text-xs text-muted-foreground">Compare factory prices</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* For Supplier Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('supplier')}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center gap-1 px-4 py-2 rounded-2xl text-muted-foreground hover:text-foreground hover:bg-sky/20 transition-all duration-200">
                  <span>{t('nav.forSupplier')}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'supplier' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'supplier' && (
                  <div className="absolute top-full left-0 mt-2 w-56 rounded-2xl bg-card/95 backdrop-blur-xl border border-border/50 shadow-float p-2 animate-fade-in">
                    <Link href="/contact" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sky/20 transition-colors">
                      <div className="w-8 h-8 rounded-xl bg-sky/30 flex items-center justify-center">
                        <Package className="w-4 h-4 text-sky-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Join Network</div>
                        <div className="text-xs text-muted-foreground">Become a partner</div>
                      </div>
                    </Link>
                    <Link href="/supplier" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sky/20 transition-colors">
                      <div className="w-8 h-8 rounded-xl bg-sky/30 flex items-center justify-center">
                        <Layers className="w-4 h-4 text-sky-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Supplier Portal</div>
                        <div className="text-xs text-muted-foreground">Manage your listings</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Marketplace with Badge */}
              <Link href="/products" className="relative flex items-center gap-2 px-4 py-2 rounded-2xl text-muted-foreground hover:text-foreground hover:bg-coral/20 transition-all duration-200">
                <span>{t('nav.marketplace')}</span>
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase rounded-full bg-coral text-coral-foreground">
                  New
                </span>
              </Link>


              {/* Kumo's Workshop */}
              <Link href="/about-us" className="px-4 py-2 rounded-2xl text-muted-foreground hover:text-foreground hover:bg-lavender transition-all duration-200">
                {t('nav.workshop')}
              </Link>

              {/* ETC Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('etc')}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center gap-1 px-4 py-2 rounded-2xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200">
                  <span>{t('nav.etc')}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'etc' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'etc' && (
                  <div className="absolute top-full right-0 mt-2 w-[480px] rounded-3xl bg-card/95 backdrop-blur-xl border border-border/50 shadow-float p-6 animate-fade-in">
                    <div className="grid grid-cols-2 gap-4">
                      <ETCCard
                        icon={BookOpen}
                        title={t('nav.blog')}
                        description="Tips, trends, and packaging insights"
                        color="mint"
                        href="/blogs"
                      />
                      <ETCCard
                        icon={GraduationCap}
                        title={t('nav.learning')}
                        description="Step-by-step guides for everyone"
                        color="lavender"
                        href="/learning"
                      />
                      <ETCCard
                        icon={Layers}
                        title={t('nav.materials')}
                        description="Kraft paper, Corrugated, and Films"
                        color="sky"
                        href="/materials"
                      />
                      <ETCCard
                        icon={Box}
                        title={t('nav.products')}
                        description="Deep dive into specifications"
                        color="coral"
                        href="/products"
                      />
                      <ETCCard
                        icon={Shield}
                        title={t('nav.policy')}
                        description="Terms, shipping, and returns"
                        color="lavender"
                        href="/policy"
                      />
                      <div className="col-span-2 grid grid-cols-2 gap-4">
                        <ETCCard
                          icon={MessageCircle}
                          title={t('nav.contact')}
                          description="Get in touch with our team"
                          color="purple"
                          href="/contact"
                        />
                        <ETCCard
                          icon={Sparkles}
                          title={t('nav.events')}
                          description="Exciting activities and rewards"
                          color="coral"
                          href="/events"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="hidden sm:flex p-1 bg-muted/30 rounded-xl mr-2">
                <button
                  onClick={() => setLanguage('th')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${language === 'th' ? "bg-white shadow-soft text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  TH
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${language === 'en' ? "bg-white shadow-soft text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  EN
                </button>
              </div>

              {isMounted && (
                isLoggedIn ? (
                  <>
                    <Link href="/login/selection">
                      <Button variant="hero" size="sm" className="rounded-2xl shadow-glow">
                        {t('common.enterApp')}
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" className="rounded-2xl" onClick={() => auth.logout()}>
                      {t('common.signOut')}
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login/selection">
                      <Button variant="ghost" size="sm" className="rounded-2xl">{t('common.signIn')}</Button>
                    </Link>
                    <Link href="/pricing">
                      <Button variant="hero" size="sm" className="rounded-2xl shadow-soft">{t('common.getStarted')}</Button>
                    </Link>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface ETCCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  color: 'mint' | 'sky' | 'coral' | 'lavender' | 'purple';
  fullWidth?: boolean;
  href: string;
}

const ETCCard = ({ icon: Icon, title, description, color, fullWidth, href }: ETCCardProps) => {
  const colorClasses = {
    mint: 'bg-mint/30 text-mint-foreground hover:bg-mint/40',
    sky: 'bg-sky/30 text-sky-foreground hover:bg-sky/40',
    coral: 'bg-coral/30 text-coral-foreground hover:bg-coral/40',
    lavender: 'bg-lavender/50 text-foreground hover:bg-lavender/70',
    purple: 'bg-primary/20 text-primary hover:bg-primary/30',
  };

  const iconBgClasses = {
    mint: 'bg-mint/50',
    sky: 'bg-sky/50',
    coral: 'bg-coral/50',
    lavender: 'bg-lavender-deep/30',
    purple: 'bg-primary/30',
  };

  return (
    <Link
      href={href}
      className={`group flex items-start gap-4 p-4 rounded-2xl transition-all duration-200 ${colorClasses[color]} ${fullWidth ? '' : ''}`}
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${iconBgClasses[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="font-semibold text-foreground group-hover:text-foreground">{title}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
    </Link>
  );
};

export default Navbar;
