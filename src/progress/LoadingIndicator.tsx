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
        {/* Rounded 10-point burst */}
        <path
          className="mer-loading__shape mer-loading__shape--0"
          d="M12 2.4c.9 0 1.7.6 1.9 1.5l.4 1.7c.1.5.5.9 1 1.1l1.7.5c.9.2 1.5 1 1.5 1.9s-.6 1.7-1.5 1.9l-1.7.5c-.5.2-.9.6-1 1.1l-.4 1.7c-.2.9-1 1.5-1.9 1.5s-1.7-.6-1.9-1.5l-.4-1.7c-.1-.5-.5-.9-1-1.1l-1.7-.5c-.9-.2-1.5-1-1.5-1.9s.6-1.7 1.5-1.9l1.7-.5c.5-.2.9-.6 1-1.1l.4-1.7c.2-.9 1-1.5 1.9-1.5Z"
        />

        {/* Wavy circle */}
        <path
          className="mer-loading__shape mer-loading__shape--1"
          d="M12 3c3.9 0 6.9 2.3 7.6 5.3.7.5 1.3 1.7 1.3 3.7s-.6 3.2-1.3 3.7c-.7 3-3.7 5.3-7.6 5.3s-6.9-2.3-7.6-5.3C3.6 15.2 3 14 3 12s.6-3.2 1.4-3.7C5.1 5.3 8.1 3 12 3Z"
        />

        {/* Rounded pentagon */}
        <path
          className="mer-loading__shape mer-loading__shape--2"
          d="M12 3.2c.6 0 1.2.3 1.6.7l5 4.2c.6.5.9 1.2.7 2l-1.6 7.3c-.2.9-1 1.6-2 1.6H8.3c-1 0-1.8-.7-2-1.6l-1.6-7.3c-.2-.8.1-1.5.7-2l5-4.2c.4-.4 1-.7 1.6-.7Z"
        />

        {/* Tilted ellipse */}
        <ellipse
          className="mer-loading__shape mer-loading__shape--3"
          cx="12"
          cy="12"
          rx="7.6"
          ry="9.2"
          transform="rotate(24 12 12)"
        />

        {/* 8-point star */}
        <path
          className="mer-loading__shape mer-loading__shape--4"
          d="M12 2.6l1.7 4.2 4.3-1.5-1.6 4.1 4.2 1.7-4.2 1.7 1.6 4.1-4.3-1.5L12 21.4l-1.7-4.2-4.3 1.5 1.6-4.1-4.2-1.7 4.2-1.7-1.6-4.1 4.3 1.5L12 2.6Z"
        />

        {/* Clover-ish blob */}
        <path
          className="mer-loading__shape mer-loading__shape--5"
          d="M12 4.2c2 0 3.2 1.2 3.6 2.8.2 1 .9 1.7 1.9 1.9 1.6.4 2.8 1.6 2.8 3.6s-1.2 3.2-2.8 3.6c-1 .2-1.7.9-1.9 1.9-.4 1.6-1.6 2.8-3.6 2.8s-3.2-1.2-3.6-2.8c-.2-1-.9-1.7-1.9-1.9-1.6-.4-2.8-1.6-2.8-3.6s1.2-3.2 2.8-3.6c1-.2 1.7-.9 1.9-1.9.4-1.6 1.6-2.8 3.6-2.8Z"
        />

        {/* Soft squircle */}
        <path
          className="mer-loading__shape mer-loading__shape--6"
          d="M12 3.4c3.9 0 6.6 1.2 7.8 3.5 1.2 2.2 1.2 8.1 0 10.3-1.2 2.3-3.9 3.5-7.8 3.5s-6.6-1.2-7.8-3.5c-1.2-2.2-1.2-8.1 0-10.3C5.4 4.6 8.1 3.4 12 3.4Z"
        />
      </svg>
    </span>
  );
});
