'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { useFormsPopup } from '@/features/forms';

import { fadeIn, fadeInLeft } from '@/shared/lib/helpers/animations';
import { cn } from '@/shared/lib/helpers/styles';
import { ArrowRightSmallIcon, PlusSmallIcon } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/kit/button/Button';

import styles from './HeroSection.module.scss';

export const HeroSection = () => {
  const t = useTranslations('homePage');
  const { openCustomSolutionRequest } = useFormsPopup();
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
            <span className={styles.sectionLabel}>{t('hero.label', { fallback: '// SITE' })}</span>
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
              <div className={styles.headingGroup}>
                <h1 className={styles.heroTitle}>
                  {t('hero.title', { fallback: 'Build What You Imagine.' })}
                </h1>
                <p className={styles.heroSubtitle}>
                  {t('hero.subtitle', { fallback: 'Launch What Matters.' })}
                </p>
              </div>

              <p className={styles.heroDescription}>
                {t('hero.description', {
                  fallback:
                    'Custom web and digital solutions designed for individuals - fast, functional, and built with precision.',
                })}
              </p>

              <div className={styles.heroActions}>
                <div className={cn(styles.buttonWrap, styles.buttonWrapFilled)}>
                  <Button variant="filled" type="button" onClick={openCustomSolutionRequest}>
                    <span className={styles.buttonContent}>
                      <span>{t('hero.primaryCta', { fallback: 'Start a Project' })}</span>
                      <PlusSmallIcon className={styles.buttonIcon} aria-hidden="true" />
                    </span>
                  </Button>
                </div>

                <div className={cn(styles.buttonWrap, styles.buttonWrapText)}>
                  <Button variant="bordered" url="/what-we-build" type="link">
                    <span className={styles.buttonContent}>
                      <span>
                        {t('hero.secondaryCta', {
                          fallback: 'Explore What We Build',
                        })}
                      </span>
                      <ArrowRightSmallIcon className={styles.buttonIcon} aria-hidden="true" />
                      <span className={styles.textButtonGlow} aria-hidden="true" />
                    </span>
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              className={styles.heroVisual}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/home/dots.svg"
                alt="Hero Visual"
                className={styles.heroVisualImage}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
