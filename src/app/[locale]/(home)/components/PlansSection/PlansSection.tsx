"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInLeft } from "@/shared/lib/helpers/animations";
import { cn } from "@/shared/lib/helpers/styles";
import { PlusSmallIcon } from "@/shared/ui/icons";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./PlansSection.module.scss";

export const PlansSection = () => {
  const t = useTranslations("homePage");
  const viewport = { once: true, amount: 0.2 };

  return (
    <section id="engagement-plans" className={styles.section}>
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
              {t("plans.label", { fallback: "// SITE" })}
            </span>
            <span className={styles.sectionDivider} />
          </motion.div>

          <motion.div
            className={styles.plansContent}
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <h2 className={styles.sectionTitle}>
              {t("plans.title", { fallback: "Flexible Ways to Collaborate" })}
            </h2>
            <div className={styles.bodyTextGroup}>
              <p className={styles.bodyText}>
                {t("plans.bodyPrimary", {
                  fallback:
                    "Whether you need a one-time solution or ongoing development support, we offer structured engagement options tailored to your scope and timeline.",
                })}
              </p>
              <p className={styles.bodyText}>
                {t("plans.bodySecondary", {
                  fallback:
                    "Clear process. Transparent approach. No unnecessary complexity.",
                })}
              </p>
            </div>

            <div className={cn(styles.buttonWrap, styles.buttonWrapFilled)}>
              <Button variant="filled" url="/#engagement-plans" type="link">
                <span className={styles.buttonContent}>
                  <span>{t("plans.cta", { fallback: "Check Plans" })}</span>
                  <PlusSmallIcon
                    className={styles.buttonIcon}
                    aria-hidden="true"
                  />
                </span>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home/plans-chart.svg"
        alt="Plans Chart"
        className={styles.plansChartImage}
      />
    </section>
  );
};
