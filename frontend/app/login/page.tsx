"use client";

import { useState } from "react";
import api from "../../lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const { accessToken } = res.data;

      localStorage.setItem("token", accessToken);

      toast.success("Login successful");

      router.push("/dashboard");
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-96 space-y-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white p-2">
          Login
        </button>
      </div>
    </div>
  );
}
