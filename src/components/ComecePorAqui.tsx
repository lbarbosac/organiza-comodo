type Props = { acao: string; tempoMin: number };

export default function ComecePorAqui({ acao, tempoMin }: Props) {
  return (
    <section className="mt-8 bg-tinta p-5 text-papel">
      <h2 className="text-sm font-bold tracking-widest uppercase opacity-70">Comece por aqui</h2>
      <p className="mt-2 text-xl leading-snug font-bold">{acao}</p>
      <p className="mt-3 text-sm font-semibold">{tempoMin} min</p>
    </section>
  );
}
