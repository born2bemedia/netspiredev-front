import type { Metadata } from 'next';

import { ClosingSection, HeroSection, PlansCtaSection, ServicesSection } from './components';

export const metadata: Metadata = {
  title: 'Custom Websites & Web Solutions | Netspire Dev',
  description: 'Explore tailored digital solutions, including websites, web applications, UI/UX design, and performance optimization built for individuals.',
  openGraph: {
    title: 'Custom Websites & Web Solutions | Netspire Dev',
    description: 'Explore tailored digital solutions, including websites, web applications, UI/UX design, and performance optimization built for individuals.',
    images: 'https://netspiredev.com/images/meta.png',
  },
};

export default function WhatWeBuildPage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PlansCtaSection />
      <ClosingSection />
    </>
  );
}
