import toast from "react-hot-toast";

type Props = {
  value: string;
  onChange: (val: string) => void;
  onAdd: () => void;
  loading: boolean;
};

export default function TaskInput({ value, onChange, onAdd, loading }: Props) {
  const handleAdd = () => {
    if (!value.trim()) {
      toast.error("Task cannot be empty");
      return;
    }
    onAdd();
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 rounded-xl border border-zinc-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
      />

      <button
        onClick={handleAdd}
        disabled={loading}
        className="rounded-xl px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium hover:opacity-90 transition disabled:opacity-50">
        {loading ? "Adding..." : "Add Task"}
      </button>
    </div>
  );
}
