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
      const res = await axios.post("http://localhost:3002/login", {
        email,
        password,
      }, { withCredentials: true });

      console.log("Login response:", res.data);

      // Backend sets the JWT as an httpOnly cookie and returns user info in the response.
      if (res.data && res.data.user) {
        console.log("Login successful, redirecting...");
        window.location.href = "http://localhost:5174";
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
