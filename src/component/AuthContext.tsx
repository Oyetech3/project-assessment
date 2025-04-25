"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  token: string | null;
  login: (token: string, expiresInSeconds: number) => void;
  logout: () => void;
  isAuthenticated: boolean;
  remainingTime: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(0);
  const router = useRouter();

  const login = (newToken: string, expiresInSeconds: number) => {
    const expiry = Date.now() + expiresInSeconds * 1000;
    setToken(newToken);
    setExpiresAt(expiry);
    localStorage.setItem("token", newToken);
    localStorage.setItem("expiresAt", expiry.toString());
  };

  const logout = () => {
    setToken(null);
    setExpiresAt(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    router.push("/auth/login");
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedExpiry = localStorage.getItem("expiresAt");

    if (savedToken && savedExpiry) {
      const expiry = parseInt(savedExpiry);
      if (expiry > Date.now()) {
        setToken(savedToken);
        setExpiresAt(expiry);
      } else {
        logout();
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (expiresAt) {
        const timeLeft = Math.floor((expiresAt - Date.now()) / 1000);
        setRemainingTime(timeLeft);
        if (timeLeft <= 0) {
          logout();
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  // Auto-refresh token
  useEffect(() => {
    if (!expiresAt || !token) return;

    const refreshBuffer = 30 * 1000;
    const now = Date.now();
    const delay = expiresAt - now - refreshBuffer;

    const timeout = setTimeout(() => {
      fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "eve.holt@reqres.in", password: "cityslicka" }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.token) {
            login(data.token, 600);
          } else {
            logout();
          }
        })
        .catch(() => logout());
    }, delay);

    return () => clearTimeout(timeout);
  }, [expiresAt, token]);

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token, remainingTime }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};