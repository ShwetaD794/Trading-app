import React from 'react';
import "./Stats.css";

export default function Stats() {
  return (
    <div className="container my-5">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 mb-4 mb-md-0 text-md-start text-center">
          <h2 className="mb-4 fw-bold">Trust with confidence</h2>

          <div className="stat-section mb-4">
            <h5>Customer-first always</h5>
            <p>
              That's why 1.6+ crore customers trust Zerodha with ~₹6 lakh crores of equity investments and
              contribute to 15% of daily retail exchange volumes in India.
            </p>
          </div>

          <div className="stat-section mb-4">
            <h5>No spam or gimmicks</h5>
            <p>
              No gimmicks, spam, "gamification", or annoying push notifications. High-quality apps that you
              use at your pace, the way you like.
            </p>
          </div>

          <div className="stat-section mb-4">
            <h5>The Zerodha universe</h5>
            <p>
              Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you
              tailored services specific to your needs.
            </p>
          </div>

          <div className="stat-section">
            <h5>Do better with money</h5>
            <p>
              With initiatives like Nudge and Kill Switch, we don't just facilitate transactions but actively
              help you do better with your money.
            </p>
          </div>
        </div>

        <div className="col-12 col-md-6 text-center">
          <img src="images/ecosystem.png" alt="Ecosystem" className="img-fluid ecosystem-img mb-3" />

          <div className="links d-flex flex-column flex-sm-row justify-content-center gap-3 mt-3">
            <a href="" className="stats-link">
              Explore our products <i className="fa-solid fa-arrow-right ms-1"></i>
            </a>
            <a href="" className="stats-link">
              Try Kite demo <i className="fa-solid fa-arrow-right ms-1"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="logos text-center mt-5">
        <img src="images/pressLogos.png" alt="Press Logos" className="img-fluid press-logos" />
      </div>
    </div>
  );
}
