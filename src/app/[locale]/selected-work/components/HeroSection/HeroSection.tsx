'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { fadeInLeft, fadeInUp } from '@/shared/lib/helpers/animations';

import styles from './HeroSection.module.scss';

export const HeroSection = () => {
  const t = useTranslations('selectedWorkPage');
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
              {t('hero.label', { fallback: '// SELECTED WORK' })}
            </span>
            <span className={styles.sectionDivider} />
          </motion.div>

          <motion.div
            className={styles.copy}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <h1 className={styles.title}>
              {t('hero.title', { fallback: "What We've Built" })}
            </h1>
            <p className={styles.description}>
              {t('hero.description', {
                fallback:
                  "Each project is built around a different idea, a different challenge, and a tailored solution. Here's a selection of what we've created — focused on functionality, clarity, and performance.",
              })}
            </p>
          </motion.div>
        </div>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/selected-work/hero-chart.svg"
        alt=""
        aria-hidden="true"
        className={styles.chart}
      />
    </section>
  );
};
