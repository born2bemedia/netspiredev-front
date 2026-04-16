'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';

import { submitRequestForm } from '@/features/forms/api/submitForm';
import { type RequestFormSchema, requestFormSchema } from '@/features/forms/model/schemas';

import { PlusSmallIcon } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/kit/button/Button';

import { FormPopup } from '../FormPopup/FormPopup';
import { PhoneField } from '../PhoneField/PhoneField';
import { RecaptchaField } from '../RecaptchaField/RecaptchaField';
import styles from './RequestPopup.module.scss';

type RequestPopupProps = {
  service: string;
  isOpen: boolean;
  onClose: () => void;
  onReturnHome?: () => void;
};

const ENABLE_RECAPTCHA = true;

export const RequestPopup = ({ service, isOpen, onClose, onReturnHome }: RequestPopupProps) => {
  const t = useTranslations('forms');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaKey, setRecaptchaKey] = useState(0);

  const form = useForm<RequestFormSchema>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      website: '',
      message: '',
      recaptcha: '',
    },
  });

  const handleClose = () => {
    setError(null);
    setIsLoading(false);
    setIsSuccess(false);
    setRecaptchaKey((current) => current + 1);
    form.reset();
    onReturnHome?.();
    onClose();
  };

  const onSubmit = async (data: RequestFormSchema) => {
    setError(null);
    setIsLoading(true);

    try {
      await submitRequestForm(data, service);
      setIsSuccess(true);
      setRecaptchaKey((current) => current + 1);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed');
      setRecaptchaKey((current) => current + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecaptchaChange = (token: string | null) => {
    if (ENABLE_RECAPTCHA) {
      form.setValue('recaptcha', token || '', { shouldValidate: true });
      return;
    }

    form.setValue('recaptcha', 'disabled', { shouldValidate: false });
  };

  const renderField = (
    name: keyof Pick<
      RequestFormSchema,
      'firstName' | 'lastName' | 'email' | 'phone' | 'website' | 'message'
    >,
    label: string,
    placeholder: string,
    type: 'text' | 'email' | 'tel' = 'text'
  ) => {
    const fieldError = form.formState.errors[name];

    return (
      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor={`request-${name}`}>
          {label}
        </label>
        <input
          id={`request-${name}`}
          type={type}
          className={styles.fieldInput}
          placeholder={placeholder}
          {...form.register(name)}
        />
        <span className={styles.fieldLine} aria-hidden="true" />
        {fieldError ? <span className={styles.fieldError}>{fieldError.message}</span> : null}
      </div>
    );
  };

  const renderPhoneField = () => (
    <Controller
      control={form.control}
      name="phone"
      render={({ field, fieldState }) => (
        <PhoneField
          name={field.name}
          value={field.value ?? ''}
          onChange={field.onChange}
          onBlur={field.onBlur}
          label={t('phone', { fallback: 'Phone:' })}
          placeholder={t('phonePlaceholder', { fallback: 'Enter your phone number' })}
          error={fieldState.error?.message}
        />
      )}
    />
  );

  return (
    <FormPopup
      isOpen={isOpen}
      onClose={handleClose}
      ariaLabelledBy="request-popup-title"
      panelClassName={styles.panel}
    >
      <div className={`${styles.shell} ${isSuccess ? styles.successShell : ''}`}>
        <button
          type="button"
          className={styles.close}
          onClick={handleClose}
          aria-label={t('close', { fallback: 'Close' })}
        >
          <span>{t('close', { fallback: 'Close' })}</span>
          <span className={styles.closeIcon} aria-hidden="true" />
        </button>

        {isSuccess ? (
          <div className={styles.successLayout}>
            <div className={styles.successContent}>
              <h2 id="request-popup-title" className={styles.successTitle}>
                {t('requestForm.successTitle', { fallback: 'Thank you!' })}
              </h2>
              <p className={styles.successDescription}>
                {t('requestForm.successMessage1', {
                  fallback:
                    'Your request has been received successfully. Our team will review your details and contact you shortly to discuss the next steps.',
                })}
              </p>
            </div>

            <div className={styles.successVisual} aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/forms/request-popup/success-globe-desktop.svg"
                alt=""
                className={styles.successImageDesktop}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/forms/request-popup/success-globe-mobile.svg"
                alt=""
                className={styles.successImageMobile}
              />
            </div>
          </div>
        ) : (
          <div className={styles.formLayout}>
            <div className={styles.summary}>
              <h2 id="request-popup-title" className={styles.title}>
                {service}
              </h2>

              <div className={styles.submitDesktop}>
                <Button
                  variant="filled"
                  type="button"
                  onClick={() => void form.handleSubmit(onSubmit)()}
                  disabled={isLoading}
                >
                  <span className={styles.submitContent}>
                    <span>
                      {isLoading
                        ? t('loading', { fallback: 'Sending…' })
                        : t('submit', { fallback: 'Submit' })}
                    </span>
                    <PlusSmallIcon className={styles.submitIcon} aria-hidden="true" />
                  </span>
                </Button>
              </div>
            </div>

            <form className={styles.form} onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <div className={styles.formGrid}>
                {renderField(
                  'firstName',
                  t('firstName', { fallback: 'First Name:' }),
                  t('firstNamePlaceholder', { fallback: 'Enter your first name' })
                )}
                {renderField(
                  'lastName',
                  t('lastName', { fallback: 'Last Name:' }),
                  t('lastNamePlaceholder', { fallback: 'Enter your last name' })
                )}
                {renderField(
                  'email',
                  t('email', { fallback: 'Email:' }),
                  t('emailPlaceholder', { fallback: 'Enter your email' }),
                  'email'
                )}
                {renderPhoneField()}
                {renderField(
                  'website',
                  t('website', { fallback: 'Your Website:' }),
                  t('websitePlaceholder', { fallback: 'Enter your website' })
                )}
                {renderField(
                  'message',
                  t('message', { fallback: 'Message:' }),
                  t('messagePlaceholder', { fallback: 'Enter your message' })
                )}
              </div>

              {error ? <p className={styles.submitError}>{error}</p> : null}

              {ENABLE_RECAPTCHA ? (
                <div className={styles.recaptcha}>
                  <RecaptchaField
                    recaptchaKey={recaptchaKey}
                    onChange={handleRecaptchaChange}
                    error={form.formState.errors.recaptcha?.message}
                  />
                </div>
              ) : null}

              <div className={styles.submitMobile}>
                <Button variant="filled" type="submit" disabled={isLoading}>
                  <span className={styles.submitContent}>
                    <span>
                      {isLoading
                        ? t('loading', { fallback: 'Sending…' })
                        : t('submit', { fallback: 'Submit' })}
                    </span>
                    <PlusSmallIcon className={styles.submitIcon} aria-hidden="true" />
                  </span>
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </FormPopup>
  );
};
