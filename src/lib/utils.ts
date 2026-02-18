import { clsx, type ClassValue } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function getStoragePath(path: string | undefined | null) {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("data:")) return path;
  
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "https://api.kumopack.com/v1/images";
  
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  
  return `${baseUrl}${cleanPath}`;
}

export function getAssetPath(path: string | undefined | null) {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("data:")) return path;
  
  
  
  return path;
}
