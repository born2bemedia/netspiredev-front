import type { Metadata } from 'next';

import { ContactOptionsSection, HeroSection, ProjectFormSection } from './components';

export const metadata: Metadata = {
  title: 'Contact Netspire Dev | Start Your Project',
  description:
    'Get in touch with Netspire Dev to discuss your project. Share your idea and start building a tailored digital solution today.',
  openGraph: {
    title: 'Contact Netspire Dev | Start Your Project',
    description:
      'Get in touch with Netspire Dev to discuss your project. Share your idea and start building a tailored digital solution today.',
    images: 'https://netspiredev.com/images/meta.png',
  },
};

export default function GetInTouchPage() {
  return (
    <>
      <HeroSection />
      <ContactOptionsSection />
      <ProjectFormSection />
    </>
  );
}
