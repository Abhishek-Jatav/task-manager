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
  const isEditing = editTaskId === task.id;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition">
      {/* LEFT */}
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={task.status}
          onChange={() => handleToggle(task.id)}
          className="w-5 h-5"
        />

        {isEditing ? (
          <input
            autoFocus
            value={editTaskTitle}
            onChange={(e) => setEditTaskTitle(e.target.value)}
            className="flex-1 px-3 py-1 rounded bg-black border border-zinc-700"
          />
        ) : (
          <span
            onDoubleClick={() => {
              setEditTaskId(task.id);
              setEditTaskTitle(task.title);
            }}
            className={`flex-1 cursor-pointer ${
              task.status ? "line-through text-green-500" : ""
            }`}>
            {task.title}
          </span>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex gap-2 justify-end">
        {isEditing ? (
          <>
            <button
              onClick={() => handleUpdate(task.id)}
              className="px-3 py-1 bg-blue-600 rounded text-sm hover:bg-blue-700">
              Save
            </button>

            <button
              onClick={() => setEditTaskId(null)}
              className="px-3 py-1 bg-zinc-600 rounded text-sm hover:bg-zinc-700">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setEditTaskId(task.id);
                setEditTaskTitle(task.title);
              }}
              className="px-3 py-1 bg-yellow-600 rounded text-sm hover:bg-yellow-700">
              Edit
            </button>

            <button
              onClick={() => handleDelete(task.id)}
              className="px-3 py-1 bg-red-600 rounded text-sm hover:bg-red-700">
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
