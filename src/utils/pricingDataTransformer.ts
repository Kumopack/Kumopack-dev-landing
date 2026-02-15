export interface PricingItem {
  uuid: string;
  id?: string;
  name?: string;
  packageSlug?: string;
  baseSlug?: string;
  price?: number;
  displayPrice?: number;
  monthMultiplier?: number;
  durationDay?: number;
  isActive?: boolean;
  [key: string]: any;
}

export interface TransformedPricingPlan {
  id: string;
  title: string;
  monthlyPrice: string | number;
  annualPrice: string | number;
  description: string;
  isPopular: boolean;
  isActive: boolean;
  _apiData: {
    monthly: PricingItem | null;
    annual: PricingItem | null;
  };
}

export type PricingType = 'buyer' | 'supplier';

export const transformApiDataToPricingInfo = (apiData: any[], type: PricingType): Record<string, TransformedPricingPlan> => {
  if (!apiData || !Array.isArray(apiData)) {
    return {};
  }

  const groupedData = apiData.reduce((acc: any, item: PricingItem) => {
    const slug = determinePackageSlug(item);
    
    const isMonthlyBuyer = item.monthMultiplier === 1 && item.baseSlug?.includes('months');
    const isAnnualBuyer = item.monthMultiplier === 1 && item.baseSlug?.includes('year'); // Wait, original code said 12 for annual? No, original code said monthMultiplier === 1 && baseSlug.includes('year') for buyer? 
    // Checking original code:
    // const isMonthlyBuyer = item.monthMultiplier === 1 && item.baseSlug?.includes('months')
    // const isAnnualBuyer = item.monthMultiplier === 1 && item.baseSlug?.includes('year')
    // const isMonthlySupplier = item.monthMultiplier === 1 && item.durationDay === 30
    // const isAnnualSupplier = item.monthMultiplier === 12 && item.durationDay === 365
    
    // Let's stick to the original logic exactly for now.
    
    const isMonthlySupplier = item.monthMultiplier === 1 && item.durationDay === 30;
    const isAnnualSupplier = item.monthMultiplier === 12 && item.durationDay === 365;
    
    // For buyer, the logic in original was:
    // const isMonthlyBuyer = item.monthMultiplier === 1 && item.baseSlug?.includes('months')
    // const isAnnualBuyer = item.monthMultiplier === 1 && item.baseSlug?.includes('year')
    // This seems weird for annual to have monthMultiplier 1, but maybe it's "1 year"? 
    // I will copy logic exactly.

    const isMonthly = isMonthlyBuyer || isMonthlySupplier;
    const isAnnual = isAnnualBuyer || isAnnualSupplier;

    if (!acc[slug]) {
      acc[slug] = {};
    }

    if (isMonthly) {
      acc[slug].monthly = item;
    } else if (isAnnual) {
      acc[slug].annual = item;
    }

    return acc;
  }, {});

  const priceInfo: Record<string, TransformedPricingPlan> = {};
  const orderedKeys = ['standard', 'plus', 'pro'];
  const allKeys = [...orderedKeys, ...Object.keys(groupedData).filter(key => !orderedKeys.includes(key))];

  allKeys.forEach(slug => {
    const data = groupedData[slug];
    if (!data) return;

    const monthlyItem = data.monthly;
    const annualItem = data.annual;

    if (monthlyItem || annualItem) {
      const baseItem = monthlyItem || annualItem;
      const title = determinePackageTitle(slug, type, baseItem);
      const monthlyPrice = monthlyItem ? (monthlyItem.displayPrice || monthlyItem.price || 0) : 0;
      const annualPrice = annualItem ? (annualItem.displayPrice || annualItem.price || 0) : 0;

      const formatPrice = (price: number | string, packageSlug: string) => {
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        if (numPrice === 0 && packageSlug === 'standard') return 'FREE';
        return numPrice.toLocaleString('th-TH');
      };

      priceInfo[slug] = {
        id: baseItem.uuid || baseItem.id,
        title,
        monthlyPrice: formatPrice(monthlyPrice, slug),
        annualPrice: formatPrice(annualPrice, slug),
        description: getPackageDescription(slug, type),
        isPopular: getPopularStatus(slug, type),
        isActive: baseItem.isActive !== false,
        _apiData: {
          monthly: monthlyItem || null,
          annual: annualItem || null,
        },
      };
    }
  });

  return priceInfo;
};

const determinePackageSlug = (item: PricingItem): string => {
  const slug = item.packageSlug || item.baseSlug || '';
  const name = (item.name || '').toLowerCase();
  const price = item.displayPrice || item.price || 0;

  if (price === 0 || slug.includes('standard') || name.includes('standard')) {
    return 'standard';
  }

  if (slug.includes('business') || name.includes('business')) {
    return 'plus';
  }

  if (slug.includes('enterprise') || name.includes('enterprise')) {
    return 'pro';
  }

  if (slug.includes('plus') || name.includes('plus')) {
    return 'plus';
  }

  if (slug.includes('pro') || name.includes('pro')) {
    return 'pro';
  }

  if (price < 1000) {
    return 'plus';
  } else {
    return 'pro';
  }
};

const determinePackageTitle = (slug: string, type: PricingType, item: PricingItem): string => {
  if (slug === 'standard') {
    return 'Standard';
  }

  if (slug === 'plus') {
    return type === 'supplier' ? 'Business' : 'Plus';
  }

  if (slug === 'pro') {
    return type === 'supplier' ? 'Enterprise' : 'Pro';
  }

  return item.name || 'Package';
};

const getPackageDescription = (slug: string, type: PricingType): string => {
  const descriptions: Record<string, Record<string, string>> = {
    buyer: {
      standard: 'Basic features for up to 10 employees with everything you need.',
      plus: 'Advanced features and reporting, better workflows and automation.',
      pro: 'Personalised service and enterprise security for large teams.',
    },
    supplier: {
      standard: 'Basic supplier features to get started.',
      plus: 'Advanced business features for growing companies.',
      pro: 'Enterprise-grade solutions for large suppliers.',
    },
  };

  return descriptions[type]?.[slug] || descriptions['buyer']['standard'];
};

const getPopularStatus = (slug: string, type: PricingType): boolean => {
  if (slug === 'plus') {
    return true;
  }
  if (type === 'supplier' && slug === 'pro') {
    return true;
  }
  return false;
};
