import NavLanding from "@/components/landingpage/NavLanding";
import HeroPricingLanding from "@/components/landingpage/HeroPricingLanding";
import FeaturesFaqCtaLanding from "@/components/landingpage/FeatureFaqCtaLanding";
import FooterLanding from "@/components/landingpage/FooterLanding";

export default function Home() {
  return (
    <>
      <NavLanding />
      <HeroPricingLanding />
      <FeaturesFaqCtaLanding />
      <FooterLanding />
    </>
  );
}
