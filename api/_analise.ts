import { ResultadoAnalise } from "../src/schema.js";

export type ChamarModelo = () => Promise<string | undefined>;

export class ErroAnalise extends Error {
  constructor(
    public status: number,
    public codigo: "formato_invalido" | "cota_esgotada" | "falha_ia" | "resposta_invalida",
    message: string,
  ) {
    super(message);
  }
}

// Valida a resposta do modelo com Zod. Falhou: 1 retry. Falhou de novo: erro amigável.
export async function obterResultado(chamar: ChamarModelo): Promise<ResultadoAnalise> {
  for (let tentativa = 1; tentativa <= 2; tentativa++) {
    const texto = await chamar();
    try {
      return ResultadoAnalise.parse(JSON.parse(texto ?? ""));
    } catch {
      // JSON quebrado ou fora do schema: tenta de novo uma vez.
    }
  }
  throw new ErroAnalise(502, "resposta_invalida", "Não conseguimos entender a resposta da análise. Tente de novo.");
}
