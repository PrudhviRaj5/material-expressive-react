import * as React from 'react';

import {ensureCustomElementDefined} from './ensureDefined';

export type Importer = () => Promise<unknown>;

export function useMergedRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return React.useCallback(
    (value: T) => {
      for (const ref of refs) {
        if (!ref) continue;
        if (typeof ref === 'function') {
          ref(value);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (ref as any).current = value;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs,
  );
}

export function useEnsureDefined(tagName: string, importer: Importer) {
  React.useEffect(() => {
    void ensureCustomElementDefined(tagName, importer);
  }, [tagName, importer]);
}

export function useImperativeProps<E extends HTMLElement>(
  ref: React.RefObject<E | null>,
  apply: (el: E) => void,
  deps: React.DependencyList,
) {
  const useIsoLayoutEffect =
    typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    apply(el);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function useEventListener<E extends HTMLElement, EV extends Event>(
  ref: React.RefObject<E | null>,
  type: string,
  listener: ((ev: EV) => void) | undefined,
  options?: AddEventListenerOptions,
) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el || !listener) return;

    const handler = listener as EventListener;
    el.addEventListener(type, handler, options);
    return () => el.removeEventListener(type, handler, options);
  }, [ref, type, listener, options]);
}
