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
          <span className={sectionLabelClass}>Sicurezza</span>
          <h2 className={sectionTitleClass}>Navigazione <em>Sicura al 100%</em></h2>
          <p className={sectionSubClass}>
            I nostri sistemi avanzati garantiscono la protezione totale del tuo equipaggio.
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
                  <h4 className={safetyItemTitleClass}>Scudi Termici di Nuova Generazione</h4>
                  <p className={safetyItemDescClass}>In grado di sopportare temperature fino a 3000°C per i rientri orbitali.</p>
                </div>
              </div>
              <div className={safetyItemClass}>
                <div className={safetyIconClass}>🤖</div>
                <div>
                  <h4 className={safetyItemTitleClass}>Pilota Automatico con AI</h4>
                  <p className={safetyItemDescClass}>Navigazione autonoma avanzata per evitare detriti cosmici.</p>
                </div>
              </div>
              <div className={statGridClass}>
                <div className={statBoxClass}>
                  <div className={statNumClass}>99%</div>
                  <div className={statLabelClass}>Sicurezza</div>
                </div>
                <div className={statBoxClass}>
                  <div className={statNumClass}>24/7</div>
                  <div className={statLabelClass}>Monitoraggio</div>
                </div>
                <div className={statBoxClass}>
                  <div className={statNumClass}>0</div>
                  <div className={statLabelClass}>Incidenti</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEZIONE PERCHÉ NOI */}
      <section className={whyusSectionClass} id="perche-noi">
        <div className={containerClass}>
          <span className={sectionLabelClass}>Vantaggi</span>
          <h2 className={sectionTitleClass}>Perché Scegliere <em>Noi</em></h2>
          <div className={whyusGridClass}>
            <div className={featureCardClass}>
              <div className={featureIconWrapClass}>🚀</div>
              <h4 className={featureTitleClass}>Tecnologia All'avanguardia</h4>
              <p className={featureDescClass}>Utilizziamo solo navette di ultima generazione per un'esperienza fluida e veloce.</p>
            </div>
            <div className={featureCardClass}>
              <div className={featureIconWrapClass}>👨‍🚀</div>
              <h4 className={featureTitleClass}>Personale Qualificato</h4>
              <p className={featureDescClass}>I nostri astronauti e guide hanno oltre 10.000 ore di volo nello spazio.</p>
            </div>
            <div className={featureCardClass}>
              <div className={featureIconWrapClass}>🌍</div>
              <h4 className={featureTitleClass}>Turismo Sostenibile</h4>
              <p className={featureDescClass}>Riduciamo a zero l'impatto ambientale nello spazio e a terra.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CTA BANNER FINALE */}
      <section className={ctaSectionClass}>
        <div className={containerClass}>
          <div className={ctaInnerClass}>
            <h2>Pronto al decollo?</h2>
            <p>Prenota ora il tuo viaggio spaziale personalizzato e preparati per l'avventura della vita.</p>
            <button className={btnPrimaryClass}>Prenota Ora</button>
          </div>
        </div>
      </section>
    </div>
  );
}