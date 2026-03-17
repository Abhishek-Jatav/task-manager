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
      toast("Already logged in");
      router.push("/dashboard");
    } else {
      toast("Redirecting...");
      router.push(type === "login" ? "/login" : "/register");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition text-sm">
      {type === "login" ? "Login" : "Register"}
    </button>
  );
}
