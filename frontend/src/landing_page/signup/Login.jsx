import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login clicked");

    try {
      const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3002";
      const res = await axios.post(`${API_BASE}/login`, {
        email,
        password,
      }, { withCredentials: true,
       });

      console.log("Login response:", res.data);

      if (res.data && res.data.user) {
        console.log("Login successful, redirecting...");
        const DASHBOARD_URL = import.meta.env.VITE_DASHBOARD_URL || "https://trading-appd.onrender.com";
        // If server returned a oneTimeKey, redirect with it so the dashboard
        // can call /auth/exchange to have the backend set the httpOnly cookie.
        if (res.data.oneTimeKey) {
          const url = new URL(DASHBOARD_URL);
          url.searchParams.set('oneTimeKey', res.data.oneTimeKey);
          window.location.href = url.toString();
        } else {
          window.location.href = DASHBOARD_URL;
        }
      } else {
        alert("Login failed: No user received from server");
      }

    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert("Login failed: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
