type Props = { comodo: string; nivel: number; resumo: string };

export default function PlacarBagunca({ comodo, nivel, resumo }: Props) {
  return (
    <header>
      <p className="text-sm font-bold tracking-widest text-suave uppercase">{comodo || "Cômodo"}</p>
      <div className="mt-1 flex items-baseline gap-2" aria-label={`Nível de bagunça ${nivel} de 10`}>
        <span className="text-[7rem] leading-[0.85] font-black tracking-tighter text-destaque [font-stretch:75%]">
          {nivel}
        </span>
        <span className="text-2xl font-bold text-suave">/10 de bagunça</span>
      </div>
      {resumo && <p className="mt-4 text-lg leading-snug">{resumo}</p>}
    </header>
  );
}
