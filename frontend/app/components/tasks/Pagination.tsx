type Props = {
  page: number;
  maxPage: number;
  onPrev: () => void;
  onNext: () => void;
};

export default function Pagination({ page, maxPage, onPrev, onNext }: Props) {
  return (
    <div className="flex items-center justify-between mt-6 text-sm">
      <button
        onClick={onPrev}
        disabled={page <= 1}
        className="px-4 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition disabled:opacity-40">
        ← Prev
      </button>

      <span className="text-zinc-600 dark:text-zinc-400">
        Page{" "}
        <span className="font-semibold text-black dark:text-white">{page}</span>{" "}
        / {maxPage || 1}
      </span>

      <button
        onClick={onNext}
        disabled={page >= maxPage}
        className="px-4 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition disabled:opacity-40">
        Next →
      </button>
    </div>
  );
}
