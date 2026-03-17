import { BACKEND_URL } from "../../env";

export async function createTask(token: string, title: string) {
  const res = await fetch(`${BACKEND_URL.API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}
