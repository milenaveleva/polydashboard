/**
 * Allowed hosts for the proxy (CORS workaround when calling from browser).
 */
export const PROXY_ALLOWED_HOSTS = [
  "gamma-api.polymarket.com",
  "clob.polymarket.com",
  "data-api.polymarket.com",
] as const;

export function isAllowedProxyHost(host: string): boolean {
  return PROXY_ALLOWED_HOSTS.includes(host as (typeof PROXY_ALLOWED_HOSTS)[number]);
}

/**
 * When running in the browser, requests to Polymarket APIs are blocked by CORS.
 * Use the Next.js API proxy so the request is made from the server.
 */
export function getProxiedUrl(absoluteUrl: string): string {
  return `/api/proxy?url=${encodeURIComponent(absoluteUrl)}`;
}

/**
 * Use this for fetch in API clients: uses proxy in browser, direct URL on server.
 */
export function getFetchUrl(absoluteUrl: string): string {
  if (typeof window === "undefined") return absoluteUrl;
  return getProxiedUrl(absoluteUrl);
}
