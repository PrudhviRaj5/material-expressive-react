import {styles as typescaleStyles} from '@material/web/typography/md-typescale-styles.js';

function hasAdoptedStyleSheets(
  target: Document | ShadowRoot,
): target is Document & {adoptedStyleSheets: CSSStyleSheet[]} {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Array.isArray((target as any).adoptedStyleSheets);
}

/**
 * Adds the Material typescale classes (e.g. `.md-typescale-body-medium`) to the
 * document so typography utility classes work.
 */
export function applyMaterialTypography(target?: Document | ShadowRoot) {
  if (typeof window === 'undefined') return;

  const resolvedTarget = target ?? document;

  if (hasAdoptedStyleSheets(resolvedTarget)) {
    const sheet = typescaleStyles.styleSheet;
    if (sheet) {
      if (!resolvedTarget.adoptedStyleSheets.includes(sheet)) {
        resolvedTarget.adoptedStyleSheets = [...resolvedTarget.adoptedStyleSheets, sheet];
      }
      return;
    }
    return;
  }

  // Fallback for older browsers without adoptedStyleSheets.
  const style = document.createElement('style');
  style.setAttribute('data-material-typescale', 'true');
  style.textContent = (typescaleStyles as unknown as {cssText?: string}).cssText ?? '';
  document.head.appendChild(style);
}
