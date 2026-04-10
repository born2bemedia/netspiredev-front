'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { fadeInLeft, fadeInRight } from '@/shared/lib/helpers/animations';
import { cn } from '@/shared/lib/helpers/styles';
import { PlusSmallIcon } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/kit/button/Button';

import styles from './SolutionsSection.module.scss';

export const SolutionsSection = () => {
  const t = useTranslations('homePage');
  const viewport = { once: true, amount: 0.2 };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionInner}>
          <motion.div
            className={styles.sectionLabelWrap}
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <span className={styles.sectionLabel}>
              {t('solutions.label', { fallback: '// SITE' })}
            </span>
            <span className={cn(styles.sectionDivider, styles.sectionDividerLight)} />
          </motion.div>

          <div className={styles.solutionsLayout}>
            <motion.div
              className={styles.solutionsContent}
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <h2 className={styles.sectionTitle}>
                {t('solutions.title', {
                  fallback: 'Digital Solutions, Designed Around You',
                })}
              </h2>
              <div className={styles.bodyTextGroup}>
                <p className={styles.bodyText}>
                  {t('solutions.bodyPrimary', {
                    fallback:
                      'We create tailored digital products that fit your goals - not templates, not shortcuts. Every project is built from the ground up to deliver performance, clarity, and long-term usability.',
                  })}
                </p>
                <p className={styles.bodyText}>
                  {t('solutions.bodySecondary', {
                    fallback:
                      'From simple websites to complex platforms, we focus on what matters most: making your idea work seamlessly.',
                  })}
                </p>
              </div>

              <div className={cn(styles.buttonWrap, styles.buttonWrapFilled)}>
                <Button variant="filled" url="/what-we-build" type="link">
                  <span className={styles.buttonContent}>
                    <span>{t('solutions.cta', { fallback: 'View Solutions' })}</span>
                    <PlusSmallIcon className={styles.buttonIcon} aria-hidden="true" />
                  </span>
                </Button>
              </div>
            </motion.div>

            <motion.div
              className={styles.solutionsVisual}
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/home/globe.svg"
                alt="Solutions Visual"
                className={styles.solutionsVisualImage}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
