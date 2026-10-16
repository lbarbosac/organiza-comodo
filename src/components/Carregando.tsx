import { useEffect, useState } from "react";

type Props = { fotoUrl: string | null };

const mensagens = [
  "Identificando o cômodo…",
  "Procurando o que está fora do lugar…",
  "Separando o que limpar e o que organizar…",
  "Escolhendo por onde começar…",
];

export default function Carregando({ fotoUrl }: Props) {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndice((i) => Math.min(i + 1, mensagens.length - 1)), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="pt-10" role="status" aria-live="polite">
      {fotoUrl && (
        <div className="relative overflow-hidden">
          <img src={fotoUrl} alt="Foto enviada do cômodo" className="max-h-72 w-full object-cover" />
          <div className="linha-scan absolute inset-x-0 top-0 h-0.5 bg-destaque" aria-hidden="true" />
        </div>
      )}
      <h2 className="mt-6 text-4xl leading-none font-black tracking-tight [font-stretch:80%]">{mensagens[indice]}</h2>
      <p className="mt-3 text-lg text-suave">Isso leva de 8 a 15 segundos.</p>
    </section>
  );
}
