"use client";

import Image from "next/image";
import UserInfo from "../app/components/UserInfo";
import { useAuth } from "../lib/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Home() {
  const { admin } = useAuth();
  const router = useRouter();

  const goTo = (path: string) => {
    toast.loading("Redirecting...");
    setTimeout(() => {
      toast.dismiss();
      router.push(path);
    }, 600);
  };

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <div className="w-full max-w-2xl">
        {admin && <UserInfo />}

        <Image
          className="mx-auto mb-8 opacity-80"
          src="/next.svg"
          alt="logo"
          width={100}
          height={30}
          priority
        />

        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Task Manager 🚀</h1>

        <p className="text-zinc-400 mb-8 text-sm sm:text-base">
          {admin
            ? "Manage your tasks efficiently with full control."
            : "Organize your life. Track your tasks. Stay productive."}
        </p>

        {!admin && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => goTo("/login")}
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition">
              Get Started
            </button>

            <button
              onClick={() => goTo("/register")}
              className="px-6 py-3 rounded-lg border border-zinc-700 hover:bg-zinc-800 transition">
              Create Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
