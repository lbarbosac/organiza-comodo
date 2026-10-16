type Props = { fotoUrl: string | null };

export default function Carregando({ fotoUrl }: Props) {
  return (
    <section className="pt-10" role="status" aria-live="polite">
      {fotoUrl && <img src={fotoUrl} alt="Foto enviada do cômodo" className="max-h-72 w-full object-cover" />}
      <h2 className="mt-6 text-4xl leading-none font-black tracking-tight [font-stretch:80%]">Analisando…</h2>
      <p className="mt-3 text-lg text-suave">Isso leva de 8 a 15 segundos.</p>
    </section>
  );
}
