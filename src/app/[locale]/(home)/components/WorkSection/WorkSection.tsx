'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { fadeInUp } from '@/shared/lib/helpers/animations';
import { ArrowUpRightIcon } from '@/shared/ui/icons';

import styles from './WorkSection.module.scss';

import { Link } from '@/i18n/navigation';

export const WorkSection = () => {
  const t = useTranslations('homePage');
  const viewport = { once: true, amount: 0.2 };
  const workCards = [
    {
      key: 'selectedWork',
      href: '/selected-work',
      title: t('work.cards.selectedWork.title', { fallback: 'Selected Work' }),
      description: t('work.cards.selectedWork.description', {
        fallback:
          'Every project reflects a different idea, a different challenge, and a different solution. We focus on delivering results that are both functional and refined.',
      }),
    },
    {
      key: 'insights',
      href: '/journal',
      title: t('work.cards.insights.title', { fallback: 'Insights' }),
      description: t('work.cards.insights.description', {
        fallback:
          'Thoughts, ideas, and perspectives on development, design, and digital solutions - simplified and relevant.',
      }),
    },
  ];

  return (
    <section id="selected-work" className={styles.section}>
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
              {t('work.label', { fallback: '// WORK' })}
            </span>
            <span className={styles.sectionDivider} />
          </motion.div>

          <div className={styles.workCards}>
            {workCards.map((card, index) => (
              <motion.div
                key={card.key}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                custom={index * 0.08}
              >
                <Link href={card.href} className={styles.workCard}>
                  <div className={styles.workCardText}>
                    <h3 className={styles.workCardTitle}>{card.title}</h3>
                    <p className={styles.workCardDescription}>{card.description}</p>
                  </div>
                  <ArrowUpRightIcon className={styles.workCardIcon} aria-hidden="true" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
