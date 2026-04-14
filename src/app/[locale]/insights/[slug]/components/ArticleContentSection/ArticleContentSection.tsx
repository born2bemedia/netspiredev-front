"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import type { ArticleSection } from "@/features/articles/model/types";

import { fadeInLeft, fadeInUp } from "@/shared/lib/helpers/animations";
import { cn } from "@/shared/lib/helpers/styles";

import styles from "./ArticleContentSection.module.scss";

import { Link } from "@/i18n/navigation";

type ArticleContentSectionProps = {
  backHref?: string;
  title: string;
  sections: ArticleSection[];
};

export const ArticleContentSection = ({
  backHref = "/insights",
  title,
  sections,
}: ArticleContentSectionProps) => {
  const t = useTranslations("insightsPage");
  const viewport = { once: true, amount: 0.08 };
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  const tocSections = useMemo(
    () => sections.filter((section) => section.title.trim().length > 0),
    [sections],
  );

  const setSectionRef = useCallback(
    (id: string) => (node: HTMLElement | null) => {
      if (node) {
        sectionRefs.current.set(id, node);
        return;
      }

      sectionRefs.current.delete(id);
    },
    [],
  );

  useEffect(() => {
    if (tocSections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top)[0];

        const nextId = current?.target.getAttribute("data-section-id");

        if (nextId) {
          setActiveId(nextId);
        }
      },
      {
        rootMargin: "-18% 0px -56% 0px",
        threshold: 0,
      },
    );

    sectionRefs.current.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [tocSections]);

  const handleScroll = (id: string) => {
    const section = sectionRefs.current.get(id);

    if (!section) {
      return;
    }

    const top = section.getBoundingClientRect().top + window.scrollY - 116;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section className={styles.section}>
      <div className={styles.pattern} aria-hidden="true">
        <Image src="/images/insights/article-dots.svg" alt="" fill sizes="100vw" />
      </div>

      <div className="container">
        <div className={styles.sectionInner}>
          <motion.div
            className={styles.backWrap}
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <Link href={backHref} className={styles.backLink}>
              <span className={styles.backIcon} aria-hidden="true">
                <Image src="/images/insights/article-back-icon.svg" alt="" width={20} height={20} />
              </span>
              <span>{t("article.backLabel", { fallback: "Back" })}</span>
            </Link>
          </motion.div>

          <div className={styles.layout}>
            <motion.div
              className={styles.leftColumn}
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <h1 className={styles.pageTitle}>{title}</h1>

              <aside
                className={styles.toc}
                aria-label={t("article.contentsLabel", { fallback: "Article contents" })}
              >
                <div className={styles.tocItems}>
                  {tocSections.map((section, index) => (
                    <button
                      key={section.id}
                      type="button"
                      className={cn(
                        styles.tocItem,
                        activeId === section.id && styles.tocItemActive,
                        index === 0 && styles.tocItemFirst,
                      )}
                      onClick={() => handleScroll(section.id)}
                    >
                      <span>{section.title}</span>
                    </button>
                  ))}
                </div>
              </aside>
            </motion.div>

            <div className={styles.sections}>
              {sections.map((section, index) => (
                <motion.section
                  key={section.id}
                  ref={setSectionRef(section.id)}
                  data-section-id={section.id}
                  className={styles.card}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  custom={index * 0.05}
                >
                  <h2 className={styles.cardTitle}>{section.title}</h2>
                  <div
                    className={styles.cardContent}
                    dangerouslySetInnerHTML={{ __html: section.html }}
                  />
                </motion.section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
