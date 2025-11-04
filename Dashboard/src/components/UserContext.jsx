import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const fetchProfile = async () => {
		try {
			const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3002";
			const res = await axios.get(`${API_BASE}/profile`);
			setUser(res.data.user);
		} catch (err) {
			console.error("Session expired or invalid:", err);
			setUser(null);
			window.location.href = `${API_BASE}/login`;
		}
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
