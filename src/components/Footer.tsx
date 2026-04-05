"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import Link from "@/components/common/LocalizedLink";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";
import { Dictionary } from "@/lib/translation";

const Footer = ({ dict }: { dict: Dictionary }) => {
  return (
    <footer className="mt-16 py-8 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="text-center mb-4 pb-4 border-b border-primary-foreground/10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {dict.footer.ctaTitle}
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-8 max-w-4xl mx-auto">
            {dict.footer.ctaSubtitle}
          </p>
          <Link href="/pricing">
            <Button
              variant="hero"
              size="xl"
              className="text-foreground hover:bg-primary-foreground/90"
            >
              {dict.footer.ctaButton}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src={getAssetPath("/logo/logo-icon.png")}
                alt="Kumopack"
                width={36}
                height={36}
                className="rounded-xl"
              />
              <span className="text-xl font-semibold">Kumopack</span>
            </div>
            <p className="text-primary-foreground/60 text-sm">
              {dict.footer.companyDesc}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{dict.footer.products}</h4>
            <ul className="space-y-2 text-primary-foreground/60 text-sm">
              <li>
                <Link
                  href="/products"
                  className="hover:text-primary-foreground transition-colors"
                >
                  {dict.products.mailerBox}
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-primary-foreground transition-colors"
                >
                  {dict.products.productBox}
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-primary-foreground transition-colors"
                >
                  {dict.nav.materials}
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-primary-foreground transition-colors"
                >
                  {dict.nav.marketplace}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{dict.footer.company}</h4>
            <ul className="space-y-2 text-primary-foreground/60 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary-foreground transition-colors"
                >
                  {dict.nav.contact}
                </Link>
              </li>
              <li>
                <Link
                  href="/supplier"
                  className="hover:text-primary-foreground transition-colors"
                >
                  {dict.supplier.title}
                </Link>
              </li>
              <li>
                <Link
                  href="/materials"
                  className="hover:text-primary-foreground transition-colors"
                >
                  {dict.nav.materials}
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="hover:text-primary-foreground transition-colors"
                >
                  {dict.nav.blog}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{dict.footer.contact}</h4>
            <ul className="space-y-3 text-primary-foreground/60 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@kumopack.com"}
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

        <div className="mt-2 pt-2 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
          <p>{dict.footer.allRightsReserved}</p>
          <div className="flex gap-6">
            <Link
              href="/policy"
              className="hover:text-primary-foreground transition-colors"
            >
              {dict.footer.privacyPolicy}
            </Link>
            <Link
              href="/policy"
              className="hover:text-primary-foreground transition-colors"
            >
              {dict.footer.termsOfService}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
