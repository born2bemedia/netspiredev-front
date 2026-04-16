'use client';

import ReCAPTCHA from 'react-google-recaptcha';

import styles from './RecaptchaField.module.scss';

type RecaptchaFieldProps = {
  error?: string;
  recaptchaKey: number;
  onChange: (token: string | null) => void;
};

export const RecaptchaField = ({
  error,
  recaptchaKey,
  onChange,
}: RecaptchaFieldProps) => {
  return (
    <div className={styles.root}>
      <ReCAPTCHA
        key={recaptchaKey}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
        theme="dark"
        onChange={onChange}
      />
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
};
