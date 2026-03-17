import { Task } from "../../../lib/api/tasks/types";

type Props = {
  task: Task;
  editTaskId: string | null;
  editTaskTitle: string;
  setEditTaskId: (id: string | null) => void;
  setEditTaskTitle: (title: string) => void;
  handleToggle: (id: string) => void;
  handleUpdate: (id: string) => void;
  handleDelete: (id: string) => void;
};

export default function TaskItem({
  task,
  editTaskId,
  editTaskTitle,
  setEditTaskId,
  setEditTaskTitle,
  handleToggle,
  handleUpdate,
  handleDelete,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white/60 dark:bg-zinc-900/60 backdrop-blur hover:shadow-md transition">
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={task.status}
          onChange={() => handleToggle(task.id)}
          className="w-5 h-5 cursor-pointer"
        />

        {editTaskId === task.id ? (
          <input
            type="text"
            value={editTaskTitle}
            onChange={(e) => setEditTaskTitle(e.target.value)}
            className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
          />
        ) : (
          <span
            onDoubleClick={() => {
              setEditTaskId(task.id);
              setEditTaskTitle(task.title);
            }}
            className={`cursor-pointer transition-all duration-200 ${
              task.status
                ? "line-through text-green-500"
                : "text-black dark:text-white"
            }`}>
            {task.title}
          </span>
        )}
      </div>

      <div className="flex gap-2 justify-end">
        {editTaskId === task.id ? (
          <>
            <button
              onClick={() => handleUpdate(task.id)}
              className="px-3 py-1 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">
              Save
            </button>

            <button
              onClick={() => setEditTaskId(null)}
              className="px-3 py-1 rounded-lg bg-zinc-500 text-white text-sm hover:bg-zinc-600">
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => handleDelete(task.id)}
            className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600">
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
