/**
 * Centralized API configuration for kumopack-dev-landing.
 *
 * All URL constants live here so every module reads from one place.
 * Fallbacks point to localhost to prevent accidentally hitting production.
 * Production URLs must be set via environment variables in deployment config.
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:8000/v1";

export const API_PRODUCTION_URL = "https://api.kumopack.com/v1";

export const API_IMAGE_URL =
  process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:8000/v1/images";

export const BUYER_PORTAL_URL =
  process.env.NEXT_PUBLIC_BUYER_URL || "http://localhost:3000";

export const SUPPLIER_PORTAL_URL =
  process.env.NEXT_PUBLIC_SUPPLIER_URL || "http://localhost:3001";
