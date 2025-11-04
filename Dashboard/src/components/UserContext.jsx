import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const fetchProfile = async () => {
		try {
			const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3002";
			// Ensure cookies are sent with the request (cross-site cookies)
			const res = await axios.get(`${API_BASE}/profile`, { withCredentials: true });
			setUser(res.data.user);
		} catch (err) {
			console.error("Session expired or invalid:", err);
			setUser(null);
			// Redirect to the frontend login page (not the backend API)
			const FRONTEND_LOGIN = import.meta.env.VITE_FRONTEND_URL || import.meta.env.VITE_LOGIN_URL || "http://localhost:5173/login";
			window.location.href = FRONTEND_LOGIN;
		}
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
