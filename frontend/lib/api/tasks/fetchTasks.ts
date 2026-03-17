import { ENV } from "../../env";
import { Task } from "./types";

export async function fetchTasks(
  token: string,
  page = 1,
  limit = 5,
  search = "",
) {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (search) queryParams.append("search", search);

  const res = await fetch(`${ENV.API_URL}/tasks?${queryParams.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch tasks");

  const data: Task[] = await res.json();

  // Get total tasks for pagination
  const countRes = await fetch(`${ENV.API_URL}/tasks?search=${search}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  let totalTasks = 0;
  if (countRes.ok) {
    const allTasks = await countRes.json();
    totalTasks = allTasks.length;
  }

  return { tasks: data, totalTasks };
}
