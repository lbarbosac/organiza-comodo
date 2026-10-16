import { useEffect, useRef, useState } from "react";
import { analisarFoto, ErroApp } from "./api";
import BotaoFoto from "./components/BotaoFoto";
import Carregando from "./components/Carregando";
import EstadoErro from "./components/EstadoErro";
import Inicio from "./components/Inicio";
import Resultado from "./components/Resultado";
import { comprimirFoto } from "./comprimir";
import { resultadoMock } from "./mock";
import type { ResultadoAnalise } from "./schema";

type Estado =
  | { tela: "inicio" }
  | { tela: "carregando" }
  | { tela: "resultado"; resultado: ResultadoAnalise }
  | { tela: "erro"; mensagem: string };

// Para desenvolver a tela sem chamar a API: abra com ?mock=1.
const usarMock = new URLSearchParams(location.search).get("mock") === "1";

export default function App() {
  const [estado, setEstado] = useState<Estado>({ tela: "inicio" });
  const [fotoUrl, setFotoUrl] = useState<string | null>(null);
  const envio = useRef(0); // ignora respostas de análises antigas

  useEffect(() => {
    return () => {
      if (fotoUrl) URL.revokeObjectURL(fotoUrl);
    };
  }, [fotoUrl]);

  async function aoEscolherFoto(arquivo: File) {
    const meuEnvio = ++envio.current;
    setFotoUrl(URL.createObjectURL(arquivo));
    setEstado({ tela: "carregando" });

    let novo: Estado;
    try {
      if (usarMock) {
        novo = { tela: "resultado", resultado: resultadoMock };
      } else {
        const foto = await comprimirFoto(arquivo).catch(() => {
          throw new ErroApp("Não conseguimos ler essa foto. Tente outra.");
        });
        const resultado = await analisarFoto(foto);
        novo = resultado.foto_valida
          ? { tela: "resultado", resultado }
          : {
              tela: "erro",
              mensagem: resultado.motivo_invalido || "Não parece uma foto de cômodo. Tente outra, com boa luz.",
            };
      }
    } catch (e) {
      const mensagem = e instanceof ErroApp ? e.message : "Algo deu errado. Tente de novo.";
      novo = { tela: "erro", mensagem };
    }
    if (meuEnvio === envio.current) setEstado(novo);
  }

  function recomecar() {
    envio.current++;
    setFotoUrl(null);
    setEstado({ tela: "inicio" });
  }

  return (
    <main className="mx-auto min-h-dvh max-w-xl px-5 pb-40">
      {estado.tela === "inicio" && <Inicio />}
      {estado.tela === "carregando" && <Carregando fotoUrl={fotoUrl} />}
      {estado.tela === "resultado" && (
        <Resultado resultado={estado.resultado} fotoUrl={fotoUrl} onRecomecar={recomecar} />
      )}
      {estado.tela === "erro" && <EstadoErro mensagem={estado.mensagem} onTentarDeNovo={recomecar} />}
      {(estado.tela === "inicio" || estado.tela === "erro") && <BotaoFoto onFoto={aoEscolherFoto} />}
    </main>
  );
}
