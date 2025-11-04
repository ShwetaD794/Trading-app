import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const fetchProfile = async () => {
		try {
			const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3002";

			// If a oneTimeKey is present in the URL, exchange it first so the backend
			// can set the httpOnly cookie (works around third-party cookie blocking).
			const params = new URLSearchParams(window.location.search);
			const oneTimeKey = params.get('oneTimeKey');
			if (oneTimeKey) {
				try {
					await axios.post(`${API_BASE}/auth/exchange`, { key: oneTimeKey }, { withCredentials: true });
					// remove the key from the URL to avoid leaking it
					if (window.history && window.history.replaceState) {
						const cleanUrl = window.location.origin + window.location.pathname;
						window.history.replaceState({}, document.title, cleanUrl);
					}
				} catch (err) {
					console.error('Exchange failed:', err);
					// continue; profile fetching below will handle failure and redirect
				}
			}

			// Ensure cookies are sent with the request (cross-site cookies)
			const res = await axios.get(`${API_BASE}/profile`, { withCredentials: true });
			setUser(res.data.user);
		} catch (err) {
			console.error("Session expired or invalid:", err);
			setUser(null);
			// Redirect to the frontend login page (not the backend API)
			const FRONTEND_LOGIN = import.meta.env.VITE_FRONTEND_URL || import.meta.env.VITE_LOGIN_URL || "https://trading-app3.onrender.com/login";
			window.location.href = FRONTEND_LOGIN;
		}
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
