import * as React from 'react';

import './search.css';

import {Icon} from '../icon';
import {IconListItem, List} from '../list';

type SearchViewItem = {
  id: string;
  headline: string;
  supportText?: string;
  leadingIcon?: string;
};

export interface SearchViewModalProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onInput' | 'onKeyDown'> {
  value?: string;
  placeholder?: string;

  items?: SearchViewItem[];

  onValueChange?: (nextValue: string) => void;
  onBackClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onCloseClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onItemClick?: (id: string) => void;
}

type SearchInputProps = {
  value: string;
  placeholder: string;
  onValueChange?: (nextValue: string) => void;
  onBackClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onCloseClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

function SearchInput({
  value,
  placeholder,
  onValueChange,
  onBackClick,
  onCloseClick,
  onInput,
  onKeyDown,
}: SearchInputProps) {
  return (
    <div className="mer-search-view-modal__inputRow">
      <button
        type="button"
        className="mer-search-view-modal__iconButton"
        aria-label="Back"
        onClick={onBackClick}
      >
        <Icon>arrow_back</Icon>
      </button>

      <input
        className="mer-search-view-modal__input"
        value={value}
        placeholder={placeholder}
        onChange={(ev) => {
          onValueChange?.(ev.currentTarget.value);
        }}
        onInput={onInput}
        onKeyDown={onKeyDown}
      />

      <button
        type="button"
        className="mer-search-view-modal__iconButton"
        aria-label="Close"
        onClick={onCloseClick}
      >
        <Icon>close</Icon>
      </button>
    </div>
  );
}

export const SearchViewModal = React.forwardRef<HTMLDivElement, SearchViewModalProps>(
  function SearchViewModal(
    {
      value: valueProp,
      placeholder = 'Input text',
      items = [],
      onValueChange,
      onBackClick,
      onCloseClick,
      onInput,
      onKeyDown,
      onItemClick,
      className,
      role,
      ...rest
    },
    ref,
  ) {
    const [uncontrolledValue, setUncontrolledValue] = React.useState('');
    const isControlled = valueProp != null;
    const value = isControlled ? String(valueProp) : uncontrolledValue;

    const setValue = React.useCallback(
      (next: string) => {
        if (!isControlled) setUncontrolledValue(next);
        onValueChange?.(next);
      },
      [isControlled, onValueChange],
    );

    return (
      <div
        {...rest}
        ref={ref}
        role={role ?? 'dialog'}
        aria-modal="true"
        className={['mer-search-view-modal', className].filter(Boolean).join(' ')}
      >
        <SearchInput
          value={value}
          placeholder={placeholder}
          onValueChange={setValue}
          onBackClick={onBackClick}
          onCloseClick={onCloseClick}
          onInput={onInput}
          onKeyDown={onKeyDown}
        />

        {items.length > 0 ? (
          <div className="mer-search-view-modal__list">
            <List style={{width: '100%'}} gap={0} size="Medium" aria-label="Search results">
              {items.map((item) => (
                <IconListItem
                  key={item.id}
                  headline={item.headline}
                  supportText={item.supportText}
                  leadingIcon={item.leadingIcon ?? 'person'}
                  leadingIconContainer="circle"
                  trailingText=""
                  trailingIcon=""
                  selectedTrailingIcon=""
                  type="button"
                  onClick={() => onItemClick?.(item.id)}
                />
              ))}
            </List>
          </div>
        ) : null}
      </div>
    );
  },
);
