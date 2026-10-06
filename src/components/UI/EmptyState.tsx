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
    <div className="rounded-andina border border-dashed border-white/20 bg-white/[.03] p-10 text-center" role="status">
      <span aria-hidden="true" className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white/5">
        <SearchX className="h-6 w-6 text-amber-300" />
      </span>
      <h3 className="mt-3 text-base font-extrabold text-white">{titulo}</h3>
      <p className="mx-auto mt-1 max-w-md text-sm text-amber-100/70">{descripcion}</p>
      {accionLabel && onAccion && (
        <button
          type="button"
          onClick={onAccion}
          className="mt-4 inline-flex min-h-[44px] items-center rounded-full bg-amber-400 px-5 py-2.5 text-sm font-bold text-stone-900 btn-transition hover:bg-amber-300"
        >
          {accionLabel}
        </button>
      )}
    </div>
  );
}
