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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, password);
      toast.success("Welcome back 👋");
      router.push("/");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-black dark:to-zinc-900">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 shadow-xl p-8">
          <h2 className="text-3xl font-semibold text-center text-black dark:text-white mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-zinc-500 mb-6">
            Login to continue your journey
          </p>

          <div className="mb-4">
            <label className="text-sm text-zinc-600 dark:text-zinc-400">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-6">
            <label className="text-sm text-zinc-600 dark:text-zinc-400">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 py-2.5 text-white font-medium hover:opacity-90 transition disabled:opacity-50">
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-zinc-500 mt-6">
            Don’t have an account?{" "}
            <span
              onClick={() => router.push("/register")}
              className="text-blue-600 cursor-pointer hover:underline">
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
