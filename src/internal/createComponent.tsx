import * as React from 'react';

import {useEnsureDefined, useEventListener, useMergedRefs} from './hooks';

export type WebComponentProps<E extends HTMLElement> = React.HTMLAttributes<E> &
  Partial<Omit<E, keyof HTMLElement>> & {
    children?: React.ReactNode;
  };

export interface CreateComponentOptions<E extends HTMLElement> {
  displayName: string;
  tagName: string;
  /**
   * Import path for side-effectful custom element registration.
   *
   * This is informational only; for actual registration you should pass an
   * `importer` function that uses a *static* import() so bundlers (Vite/Next)
   * can resolve the dependency.
   */
  importPath: string;
  /**
   * Side-effectful importer used to register the custom element.
   *
   * IMPORTANT: this should be a static import(), e.g.
   * `() => import('@material/web/button/filled-button.js')`.
   */
  importer: () => Promise<unknown>;
  /** Map of DOM event name -> prop callback name */
  events?: Record<string, string>;
}

const DOM_PROP_ALLOWLIST = new Set<string>([
  'id',
  'className',
  'style',
  'title',
  'role',
  'tabIndex',
  'hidden',
  'dir',
  'lang',
  'draggable',
  'contentEditable',
  'spellCheck',
  'accessKey',
  'translate',
  'slot',
  'part',
]);

function shouldPassAsDomProp(
  key: string,
  value: unknown,
  blockedKeys: Set<string>,
): boolean {
  if (blockedKeys.has(key)) return false;
  if (DOM_PROP_ALLOWLIST.has(key)) return true;
  if (key.startsWith('data-') || key.startsWith('aria-')) return true;
  if (key.startsWith('on') && typeof value === 'function') return true;
  return false;
}

function shouldAssignAsProperty(key: string, value: unknown): boolean {
  if (value === undefined) return false;
  if (key === 'children') return false;
  if (key === 'key' || key === 'ref') return false;
  if (key.startsWith('on')) return false;
  if (key.includes('-')) return false;
  if (DOM_PROP_ALLOWLIST.has(key)) return false;
  return true;
}

/**
 * Generic React wrapper for a single custom element.
 *
 * - SSR-safe: auto-defines the element only in the browser.
 * - Assigns non-DOM props as properties on the element.
 * - Re-emits selected CustomEvent/DOM events via addEventListener.
 */
export function createComponent<E extends HTMLElement>(
  options: CreateComponentOptions<E>,
) {
  return createComponentTyped<E, WebComponentProps<E>>(options);
}

export function createComponentTyped<
  E extends HTMLElement,
  P extends {children?: React.ReactNode} = WebComponentProps<E>,
>(options: CreateComponentOptions<E>) {
  const Component = React.forwardRef<E, P>(function WebComponent(props, ref) {
    const {children, ...rest} = props as unknown as {
      children?: React.ReactNode;
      [key: string]: unknown;
    };
    useEnsureDefined(options.tagName, options.importer);

    const innerRef = React.useRef<E>(null);
    const mergedRef = useMergedRefs(ref, innerRef);

    // Attach explicit event listeners.
    if (options.events) {
      for (const [eventName, propName] of Object.entries(options.events)) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEventListener(
          innerRef,
          eventName,
          (props as unknown as Record<string, unknown>)[propName] as
            | ((ev: Event) => void)
            | undefined,
        );
      }
    }

    // Assign properties.
    React.useEffect(() => {
      const el = innerRef.current;
      if (!el) return;

      for (const [key, value] of Object.entries(rest)) {
        if (!shouldAssignAsProperty(key, value)) continue;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (el as any)[key] = value;
      }
    });

    const blockedKeys = new Set<string>();
    if (options.events) {
      for (const propName of Object.values(options.events)) blockedKeys.add(propName);
    }

    const domProps: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(rest)) {
      if (shouldPassAsDomProp(key, value, blockedKeys)) domProps[key] = value;
    }

    return React.createElement(
      options.tagName,
      {
        ...domProps,
        ref: mergedRef,
      },
      children,
    );
  });

  Component.displayName = options.displayName;
  return Component;
}
