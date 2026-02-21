"use client";

/**
 * Robust buyer authentication utility for Kumopack.
 * Checks for access tokens in cookies and local storage,
 * verifies profile existence, and performs basic JWT expiration checks.
 */

import { API_BASE_URL, BUYER_PORTAL_URL } from "./api-config";

export interface BuyerProfile {
  id: string | number;
  email?: string;
  firstName?: string;
  lastName?: string;
  [key: string]: any;
}

export interface BuyerAuthInfo {
  isAuthenticated: boolean;
  token: string | null;
  profile: BuyerProfile | null;
}

const BUYER_TOKEN_KEY = "kumopack-buyer-access-token";
const PROFILE_KEY = "profile";

/**
 * Helper to get a cookie value by name
 */
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

/**
 * Checks if a JWT token is expired
 */
function isTokenExpired(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    const payload = JSON.parse(atob(parts[1]));
    if (payload && payload.exp) {
      return Date.now() >= payload.exp * 1000;
    }
    return false;
  } catch (e) {
    return false;
  }
}

/**
 * Retrieves the current buyer authentication state
 */
export function getBuyerAuth(): BuyerAuthInfo {
  if (typeof window === "undefined") {
    return { isAuthenticated: false, token: null, profile: null };
  }

  const token =
    getCookie(BUYER_TOKEN_KEY) || localStorage.getItem(BUYER_TOKEN_KEY);
  const profileStr = localStorage.getItem(PROFILE_KEY);

  let profile: BuyerProfile | null = null;
  try {
    if (profileStr) {
      profile = JSON.parse(profileStr);
    }
  } catch (e) {
    profile = null;
  }

  if (!token || !profile || !profile.id) {
    return { isAuthenticated: false, token: null, profile: null };
  }

  if (isTokenExpired(token)) {
    return { isAuthenticated: false, token: null, profile: null };
  }

  return {
    isAuthenticated: true,
    token,
    profile,
  };
}

/**
 * Constants for redirection and APIs
 */
export const BUYER_URLS = {
  BASE: BUYER_PORTAL_URL,
  AUTH: process.env.NEXT_PUBLIC_BUYER_SIGNIN_URL || `${BUYER_PORTAL_URL}/auth`,
  FAVORITE: `${BUYER_PORTAL_URL}/favorite`,
  CREATE_PRODUCTION: `${BUYER_PORTAL_URL}/production/create?step=product-line`,
  ADD_FAVORITE_API: `${API_BASE_URL}/buyer/favorite/add`,
};
