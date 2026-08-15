import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('userInfo');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.post('/auth/login', { email, password });
      setUser(res.data);
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      setLoading(false);
      return { success: true, data: res.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Invalid credentials.';
      setError(message);
      setLoading(false);
      return { success: false, error: message };
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.post('/auth/register', userData);
      setUser(res.data);
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      setLoading(false);
      return { success: true, data: res.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed.';
      setError(message);
      setLoading(false);
      return { success: false, error: message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
