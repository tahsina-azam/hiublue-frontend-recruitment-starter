'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: { id: number; name: string; email: string } | null;
  token: string | null;
  login: (token: string, user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load token & user from localStorage on app load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const expiry = localStorage.getItem('tokenExpiry');

    if (storedToken && storedUser && expiry) {
      const now = new Date().getTime();
      if (now < parseInt(expiry)) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } else {
        logout(); // Token expired
      }
    }
  }, []);

  // Login function: Store token in localStorage with expiry
  // const login = (token: string, user: any) => {
  //   const expiryTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour expiry
  //   localStorage.setItem('token', token);
  //   localStorage.setItem('user', JSON.stringify(user));
  //   localStorage.setItem('tokenExpiry', expiryTime.toString());
  //   setToken(token);
  //   setUser(user);
  // };

  const login = (_token: string, user: any) => { 
    const token = "fake-jwt-token"; // Always store this token
    const expiryTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour expiry
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("tokenExpiry", expiryTime.toString());
    setToken(token);
    setUser(user);
  };
  
  // Logout function: Clear everything
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tokenExpiry');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
