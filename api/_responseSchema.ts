import { Type, type Schema } from "@google/genai";

// Versão do src/schema.ts no formato do Gemini. A validação final é sempre feita com Zod.
const prioridade: Schema = { type: Type.STRING, enum: ["alta", "media", "baixa"] };

const area: Schema = {
  type: Type.ARRAY,
  items: { type: Type.NUMBER },
  minItems: "4",
  maxItems: "4",
  nullable: true,
};

const tempo: Schema = { type: Type.INTEGER };

const itemTarefa: Schema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING },
    acao: { type: Type.STRING },
    prioridade,
    tempo_min: tempo,
    area_na_foto: area,
  },
  required: ["id", "acao", "prioridade", "tempo_min", "area_na_foto"],
};

const itemMelhoria: Schema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING },
    acao: { type: Type.STRING },
    prioridade,
    tipo: { type: Type.STRING, enum: ["estetica", "manutencao"] },
    area_na_foto: area,
  },
  required: ["id", "acao", "prioridade", "tipo", "area_na_foto"],
};

export const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    foto_valida: { type: Type.BOOLEAN },
    motivo_invalido: { type: Type.STRING, nullable: true },
    comodo: { type: Type.STRING },
    nivel_bagunca: { type: Type.INTEGER },
    resumo: { type: Type.STRING },
    comeco_por_aqui: {
      type: Type.OBJECT,
      nullable: true,
      properties: { acao: { type: Type.STRING }, tempo_min: tempo },
      required: ["acao", "tempo_min"],
    },
    limpar: { type: Type.ARRAY, items: itemTarefa, maxItems: "5" },
    organizar: { type: Type.ARRAY, items: itemTarefa, maxItems: "5" },
    melhorar: { type: Type.ARRAY, items: itemMelhoria, maxItems: "3" },
  },
  required: [
    "foto_valida",
    "motivo_invalido",
    "comodo",
    "nivel_bagunca",
    "resumo",
    "comeco_por_aqui",
    "limpar",
    "organizar",
    "melhorar",
  ],
};
