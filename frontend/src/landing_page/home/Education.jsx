import React from 'react';
import "./Education.css";

export default function Education() {
  return (
    <div className="container my-5">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
          <img 
            src="images/education.svg" 
            alt="Education"
            className="img-fluid edu-img"
          />
        </div>

        <div className="col-12 col-md-6 text-md-start text-center">
          <h2 className="fw-bold mb-3">Free and open market education</h2>

          <p className="mt-4">
            <strong>Varsity</strong>, the largest online stock market education book in the world 
            covering everything from the basics to advanced trading.
          </p>
          <a href="" className="edu-link d-inline-block mb-4">Varsity →</a>

          <p className="mt-4">
            <strong>Trading Q&A</strong>, the most active trading and investment community in India 
            for all your market-related queries.
          </p>
          <a href="" className="edu-link d-inline-block">TradingQ&A →</a>
        </div>
      </div>
    </div>
  );
}
