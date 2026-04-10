"use client";

import { motion } from "framer-motion";

import type { ArticleListItem } from "@/features/articles/model/types";
import { InsightCard } from "@/features/articles/ui";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./ArticlesSection.module.scss";

type ArticlesSectionProps = {
  articles: ArticleListItem[];
};

export const ArticlesSection = ({ articles }: ArticlesSectionProps) => {
  const viewport = { once: true, amount: 0.12 };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {articles.map((article, index) => (
            <motion.div
              key={article.slug}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              custom={index * 0.05}
            >
              <InsightCard article={article} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
