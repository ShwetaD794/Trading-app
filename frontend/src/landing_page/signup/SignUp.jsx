import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending signup request...");
      
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3002";

  const response = await axios.post(`${API_BASE}/signup`, form, { withCredentials: true });
      console.log("Signup successful:", response.data);
      navigate('/login')

    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      alert(err.response?.data || 'Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <div className="row text-center">
        <h1>Open a free demat and trading account online</h1>
        <p>
          Start investing brokerage free and join a community of 1.6+ crore investors and traders
        </p>

        <div className="col-6 mt-5 signup">
          <img src="images/account_open.svg" alt="Account Open" />
        </div>

        <div className="col-6 mt-5 signup">
          <h3>Signup now</h3>
          <form onSubmit={handleSubmit} className='signup-form'>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
          <p>Or track your existing application</p>
        </div>
      </div>
    </div>
  );
}
