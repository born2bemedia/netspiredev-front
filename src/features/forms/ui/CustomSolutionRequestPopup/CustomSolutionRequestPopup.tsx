'use client';

import { useMemo, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { submitCustomSolutionRequestForm } from '@/features/forms/api/submitForm';
import {
  customSolutionBudgetOptions,
  customSolutionCommunicationOptions,
  customSolutionProjectTypeOptions,
  customSolutionTimelineOptions,
} from '@/features/forms/lib/customSolutionOptions';
import {
  type CustomSolutionRequestFormSchema,
  customSolutionRequestFormSchema,
} from '@/features/forms/model/schemas';
import { cn } from '@/shared/lib/helpers/styles';
import { FileIcon, PlusSmallIcon } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/kit/button/Button';

import { FormPopup } from '../FormPopup/FormPopup';
import styles from './CustomSolutionRequestPopup.module.scss';

type CustomSolutionRequestPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;

export const CustomSolutionRequestPopup = ({
  isOpen,
  onClose,
}: CustomSolutionRequestPopupProps) => {
  const t = useTranslations('forms');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);

  const form = useForm<CustomSolutionRequestFormSchema>({
    resolver: zodResolver(customSolutionRequestFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      website: '',
      projectTypes: [],
      projectTypeOther: '',
      budget: undefined,
      goals: '',
      timeline: undefined,
      communicationPreferences: [],
      recaptcha: '',
    },
  });

  const selectedProjectTypes = form.watch('projectTypes');
  const selectedBudget = form.watch('budget');
  const selectedTimeline = form.watch('timeline');
  const selectedCommunicationPreferences = form.watch('communicationPreferences');
  const isOtherProjectTypeSelected = selectedProjectTypes.includes('other');

  const projectTypeColumns = useMemo(
    () => [customSolutionProjectTypeOptions.slice(0, 4), customSolutionProjectTypeOptions.slice(4)],
    []
  );
  const budgetColumns = useMemo(
    () => [customSolutionBudgetOptions.slice(0, 2), customSolutionBudgetOptions.slice(2)],
    []
  );
  const timelineColumns = useMemo(
    () => [customSolutionTimelineOptions.slice(0, 2), customSolutionTimelineOptions.slice(2)],
    []
  );
  const communicationColumns = useMemo(
    () => [customSolutionCommunicationOptions.slice(0, 2), customSolutionCommunicationOptions.slice(2)],
    []
  );

  const resetState = () => {
    setError(null);
    setIsLoading(false);
    setIsSuccess(false);
    setAttachment(null);
    form.reset();
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const toggleProjectType = (
    value: CustomSolutionRequestFormSchema['projectTypes'][number]
  ) => {
    const currentValues = form.getValues('projectTypes');
    const nextValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    form.setValue('projectTypes', nextValues, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const toggleCommunicationPreference = (
    value: CustomSolutionRequestFormSchema['communicationPreferences'][number]
  ) => {
    const currentValues = form.getValues('communicationPreferences');
    const nextValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    form.setValue('communicationPreferences', nextValues, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const setBudget = (value: NonNullable<CustomSolutionRequestFormSchema['budget']>) => {
    form.setValue('budget', value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const setTimeline = (value: NonNullable<CustomSolutionRequestFormSchema['timeline']>) => {
    form.setValue('timeline', value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleAttachmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;

    if (nextFile && nextFile.size > MAX_ATTACHMENT_BYTES) {
      setAttachment(null);
      setError(
        t('customSolutionForm.fileTooLarge', {
          fallback: 'Please choose a file smaller than 10MB.',
        })
      );
      event.target.value = '';
      return;
    }

    setError(null);
    setAttachment(nextFile);
  };

  const onSubmit = async (data: CustomSolutionRequestFormSchema) => {
    setError(null);
    setIsLoading(true);

    try {
      await submitCustomSolutionRequestForm(data, attachment);
      setIsSuccess(true);
      setAttachment(null);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      setIsLoading(false);
    }
  };

  const renderTextField = (
    name: keyof Pick<
      CustomSolutionRequestFormSchema,
      'fullName' | 'email' | 'phone' | 'website' | 'projectTypeOther' | 'goals'
    >,
    label: string,
    placeholder: string,
    options?: {
      type?: 'text' | 'email' | 'tel';
      multiline?: boolean;
    }
  ) => {
    const fieldError = form.formState.errors[name];
    const inputId = `custom-solution-${name}`;
    const fieldClassName = cn(styles.field, options?.multiline && styles.fieldMultiline);

    return (
      <div className={fieldClassName}>
        <label className={styles.fieldLabel} htmlFor={inputId}>
          {label}
        </label>
        {options?.multiline ? (
          <textarea
            id={inputId}
            className={cn(styles.fieldInput, styles.fieldTextarea)}
            placeholder={placeholder}
            rows={3}
            {...form.register(name)}
          />
        ) : (
          <input
            id={inputId}
            type={options?.type ?? 'text'}
            className={styles.fieldInput}
            placeholder={placeholder}
            {...form.register(name)}
          />
        )}
        <span className={styles.fieldLine} aria-hidden="true" />
        {fieldError ? <span className={styles.fieldError}>{fieldError.message}</span> : null}
      </div>
    );
  };

  const renderChoice = ({
    checked,
    label,
    type,
    name,
    onChange,
  }: {
    checked: boolean;
    label: string;
    type: 'checkbox' | 'radio';
    name: string;
    onChange: () => void;
  }) => (
    <label className={styles.choice}>
      <input
        className={styles.choiceInput}
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <span
        className={cn(
          styles.choiceControl,
          type === 'radio' && styles.choiceControlRadio,
          checked && styles.choiceControlChecked
        )}
        aria-hidden="true"
      />
      <span className={styles.choiceLabel}>{label}</span>
    </label>
  );

  const renderChoiceColumns = (
    columns: readonly string[][],
    renderItem: (value: string) => React.ReactNode
  ) => (
    <div className={styles.choiceColumns}>
      {columns.map((column, index) => (
        <div key={`${index}-${column.join('-')}`} className={styles.choiceColumn}>
          {column.map(renderItem)}
        </div>
      ))}
    </div>
  );

  return (
    <FormPopup
      isOpen={isOpen}
      onClose={handleClose}
      ariaLabelledBy="custom-solution-popup-title"
      panelClassName={styles.panel}
    >
      <div className={styles.shell}>
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
          <div className={styles.successState}>
            <h2 id="custom-solution-popup-title" className={styles.successTitle}>
              {t('customSolutionForm.successTitle', { fallback: 'Thank you!' })}
            </h2>
            <p className={styles.successDescription}>
              {t('customSolutionForm.successMessage', {
                fallback:
                  'Your request has been received. We will review the details and contact you shortly to discuss the next steps.',
              })}
            </p>
            <div className={styles.successAction}>
              <Button variant="filled" type="button" onClick={handleClose}>
                <span className={styles.submitContent}>
                  <span>{t('customSolutionForm.closeAction', { fallback: 'Close' })}</span>
                  <PlusSmallIcon className={styles.submitIcon} aria-hidden="true" />
                </span>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.intro}>
              <h2 id="custom-solution-popup-title" className={styles.title}>
                {t('customSolutionForm.title', { fallback: 'Start Your Project' })}
              </h2>
              <p className={styles.description}>
                {t('customSolutionForm.description', {
                  fallback:
                    'Tell us about your idea — we’ll help shape it into a clear, functional digital solution. Share a few details below, and we’ll get in touch to discuss the next steps.',
                })}
              </p>
            </div>

            <form className={styles.form} onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <div className={styles.cards}>
                <section className={styles.card}>
                  <div className={styles.cardTitle}>
                    {t('customSolutionForm.sections.details', { fallback: 'Your Details' })}
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.detailsRow}>
                      {renderTextField(
                        'fullName',
                        t('customSolutionForm.fields.fullName.label', { fallback: 'Full name' }),
                        t('customSolutionForm.fields.fullName.placeholder', {
                          fallback: 'Tell us your name',
                        })
                      )}
                      {renderTextField(
                        'email',
                        t('customSolutionForm.fields.email.label', {
                          fallback: 'Email address',
                        }),
                        t('customSolutionForm.fields.email.placeholder', {
                          fallback: 'So we can reach out to you',
                        }),
                        { type: 'email' }
                      )}
                    </div>

                    {renderTextField(
                      'phone',
                      t('customSolutionForm.fields.phone.label', {
                        fallback: 'Phone number (optional)',
                      }),
                      t('customSolutionForm.fields.phone.placeholder', {
                        fallback: 'If you prefer to be contacted by phone',
                      }),
                      { type: 'tel' }
                    )}

                    {renderTextField(
                      'website',
                      t('customSolutionForm.fields.website.label', {
                        fallback: 'Your website (optional)',
                      }),
                      t('customSolutionForm.fields.website.placeholder', {
                        fallback: 'Share a link if you already have something in place',
                      })
                    )}
                  </div>
                </section>

                <section className={styles.card}>
                  <div className={styles.cardTitle}>
                    {t('customSolutionForm.sections.projectDetails', {
                      fallback: 'Project Details',
                    })}
                  </div>
                  <div className={styles.cardContent}>
                    {renderChoiceColumns(projectTypeColumns, (value) =>
                      renderChoice({
                        checked: selectedProjectTypes.includes(
                          value as CustomSolutionRequestFormSchema['projectTypes'][number]
                        ),
                        label: t(`customSolutionForm.projectTypes.${value}`, { fallback: value }),
                        type: 'checkbox',
                        name: 'projectTypes',
                        onChange: () =>
                          toggleProjectType(
                            value as CustomSolutionRequestFormSchema['projectTypes'][number]
                          ),
                      })
                    )}

                    {renderTextField(
                      'projectTypeOther',
                      t('customSolutionForm.fields.projectTypeOther.label', {
                        fallback: 'Please specify',
                      }),
                      t('customSolutionForm.fields.projectTypeOther.placeholder', {
                        fallback: 'Enter your option',
                      })
                    )}

                    {!isOtherProjectTypeSelected ? (
                      <p className={styles.helperText}>
                        {t('customSolutionForm.fields.projectTypeOther.helper', {
                          fallback: 'Use this field when "Other" is selected.',
                        })}
                      </p>
                    ) : null}
                  </div>
                </section>

                <section className={styles.card}>
                  <div className={styles.cardTitle}>
                    {t('customSolutionForm.sections.scopeBudget', {
                      fallback: 'Project Scope & Budget',
                    })}
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.group}>
                      <div className={styles.groupLabel}>
                        {t('customSolutionForm.fields.budget.label', {
                          fallback: 'Estimated budget',
                        })}
                      </div>
                      {renderChoiceColumns(budgetColumns, (value) =>
                        renderChoice({
                          checked: selectedBudget === value,
                          label: t(`customSolutionForm.budgets.${value}`, { fallback: value }),
                          type: 'radio',
                          name: 'budget',
                          onChange: () =>
                            setBudget(
                              value as NonNullable<CustomSolutionRequestFormSchema['budget']>
                            ),
                        })
                      )}
                    </div>

                    {renderTextField(
                      'goals',
                      t('customSolutionForm.fields.goals.label', {
                        fallback: 'What are your main goals for this project?',
                      }),
                      t('customSolutionForm.fields.goals.placeholder', {
                        fallback: 'Enter your goals',
                      }),
                      { multiline: true }
                    )}
                  </div>
                </section>

                <section className={styles.card}>
                  <div className={styles.cardTitle}>
                    {t('customSolutionForm.sections.timelineFiles', {
                      fallback: 'Timeline & Optional Files',
                    })}
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.group}>
                      <div className={styles.groupLabel}>
                        {t('customSolutionForm.fields.timeline.label', {
                          fallback: 'When would you like to get started?',
                        })}
                      </div>
                      {renderChoiceColumns(timelineColumns, (value) =>
                        renderChoice({
                          checked: selectedTimeline === value,
                          label: t(`customSolutionForm.timelines.${value}`, { fallback: value }),
                          type: 'radio',
                          name: 'timeline',
                          onChange: () =>
                            setTimeline(
                              value as NonNullable<CustomSolutionRequestFormSchema['timeline']>
                            ),
                        })
                      )}
                    </div>

                    <div className={styles.group}>
                      <div className={styles.groupLabel}>
                        {t('customSolutionForm.fields.communication.label', {
                          fallback: 'Preferred communication',
                        })}
                      </div>
                      {renderChoiceColumns(communicationColumns, (value) =>
                        renderChoice({
                          checked: selectedCommunicationPreferences.includes(
                            value as CustomSolutionRequestFormSchema['communicationPreferences'][number]
                          ),
                          label: t(`customSolutionForm.communication.${value}`, {
                            fallback: value,
                          }),
                          type: 'checkbox',
                          name: 'communicationPreferences',
                          onChange: () =>
                            toggleCommunicationPreference(
                              value as CustomSolutionRequestFormSchema['communicationPreferences'][number]
                            ),
                        })
                      )}
                    </div>

                    <div className={styles.group}>
                      <div className={styles.groupLabel}>
                        {t('customSolutionForm.fields.attachment.label', {
                          fallback: 'Upload any materials (optional)',
                        })}
                      </div>

                      <input
                        id="custom-solution-attachment"
                        className={styles.fileInput}
                        type="file"
                        onChange={handleAttachmentChange}
                      />

                      <label className={styles.fileUpload} htmlFor="custom-solution-attachment">
                        <span className={styles.fileUploadIcon} aria-hidden="true">
                          <FileIcon />
                        </span>
                        <span className={styles.fileUploadText}>
                          <span className={styles.fileUploadTitle}>
                            {t('customSolutionForm.fields.attachment.action', {
                              fallback: 'Choose File',
                            })}
                          </span>
                          <span className={styles.fileUploadName}>
                            {attachment?.name ??
                              t('customSolutionForm.fields.attachment.empty', {
                                fallback: 'no file selected',
                              })}
                          </span>
                        </span>
                        <span className={styles.fileUploadMeta}>
                          {t('customSolutionForm.fields.attachment.meta', {
                            fallback: 'Max size: 10MB',
                          })}
                        </span>
                      </label>
                    </div>
                  </div>
                </section>
              </div>

              {error ? <p className={styles.submitError}>{error}</p> : null}

              <div className={styles.footer}>
                <div className={styles.footerCopy}>
                  <h3 className={styles.footerTitle}>
                    {t('customSolutionForm.nextSteps.title', { fallback: 'Next Steps' })}
                  </h3>
                  <p className={styles.footerDescription}>
                    {t('customSolutionForm.nextSteps.description', {
                      fallback:
                        'Once submitted, we’ll review your request and reach out to discuss your idea, clarify details, and define the best way forward.',
                    })}
                  </p>
                </div>

                <div className={styles.submitAction}>
                  <Button variant="filled" type="submit" disabled={isLoading}>
                    <span className={styles.submitContent}>
                      <span>
                        {isLoading
                          ? t('loading', { fallback: 'Sending…' })
                          : t('customSolutionForm.submit', {
                              fallback: 'Submit Your Request',
                            })}
                      </span>
                      <PlusSmallIcon className={styles.submitIcon} aria-hidden="true" />
                    </span>
                  </Button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </FormPopup>
  );
};
