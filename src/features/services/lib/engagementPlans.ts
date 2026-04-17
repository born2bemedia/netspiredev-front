import { useTranslations } from "next-intl";

export const useEngagementPlans = () => {
  const t = useTranslations("engagementPlansPage");

  return [
    {
      slug: "core-plan",
      order: "01",
      titleFallback: t("corePlanTitle", { fallback: "Core Plan" }),
      descriptionFallback: t("corePlanDescription", {
        fallback:
          "A practical website package designed for individuals who need a simple, professional online presence without advanced custom functionality.",
      }),
      priceFallback: t("corePlanPrice", { fallback: "From €500" }),
      ctaFallback: t("corePlanCta", { fallback: "Order Core Plan" }),
      includedItems: [
        {
          fallback: t("corePlanIncludedPageCount", {
            fallback: "1–2 page modern website",
          }),
        },
        {
          fallback: t("corePlanIncludedResponsive", {
            fallback: "Responsive design adaptation",
          }),
        },
        {
          fallback: t("corePlanIncludedSeo", { fallback: "Basic SEO setup" }),
        },
        {
          fallback: t("corePlanIncludedContact", {
            fallback: "Contact form integration",
          }),
        },
        {
          fallback: t("corePlanIncludedPresentation", {
            fallback: "Clear, structured presentation",
          }),
        },
        {
          fallback: t("corePlanIncludedPerformance", {
            fallback: "Fast-loading structure",
          }),
        },
        {
          fallback: t("corePlanIncludedLaunch", {
            fallback: "Launch-ready delivery",
          }),
        },
      ],
    },
    {
      slug: "framework-plan",
      order: "02",
      titleFallback: t("frameworkPlanTitle", { fallback: "Framework Plan" }),
      descriptionFallback: t("frameworkPlanDescription", {
        fallback:
          "A more complete solution for individuals who need structure, flexibility, and a stronger digital foundation.",
      }),
      priceFallback: t("frameworkPlanPrice", { fallback: "From €1,200" }),
      ctaFallback: t("frameworkPlanCta", { fallback: "Order Framework Plan" }),
      includedItems: [
        {
          fallback: t("frameworkPlanIncludedPageCount", {
            fallback: "Up to 6 custom pages",
          }),
        },
        {
          fallback: t("frameworkPlanIncludedDesign", {
            fallback: "Enhanced UI/UX design",
          }),
        },
        {
          fallback: t("frameworkPlanIncludedResponsive", {
            fallback: "Improved navigation & structure",
          }),
        },
        {
          fallback: t("frameworkPlanIncludedSeo", {
            fallback: "Basic animations and interactions",
          }),
        },
        {
          fallback: t("frameworkPlanIncludedPerformance", {
            fallback: "Performance optimization",
          }),
        },
        {
          fallback: t("frameworkPlanIncludedCms", {
            fallback: "SEO-friendly setup",
          }),
        },
        {
          fallback: t("frameworkPlanIncludedForms", {
            fallback: "Integration of external tools (basic)",
          }),
        },
      ],
    },
    {
      slug: "expansion-plan",
      order: "03",
      titleFallback: t("expansionPlanTitle", { fallback: "Expansion Plan" }),
      descriptionFallback: t("expansionPlanDescription", {
        fallback:
          "Designed for more dynamic projects that require deeper functionality and a refined user experience.",
      }),
      priceFallback: t("expansionPlanPrice", { fallback: "From €2,200" }),
      ctaFallback: t("expansionPlanCta", { fallback: "Order Expansion Plan" }),
      includedItems: [
        {
          fallback: t("expansionPlanIncludedPageCount", {
            fallback: "Up to 10 custom pages or sections",
          }),
        },
        {
          fallback: t("expansionPlanIncludedDesignSystem", {
            fallback: "Advanced visual design system",
          }),
        },
        {
          fallback: t("expansionPlanIncludedInteractions", {
            fallback: "Custom interactive elements",
          }),
        },
        {
          fallback: t("expansionPlanIncludedPerformance", {
            fallback: "Optimized performance and speed",
          }),
        },
        {
          fallback: t("expansionPlanIncludedResponsiveness", {
            fallback: "Enhanced responsiveness",
          }),
        },
        {
          fallback: t("expansionPlanIncludedWebApp", {
            fallback: "Basic web app functionality (if required)",
          }),
        },
      ],
    },
    {
      slug: "architecture-plan",
      order: "04",
      titleFallback: t("architecturePlanTitle", {
        fallback: "Architecture Plan",
      }),
      descriptionFallback: t("architecturePlanDescription", {
        fallback:
          "A comprehensive solution for complex projects that require custom functionality, flexibility, and long-term scalability.",
      }),
      priceFallback: t("architecturePlanPrice", { fallback: "From €3,500" }),
      ctaFallback: t("architecturePlanCta", {
        fallback: "Order Architecture Plan",
      }),
      includedItems: [
        {
          fallback: t("architecturePlanIncludedWebsite", {
            fallback: "Fully custom website or platform",
          }),
        },
        {
          fallback: t("architecturePlanIncludedInteractions", {
            fallback: "Advanced UI/UX with refined interactions",
          }),
        },
        {
          fallback: t("architecturePlanIncludedFlows", {
            fallback: "Custom functionality & user flows",
          }),
        },
        {
          fallback: t("architecturePlanIncludedIntegrations", {
            fallback: "API and system integrations",
          }),
        },
        {
          fallback: t("architecturePlanIncludedPerformance", {
            fallback: "Performance and scalability optimization",
          }),
        },
        {
          fallback: t("architecturePlanIncludedExpansion", {
            fallback: "Advanced structure for future expansion",
          }),
        },
        {
          fallback: t("architecturePlanIncludedWorkflow", {
            fallback: "Priority development workflow",
          }),
        },
      ],
    },
    {
      slug: "full-stack-plan",
      order: "05",
      titleFallback: t("fullStackPlanTitle", { fallback: "Full Stack Plan" }),
      descriptionFallback: t("fullStackPlanDescription", {
        fallback:
          "A complete, high-end digital solution built from the ground up. Ideal for complex ideas requiring precision, scalability, and a fully tailored approach.",
      }),
      priceFallback: t("fullStackPlanPrice", { fallback: "From €5,000" }),
      ctaFallback: t("fullStackPlanCta", { fallback: "Order Full Stack Plan" }),
      includedItems: [
        {
          fallback: t("fullStackPlanIncludedSolution", {
            fallback: "Fully custom web solution or application",
          }),
        },
        {
          fallback: t("fullStackPlanIncludedArchitecture", {
            fallback: "Complex system architecture",
          }),
        },
        {
          fallback: t("fullStackPlanIncludedDesign", {
            fallback: "Advanced UI/UX design and interaction logic",
          }),
        },
        {
          fallback: t("fullStackPlanIncludedBackend", {
            fallback: "Custom features and backend functionality",
          }),
        },
        {
          fallback: t("fullStackPlanIncludedEcosystem", {
            fallback: "Full integration ecosystem (APIs, tools, services)",
          }),
        },
        {
          fallback: t("fullStackPlanIncludedPerformance", {
            fallback: "Performance engineering and optimization",
          }),
        },
        {
          fallback: t("fullStackPlanIncludedSupport", {
            fallback: "Ongoing support (initial phase)",
          }),
        },
        {
          fallback: t("fullStackPlanIncludedDelivery", {
            fallback: "Priority delivery and dedicated workflow",
          }),
        },
      ],
    },
  ];
};
