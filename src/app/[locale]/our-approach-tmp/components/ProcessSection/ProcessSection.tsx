'use client';

import { useEffect, useRef, useState } from 'react';

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
      key: 'understandingIdea',
      title: t('process.steps.understandingIdea.title', { fallback: 'Understanding Your Idea' }),
      description: t('process.steps.understandingIdea.description', {
        fallback: 'We start by learning what you want to build, why it matters, and how it should function.',
      }),
    },
    {
      key: 'structuringSolution',
      title: t('process.steps.structuringSolution.title', { fallback: 'Structuring the Solution' }),
      description: t('process.steps.structuringSolution.description', {
        fallback: 'We define the scope, features, and overall direction — creating a clear foundation.',
      }),
    },
    {
      key: 'designDevelopment',
      title: t('process.steps.designDevelopment.title', { fallback: 'Design & Development' }),
      description: t('process.steps.designDevelopment.description', {
        fallback: 'Your project is built with attention to detail, performance, and usability.',
      }),
    },
    {
      key: 'testingRefinement',
      title: t('process.steps.testingRefinement.title', { fallback: 'Testing & Refinement' }),
      description: t('process.steps.testingRefinement.description', {
        fallback: 'We review, adjust, and optimise everything before launch.',
      }),
    },
    {
      key: 'launchSupport',
      title: t('process.steps.launchSupport.title', { fallback: 'Launch & Support' }),
      description: t('process.steps.launchSupport.description', {
        fallback: 'Once ready, your product goes live — with support available if needed.',
      }),
    },
  ] as const;
  type ProcessStepKey = (typeof processSteps)[number]['key'];
  const initialStepKey = processSteps[0]?.key ?? '';
  const [activeStepKey, setActiveStepKey] = useState<ProcessStepKey | ''>(initialStepKey);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (!initialStepKey) {
      return;
    }

    setTimeout(() => {
      setActiveStepKey(initialStepKey);
    }, 0);
  }, [initialStepKey]);

  useEffect(() => {
    const nodes = itemRefs.current.filter(Boolean) as HTMLElement[];

    if (!nodes.length) {
      return;
    }

    let animationFrameId = 0;

    const updateActiveStep = () => {
      const viewportAnchor = window.innerHeight * 0.45;
      let closestStepKey: ProcessStepKey | '' = initialStepKey;
      let closestDistance = Number.POSITIVE_INFINITY;

      nodes.forEach((node) => {
        const stepKey = node.dataset.stepKey as ProcessStepKey | undefined;

        if (!stepKey) {
          return;
        }

        const rect = node.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const distance = Math.abs(itemCenter - viewportAnchor);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestStepKey = stepKey;
        }
      });

      setActiveStepKey((currentStepKey) =>
        currentStepKey === closestStepKey ? currentStepKey : closestStepKey
      );
    };

    const requestUpdate = () => {
      if (animationFrameId) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(() => {
        animationFrameId = 0;
        updateActiveStep();
      });
    };

    updateActiveStep();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [initialStepKey]);

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
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                className={styles.item}
                data-step-key={step.key}
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
                    {activeStepKey === step.key ? (
                      <span className={styles.activeDot} aria-hidden="true" />
                    ) : null}

                    <div className={styles.copy}>
                      <h3
                        className={cn(
                          styles.itemTitle,
                          activeStepKey === step.key && styles.itemTitleActive
                        )}
                      >
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
