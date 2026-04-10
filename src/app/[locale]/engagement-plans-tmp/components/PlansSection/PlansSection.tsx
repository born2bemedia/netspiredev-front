"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { useFormsPopup } from "@/features/forms";
import { PlanCard,useEngagementPlans } from "@/features/services";

import { fadeInLeft, fadeInUp } from "@/shared/lib/helpers/animations";
import { PlusSmallIcon } from "@/shared/ui/icons";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./PlansSection.module.scss";

export const PlansSection = () => {
  const t = useTranslations("engagementPlansPage");
  const { openCustomSolutionRequest } = useFormsPopup();
  const viewport = { once: true, amount: 0.2 };
  const includedLabel = t("plans.includedLabel", {
    fallback: "What's included:",
  });

  const planCards = useEngagementPlans().map((plan) => ({
    slug: plan.slug,
    order: plan.order,
    title: plan.titleFallback,
    description: plan.descriptionFallback,
    price: plan.priceFallback,
    ctaLabel: plan.ctaFallback,
    includedLabel,
    includedItems: plan.includedItems.map((item) => item.fallback),
  }));

  return (
    <section id="plans" className={styles.section}>
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
              {t("plans.label", { fallback: "// PLANS" })}
            </span>
            <span className={styles.sectionDivider} />
          </motion.div>

          <div className={styles.cards}>
            {planCards.map((plan, index) => (
              <PlanCard key={plan.slug} {...plan} delay={index * 0.05} />
            ))}
          </div>

          <motion.div
            className={styles.sectionLabelWrap + " " + styles.siteLabelWrap}
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <span className={styles.sectionLabel}>
              {t("plans.siteLabel", { fallback: "// SITE" })}
            </span>
            <span className={styles.sectionDivider} />
          </motion.div>

          <motion.div
            className={styles.guidanceGrid}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <article className={styles.frameworkCard}>
              <div className={styles.frameworkCopy}>
                <h2 className={styles.frameworkTitle}>
                  {t("framework.title", {
                    fallback: "Custom Project Framework",
                  })}
                </h2>
                <p className={styles.frameworkDescription}>
                  {t("framework.description", {
                    fallback:
                      "All plans serve as a structured starting point. Final scope, features, and pricing may vary depending on your specific requirements and project complexity.",
                  })}
                </p>
              </div>
            </article>

            <article className={styles.helpCard}>
              <p className={styles.helpBadge}>
                {t("guidance.badge", { fallback: "NETSPIRE DEV" })}
              </p>

              <div className={styles.helpContent}>
                <div className={styles.helpCopy}>
                  <h2 className={styles.helpTitle}>
                    {t("guidance.title", {
                      fallback: "Not Sure Which Plan Fits?",
                    })}
                  </h2>
                  <p className={styles.helpDescription}>
                    {t("guidance.description", {
                      fallback:
                        "Every project is different. If you're unsure which plan suits your idea, we'll help you define the right scope and recommend the most efficient approach.",
                    })}
                  </p>
                </div>

                <div className={styles.buttonWrap}>
                  <Button
                    variant="filled"
                    type="button"
                    onClick={openCustomSolutionRequest}
                  >
                    <span className={styles.buttonContent}>
                      <span>
                        {t("guidance.cta", { fallback: "Get in Touch" })}
                      </span>
                      <PlusSmallIcon
                        className={styles.buttonIcon}
                        aria-hidden="true"
                      />
                    </span>
                  </Button>
                </div>
              </div>
            </article>
          </motion.div>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/engagement-plans/custom-framework.svg"
        alt=""
        aria-hidden="true"
        className={styles.frameworkVisual}
      />
    </section>
  );
};
