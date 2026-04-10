"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { useFormsPopup } from "@/features/forms";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { PlusSmallIcon } from "@/shared/ui/icons";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./ClosingSection.module.scss";

export const ClosingSection = () => {
  const t = useTranslations("engagementPlansPage");
  const { openCustomSolutionRequest } = useFormsPopup();
  const viewport = { once: true, amount: 0.2 };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionInner}>
          <motion.div
            className={styles.content}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <h2 className={styles.title}>
              {t("closing.title", { fallback: "Start Building with Clarity" })}
            </h2>

            <p className={styles.description}>
              {t("closing.description", {
                fallback:
                  "Choose your plan or tell us what you need — we’ll take care of the rest.",
              })}
            </p>

            <div className={styles.buttonWrap}>
              <Button
                variant="filled"
                type="button"
                onClick={openCustomSolutionRequest}
              >
                <span className={styles.buttonContent}>
                  <span>
                    {t("closing.cta", { fallback: "Start Your Project" })}
                  </span>
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
