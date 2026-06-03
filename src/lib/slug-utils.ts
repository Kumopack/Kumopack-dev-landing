/**
 * Utility to generate filesystem-safe slugs.
 * Primarily used to avoid "filename too long" errors during static export (output: 'export').
 * Most filesystems have a 255-byte limit. Thai characters use 3 bytes each in UTF-8.
 */

export function getSafeSlug(slug: string): string {
  if (!slug) return "";

  
  let decoded = slug;
  try {
    let prev = "";
    while (decoded !== prev) {
      prev = decoded;
      decoded = decodeURIComponent(decoded);
    }
  } catch (e) {
    
  }
  
  
  decoded = decoded.normalize("NFC");
  
  
  
  
  if (decoded.length <= 30) return decoded;

  const truncated = [...decoded].slice(0, 30).join("");
  
  const hash = simpleHash(decoded);
  return `${truncated}-${hash}`;
}

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; 
  }
  return Math.abs(hash).toString(36).substring(0, 5);
}

/**
 * Checks if a given slug matches a blog article, considering both original and safe versions.
 */
export function slugMatches(articleSlug: string, targetSlug: string): boolean {
  if (!articleSlug || !targetSlug) return false;
  
  const normArticle = articleSlug.normalize("NFC");
  const normTarget = targetSlug.normalize("NFC");
  const decodedTarget = decodeURIComponent(normTarget).normalize("NFC");
  
  if (normArticle === normTarget) return true;
  if (getSafeSlug(normArticle) === normTarget) return true;
  if (normArticle === decodedTarget) return true;
  if (getSafeSlug(normArticle) === decodedTarget) return true;
  
  return false;
}
