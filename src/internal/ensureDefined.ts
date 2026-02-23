type Importer = () => Promise<unknown>;

const importCache = new Map<string, Promise<void>>();

/**
 * Ensures a custom element is defined exactly once in the browser.
 *
 * - SSR-safe: does nothing when `window` is not available.
 * - Deduped: multiple calls share the same Promise.
 */
export function ensureCustomElementDefined(
  tagName: string,
  importer: Importer,
): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }

  // If already defined, no need to import.
  if (customElements.get(tagName)) {
    return Promise.resolve();
  }

  const key = tagName;
  const existing = importCache.get(key);
  if (existing) return existing;

  const p = importer()
    .then(() => customElements.whenDefined(tagName))
    .then(() => void 0);

  importCache.set(key, p);
  return p;
}

