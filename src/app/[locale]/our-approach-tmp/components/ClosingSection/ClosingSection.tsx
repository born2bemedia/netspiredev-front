'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { useFormsPopup } from '@/features/forms';

import { fadeInUp } from '@/shared/lib/helpers/animations';
import { PlusSmallIcon } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/kit/button/Button';

import styles from './ClosingSection.module.scss';

export const ClosingSection = () => {
  const t = useTranslations('ourApproachPage');
  const { openCustomSolutionRequest } = useFormsPopup();
  const viewport = { once: true, amount: 0.2 };

  return (
    <section className={styles.section}>
      <div className={styles.dotsWrap} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/our-approach/closing-dots.svg" alt="" className={styles.dots} />
      </div>

      <div className="container">
        <div className={styles.sectionInner}>
          <motion.div
            className={styles.content}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <div className={styles.copy}>
              <h2 className={styles.title}>
                {t('closing.title', {
                  fallback: 'Ready to Build Something That Works?',
                })}
              </h2>

              <p className={styles.description}>
                {t('closing.description', {
                  fallback:
                    "If you have an idea in mind, we're here to help you shape it into a functional, well-structured digital product.",
                })}
              </p>
            </div>

            <div className={styles.actions}>
              <div className={styles.buttonWrap}>
                <Button variant="filled" type="button" onClick={openCustomSolutionRequest}>
                  <span className={styles.buttonContent}>
                    <span>{t('closing.primaryCta', { fallback: 'Start a Project' })}</span>
                    <PlusSmallIcon className={styles.buttonIcon} aria-hidden="true" />
                  </span>
                </Button>
              </div>

              <div className={styles.buttonWrap}>
                <Button variant="bordered" url="/what-we-build-tmp" type="link">
                  <span className={styles.buttonContent}>
                    <span>
                      {t('closing.secondaryCta', { fallback: 'Discover What We Build' })}
                    </span>
                    <PlusSmallIcon className={styles.buttonIcon} aria-hidden="true" />
                  </span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
