'use client';

import NavLanding from "@/components/landingpage/NavLanding";
import HeroPricingLanding from "@/components/landingpage/HeroPricingLanding";
import FeaturesFaqCtaLanding from "@/components/landingpage/FeatureFaqCtaLanding";
import FooterLanding from "@/components/landingpage/FooterLanding";
import Testimonials from "@/components/landingpage/Testimonials";
import { usePathname } from "next/navigation";
export default function Home() {
  const pathname = usePathname();
  const noShowPath = ["/login", "/planets-details"];
  const noNav = noShowPath.some((path) => pathname.startsWith(path));
  return (
    <>
     {noNav ? null : <NavLanding />}
      <HeroPricingLanding />
      <Testimonials />
      <FeaturesFaqCtaLanding />
      <FooterLanding />
    </>
  );
}
