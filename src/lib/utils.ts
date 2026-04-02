import { clsx, type ClassValue } from "clsx";
import { API_IMAGE_URL } from "./api-config";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function getStoragePath(path: string | undefined | null) {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("data:")) return path;

  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${API_IMAGE_URL}${cleanPath}`;
}

export function getAssetPath(path: string | undefined | null) {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("data:")) return path;

  // Fix for GitHub Pages deployment: prepend basePath for absolute paths
  if (
    path.startsWith("/") &&
    process.env.NODE_ENV === "production" &&
    !path.startsWith("/Kumopack-dev")
  ) {
    return `/Kumopack-dev-landing${path}`;
  }

  return path;
}
