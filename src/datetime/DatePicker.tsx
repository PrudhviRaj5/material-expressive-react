import * as React from 'react';

import './date-picker.css';

import {Icon} from '../icon';

export type DatePickerVariant = 'modal' | 'docked';
export type DatePickerSelectionMode = 'single' | 'range';
export type DatePickerInputMode = 'calendar' | 'text';

export type DateRange = {start: number | null; end: number | null};

export interface DatePickerConstraints {
  min?: number;
  max?: number;
  /** Return true to disable a specific UTC day (ms at any time). */
  shouldDisableDate?: (utcDateMs: number) => boolean;
  /** 0=Sun ... 6=Sat */
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export interface DatePickerProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange' | 'defaultValue' | 'inputMode'
  > {
  variant?: DatePickerVariant;
  selectionMode?: DatePickerSelectionMode;
  inputMode?: DatePickerInputMode;
  defaultInputMode?: DatePickerInputMode;

  /** For modal pickers. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  /** Controlled selection (UTC ms at midnight recommended). */
  value?: number | null | DateRange;
  /** Uncontrolled selection. */
  defaultValue?: number | null | DateRange;
  /** Fired on confirm or (for docked) when user presses OK. */
  onValueChange?: (value: number | null | DateRange) => void;
  /** Fired when the already-selected value is selected again. */
  onValueReselect?: (value: number | null | DateRange) => void;

  title?: string;
  supportingText?: string;

  confirmText?: string;
  cancelText?: string;
  clearText?: string;
  showClear?: boolean;

  /** Allowed range of selectable days (UTC ms). Overrides `constraints.min/max`. */
  minDate?: number | Date;
  maxDate?: number | Date;

  constraints?: DatePickerConstraints;
  locale?: string;
  timeZone?: string;

  onConfirm?: (value: number | null | DateRange) => void;
  onCancel?: () => void;
  onDismiss?: () => void;
}

type ViewMode = 'calendar' | 'years' | 'text';

function toUtcMidnight(ms: number) {
  const d = new Date(ms);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

function coerceDateMs(value: number | Date) {
  return typeof value === 'number' ? value : value.getTime();
}

function clamp(ms: number, min?: number, max?: number) {
  if (min !== undefined && ms < min) return min;
  if (max !== undefined && ms > max) return max;
  return ms;
}

function sameDay(a: number, b: number) {
  return toUtcMidnight(a) === toUtcMidnight(b);
}

function isRange(value: any): value is DateRange {
  return value && typeof value === 'object' && 'start' in value && 'end' in value;
}

function getDefaultTodayUtc() {
  const now = Date.now();
  return toUtcMidnight(now);
}

function fmtSelection(
  value: number | null | DateRange,
  mode: DatePickerSelectionMode,
  locale?: string,
  timeZone?: string,
) {
  const dtf = new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone,
  });

  if (mode === 'single') {
    if (typeof value !== 'number') return 'Select date';
    return dtf.format(new Date(value));
  }

  const range = isRange(value) ? value : {start: null, end: null};
  if (!range.start && !range.end) return 'Select dates';
  if (range.start && !range.end) return `${dtf.format(new Date(range.start))} –`;
  if (!range.start && range.end) return `– ${dtf.format(new Date(range.end))}`;
  return `${dtf.format(new Date(range.start!))} – ${dtf.format(new Date(range.end!))}`;
}

function fmtMonthYear(monthUtc: number, locale?: string, timeZone?: string) {
  const d = new Date(monthUtc);
  return new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
    timeZone,
  }).format(d);
}

function getMonthStartUtc(ms: number) {
  const d = new Date(ms);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1);
}

function addMonthsUtc(monthStartUtc: number, delta: number) {
  const d = new Date(monthStartUtc);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + delta, 1);
}

