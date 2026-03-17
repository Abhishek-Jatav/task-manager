"use client";

import { useState } from "react";
import { useAuth } from "../../lib/context/AuthContext";
import { useRouter } from "next/navigation";
import AuthButton from "./AuthButton";
import toast from "react-hot-toast";
import PortfolioButton from "./PortfolioButton";

export default function Navbar() {
  const { admin, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (path: string) => {
    toast("Redirecting...");
    router.push(path);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    router.push("/");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0f0f11]/80 backdrop-blur border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* TOP BAR */}
        <div className="flex justify-between items-center md:hidden">
          {/* Section 1 (small screen left) */}
          <div
            onClick={() => goTo("/")}
            className="font-semibold text-lg cursor-pointer">
            Task Manager
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-xl">
            ☰
          </button>
        </div>

        {/* LARGE + MEDIUM SCREENS */}
        <div className="hidden md:flex md:flex-col lg:flex-row lg:justify-between items-center gap-4">
          {/* SECTION 1 */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div
              onClick={() => goTo("/")}
              className="font-semibold text-lg cursor-pointer hover:text-blue-400">
              Task Manager
            </div>

            <PortfolioButton />
          </div>

          {/* SECTION 2 */}
          <div className="flex flex-wrap justify-center items-center gap-3">
            <button
              onClick={() => goTo("/")}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm">
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
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700">
                  Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        {/* MOBILE DROPDOWN */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col items-center gap-3">
            <PortfolioButton />

            <button
              onClick={() => goTo("/")}
              className="px-4 py-2 rounded-lg bg-zinc-800 w-full text-center">
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
                  className="px-4 py-2 rounded-lg bg-blue-600 w-full">
                  Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-600 w-full">
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
