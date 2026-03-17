import { ENV } from "../../env";

export async function toggleTask(token: string, id: string) {
  const res = await fetch(`${ENV.API_URL}/tasks/${id}/toggle`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to toggle task");
  return res.json();
}
