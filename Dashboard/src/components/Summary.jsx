import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import GeneralContext from "./GeneralContext";


const Summary = () => {
  const { user } = useContext(UserContext);
  const { refreshKey } = useContext(GeneralContext);
  const [holdingsSummary, setHoldingsSummary] = useState({ count: 0, currentValue: 0, investment: 0, pnl: 0 });
  const [positionsSummary, setPositionsSummary] = useState({ marginUsed: 0 });

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3002";
        const res = await axios.get(`${API_BASE}/computedHoldings`, { withCredentials: true });
        const holdings = res.data || [];
        let currentValue = 0;
        let investment = 0;
        holdings.forEach((h) => {
          currentValue += (h.qty || 0) * (h.price || 0);
          investment += (h.qty || 0) * (h.avg || 0);
        });
        const pnl = currentValue - investment;
        setHoldingsSummary({ count: holdings.length, currentValue, investment, pnl });

        
        const pres = await axios.get(`${API_BASE}/computedPositions`, { withCredentials: true });
        setPositionsSummary({ marginUsed: pres.data.summary?.marginUsed || 0 });
      } catch (err) {
        console.error("Failed to fetch summaries:", err);
      }
    };

    fetchSummaries();
  }, [refreshKey]);

  return (
    <>
      <div className="username">
        <h6>Hi, {user?.name || "User"}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>₹{(holdingsSummary.currentValue - holdingsSummary.investment).toFixed(2)}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>₹{positionsSummary.marginUsed?.toFixed(2) || 0}</span>
            </p>
            <p>
              Opening balance <span>₹{holdingsSummary.investment?.toFixed(2) || 0}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdingsSummary.count})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={holdingsSummary.pnl >= 0 ? "profit" : "loss"}>
              ₹{holdingsSummary.pnl?.toFixed(2) || 0} <small>{holdingsSummary.investment ? (((holdingsSummary.pnl / holdingsSummary.investment) * 100) || 0).toFixed(2) + "%" : "0%"}</small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>₹{holdingsSummary.currentValue?.toFixed(2) || 0}</span>
            </p>
            <p>
              Investment <span>₹{holdingsSummary.investment?.toFixed(2) || 0}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;