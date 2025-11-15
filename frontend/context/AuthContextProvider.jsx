import React, { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios'

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, { withCredentials: true });
      setUser(res.data.user);
    } catch (err) {
        console.log("error in check auth", err.response.data.message)
      setUser(null);
    }
    setLoading(false);
  };

  // LOGIN
  const login = async (email, password) => {
    try {
      const res = await axios.post(
       `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log("response login", res.data.user)
      setUser(res.data.user);
      return { success: true };
    } catch (error) {
        console.log("error in login",  error.response.data)
      return {
        success: false,
        message: error.response?.data?.message || error.response?.data?.errors[0]?.msg || "Login Failed",
      };
    }
  };

  // REGISTER
  const register = async (name, email, password) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        { name, email, password },
        { withCredentials: true }
      );

      console.log("register response", res)
      setUser(res.data.user);
      return { success: true };
    } catch (error) {
        console.log("error in register",  error)
      return {
        success: false,
        message: error.response?.data?.message || error.response?.data?.errors[0]?.msg || "Login Failed",
      };
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
        return {
            success: false,
            message: error.response.data.message
        }
      console.log("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
