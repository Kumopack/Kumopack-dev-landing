export const getBuyerPlanFeatures = (LANG: any) => [
  {
    title: LANG.PRICING.BUYER_FEATURES.CATEGORIES.OVERVIEW,
    features: [
      {
        key: "requestQuotation",
        title: LANG.PRICING.BUYER_FEATURES.FEATURES.requestQuotation.TITLE,
        tooltip: LANG.PRICING.BUYER_FEATURES.FEATURES.requestQuotation.TOOLTIP,
        standard: { status: true, word: null },
        business: { status: true, word: null },
        enterprise: { status: true, word: null },
      },
      {
        key: "factorySelection",
        title: LANG.PRICING.BUYER_FEATURES.FEATURES.factorySelection.TITLE,
        tooltip: LANG.PRICING.BUYER_FEATURES.FEATURES.factorySelection.TOOLTIP,
        standard: { status: true, word: "5 suppliers / time" },
        business: { status: true, word: "Unlimited" },
        enterprise: { status: true, word: "Unlimited" },
      },
      {
        key: "extraKumocoin",
        title: LANG.PRICING.BUYER_FEATURES.FEATURES.extraKumocoin.TITLE,
        tooltip: LANG.PRICING.BUYER_FEATURES.FEATURES.extraKumocoin.TOOLTIP,
        standard: { status: true, word: "คะแนน x1" },
        business: { status: true, word: "คะแนน x1" },
        enterprise: { status: true, word: "คะแนน x2" },
      },
      {
        key: "freeCoupon",
        title: LANG.PRICING.BUYER_FEATURES.FEATURES.freeCoupon.TITLE,
        tooltip: LANG.PRICING.BUYER_FEATURES.FEATURES.freeCoupon.TOOLTIP,
        standard: { status: false, word: "คะแนน x1" },
        business: { status: true, word: "ฟรีคูปองมูลค่า 299 บาทต่อเดือน" },
        enterprise: { status: true, word: "ฟรีคูปองมูลค่า 599 บาทต่อเดือน" },
      },
      {
        key: "factoryFiltering",
        title: LANG.PRICING.BUYER_FEATURES.FEATURES.factoryFiltering.TITLE,
        tooltip: LANG.PRICING.BUYER_FEATURES.FEATURES.factoryFiltering.TOOLTIP,
        standard: { status: true, word: null },
        business: { status: true, word: null },
        enterprise: { status: true, word: null },
      },
      {
        key: "showingAdvantage",
        title: LANG.PRICING.BUYER_FEATURES.FEATURES.showingAdvantage.TITLE,
        tooltip: LANG.PRICING.BUYER_FEATURES.FEATURES.showingAdvantage.TOOLTIP,
        standard: { status: true, word: null },
        business: { status: true, word: null },
        enterprise: { status: true, word: null },
      },
      {
        key: "tranferBanking",
        title: LANG.PRICING.BUYER_FEATURES.FEATURES.tranferBanking.TITLE,
        tooltip: LANG.PRICING.BUYER_FEATURES.FEATURES.tranferBanking.TOOLTIP,
        standard: { status: true, word: null },
        business: { status: true, word: null },
        enterprise: { status: true, word: null },
      },
      {
        key: "directMessage",
        title: LANG.PRICING.BUYER_FEATURES.FEATURES.directMessage.TITLE,
        tooltip: LANG.PRICING.BUYER_FEATURES.FEATURES.directMessage.TOOLTIP,
        standard: { status: true, word: null },
        business: { status: true, word: null },
        enterprise: { status: true, word: null },
      },
      {
        key: "numberOfInquiry",
        title: LANG.PRICING.BUYER_FEATURES.FEATURES.numberOfInquiry.TITLE,
        tooltip: LANG.PRICING.BUYER_FEATURES.FEATURES.numberOfInquiry.TOOLTIP,
        standard: { status: true, word: "3 inquires/day" },
        business: { status: true, word: "10 inquires/day" },
        enterprise: { status: true, word: "Unlimited" },
      },
      {
        key: "realTimeStatus",
        title: LANG.PRICING.BUYER_FEATURES.FEATURES.realTimeStatus.TITLE,
        tooltip: LANG.PRICING.BUYER_FEATURES.FEATURES.realTimeStatus.TOOLTIP,
        standard: { status: true, word: null },
        business: { status: true, word: null },
        enterprise: { status: true, word: null },
      },
      {
        key: "emailNotification",
        title: LANG.PRICING.BUYER_FEATURES.FEATURES.emailNotification.TITLE,
        tooltip: LANG.PRICING.BUYER_FEATURES.FEATURES.emailNotification.TOOLTIP,
        standard: { status: true, word: null },
        business: { status: true, word: null },
        enterprise: { status: true, word: null },
      },
    ],
  },
  {
    title: LANG.PRICING.BUYER_FEATURES.CATEGORIES.WORK,
    features: [
      {
        key: "users",
        title: LANG.PRICING.BUYER_FEATURES.FEATURES.users.TITLE,
        tooltip: LANG.PRICING.BUYER_FEATURES.FEATURES.users.TOOLTIP,
        standard: { status: true, word: "1 mail user" },
        business: { status: true, word: "3 mail users" },
        enterprise: { status: true, word: "5 mail users" },
      },
      {
        key: "createDieline",
        title: LANG.PRICING.BUYER_FEATURES.FEATURES.createDieline.TITLE,
        tooltip: LANG.PRICING.BUYER_FEATURES.FEATURES.createDieline.TOOLTIP,
        standard: { status: true, word: null },
        business: { status: true, word: null },
        enterprise: { status: true, word: null },
      },
      {
        key: "dielineDownloadable",
        title: LANG.PRICING.BUYER_FEATURES.FEATURES.dielineDownloadable.TITLE,
        tooltip:
          LANG.PRICING.BUYER_FEATURES.FEATURES.dielineDownloadable.TOOLTIP,
        standard: { status: false, word: null },
        business: { status: true, word: null },
        enterprise: { status: true, word: null },
      },
      {
        key: "designOnlineMockup",
        title: LANG.PRICING.BUYER_FEATURES.FEATURES.designOnlineMockup.TITLE,
        tooltip:
          LANG.PRICING.BUYER_FEATURES.FEATURES.designOnlineMockup.TOOLTIP,
        standard: { status: true, word: null },
        business: { status: true, word: null },
        enterprise: { status: true, word: null },
      },
      {
        key: "AiPdfDownloadable",
        title: LANG.PRICING.BUYER_FEATURES.FEATURES.AiPdfDownloadable.TITLE,
        tooltip: LANG.PRICING.BUYER_FEATURES.FEATURES.AiPdfDownloadable.TOOLTIP,
        standard: { status: false, word: null },
        business: { status: true, word: null },
        enterprise: { status: true, word: null },
      },
      {
        key: "3Dmodeling",
        title: LANG.PRICING.BUYER_FEATURES.FEATURES["3Dmodeling"].TITLE,
        tooltip: LANG.PRICING.BUYER_FEATURES.FEATURES["3Dmodeling"].TOOLTIP,
        standard: { status: true, word: null },
        business: { status: true, word: null },
        enterprise: { status: true, word: null },
      },
      {
        key: "render3Dmodeling",
        title: LANG.PRICING.BUYER_FEATURES.FEATURES.render3Dmodeling.TITLE,
        tooltip: LANG.PRICING.BUYER_FEATURES.FEATURES.render3Dmodeling.TOOLTIP,
        standard: { status: true, word: null },
        business: { status: true, word: null },
        enterprise: { status: true, word: null },
      },
    ],
  },
];

