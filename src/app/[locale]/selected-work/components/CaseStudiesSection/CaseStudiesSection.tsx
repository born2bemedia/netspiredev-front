"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { CaseStudyCard, useSelectedWorkCases } from "@/features/work";

import { fadeInLeft, fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./CaseStudiesSection.module.scss";

export const CaseStudiesSection = () => {
  const t = useTranslations("selectedWorkPage");
  const viewport = { once: true, amount: 0.15 };

  const cards = useSelectedWorkCases().map((item) => ({
    slug: item.slug,
    title: item.titleFallback,
    overviewLabel: t("cases.labels.overview", { fallback: "Overview:" }),
    overview: item.overviewFallback,
    challengeLabel: t("cases.labels.challenge", { fallback: "Challenge:" }),
    challenge: item.challengeFallback,
    solutionLabel: t("cases.labels.solution", { fallback: "Solution:" }),
    solution: item.solutionFallback,
    featuresLabel: t("cases.labels.features", { fallback: "Key Features:" }),
    featureItems: item.featureItems.map((feature) => feature.fallback),
  }));

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
              {t("cases.label", { fallback: "// FEATURED PROJECTS" })}
            </span>
            <span className={styles.sectionDivider} />
          </motion.div>

          <motion.h2
            className={styles.title}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {t("cases.title", { fallback: "Case Studies" })}
          </motion.h2>

          <div className={styles.grid}>
            {cards.map((card, index) => (
              <motion.div
                key={card.slug}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                custom={index * 0.05}
              >
                <CaseStudyCard {...card} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
