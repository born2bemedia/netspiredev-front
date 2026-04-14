import type { Metadata } from 'next';

import { CaseStudiesSection, ClosingSection, HeroSection } from './components';

export const metadata: Metadata = {
  title: 'Web Development Projects & Case Studies | Netspire Dev',
  description:
    'Discover selected web development projects and case studies showcasing custom solutions, design clarity, and functional performance.',
  openGraph: {
    title: 'Web Development Projects & Case Studies | Netspire Dev',
    description:
      'Discover selected web development projects and case studies showcasing custom solutions, design clarity, and functional performance.',
  },
};

export default function SelectedWorkPage() {
  return (
    <>
      <HeroSection />
      <CaseStudiesSection />
      <ClosingSection />
    </>
  );
}
