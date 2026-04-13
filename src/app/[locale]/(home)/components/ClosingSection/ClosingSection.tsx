'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { useFormsPopup } from '@/features/forms';

import { fadeInUp } from '@/shared/lib/helpers/animations';
import { cn } from '@/shared/lib/helpers/styles';
import { PlusSmallIcon } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/kit/button/Button';

import styles from './ClosingSection.module.scss';

export const ClosingSection = () => {
  const t = useTranslations('homePage');
  const { openCustomSolutionRequest } = useFormsPopup();
  const viewport = { once: true, amount: 0.2 };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionInner}>
         

          <motion.div
            className={styles.closingContent}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <h2 className={styles.closingTitle}>
              {t('closing.title', { fallback: 'Turn Your Idea Into Something Real' })}
            </h2>
            <p className={styles.closingDescription}>
              {t('closing.description', {
                fallback:
                  "Let's turn your concept into a working digital product - structured, functional, and ready to launch.",
              })}
            </p>

            <div className={cn(styles.buttonWrap, styles.buttonWrapFilled)}>
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
