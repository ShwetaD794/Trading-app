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
    const DASHBOARD_URL = import.meta.env.VITE_DASHBOARD_URL || "http://localhost:5174"; // define it here

    const res = await axios.post(`${API_BASE}/login`, {
      email,
      password,
    }, { withCredentials: true });

    console.log("Login response:", res.data);

    if (res.data && res.data.user) {
      try {
        // Verify session
        const profileRes = await axios.get(`${API_BASE}/profile`, { withCredentials: true });
        if (profileRes.data.user) {
          console.log("Profile verified, redirecting...");
          window.location.href = DASHBOARD_URL;
        } else {
          alert("Login succeeded but could not verify session.");
        }
      } catch (err) {
        console.error("Profile verification error:", err.response?.data || err.message);
        alert("Login failed: session not set properly.");
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
