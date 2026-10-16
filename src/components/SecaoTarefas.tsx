import type { ItemTarefa } from "../schema";

type Prioridade = ItemTarefa["prioridade"];

export type ItemLista = {
  id: string;
  acao: string;
  prioridade: Prioridade;
  detalhe: string; // tempo ("5 min") ou tipo ("Manutenção")
};

type Props = {
  titulo: string;
  itens: ItemLista[];
  feitos: Set<string>;
  onAlternar: (id: string) => void;
};

const rotuloPrioridade: Record<Prioridade, string> = {
  alta: "alta",
  media: "média",
  baixa: "baixa",
};

export default function SecaoTarefas({ titulo, itens, feitos, onAlternar }: Props) {
  if (itens.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="text-3xl font-black tracking-tight [font-stretch:80%]">{titulo}</h2>
      <ul className="mt-2 border-t border-tinta">
        {itens.map((item) => {
          const feito = feitos.has(item.id);
          return (
            <li key={item.id} className="border-b border-linha">
              <label className="flex min-h-11 cursor-pointer items-start gap-3 py-4">
                <input
                  type="checkbox"
                  checked={feito}
                  onChange={() => onAlternar(item.id)}
                  className="mt-0.5 size-6 shrink-0 accent-destaque"
                />
                <span className={feito ? "text-suave line-through" : ""}>
                  <span className="block leading-snug font-semibold">{item.acao}</span>
                  <span className="mt-1 block text-sm text-suave">
                    {item.detalhe} ·{" "}
                    <span className={item.prioridade === "alta" && !feito ? "font-bold text-destaque" : ""}>
                      prioridade {rotuloPrioridade[item.prioridade]}
                    </span>
                  </span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
