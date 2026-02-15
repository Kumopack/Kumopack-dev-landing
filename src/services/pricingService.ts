const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const pricingService = {
  getBuyerPricing: async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/membership/public-list?userType=buyer`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();

      if (result.data && Array.isArray(result.data)) {
        return result.data;
      } else if (Array.isArray(result)) {
        return result;
      } else {
        return [];
      }
    } catch (error) {
      console.error('getBuyerPricing error:', error);
      throw new Error('ไม่สามารถโหลดข้อมูลแพ็คเกจได้');
    }
  },

  getSupplierPricing: async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/membership/public-list?userType=supplier`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();

      if (result.data && Array.isArray(result.data)) {
        return result.data;
      } else if (Array.isArray(result)) {
        return result;
      } else {
        return [];
      }
    } catch (error) {
      console.error('getSupplierPricing error:', error);
      throw new Error('ไม่สามารถโหลดข้อมูลแพ็คเกจได้');
    }
  },

  // Payment methods are not strictly needed for the initial view refactor 
  // but are good to have for "Get Started" if we go that far. 
  // For now I will include them to match the reference service structure.

  createBuyerPayment: async (packageUuid: string, billingType: string) => {
    // Implementation placeholder matching reference
    // In a real scenario, this would post to the endpoint
    // For this refactor, we focus on the View first, but I'll add the method signature.
     try {
        // NOTE: The reference code uses /api/v1 for this call (with "api" prefix?), but /v1 for others?
        // Reference: fetch('/api/v1/membership/purchase/card?userType=buyer' ...
        // Reference other: fetch('/v1/membership/public-list?userType=buyer' ...
        // I should probably stick to NEXT_PUBLIC_API_ENDPOINT. 
        // If NEXT_PUBLIC_API_ENDPOINT is http://localhost:8000/v1
        // then `${API_ENDPOINT}/membership...` works.
        // If the reference had /api/v1, it might be a Next.js proxy route? 
        // But the user said "use NEXT_PUBLIC_API_ENDPOINT".
        
        const response = await fetch(`${API_ENDPOINT}/membership/purchase/card?userType=buyer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                packageUuid: packageUuid,
                returnUrl: `${
                    process.env.NEXT_PUBLIC_BUYER_URL || 'https://buyer.kumopack.com'
                }/profile/setting/bill-plan`,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
             throw new Error(data.message || 'เกิดข้อผิดพลาดในการจ่ายเงิน');
        }

        return data;
    } catch (error) {
        throw error;
    }
  },

   createSupplierPayment: async (packageUuid: string, billingType: string) => {
    try {
        const response = await fetch(`${API_ENDPOINT}/membership/purchase/card?userType=supplier`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                packageUuid: packageUuid,
                returnUrl: `${
                    process.env.NEXT_PUBLIC_SUPPLIER_URL || 'https://supplier.kumopack.com'
                }/plans`,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'เกิดข้อผิดพลาดในการจ่ายเงิน');
        }

        return data;
    } catch (error) {
        throw error;
    }
  }
};
