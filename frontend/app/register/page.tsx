"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ENV } from "../../lib/env";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${ENV.API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.message === "User already exists") {
          toast("User already exists. Redirecting...", { icon: "ℹ️" });
          setTimeout(() => router.push("/login"), 2000);
          return;
        }
        throw new Error(data.message || "Registration failed");
      }

      toast.success("Account created 🎉");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => router.push("/login"), 1500);
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-black dark:to-zinc-900">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 shadow-xl p-8">
          <h2 className="text-3xl font-semibold text-center text-black dark:text-white mb-2">
            Create Account
          </h2>
          <p className="text-center text-zinc-500 mb-6">
            Start your journey with us 🚀
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
              className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm text-zinc-600 dark:text-zinc-400">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
              placeholder="••••••••"
            />
          </div>

          <div className="mb-6">
            <label className="text-sm text-zinc-600 dark:text-zinc-400">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 py-2.5 text-white font-medium hover:opacity-90 transition disabled:opacity-50">
            {loading ? "Creating account..." : "Register"}
          </button>

          <p className="text-center text-sm text-zinc-500 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-green-600 cursor-pointer hover:underline">
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
