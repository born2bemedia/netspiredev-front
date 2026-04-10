"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import type { ArticleListItem } from "@/features/articles/model/types";
import { InsightCard } from "@/features/articles/ui";

import { fadeInLeft, fadeInRight, fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./HeroSection.module.scss";

type HeroSectionProps = {
  articles: ArticleListItem[];
};

export const HeroSection = ({ articles }: HeroSectionProps) => {
  const t = useTranslations("insightsPage");
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
              {t("hero.label", { fallback: "// INSIGHTS" })}
            </span>
            <span className={styles.sectionDivider} />
          </motion.div>

          <div className={styles.heroLayout}>
            <motion.div
              className={styles.copy}
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <h1 className={styles.title}>
                {t("hero.title", {
                  fallback: "Thoughts on Design,\nDevelopment, and Functionality",
                })}
              </h1>

              <div className={styles.descriptionWrap}>
                <p className={styles.description}>
                  {t("hero.descriptionPrimary", {
                    fallback:
                      "We share ideas, observations, and practical perspectives on web development, design, and digital functionality - focusing on what actually makes products clear, usable, and effective.",
                  })}
                </p>
                <p className={styles.description}>
                  {t("hero.descriptionSecondary", {
                    fallback:
                      "No unnecessary complexity. Just structured thinking behind better digital solutions.",
                  })}
                </p>
              </div>
            </motion.div>

            <motion.div
              className={styles.cards}
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              {articles.map((article, index) => (
                <motion.div
                  key={article.slug}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  custom={index * 0.04}
                >
                  <InsightCard article={article} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
