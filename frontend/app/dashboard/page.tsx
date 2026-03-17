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

export default function Dashboard() {
  const { admin, token, logout } = useAuth();
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
    if (!admin) router.push("/login");
  }, [admin, router]);

  const loadTasks = async () => {
    if (!token) return;

    setLoading(true);
    try {
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

    try {
      setLoading(true);
      await createTask(token, newTask);
      toast.success("Task created 🎉");
      setNewTask("");
      loadTasks();
    } catch (err: any) {
      toast.error(err.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  const maxPage = Math.ceil(totalTasks / limit);

  if (!admin) return null;

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-black dark:to-zinc-900">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-black dark:text-white">
            Dashboard
          </h2>

          <button
            onClick={() => {
              logout();
              toast.success("Logged out");
              router.push("/");
            }}
            className="px-5 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition">
            Logout
          </button>
        </div>

        <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-5 sm:p-8">
          <TaskInput
            value={newTask}
            onChange={setNewTask}
            onAdd={handleCreate}
            loading={loading}
          />

          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search tasks..."
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 mb-6 focus:ring-2 focus:ring-blue-500 outline-none dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
          />

          {loading && (
            <p className="text-center text-zinc-500 mb-4">Loading tasks...</p>
          )}

          {/* FIXED: No JSX comment inside props */}
          <TaskList
            tasks={tasks}
            editTaskId={editTaskId}
            editTaskTitle={editTaskTitle}
            setEditTaskId={setEditTaskId}
            setEditTaskTitle={setEditTaskTitle}
            handleToggle={async (id) => {
              setTasks((prev) =>
                prev.map((task) =>
                  task.id === id ? { ...task, status: !task.status } : task,
                ),
              );

              try {
                await toggleTask(token!, id);
              } catch {
                toast.error("Failed to update task");

                setTasks((prev) =>
                  prev.map((task) =>
                    task.id === id ? { ...task, status: !task.status } : task,
                  ),
                );
              }
            }}
            handleUpdate={async (id) => {
              try {
                await updateTask(token!, id, editTaskTitle);
                toast.success("Task updated");
                setEditTaskId(null);
                setEditTaskTitle("");
                loadTasks();
              } catch {
                toast.error("Update failed");
              }
            }}
            handleDelete={async (id) => {
              try {
                await deleteTask(token!, id);
                toast.success("Task deleted");
                loadTasks();
              } catch {
                toast.error("Delete failed");
              }
            }}
          />

          <Pagination
            page={page}
            maxPage={maxPage}
            onPrev={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() => setPage((p) => Math.min(maxPage, p + 1))}
          />
        </div>
      </div>
    </div>
  );
}
