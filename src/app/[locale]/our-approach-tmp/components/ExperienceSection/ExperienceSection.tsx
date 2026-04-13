'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { fadeInUp } from '@/shared/lib/helpers/animations';

import styles from './ExperienceSection.module.scss';

export const ExperienceSection = () => {
  const t = useTranslations('ourApproachPage');
  const viewport = { once: true, amount: 0.2 };

  return (
    <section className={styles.section}>
      <div className={styles.topPattern} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/our-approach/experience-chart.png" alt="" className={styles.pattern} />
      </div>

      <div className={styles.bottomPattern} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/our-approach/experience-chart.png" alt="" className={styles.pattern} />
      </div>

      <div className="container">
        <motion.div
          className={styles.sectionInner}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <h2 className={styles.title}>
            {t('experience.title', { fallback: 'A Simple, Transparent Experience' })}
          </h2>

          <p className={styles.description}>
            {t('experience.description', {
              fallback:
                "We keep the process straightforward. You'll always know what's happening, what's next, and how your project is progressing. No confusion, no hidden steps — just a clear path from idea to execution.",
            })}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
