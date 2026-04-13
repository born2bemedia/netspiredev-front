'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { fadeInUp } from '@/shared/lib/helpers/animations';
import { cn } from '@/shared/lib/helpers/styles';

import styles from './ProcessSection.module.scss';

const processSteps = [
  {
    key: 'understandingIdea',
    titleFallback: 'Understanding Your Idea',
    descriptionFallback:
      'We start by learning what you want to build, why it matters, and how it should function.',
  },
  {
    key: 'structuringSolution',
    titleFallback: 'Structuring the Solution',
    descriptionFallback:
      'We define the scope, features, and overall direction — creating a clear foundation.',
  },
  {
    key: 'designDevelopment',
    titleFallback: 'Design & Development',
    descriptionFallback:
      'Your project is built with attention to detail, performance, and usability.',
  },
  {
    key: 'testingRefinement',
    titleFallback: 'Testing & Refinement',
    descriptionFallback: 'We review, adjust, and optimise everything before launch.',
  },
  {
    key: 'launchSupport',
    titleFallback: 'Launch & Support',
    descriptionFallback:
      'Once ready, your product goes live — with support available if needed.',
  },
] as const;

export const ProcessSection = () => {
  const t = useTranslations('ourApproachPage');
  const viewport = { once: true, amount: 0.15 };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionInner}>
          <motion.h2
            className={styles.title}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {t('process.title', { fallback: 'Our Process' })}
          </motion.h2>

          <div className={styles.list}>
            {processSteps.map((step, index) => (
              <motion.article
                key={step.key}
                className={styles.item}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                custom={index * 0.05}
              >
                <div className={styles.divider} />

                <div className={styles.row}>
                  <p className={styles.index}>{String(index + 1).padStart(2, '0')}</p>

                  <div className={styles.content}>
                    {index === 0 ? <span className={styles.activeDot} aria-hidden="true" /> : null}

                    <div className={styles.copy}>
                      <h3 className={cn(styles.itemTitle, index === 0 && styles.itemTitleActive)}>
                        {t(`process.steps.${step.key}.title`, {
                          fallback: step.titleFallback,
                        })}
                      </h3>

                      <p className={styles.itemDescription}>
                        {t(`process.steps.${step.key}.description`, {
                          fallback: step.descriptionFallback,
                        })}
                      </p>
                    </div>
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
