import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./OpenAcc.css"; 

export default function OpenAcc() {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="container my-5 openacc-container">
      <div className="row justify-content-center text-center">
        <div className="col-12 col-md-8">
          <h2 className="fw-bold mb-3">Open a Zerodha account</h2>
          <p className="text-muted mb-4">
            Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.
          </p>
          <button
            className="home-btn btn btn-primary fs-5 px-4 py-2 w-auto w-sm-50 w-md-25"
            onClick={handleSignupClick}
          >
            Signup Now
          </button>
        </div>
      </div>
    </div>
  );
}
