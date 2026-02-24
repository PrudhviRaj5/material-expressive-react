import * as React from 'react';

import './loading-indicator.css';

export type LoadingIndicatorVariant = 'contained' | 'uncontained';

export interface LoadingIndicatorProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children' | 'color'> {
  /** Contained draws a pill container behind the shape. */
  variant?: LoadingIndicatorVariant;

  /** CSS color for the morphing indicator. */
  indicatorColor?: string;
  /** Optional container/background color (contained only). */
  containerColor?: string;

  /** Size of the animated shape (CSS length). Default: 38px */
  indicatorSize?: number | string;
  /** Container width (CSS length). Default: 48px */
  containerWidth?: number | string;
  /** Container height (CSS length). Default: 48px */
  containerHeight?: number | string;

  /** Delay (ms) before showing when `visible` becomes true. */
  showDelay?: number;
  /** Minimum time (ms) to stay visible once shown. */
  minHideDelay?: number;

  /** Control visibility (useful for showDelay/minHideDelay). */
  visible?: boolean;
  defaultVisible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}

function asCssLen(v: number | string | undefined, fallback?: string) {
  if (v === undefined) return fallback;
  if (typeof v === 'number') return `${v}px`;
  return v;
}

export const LoadingIndicator = React.forwardRef<
  HTMLSpanElement,
  LoadingIndicatorProps
>(function LoadingIndicator(
  {
    variant = 'uncontained',
    indicatorColor,
    containerColor,
    indicatorSize,
    containerWidth,
    containerHeight,
    showDelay = 0,
    minHideDelay = 0,
    visible: visibleProp,
    defaultVisible = true,
    onVisibleChange,
    style,
    ...rest
  },
  ref,
) {
  const isControlled = visibleProp !== undefined;
  const [uncontrolledVisible, setUncontrolledVisible] = React.useState(defaultVisible);
  const requestedVisible = isControlled ? visibleProp : uncontrolledVisible;

  const [renderVisible, setRenderVisible] = React.useState(requestedVisible);
  const shownAtRef = React.useRef<number | null>(requestedVisible ? Date.now() : null);
  const showTimer = React.useRef<number | null>(null);
  const hideTimer = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (showTimer.current) window.clearTimeout(showTimer.current);
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };
  }, []);

  React.useEffect(() => {
    if (showTimer.current) window.clearTimeout(showTimer.current);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);

    if (requestedVisible) {
      if (renderVisible) return;
      showTimer.current = window.setTimeout(() => {
        shownAtRef.current = Date.now();
        setRenderVisible(true);
        onVisibleChange?.(true);
      }, Math.max(0, showDelay));
      return;
    }

    if (!renderVisible) return;
    const shownAt = shownAtRef.current;
    const elapsed = shownAt ? Date.now() - shownAt : 0;
    const remaining = Math.max(0, minHideDelay - elapsed);
    hideTimer.current = window.setTimeout(() => {
      shownAtRef.current = null;
      setRenderVisible(false);
      onVisibleChange?.(false);
    }, remaining);
  }, [requestedVisible, renderVisible, showDelay, minHideDelay, onVisibleChange]);

  // Keep uncontrolled state in sync when toggling via internal events (not used by default).
  const setVisible = (next: boolean) => {
    if (!isControlled) setUncontrolledVisible(next);
  };

  React.useEffect(() => {
    setVisible(requestedVisible);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedVisible]);

  if (!renderVisible) return null;

  const cssVars: React.CSSProperties = {
    ...(indicatorColor ? ({['--mer-loading-indicator-color' as any]: indicatorColor} as any) : null),
    ...(variant === 'contained'
      ? ({
          ['--mer-loading-container-color' as any]: containerColor ?? 'rgba(0,0,0,0.06)',
        } as any)
      : ({['--mer-loading-container-color' as any]: 'transparent'} as any)),
    ...(indicatorSize
      ? ({['--mer-loading-indicator-size' as any]: asCssLen(indicatorSize)} as any)
      : null),
    ...(containerWidth
      ? ({['--mer-loading-container-width' as any]: asCssLen(containerWidth)} as any)
      : null),
    ...(containerHeight
      ? ({['--mer-loading-container-height' as any]: asCssLen(containerHeight)} as any)
      : null),
  };

  return (
    <span
      {...rest}
      ref={ref}
      className={['mer-loading', rest.className].filter(Boolean).join(' ')}
      style={{...cssVars, ...(style ?? {})}}
      aria-busy="true"
    >
      <svg className="mer-loading__svg" viewBox="0 0 24 24" aria-hidden="true">
        <path className="mer-loading__shape" d="M 12 2 A 10 10 0 1 1 11.999 2 Z" />
      </svg>
    </span>
  );
});
