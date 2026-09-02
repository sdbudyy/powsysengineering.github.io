/* ---------------------------------------------------------------------------
   BASE-AWARE INTERNAL LINKS

   Astro rewrites asset URLs for you when `base` is set, but it does not touch
   hand-written `href` values. Without this helper the site works at a domain
   root and 404s on every link when served from a subpath — which is exactly
   what GitHub Pages does for a project repository
   (sdbudyy.github.io/powsysengineering.io/).

   Wrapping every internal link keeps one codebase working in both places:
   the real domain, where BASE_URL is "/" and this is a no-op, and the demo
   deployment, where it prefixes the repository path.

   It is deliberately safe to apply to anything: a value that is not a
   root-relative path — mailto:, tel:, https://, or a bare #anchor — is
   returned untouched, so it can be used on data-driven links whose contents
   are not known at the call site.
--------------------------------------------------------------------------- */

export const withBase = (path: string): string => {
  if (typeof path !== 'string' || !path.startsWith('/')) return path;

  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return base ? `${base}${path}` : path;
};
