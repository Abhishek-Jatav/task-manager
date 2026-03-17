"use client";

import { useAuth } from "../../lib/context/AuthContext";

export default function UserInfo() {
  const { admin } = useAuth();

  if (!admin) return null;

  return (
    <div className="w-full mb-6 p-5 rounded-xl bg-white/60 dark:bg-zinc-900/60 backdrop-blur-lg border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <p className="text-sm text-zinc-500">Logged in as</p>
      <h2 className="text-lg font-semibold text-black dark:text-white">
        {admin.email}
      </h2>
    </div>
  );
}
