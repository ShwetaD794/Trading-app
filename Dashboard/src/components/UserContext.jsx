// src/UserContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const fetchProfile = async () => {
		// axios.defaults.withCredentials = true is set in main.jsx, so cookie will be sent
		try {
			const res = await axios.get("http://localhost:3002/profile");
			setUser(res.data.user);
		} catch (err) {
			console.error("Session expired or invalid:", err);
			setUser(null);
			// redirect to login app
			window.location.href = "http://localhost:5173/login";
		}
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
