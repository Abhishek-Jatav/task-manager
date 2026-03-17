"use client";

import { useAuth } from "../../lib/context/AuthContext";
import { useRouter } from "next/navigation";
import AuthButton from "./AuthButton";
import toast from "react-hot-toast";

export default function Navbar() {
  const { admin, logout } = useAuth();
  const router = useRouter();

  const goTo = (path: string) => {
    toast("Redirecting...");
    router.push(path);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    router.push("/");
  };

  const openPortfolio = () => {
    toast.success("Opening Portfolio 🚀");
    window.open("https://nexabuild-abhishek-jatav.netlify.app/", "_blank");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0f0f11]/80 backdrop-blur border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
        {/* SECTION 1 (Logo + Portfolio) */}
        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 w-full md:w-auto">
          <div
            onClick={() => goTo("/")}
            className="font-semibold text-lg cursor-pointer hover:text-blue-400 transition">
            Task Manager
          </div>

          <button
            onClick={openPortfolio}
            className="px-4 py-1.5 rounded-md text-xs sm:text-sm font-semibold
            bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white
            shadow-md shadow-pink-500/30 hover:scale-105 hover:shadow-pink-500/50
            active:scale-95 transition-all duration-300">
            🚀 Portfolio
          </button>
        </div>

        {/* SECTION 2 (Buttons) */}
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => goTo("/")}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm transition">
            Home
          </button>

          {!admin ? (
            <>
              <AuthButton type="login" />
              <AuthButton type="register" />
            </>
          ) : (
            <>
              <button
                onClick={() => goTo("/dashboard")}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition">
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
