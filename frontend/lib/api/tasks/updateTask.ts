import { ENV } from "../../env";

export async function updateTask(token: string, id: string, title: string) {
  const res = await fetch(`${ENV.API_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}
