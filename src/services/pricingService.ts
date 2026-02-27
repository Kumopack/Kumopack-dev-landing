import { apiGet, apiPost } from "@/lib/api-client";
import { BUYER_PORTAL_URL, SUPPLIER_PORTAL_URL } from "@/lib/api-config";

interface MembershipListResponse {
  data?: MembershipPackage[];
}

interface MembershipPackage {
  id: string;
  name: string;
  [key: string]: string | number | boolean | undefined | null;
}

interface PaymentResponse {
  url?: string;
  [key: string]: string | number | boolean | undefined | null;
}

export const pricingService = {
  getBuyerPricing: async () => {
    try {
      const result = await apiGet<MembershipListResponse | MembershipPackage[]>(
        `/membership/public-list?userType=buyer`,
      );

      if (!Array.isArray(result) && result.data && Array.isArray(result.data)) {
        return result.data;
      } else if (Array.isArray(result)) {
        return result;
      } else {
        return [];
      }
    } catch (error) {
      console.error("getBuyerPricing error:", error);
      throw new Error("ไม่สามารถโหลดข้อมูลแพ็คเกจได้");
    }
  },

  getSupplierPricing: async () => {
    try {
      const result = await apiGet<MembershipListResponse | MembershipPackage[]>(
        `/membership/public-list?userType=supplier`,
      );

      if (!Array.isArray(result) && result.data && Array.isArray(result.data)) {
        return result.data;
      } else if (Array.isArray(result)) {
        return result;
      } else {
        return [];
      }
    } catch (error) {
      console.error("getSupplierPricing error:", error);
      throw new Error("ไม่สามารถโหลดข้อมูลแพ็คเกจได้");
    }
  },

  createBuyerPayment: async (packageUuid: string, _billingType: string) => {
    try {
      return await apiPost<PaymentResponse>(
        `/membership/purchase/card?userType=buyer`,
        {
          packageUuid: packageUuid,
          returnUrl: `${BUYER_PORTAL_URL}/profile/setting/bill-plan`,
        },
      );
    } catch (error) {
      throw error;
    }
  },

  createSupplierPayment: async (packageUuid: string, _billingType: string) => {
    try {
      return await apiPost<PaymentResponse>(
        `/membership/purchase/card?userType=supplier`,
        {
          packageUuid: packageUuid,
          returnUrl: `${SUPPLIER_PORTAL_URL}/plans`,
        },
      );
    } catch (error) {
      throw error;
    }
  },
};
