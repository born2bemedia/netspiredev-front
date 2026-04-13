'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { fadeInUp } from '@/shared/lib/helpers/animations';
import { cn } from '@/shared/lib/helpers/styles';

import styles from './ProcessSection.module.scss';



export const ProcessSection = () => {
  const t = useTranslations('ourApproachPage');
  const viewport = { once: true, amount: 0.15 };

  const processSteps = [
    {
      title: t('process.steps.understandingIdea.title', { fallback: 'Understanding Your Idea' }),
      description: t('process.steps.understandingIdea.description', {
        fallback: 'We start by learning what you want to build, why it matters, and how it should function.',
      }),
    },
    {
      title: t('process.steps.structuringSolution.title', { fallback: 'Structuring the Solution' }),
      description: t('process.steps.structuringSolution.description', {
        fallback: 'We define the scope, features, and overall direction — creating a clear foundation.',
      }),
    },
    {
      title: t('process.steps.designDevelopment.title', { fallback: 'Design & Development' }),
      description: t('process.steps.designDevelopment.description', {
        fallback: 'Your project is built with attention to detail, performance, and usability.',
      }),
    },
    {
      title: t('process.steps.testingRefinement.title', { fallback: 'Testing & Refinement' }),
      description: t('process.steps.testingRefinement.description', {
        fallback: 'We review, adjust, and optimise everything before launch.',
      }),
    },
    {
      title: t('process.steps.launchSupport.title', { fallback: 'Launch & Support' }),
      description: t('process.steps.launchSupport.description', {
        fallback: 'Once ready, your product goes live — with support available if needed.',
      }),
    },
  ] as const;

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
                key={index}
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
                        {step.title}
                      </h3>

                      <p className={styles.itemDescription}>
                        {step.description}
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
