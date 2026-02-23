import * as React from 'react';

import {
  useEnsureDefined,
  useEventListener,
  useImperativeProps,
  useMergedRefs,
  type Importer,
} from './hooks';

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

function shouldAssignAsProperty(
  key: string,
  value: unknown,
  blockedKeys: Set<string>,
): boolean {
  if (blockedKeys.has(key)) return false;
  if (value === undefined) return false;
  if (key === 'children') return false;
  if (key === 'key' || key === 'ref') return false;
  if (key.startsWith('on')) return false;
  if (key.includes('-')) return false;
  if (DOM_PROP_ALLOWLIST.has(key)) return false;
  return true;
}

export interface UseWebComponentOptions {
  tagName: string;
  importer: Importer;
  /** Map of DOM event name -> prop callback name */
  events?: Record<string, string>;
}

export interface UseWebComponentResult<E extends HTMLElement> {
  ref: React.RefCallback<E>;
  // `any` is intentional: this object gets spread into a JSX custom element.
  // Using `unknown` makes TS reject the spread (even though we filter keys).
  domProps: Record<string, any>;
  innerRef: React.RefObject<E | null>;
}

/**
 * Shared wrapper behavior for Material Web custom elements.
 *
 * - Defines the element (SSR-safe)
 * - Assigns element properties (layout effect)
 * - Attaches explicit event listeners for CustomElements
 * - Returns filtered DOM props + merged ref
 */
export function useWebComponent<E extends HTMLElement>(
  options: UseWebComponentOptions,
  props: Record<string, unknown>,
  forwardedRef: React.Ref<E> | undefined,
): UseWebComponentResult<E> {
  useEnsureDefined(options.tagName, options.importer);

  const innerRef = React.useRef<E>(null);
  const mergedRef = useMergedRefs(forwardedRef, innerRef);

  const blockedKeys = new Set<string>();
  if (options.events) {
    for (const propName of Object.values(options.events)) blockedKeys.add(propName);
  }

  if (options.events) {
    for (const [eventName, propName] of Object.entries(options.events)) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEventListener(
        innerRef,
        eventName,
        props[propName] as ((ev: Event) => void) | undefined,
      );
    }
  }

  useImperativeProps(
    innerRef,
    (el) => {
      for (const [key, value] of Object.entries(props)) {
        if (!shouldAssignAsProperty(key, value, blockedKeys)) continue;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (el as any)[key] = value;
      }
    },
    // Assigning every render is fine; props objects are not stable.
    [props],
  );

  const domProps: Record<string, any> = {};
  for (const [key, value] of Object.entries(props)) {
    if (shouldPassAsDomProp(key, value, blockedKeys)) domProps[key] = value;
  }

  return {ref: mergedRef, domProps, innerRef};
}
