'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { fadeInLeft, fadeInUp } from '@/shared/lib/helpers/animations';

import styles from './DifferentiatorsSection.module.scss';

const differentiatorItems = [
  {
    key: 'templateDriven',
    icon: '/images/our-approach/icon-lamp-charge.svg',
    titleFallback: 'No template-driven work',
    descriptionFallback:
      'Every solution is built from scratch, based on your idea and requirements.',
  },
  {
    key: 'structuredProcess',
    icon: '/images/our-approach/icon-code-circle.svg',
    titleFallback: 'Structured development process',
    descriptionFallback: 'Clear steps, transparent workflow, and no unnecessary complexity.',
  },
  {
    key: 'usability',
    icon: '/images/our-approach/icon-hierarchy.svg',
    titleFallback: 'Focus on\nusability',
    descriptionFallback: 'We prioritise clarity and ease of use in every interface we design.',
  },
  {
    key: 'performance',
    icon: '/images/our-approach/icon-gps.svg',
    titleFallback: 'Performance-first mindset',
    descriptionFallback: 'Speed, efficiency, and reliability are part of every build.',
  },
  {
    key: 'individuals',
    icon: '/images/our-approach/icon-user-square.svg',
    titleFallback: 'Built for individuals',
    descriptionFallback:
      'Our solutions are designed to fit personal projects, not just large-scale systems.',
  },
] as const;

export const DifferentiatorsSection = () => {
  const t = useTranslations('ourApproachPage');
  const viewport = { once: true, amount: 0.15 };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionInner}>
          <motion.h2
            className={styles.title}
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {t('differentiators.title', { fallback: 'What Sets Us Apart' })}
          </motion.h2>

          <motion.div
            className={styles.panel}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <p className={styles.label}>
              {t('differentiators.label', { fallback: 'NETSPIRE DEV' })}
            </p>

            <div className={styles.grid}>
              {differentiatorItems.map((item, index) => (
                <motion.article
                  key={item.key}
                  className={styles.card}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  custom={index * 0.05}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.icon} alt="" aria-hidden="true" className={styles.icon} />

                  <div className={styles.cardCopy}>
                    <h3 className={styles.cardTitle}>
                      {t(`differentiators.items.${item.key}.title`, {
                        fallback: item.titleFallback,
                      })}
                    </h3>
                    <p className={styles.cardDescription}>
                      {t(`differentiators.items.${item.key}.description`, {
                        fallback: item.descriptionFallback,
                      })}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