export const getBuyerPriceInfo = (LANG: any) => ({
  standard: {
    title: LANG.PRICING.PLANS.STANDARD.TITLE,
    monthlyPrice: "FREE",
    annualPrice: "FREE",
    description: LANG.PRICING.PLANS.STANDARD.DESCRIPTION,
    isPopular: false,
  },
  plus: {
    title: LANG.PRICING.PLANS.PLUS.TITLE,
    monthlyPrice: "299.00",
    annualPrice: new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(299 * 11),
    description: LANG.PRICING.PLANS.PLUS.DESCRIPTION,
    isPopular: true,
  },
  pro: {
    title: LANG.PRICING.PLANS.PRO.TITLE,
    monthlyPrice: "599.00",
    annualPrice: new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(599 * 11),
    description: LANG.PRICING.PLANS.PRO.DESCRIPTION,
    isPopular: false,
  },
});

export const getSupplierPriceInfo = (LANG: any) => ({
  standard: {
    title: LANG.PRICING.PLANS.STANDARD.TITLE,
    monthlyPrice: "FREE",
    annualPrice: "FREE",
    priceUnit: null,
    description: LANG.PRICING.PLANS.STANDARD.DESCRIPTION,
    isPopular: false,
  },
  plus: {
    title: LANG.PRICING.PLANS.BUSINESS.TITLE,
    monthlyPrice: new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
    }).format(2999),
    annualPrice: new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(2999 * 11),
    description: LANG.PRICING.PLANS.BUSINESS.DESCRIPTION,
    isPopular: false,
  },
  pro: {
    title: LANG.PRICING.PLANS.ENTERPRISE.TITLE,
    monthlyPrice: new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
    }).format(4999),
    annualPrice: new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(4999 * 11),
    description: LANG.PRICING.PLANS.ENTERPRISE.DESCRIPTION,
    isPopular: true,
  },
});

