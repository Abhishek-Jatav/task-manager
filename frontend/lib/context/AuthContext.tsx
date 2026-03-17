"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { ENV } from "../env";

type Admin = {
  _id: string;
  email: string;
};

type AuthContextType = {
  admin: Admin | null;
  loading: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const logoutTimer = useRef<NodeJS.Timeout | null>(null);

  // Logout function
  const logout = () => {
    setAdmin(null);
    setToken(null);
    setRefresh(null);

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("admin");
    localStorage.removeItem("expiry");

    if (logoutTimer.current) clearTimeout(logoutTimer.current);
  };

  // Auto logout based on expiry timestamp
  const scheduleAutoLogout = (expiryTime: number) => {
    const remainingTime = expiryTime - Date.now();
    if (remainingTime <= 0) {
      logout();
    } else {
      logoutTimer.current = setTimeout(logout, remainingTime);
    }
  };

  // Restore session on reload
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRefresh = localStorage.getItem("refreshToken");
    const storedAdmin = localStorage.getItem("admin");
    const storedExpiry = localStorage.getItem("expiry");

    if (storedToken && storedRefresh && storedAdmin && storedExpiry) {
      const expiryTime = parseInt(storedExpiry, 10);

      if (Date.now() < expiryTime) {
        setToken(storedToken);
        setRefresh(storedRefresh);
        setAdmin(JSON.parse(storedAdmin));
        scheduleAutoLogout(expiryTime);
      } else {
        logout();
      }
    }
  }, []);

  // Login
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${ENV.API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Login failed");
      }

      const data = await res.json();

      const adminData: Admin = { _id: data.userId, email };

      setAdmin(adminData);
      setToken(data.accessToken);
      setRefresh(data.refreshToken);

      const expiryTime = Date.now() + 24 * 60 * 60 * 1000; // 1 day

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("admin", JSON.stringify(adminData));
      localStorage.setItem("expiry", expiryTime.toString());

      scheduleAutoLogout(expiryTime);
    } catch (err: any) {
      throw new Error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Refresh token
  const refreshToken = async () => {
    if (!refresh) return logout();

    try {
      const res = await fetch(`${ENV.API_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: refresh }),
      });

      if (!res.ok) {
        logout();
        return;
      }

      const data = await res.json();

      setToken(data.accessToken);

      const expiryTime = Date.now() + 24 * 60 * 60 * 1000; // 1 day

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("expiry", expiryTime.toString());

      scheduleAutoLogout(expiryTime);
    } catch {
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{ admin, loading, token, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
