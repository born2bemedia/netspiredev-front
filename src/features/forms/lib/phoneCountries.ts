import { defaultCountries, parseCountry } from 'react-international-phone';

import { excludedCountries } from '@/shared/lib/countries';

export const phoneCountries = defaultCountries.filter((country) => {
  const parsedCountry = parseCountry(country);

  return !excludedCountries.includes(parsedCountry.iso2.toLowerCase());
});

export const defaultPhoneCountry = 'gb';

const isoToFlagEmoji = (iso2: string) =>
  iso2
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));

export const phoneCountryOptions = phoneCountries.map((country) => {
  const parsedCountry = parseCountry(country);

  return {
    name: parsedCountry.name,
    iso2: parsedCountry.iso2,
    dialCode: parsedCountry.dialCode,
    flag: isoToFlagEmoji(parsedCountry.iso2),
  };
});
