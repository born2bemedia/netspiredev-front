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

    const projectTypeColumns = [
      {
        label: t('projectTypeWebsiteLabel', { fallback: 'Website' }),
        value: 'website',
      },
      {
        label: t('projectTypeWebApplicationLabel', { fallback: 'Web Application' }),
        value: 'webApplication',
      },
      {
        label: t('projectTypeEcommerceLabel', { fallback: 'Ecommerce' }),
        value: 'ecommerce',
      },
      {
        label: t('projectTypeLandingPageLabel', { fallback: 'Landing Page' }),
        value: 'landingPage',
      },
      {
        label: t('projectTypeRedesignLabel', { fallback: 'Redesign' }),
        value: 'redesign',
      },
      {
        label: t('projectTypePerformanceImprovementsLabel', { fallback: 'Performance Improvements' }),
        value: 'performanceImprovements',
      },
      {
        label: t('projectTypeOngoingSupportLabel', { fallback: 'Ongoing Support' }),
        value: 'ongoingSupport',
      },
      {
        label: t('projectTypeOtherLabel', { fallback: 'Other' }),
        value: 'other',
      },
    ];
  const budgetColumns = [
      {
        label: t('budgetUnder1000Label', { fallback: 'Under €1,000' }),
        value: 'under1000',
      },
      {
        label: t('budget1000To2500Label', { fallback: '€1,000 – €2,500' }),
        value: 'budget1000To2500',
      },
      {
        label: t('budget2500To5000Label', { fallback: '€2,500 – €5,000' }),
        value: 'budget2500To5000',
      },
      {
        label: t('budget5000PlusLabel', { fallback: '€5,000+' }),
        value: 'budget5000Plus',
      },
  ];
  const timelineColumns = [
    {
      label: t('timelineAsSoonAsPossibleLabel', { fallback: 'As soon as possible' }),
      value: 'asSoonAsPossible',
    },
    {
      label: t('timelineWithinOneToTwoMonthsLabel', { fallback: 'Within 1-2 months' }),
      value: 'withinOneToTwoMonths',
    },
    {
        label: t('timelineWithinTwoToFourMonthsLabel', { fallback: 'Within 2-4 months' }),
        value: 'withinTwoToFourMonths',
      },
      {
        label: t('timelineFlexibleLabel', { fallback: 'Flexible' }),
        value: 'flexible',
    },
  ];
  const communicationColumns = [
    {
      label: t('communicationEmailLabel', { fallback: 'Email' }),
      value: 'email',
    },
    {
      label: t('communicationPhoneLabel', { fallback: 'Phone' }),
      value: 'phone',
    },
    {
      label: t('communicationVideoCallLabel', { fallback: 'Video Call' }),
      value: 'videoCall',
    },
  ];

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
    columns: readonly { label: string; value: string }[],
    renderItem: (item: { label: string; value: string } | string) => React.ReactNode
  ) => (
    <div className={styles.choiceColumns}>
      {columns.map((column, index) => (
        <div key={`${index}-${column.value}`} className={styles.choiceColumn}>
          {renderItem(column)}
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
                        t('fullNameLabel', { fallback: 'Full name' }),
                        t('fullNamePlaceholder', {
                          fallback: 'Tell us your name',
                        })
                      )}
                      {renderTextField(
                        'email',
                        t('emailLabel', {
                          fallback: 'Email address',
                        }),
                        t('emailPlaceholder', {
                          fallback: 'So we can reach out to you',
                        }),
                        { type: 'email' }
                      )}
                    </div>

                    {renderTextField(
                      'phone',
                      t('phoneLabel', {
                        fallback: 'Phone number (optional)',
                      }),
                      t('phonePlaceholder', {
                        fallback: 'If you prefer to be contacted by phone',
                      }),
                      { type: 'tel' }
                    )}

                    {renderTextField(
                      'website',
                      t('websiteLabel', {
                        fallback: 'Your website (optional)',
                      }),
                      t('websitePlaceholder', {
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
                    {renderChoiceColumns(projectTypeColumns, (item) =>
                      renderChoice({
                        checked: selectedProjectTypes.includes(
                          (item as { value: string }).value as CustomSolutionRequestFormSchema['projectTypes'][number]
                        ),
                        label: (item as { label: string }).label,
                        type: 'checkbox',
                        name: 'projectTypes',
                        onChange: () =>
                          toggleProjectType(
                            (item as { value: string }).value as CustomSolutionRequestFormSchema['projectTypes'][number]
                          ),
                      })
                    )}

                    {renderTextField(
                      'projectTypeOther',
                      t('projectTypeOtherLabel', {
                        fallback: 'Please specify',
                      }),
                      t('projectTypeOtherPlaceholder', {
                        fallback: 'Enter your option',
                      })
                    )}

                    {!isOtherProjectTypeSelected ? (
                      <p className={styles.helperText}>
                        {t('projectTypeOtherHelper', {
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
                        {t('budgetLabel', {
                          fallback: 'Estimated budget',
                        })}
                      </div>
                      {renderChoiceColumns(budgetColumns, (item) =>
                        renderChoice({
                          checked: selectedBudget === (item as { value: string }).value,
                          label: (item as { label: string }).label,
                          type: 'radio',
                          name: 'budget',
                          onChange: () =>
                            setBudget(
                              (item as { value: string }).value as NonNullable<CustomSolutionRequestFormSchema['budget']>
                            ),
                        })
                      )}
                    </div>

                    {renderTextField(
                      'goals',
                      t('goalsLabel', {
                        fallback: 'What are your main goals for this project?',
                      }),
                      t('goalsPlaceholder', {
                        fallback: 'Enter your goals',
                      }),
                      { multiline: true }
                    )}
                  </div>
                </section>

                <section className={styles.card}>
                  <div className={styles.cardTitle}>
                    {t('timelineFilesTitle', {
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
                      {renderChoiceColumns(timelineColumns, (item) =>
                        renderChoice({
                          checked: selectedTimeline === (item as { value: string }).value,
                          label: (item as { label: string }).label,
                          type: 'radio',
                          name: 'timeline',
                          onChange: () =>
                            setTimeline(
                              (item as { value: string }).value as NonNullable<CustomSolutionRequestFormSchema['timeline']>
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
                      {renderChoiceColumns(communicationColumns, (item) =>
                        renderChoice({
                          checked: selectedCommunicationPreferences.includes(
                            (item as { value: string }).value as CustomSolutionRequestFormSchema['communicationPreferences'][number]
                          ),
                          label: (item as { label: string }).label,
                          type: 'checkbox',
                          name: 'communicationPreferences',
                          onChange: () =>
                            toggleCommunicationPreference(
                              (item as { value: string }).value as CustomSolutionRequestFormSchema['communicationPreferences'][number]
                            ),
                        })
                      )}
                    </div>

                    <div className={styles.group}>
                      <div className={styles.groupLabel}>
                        {t('attachmentLabel', {
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
                            {t('attachmentAction', {
                              fallback: 'Choose File',
                            })}
                          </span>
                          <span className={styles.fileUploadName}>
                            {attachment?.name ??
                              t('attachmentEmpty', {
                                fallback: 'no file selected',
                              })}
                          </span>
                        </span>
                        <span className={styles.fileUploadMeta}>
                          {t('attachmentMeta', {
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
                    {t('nextStepsTitle', { fallback: 'Next Steps' })}
                  </h3>
                  <p className={styles.footerDescription}>
                    {t('nextStepsDescription', {
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
                          : t('submit', {
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
