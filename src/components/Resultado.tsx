import { useState } from "react";
import type { ResultadoAnalise } from "../schema";
import BarraProgresso from "./BarraProgresso";
import ComecePorAqui from "./ComecePorAqui";
import PlacarBagunca from "./PlacarBagunca";
import SecaoTarefas, { type ItemLista } from "./SecaoTarefas";

type Props = { resultado: ResultadoAnalise; fotoUrl: string | null; onRecomecar: () => void };

const rotuloTipo = { estetica: "Estética", manutencao: "Manutenção" } as const;

export default function Resultado({ resultado, fotoUrl, onRecomecar }: Props) {
  const [feitos, setFeitos] = useState<Set<string>>(new Set());

  const limpar: ItemLista[] = resultado.limpar.map((i) => ({ ...i, detalhe: `${i.tempo_min} min` }));
  const organizar: ItemLista[] = resultado.organizar.map((i) => ({ ...i, detalhe: `${i.tempo_min} min` }));
  const melhorar: ItemLista[] = resultado.melhorar.map((i) => ({ ...i, detalhe: rotuloTipo[i.tipo] }));
  const total = limpar.length + organizar.length + melhorar.length;

  function alternar(id: string) {
    setFeitos((atual) => {
      const novo = new Set(atual);
      if (!novo.delete(id)) novo.add(id);
      return novo;
    });
  }

  return (
    <div className="pt-6">
      {fotoUrl && <img src={fotoUrl} alt="Foto enviada do cômodo" className="mb-6 max-h-56 w-full object-cover" />}
      <PlacarBagunca comodo={resultado.comodo} nivel={resultado.nivel_bagunca} resumo={resultado.resumo} />
      {resultado.comeco_por_aqui && (
        <ComecePorAqui acao={resultado.comeco_por_aqui.acao} tempoMin={resultado.comeco_por_aqui.tempo_min} />
      )}
      <div className="mt-8">
        <BarraProgresso feitos={feitos.size} total={total} />
      </div>
      {total === 0 && <p className="mt-6 text-lg font-semibold">Nada a fazer por aqui. Cômodo em dia.</p>}
      <SecaoTarefas titulo="Limpar" itens={limpar} feitos={feitos} onAlternar={alternar} />
      <SecaoTarefas titulo="Organizar" itens={organizar} feitos={feitos} onAlternar={alternar} />
      <SecaoTarefas titulo="Melhorar" itens={melhorar} feitos={feitos} onAlternar={alternar} />
      <button
        type="button"
        onClick={onRecomecar}
        className="mt-12 min-h-12 w-full border-2 border-tinta font-bold active:bg-linha"
      >
        Analisar outro cômodo
      </button>
    </div>
  );
}
