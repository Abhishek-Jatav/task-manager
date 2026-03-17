"use client";

import { useState } from "react";
import { useAuth } from "../../lib/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { login, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const goToRegister = () => {
    toast("Redirecting to register...");
    router.push("/register");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Logging in...");

    try {
      await login(email, password);
      toast.success("Welcome back 👋", { id: toastId });
      router.push("/");
    } catch (err: any) {
      toast.error(err.message || "Login failed", { id: toastId });
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 sm:p-8 rounded-xl bg-[#18181b] border border-zinc-800 shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-6 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
          disabled={loading}
          className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition">
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-zinc-400 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={goToRegister}
            className="text-blue-500 cursor-pointer hover:underline">
            Register
          </span>
        </p>
      </form>
    </div>
  );
}
