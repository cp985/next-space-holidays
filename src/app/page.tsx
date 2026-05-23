

import HeroPricingLanding from "@/components/landingpage/HeroPricingLanding";
import FeaturesFaqCtaLanding from "@/components/landingpage/FeatureFaqCtaLanding";
import FooterLanding from "@/components/landingpage/FooterLanding";
import Testimonials from "@/components/landingpage/Testimonials";
export default function Home() {
  return (
    <main >
      <HeroPricingLanding />
      <Testimonials />
      <FeaturesFaqCtaLanding />
      <FooterLanding />
    </main>
  );
}
