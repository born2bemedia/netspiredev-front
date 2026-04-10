"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInLeft } from "@/shared/lib/helpers/animations";
import { PlusSmallIcon } from "@/shared/ui/icons";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./PlansCtaSection.module.scss";

export const PlansCtaSection = () => {
  const t = useTranslations("whatWeBuildPage");
  const viewport = { once: true, amount: 0.2 };

  return (
    <section id="engagement-plans" className={styles.section}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/what-we-build/lines.svg"
        alt=""
        aria-hidden="true"
        className={styles.chart1}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/what-we-build/lines.svg"
        alt=""
        aria-hidden="true"
        className={styles.chart2}
      />

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
            className={styles.content}
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <h2 className={styles.title}>
              {t("plans.title", {
                fallback: "Choose the Right Way\nto Get Started",
              })}
            </h2>

            <p className={styles.description}>
              {t("plans.description", {
                fallback:
                  "Every project is different. Whether you need a one-time solution or ongoing development support, our engagement plans are designed to fit your scope, timeline, and goals.",
              })}
            </p>

            <div className={styles.buttonWrap}>
              <Button variant="filled" url="/engagement-plans" type="link">
                <span className={styles.buttonContent}>
                  <span>{t("plans.cta", { fallback: "Browse Plans" })}</span>
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
    </section>
  );
};
