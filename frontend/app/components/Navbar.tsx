"use client";

import { useAuth } from "../../lib/context/AuthContext";
import { useRouter } from "next/navigation";
import AuthButton from "./AuthButton";
import toast from "react-hot-toast";

export default function Navbar() {
  const { admin, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur-lg bg-white/70 dark:bg-black/50 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <div
          onClick={() => router.push("/")}
          className="text-xl font-semibold cursor-pointer text-black dark:text-white">
          MyApp
        </div>

        <div className="flex gap-3">
          {!admin ? (
            <>
              <AuthButton type="login" />
              <AuthButton type="register" />
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/dashboard")}
                className="rounded-full bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition">
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="rounded-full bg-red-500 px-5 py-2 text-white hover:bg-red-600 transition">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
