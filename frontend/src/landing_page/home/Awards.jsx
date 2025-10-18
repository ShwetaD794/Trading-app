import React from 'react';
import "./Awards.css";

export default function Awards() {
  return (
    <div className="container my-5">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
          <img 
            src="images/largestBroker.svg" 
            alt="Largest Broker"
            className="img-fluid award-img"
          />
        </div>

        <div className="col-12 col-md-6">
          <h2 className="fw-bold mb-3 text-md-start text-center">
            Largest stock broker in India
          </h2>
          <p className="mb-4 text-md-start text-center">
            2+ million Zerodha clients contribute to over 15% of all volumes in India daily by trading and investing in:
          </p>

          <div className="row">
            <div className="col-6">
              <ul className="list-unstyled">
                <li><p>Futures and Options</p></li>
                <li><p>Commodity derivatives</p></li>
                <li><p>Currency derivatives</p></li>
              </ul>
            </div>
            <div className="col-6">
              <ul className="list-unstyled">
                <li><p>Stocks & IPOs</p></li>
                <li><p>Direct mutual funds</p></li>
                <li><p>Bonds and Govt. Securities</p></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
