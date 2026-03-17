import { ENV } from "../../env";

export async function deleteTask(token: string, id: string) {
  const res = await fetch(`${ENV.API_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to delete task");
  return res.json();
}
