import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";


const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [summary, setSummary] = useState({ totalExposure: 0, unrealized: 0, marginUsed: 0, totalQty: 0 });

  const { refreshKey } = useContext(GeneralContext);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3002";
        const res = await axios.get(`${API_BASE}/computedPositions`, { withCredentials: true });
        setPositions(res.data.positions || []);
        setSummary(res.data.summary || {});
      } catch (err) {
        console.error("Failed to fetch positions:", err);
      }
    };

    fetchPositions();
  }, [refreshKey]);

  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="positions-summary">
        <div>
          <h4>Total Exposure</h4>
          <p>₹{summary.totalExposure?.toFixed(2) || 0}</p>
        </div>
        <div>
          <h4>Unrealized P/L</h4>
          <p className={summary.unrealized >= 0 ? "profit" : "loss"}>₹{summary.unrealized?.toFixed(2) || 0}</p>
        </div>
        <div>
          <h4>Margin Used</h4>
          <p>₹{summary.marginUsed?.toFixed(2) || 0}</p>
        </div>
        <div>
          <h4>Total Quantity</h4>
          <p>{summary.totalQty || 0}</p>
        </div>
      </div>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg?.toFixed(2)}</td>
                  <td>{stock.price?.toFixed(2)}</td>
                  <td className={profClass}>{(curValue - stock.avg * stock.qty).toFixed(2)}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;