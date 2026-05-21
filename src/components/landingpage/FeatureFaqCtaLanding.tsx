"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useSession } from "next-auth/react";


export default function FeaturesFaqCtaLanding() {
  const { data: session } = useSession();
  const isLogged = !!session;
  // Safety Section Classes
  const safetySectionClass = cn("section", "safety-section");

  // Why Us Classes
  const whyusSectionClass = cn("section", "whyus-section");

  // CTA Classes
  const ctaSectionClass = cn("cta-section");

  //motion framer
  const secVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3,
      },
    },
  };

  const contVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardVariantsX: Variants = {
    hidden: { opacity: 0, x: -150 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
        mass: 1.5,
        duration: 0.5,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div>
      <motion.section
        variants={secVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className={safetySectionClass}
        id="safety"
      >
        <div className="container">
          <motion.div variants={contVariants} className="safety-grid">
            <div>
              <span className="section-label ">Safety First</span>
              <h2 className="section-title ">
                Zero-Compromise
                <br />
                <em>Crew Protection</em>
              </h2>
              <p className="section-sub " style={{ marginBottom: "2rem" }}>
                Every system, every protocol, every crew member is certified to
                standards that go beyond NASA and ESA requirements combined.
              </p>
              <motion.div variants={contVariants} className="safety-items">
                <motion.div variants={cardVariantsX} className="safety-item">
                  <div className="safety-icon">🛡</div>
                  <div>
                    <div className="safety-item-title">
                      Gen-IV Thermal Shielding
                    </div>
                    <div className="safety-item-desc">
                      Our proprietary ablative hull sustains re-entry
                      temperatures up to 2,800 °C — 40% beyond regulatory
                      minimums.
                    </div>
                  </div>
                </motion.div>
                <motion.div variants={cardVariantsX} className="safety-item ">
                  <div className="safety-icon">🧠</div>
                  <div>
                    <div className="safety-item-title">
                      NASA-Certified Crew Training
                    </div>
                    <div className="safety-item-desc">
                      Every pilot and mission specialist completes a 3,200-hour
                      programme developed in partnership with NASA's Johnson
                      Space Center.
                    </div>
                  </div>
                </motion.div>
                <motion.div variants={cardVariantsX} className="safety-item ">
                  <div className="safety-icon">📡</div>
                  <div>
                    <div className="safety-item-title">NMOSTRA Protocols</div>
                    <div className="safety-item-desc">
                      Triply-redundant life support, real-time telemetry to
                      ground control, and autonomous emergency return systems on
                      every vessel.
                    </div>
                  </div>
                </motion.div>
                <motion.div variants={cardVariantsX} className="safety-item ">
                  <div className="safety-icon">🩺</div>
                  <div>
                    <div className="safety-item-title">
                      On-Board Medical Suite
                    </div>
                    <div className="safety-item-desc">
                      Each ship carries a full surgical suite and two flight
                      surgeons. Remote consultation with Earth specialists
                      available at all times.
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                variants={contVariants}
                className="stat-grid"
                style={{ marginTop: "2rem" }}
              >
                <motion.div variants={cardVariants} className="stat-box ">
                  <div className="stat-num">100%</div>
                  <div className="stat-label">Mission Success</div>
                </motion.div>
                <motion.div variants={cardVariants} className="stat-box ">
                  <div className="stat-num">2,418</div>
                  <div className="stat-label">Safe Voyages</div>
                </motion.div>
                <motion.div variants={cardVariants} className="stat-box ">
                  <div className="stat-num">0</div>
                  <div className="stat-label">Incidents</div>
                </motion.div>
              </motion.div>
            </div>
            <div className="safety-visual ">
              <div className="shield-graphic">
                <div className="shield-ring"></div>
                <div className="shield-ring"></div>
                <div className="shield-ring"></div>
                <div className="shield-center">🛡</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        variants={secVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className={whyusSectionClass}
        id="why-us"
      >
        <motion.div variants={contVariants} className="container">
          <span className="section-label">Why Choose Us</span>
          <h2 className="section-title">
            The Gold Standard
            <br />
            of <em>Space Travel</em>
          </h2>
          <p className="section-sub">
            Nine years of orbital experience, an obsessive commitment to
            comfort, and an appetite for the impossible.
          </p>
          <div className="whyus-grid" style={{ marginTop: "3rem" }}>
            <motion.div variants={cardVariants}  className="feature-card">
              <div className="feature-icon-wrap">🚀</div>
              <div className="feature-title">Hypersonic Transit</div>
              <div className="feature-desc">
                Our Helios-class vessels cruise at Mach 28 in low orbit, cutting
                Mars transfer time to just 89 days — half the industry average.
              </div>
            </motion.div>

            <motion.div variants={cardVariants} className="feature-card">
              <div className="feature-icon-wrap">🏨</div>
              <div className="feature-title">Orbital Luxury Hotels</div>
              <div className="feature-desc">
                Six-star accommodations in zero gravity. Private suites with
                panoramic Earth views, Michelin-starred zero-G dining and spa
                facilities.
              </div>
            </motion.div>

            <motion.div variants={cardVariants} className="feature-card">
              <div className="feature-icon-wrap">🌍</div>
              <div className="feature-title">Carbon-Neutral Launches</div>
              <div className="feature-desc">
                Our hydrogen-fuelled launch system is the world's first
                certified carbon-neutral orbital ascent, partnered with the
                Global Climate Initiative.
              </div>
            </motion.div>

            <motion.div variants={cardVariants} className="feature-card">
              <div className="feature-icon-wrap">🎓</div>
              <div className="feature-title">Pre-Flight Academy</div>
              <div className="feature-desc">
                Every passenger undergoes our 14-day immersive astronaut
                preparation programme — no prior experience required. You land
                confident.
              </div>
            </motion.div>

            <motion.div variants={cardVariants} className="feature-card">
              <div className="feature-icon-wrap">💎</div>
              <div className="feature-title">Fully Inclusive Pricing</div>
              <div className="feature-desc">
                One transparent price covers suit hire, training, accommodation,
                all meals, planetary excursions, and a lifetime membership to
                Galactic Club.
              </div>
            </motion.div>

            <div className="feature-card ">
              <div className="feature-icon-wrap">🤝</div>
              <div className="feature-title">24/7 Mission Support</div>
              <div className="feature-desc">
                A dedicated Mission Advisor accompanies your journey from
                booking to touchdown. Real humans, always reachable, in any time
                zone.
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      <motion.section         variants={secVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} className={ctaSectionClass}>
        <motion.div variants={contVariants} className="container">
          <div className="cta-inner" id="signup">
            <h2>
              Ready to Leave
              <br />
              the Atmosphere?
            </h2>
            <p>
              Create your account and secure a spot on our 2027 launch calendar.
              <br />
              The universe won't wait — neither should you.
            </p>
            <Link href={isLogged ? '/shop' : '/login'} className="btn-primary">
              Create Your Account ✦
            </Link>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
