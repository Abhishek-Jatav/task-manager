"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/context/AuthContext";
import toast from "react-hot-toast";

interface AuthButtonProps {
  type: "login" | "register";
}

export default function AuthButton({ type }: AuthButtonProps) {
  const router = useRouter();
  const { admin } = useAuth();

  const handleClick = () => {
    if (admin) {
      toast("Already logged in", { icon: "ℹ️" });
      router.push("/dashboard");
    } else {
      router.push(type === "login" ? "/login" : "/register");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-full px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 transition shadow-md">
      {type === "login" ? "Login" : "Register"}
    </button>
  );
}
