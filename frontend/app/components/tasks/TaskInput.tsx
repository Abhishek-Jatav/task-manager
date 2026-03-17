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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 focus:ring-2 focus:ring-green-500 outline-none"
      />

      <button
        onClick={handleAdd}
        disabled={loading}
        className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition">
        {loading ? "Adding..." : "Add"}
      </button>
    </div>
  );
}