export const getSupplierPlanFeatures = (LANG: any) => [
  {
    title: LANG.PRICING.SUPPLIER_FEATURES.CATEGORIES.OVERVIEW,
    features: [
      {
        key: "showingAdvantage",
        title: LANG.PRICING.SUPPLIER_FEATURES.FEATURES.showingAdvantage.TITLE,
        tooltip:
          LANG.PRICING.SUPPLIER_FEATURES.FEATURES.showingAdvantage.TOOLTIP,
        standard: { status: true, word: null },
        business: { status: true, word: null },
        enterprise: { status: true, word: null },
      },
      {
        key: "bibdingPricing",
        title: LANG.PRICING.SUPPLIER_FEATURES.FEATURES.bibdingPricing.TITLE,
        tooltip: LANG.PRICING.SUPPLIER_FEATURES.FEATURES.bibdingPricing.TOOLTIP,
        standard: { status: true, word: null },
        business: { status: true, word: null },
        enterprise: { status: true, word: null },
      },
      {
        key: "bibdingOpportunity",
        title: LANG.PRICING.SUPPLIER_FEATURES.FEATURES.bibdingOpportunity.TITLE,
        tooltip:
          LANG.PRICING.SUPPLIER_FEATURES.FEATURES.bibdingOpportunity.TOOLTIP,
        standard: { status: true, word: "Unlimited " },
        business: { status: true, word: "Unlimited " },
        enterprise: { status: true, word: "Unlimited " },
      },
      {
        key: "accountMember",
        title: LANG.PRICING.SUPPLIER_FEATURES.FEATURES.accountMember.TITLE,
        tooltip: LANG.PRICING.SUPPLIER_FEATURES.FEATURES.accountMember.TOOLTIP,
        standard: { status: true, word: "1 mail user" },
        business: { status: true, word: "3 mail users" },
        enterprise: { status: true, word: "5 mail users" },
      },
      {
        key: "realTimeStatus",
        title: LANG.PRICING.SUPPLIER_FEATURES.FEATURES.realTimeStatus.TITLE,
        tooltip: LANG.PRICING.SUPPLIER_FEATURES.FEATURES.realTimeStatus.TOOLTIP,
        standard: { status: true, word: null },
        business: { status: true, word: null },
        enterprise: { status: true, word: null },
      },
      {
        key: "emailNotification",
        title: LANG.PRICING.SUPPLIER_FEATURES.FEATURES.emailNotification.TITLE,
        tooltip:
          LANG.PRICING.SUPPLIER_FEATURES.FEATURES.emailNotification.TOOLTIP,
        standard: { status: true, word: null },
        business: { status: true, word: null },
        enterprise: { status: true, word: null },
      },
      {
        key: "customerDataAnalytics",
        title:
          LANG.PRICING.SUPPLIER_FEATURES.FEATURES.customerDataAnalytics.TITLE,
        tooltip:
          LANG.PRICING.SUPPLIER_FEATURES.FEATURES.customerDataAnalytics.TOOLTIP,
        standard: { status: false, word: null },
        business: { status: true, word: null },
        enterprise: { status: true, word: null },
      },
      {
        key: "targetPrice",
        title: LANG.PRICING.SUPPLIER_FEATURES.FEATURES.targetPrice.TITLE,
        tooltip: LANG.PRICING.SUPPLIER_FEATURES.FEATURES.targetPrice.TOOLTIP,
        standard: { status: false, word: null },
        business: { status: true, word: null },
        enterprise: { status: true, word: null },
      },
      {
        key: "diversity",
        title: LANG.PRICING.SUPPLIER_FEATURES.FEATURES.diversity.TITLE,
        tooltip: LANG.PRICING.SUPPLIER_FEATURES.FEATURES.diversity.TOOLTIP,
        standard: { status: true, word: "1 category" },
        business: { status: true, word: "3 categories" },
        enterprise: { status: true, word: "Unlimited Categories" },
      },
      {
        key: "personalSupportTeam",
        title:
          LANG.PRICING.SUPPLIER_FEATURES.FEATURES.personalSupportTeam.TITLE,
        tooltip:
          LANG.PRICING.SUPPLIER_FEATURES.FEATURES.personalSupportTeam.TOOLTIP,
        standard: { status: false, word: null },
        business: { status: true, word: null },
        enterprise: { status: true, word: null },
      },
      {
        key: "kumopackGuarantee",
        title: LANG.PRICING.SUPPLIER_FEATURES.FEATURES.kumopackGuarantee.TITLE,
        tooltip:
          LANG.PRICING.SUPPLIER_FEATURES.FEATURES.kumopackGuarantee.TOOLTIP,
        standard: { status: false, word: null },
        business: { status: false, word: null },
        enterprise: { status: true, word: null },
      },
      {
        key: "special-content",
        title: LANG.PRICING.SUPPLIER_FEATURES.FEATURES["special-content"].TITLE,
        tooltip:
          LANG.PRICING.SUPPLIER_FEATURES.FEATURES["special-content"].TOOLTIP,
        standard: { status: false, word: null },
        business: { status: false, word: null },
        enterprise: { status: true, word: null },
      },
      {
        key: "freeBanner",
        title: LANG.PRICING.SUPPLIER_FEATURES.FEATURES.freeBanner.TITLE,
        tooltip: LANG.PRICING.SUPPLIER_FEATURES.FEATURES.freeBanner.TOOLTIP,
        standard: { status: false, word: null },
        business: { status: false, word: null },
        enterprise: { status: true, word: null },
      },
    ],
  },
  {
    title: LANG.PRICING.SUPPLIER_FEATURES.CATEGORIES.REPORTING,
    features: [
      {
        key: "createDieline",
        title: LANG.PRICING.SUPPLIER_FEATURES.FEATURES.createDieline.TITLE,
        tooltip: LANG.PRICING.SUPPLIER_FEATURES.FEATURES.createDieline.TOOLTIP,
        standard: { status: true, word: null },
        business: { status: true, word: null },
        enterprise: { status: true, word: null },
      },
      {
        key: "dielineDownloadable",
        title:
          LANG.PRICING.SUPPLIER_FEATURES.FEATURES.dielineDownloadable.TITLE,
        tooltip:
          LANG.PRICING.SUPPLIER_FEATURES.FEATURES.dielineDownloadable.TOOLTIP,
        standard: { status: false, word: null },
        business: { status: true, word: null },
        enterprise: { status: true, word: null },
      },
      {
        key: "designOnlineMockup",
        title: LANG.PRICING.SUPPLIER_FEATURES.FEATURES.designOnlineMockup.TITLE,
        tooltip:
          LANG.PRICING.SUPPLIER_FEATURES.FEATURES.designOnlineMockup.TOOLTIP,
        standard: { status: true, word: null },
        business: { status: true, word: null },
        enterprise: { status: true, word: null },
      },
      {
        key: "AiPdfDownloadable",
        title: LANG.PRICING.SUPPLIER_FEATURES.FEATURES.AiPdfDownloadable.TITLE,
        tooltip:
          LANG.PRICING.SUPPLIER_FEATURES.FEATURES.AiPdfDownloadable.TOOLTIP,
        standard: { status: false, word: null },
        business: { status: true, word: null },
        enterprise: { status: true, word: null },
      },
      {
        key: "3Dmodeling",
        title: LANG.PRICING.SUPPLIER_FEATURES.FEATURES["3Dmodeling"].TITLE,
        tooltip: LANG.PRICING.SUPPLIER_FEATURES.FEATURES["3Dmodeling"].TOOLTIP,
        standard: { status: true, word: null },
        business: { status: true, word: null },
        enterprise: { status: true, word: null },
      },
      {
        key: "render3Dmodeling",
        title: LANG.PRICING.SUPPLIER_FEATURES.FEATURES.render3Dmodeling.TITLE,
        tooltip:
          LANG.PRICING.SUPPLIER_FEATURES.FEATURES.render3Dmodeling.TOOLTIP,
        standard: { status: true, word: null },
        business: { status: true, word: null },
        enterprise: { status: true, word: null },
      },
    ],
  },
];
