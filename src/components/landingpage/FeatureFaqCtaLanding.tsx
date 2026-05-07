import { cn } from "@/lib/utils";
import Link from "next/link";


export default function FeaturesFaqCtaLanding() {
  // Safety Section Classes
  const safetySectionClass = cn('section', 'safety-section');
  const containerClass = cn('container');
  const sectionLabelClass = cn('section-label');
  const sectionTitleClass = cn('section-title');
  const sectionSubClass = cn('section-sub');
  const safetyGridClass = cn('safety-grid');
  const safetyVisualClass = cn('safety-visual');
  const shieldGraphicClass = cn('shield-graphic');
  const shieldRing1Class = cn('shield-ring');
  const shieldRing2Class = cn('shield-ring');
  const shieldCenterClass = cn('shield-center');
  const safetyItemsClass = cn('safety-items');
  const safetyItemClass = cn('safety-item');
  const safetyIconClass = cn('safety-icon');
  const safetyItemTitleClass = cn('safety-item-title');
  const safetyItemDescClass = cn('safety-item-desc');

  // Stats Box Classes
  const statGridClass = cn('stat-grid');
  const statBoxClass = cn('stat-box');
  const statNumClass = cn('stat-num');
  const statLabelClass = cn('stat-label');

  // Why Us Classes
  const whyusSectionClass = cn('section', 'whyus-section');
  const whyusGridClass = cn('whyus-grid');
  const featureCardClass = cn('feature-card');
  const featureIconWrapClass = cn('feature-icon-wrap');
  const featureTitleClass = cn('feature-title');
  const featureDescClass = cn('feature-desc');

  // CTA Classes
  const ctaSectionClass = cn('cta-section');
  const ctaInnerClass = cn('cta-inner');
  const btnPrimaryClass = cn('btn-primary');

  return (
    <div>
      {/* 1. SEZIONE SICUREZZA (FEATURES) */}
      <section className={safetySectionClass} id="sicurezza">
      <section className="safety-section" id="safety">
  <div className="container">
    <div className="safety-grid">
      <div>
        <span className="section-label ">Safety First</span>
        <h2 className="section-title ">Zero-Compromise<br/><em>Crew Protection</em></h2>
        <p className="section-sub " style={{marginBottom:"2rem"}}>Every system, every protocol, every crew member is certified to standards that go beyond NASA and ESA requirements combined.</p>
        <div className="safety-items">
          <div className="safety-item">
            <div className="safety-icon">🛡</div>
            <div>
              <div className="safety-item-title">Gen-IV Thermal Shielding</div>
              <div className="safety-item-desc">Our proprietary ablative hull sustains re-entry temperatures up to 2,800 °C — 40% beyond regulatory minimums.</div>
            </div>
          </div>
          <div className="safety-item ">
            <div className="safety-icon">🧠</div>
            <div>
              <div className="safety-item-title">NASA-Certified Crew Training</div>
              <div className="safety-item-desc">Every pilot and mission specialist completes a 3,200-hour programme developed in partnership with NASA's Johnson Space Center.</div>
            </div>
          </div>
          <div className="safety-item ">
            <div className="safety-icon">📡</div>
            <div>
              <div className="safety-item-title">NMOSTRA Protocols</div>
              <div className="safety-item-desc">Triply-redundant life support, real-time telemetry to ground control, and autonomous emergency return systems on every vessel.</div>
            </div>
          </div>
          <div className="safety-item ">
            <div className="safety-icon">🩺</div>
            <div>
              <div className="safety-item-title">On-Board Medical Suite</div>
              <div className="safety-item-desc">Each ship carries a full surgical suite and two flight surgeons. Remote consultation with Earth specialists available at all times.</div>
            </div>
          </div>
        </div>
        <div className="stat-grid" style={{marginTop : "2rem"}}>
          <div  className="stat-box "><div className="stat-num">100%</div><div className="stat-label">Mission Success</div></div>
          <div className="stat-box "><div className="stat-num">2,418</div><div className="stat-label">Safe Voyages</div></div>
          <div className="stat-box "><div className="stat-num">0</div><div className="stat-label">Incidents</div></div>
        </div>
      </div>
      <div className="safety-visual ">
        <div className="shield-graphic">
          <div className="shield-ring"></div>
          <div className="shield-ring"></div>
          <div className="shield-ring"></div>
          <div className="shield-center">🛡</div>
        </div>
      </div>
    </div>
  </div>
</section>
      </section>

      {/* 2. SEZIONE PERCHÉ NOI */}
<section className={whyusSectionClass} id="perche-noi">
  <div className="container">
    <span className="section-label">Why Choose Us</span>
    <h2 className="section-title">The Gold Standard<br/>of <em>Space Travel</em></h2>
    <p className="section-sub">Nine years of orbital experience, an obsessive commitment to comfort, and an appetite for the impossible.</p>
    <div className="whyus-grid" style={{marginTop:"3rem"}}>

      <div className="feature-card">
        <div className="feature-icon-wrap">🚀</div>
        <div className="feature-title">Hypersonic Transit</div>
        <div className="feature-desc">Our Helios-class vessels cruise at Mach 28 in low orbit, cutting Mars transfer time to just 89 days — half the industry average.</div>
      </div>

      <div className="feature-card">
        <div className="feature-icon-wrap">🏨</div>
        <div className="feature-title">Orbital Luxury Hotels</div>
        <div className="feature-desc">Six-star accommodations in zero gravity. Private suites with panoramic Earth views, Michelin-starred zero-G dining and spa facilities.</div>
      </div>

      <div className="feature-card">
        <div className="feature-icon-wrap">🌍</div>
        <div className="feature-title">Carbon-Neutral Launches</div>
        <div className="feature-desc">Our hydrogen-fuelled launch system is the world's first certified carbon-neutral orbital ascent, partnered with the Global Climate Initiative.</div>
      </div>

      <div className="feature-card">
        <div className="feature-icon-wrap">🎓</div>
        <div className="feature-title">Pre-Flight Academy</div>
        <div className="feature-desc">Every passenger undergoes our 14-day immersive astronaut preparation programme — no prior experience required. You land confident.</div>
      </div>

      <div className="feature-card">
        <div className="feature-icon-wrap">💎</div>
        <div className="feature-title">Fully Inclusive Pricing</div>
        <div className="feature-desc">One transparent price covers suit hire, training, accommodation, all meals, planetary excursions, and a lifetime membership to Galactic Club.</div>
      </div>

      <div className="feature-card ">
        <div className="feature-icon-wrap">🤝</div>
        <div className="feature-title">24/7 Mission Support</div>
        <div className="feature-desc">A dedicated Mission Advisor accompanies your journey from booking to touchdown. Real humans, always reachable, in any time zone.</div>
      </div>

    </div>
  </div>
</section>

      {/* 3. CTA BANNER FINALE */}
      <section className={ctaSectionClass}>
  <div className="container">
    <div className="cta-inner" id="signup">
      <h2>Ready to Leave<br/>the Atmosphere?</h2>
      <p>Create your account and secure a spot on our 2027 launch calendar.<br/>The universe won't wait — neither should you.</p>
      <Link href="/login" className="btn-primary" >Create Your Account ✦</Link>
    </div>
  </div>
      </section>
    </div>
  );
}