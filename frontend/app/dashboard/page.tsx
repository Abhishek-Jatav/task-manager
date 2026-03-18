"use client";

import { useAuth } from "../../lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Task } from "../../lib/api/tasks/types";
import { fetchTasks } from "../../lib/api/tasks/fetchTasks";
import { createTask } from "../../lib/api/tasks/createTask";
import { deleteTask } from "../../lib/api/tasks/deleteTask";
import { toggleTask } from "../../lib/api/tasks/toggleTask";
import { updateTask } from "../../lib/api/tasks/updateTask";

import TaskInput from "../components/tasks/TaskInput";
import TaskList from "../components/tasks/TaskList";
import Pagination from "../components/tasks/Pagination";
import Loader from "../components/tasks/Loader"; // ✅ added

export default function Dashboard() {
  const { admin, token } = useAuth();
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;
  const [loading, setLoading] = useState(false);
  const [totalTasks, setTotalTasks] = useState(0);

  useEffect(() => {
    if (!admin) {
      toast.error("Please login first");
      router.push("/login");
    }
  }, [admin, router]);

  const loadTasks = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const { tasks, totalTasks } = await fetchTasks(
        token,
        page,
        limit,
        search,
      );
      setTasks(tasks);
      setTotalTasks(totalTasks);
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [token, page, search]);

  const handleCreate = async () => {
    if (!newTask.trim() || !token) {
      toast.error("Task cannot be empty");
      return;
    }

    const id = toast.loading("Creating task...");

    try {
      await createTask(token, newTask);
      toast.success("Task created 🎉", { id });
      setNewTask("");
      loadTasks();
    } catch (err: any) {
      toast.error(err.message || "Failed to create task", { id });
    }
  };

  const maxPage = Math.ceil(totalTasks / limit);

  if (!admin) return null;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold">Dashboard</h2>
        </div>

        {/* CARD */}
        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-5 sm:p-6 shadow-md">
          <TaskInput
            value={newTask}
            onChange={setNewTask}
            onAdd={handleCreate}
            loading={loading}
          />

          {/* SEARCH */}
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
              toast("Searching...");
            }}
            placeholder="Search tasks..."
            className="w-full mb-5 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* ✅ LOADER OR TASK LIST */}
          {loading ? (
            <Loader />
          ) : (
            <TaskList
              tasks={tasks}
              editTaskId={editTaskId}
              editTaskTitle={editTaskTitle}
              setEditTaskId={(id) => {
                setEditTaskId(id);
                if (id) toast("Editing mode ✏️");
              }}
              setEditTaskTitle={setEditTaskTitle}
              handleToggle={async (id) => {
                setTasks((prev) =>
                  prev.map((t) =>
                    t.id === id ? { ...t, status: !t.status } : t,
                  ),
                );

                try {
                  await toggleTask(token!, id);
                  toast.success("Task updated");
                } catch {
                  toast.error("Toggle failed");
                }
              }}
              handleUpdate={async (id) => {
                if (!editTaskTitle.trim()) {
                  toast.error("Title cannot be empty");
                  return;
                }

                const t = toast.loading("Updating...");

                try {
                  await updateTask(token!, id, editTaskTitle);
                  toast.success("Task updated", { id: t });
                  setEditTaskId(null);
                  setEditTaskTitle("");
                  loadTasks();
                } catch {
                  toast.error("Update failed", { id: t });
                }
              }}
              handleDelete={async (id) => {
                const t = toast.loading("Deleting...");

                try {
                  await deleteTask(token!, id);
                  toast.success("Task deleted", { id: t });
                  loadTasks();
                } catch {
                  toast.error("Delete failed", { id: t });
                }
              }}
            />
          )}

          {/* PAGINATION */}
          {!loading && (
            <Pagination
              page={page}
              maxPage={maxPage}
              onPrev={() => setPage((p) => Math.max(1, p - 1))}
              onNext={() => setPage((p) => Math.min(maxPage, p + 1))}
            />
          )}
        </div>
      </div>
    </div>
  );
}
