import { useDocumentHead } from '@/hooks/useDocumentHead';
import { seo } from '@/data/seo';
import { site } from '@/data/site';

/**
 * Per-route head management. Pass `routeKey` to use the copy in src/data/seo.js,
 * or override any individual field inline.
 */
export default function Seo({ routeKey, title, description, path, image, type, noIndex }) {
  const preset = (routeKey && seo[routeKey]) || {};

  const resolvedTitle = title ?? preset.title ?? site.name;
  const resolvedDescription = description ?? preset.description ?? site.tagline;
  const resolvedPath = path ?? preset.path ?? '/';
  const canonical = `${site.url.replace(/\/$/, '')}${resolvedPath === '/' ? '/' : resolvedPath}`;

  useDocumentHead({
    title: resolvedTitle,
    description: resolvedDescription,
    canonical,
    image: `${site.url.replace(/\/$/, '')}${image ?? site.defaultOgImage}`,
    type: type ?? 'website',
    siteName: site.name,
    noIndex: noIndex ?? preset.noIndex ?? false,
  });

  return null;
}
