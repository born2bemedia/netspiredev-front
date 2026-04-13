'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { fadeInLeft, fadeInRight } from '@/shared/lib/helpers/animations';
import { cn } from '@/shared/lib/helpers/styles';
import {
  CodeCircleIcon,
  GpsIcon,
  HierarchyIcon,
  LampChargeIcon,
  PlusSmallIcon,
  UserSquareIcon,
} from '@/shared/ui/icons';
import { Button } from '@/shared/ui/kit/button/Button';

import styles from './WhySection.module.scss';

export const WhySection = () => {
  const t = useTranslations('homePage');
  const viewport = { once: true, amount: 0.2 };
  const whyItems = [
    {
      key: 'builtAroundIdea',
      Icon: LampChargeIcon,
      text: t('why.items.builtAroundIdea', {
        fallback: 'Built around your idea - not pre-made templates',
      }),
    },
    {
      key: 'cleanScalable',
      Icon: CodeCircleIcon,
      text: t('why.items.cleanScalable', {
        fallback: 'Clean, modern, and scalable development',
      }),
    },
    {
      key: 'structuredWorkflow',
      Icon: HierarchyIcon,
      text: t('why.items.structuredWorkflow', {
        fallback: 'Clear communication and structured workflow',
      }),
    },
    {
      key: 'performanceUsability',
      Icon: GpsIcon,
      text: t('why.items.performanceUsability', {
        fallback: 'Focus on performance and usability',
      }),
    },
    {
      key: 'designedForIndividuals',
      Icon: UserSquareIcon,
      text: t('why.items.designedForIndividuals', {
        fallback: 'Designed for individuals, not just businesses',
      }),
    },
  ];

  return (
    <section id="why-netspire" className={styles.section}>
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
              {t('why.label', { fallback: '// SITE' })}
            </span>
            <span className={styles.sectionDivider} />
          </motion.div>

          <div className={styles.whyLayout}>
            <motion.div
              className={styles.whyIntro}
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <h2 className={styles.sectionTitle}>
                {t('why.title', { fallback: 'Why Netspire Dev?' })}
              </h2>

              <div className={cn(styles.buttonWrap, styles.buttonWrapFilled)}>
                <Button variant="filled" url="/engagement-plans" type="link">
                  <span className={styles.buttonContent}>
                    <span>{t('why.cta', { fallback: 'Check Plans' })}</span>
                    <PlusSmallIcon className={styles.buttonIcon} aria-hidden="true" />
                  </span>
                </Button>
              </div>
            </motion.div>

            <motion.div
              className={styles.whyPanel}
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <span className={styles.whyPanelLabel}>
                {t('why.panelTitle', { fallback: 'NETSPIRE DEV' })}
              </span>

              <div className={styles.whyItems}>
                {whyItems.map(({ key, Icon, text }, index) => (
                  <div key={key} className={styles.whyItem}>
                    <div className={styles.whyItemRow}>
                      <Icon className={styles.whyItemIcon} aria-hidden="true" />
                      <p className={styles.whyItemText}>{text}</p>
                    </div>
                    {index !== whyItems.length - 1 ? (
                      <span className={styles.whyItemDivider} />
                    ) : null}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
