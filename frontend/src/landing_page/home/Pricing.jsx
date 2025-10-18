import React from 'react';
import "./Pricing.css";

export default function Pricing() {
  return (
    <div className="container my-5">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 mb-4 mb-md-0 text-md-start text-center">
          <h2 className="mb-4 fw-bold">Unbeatable pricing</h2>
          <p className="mb-4">
            We pioneered the concept of discount broking and price transparency in India. 
            Flat fees and no hidden charges.
          </p>
          <a href="" className="pricing-link">
            See pricing <i className="fa-solid fa-arrow-right ms-2"></i>
          </a>
        </div>

        <div className="col-12 col-md-6">
          <div className="row text-center text-md-start">
            <div className="col-12 col-sm-4 mb-4 mb-sm-0 d-flex flex-column align-items-center tags">
              <img src="images/pricing.svg" alt="Pricing" className="pricing-icon mb-2" />
              <p className="mb-0">Free account opening</p>
            </div>

            <div className="col-12 col-sm-4 mb-4 mb-sm-0 d-flex flex-column align-items-center tags">
              <img src="images/pricing2.svg" alt="Pricing 2" className="pricing-icon mb-2" />
              <p className="mb-0">Second feature</p>
            </div>

            <div className="col-12 col-sm-4 d-flex flex-column align-items-center tags">
              <img src="images/pricing3.svg" alt="Pricing 3" className="pricing-icon mb-2" />
              <p className="mb-0">Third feature</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
