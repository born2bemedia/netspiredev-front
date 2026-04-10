type PageProps = {
  params: Promise<{ slug: string; locale: string }>;
};
import { redirect } from "next/navigation";

export default async function JournalArticleRoute({ params }: PageProps) {
  const { locale, slug } = await params;
  redirect(`/${locale}/insights/${slug}`);
}
