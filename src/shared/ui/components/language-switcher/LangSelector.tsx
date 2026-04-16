'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { useLocale } from 'next-intl';

import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

import styles from './LangSelector.module.scss';

const LOCALE_LABELS: Record<string, string> = {
  en: 'English',
  de: 'German',
  it: 'Italian',
};

const LOCALE_SHORT_LABELS: Record<string, string> = {
  en: 'Eng',
  de: 'Ger',
  it: 'Ita',
};

const LOCALE_ICONS: Record<string, string> = {
  en: '/images/en.svg',
  de: '/images/de.svg',
  it: '/images/it.svg',
};

type LangSelectorProps = {
  className?: string;
  dropdownOnly?: boolean;
  isOpen?: boolean;
  onOpenChange?: (nextValue: boolean) => void;
  showDropdown?: boolean;
  variant?: 'desktop' | 'mobile';
};

export const LangSelector = ({
  className,
  dropdownOnly = false,
  isOpen,
  onOpenChange,
  showDropdown = true,
  variant = 'desktop',
}: LangSelectorProps) => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [internalOpen, setInternalOpen] = useState(false);

  const locales = routing.locales.filter((loc) => LOCALE_LABELS[loc] && LOCALE_ICONS[loc]);
  const currentLabel = LOCALE_LABELS[locale] ?? locale;
  const currentShortLabel = LOCALE_SHORT_LABELS[locale] ?? locale.toUpperCase();
  const open = isOpen ?? internalOpen;
  const showButton = !dropdownOnly;

  const setOpen = (nextValue: boolean) => {
    if (onOpenChange) {
      onOpenChange(nextValue);
      return;
    }

    setInternalOpen(nextValue);
  };

  useEffect(() => {
    if (!showButton || !open || onOpenChange) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, showButton]);

  const handleLocaleChange = (nextLocale: string) => {
    if (nextLocale !== locale) {
      router.replace(pathname, { locale: nextLocale });
    }

    setOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={[
        styles.langSelector,
        variant === 'mobile' ? styles.langSelectorMobile : styles.langSelectorDesktop,
        dropdownOnly ? styles.langSelectorDropdownOnly : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {showButton ? (
        <button
          type="button"
          className={styles.langSelectorButton}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label={currentLabel}
          onClick={() => setOpen(!open)}
        >
          <span className={styles.langSelectorButtonLabel}>
            {variant === 'mobile' ? currentShortLabel : currentLabel}
          </span>
          <span
            className={styles.langSelectorButtonCaret}
            aria-hidden="true"
            data-open={open}
          />
        </button>
      ) : null}

      {open && showDropdown ? (
        <div
          className={styles.langSelectorDropdown}
          role="listbox"
          aria-label="Select language"
        >
          {locales.map((loc) => {
            const label = LOCALE_LABELS[loc] ?? loc;
            const icon = LOCALE_ICONS[loc] ?? LOCALE_ICONS[routing.defaultLocale];
            const isActive = loc === locale;

            return (
              <button
                key={loc}
                type="button"
                role="option"
                aria-selected={isActive}
                className={styles.langSelectorDropdownItem}
                onClick={() => handleLocaleChange(loc)}
              >
                <span className={styles.langSelectorDropdownText}>{label}</span>
                <Image
                  src={icon}
                  width={22}
                  height={16}
                  alt=""
                  aria-hidden="true"
                  className={styles.langSelectorDropdownFlag}
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
