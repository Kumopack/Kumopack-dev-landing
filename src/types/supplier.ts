export interface SupplierFeature {
  id: string;
  title: string;
  description: string;
  icon: string;

  nameTh?: string;
  nameEn?: string;
  descriptionTh?: string;
  descriptionEn?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  image?: string;
  items: {
    id: string;
    name: string;
    image: string;
  }[];
}

export interface Supplier {
  id: string;
  code?: string;
  name: string;
  displayTitle?: string;
  rating: number;
  reviewCount: number;
  location: string;
  address: string;
  specialized: string;
  image?: string;
  logo?: string;
  tagline: string;
  description: string;
  website: string;
  email: string;
  phone?: string;
  features: SupplierFeature[];
  categories: ProductCategory[];
  gallery: string[];
  stats: {
    experience: string;
    capacity: string;
    certifications: string;
    leadTime: string;
    orderAmount: string;
  };
  isActive?: boolean;
  slug?: string;
  supplierType?: string;
  companyTaxNo?: string;
  membershipTypeTitle?: string;
  isVerified?: boolean;
}
