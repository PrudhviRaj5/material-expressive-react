import * as React from 'react';

import './time-picker.css';

import {Icon} from '../icon';

export type TimePickerVariant = 'modal' | 'docked';
export type TimePickerFormat = '12h' | '24h';
export type TimePickerInputMode = 'clock' | 'keyboard';
export type TimePickerSelectionMode = 'single' | 'range';

export type TimeRange = {start: number | null; end: number | null};
export type TimeValue = number | {hour: number; minute: number} | string;

export interface TimePickerConstraints {
  /** Disable a specific minute-of-day. */
  shouldDisableTime?: (minutes: number) => boolean;
}

export interface TimePickerProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange' | 'defaultValue' | 'inputMode'
  > {
  variant?: TimePickerVariant;
  format?: TimePickerFormat;
  inputMode?: TimePickerInputMode;
  defaultInputMode?: TimePickerInputMode;
  selectionMode?: TimePickerSelectionMode;

  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  value?: number | null | TimeRange;
  defaultValue?: number | null | TimeRange;
  onValueChange?: (value: number | null | TimeRange) => void;
  onValueReselect?: (value: number | null | TimeRange) => void;

  title?: string;
  supportingText?: string;

  confirmText?: string;
  cancelText?: string;
  clearText?: string;
  showClear?: boolean;

  /** Allowed min/max time (minute-of-day). Accepts minutes, {hour,minute}, or 'HH:MM'. */
  minTime?: TimeValue;
  maxTime?: TimeValue;

  /** Minute increments for clock dial selection. */
  minuteStep?: 1 | 5 | 10 | 15 | 30;

  constraints?: TimePickerConstraints;
  locale?: string;

  onConfirm?: (value: number | null | TimeRange) => void;
  onCancel?: () => void;
  onDismiss?: () => void;
}

type ActiveField = 'hour' | 'minute';
type ActiveRangePart = 'start' | 'end';

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

function clamp(n: number, min?: number, max?: number) {
  if (min !== undefined && n < min) return min;
  if (max !== undefined && n > max) return max;
  return n;
}

function toMinutes(value: TimeValue): number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const m = value.trim().match(/^(\d{1,2}):(\d{2})$/);
    if (!m) return null;
    const hh = Number(m[1]);
    const mm = Number(m[2]);
    if (Number.isNaN(hh) || Number.isNaN(mm)) return null;
    if (hh < 0 || hh > 23 || mm < 0 || mm > 59) return null;
    return hh * 60 + mm;
  }
  const {hour, minute} = value;
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;
  return hour * 60 + minute;
}

function splitMinutes(total: number) {
  const minutes = ((total % 1440) + 1440) % 1440;
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  return {hour, minute};
}

function formatLabel(total: number, format: TimePickerFormat, locale?: string) {
  const {hour, minute} = splitMinutes(total);
  if (format === '24h') {
    return `${pad2(hour)}:${pad2(minute)}`;
  }

  const isPm = hour >= 12;
  const hh = hour % 12 === 0 ? 12 : hour % 12;
  const period = isPm ? 'PM' : 'AM';
  // Keep it deterministic (Android-like).
  return `${hh}:${pad2(minute)} ${period}`;
}

function isRange(value: any): value is TimeRange {
  return value && typeof value === 'object' && 'start' in value && 'end' in value;
}

function sameMinute(a: number, b: number) {
  return a === b;
}

function dialPositions(values: number[], radius: number) {
  const out: Array<{value: number; x: number; y: number}> = [];
  const count = values.length;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    out.push({
      value: values[i],
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    });
  }
  return out;
}

function Dial({
  values,
  selected,
  disabled,
  onSelect,
  ring,
}: {
  values: number[];
  selected: number | null;
  disabled: (value: number) => boolean;
  onSelect: (value: number) => void;
  ring: 'outer' | 'inner';
}) {
  const radius = ring === 'outer' ? 104 : 74;
  const positions = dialPositions(values, radius);

  return (
    <>
      {positions.map((p) => {
        const isSel = selected !== null && selected === p.value;
        const dis = disabled(p.value);
        return (
          <button
            key={`${ring}-${p.value}`}
            type="button"
            className={['mer-tp__dial-btn', isSel ? 'mer-tp__dial-btn--selected' : null]
              .filter(Boolean)
              .join(' ')}
            style={{
              transform: `translate(calc(-50% + ${p.x}px), calc(-50% + ${p.y}px))`,
            }}
            aria-disabled={dis ? 'true' : 'false'}
            onClick={() => onSelect(p.value)}
          >
            {p.value}
          </button>
        );
      })}
    </>
  );
}

