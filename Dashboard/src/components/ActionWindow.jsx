import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./ActionWindow.css";

const BuyActionWindow = ({ uid, mode = "BUY" }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const { closeBuyWindow } = useContext(GeneralContext);
  const { triggerRefresh } = useContext(GeneralContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBuyClick = async () => {
  console.log("Sending order request...");

  try {
    setIsSubmitting(true);
    await axios.post(
      "http://localhost:3002/newOrder",
      {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode,
      },
      { withCredentials: true }
    );
  
  const successMsg = mode === "SELL" ? "Order sold successfully!" : "Order placed successfully!";
  alert(successMsg);
    if (typeof closeBuyWindow === "function") closeBuyWindow();
  if (typeof triggerRefresh === "function") triggerRefresh();
  setIsSubmitting(false);
  } catch (error) {
    console.error("Failed to place order:", error);
    alert("Failed to place order. Please try again.");
    setIsSubmitting(false);
  }
};


  const handleCancelClick = () => {
    if (typeof closeBuyWindow === "function") closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button
            type="button"
            className="btn btn-blue"
            onClick={handleBuyClick}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Placing..." : mode === "BUY" ? "Buy" : "Sell"}
          </button>
          <button type="button" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;