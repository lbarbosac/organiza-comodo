import { ResultadoAnalise } from "./schema";
import type { FotoComprimida } from "./comprimir";

// Erro com mensagem já pronta para mostrar ao usuário.
export class ErroApp extends Error {}

export async function analisarFoto(foto: FotoComprimida): Promise<ResultadoAnalise> {
  let resposta: Response;
  try {
    resposta = await fetch("/api/analisar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imagem: foto.base64, mimeType: foto.mimeType }),
    });
  } catch {
    throw new ErroApp("Sem conexão com a internet. Confira a rede e tente de novo.");
  }

  const corpo: unknown = await resposta.json().catch(() => null);

  if (!resposta.ok) {
    const mensagem = (corpo as { mensagem?: unknown } | null)?.mensagem;
    throw new ErroApp(typeof mensagem === "string" ? mensagem : "Não conseguimos analisar a foto agora. Tente de novo.");
  }

  const resultado = ResultadoAnalise.safeParse(corpo);
  if (!resultado.success) throw new ErroApp("Recebemos uma resposta inesperada. Tente de novo.");
  return resultado.data;
}
