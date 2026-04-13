'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { fadeInUp } from '@/shared/lib/helpers/animations';
import { cn } from '@/shared/lib/helpers/styles';
import { PlusSmallIcon } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/kit/button/Button';

import styles from './ApproachSection.module.scss';

export const ApproachSection = () => {
  const t = useTranslations('homePage');
  const viewport = { once: true, amount: 0.2 };
  const approachContent = {
    understandingYourIdea: {
      key: 'understandingYourIdea',
      title: t('approach.steps.understandingYourIdea.title', {
        fallback: 'Understanding Your Idea',
      }),
      description: t('approach.steps.understandingYourIdea.description', {
        fallback: 'We start by defining your vision, goals, and expectations.',
      }),
    },
    structuredDevelopment: {
      key: 'structuredDevelopment',
      title: t('approach.steps.structuredDevelopment.title', {
        fallback: 'Structured Development',
      }),
      description: t('approach.steps.structuredDevelopment.description', {
        fallback: 'Every step is planned, transparent, and aligned with your needs.',
      }),
    },
    precisionBuild: {
      key: 'precisionBuild',
      title: t('approach.steps.precisionBuild.title', { fallback: 'Precision Build' }),
      description: t('approach.steps.precisionBuild.description', {
        fallback: 'We focus on clean code, strong performance, and seamless functionality.',
      }),
    },
    launchSupport: {
      key: 'launchSupport',
      title: t('approach.steps.launchSupport.title', { fallback: 'Launch & Support' }),
      description: t('approach.steps.launchSupport.description', {
        fallback: 'Your project goes live - with ongoing support if needed.',
      }),
    },
  };
  const approachSteps = [
    approachContent.understandingYourIdea,
    approachContent.structuredDevelopment,
    approachContent.precisionBuild,
    approachContent.launchSupport,
  ];

  return (
    <section id="our-approach" className={styles.section}>
      <div className="container">
        <div className={styles.sectionInner}>
          <motion.div
            className={styles.sectionLabelWrap}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <span className={styles.sectionLabel}>
              {t('approach.label', { fallback: '// APPROACH' })}
            </span>
            <span className={cn(styles.sectionDivider, styles.sectionDividerLight)} />
          </motion.div>

          <div className={styles.sectionHeaderRow}>
            <motion.h2
              className={styles.sectionTitle}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              {t('approach.title', { fallback: 'Our Approach' })}
            </motion.h2>

            <motion.div
              className={cn(styles.buttonWrap, styles.buttonWrapBordered)}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              custom={0.1}
            >
              <Button variant="bordered" url="/our-approach" type="link">
                <span className={styles.buttonContent}>
                  <span>{t('approach.cta', { fallback: 'See How We Work' })}</span>
                  <PlusSmallIcon className={styles.buttonIcon} aria-hidden="true" />
                </span>
              </Button>
            </motion.div>
          </div>

          <div className={styles.approachList}>
            {approachSteps.map((step, index) => (
              <motion.article
                key={step.key}
                className={styles.approachItem}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                custom={index * 0.08}
              >
                <div className={styles.approachIndex}>{String(index + 1).padStart(2, '0')}</div>
                <div className={styles.approachBody}>
                <span className={`${styles.approachAccent} ${index === 0 ? styles.approachAccentActive : ''}`} />
                  
                  <div className={styles.approachText}>
                    <h3
                      className={cn(
                        styles.approachTitle,
                        index === 0 && styles.approachTitleAccent
                      )}
                    >
                      {step.title}
                    </h3>
                    <p className={styles.approachDescription}>{step.description}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
