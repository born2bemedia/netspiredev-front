import { notFound } from "next/navigation";

import type { Metadata } from "next";

import { getArticle, getArticleSlugs } from "@/features/articles/api/get-articles";

import { ArticleContentSection, ClosingSection } from "./components";

type PageProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticle({ slug, locale });

  if (!article) {
    return {
      title: "Web Development Insights & Articles | Netspire Dev",
      description:
        "Explore insights on web design, performance, structure, and digital product development. Clear perspectives without unnecessary complexity.",
    };
  }

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    openGraph: {
      title: article.seoTitle,
      description: article.seoDescription,
    },
  };
}

export default async function InsightArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const article = await getArticle({ slug, locale });

  if (!article) {
    notFound();
  }

  return (
    <>
      <ArticleContentSection
        title={article.title}
        sections={article.sections}
      />
      <ClosingSection title={article.ctaTitle} />
    </>
  );
}
