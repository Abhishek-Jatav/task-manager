"use client";

import Image from "next/image";
import UserInfo from "../app/components/UserInfo";
import { useAuth } from "../lib/context/AuthContext";

export default function Home() {
  const { admin } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="max-w-2xl w-full">
        {admin && <UserInfo />}

        <Image
          className="mx-auto mb-8 dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={120}
          height={30}
          priority
        />

        <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white mb-4">
          Build Something Amazing 🚀
        </h1>

        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          {admin
            ? "You're logged in. Explore your dashboard and manage everything seamlessly."
            : "Start your journey by logging in or creating an account."}
        </p>

        {!admin && (
          <div className="flex justify-center gap-4">
            <a
              href="/login"
              className="px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition">
              Get Started
            </a>

            <a
              href="/register"
              className="px-6 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
              Create Account
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
