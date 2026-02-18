"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./pricing.module.scss";
import { pricingService } from "@/services/pricingService";
import {
  transformApiDataToPricingInfo,
  TransformedPricingPlan,
} from "@/utils/pricingDataTransformer";
import {
  getBuyerPlanFeatures,
  getSupplierPlanFeatures,
  getBuyerPriceInfo,
  getSupplierPriceInfo,
} from "./data/PricingData";
import { checkLoginStatus } from "@/lib/cookie-auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface HeroSectionProps {
  pricingType: string;
  billingPlan: string;
  handleBillingPlanChange: (plan: string) => void;
  LANG: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  pricingType,
  billingPlan,
  handleBillingPlanChange,
  LANG,
}) => (
  <section className={styles.pricingHeroSection}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.pricingBadge}>
        {pricingType === "buyer"
          ? LANG.PRICING.BADGE.BUYER
          : LANG.PRICING.BADGE.SUPPLIER}
      </div>
      <h1 className={styles.pricingTitle}>{LANG.PRICING.HERO.TITLE}</h1>
      <p className={styles.pricingSubtitle}>{LANG.PRICING.HERO.SUBTITLE}</p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className={styles.pricingBillingToggle}>
        <button
          className={`${styles.pricingToggleBtn} ${billingPlan === "monthly" ? styles.active : styles.inactive}`}
          onClick={() => handleBillingPlanChange("monthly")}
        >
          {LANG.PRICING.TOGGLE.MONTHLY}
        </button>
        <button
          className={`${styles.pricingToggleBtn} ${billingPlan === "annual" ? styles.active : styles.inactive}`}
          onClick={() => handleBillingPlanChange("annual")}
        >
          {LANG.PRICING.TOGGLE.ANNUAL}
          <span className={styles.pricingSavingsBadge}>
            {LANG.PRICING.TOGGLE.SAVINGS}
          </span>
        </button>
      </div>
    </motion.div>
  </section>
);

interface PricingCardProps {
  plan: TransformedPricingPlan;
  planKey: string;
  billingPlan: string;
  index: number;
  onSelectPlan: (plan: any) => void;
  LANG: any;
}

