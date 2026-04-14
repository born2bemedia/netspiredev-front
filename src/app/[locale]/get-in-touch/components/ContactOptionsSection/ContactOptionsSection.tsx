"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  WEBSITE_EMAIL,
  WEBSITE_OFFICE_ADDRESS,
  WEBSITE_OFFICE_ADDRESS_MAP,
  WEBSITE_PHONE,
  WEBSITE_REGISTERED_ADDRESS,
  WEBSITE_REGISTERED_ADDRESS_MAP,
  X_URL,
} from "@/shared/lib/constants/constants";
import {
  fadeInLeft,
  fadeInRight,
  fadeInUp,
} from "@/shared/lib/helpers/animations";
import { cn } from "@/shared/lib/helpers/styles";

import styles from "./ContactOptionsSection.module.scss";

type ContactCardItem = {
  href?: string;
  iconSrc: string;
  key: "email" | "legal" | "office" | "phone";
  label: string;
  value: string;
};

type SocialItem = {
  href: string;
  key: "facebook" | "instagram" | "x";
  label: string;
};

const resolveEmailHref = (value: string) => {
  const trimmedValue = value.trim();

  if (!trimmedValue || /^email$/i.test(trimmedValue)) {
    return undefined;
  }

  return `mailto:${trimmedValue}`;
};

const resolvePhoneHref = (value: string) => {
  const trimmedValue = value.trim();

  if (
    !trimmedValue ||
    /^phone$/i.test(trimmedValue) ||
    /^phone number$/i.test(trimmedValue)
  ) {
    return undefined;
  }

  return `tel:${trimmedValue.replace(/\s+/g, "")}`;
};

const resolveExternalHref = (value: string) => {
  const trimmedValue = value.trim();
  return trimmedValue && trimmedValue !== "#" ? trimmedValue : undefined;
};

export const ContactOptionsSection = () => {
  const t = useTranslations("getInTouchPage");
  const viewport = { once: true, amount: 0.2 };

  const contactCards: readonly ContactCardItem[] = [
    {
      key: "email",
      label: t("contact.cards.email", { fallback: "Drop Us a Line" }),
      value: WEBSITE_EMAIL,
      href: resolveEmailHref(WEBSITE_EMAIL),
      iconSrc: "/images/get-in-touch/icon-email.svg",
    },
    {
      key: "phone",
      label: t("contact.cards.phone", { fallback: "Call Directly" }),
      value: WEBSITE_PHONE,
      href: resolvePhoneHref(WEBSITE_PHONE),
      iconSrc: "/images/get-in-touch/icon-phone.svg",
    },
    {
      key: "office",
      label: t("contact.cards.office", { fallback: "Office Location" }),
      value: WEBSITE_OFFICE_ADDRESS,
      href: resolveExternalHref(WEBSITE_OFFICE_ADDRESS_MAP),
      iconSrc: "/images/get-in-touch/icon-location.svg",
    },
    {
      key: "legal",
      label: t("contact.cards.legal", { fallback: "Legal Address" }),
      value: WEBSITE_REGISTERED_ADDRESS,
      href: resolveExternalHref(WEBSITE_REGISTERED_ADDRESS_MAP),
      iconSrc: "/images/get-in-touch/icon-location.svg",
    },
  ] as const;

  const socialItems: readonly SocialItem[] = [
    {
      key: "facebook",
      label: t("social.facebook", { fallback: "Facebook" }),
      href: resolveExternalHref(FACEBOOK_URL) ?? "#",
    },
    {
      key: "instagram",
      label: t("social.instagram", { fallback: "Instagram" }),
      href: resolveExternalHref(INSTAGRAM_URL) ?? "#",
    },
    {
      key: "x",
      label: t("social.x", { fallback: "X" }),
      href: resolveExternalHref(X_URL) ?? "#",
    },
  ] as const;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionInner}>
          <motion.div
            className={styles.leftColumn}
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <div className={styles.heading}>
              <h2 className={styles.title}>
                {t("contact.title", { fallback: "Get in Touch, Your Way" })}
              </h2>
              <p className={styles.description}>
                {t("contact.description", {
                  fallback:
                    "Prefer to reach out directly? You can contact us using the details below.",
                })}
              </p>
            </div>

            <div className={cn(styles.cards, contactCards.filter(item => item.value).length < 4 && styles.cardsFull)}>
              {contactCards.map((item, index) => {
                const isFullWidth = index >= 2;
                const className = cn(
                  styles.card,
                  isFullWidth && styles.cardFull,
                );
                const content = (
                  <>
                    <div className={styles.cardIconWrap}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.iconSrc}
                        alt=""
                        aria-hidden="true"
                        className={styles.cardIcon}
                      />
                    </div>
                    <div className={styles.cardCopy}>
                      <p className={styles.cardLabel}>{item.label}</p>
                      <p className={styles.cardValue}>{item.value}</p>
                    </div>
                  </>
                );

                return (
                  item.value && (
                    <motion.div
                      key={item.key}
                      variants={fadeInUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={viewport}
                      custom={index * 0.08}
                      className={isFullWidth ? styles.cardFull : undefined}
                    >
                      {item.href ? (
                        <a
                          className={className}
                          href={item.href}
                          target={
                            item.href.startsWith("mailto:") ||
                            item.href.startsWith("tel:")
                              ? undefined
                              : "_blank"
                          }
                          rel={
                            item.href.startsWith("mailto:") ||
                            item.href.startsWith("tel:")
                              ? undefined
                              : "noopener noreferrer"
                          }
                        >
                          {content}
                        </a>
                      ) : (
                        <div className={className}>{content}</div>
                      )}
                    </motion.div>
                  )
                );
              })}
            </div>
          </motion.div>

          <motion.aside
            className={styles.socialPanel}
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <div className={styles.socialHeading}>
              <h3 className={styles.socialTitle}>
                {t("social.title", { fallback: "Stay Connected" })}
              </h3>
              <p className={styles.socialDescription}>
                {t("social.description", {
                  fallback:
                    "Follow us for updates, insights, and a closer look at what we build.",
                })}
              </p>
            </div>

            <div className={styles.socialButtons}>
              {socialItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className={styles.socialButton}
                  target={item.href === "#" ? undefined : "_blank"}
                  rel={item.href === "#" ? undefined : "noopener noreferrer"}
                >
                  <span>{item.label}</span>
                  <span className={styles.socialButtonIcon} aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/get-in-touch/icon-arrow.svg" alt="" />
                  </span>
                </a>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};
