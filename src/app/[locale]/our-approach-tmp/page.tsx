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
  title: 'Our Approach to Web Development | Netspire Dev',
  description:
    'Learn how Netspire Dev approaches digital projects with structured thinking, clear processes, and performance-focused development.',
  openGraph: {
    title: 'Our Approach to Web Development | Netspire Dev',
    description:
      'Learn how Netspire Dev approaches digital projects with structured thinking, clear processes, and performance-focused development.',
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