function buildMonthGrid(monthStartUtc: number, firstDayOfWeek: number) {
  const d = new Date(monthStartUtc);
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth();
  const firstOfMonth = Date.UTC(year, month, 1);
  const dow = new Date(firstOfMonth).getUTCDay();
  const offset = (dow - firstDayOfWeek + 7) % 7;
  const gridStart = firstOfMonth - offset * 86400000;

  const days: Array<{utc: number; inMonth: boolean}> = [];
  for (let i = 0; i < 42; i++) {
    const utc = gridStart + i * 86400000;
    const dd = new Date(utc);
    days.push({utc, inMonth: dd.getUTCMonth() === month});
  }
  return days;
}

function parseMmDdYyyy(value: string): number | null {
  const m = value.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  const mm = Number(m[1]);
  const dd = Number(m[2]);
  const yyyy = Number(m[3]);
  if (!mm || !dd || !yyyy) return null;
  const utc = Date.UTC(yyyy, mm - 1, dd);
  const dt = new Date(utc);
  if (
    dt.getUTCFullYear() !== yyyy ||
    dt.getUTCMonth() !== mm - 1 ||
    dt.getUTCDate() !== dd
  ) {
    return null;
  }
  return utc;
}

function formatMmDdYyyy(ms: number, timeZone?: string, locale?: string) {
  // Keep it stable for parsing; prefer en-US parts for mm/dd/yyyy.
  const dtf = new Intl.DateTimeFormat(locale ?? 'en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone,
  });
  return dtf.format(new Date(ms));
}

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  function DatePicker(
    {
      variant = 'modal',
      selectionMode = 'single',
      inputMode: inputModeProp,
      defaultInputMode = 'calendar',
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      value: valueProp,
      defaultValue,
      onValueChange,
      onValueReselect,
      title,
      supportingText,
      confirmText = 'OK',
      cancelText = 'Cancel',
      clearText = 'Clear',
      showClear = true,
      minDate,
      maxDate,
      constraints,
      locale,
      timeZone = 'UTC',
      onConfirm,
      onCancel,
      onDismiss,
      className,
      ...rest
    },
    ref,
  ) {
    const isOpenControlled = openProp !== undefined;
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
    const open = variant === 'modal' ? (isOpenControlled ? openProp : uncontrolledOpen) : true;

    const isValueControlled = valueProp !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = React.useState<
      number | null | DateRange
    >(
      defaultValue ?? (selectionMode === 'range' ? {start: null, end: null} : null),
    );
    const committed = isValueControlled ? (valueProp as any) : uncontrolledValue;

    const [draft, setDraft] = React.useState<number | null | DateRange>(committed);

    const [view, setView] = React.useState<ViewMode>(
      inputModeProp ?? defaultInputMode,
    );

    const firstDayOfWeek = constraints?.firstDayOfWeek ?? 0;

    const min =
      minDate !== undefined
        ? toUtcMidnight(coerceDateMs(minDate))
        : constraints?.min !== undefined
          ? toUtcMidnight(constraints.min)
          : undefined;
    const max =
      maxDate !== undefined
        ? toUtcMidnight(coerceDateMs(maxDate))
        : constraints?.max !== undefined
          ? toUtcMidnight(constraints.max)
          : undefined;

    const initialMonth = React.useMemo(() => {
      if (selectionMode === 'single') {
        const v = typeof committed === 'number' ? committed : null;
        return getMonthStartUtc(v ?? getDefaultTodayUtc());
      }
      const r = isRange(committed) ? committed : {start: null, end: null};
      return getMonthStartUtc(r.start ?? r.end ?? getDefaultTodayUtc());
    }, [committed, selectionMode]);

    const [monthUtc, setMonthUtc] = React.useState(initialMonth);

    React.useEffect(() => {
      setMonthUtc(initialMonth);
      setDraft(committed);
    }, [initialMonth, committed]);

    React.useEffect(() => {
      if (!open) return;
      setDraft(committed);
    }, [open]);

    const setOpen = React.useCallback(
      (next: boolean) => {
        if (!isOpenControlled) setUncontrolledOpen(next);
        onOpenChange?.(next);
        if (!next) onDismiss?.();
      },
      [isOpenControlled, onDismiss, onOpenChange],
    );

    const selectDay = (utc: number) => {
      const day = clamp(toUtcMidnight(utc), min, max);
      if (constraints?.shouldDisableDate?.(day)) return;

      if (selectionMode === 'single') {
        const prev = typeof draft === 'number' ? draft : null;
        if (prev !== null && sameDay(prev, day)) {
          onValueReselect?.(prev);
          return;
        }
        setDraft(day);
        return;
      }

      const r = isRange(draft) ? draft : {start: null, end: null};
      const {start, end} = r;
      if (start && end) {
        setDraft({start: day, end: null});
        return;
      }
      if (!start) {
        setDraft({start: day, end: null});
        return;
      }
      if (!end) {
        if (day < start) return;
        if (sameDay(start, day)) {
          onValueReselect?.({start, end: null});
          return;
        }
        setDraft({start, end: day});
      }
    };

    const commit = React.useCallback(
      (next: number | null | DateRange) => {
        if (!isValueControlled) setUncontrolledValue(next);
        onValueChange?.(next);
      },
      [isValueControlled, onValueChange],
    );

    const canConfirm = React.useMemo(() => {
      if (selectionMode === 'single') {
        return typeof draft === 'number';
      }
      const r = isRange(draft) ? draft : {start: null, end: null};
      return Boolean(r.start && r.end);
    }, [draft, selectionMode]);

    const onClear = () => {
      const next = selectionMode === 'range' ? {start: null, end: null} : null;
      setDraft(next);
    };

    const onCancelInternal = () => {
      setDraft(committed);
      onCancel?.();
      if (variant === 'modal') setOpen(false);
    };

    const onConfirmInternal = () => {
      if (selectionMode === 'single') {
        if (typeof draft !== 'number') return;
        commit(draft);
        onConfirm?.(draft);
        if (variant === 'modal') setOpen(false);
        return;
      }

      const r = isRange(draft) ? draft : {start: null, end: null};
      if (!r.start || !r.end) return;
      commit(r);
      onConfirm?.(r);
      if (variant === 'modal') setOpen(false);
    };

    const range = selectionMode === 'range' ? (isRange(draft) ? draft : {start: null, end: null}) : null;

    const days = React.useMemo(
      () => buildMonthGrid(monthUtc, firstDayOfWeek),
      [monthUtc, firstDayOfWeek],
    );

    const weekdayLabels = React.useMemo(() => {
      const base = new Date(Date.UTC(2025, 7, 3));
      const labels: string[] = [];
      for (let i = 0; i < 7; i++) {
        const day = new Date(base.getTime() + ((i + firstDayOfWeek) % 7) * 86400000);
        labels.push(
          new Intl.DateTimeFormat(locale, {
            weekday: 'narrow',
            timeZone,
          }).format(day),
        );
      }
      return labels;
    }, [firstDayOfWeek, locale, timeZone]);

    const isSelected = (utc: number) => {
      const day = toUtcMidnight(utc);
      if (selectionMode === 'single') {
        return typeof draft === 'number' && sameDay(draft, day);
      }
      if (!range) return false;
      if (range.start && !range.end) return sameDay(range.start, day);
      if (!range.start && range.end) return sameDay(range.end, day);
      return Boolean(range.start && range.end && day >= range.start && day <= range.end);
    };

    const isRangeEdge = (utc: number) => {
      if (selectionMode !== 'range' || !range) return {start: false, end: false};
      const day = toUtcMidnight(utc);
      return {start: Boolean(range.start && sameDay(range.start, day)), end: Boolean(range.end && sameDay(range.end, day))};
    };

    const isDisabledDay = (utc: number) => {
      const day = toUtcMidnight(utc);
      if (min !== undefined && day < min) return true;
      if (max !== undefined && day > max) return true;
      if (selectionMode === 'range') {
        const r = isRange(draft) ? draft : {start: null, end: null};
        if (r.start && !r.end && day < r.start) return true;
      }
      if (constraints?.shouldDisableDate?.(day)) return true;
      return false;
    };

    const todayUtc = getDefaultTodayUtc();

    const selectionText = fmtSelection(draft, selectionMode, locale, timeZone);
    const displayTitle = title ?? (selectionMode === 'range' ? 'Select dates' : 'Select date');

    const years = React.useMemo(() => {
      const d = new Date(monthUtc);
      const current = d.getUTCFullYear();
      const list: number[] = [];
      for (let y = current - 6; y <= current + 8; y++) list.push(y);
      return list;
    }, [monthUtc]);

    const selectedYear = new Date(monthUtc).getUTCFullYear();

    const renderCalendar = () => {
      return (
        <>
          <div className="mer-dtp__monthbar">
            <button
              type="button"
              className="mer-dtp__monthbtn"
              onClick={() => setView((v) => (v === 'years' ? 'calendar' : 'years'))}
            >
              {fmtMonthYear(monthUtc, locale, timeZone)}
              <span aria-hidden="true">▾</span>
            </button>
            <div className="mer-dtp__nav">
              <button
                type="button"
                className="mer-dtp__icon-btn"
                aria-label="Previous month"
                onClick={() => setMonthUtc((m) => addMonthsUtc(m, -1))}
              >
                ‹
              </button>
              <button
                type="button"
                className="mer-dtp__icon-btn"
                aria-label="Next month"
                onClick={() => setMonthUtc((m) => addMonthsUtc(m, 1))}
              >
                ›
              </button>
            </div>
          </div>

          {view === 'years' ? (
            <div className="mer-dtp__years">
              {years.map((y) => (
                <button
                  key={y}
                  type="button"
                  className={['mer-dtp__year', y === selectedYear ? 'mer-dtp__year--selected' : null]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => {
                    const d = new Date(monthUtc);
                    setMonthUtc(Date.UTC(y, d.getUTCMonth(), 1));
                    setView('calendar');
                  }}
                >
                  {y}
                </button>
              ))}
            </div>
          ) : (
            <>
              <div className="mer-dtp__week">
                {weekdayLabels.map((w, i) => (
                  <div className="mer-dtp__weekday" key={i}>
                    {w}
                  </div>
                ))}
              </div>
              <div className="mer-dtp__grid">
                {days.map((day, i) => {
                  const selected = isSelected(day.utc);
                  const edge = isRangeEdge(day.utc);
                  const outside = !day.inMonth;
                  const disabled = isDisabledDay(day.utc);
                  const today = sameDay(todayUtc, day.utc);

                  const classes = [
                    'mer-dtp__day',
                    outside ? 'mer-dtp__day--outside' : null,
                    today ? 'mer-dtp__day--today' : null,
                    selected && (edge.start || edge.end || selectionMode === 'single')
                      ? 'mer-dtp__day--selected'
                      : null,
                    selected && selectionMode === 'range' && !(edge.start || edge.end)
                      ? 'mer-dtp__range'
                      : null,
                  ]
                    .filter(Boolean)
                    .join(' ');

                  const dateNum = new Date(day.utc).getUTCDate();
                  return (
                    <button
                      key={i}
                      type="button"
                      className={classes}
                      aria-disabled={disabled ? 'true' : 'false'}
                      onClick={() => selectDay(day.utc)}
                    >
                      {dateNum}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </>
      );
    };

    const [textStart, setTextStart] = React.useState('');
    const [textEnd, setTextEnd] = React.useState('');

    React.useEffect(() => {
      if (selectionMode === 'single') {
        setTextStart(typeof draft === 'number' ? formatMmDdYyyy(draft, timeZone, locale) : '');
        setTextEnd('');
      } else {
        const r = isRange(draft) ? draft : {start: null, end: null};
        setTextStart(r.start ? formatMmDdYyyy(r.start, timeZone, locale) : '');
        setTextEnd(r.end ? formatMmDdYyyy(r.end, timeZone, locale) : '');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, selectionMode]);

    const applyText = () => {
      if (selectionMode === 'single') {
        const parsed = textStart ? parseMmDdYyyy(textStart) : null;
        if (parsed === null) return;
        const day = clamp(parsed, min, max);
        if (constraints?.shouldDisableDate?.(day)) return;
        setDraft(day);
        setMonthUtc(getMonthStartUtc(day));
        return;
      }
      const a = textStart ? parseMmDdYyyy(textStart) : null;
      const b = textEnd ? parseMmDdYyyy(textEnd) : null;
      if (a === null || b === null) return;
      const start = clamp(a, min, max);
      const end = clamp(b, min, max);
      if (constraints?.shouldDisableDate?.(start) || constraints?.shouldDisableDate?.(end)) return;
      if (end < start) {
        setDraft({start, end: null});
        setTextEnd('');
        setMonthUtc(getMonthStartUtc(start));
        return;
      }
      setDraft({start, end});
      setMonthUtc(getMonthStartUtc(start));
    };

    const renderText = () => {
      return (
        <div className="mer-dtp__inputs">
          <div className="mer-dtp__field">
            <div className="mer-dtp__label">{selectionMode === 'range' ? 'Start date' : 'Date'}</div>
            <input
              className="mer-dtp__input"
              placeholder="mm/dd/yyyy"
              value={textStart}
              onChange={(e) => setTextStart(e.target.value)}
              onBlur={applyText}
              inputMode="numeric"
            />
          </div>
          {selectionMode === 'range' ? (
            <div className="mer-dtp__field">
              <div className="mer-dtp__label">End date</div>
              <input
                className="mer-dtp__input"
                placeholder="mm/dd/yyyy"
                value={textEnd}
                onChange={(e) => setTextEnd(e.target.value)}
                onBlur={applyText}
                inputMode="numeric"
              />
            </div>
          ) : null}
        </div>
      );
    };

    const renderBody = () => {
      const effectiveView = view === 'text' ? 'text' : view;
      if (effectiveView === 'text') return renderText();
      return renderCalendar();
    };

    const headerToggle = (
      <button
        type="button"
        className="mer-dtp__icon-btn"
        aria-label={view === 'text' ? 'Switch to calendar input' : 'Switch to text input'}
        onClick={() => setView((v) => (v === 'text' ? 'calendar' : 'text'))}
      >
        <Icon>{view === 'text' ? 'calendar_month' : 'edit'}</Icon>
      </button>
    );

    const content = (
      <div
        {...rest}
        ref={ref}
        className={['mer-dtp', className].filter(Boolean).join(' ')}
      >
        <div className={variant === 'modal' ? 'mer-dtp__dialog' : 'mer-dtp__docked'}>
          <div className="mer-dtp__top">
            <div className="mer-dtp__title">{displayTitle}</div>
            <div className="mer-dtp__selection-row">
              <div className="mer-dtp__selection">{selectionText}</div>
              {headerToggle}
            </div>
            {supportingText ? (
              <div className="mer-dtp__title" style={{marginTop: 2}}>
                {supportingText}
              </div>
            ) : null}
          </div>

          <div className="mer-dtp__divider" />
          <div className="mer-dtp__body">{renderBody()}</div>
          <div className="mer-dtp__divider" />

          <div className="mer-dtp__actions">
            {showClear ? (
              <button type="button" className="mer-dtp__textbtn" onClick={onClear}>
                {clearText}
              </button>
            ) : (
              <span style={{flex: 1}} />
            )}
            <span style={{flex: 1}} />
            <button type="button" className="mer-dtp__textbtn" onClick={onCancelInternal}>
              {cancelText}
            </button>
            <button
              type="button"
              className="mer-dtp__textbtn"
              aria-disabled={canConfirm ? 'false' : 'true'}
              onClick={onConfirmInternal}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    );

    if (variant !== 'modal') {
      return content;
    }

    if (!open) return null;

    return (
      <div
        className={['mer-dtp', 'mer-dtp__modal-root'].filter(Boolean).join(' ')}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.stopPropagation();
            onCancelInternal();
          }
        }}
      >
        <div
          className="mer-dtp__scrim"
          onClick={() => {
            setOpen(false);
          }}
        />
        {content}
      </div>
    );
  },
);
