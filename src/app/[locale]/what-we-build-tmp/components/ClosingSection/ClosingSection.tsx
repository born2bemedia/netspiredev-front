'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { useFormsPopup } from '@/features/forms';

import { fadeInUp } from '@/shared/lib/helpers/animations';
import { PlusSmallIcon } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/kit/button/Button';

import styles from './ClosingSection.module.scss';

export const ClosingSection = () => {
  const t = useTranslations('whatWeBuildPage');
  const { openCustomSolutionRequest } = useFormsPopup();
  const viewport = { once: true, amount: 0.2 };

  return (
    <section className={styles.section}>
      

      <div className="container">
        <div className={styles.sectionInner}>
          <motion.div
            className={styles.content}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <h2 className={styles.title}>
              {t('closing.title', {
                fallback: "Let's Build Something That Works for You",
              })}
            </h2>

            <p className={styles.description}>
              {t('closing.description', {
                fallback:
                  'Your idea deserves more than a template. We focus on building solutions that are structured, functional, and ready to perform.',
              })}
            </p>

            <div className={styles.buttonWrap}>
              <Button variant="filled" type="button" onClick={openCustomSolutionRequest}>
                <span className={styles.buttonContent}>
                  <span>{t('closing.cta', { fallback: 'Start Your Project' })}</span>
                  <PlusSmallIcon className={styles.buttonIcon} aria-hidden="true" />
                </span>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
