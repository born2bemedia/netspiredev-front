"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInLeft, fadeInRight } from "@/shared/lib/helpers/animations";

import styles from "./HeroSection.module.scss";

export const HeroSection = () => {
  const t = useTranslations("engagementPlansPage");
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
              {t("hero.label", { fallback: "// ENGAGEMENT PLANS" })}
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
                {t("hero.title", {
                  fallback: "Flexible Plans.\nClear Scope.\nReal Results.",
                })}
              </h1>

              <p className={styles.heroDescription}>
                {t("hero.description", {
                  fallback:
                    "Choose the level of support that fits your idea. Whether you're starting small or building something more advanced, each plan is structured to deliver clarity, performance, and a smooth development process.",
                })}
              </p>
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
                src="/images/engagement-plans/hero-globe.svg"
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
