"use client";

import { useAuth } from "../../lib/context/AuthContext";

export default function UserInfo() {
  const { admin } = useAuth();

  if (!admin) return null;

  return (
    <div className="mb-6 p-4 rounded-lg bg-[#18181b] border border-zinc-800">
      <p className="text-sm text-zinc-400">Logged in as</p>
      <h2 className="font-semibold">{admin.email}</h2>
    </div>
  );
}
