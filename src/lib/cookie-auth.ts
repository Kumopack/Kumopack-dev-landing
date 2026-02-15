import Cookies from 'js-cookie';

export type UserType = 'buyer' | 'supplier' | null;

export interface AuthStatus {
  isLoggedIn: boolean;
  userType: UserType;
  token: string | null;
}

export const COOKIE_KEYS = {
  BUYER_ACCESS_TOKEN: 'kumopack-buyer-access-token',
  SUPPLIER_ACCESS_TOKEN: 'kumopack-supplier-access-token',
};

export const checkLoginStatus = (): AuthStatus => {
  if (typeof window === 'undefined') {
    return { isLoggedIn: false, userType: null, token: null };
  }

  const buyerToken = Cookies.get(COOKIE_KEYS.BUYER_ACCESS_TOKEN);
  const supplierToken = Cookies.get(COOKIE_KEYS.SUPPLIER_ACCESS_TOKEN);

  if (buyerToken) {
    return { isLoggedIn: true, userType: 'buyer', token: buyerToken };
  }

  if (supplierToken) {
    return { isLoggedIn: true, userType: 'supplier', token: supplierToken };
  }

  return { isLoggedIn: false, userType: null, token: null };
};

export const logout = () => {
  Cookies.remove(COOKIE_KEYS.BUYER_ACCESS_TOKEN);
  Cookies.remove(COOKIE_KEYS.SUPPLIER_ACCESS_TOKEN);
  // Add other cleanup if necessary
  window.location.href = '/';
};
