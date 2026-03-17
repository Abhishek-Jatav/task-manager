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

  const goToLogin = () => {
    toast("Redirecting to login...");
    router.push("/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const toastId = toast.loading("Creating account...");
    setLoading(true);

    try {
      const res = await fetch(`${ENV.API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Account created 🎉", { id: toastId });
      router.push("/login");
    } catch (err: any) {
      toast.error(err.message || "Registration failed", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 sm:p-8 rounded-xl bg-[#18181b] border border-zinc-800 shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full mb-6 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700"
        />

        <button
          disabled={loading}
          className="w-full py-2 rounded-lg bg-green-600 hover:bg-green-700 transition">
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="text-center text-sm text-zinc-400 mt-6">
          Already have an account?{" "}
          <span
            onClick={goToLogin}
            className="text-green-500 cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
