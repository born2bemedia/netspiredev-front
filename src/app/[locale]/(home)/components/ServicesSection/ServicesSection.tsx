'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { fadeInUp } from '@/shared/lib/helpers/animations';
import { cn } from '@/shared/lib/helpers/styles';
import { PlusSmallIcon } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/kit/button/Button';

import styles from './ServicesSection.module.scss';

export const ServicesSection = () => {
  const t = useTranslations('homePage');
  const viewport = { once: true, amount: 0.2 };
  const serviceContent = {
    customWebsites: {
      key: 'customWebsites',
      title: t('services.items.customWebsites.title', { fallback: 'CUSTOM WEBSITES' }),
      description: t('services.items.customWebsites.description', {
        fallback:
          'Tailored, responsive websites designed to reflect your vision and work seamlessly across all devices.',
      }),
    },
    webApplications: {
      key: 'webApplications',
      title: t('services.items.webApplications.title', { fallback: 'WEB APPLICATIONS' }),
      description: t('services.items.webApplications.description', {
        fallback:
          'Functional, scalable platforms built to handle real interactions, logic, and user workflows.',
      }),
    },
    uiUxDesign: {
      key: 'uiUxDesign',
      title: t('services.items.uiUxDesign.title', { fallback: 'UI/UX DESIGN' }),
      description: t('services.items.uiUxDesign.description', {
        fallback:
          'Clear, intuitive interfaces designed for smooth navigation and effortless user experience.',
      }),
    },
    ecommerceSolutions: {
      key: 'ecommerceSolutions',
      title: t('services.items.ecommerceSolutions.title', {
        fallback: 'E-COMMERCE SOLUTIONS',
      }),
      description: t('services.items.ecommerceSolutions.description', {
        fallback:
          'Online stores built for simplicity, performance, and a seamless buying experience.',
      }),
    },
    landingPages: {
      key: 'landingPages',
      title: t('services.items.landingPages.title', { fallback: 'LANDING PAGES' }),
      description: t('services.items.landingPages.description', {
        fallback:
          'Focused, conversion-driven pages designed to communicate clearly and guide user action.',
      }),
    },
    maintenanceSupport: {
      key: 'maintenanceSupport',
      title: t('services.items.maintenanceSupport.title', {
        fallback: 'MAINTENANCE & SUPPORT',
      }),
      description: t('services.items.maintenanceSupport.description', {
        fallback:
          'Ongoing updates, fixes, and improvements to keep your product stable and up to date.',
      }),
    },
  };
  const serviceRows = [
    [serviceContent.customWebsites, serviceContent.webApplications],
    [serviceContent.uiUxDesign, serviceContent.ecommerceSolutions],
    [serviceContent.landingPages, serviceContent.maintenanceSupport],
  ];

  return (
    <section id="what-we-build" className={styles.section}>
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
              {t('services.label', { fallback: '// SERVICES' })}
            </span>
            <span className={styles.sectionDivider} />
          </motion.div>

          <div className={styles.sectionHeaderRow}>
            <motion.h2
              className={styles.sectionTitle}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              {t('services.title', { fallback: 'What We Build' })}
            </motion.h2>

            <motion.div
              className={cn(styles.buttonWrap, styles.buttonWrapBordered)}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              custom={0.1}
            >
              <Button variant="bordered" url="/contacts" type="link">
                <span className={styles.buttonContent}>
                  <span>{t('services.cta', { fallback: 'Discover All Solutions' })}</span>
                  <PlusSmallIcon className={styles.buttonIcon} aria-hidden="true" />
                </span>
              </Button>
            </motion.div>
          </div>

          <div className={styles.servicesRows}>
            {serviceRows.map((row, rowIndex) => (
              <motion.div
                key={row.map((item) => item.key).join('-')}
                className={styles.servicesRow}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                custom={rowIndex * 0.08}
              >
                {row.map((item) => (
                  <article key={item.key} className={styles.serviceCard}>
                    <h3 className={styles.serviceTitle}>{item.title}</h3>
                    <p className={styles.serviceDescription}>{item.description}</p>
                  </article>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
