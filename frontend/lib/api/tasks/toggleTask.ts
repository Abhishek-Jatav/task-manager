import { BACKEND_URL } from "../../env";

export async function toggleTask(token: string, id: string) {
  const res = await fetch(`${BACKEND_URL.API_URL}/tasks/${id}/toggle`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to toggle task");
  return res.json();
}
