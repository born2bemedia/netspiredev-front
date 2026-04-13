import type { Metadata } from 'next';

import {
  ClosingSection,
  DifferentiatorsSection,
  ExperienceSection,
  HeroSection,
  ProcessSection,
  WhoWeAreSection,
} from './components';

export const metadata: Metadata = {
  title: 'Our Web Development Approach | Netspire Dev',
  description:
    'Discover how Netspire Dev approaches digital projects through clear structure, thoughtful execution, and transparent collaboration from idea to launch.',
  openGraph: {
    title: 'Our Web Development Approach | Netspire Dev',
    description:
      'Discover how Netspire Dev approaches digital projects through clear structure, thoughtful execution, and transparent collaboration from idea to launch.',
  },
};

export default function OurApproachPage() {
  return (
    <>
      <HeroSection />
      <WhoWeAreSection />
      <DifferentiatorsSection />
      <ProcessSection />
      <ExperienceSection />
      <ClosingSection />
    </>
  );
}
