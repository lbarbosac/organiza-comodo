import { useEffect, useState } from "react";
import BotaoFoto from "./components/BotaoFoto";
import EstadoErro from "./components/EstadoErro";
import Inicio from "./components/Inicio";
import Resultado from "./components/Resultado";
import { resultadoMock } from "./mock";

type Tela = "inicio" | "resultado" | "erro";

// Fatia 1: nenhuma chamada à API; qualquer foto devolve o resultado mock.
// Para ver o estado de erro, abra com ?tela=erro.
const telaInicial: Tela = new URLSearchParams(location.search).get("tela") === "erro" ? "erro" : "inicio";

export default function App() {
  const [tela, setTela] = useState<Tela>(telaInicial);
  const [fotoUrl, setFotoUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (fotoUrl) URL.revokeObjectURL(fotoUrl);
    };
  }, [fotoUrl]);

  function aoEscolherFoto(arquivo: File) {
    setFotoUrl(URL.createObjectURL(arquivo));
    setTela("resultado");
  }

  function recomecar() {
    setFotoUrl(null);
    setTela("inicio");
  }

  return (
    <main className="mx-auto min-h-dvh max-w-xl px-5 pb-40">
      {tela === "inicio" && <Inicio />}
      {tela === "resultado" && <Resultado resultado={resultadoMock} fotoUrl={fotoUrl} onRecomecar={recomecar} />}
      {tela === "erro" && (
        <EstadoErro
          mensagem="Não conseguimos analisar a foto. Tente com mais luz ou outro ângulo."
          onTentarDeNovo={recomecar}
        />
      )}
      {tela !== "resultado" && <BotaoFoto onFoto={aoEscolherFoto} />}
    </main>
  );
}