function ClockHand({
  angle,
  length,
  selected,
}: {
  angle: number;
  length: number;
  selected: boolean;
}) {
  const r = 128;
  const cx = r;
  const cy = r;
  const x2 = cx + Math.cos(angle - Math.PI / 2) * length;
  const y2 = cy + Math.sin(angle - Math.PI / 2) * length;
  const stroke = selected ? 'var(--mer-tp-primary)' : 'var(--mer-tp-outline)';
  return (
    <svg className="mer-tp__hand" viewBox="0 0 256 256" aria-hidden="true">
      <line x1={cx} y1={cy} x2={x2} y2={y2} stroke={stroke} strokeWidth={2} />
      <circle cx={cx} cy={cy} r={3} fill={stroke} />
      <circle cx={x2} cy={y2} r={10} fill={stroke} />
    </svg>
  );
}

export const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  function TimePicker(
    {
      variant = 'modal',
      format = '12h',
      inputMode: inputModeProp,
      defaultInputMode,
      selectionMode = 'single',
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
      minTime,
      maxTime,
      minuteStep = 5,
      constraints,
      locale,
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
      number | null | TimeRange
    >(
      defaultValue ?? (selectionMode === 'range' ? {start: null, end: null} : null),
    );
    const committed = isValueControlled ? (valueProp as any) : uncontrolledValue;
    const [draft, setDraft] = React.useState<number | null | TimeRange>(committed);

    const initialInputMode: TimePickerInputMode =
      inputModeProp ??
      defaultInputMode ??
      (format === '24h' ? 'keyboard' : 'clock');

    const [mode, setMode] = React.useState<TimePickerInputMode>(initialInputMode);
    React.useEffect(() => {
      if (inputModeProp) setMode(inputModeProp);
    }, [inputModeProp]);

    React.useEffect(() => {
      setDraft(committed);
    }, [committed]);

    React.useEffect(() => {
      if (!open) return;
      setDraft(committed);
    }, [open]);

    const min = minTime !== undefined ? toMinutes(minTime) ?? undefined : undefined;
    const max = maxTime !== undefined ? toMinutes(maxTime) ?? undefined : undefined;
    const minClamped = min === undefined ? undefined : clamp(min, 0, 1439);
    const maxClamped = max === undefined ? undefined : clamp(max, 0, 1439);
    const minAllowed =
      minClamped !== undefined && maxClamped !== undefined && minClamped > maxClamped
        ? undefined
        : minClamped;
    const maxAllowed =
      minClamped !== undefined && maxClamped !== undefined && minClamped > maxClamped
        ? undefined
        : maxClamped;

    const setOpen = React.useCallback(
      (next: boolean) => {
        if (!isOpenControlled) setUncontrolledOpen(next);
        onOpenChange?.(next);
        if (!next) onDismiss?.();
      },
      [isOpenControlled, onDismiss, onOpenChange],
    );

    const commit = React.useCallback(
      (next: number | null | TimeRange) => {
        if (!isValueControlled) setUncontrolledValue(next);
        onValueChange?.(next);
      },
      [isValueControlled, onValueChange],
    );

    const [activeField, setActiveField] = React.useState<ActiveField>('hour');
    const [activePart, setActivePart] = React.useState<ActiveRangePart>('start');

    const currentMinutes = React.useMemo(() => {
      if (selectionMode === 'single') return typeof draft === 'number' ? draft : null;
      const r = isRange(draft) ? draft : {start: null, end: null};
      if (activePart === 'start') return r.start;
      // When picking an end time but it's not set yet, start from the start time.
      return r.end ?? r.start;
    }, [activePart, draft, selectionMode]);

    const current = currentMinutes ?? 0;
    const {hour: curHour, minute: curMinute} = splitMinutes(current);

    const isPm = curHour >= 12;
    const displayHour12 = curHour % 12 === 0 ? 12 : curHour % 12;

    const disabledTime = (minutes: number) => {
      const m = clamp(minutes, 0, 1439);
      if (minAllowed !== undefined && m < minAllowed) return true;
      if (maxAllowed !== undefined && m > maxAllowed) return true;
      if (selectionMode === 'range') {
        const r = isRange(draft) ? draft : {start: null, end: null};
        if (activePart === 'end' && r.start !== null) {
          // When choosing end minutes, end must be strictly after start.
          if (activeField === 'minute' && m <= r.start) return true;
          // For non-minute paths, keep a loose guard.
          if (activeField !== 'minute' && m < r.start) return true;
        }
      }
      if (constraints?.shouldDisableTime?.(m)) return true;
      return false;
    };

    const setMinutesForPart = (
      minutes: number,
      opts?: {advance?: boolean; strictEnd?: boolean},
    ) => {
      const m = clamp(minutes, 0, 1439);
      if (disabledTime(m)) return;

      if (selectionMode === 'single') {
        const prev = typeof draft === 'number' ? draft : null;
        if (prev !== null && sameMinute(prev, m)) {
          onValueReselect?.(prev);
          return;
        }
        setDraft(m);
        return;
      }

      const r = isRange(draft) ? draft : {start: null, end: null};
      if (r.start !== null && r.end !== null) {
        setDraft({start: m, end: null});
        setActivePart('end');
        setActiveField('hour');
        return;
      }

      if (activePart === 'start') {
        setDraft({start: m, end: null});
        if (opts?.advance) {
          setActivePart('end');
          setActiveField('hour');
        }
        return;
      }

      if (r.start !== null) {
        if (opts?.strictEnd) {
          if (m <= r.start) return;
        } else {
          if (m < r.start) return;
        }
      }
      setDraft({start: r.start, end: m});
    };

    const canConfirm = React.useMemo(() => {
      if (selectionMode === 'single') return typeof draft === 'number';
      const r = isRange(draft) ? draft : {start: null, end: null};
      return Boolean(r.start !== null && r.end !== null);
    }, [draft, selectionMode]);

    const onClear = () => {
      const next = selectionMode === 'range' ? {start: null, end: null} : null;
      setDraft(next);
      setActivePart('start');
    };

    const onCancelInternal = () => {
      setDraft(committed);
      setActivePart('start');
      onCancel?.();
      if (variant === 'modal') setOpen(false);
    };

    const onConfirmInternal = () => {
      if (!canConfirm) return;
      commit(draft);
      onConfirm?.(draft);
      if (variant === 'modal') setOpen(false);
    };

    const displayTitle = title ?? 'Select time';
    const selectionLabel =
      selectionMode === 'single'
        ? typeof draft === 'number'
          ? formatLabel(draft, format, locale)
          : 'Select time'
        : (() => {
            const r = isRange(draft) ? draft : {start: null, end: null};
            if (!r.start && !r.end) return 'Select times';
            if (r.start && !r.end) return `${formatLabel(r.start, format, locale)} –`;
            if (!r.start && r.end) return `– ${formatLabel(r.end, format, locale)}`;
            return `${formatLabel(r.start!, format, locale)} – ${formatLabel(r.end!, format, locale)}`;
          })();

    const hourChipText = format === '24h' ? pad2(curHour) : String(displayHour12);
    const minuteChipText = pad2(curMinute);

    const hoursOuter = React.useMemo(() => {
      if (format === '12h') return [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    }, [format]);
    const hoursInner = React.useMemo(() => {
      if (format !== '24h') return null;
      return [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    }, [format]);
    const minuteValues = React.useMemo(() => {
      const vals: number[] = [];
      for (let m = 0; m < 60; m += minuteStep) vals.push(m);
      return vals;
    }, [minuteStep]);

    const selectedHourForDial = React.useMemo(() => {
      if (activeField !== 'hour') return null;
      if (format === '12h') return displayHour12;
      return curHour < 12 ? curHour : curHour;
    }, [activeField, curHour, displayHour12, format]);

    const selectedMinuteForDial = React.useMemo(() => {
      if (activeField !== 'minute') return null;
      if (minuteStep === 1) return curMinute;
      // Snap to closest step for highlighting.
      const snapped = Math.round(curMinute / minuteStep) * minuteStep;
      return clamp(snapped, 0, 59);
    }, [activeField, curMinute, minuteStep]);

    const handAngle = React.useMemo(() => {
      if (activeField === 'hour') {
        const count = 12;
        const idx = format === '12h' ? (displayHour12 % 12) : (curHour % 12);
        return (idx / count) * Math.PI * 2;
      }

      // Angle based on the rendered minute values (step).
      const list = minuteValues.length ? minuteValues : [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
      let closestIdx = 0;
      let closestDist = Infinity;
      for (let i = 0; i < list.length; i++) {
        const dist = Math.abs(list[i] - curMinute);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
        }
      }
      return (closestIdx / list.length) * Math.PI * 2;
    }, [activeField, curHour, curMinute, displayHour12, format, minuteValues]);

    const setHour = (h: number) => {
      if (format === '12h') {
        const base = isPm ? 12 : 0;
        const hh = (h % 12) + base;
        const m = hh * 60 + curMinute;
        setMinutesForPart(m);
      } else {
        const hh = h;
        const m = hh * 60 + curMinute;
        setMinutesForPart(m);
      }
      setActiveField('minute');
    };

    const setMinute = (m: number) => {
      const minutes = curHour * 60 + m;
      if (selectionMode === 'range') {
        if (activePart === 'start') {
          setMinutesForPart(minutes, {advance: true});
        } else {
          setMinutesForPart(minutes, {strictEnd: true});
        }
        return;
      }
      setMinutesForPart(minutes);
    };

    const setPeriod = (nextIsPm: boolean) => {
      if (format !== '12h') return;
      const hh = curHour % 12;
      const newHour = nextIsPm ? hh + 12 : hh;
      setMinutesForPart(newHour * 60 + curMinute);
    };

    const renderClock = () => {
      const selectedDialValue = activeField === 'hour' ? selectedHourForDial : selectedMinuteForDial;
      const disabledForDial = (v: number) => {
        if (activeField === 'hour') {
          const hh =
            format === '12h' ? ((v % 12) + (isPm ? 12 : 0)) % 24 : v;

          // Disable end hours before the start hour.
          if (selectionMode === 'range' && activePart === 'end') {
            const r = isRange(draft) ? draft : {start: null, end: null};
            if (r.start !== null) {
              const {hour: startHour} = splitMinutes(r.start);
              if (hh < startHour) return true;
            }
          }

          // Respect min/max at hour granularity: disable only if the entire hour is out of range.
          const hourMin = hh * 60;
          const hourMax = hh * 60 + 59;
          if (minAllowed !== undefined && hourMax < minAllowed) return true;
          if (maxAllowed !== undefined && hourMin > maxAllowed) return true;

          return false;
        }
        return disabledTime(curHour * 60 + v);
      };

      return (
        <div className="mer-tp__face">
          <ClockHand
            angle={handAngle}
            length={activeField === 'hour' ? (hoursInner ? 74 : 104) : 104}
            selected={true}
          />
          {activeField === 'hour' ? (
            <>
              <Dial
                values={hoursOuter}
                selected={selectedDialValue}
                disabled={disabledForDial}
                onSelect={(v) => setHour(format === '12h' ? v : v)}
                ring="outer"
              />
              {hoursInner ? (
                <Dial
                  values={hoursInner}
                  selected={selectedDialValue}
                  disabled={disabledForDial}
                  onSelect={(v) => setHour(v)}
                  ring="inner"
                />
              ) : null}
            </>
          ) : (
            <Dial
              values={minuteValues}
              selected={selectedDialValue}
              disabled={disabledForDial}
              onSelect={(v) => setMinute(v)}
              ring="outer"
            />
          )}
        </div>
      );
    };

    const [hText, setHText] = React.useState('');
    const [mText, setMText] = React.useState('');
    React.useEffect(() => {
      setHText(format === '24h' ? pad2(curHour) : String(displayHour12));
      setMText(pad2(curMinute));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, format, selectionMode, activePart]);

    const applyKeyboard = () => {
      const hhRaw = Number(hText);
      const mmRaw = Number(mText);
      if (Number.isNaN(hhRaw) || Number.isNaN(mmRaw)) return;
      if (mmRaw < 0 || mmRaw > 59) return;

      let hh: number;
      if (format === '24h') {
        if (hhRaw < 0 || hhRaw > 23) return;
        hh = hhRaw;
      } else {
        if (hhRaw < 1 || hhRaw > 12) return;
        const base = isPm ? 12 : 0;
        hh = (hhRaw % 12) + base;
      }

      const minutes = hh * 60 + mmRaw;
      if (selectionMode === 'range') {
        if (activePart === 'start') {
          setMinutesForPart(minutes, {advance: true});
        } else {
          setMinutesForPart(minutes, {strictEnd: true});
        }
        return;
      }
      setMinutesForPart(minutes);
    };

    const renderKeyboard = () => {
      return (
        <div className="mer-tp__inputs">
          <div className="mer-tp__row">
            <div className="mer-tp__field">
              <div className="mer-tp__label">Hour</div>
              <input
                className="mer-tp__input"
                inputMode="numeric"
                value={hText}
                onChange={(e) => setHText(e.target.value)}
                onBlur={applyKeyboard}
              />
            </div>
            <div className="mer-tp__field">
              <div className="mer-tp__label">Minute</div>
              <input
                className="mer-tp__input"
                inputMode="numeric"
                value={mText}
                onChange={(e) => setMText(e.target.value)}
                onBlur={applyKeyboard}
              />
            </div>
          </div>

          {format === '12h' ? (
            <div className="mer-tp__period" aria-label="Period">
              <button
                type="button"
                className={['mer-tp__period-btn', !isPm ? 'mer-tp__period-btn--active' : null]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => setPeriod(false)}
              >
                AM
              </button>
              <button
                type="button"
                className={['mer-tp__period-btn', isPm ? 'mer-tp__period-btn--active' : null]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => setPeriod(true)}
              >
                PM
              </button>
            </div>
          ) : null}
        </div>
      );
    };

    const headerModeToggle = (
      <button
        type="button"
        className="mer-tp__toggle"
        aria-label={mode === 'keyboard' ? 'Switch to clock input' : 'Switch to keyboard input'}
        onClick={() => setMode((m) => (m === 'keyboard' ? 'clock' : 'keyboard'))}
      >
        <Icon>{mode === 'keyboard' ? 'schedule' : 'keyboard'}</Icon>
      </button>
    );

    const rangeTabs =
      selectionMode === 'range' ? (
        <div className="mer-tp__range-tabs" aria-label="Range part">
          <button
            type="button"
            className={['mer-tp__range-tab', activePart === 'start' ? 'mer-tp__range-tab--active' : null]
              .filter(Boolean)
              .join(' ')}
            onClick={() => {
              setActivePart('start');
              setActiveField('hour');
            }}
          >
            Start
          </button>
          <button
            type="button"
            className={['mer-tp__range-tab', activePart === 'end' ? 'mer-tp__range-tab--active' : null]
              .filter(Boolean)
              .join(' ')}
            onClick={() => {
              setActivePart('end');
              setActiveField('hour');
            }}
          >
            End
          </button>
        </div>
      ) : null;

    const content = (
      <div {...rest} ref={ref} className={['mer-tp', className].filter(Boolean).join(' ')}>
        <div className={variant === 'modal' ? 'mer-tp__dialog' : 'mer-tp__docked'}>
          <div className="mer-tp__top">
            <div className="mer-tp__title">{displayTitle}</div>
            <div className="mer-tp__header-row">
              <div className="mer-tp__selection">
                <button
                  type="button"
                  className={['mer-tp__chip', activeField === 'hour' ? 'mer-tp__chip--active' : null]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => setActiveField('hour')}
                  aria-label="Hour"
                >
                  {hourChipText}
                </button>
                <span className="mer-tp__sep">:</span>
                <button
                  type="button"
                  className={['mer-tp__chip', activeField === 'minute' ? 'mer-tp__chip--active' : null]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => setActiveField('minute')}
                  aria-label="Minute"
                >
                  {minuteChipText}
                </button>
                {format === '12h' ? (
                  <div className="mer-tp__period" aria-label="Period">
                    <button
                      type="button"
                      className={['mer-tp__period-btn', !isPm ? 'mer-tp__period-btn--active' : null]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => setPeriod(false)}
                    >
                      AM
                    </button>
                    <button
                      type="button"
                      className={['mer-tp__period-btn', isPm ? 'mer-tp__period-btn--active' : null]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => setPeriod(true)}
                    >
                      PM
                    </button>
                  </div>
                ) : null}
              </div>
              {headerModeToggle}
            </div>

            {supportingText ? (
              <div className="mer-tp__title" style={{marginTop: -2}}>
                {supportingText}
              </div>
            ) : null}

            {rangeTabs}

            <div className="mer-tp__title" style={{marginTop: 2}}>
              {selectionLabel}
            </div>
          </div>

          <div className="mer-tp__divider" />
          <div className="mer-tp__body">{mode === 'keyboard' ? renderKeyboard() : renderClock()}</div>
          <div className="mer-tp__divider" />

          <div className="mer-tp__actions">
            {showClear ? (
              <button type="button" className="mer-tp__textbtn" onClick={onClear}>
                {clearText}
              </button>
            ) : (
              <span style={{flex: 1}} />
            )}
            <span style={{flex: 1}} />
            <button type="button" className="mer-tp__textbtn" onClick={onCancelInternal}>
              {cancelText}
            </button>
            <button
              type="button"
              className="mer-tp__textbtn"
              aria-disabled={canConfirm ? 'false' : 'true'}
              onClick={onConfirmInternal}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    );

    if (variant !== 'modal') return content;
    if (!open) return null;

    return (
      <div
        className="mer-tp mer-tp__modal-root"
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.stopPropagation();
            onCancelInternal();
          }
        }}
      >
        <div
          className="mer-tp__scrim"
          onClick={() => {
            setOpen(false);
          }}
        />
        {content}
      </div>
    );
  },
);
