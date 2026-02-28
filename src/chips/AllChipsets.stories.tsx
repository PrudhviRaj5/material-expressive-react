import React from 'react';

import {AssistChip} from './AssistChip';
import {ChipSet} from './ChipSet';
import {FilterChip} from './FilterChip';
import {InputChip} from './InputChip';
import {SuggestionChip} from './SuggestionChip';
import {Icon} from '../icon';

const SlotSvg = (props: React.SVGProps<SVGSVGElement> & {slot?: string}) => {
  return <svg {...props} />;
};

const GOOGLE_LOGO = (
  <SlotSvg
    viewBox="0 0 24 24"
    slot="icon"
    aria-hidden="true"
    focusable="false"
    width="24"
    height="24"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="var(--md-sys-color-primary)"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="var(--md-sys-color-secondary)"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="var(--md-sys-color-tertiary)"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="color-mix(in srgb, var(--md-sys-color-primary) 55%, var(--md-sys-color-tertiary))"
    />
    <path d="M1 1h22v22H1z" fill="none" />
  </SlotSvg>
);

const meta = {
  title: 'chips/AllChipsets',
  tags: ['autodocs'],
  parameters: {layout: 'fullscreen'},
  argTypes: {
    label: {control: 'text'},
    elevated: {control: 'boolean'},
    disabled: {control: 'boolean'},
    scrolling: {control: 'boolean'},
  },
};

export default meta;

export const Default = {
  args: {
    label: '',
    elevated: false,
    disabled: false,
    scrolling: false,
  },
  render: ({label, elevated, disabled, scrolling}) => {
    const chipSetClass = scrolling ? 'scrolling' : undefined;

    const pageStyle: React.CSSProperties = {
      padding: 24,
      maxWidth: 1100,
      margin: '0 auto',
      boxSizing: 'border-box',
    };

    const sectionStyle: React.CSSProperties = {
      display: 'grid',
      gap: 12,
      marginBottom: 24,
    };

    const titleStyle: React.CSSProperties = {
      fontSize: 20,
      lineHeight: '24px',
      fontWeight: 600,
      margin: 0,
    };

    const subtitleStyle = {
      fontSize: 18,
      lineHeight: '22px',
      fontWeight: 600,
      margin: 0,
    };

    return (
      <div style={pageStyle}>
        <div style={sectionStyle}>
          <p style={titleStyle}>Assist chips</p>
          <ChipSet className={chipSetClass} aria-label="Assist chips">
            <AssistChip disabled={disabled} elevated={elevated}>
              {label || 'Assist chip'}
            </AssistChip>
            <AssistChip disabled={disabled} elevated={elevated}>
              <Icon slot="icon">local_laundry_service</Icon>
              {label || 'Assist chip with icon'}
            </AssistChip>
            <AssistChip elevated={elevated} href="https://google.com" target="_blank">
              {GOOGLE_LOGO} {label || 'Assist link chip'}
            </AssistChip>
            <AssistChip disabled alwaysFocusable elevated={elevated}>
              {label || 'Soft-disabled assist chip (focusable)'}
            </AssistChip>
          </ChipSet>
        </div>

        <div style={sectionStyle}>
          <p style={subtitleStyle}>Filter chips</p>
          <ChipSet className={chipSetClass} aria-label="Filter chips">
            <FilterChip disabled={disabled} elevated={elevated}>
              {label || 'Filter chip'}
            </FilterChip>
            <FilterChip disabled={disabled} elevated={elevated}>
              <Icon slot="icon">local_laundry_service</Icon>
              {label || 'Filter chip with icon'}
            </FilterChip>
            <FilterChip disabled={disabled} elevated={elevated} removable>
              {label || 'Removable filter chip'}
            </FilterChip>
            <FilterChip disabled alwaysFocusable elevated={elevated} removable>
              {label || 'Soft-disabled filter chip (focusable)'}
            </FilterChip>
          </ChipSet>
        </div>

        <div style={sectionStyle}>
          <p style={subtitleStyle}>Input chips</p>
          <ChipSet className={chipSetClass} aria-label="Input chips">
            <InputChip disabled={disabled}>
              {label || 'Input chip'}
            </InputChip>
            <InputChip disabled={disabled}>
              <Icon slot="icon">local_laundry_service</Icon>
              {label || 'Input chip with icon'}
            </InputChip>
            <InputChip disabled={disabled} avatar>
              <img
                slot="icon"
                alt=""
                src="https://lh3.googleusercontent.com/a/default-user=s48"
              />
              {label || 'Input chip with avatar'}
            </InputChip>
            <InputChip href="https://google.com" target="_blank">
              {GOOGLE_LOGO} {label || 'Input link chip'}
            </InputChip>
            <InputChip disabled={disabled} removeOnly>
              {label || 'Remove-only input chip'}
            </InputChip>
            <InputChip disabled alwaysFocusable>
              {label || 'Soft-disabled input chip (focusable)'}
            </InputChip>
          </ChipSet>
        </div>

        <div style={{...sectionStyle, marginBottom: 0}}>
          <p style={subtitleStyle}>Suggestion chips</p>
          <ChipSet className={chipSetClass} aria-label="Suggestion chips">
            <SuggestionChip disabled={disabled} elevated={elevated}>
              {label || 'Suggestion chip'}
            </SuggestionChip>
            <SuggestionChip disabled={disabled} elevated={elevated}>
              <Icon slot="icon">local_laundry_service</Icon>
              {label || 'Suggestion chip with icon'}
            </SuggestionChip>
            <SuggestionChip elevated={elevated} href="https://google.com" target="_blank">
              {GOOGLE_LOGO} {label || 'Suggestion link chip'}
            </SuggestionChip>
            <SuggestionChip disabled alwaysFocusable elevated={elevated}>
              {label || 'Soft-disabled suggestion chip (focusable)'}
            </SuggestionChip>
          </ChipSet>
        </div>

        <style>{`
          md-chip-set.scrolling {
            flex-wrap: nowrap;
            max-width: 880px;
            overflow: auto;
            padding: 8px;
          }
        `}</style>
      </div>
    );
  },
};
