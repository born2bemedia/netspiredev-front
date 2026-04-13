'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { CustomSolutionRequestForm } from '@/features/forms';
import { fadeInUp } from '@/shared/lib/helpers/animations';

import styles from './ProjectFormSection.module.scss';

export const ProjectFormSection = () => {
  const t = useTranslations('getInTouchPage');
  const viewport = { once: true, amount: 0.15 };

  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.sectionInner}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <CustomSolutionRequestForm
            variant="page"
            title={t('form.title', { fallback: 'Tell Us About Your Project' })}
            description={t('form.description', {
              fallback:
                'Share a few details about what you’re looking to build. We’ll review your request and get back to you with the next steps.',
            })}
            nextStepsTitle={t('form.nextStepsTitle', {
              fallback: 'What to Expect Next',
            })}
            nextStepsDescription={t('form.nextStepsDescription', {
              fallback:
                'Once we receive your message, we’ll review the details and reach out to clarify your requirements, discuss the scope, and guide you on the best way forward.',
            })}
            submitLabel={t('form.submit', {
              fallback: 'Submit Your Request',
            })}
            successActionLabel={t('form.successAction', {
              fallback: 'Send Another Request',
            })}
          />
        </motion.div>
      </div>
    </section>
  );
};
