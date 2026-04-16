"use client";

import { useEffect, useRef, useState } from "react";

import { useTranslations } from "next-intl";

import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  WEBSITE_EMAIL,
  WEBSITE_PHONE,
  X_URL,
} from "@/shared/lib/constants/constants";

import { Arrow } from "../../icons/header/arrow";
import { Logo } from "../../icons/header/Logo";
import { Plus } from "../../icons/header/plus";
import { Button } from "../../kit/button/Button";
import { LangSelector } from "../language-switcher/LangSelector";
import styles from "./Header.module.scss";

import { Link, usePathname } from "@/i18n/navigation";

type HeaderNavItem = {
  key:
    | "home"
    | "whatWeBuild"
    | "engagementPlans"
    | "selectedWork"
    | "ourApproach"
    | "insights";
  text: string;
  href: string;
};

type HeaderSocialItem = {
  key: "facebook" | "instagram" | "x";
  text: string;
  href: string;
};

const normalizePath = (path: string) => {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }

  return path;
};

const stripHash = (path: string) => {
  const [pathname] = path.split("#");
  return pathname || "/";
};

const resolveContactHref = (value: string, type: "email" | "phone") => {
  const trimmedValue = value.trim();

  if (
    !trimmedValue ||
    /^email$/i.test(trimmedValue) ||
    /^phone$/i.test(trimmedValue) ||
    /^phone number$/i.test(trimmedValue)
  ) {
    return "/get-in-touch";
  }

  if (type === "email") {
    return `mailto:${trimmedValue}`;
  }

  return `tel:${trimmedValue.replace(/\s+/g, "")}`;
};

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileLanguageOpen, setIsMobileLanguageOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWhiteTheme, setIsWhiteTheme] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("header");
  const previousPathnameRef = useRef(pathname);

  const navItems: readonly HeaderNavItem[] = [
    { key: "home", text: t("home", { fallback: "Home" }), href: "/" },
    {
      key: "whatWeBuild",
      text: t("whatWeBuild", { fallback: "What We Build" }),
      href: "/what-we-build",
    },
    {
      key: "engagementPlans",
      text: t("engagementPlans", { fallback: "Engagement Plans" }),
      href: "/engagement-plans",
    },
    {
      key: "selectedWork",
      text: t("selectedWork", { fallback: "Selected Work" }),
      href: "/selected-work",
    },
    {
      key: "ourApproach",
      text: t("ourApproach", { fallback: "Our Approach" }),
      href: "/our-approach",
    },
    {
      key: "insights",
      text: t("insights", { fallback: "Insights" }),
      href: "/insights",
    },
  ] as const;

  const whiteThemePaths = [
    "/what-we-build",
    "/engagement-plans",
    "/selected-work",
    "/insights",
    "/legal",
  ];

  const socialItems: readonly HeaderSocialItem[] = [
    {
      key: "facebook",
      text: t("facebook", { fallback: "Facebook" }),
      href: FACEBOOK_URL,
    },
    {
      key: "instagram",
      text: t("instagram", { fallback: "Instagram" }),
      href: INSTAGRAM_URL,
    },
    { key: "x", text: t("x", { fallback: "X" }), href: X_URL },
  ] as const;

  const emailHref = resolveContactHref(WEBSITE_EMAIL, "email");
  const phoneHref = resolveContactHref(WEBSITE_PHONE, "phone");

  const isActivePath = (href: string) => {
    if (href.includes("#")) {
      return false;
    }

    const baseHref = stripHash(href);
    return normalizePath(pathname) === normalizePath(baseHref);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const closeMobileLanguage = () => {
    setIsMobileLanguageOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileLanguageOpen(false);
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleMobileLanguage = (nextValue: boolean) => {
    if (nextValue) {
      setIsMobileMenuOpen(false);
    }

    setIsMobileLanguageOpen(nextValue);
  };

  useEffect(() => {
    if (previousPathnameRef.current === pathname) {
      return;
    }

    previousPathnameRef.current = pathname;

    if (!isMobileMenuOpen && !isMobileLanguageOpen) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      closeMobileMenu();
      closeMobileLanguage();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [isMobileLanguageOpen, isMobileMenuOpen, pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (whiteThemePaths.some((path) => pathname.includes(path))) {
      setTimeout(() => {
        setIsWhiteTheme(true);
      }, 0);
    } else {
      setTimeout(() => {
        setIsWhiteTheme(false);
      }, 0);
    }
    {
    }
  }, [pathname]);

  const renderMetaLink = (
    key: string,
    label: string,
    href: string,
    className: string,
  ) => {
    if (href.startsWith("/")) {
      return (
        <Link key={key} href={href} className={className}>
          {label}
        </Link>
      );
    }

    return (
      <a key={key} href={href} className={className}>
        {label}
      </a>
    );
  };

  const renderSocialLink = (item: HeaderSocialItem) => {
    return (
      <a
        key={item.key}
        href={item.href}
        className={styles.header__socialLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{item.text}</span>
        <span className={styles.header__socialIcon} aria-hidden="true">
          <Arrow />
        </span>
      </a>
    );
  };

  const renderNavItem = (item: HeaderNavItem, isMobile = false) => {
    return (
      <Link
        key={item.key}
        href={item.href}
        className={
          isMobile ? styles.header__mobileNavItem : styles.header__navItem
        }
        data-active={isActivePath(item.href)}
        onClick={isMobile ? closeMobileMenu : undefined}
      >
        {item.text}
      </Link>
    );
  };

  return (
    <>
      <div className={styles.header__topbarWrap}>
        <div className="container">
          <div className={styles.header__topbarShell}>
            <div className={styles.header__topbarInner}>
              <div className={styles.header__meta}>
                {WEBSITE_EMAIL &&
                  renderMetaLink(
                    "email",
                    WEBSITE_EMAIL,
                    emailHref,
                    styles.header__metaLink,
                  )}
                {WEBSITE_PHONE &&
                  renderMetaLink(
                    "phone",
                    WEBSITE_PHONE,
                    phoneHref,
                    styles.header__metaLink,
                  )}
              </div>

              <div className={styles.header__topbarActions}>
                <div className={styles.header__socials}>
                  {socialItems.map((item) => renderSocialLink(item))}
                </div>

                <div className={styles.header__desktopLang}>
                  <LangSelector variant="desktop" />
                </div>

                <div className={styles.header__mobileLang}>
                  <LangSelector
                    variant="mobile"
                    isOpen={isMobileLanguageOpen}
                    onOpenChange={toggleMobileLanguage}
                    showDropdown={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <header
        className={`${styles.header} ${
          isWhiteTheme
            ? !isMobileMenuOpen && !isMobileLanguageOpen
              ? styles.header__white
              : ""
            : ""
        } `}
        data-mobile-open={isMobileMenuOpen}
        data-scrolled={isScrolled}
      >
        <div className="container">
          <div className={styles.header__shell}>
            <div className={styles.header__main}>
              <div className={styles.header__mainInner}>
                <Link href="/" className={styles.header__brand}>
                  <Logo />
                </Link>

                <nav className={styles.header__nav}>
                  {navItems.map((item) => renderNavItem(item))}
                </nav>

                <div className={styles.header__actions}>
                  <div className={styles.header__cta}>
                    <Button variant="filled" url="/get-in-touch" type="link">
                      <span>
                        {t("getInTouch", { fallback: "Get in Touch" })}
                      </span>
                      <span
                        className={styles.header__ctaIcon}
                        aria-hidden="true"
                      >
                        <Plus />
                      </span>
                    </Button>
                  </div>

                  <div className={styles.header__menuButton}>
                    <Button
                      variant="filled"
                      type="button"
                      onClick={toggleMobileMenu}
                    >
                      <span>{t("menu", { fallback: "Menu" })}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="header-mobile-menu"
              className={styles.header__mobileMenu}
              data-open={isMobileMenuOpen || isMobileLanguageOpen}
            >
              {isMobileLanguageOpen ? (
                <div className={styles.header__mobileLanguagePanel}>
                  <LangSelector variant="mobile" dropdownOnly isOpen />
                </div>
              ) : (
                <div className={styles.header__mobileMenuInner}>
                  <nav className={styles.header__mobileNav}>
                    {navItems.map((item) => renderNavItem(item, true))}
                  </nav>

                  <div className={styles.header__mobileFooter}>
                    <div className={styles.header__mobileSocials}>
                      {socialItems.map((item) => renderSocialLink(item))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
