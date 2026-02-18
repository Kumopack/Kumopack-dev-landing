import { clsx, type ClassValue } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function getStoragePath(path: string | undefined | null) {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("data:")) return path;
  
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "https://api.kumopack.com/v1/images";
  // Ensure consistent slash handling
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  
  return `${baseUrl}${cleanPath}`;
}

export function getAssetPath(path: string | undefined | null) {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("data:")) return path;
  
  // For now, just return the path as it's likely for public/static assets
  // You could add a CDN base URL here if needed in the future
  return path;
}
