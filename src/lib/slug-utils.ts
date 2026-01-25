/**
 * Utility to generate filesystem-safe slugs.
 * Primarily used to avoid "filename too long" errors during static export (output: 'export').
 * Most filesystems have a 255-byte limit. Thai characters use 3 bytes each in UTF-8.
 */

export function getSafeSlug(slug: string): string {
  if (!slug) return "";

  // Decode if it's encoded
  const decoded = decodeURIComponent(slug);
  
  // Use a safe limit. 255 bytes / 3 (max bytes per char) = 85 chars.
  if (decoded.length <= 80) return decoded;

  // Truncate and add a small hash or just truncate at a word boundary if possible
  // For simplicity and predictability, we'll just truncate and add a hash of the original slug
  const truncated = decoded.substring(0, 70);
  const hash = simpleHash(decoded);
  
  return `${truncated}-${hash}`;
}

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36).substring(0, 5);
}

/**
 * Checks if a given slug matches a blog article, considering both original and safe versions.
 */
export function slugMatches(articleSlug: string, targetSlug: string): boolean {
  if (articleSlug === targetSlug) return true;
  if (getSafeSlug(articleSlug) === targetSlug) return true;
  if (articleSlug === decodeURIComponent(targetSlug)) return true;
  return false;
}
