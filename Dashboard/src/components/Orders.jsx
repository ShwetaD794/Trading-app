import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./Orders.css"; // We'll define this below

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const { refreshKey } = useContext(GeneralContext);

  useEffect(() => {
    axios
      .get("http://localhost:3002/allOrders", { withCredentials: true })
      .then((res) => setOrders(res.data))
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
      });
  }, [refreshKey]);


  return (
    <div className="orders-wrapper">
      <h2 className="orders-title">Orders</h2>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Stock</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.name}</td>
                <td>{order.qty}</td>
                <td>₹{order.price}</td>
                <td>
                  <span className={`tag ${order.mode === "BUY" ? "buy" : "sell"}`}>
                    {order.mode}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
