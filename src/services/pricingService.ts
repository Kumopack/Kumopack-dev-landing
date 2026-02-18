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

  
  
  

  createBuyerPayment: async (packageUuid: string, billingType: string) => {
    
    
    
     try {
        
        
        
        
        
        
        
        
        
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
