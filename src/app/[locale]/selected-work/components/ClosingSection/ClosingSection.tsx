"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { useFormsPopup } from "@/features/forms";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { PlusSmallIcon } from "@/shared/ui/icons";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./ClosingSection.module.scss";

export const ClosingSection = () => {
  const t = useTranslations("selectedWorkPage");
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
              {t("closing.title", { fallback: "Have Something in Mind?" })}
            </h2>

            <p className={styles.description}>
              {t("closing.description", {
                fallback:
                  "Every project starts with an idea. We're here to help you shape it into something functional, structured, and ready to launch.",
              })}
            </p>

            <div className={styles.actions}>
              <div className={styles.buttonWrap}>
                <Button
                  variant="filled"
                  type="button"
                  onClick={openCustomSolutionRequest}
                >
                  <span className={styles.buttonContent}>
                    <span>
                      {t("closing.primaryCta", { fallback: "Start a Project" })}
                    </span>
                    <PlusSmallIcon
                      className={styles.buttonIcon}
                      aria-hidden="true"
                    />
                  </span>
                </Button>
              </div>

              <div className={styles.buttonWrap}>
                <Button variant="bordered" type="link" url="/what-we-build">
                  <span className={styles.buttonContent}>
                    <span>
                      {t("closing.secondaryCta", {
                        fallback: "Discover What We Build",
                      })}
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
      </div>
    </section>
  );
};
