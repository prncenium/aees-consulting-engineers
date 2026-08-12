import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge conditional class names, letting later Tailwind classes win. */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** 12400 -> "12,400" (Indian digits read fine with en-IN grouping). */
export function formatNumber(value, locale = 'en-IN') {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return '—';
  return new Intl.NumberFormat(locale).format(Number(value));
}

/** Zero-pad a section/index number: 3 -> "03". */
export function pad2(n) {
  return String(n).padStart(2, '0');
}

/** Build a keyless Google Maps embed URL from a free-text address or query. */
export function mapEmbedUrl(query, zoom = 15) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`;
}

/** Build a "get directions / open in Maps" link for the same query. */
export function mapLinkUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Case/diacritic-insensitive substring match used by the project search. */
export function includesText(haystack, needle) {
  if (!needle) return true;
  return String(haystack ?? '')
    .toLowerCase()
    .includes(String(needle).toLowerCase().trim());
}

/** Unique, sorted list of a field across a collection. */
export function uniqueBy(collection, key) {
  return Array.from(new Set(collection.map((item) => item[key]).filter(Boolean))).sort((a, b) =>
    String(a).localeCompare(String(b))
  );
}

/** Split an array into pages of `size`. Returns the requested page (1-indexed). */
export function paginate(items, page, size) {
  const totalPages = Math.max(1, Math.ceil(items.length / size));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * size;
  return {
    items: items.slice(start, start + size),
    page: safePage,
    totalPages,
    total: items.length,
    from: items.length === 0 ? 0 : start + 1,
    to: Math.min(start + size, items.length),
  };
}

/**
 * Windowed page list with ellipses, e.g. [1, '…', 4, 5, 6, '…', 12].
 * `siblings` = pages either side of the current one.
 */
export function pageWindow(current, total, siblings = 1) {
  const totalSlots = siblings * 2 + 5;
  if (total <= totalSlots) return Array.from({ length: total }, (_, i) => i + 1);

  const left = Math.max(current - siblings, 1);
  const right = Math.min(current + siblings, total);
  const showLeftDots = left > 2;
  const showRightDots = right < total - 1;

  if (!showLeftDots && showRightDots) {
    const count = 3 + siblings * 2;
    return [...Array.from({ length: count }, (_, i) => i + 1), 'right-ellipsis', total];
  }

  if (showLeftDots && !showRightDots) {
    const count = 3 + siblings * 2;
    return [
      1,
      'left-ellipsis',
      ...Array.from({ length: count }, (_, i) => total - count + 1 + i),
    ];
  }

  return [
    1,
    'left-ellipsis',
    ...Array.from({ length: right - left + 1 }, (_, i) => left + i),
    'right-ellipsis',
    total,
  ];
}

/** Basic RFC-ish email check — good enough for front-end validation. */
export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).trim());
}

/** Indian phone: optional +91 / 0 prefix, then 10 digits starting 6-9. */
export function isPhone(value) {
  const digits = String(value).replace(/[\s\-()]/g, '');
  return /^(\+?91|0)?[6-9]\d{9}$/.test(digits);
}

/** Slugify for anchors and ids. */
export function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
