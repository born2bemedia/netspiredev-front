'use client';

import { useTranslations } from 'next-intl';

import styles from './Footer.module.scss';

import { Link } from '@/i18n/navigation';

type FooterLinkItem = {
  key: string;
  text: string;
  href: string;
};

type FooterSection = {
  key: 'inside' | 'solutions' | 'compliance' | 'contact';
  title: string;
  accent?: boolean;
  items: readonly FooterLinkItem[];
};

const renderFooterLink = (item: FooterLinkItem) => {
  return (
    <Link key={item.key} href={item.href} className={styles.footer__link}>
      {item.text}
    </Link>
  );
};

export const Footer = () => {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  const insideItems: readonly FooterLinkItem[] = [
    {
      key: 'our-approach',
      text: t('ourApproach', { fallback: 'Our Approach' }),
      href: '/#our-approach',
    },
    {
      key: 'insights',
      text: t('insights', { fallback: 'Insights' }),
      href: '/insights',
    },
    {
      key: 'get-in-touch',
      text: t('getInTouch', { fallback: 'Get in Touch' }),
      href: '/contacts',
    },
  ] as const;

  const solutionsItems: readonly FooterLinkItem[] = [
    {
      key: 'what-we-build',
      text: t('whatWeBuild', { fallback: 'What We Build' }),
      href: '/what-we-build',
    },
    {
      key: 'engagement-plans',
      text: t('engagementPlans', { fallback: 'Engagement Plans' }),
      href: '/engagement-plans',
    },
    {
      key: 'selected-work',
      text: t('selectedWork', { fallback: 'Selected Work' }),
      href: '/selected-work',
    },
  ] as const;

  const policyItems: readonly FooterLinkItem[] = [
    {
      key: 'terms',
      text: t('termsAndConditions', { fallback: 'Terms and Conditions' }),
      href: '/legal/terms-and-conditions',
    },
    {
      key: 'privacy',
      text: t('privacyPolicy', { fallback: 'Privacy Policy' }),
      href: '/legal/privacy-policy',
    },
    {
      key: 'cookie',
      text: t('cookiePolicy', { fallback: 'Cookie Policy' }),
      href: '/legal/cookie-policy',
    },
    {
      key: 'refund',
      text: t('refundPolicy', { fallback: 'Refund Policy' }),
      href: '/legal/refund-policy',
    },
  ] as const;

  const sections: readonly FooterSection[] = [
    {
      key: 'inside',
      title: t('insideNetspireDev', { fallback: 'Inside Netspire Dev' }),
      items: insideItems,
    },
    {
      key: 'solutions',
      title: t('solutions', { fallback: 'Solutions' }),
      items: solutionsItems,
    },
    {
      key: 'compliance',
      title: t('compliance', { fallback: 'Compliance' }),
      items: policyItems,
    },
    {
      key: 'contact',
      title: t('contact', { fallback: 'Contact' }),
      items: policyItems,
      accent: true,
    },
  ] as const;

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__inner}>
          <div className={styles.footer__main}>
            <div className={styles.footer__brandBlock}>
              <Link href="/" className={styles.footer__brand}>
                {t('brand', { fallback: 'Netspire Dev' })}
              </Link>
              <p className={styles.footer__description}>
                {t('description', {
                  fallback:
                    'Turn your idea into a digital solution — start your project with Netspire Dev today.',
                })}
              </p>
            </div>

            <div className={styles.footer__content}>
              <div className={styles.footer__topSections}>
                {sections.slice(0, 3).map((section) => (
                  <section key={section.key} className={styles.footer__section}>
                    <h3 className={styles.footer__label}>
                      <span
                        className={`${styles.footer__labelBullet} ${
                          section.accent ? styles['footer__labelBullet--accent'] : ''
                        }`}
                        aria-hidden="true"
                      />
                      <span>{section.title}</span>
                    </h3>
                    <div className={styles.footer__links}>
                      {section.items.map((item) => renderFooterLink(item))}
                    </div>
                  </section>
                ))}
              </div>

              <section
                className={`${styles.footer__section} ${styles['footer__section--contact']}`}
              >
                <h3 className={`${styles.footer__label} ${styles['footer__label--accent']}`}>
                  <span
                    className={`${styles.footer__labelBullet} ${styles['footer__labelBullet--accent']}`}
                    aria-hidden="true"
                  />
                  <span>{sections[3].title}</span>
                </h3>
                <div className={styles.footer__links}>
                  {sections[3].items.map((item) => renderFooterLink(item))}
                </div>
              </section>
            </div>
          </div>

          <div className={styles.footer__divider} />

          <p className={styles.footer__copyright}>
            © ${year}{' '}
            {t('copyright', {
              fallback: `All content is legally protected and owned by Netspire Dev Ltd.`,
            })}
          </p>
        </div>
      </div>
    </footer>
  );
};
