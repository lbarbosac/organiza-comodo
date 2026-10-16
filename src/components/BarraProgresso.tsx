type Props = { feitos: number; total: number };

export default function BarraProgresso({ feitos, total }: Props) {
  if (total === 0) return null;
  const pct = Math.round((feitos / total) * 100);
  return (
    <div className="sticky top-0 z-10 -mx-5 border-b border-linha bg-papel/95 px-5 py-3 backdrop-blur">
      <div className="flex justify-between text-sm font-bold">
        <span>
          {feitos} de {total} feitos
        </span>
        <span>{pct}%</span>
      </div>
      <div
        className="mt-2 h-1.5 bg-linha"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progresso do plano"
      >
        <div className="h-full bg-destaque transition-[width]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
