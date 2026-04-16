'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@/shared/lib/helpers/styles';

import {
  defaultPhoneCountry,
  phoneCountryOptions,
} from '../../lib/phoneCountries';
import styles from './PhoneField.module.scss';

type PhoneFieldProps = {
  error?: string;
  label: string;
  name: string;
  onBlur?: () => void;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
};

const normalizePhoneValue = (value: string) => value.replace(/[^\d+]/g, '');

const getMatchingCountry = (value: string) => {
  const normalized = normalizePhoneValue(value);

  if (!normalized.startsWith('+')) {
    return null;
  }

  return (
    [...phoneCountryOptions]
      .sort((a, b) => b.dialCode.length - a.dialCode.length)
      .find((country) => normalized.startsWith(`+${country.dialCode}`)) ?? null
  );
};

const getLocalNumber = (value: string, dialCode: string) => {
  const normalized = value.replace(/^\+/, '');

  if (!normalized.startsWith(dialCode)) {
    return value;
  }

  return value
    .slice(dialCode.length + 1)
    .trimStart();
};

export const PhoneField = ({
  error,
  label,
  name,
  onBlur,
  onChange,
  placeholder,
  value,
}: PhoneFieldProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const defaultCountry =
    phoneCountryOptions.find((country) => country.iso2 === defaultPhoneCountry) ??
    phoneCountryOptions[0];
  const derivedCountry = useMemo(
    () => getMatchingCountry(value) ?? defaultCountry,
    [defaultCountry, value]
  );

  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(derivedCountry);
  const [localValue, setLocalValue] = useState(
    value ? getLocalNumber(value, derivedCountry.dialCode) : ''
  );

  useEffect(() => {
    setSelectedCountry(derivedCountry);
    setLocalValue(value ? getLocalNumber(value, derivedCountry.dialCode) : '');
  }, [derivedCountry, value]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleLocalValueChange = (nextValue: string) => {
    const sanitizedValue = nextValue.replace(/[^\d\s-]/g, '');
    setLocalValue(sanitizedValue);

    const trimmed = sanitizedValue.trim();
    onChange(trimmed ? `+${selectedCountry.dialCode} ${trimmed}` : '');
  };

  const handleCountrySelect = (iso2: string) => {
    const nextCountry =
      phoneCountryOptions.find((country) => country.iso2 === iso2) ?? selectedCountry;

    setSelectedCountry(nextCountry);
    setIsOpen(false);

    const trimmed = localValue.trim();
    onChange(trimmed ? `+${nextCountry.dialCode} ${trimmed}` : '');
  };

  return (
    <div ref={rootRef} className={styles.root}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>

      <div className={styles.control}>
        <button
          type="button"
          className={styles.countryButton}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className={styles.flag} aria-hidden="true">
            {selectedCountry.flag}
          </span>
          <span className={styles.dialCode}>+{selectedCountry.dialCode}</span>
          <span className={styles.caret} aria-hidden="true" data-open={isOpen} />
        </button>

        <input
          id={name}
          name={name}
          type="tel"
          value={localValue}
          onChange={(event) => handleLocalValueChange(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
          className={styles.input}
          placeholder={placeholder}
          autoComplete="tel"
        />

        {isOpen ? (
          <div className={styles.dropdown} role="listbox" aria-label="Choose country">
            {phoneCountryOptions.map((country) => (
              <button
                key={country.iso2}
                type="button"
                className={styles.dropdownItem}
                onClick={() => handleCountrySelect(country.iso2)}
              >
                <span className={styles.dropdownCountry}>
                  <span className={styles.flag} aria-hidden="true">
                    {country.flag}
                  </span>
                  <span>{country.name}</span>
                </span>
                <span className={styles.dropdownDialCode}>+{country.dialCode}</span>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <span
        className={cn(
          styles.line,
          isFocused && styles.lineFocused,
          Boolean(error) && styles.lineError
        )}
        aria-hidden="true"
      />
      {error ? <span className={styles.errorText}>{error}</span> : null}
    </div>
  );
};
