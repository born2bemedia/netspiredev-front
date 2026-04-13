'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { ServiceCard, useWhatWeBuildServices } from '@/features/services';

import { fadeInLeft, fadeInUp } from '@/shared/lib/helpers/animations';

import styles from './ServicesSection.module.scss';

export const ServicesSection = () => {
  const t = useTranslations('whatWeBuildPage');
  const viewport = { once: true, amount: 0.2 };
  const includedLabel = t('services.includedLabel', {
    fallback: "What's included:",
  });
  const ctaLabel = t('services.cta', { fallback: 'Order a Solution' });

  const serviceCards = useWhatWeBuildServices().map((service) => ({
    slug: service.slug,
    order: service.order,
    title: service.titleFallback,
    description: service.descriptionFallback,
    includedLabel,
    includedItems: service.includedItems.map((item) => item.fallback),
    ctaLabel,
  }));

  return (
    <section id="services" className={styles.section}>
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
              {t('services.label', { fallback: '// SERVICES' })}
            </span>
            <span className={styles.sectionDivider} />
          </motion.div>

          <motion.div
            className={styles.sectionIntro}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <h2 className={styles.sectionTitle}>
              {t('services.title', { fallback: 'What We Create' })}
            </h2>
            <p className={styles.sectionDescription}>
              {t('services.description', {
                fallback:
                  'From simple websites to more advanced digital platforms, our solutions are designed to adapt to your goals. We focus on clarity, usability, and long-term performance - avoiding unnecessary complexity while delivering real results.',
              })}
            </p>
          </motion.div>

          <div className={styles.cards}>
            {serviceCards.map((service, index) => (
              <ServiceCard key={service.slug} {...service} delay={index * 0.05} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