const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  planKey,
  billingPlan,
  index,
  onSelectPlan,
  LANG,
}) => {
  const calculateSavings = (monthlyPrice: any, annualPrice: any) => {
    if (monthlyPrice === "FREE" || annualPrice === "FREE") return null;
    const monthly =
      typeof monthlyPrice === "string"
        ? parseFloat(monthlyPrice.replace(/,/g, ""))
        : monthlyPrice;
    const annual =
      typeof annualPrice === "string"
        ? parseFloat(annualPrice.replace(/,/g, ""))
        : annualPrice;

    if (isNaN(monthly) || isNaN(annual)) return null;

    const expectedAnnual = monthly * 12;
    const savings = expectedAnnual - annual;
    return savings > 0 ? Math.round((savings / expectedAnnual) * 100) : null;
  };

  const getCurrentPrice = () => {
    if (billingPlan === "annual") {
      return plan.annualPrice || (plan as any).price;
    }
    return plan.monthlyPrice || (plan as any).price;
  };

  const formatPrice = (price: any) => {
    if (price === "FREE" || price === 0 || price === "0")
      return { amount: "FREE", currency: "", period: "" };
    const numPrice =
      typeof price === "string" ? parseFloat(price.replace(/,/g, "")) : price;
    return {
      amount: numPrice.toLocaleString("th-TH"),
      currency: LANG.PRICING.PRICE.CURRENCY,
      period:
        billingPlan === "monthly"
          ? LANG.PRICING.PRICE.PER_MONTH
          : LANG.PRICING.PRICE.PER_YEAR,
    };
  };

  const currentPrice = getCurrentPrice();
  const priceData = formatPrice(currentPrice);
  const savings =
    billingPlan === "annual"
      ? calculateSavings(plan.monthlyPrice, plan.annualPrice)
      : null;
  const originalPrice =
    billingPlan === "annual" && plan.monthlyPrice !== "FREE"
      ? (typeof plan.monthlyPrice === "string"
          ? parseFloat(plan.monthlyPrice.replace(/,/g, ""))
          : plan.monthlyPrice) * 12
      : null;

  const handleSelectPlan = () => {
    const planData = {
      planKey,
      billingPlan,
      price: currentPrice,
      originalPlan: plan,
    };
    onSelectPlan(planData);
  };

  return (
    <motion.div
      className={`${styles.pricingCard} ${plan.isPopular ? styles.popular : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      {plan.isPopular && (
        <div className={styles.pricingPopularBadge}>
          {LANG.PRICING.BUTTONS.RECOMMENDED}
        </div>
      )}

      <div className={styles.pricingPlanName}>{plan.title}</div>
      <div className={styles.pricingPlanDescription}>{plan.description}</div>

      <div className={styles.pricingPriceContainer}>
        <div className={styles.pricingPriceMain}>
          {priceData.currency && (
            <span className={styles.pricingCurrency}>{priceData.currency}</span>
          )}
          <span
            className={`${styles.pricingAmount} ${priceData.amount === "FREE" ? styles.free : ""}`}
          >
            {priceData.amount}
          </span>
          {priceData.period && (
            <span className={styles.pricingPeriod}>{priceData.period}</span>
          )}
        </div>

        {originalPrice !== null && savings && (
          <div className={styles.pricingPriceOriginal}>
            <span className={styles.pricingOriginalAmount}>
              {LANG.PRICING.PRICE.CURRENCY}
              {originalPrice.toLocaleString("th-TH")}
              {LANG.PRICING.PRICE.PER_YEAR}
            </span>
            <span className={styles.pricingSavings}>
              {LANG.PRICING.PRICE.SAVE_PERCENT.replace("{percent}", savings)}
            </span>
          </div>
        )}
      </div>

      <button
        className={`${styles.pricingCtaButton} ${plan.isPopular ? styles.primary : styles.secondary}`}
        onClick={handleSelectPlan}
      >
        {currentPrice === "FREE"
          ? LANG.PRICING.BUTTONS.GET_STARTED_FREE
          : LANG.PRICING.BUTTONS.GET_STARTED}
      </button>
    </motion.div>
  );
};

const FeaturesTable = ({ priceInfo, planFeatures, LANG }: any) => {
  if (!planFeatures || planFeatures.length === 0) return null;

  return (
    <section className={styles.pricingFeatureSection}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className={styles.pricingFeaturesTitle}>
          {LANG.PRICING.FEATURES.TITLE}
        </h2>

        <div className={styles.pricingFeaturesGrid}>
          <div className={styles.pricingFeaturesHeader}>
            <div className={styles.pricingHeaderCell}>
              {LANG.PRICING.FEATURES.HEADER}
            </div>
            {Object.keys(priceInfo).map((key) => (
              <div
                key={key}
                className={`${styles.pricingHeaderCell} ${styles.pricingPlanHeader}`}
              >
                {priceInfo[key].title}
              </div>
            ))}
          </div>

          {planFeatures.map((category: any) => (
            <React.Fragment key={category.title}>
              {category.features?.map((feature: any) => (
                <div key={feature.key} className={styles.pricingFeatureRow}>
                  <div className={styles.pricingFeatureName}>
                    {feature.title}
                  </div>

                  <div className={styles.pricingFeatureValue}>
                    {feature.standard?.status ? (
                      feature.standard?.word ? (
                        <span className={styles.pricingFeatureText}>
                          {feature.standard.word}
                        </span>
                      ) : (
                        <div className={styles.pricingCheckIcon}>✓</div>
                      )
                    ) : (
                      <div className={styles.pricingCrossIcon}>✕</div>
                    )}
                  </div>

                  <div className={styles.pricingFeatureValue}>
                    {feature.business?.status ? (
                      feature.business?.word ? (
                        <span className={styles.pricingFeatureText}>
                          {feature.business.word}
                        </span>
                      ) : (
                        <div className={styles.pricingCheckIcon}>✓</div>
                      )
                    ) : (
                      <div className={styles.pricingCrossIcon}>✕</div>
                    )}
                  </div>

                  <div className={styles.pricingFeatureValue}>
                    {feature.enterprise?.status ? (
                      feature.enterprise?.word ? (
                        <span className={styles.pricingFeatureText}>
                          {feature.enterprise.word}
                        </span>
                      ) : (
                        <div className={styles.pricingCheckIcon}>✓</div>
                      )
                    ) : (
                      <div className={styles.pricingCrossIcon}>✕</div>
                    )}
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const TabSwitcher = ({
  currentType,
  onSwitch,
  LANG,
}: {
  currentType: string;
  onSwitch: (type: string) => void;
  LANG: any;
}) => (
  <div className="flex justify-center mb-8">
    <div className="bg-white/50 backdrop-blur-md p-1 rounded-full border border-white/40 shadow-sm inline-flex">
      <button
        onClick={() => onSwitch("buyer")}
        className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
          currentType === "buyer"
            ? "bg-gradient-to-r from-[#76b3cf] to-[#b15fce] text-white shadow-md"
            : "text-gray-500 hover:text-gray-700 hover:bg-white/30"
        }`}
      >
        {LANG.PRICING.BADGE.BUYER}
      </button>
      <button
        onClick={() => onSwitch("supplier")}
        className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
          currentType === "supplier"
            ? "bg-gradient-to-r from-[#76b3cf] to-[#b15fce] text-white shadow-md"
            : "text-gray-500 hover:text-gray-700 hover:bg-white/30"
        }`}
      >
        {LANG.PRICING.BADGE.SUPPLIER}
      </button>
    </div>
  </div>
);

const ensureStandardPackage = (
  transformedData: any,
  pricingType: string,
  LANG: any,
) => {
  const result = { ...transformedData };

  if (!result.standard && !result.free) {
    result.standard = {
      id: "standard-generated",
      title: LANG.PRICING.PLANS.STANDARD.TITLE,
      monthlyPrice: "FREE",
      annualPrice: "FREE",
      description:
        pricingType === "buyer"
          ? LANG.PRICING.PLANS.STANDARD.DESCRIPTION
          : LANG.PRICING.PLANS.STANDARD.DESCRIPTION,
      isPopular: false,
      isActive: true,
    };
  }

  if (!result.plus && !result.business) {
    const existingKeys = Object.keys(result);
    const businessKey = existingKeys.find(
      (key) =>
        key.includes("business") ||
        key.includes("plus") ||
        result[key].title?.toLowerCase().includes("business") ||
        result[key].title?.toLowerCase().includes("plus"),
    );

    if (businessKey && businessKey !== "plus") {
      result.plus = result[businessKey];
      delete result[businessKey];
    }
  }

  if (!result.pro && !result.enterprise) {
    const existingKeys = Object.keys(result);
    const enterpriseKey = existingKeys.find(
      (key) =>
        key.includes("enterprise") ||
        key.includes("pro") ||
        result[key].title?.toLowerCase().includes("enterprise") ||
        result[key].title?.toLowerCase().includes("pro"),
    );

    if (enterpriseKey && enterpriseKey !== "pro") {
      result.pro = result[enterpriseKey];
      delete result[enterpriseKey];
    }
  }

  const orderedResult: any = {};
  if (result.standard) orderedResult.standard = result.standard;
  if (result.plus) orderedResult.plus = result.plus;
  if (result.pro) orderedResult.pro = result.pro;

  Object.keys(result).forEach((key) => {
    if (!orderedResult[key]) {
      orderedResult[key] = result[key];
    }
  });

  return orderedResult;
};

import { Suspense } from "react";
import { Loader2 } from "lucide-react";

function PricingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pricingType = searchParams?.get("type") || "buyer";

  const isValidType = ["buyer", "supplier"].includes(pricingType);

  const [billingPlan, setBillingPlan] = useState("monthly");
  const [apiData, setApiData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useApiData, setUseApiData] = useState(true);

  const { t, language } = useLanguage();

  const LANG = useMemo(() => {
    return {
      PRICING: {
        BADGE: {
          BUYER: t("pricing.badge.buyer"),
          SUPPLIER: t("pricing.badge.supplier"),
        },
        HERO: {
          TITLE: t("pricing.hero.title"),
          SUBTITLE: t("pricing.hero.subtitle"),
        },
        TOGGLE: {
          MONTHLY: t("pricing.toggle.monthly"),
          ANNUAL: t("pricing.toggle.annual"),
          SAVINGS: t("pricing.toggle.savings"),
        },
        BUTTONS: {
          RECOMMENDED: t("pricing.recommended"),
          GET_STARTED: t("pricing.getStarted"),
          GET_STARTED_FREE: t("pricing.getStartedFree"),
        },
        PRICE: {
          CURRENCY: "฿",
          PER_MONTH: t("pricing.perMonth"),
          PER_YEAR: t("pricing.perYear"),
          SAVE_PERCENT: t("pricing.savePercent"),
        },
        FEATURES: {
          TITLE: t("pricing.features.title"),
          HEADER: t("pricing.features.header"),
        },

        BUYER_FEATURES: {
          CATEGORIES: {
            OVERVIEW: t("pricing.features.categories.overview"),
            WORK: t("pricing.features.categories.work"),
          },
          FEATURES: {
            requestQuotation: { TITLE: "Request Quotation", TOOLTIP: "" },
            factorySelection: { TITLE: "Factory Selection", TOOLTIP: "" },
            extraKumocoin: { TITLE: "Extra Kumocoin", TOOLTIP: "" },
            freeCoupon: { TITLE: "Free Coupon", TOOLTIP: "" },
            factoryFiltering: { TITLE: "Factory Filtering", TOOLTIP: "" },
            showingAdvantage: { TITLE: "Showing Advantage", TOOLTIP: "" },
            tranferBanking: { TITLE: "Transfer & Banking", TOOLTIP: "" },
            directMessage: { TITLE: "Direct Message", TOOLTIP: "" },
            numberOfInquiry: { TITLE: "Number of Inquiry", TOOLTIP: "" },
            realTimeStatus: { TITLE: "Real Time Status", TOOLTIP: "" },
            emailNotification: { TITLE: "Email Notification", TOOLTIP: "" },
            users: { TITLE: "Users", TOOLTIP: "" },
            createDieline: { TITLE: "Create Dieline", TOOLTIP: "" },
            dielineDownloadable: { TITLE: "Dieline Downloadable", TOOLTIP: "" },
            designOnlineMockup: { TITLE: "Design Online Mockup", TOOLTIP: "" },
            AiPdfDownloadable: { TITLE: "AI/PDF Downloadable", TOOLTIP: "" },
            "3Dmodeling": { TITLE: "3D Modeling", TOOLTIP: "" },
            render3Dmodeling: { TITLE: "Render 3D Modeling", TOOLTIP: "" },
          },
        },
        SUPPLIER_FEATURES: {
          CATEGORIES: {
            OVERVIEW: t("pricing.features.categories.overview"),
            REPORTING: t("pricing.features.categories.reporting"),
          },
          FEATURES: {
            showingAdvantage: { TITLE: "Showing Advantage", TOOLTIP: "" },
            bibdingPricing: { TITLE: "Bidding Pricing", TOOLTIP: "" },
            bibdingOpportunity: { TITLE: "Bidding Opportunity", TOOLTIP: "" },
            accountMember: { TITLE: "Account Member", TOOLTIP: "" },
            realTimeStatus: { TITLE: "Real Time Status", TOOLTIP: "" },
            emailNotification: { TITLE: "Email Notification", TOOLTIP: "" },
            customerDataAnalytics: {
              TITLE: "Customer Data Analytics",
              TOOLTIP: "",
            },
            targetPrice: { TITLE: "Target Price", TOOLTIP: "" },
            diversity: { TITLE: "Diversity", TOOLTIP: "" },
            personalSupportTeam: {
              TITLE: "Personal Support Team",
              TOOLTIP: "",
            },
            kumopackGuarantee: { TITLE: "Kumopack Guarantee", TOOLTIP: "" },
            "special-content": { TITLE: "Special Content", TOOLTIP: "" },
            freeBanner: { TITLE: "Free Banner", TOOLTIP: "" },
            createDieline: { TITLE: "Create Dieline", TOOLTIP: "" },
            dielineDownloadable: { TITLE: "Dieline Downloadable", TOOLTIP: "" },
            designOnlineMockup: { TITLE: "Design Online Mockup", TOOLTIP: "" },
            AiPdfDownloadable: { TITLE: "AI/PDF Downloadable", TOOLTIP: "" },
            "3Dmodeling": { TITLE: "3D Modeling", TOOLTIP: "" },
            render3Dmodeling: { TITLE: "Render 3D Modeling", TOOLTIP: "" },
          },
        },
        PLANS: {
          STANDARD: { TITLE: "Standard", DESCRIPTION: "Free plan" },
          PLUS: { TITLE: "Plus", DESCRIPTION: "Plus plan" },
          PRO: { TITLE: "Pro", DESCRIPTION: "Pro plan" },
          BUSINESS: { TITLE: "Business", DESCRIPTION: "Business plan" },
          ENTERPRISE: { TITLE: "Enterprise", DESCRIPTION: "Enterprise plan" },
        },
        MESSAGES: {
          ERROR: "Error",
          PACKAGE_NOT_FOUND: "Package not found",
        },
      },
    };
  }, [t]);

  useEffect(() => {
    if (!isValidType) return;
    if (!useApiData) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let data: any[] = [];
        if (pricingType === "buyer") {
          data = await pricingService.getBuyerPricing();
        } else if (pricingType === "supplier") {
          data = await pricingService.getSupplierPricing();
        }
        setApiData(data || []);
      } catch (err: any) {
        setError(err.message);
        setUseApiData(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pricingType, useApiData]);

  const priceInfo = useMemo(() => {
    if (useApiData && apiData.length > 0) {
      const transformedData = transformApiDataToPricingInfo(
        apiData,
        pricingType as any,
      );
      const ensuredData = ensureStandardPackage(
        transformedData,
        pricingType,
        LANG,
      );

      return Object.keys(ensuredData).reduce((acc: any, key) => {
        const plan = ensuredData[key];

        acc[key] = {
          ...plan,
        };
        return acc;
      }, {});
    } else {
      const priceData =
        pricingType === "buyer"
          ? getBuyerPriceInfo(LANG)
          : getSupplierPriceInfo(LANG);

      return priceData;
    }
  }, [pricingType, billingPlan, apiData, useApiData, LANG]);

  const planFeatures = useMemo(() => {
    if (pricingType === "buyer") {
      return getBuyerPlanFeatures(LANG);
    } else if (pricingType === "supplier") {
      return getSupplierPlanFeatures(LANG);
    }
    return [];
  }, [pricingType, LANG]);

  const handleSelectPlan = (planData: any) => {
    console.log("Selected plan:", planData);

    const { isLoggedIn, userType } = checkLoginStatus();

    console.log("Auth check:", { isLoggedIn, userType, pricingType });

    if (isLoggedIn) {
      if (userType === "buyer") {
        const dashboardUrl =
          process.env.NEXT_PUBLIC_BUYER_URL || "https://buyer.kumopack.com";

        window.location.href = `${dashboardUrl}/profile/setting/bill-plan`;
      } else if (userType === "supplier") {
        const supplierUrl =
          process.env.NEXT_PUBLIC_SUPPLIER_URL ||
          "https://supplier.kumopack.com";
        window.location.href = `${supplierUrl}/plans`;
      }
    } else {
      const loginUrl =
        pricingType === "buyer"
          ? process.env.NEXT_PUBLIC_BUYER_SIGNIN_URL || "/auth/signin"
          : process.env.NEXT_PUBLIC_SUPPLIER_URL
            ? `${process.env.NEXT_PUBLIC_SUPPLIER_URL}/auth/signin`
            : "/auth/signin";

      router.push("/login/selection");
    }
  };

  const handleTypeSwitch = (type: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("type", type);
    router.push(`/pricing?${params.toString()}`);
  };

  if (!isValidType) {
    return (
      <div className={styles.pricingContainer}>
        <Navbar />
        <div className="d-flex align-items-center justify-content-center min-vh-100 text-center pt-20">
          <h1>404 - Not Found</h1>
          <p>Invalid pricing type</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.pricingContainer}>
      <Navbar />
      <br />
      <br />
      <div className="pt-20">
        <TabSwitcher
          currentType={pricingType}
          onSwitch={handleTypeSwitch}
          LANG={LANG}
        />
      </div>

      <HeroSection
        pricingType={pricingType}
        billingPlan={billingPlan}
        handleBillingPlanChange={setBillingPlan}
        LANG={LANG}
      />

      <div className={styles.pricingGrid}>
        {Object.keys(priceInfo).map((key, idx) => (
          <PricingCard
            key={key}
            plan={priceInfo[key]}
            planKey={key}
            billingPlan={billingPlan}
            index={idx}
            onSelectPlan={handleSelectPlan}
            LANG={LANG}
          />
        ))}
      </div>

      <FeaturesTable
        priceInfo={priceInfo}
        planFeatures={planFeatures}
        LANG={LANG}
      />

      <Footer />
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
      }
    >
      <PricingContent />
    </Suspense>
  );
}
