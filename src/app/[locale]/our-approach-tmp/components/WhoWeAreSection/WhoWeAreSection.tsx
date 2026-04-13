"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInLeft, fadeInRight } from "@/shared/lib/helpers/animations";

import styles from "./WhoWeAreSection.module.scss";

export const WhoWeAreSection = () => {
  const t = useTranslations("ourApproachPage");
  const viewport = { once: true, amount: 0.2 };

  return (
    <section className={styles.section}>
      <motion.div
        className={styles.visualWrap}
        variants={fadeInLeft}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/our-approach/who-we-are-visual.svg"
          alt=""
          aria-hidden="true"
          className={styles.visual}
        />
      </motion.div>
      <div className={styles.sectionInner}>
        <motion.div
          className={styles.copy}
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <h2 className={styles.title}>
            {t("whoWeAre.title", { fallback: "Who We Are" })}
          </h2>

          <p className={styles.description}>
            {t("whoWeAre.descriptionPrimary", {
              fallback:
                "Netspire Dev is a digital development studio focused on building tailored solutions for individuals. We don't use generic methods or predefined structures. Instead, we build every project through a structured process shaped by your goals and refined through execution.",
            })}
          </p>

          <p className={styles.description}>
            {t("whoWeAre.descriptionSecondary", {
              fallback:
                "We believe that good development is not just about code — it's about creating clarity, usability, and digital products built to work.",
            })}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
