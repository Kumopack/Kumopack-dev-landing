"use client";

import { Button } from "@/components/ui/button";
import { Package, ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import Link from 'next/link';
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const { dict } = useLanguage();
  return (
    <footer className="py-16 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6">
        {/* CTA Section */}
        <div className="text-center mb-16 pb-16 border-b border-primary-foreground/10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {dict.footer.ctaTitle}
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-8 max-w-xl mx-auto">
            {dict.footer.ctaSubtitle}
          </p>
          <Link href="/pricing">
            <Button
              variant="hero"
              size="xl"
              className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90"
            >
              {dict.footer.ctaButton}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Footer Grid */}
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-primary-foreground/10 flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
              <span className="text-xl font-semibold">Kumopack</span>
            </div>
            <p className="text-primary-foreground/60 text-sm">
              {dict.footer.companyDesc}
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">{dict.footer.products}</h4>
            <ul className="space-y-2 text-primary-foreground/60 text-sm">
              <li><Link href="/products" className="hover:text-primary-foreground transition-colors">{dict.products.mailerBox}</Link></li>
              <li><Link href="/products" className="hover:text-primary-foreground transition-colors">{dict.products.productBox}</Link></li>
              <li><Link href="/products" className="hover:text-primary-foreground transition-colors">{dict.nav.materials}</Link></li>
              <li><Link href="/products" className="hover:text-primary-foreground transition-colors">{dict.nav.marketplace}</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">{dict.footer.company}</h4>
            <ul className="space-y-2 text-primary-foreground/60 text-sm">
              <li><Link href="/about-us" className="hover:text-primary-foreground transition-colors">{dict.nav.contact}</Link></li>
              <li><Link href="/supplier" className="hover:text-primary-foreground transition-colors">{dict.supplier.title}</Link></li>
              <li><Link href="/materials" className="hover:text-primary-foreground transition-colors">{dict.nav.materials}</Link></li>
              <li><Link href="/contact" className="hover:text-primary-foreground transition-colors">{dict.nav.blog}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{dict.footer.contact}</h4>
            <ul className="space-y-3 text-primary-foreground/60 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                hello@kumopack.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +66 2 123 4567
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {dict.footer.address}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
          <p>{dict.footer.allRightsReserved}</p>
          <div className="flex gap-6">
            <Link href="/policy" className="hover:text-primary-foreground transition-colors">{dict.footer.privacyPolicy}</Link>
            <Link href="/policy" className="hover:text-primary-foreground transition-colors">{dict.footer.termsOfService}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
