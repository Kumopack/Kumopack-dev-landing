/**
 * Shared API client for kumopack-dev-landing.
 *
 * Provides a thin wrapper around fetch with:
 *  - Configurable timeout (default 15 s)
 *  - Consistent error class (`ApiError`)
 *  - Optional local → production failover (for SSR/build where local API may be down)
 *  - Support for Next.js caching via `next` option
 */

import { API_BASE_URL, API_PRODUCTION_URL } from "./api-config";

// ---------------------------------------------------------------------------
// Error class
// ---------------------------------------------------------------------------

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public url: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ApiRequestOptions {
  /** Next.js caching options, e.g. `{ revalidate: 60 }` */
  next?: NextFetchRequestConfig;
  /** Request headers to merge */
  headers?: Record<string, string>;
  /** Timeout in ms (default 15 000) */
  timeout?: number;
  /** If true, retry against production URL on local connection failure */
  failoverToProduction?: boolean;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

const DEFAULT_TIMEOUT = 15_000;

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeout: number,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { ...init, signal: controller.signal });
    return response;
  } finally {
    clearTimeout(timer);
  }
}

function isLocalUrl(url: string): boolean {
  return url.includes("localhost") || url.includes("127.0.0.1");
}

function isConnectionError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const e = error as any;
  return (
    e?.cause?.code === "ECONNREFUSED" ||
    e?.name === "AbortError" ||
    e?.message?.includes("Timeout") ||
    e?.message?.includes("Failed to fetch") ||
    error instanceof TypeError
  );
}

async function runFetch(
  url: string,
  init: RequestInit,
  options: ApiRequestOptions,
): Promise<Response> {
  const timeout = options.timeout ?? DEFAULT_TIMEOUT;

  try {
    return await fetchWithTimeout(url, init, timeout);
  } catch (error) {
    // Failover: if the request targeted a local API and it failed, retry
    // against the production URL (useful during SSR/build).
    if (
      options.failoverToProduction &&
      isLocalUrl(url) &&
      isConnectionError(error) &&
      API_BASE_URL !== API_PRODUCTION_URL
    ) {
      const prodUrl = url.replace(API_BASE_URL, API_PRODUCTION_URL);
      console.warn(`[api-client] Failover to production: ${prodUrl}`);
      return fetchWithTimeout(prodUrl, init, timeout);
    }
    throw error;
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Perform a GET request against the API.
 *
 * @param path  Absolute URL **or** path relative to `API_BASE_URL` (e.g. `/articles`).
 * @returns     Parsed JSON body typed as `T`.
 */
export async function apiGet<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;

  const init: RequestInit = {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...options.headers,
    },
    ...(options.next ? { next: options.next } : {}),
  };

  const res = await runFetch(url, init, options);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new ApiError(res.status, text || `GET ${path} failed`, url);
  }

  return res.json() as Promise<T>;
}

/**
 * Perform a POST request against the API.
 */
export async function apiPost<T>(
  path: string,
  body: unknown,
  options: ApiRequestOptions = {},
): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;

  const init: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },
    body: JSON.stringify(body),
    ...(options.next ? { next: options.next } : {}),
  };

  const res = await runFetch(url, init, options);

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new ApiError(
      res.status,
      (data as any)?.message || `POST ${path} failed`,
      url,
    );
  }

  return res.json() as Promise<T>;
}

/**
 * Low-level fetch with timeout + failover but **no** response parsing.
 * Useful when you need to inspect the raw Response (e.g. stream, non-JSON).
 */
export async function apiFetch(
  path: string,
  init: RequestInit = {},
  options: ApiRequestOptions = {},
): Promise<Response> {
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;

  const merged: RequestInit = {
    ...init,
    headers: {
      Accept: "application/json",
      ...options.headers,
      ...(init.headers as Record<string, string> | undefined),
    },
    ...(options.next ? { next: options.next } : {}),
  };

  return runFetch(url, merged, options);
}
