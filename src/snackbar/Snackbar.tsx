import * as React from 'react';

import './snackbar.css';

/**
 * Duration presets for how long the snackbar stays visible.
 * Mirrors Android's Snackbar.LENGTH_* constants.
 */
export const SnackbarDuration = {
  /** Show until explicitly dismissed. */
  INDEFINITE: -1,
  /** Show for a long period (~10 s). */
  LONG: 10_000,
  /** Show for a short period (~4 s). */
  SHORT: 4_000,
} as const;

export type SnackbarDurationValue =
  (typeof SnackbarDuration)[keyof typeof SnackbarDuration];

export interface SnackbarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** The supporting text displayed in the snackbar. */
  supportingText: string;
  /**
   * Optional action button label.
   * When provided, an action button is rendered.
   */
  action?: string;
  /** Callback fired when the action button is clicked. */
  onAction?: () => void;
  /** Whether to show the close (dismiss) icon button. */
  closeButton?: boolean;
  /** Callback fired when the close button is clicked. */
  onClose?: () => void;
  /**
   * Whether the snackbar is visible.
   * Controls the mount/unmount lifecycle.
   */
  open?: boolean;
  /**
   * How long the snackbar stays visible (in ms) before auto‑dismissing.
   * Use `SnackbarDuration.INDEFINITE` to disable auto‑dismiss.
   * @default SnackbarDuration.SHORT
   */
  duration?: number;
  /**
   * Callback fired when the snackbar is dismissed (by timeout, action, or close).
   */
  onDismiss?: () => void;
  /**
   * When `true`, the snackbar uses a taller multi‑line layout
   * with action buttons aligned to the bottom‑end.
   * @default false
   */
  multiLine?: boolean;
}

export const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  function Snackbar(
    {
      supportingText,
      action,
      onAction,
      closeButton = false,
      onClose,
      open = false,
      duration = SnackbarDuration.SHORT,
      onDismiss,
      multiLine = false,
      className,
      ...rest
    },
    ref,
  ) {
    // Keep a stable ref for callbacks so the auto-dismiss timer
    // doesn't restart on every parent render.
    const callbacksRef = React.useRef({onDismiss, onAction, onClose});
    React.useEffect(() => {
      callbacksRef.current = {onDismiss, onAction, onClose};
    });

    // Auto-dismiss timer
    React.useEffect(() => {
      if (!open || duration === SnackbarDuration.INDEFINITE) return;

      const timer = setTimeout(() => {
        callbacksRef.current.onDismiss?.();
      }, duration);

      return () => clearTimeout(timer);
    }, [open, duration]);

    if (!open) return null;

    const handleAction = () => {
      onAction?.();
      onDismiss?.();
    };

    const handleClose = () => {
      onClose?.();
      onDismiss?.();
    };

    const hasActions = action || closeButton;

    const classNames = [
      'mer-snackbar-reset',
      'mer-snackbar',
      multiLine && 'mer-snackbar--multi-line',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        {...rest}
        ref={ref}
        className={classNames}
        role="status"
        aria-live="polite"
      >
        <div className="mer-snackbar__supporting-text">{supportingText}</div>
        {hasActions && (
          <div className="mer-snackbar__actions">
            {action && (
              <button
                type="button"
                className="mer-snackbar__action-btn"
                onClick={handleAction}
              >
                {action}
              </button>
            )}
            {closeButton && (
              <button
                type="button"
                className="mer-snackbar__close-btn"
                onClick={handleClose}
                aria-label="Dismiss"
              >
                <svg
                  className="mer-snackbar__close-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    );
  },
);
