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
        className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40">
        ← Prev
      </button>

      <span className="text-zinc-400">
        Page <span className="text-white font-semibold">{page}</span> /{" "}
        {maxPage || 1}
      </span>

      <button
        onClick={onNext}
        disabled={page >= maxPage}
        className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40">
        Next →
      </button>
    </div>
  );
}
