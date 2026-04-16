'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { CustomSolutionRequestForm } from '../CustomSolutionRequestForm/CustomSolutionRequestForm';
import { FormPopup } from '../FormPopup/FormPopup';
import styles from './CustomSolutionRequestPopup.module.scss';

type CustomSolutionRequestPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CustomSolutionRequestPopup = ({
  isOpen,
  onClose,
}: CustomSolutionRequestPopupProps) => {
  const t = useTranslations('forms');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <FormPopup
      isOpen={isOpen}
      onClose={handleClose}
      ariaLabelledBy="custom-solution-popup-title"
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

        <CustomSolutionRequestForm
          variant="popup"
          titleId="custom-solution-popup-title"
          onSuccessAction={handleClose}
          successActionLabel={t('customSolutionForm.closeAction', { fallback: 'Close' })}
          isSuccess={isSuccess}
          setIsSuccess={setIsSuccess}
        />
      </div>
    </FormPopup>
  );
};
