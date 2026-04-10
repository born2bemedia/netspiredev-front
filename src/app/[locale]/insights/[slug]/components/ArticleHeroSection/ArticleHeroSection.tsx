"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInLeft } from "@/shared/lib/helpers/animations";

import styles from "./ArticleHeroSection.module.scss";

import { Link } from "@/i18n/navigation";

type ArticleHeroSectionProps = {
  title: string;
};

export const ArticleHeroSection = ({ title }: ArticleHeroSectionProps) => {
  const t = useTranslations("insightsPage");
  const viewport = { once: true, amount: 0.2 };

  return (
    <section className={styles.section}>

      <div className="container">
        <div className={styles.sectionInner}>
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <Link href="/insights" className={styles.backLink}>
              <span className={styles.backIcon} aria-hidden="true">
                <Image src="/images/insights/article-back-icon.svg" alt="" width={20} height={20} />
              </span>
              <span>{t("article.backLabel", { fallback: "Back" })}</span>
            </Link>
          </motion.div>

          <motion.h1
            className={styles.title}
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {title}
          </motion.h1>
        </div>
      </div>
    </section>
  );
};
