'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { fadeInLeft, fadeInUp } from '@/shared/lib/helpers/animations';

import styles from './DifferentiatorsSection.module.scss';



export const DifferentiatorsSection = () => {
  const t = useTranslations('ourApproachPage');
  const viewport = { once: true, amount: 0.15 };

  const differentiatorItems = [
    {
      icon: '/images/our-approach/icon-lamp-charge.svg',
      title: t('differentiators.items.templateDriven.title', { fallback: 'No template-driven work' }),
      description: t('differentiators.items.templateDriven.description', {
        fallback: 'Every solution is built from scratch, based on your idea and requirements.',
      }),
    },
    {
      icon: '/images/our-approach/icon-code-circle.svg',
      title: t('differentiators.items.structuredProcess.title', { fallback: 'Structured development process' }),
      description: t('differentiators.items.structuredProcess.description', {
        fallback: 'Clear steps, transparent workflow, and no unnecessary complexity.',
      }),
    },
    {
      icon: '/images/our-approach/icon-hierarchy.svg',
      title: t('differentiators.items.usability.title', { fallback: 'Focus on\nusability' }),
      description: t('differentiators.items.usability.description', {
        fallback: 'We prioritise clarity and ease of use in every interface we design.',
      }),
    },
    {
      icon: '/images/our-approach/icon-gps.svg',
      title: t('differentiators.items.performance.title', { fallback: 'Performance-first mindset' }),
      description: t('differentiators.items.performance.description', {
        fallback: 'Speed, efficiency, and reliability are part of every build.',
      }),
    },
    {
      icon: '/images/our-approach/icon-user-square.svg',
      title: t('differentiators.items.individuals.title', { fallback: 'Built for individuals' }),
      description: t('differentiators.items.individuals.description', {
        fallback: 'Our solutions are designed to fit personal projects, not just large-scale systems.',
      }),
    },
  ] as const;

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
                  key={index}
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
                      {item.title}
                    </h3>
                    <p className={styles.cardDescription}>
                      {item.description}
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
