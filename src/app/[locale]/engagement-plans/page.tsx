import { Metadata } from "next";

import { ClosingSection, HeroSection, PlansSection } from "./components";

export const metadata: Metadata = {
  title: "Web Development Pricing Plans | Netspire Dev",
  description:
    "Flexible web development plans designed for individuals. Choose the right package based on your project scope, features, and goals.",
  openGraph: {
    title: "Web Development Pricing Plans | Netspire Dev",
    description:
      "Flexible web development plans designed for individuals. Choose the right package based on your project scope, features, and goals.",
    images: 'https://netspiredev.com/images/meta.png',
  },
};

export default function EngagementPlansPage() {
  return (
    <>
      <HeroSection />
      <PlansSection />
      <ClosingSection />
    </>
  );
}
