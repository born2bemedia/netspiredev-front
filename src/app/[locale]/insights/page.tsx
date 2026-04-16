import type { Metadata } from "next";

import { getArticles } from "@/features/articles/api/get-articles";

import { HeroSection } from "./components";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Web Development Insights & Articles | Netspire Dev",
  description:
    "Explore insights on web design, performance, structure, and digital product development. Clear perspectives without unnecessary complexity.",
  openGraph: {
    title: "Web Development Insights & Articles | Netspire Dev",
    description:
      "Explore insights on web design, performance, structure, and digital product development. Clear perspectives without unnecessary complexity.",
    images: 'https://netspiredev.com/images/meta.png',
  },
};

export default async function InsightsPage({ params }: PageProps) {
  const { locale } = await params;
  const articles = await getArticles({ locale });

  return <HeroSection articles={articles} />;
}
