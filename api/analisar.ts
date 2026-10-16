import { GoogleGenAI } from "@google/genai";
import { ErroAnalise, obterResultado } from "./_analise.js";
import { excedeuLimite } from "./_limite.js";
import { SYSTEM_PROMPT } from "./_prompt.js";
import { responseSchema } from "./_responseSchema.js";

// Tipos mínimos do runtime Node da Vercel (evita dependência extra).
type Req = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
  socket?: { remoteAddress?: string };
};
type Res = {
  status: (codigo: number) => Res;
  setHeader: (nome: string, valor: string) => void;
  json: (corpo: unknown) => void;
};

const TIPOS_ACEITOS = ["image/jpeg", "image/png", "image/webp"];
// ~4,5 MB é o limite do corpo na Vercel; o base64 de uma foto já comprimida fica bem abaixo disso.
const MAX_BASE64 = 4_000_000;

function erro(res: Res, status: number, codigo: string, mensagem: string) {
  res.status(status).json({ erro: codigo, mensagem });
}

function ipDe(req: Req): string {
  const encaminhado = req.headers["x-forwarded-for"];
  const primeiro = (Array.isArray(encaminhado) ? encaminhado[0] : encaminhado)?.split(",")[0]?.trim();
  return primeiro || req.socket?.remoteAddress || "desconhecido";
}

export default async function handler(req: Req, res: Res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return erro(res, 405, "metodo_invalido", "Método não permitido.");
  }

  const chave = process.env.GEMINI_API_KEY;
  const modelo = process.env.GEMINI_MODEL;
  if (!chave || !modelo) {
    console.error("Configuração ausente: GEMINI_API_KEY ou GEMINI_MODEL");
    return erro(res, 500, "falha_ia", "O serviço está indisponível no momento. Tente mais tarde.");
  }

  const corpo = (req.body ?? {}) as { imagem?: unknown; mimeType?: unknown };
  const { imagem, mimeType } = corpo;
  if (typeof imagem !== "string" || typeof mimeType !== "string" || !TIPOS_ACEITOS.includes(mimeType)) {
    return erro(res, 400, "formato_invalido", "Envie uma foto em JPEG, PNG ou WebP.");
  }
  if (imagem.length === 0 || imagem.length > MAX_BASE64) {
    return erro(res, 413, "formato_invalido", "A foto é grande demais. Tente outra.");
  }

  const maximo = Number(process.env.RATE_LIMIT_PER_HOUR) || 5;
  if (excedeuLimite(ipDe(req), maximo)) {
    return erro(res, 429, "limite_atingido", "Você atingiu o limite de análises por hora. Tente mais tarde.");
  }

  const ai = new GoogleGenAI({ apiKey: chave });

  try {
    const gerar = () =>
      ai.models.generateContent({
        model: modelo,
        contents: [{ role: "user", parts: [{ inlineData: { mimeType, data: imagem } }, { text: "Analise este cômodo." }] }],
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.4,
          responseMimeType: "application/json",
          responseSchema,
        },
      });

    const resultado = await obterResultado(async () => {
      try {
        return (await gerar()).text;
      } catch (e) {
        // 503 = modelo sobrecarregado (comum na cota gratuita): uma nova tentativa costuma passar.
        if ((e as { status?: number }).status !== 503) throw e;
        await new Promise((ok) => setTimeout(ok, 1500));
        return (await gerar()).text;
      }
    });
    return res.status(200).json(resultado);
  } catch (e) {
    if (e instanceof ErroAnalise) return erro(res, e.status, e.codigo, e.message);
    // Nunca logar o objeto inteiro: pode carregar detalhes da requisição.
    const status = (e as { status?: number }).status;
    console.error("Falha ao chamar o Gemini:", status ?? (e as Error).name);
    if (status === 429) {
      return erro(res, 429, "cota_esgotada", "O limite gratuito de análises foi atingido por agora. Tente mais tarde.");
    }
    return erro(res, 502, "falha_ia", "Não conseguimos analisar a foto agora. Tente de novo.");
  }
}
