"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeIn, fadeInLeft } from "@/shared/lib/helpers/animations";

import styles from "./HeroSection.module.scss";

export const HeroSection = () => {
  const t = useTranslations("getInTouchPage");
  const viewport = { once: true, amount: 0.2 };

  return (
    <section className={styles.section}>
      <div className={styles.heroCircularWrap} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/get-in-touch/hero-circular-desktop.svg"
          alt=""
          className={styles.heroCircularDesktop}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/get-in-touch/hero-circular-mobile.svg"
          alt=""
          className={styles.heroCircularMobile}
        />
      </div>

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
              {t("hero.label", { fallback: "// Get in Touch" })}
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
                  fallback: "Let’s Turn Your Idea\nInto Something Real",
                })}
              </h1>
              <p className={styles.heroDescription}>
                {t("hero.description", {
                  fallback:
                    "Whether you have a clear idea or just a starting point, we’re here to help you shape it into a functional digital solution. Reach out, and we’ll take it from there.",
                })}
              </p>
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
                src="/images/our-approach/hero-dots.svg"
                alt=""
                aria-hidden="true"
                className={styles.heroVisualImage}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
