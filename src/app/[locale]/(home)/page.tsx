import {
  ApproachSection,
  ClosingSection,
  HeroSection,
  PlansSection,
  ServicesSection,
  SolutionsSection,
  WhySection,
  WorkSection,
} from "./components";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SolutionsSection />
      <ServicesSection />
      <ApproachSection />
      <PlansSection />
      <WorkSection />
      <WhySection />
      <ClosingSection />
    </>
  );
}
