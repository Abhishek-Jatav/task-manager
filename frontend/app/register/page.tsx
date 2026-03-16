"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill in both fields");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("accessToken", res.data.accessToken);
      toast.success("Login successful");
      router.push("/dashboard");
    } catch (err: any) {
      if (err.response) toast.error(err.response.data.message);
      else toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-96 space-y-4 border p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-black text-white p-2 rounded">
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
