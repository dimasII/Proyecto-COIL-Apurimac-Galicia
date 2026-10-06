import { SearchX } from "lucide-react";

export default function EmptyState({
  titulo,
  descripcion,
  accionLabel,
  onAccion,
}: {
  titulo: string;
  descripcion: string;
  accionLabel?: string;
  onAccion?: () => void;
}) {
  return (
    <div className="glass-card rounded-andina p-10 text-center" role="status">
      <span aria-hidden="true" className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white/5">
        <SearchX className="h-6 w-6 text-sky-300" />
      </span>
      <h3 className="mt-3 text-base font-extrabold text-white">{titulo}</h3>
      <p className="mx-auto mt-1 max-w-md text-sm font-light text-slate-400">{descripcion}</p>
      {accionLabel && onAccion && (
        <button
          type="button"
          onClick={onAccion}
          className="mt-4 inline-flex min-h-[44px] items-center rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#0c141f] btn-transition hover:bg-sky-400 hover:text-white"
        >
          {accionLabel}
        </button>
      )}
    </div>
  );
}
