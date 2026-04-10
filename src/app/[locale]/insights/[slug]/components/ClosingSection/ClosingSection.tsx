"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { useFormsPopup } from "@/features/forms/model/store";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { PlusSmallIcon } from "@/shared/ui/icons";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./ClosingSection.module.scss";

type ClosingSectionProps = {
  title: string;
};

export const ClosingSection = ({ title }: ClosingSectionProps) => {
  const t = useTranslations("insightsPage");
  const { openCustomSolutionRequest } = useFormsPopup();
  const viewport = { once: true, amount: 0.2 };

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
          <div className={styles.content}>
            <h2 className={styles.title}>{title}</h2>

            <div className={styles.buttonWrap}>
              <Button
                variant="filled"
                type="button"
                onClick={openCustomSolutionRequest}
              >
                <span className={styles.buttonContent}>
                  <span>
                    {t("article.cta", { fallback: "Start a Project" })}
                  </span>
                  <PlusSmallIcon
                    className={styles.buttonIcon}
                    aria-hidden="true"
                  />
                </span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home/plans-chart.svg"
        alt="Article CTA Chart"
        className={styles.articleCtaChartImage}
      />
    </section>
  );
};
