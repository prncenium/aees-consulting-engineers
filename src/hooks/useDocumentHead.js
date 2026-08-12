import { useEffect } from 'react';

const MANAGED = 'data-aees-head';

function upsertMeta({ name, property, content }) {
  if (!content) return null;
  const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    if (name) el.setAttribute('name', name);
    if (property) el.setAttribute('property', property);
    el.setAttribute(MANAGED, 'true');
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
  return el;
}

function upsertLink(rel, href) {
  if (!href) return null;
  let el = document.head.querySelector(`link[rel="${rel}"][${MANAGED}]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    el.setAttribute(MANAGED, 'true');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  return el;
}

/**
 * Small dependency-free head manager: title, description, canonical and OG.
 * Used by <Seo />; no need to call it directly from pages.
 */
export function useDocumentHead({
  title,
  description,
  canonical,
  image,
  type = 'website',
  siteName,
  noIndex = false,
}) {
  useEffect(() => {
    if (title) document.title = title;

    upsertMeta({ name: 'description', content: description });
    upsertMeta({ name: 'robots', content: noIndex ? 'noindex, nofollow' : 'index, follow' });

    upsertMeta({ property: 'og:title', content: title });
    upsertMeta({ property: 'og:description', content: description });
    upsertMeta({ property: 'og:url', content: canonical });
    upsertMeta({ property: 'og:type', content: type });
    upsertMeta({ property: 'og:image', content: image });
    upsertMeta({ property: 'og:site_name', content: siteName });

    upsertMeta({ name: 'twitter:title', content: title });
    upsertMeta({ name: 'twitter:description', content: description });
    upsertMeta({ name: 'twitter:image', content: image });

    upsertLink('canonical', canonical);
  }, [title, description, canonical, image, type, siteName, noIndex]);
}

export default useDocumentHead;
