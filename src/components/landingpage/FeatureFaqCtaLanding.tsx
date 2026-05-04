import cn from 'clsx';

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
        <div className={containerClass}>
          <span className={sectionLabelClass}>Security</span>
          <h2 className={sectionTitleClass}>Navigation <em>100% Secure</em></h2>
          <p className={sectionSubClass}>
            Our spacecraft are equipped with cutting-edge technology to ensure the safety of your travel experience.
          </p>
          <div className={safetyGridClass}>
            <div className={safetyVisualClass}>
              <div className={shieldGraphicClass}>
                <div className={shieldRing1Class}></div>
                <div className={shieldRing2Class}></div>
                <div className={shieldCenterClass}>🛡️</div>
              </div>
            </div>
            <div className={safetyItemsClass}>
              <div className={safetyItemClass}>
                <div className={safetyIconClass}>⚡</div>
                <div>
                  <h4 className={safetyItemTitleClass}>Thermal Protection of the last generation</h4>
                  <p className={safetyItemDescClass}>They are tested for thermal protection until 3000 degrees.</p>
                </div>
              </div>
              <div className={safetyItemClass}>
                <div className={safetyIconClass}>🤖</div>
                <div>
                  <h4 className={safetyItemTitleClass}>AI Navigation</h4>
                  <p className={safetyItemDescClass}>They are equipped with advanced AI navigation systems for a smooth and safe journey.</p>
                </div>
              </div>
              <div className={statGridClass}>
                <div className={statBoxClass}>
                  <div className={statNumClass}>99%</div>
                  <div className={statLabelClass}>Safe</div>
                </div>
                <div className={statBoxClass}>
                  <div className={statNumClass}>24/7</div>
                  <div className={statLabelClass}>Support</div>
                </div>
                <div className={statBoxClass}>
                  <div className={statNumClass}>0</div>
                  <div className={statLabelClass}>Incidents</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEZIONE PERCHÉ NOI */}
      <section className={whyusSectionClass} id="perche-noi">
        <div className={containerClass}>
          <span className={sectionLabelClass}>Why Us</span>
          <h2 className={sectionTitleClass}>Why <em>Choose Us</em></h2>
          <div className={whyusGridClass}>
            <div className={featureCardClass}>
              <div className={featureIconWrapClass}>🚀</div>
              <h4 className={featureTitleClass}>The Ultimate Technology</h4>
              <p className={featureDescClass}>Our spacecraft are equipped with cutting-edge technology to ensure the safety of your travel experience.</p>
            </div>
            <div className={featureCardClass}>
              <div className={featureIconWrapClass}>👨‍🚀</div>
              <h4 className={featureTitleClass}>Qualified Crew</h4>
              <p className={featureDescClass}>Our crew have beyond 1000 hours of space flight experience.</p>
            </div>
            <div className={featureCardClass}>
              <div className={featureIconWrapClass}>🌍</div>
              <h4 className={featureTitleClass}>Zero Environmental Impact</h4>
              <p className={featureDescClass}>We reduce the impact of our spacecraft on the environment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CTA BANNER FINALE */}
      <section className={ctaSectionClass}>
        <div className={containerClass}>
          <div className={ctaInnerClass}>
            <h2>Book Your Adventure Now</h2>
            <p>Experience the thrill of space travel with Galactic Horizons</p>
            <button className={btnPrimaryClass}>Book Now</button>
          </div>
        </div>
      </section>
    </div>
  );
}