'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { fadeInLeft, fadeInRight } from '@/shared/lib/helpers/animations';
import { PlusSmallIcon } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/kit/button/Button';

import styles from './HeroSection.module.scss';

export const HeroSection = () => {
  const t = useTranslations('whatWeBuildPage');
  const viewport = { once: true, amount: 0.2 };

  return (
    <section className={styles.section}>
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
              {t('hero.label', { fallback: '// WHAT WE BUILD' })}
            </span>
            <span className={styles.sectionDivider} />
          </motion.div>

          <div className={styles.heroLayout}>
            <motion.div
              className={styles.heroContent}
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <h1 className={styles.heroTitle}>
                {t('hero.title', {
                  fallback: 'Solutions Built\nAround Your Ideas',
                })}
              </h1>

              <p className={styles.heroDescription}>
                {t('hero.description', {
                  fallback:
                    'We design and develop digital products tailored to individuals - combining functionality, performance, and refined design. Every solution is built with purpose, ensuring it not only looks right but works exactly as intended.',
                })}
              </p>

              <div className={styles.buttonWrap}>
                <Button variant="filled" url="/what-we-build#services" type="link">
                  <span className={styles.buttonContent}>
                    <span>{t('hero.cta', { fallback: 'Explore Capabilitie' })}</span>
                    <PlusSmallIcon className={styles.buttonIcon} aria-hidden="true" />
                  </span>
                </Button>
              </div>
            </motion.div>

            <motion.div
              className={styles.heroVisualWrap}
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/what-we-build/hero-globe.svg"
                alt=""
                aria-hidden="true"
                className={styles.heroVisual}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
