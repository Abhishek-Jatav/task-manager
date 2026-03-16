"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const limit = 5;

  const fetchTasks = async () => {
    const res = await api.get(
      `/tasks?page=${page}&limit=${limit}&search=${search}&status=${status}`,
    );

    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, [page, search, status]);

  const createTask = async () => {
    if (!title) return;

    await api.post("/tasks", { title });

    toast.success("Task created");

    setTitle("");

    fetchTasks();
  };

  const toggleTask = async (id: string) => {
    await api.patch(`/tasks/${id}/toggle`);

    fetchTasks();
  };

  const deleteTask = async (id: string) => {
    await api.delete(`/tasks/${id}`);

    toast.success("Task deleted");

    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");

    router.push("/login");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Task Manager</h1>

        <button onClick={logout} className="text-red-500">
          Logout
        </button>
      </div>

      <div className="flex gap-2">
        <input
          className="border p-2 flex-1"
          placeholder="New task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={createTask} className="bg-black text-white px-4">
          Add
        </button>
      </div>

      {/* Search */}

      <input
        className="border p-2 w-full"
        placeholder="Search task..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filter */}

      <select
        className="border p-2 w-full"
        onChange={(e) => setStatus(e.target.value)}>
        <option value="">All</option>
        <option value="true">Completed</option>
        <option value="false">Pending</option>
      </select>

      {/* Task List */}

      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task.id} className="flex justify-between border p-2">
            <span
              onClick={() => toggleTask(task.id)}
              className={`cursor-pointer ${
                task.status ? "line-through text-gray-400" : ""
              }`}>
              {task.title}
            </span>

            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500">
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}

      <div className="flex justify-center gap-4">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>

        <span>Page {page}</span>

        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
