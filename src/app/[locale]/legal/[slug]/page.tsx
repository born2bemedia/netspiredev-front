import { notFound } from "next/navigation";

import type { Metadata } from "next";

import { getPolicy, getPolicySlugs } from "@/features/policies/api/get-policy";

import { ArticleContentSection, ClosingSection } from "@/app/[locale]/insights/[slug]/components";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const awaitedParams = await params;
  const { locale, slug } = awaitedParams;
  const policy = await getPolicy({ slug, locale });

  if (!policy) {
    return {
      title: "Legal Policy | Netspire Dev",
      description:
        "Placeholder legal policy content for Netspire Dev. This text will be replaced with the final legal version.",
    };
  }

  const pageTitle = policy.seoTitle;

  return {
    title: pageTitle,
    description: policy.seoDescription,
    openGraph: {
      title: pageTitle,
      description: policy.seoDescription,
    },
  };
}

export async function generateStaticParams() {
  return getPolicySlugs().map((slug) => ({ slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const awaitedParams = await params;
  const { locale, slug } = awaitedParams;
  const policy = await getPolicy({ slug, locale });

  if (!policy) {
    notFound();
  }

  return (
    <>
      <ArticleContentSection
        backHref="/"
        title={policy.title}
        sections={policy.sections}
      />
      <ClosingSection title={policy.ctaTitle} />
    </>
  );
}
