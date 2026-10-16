import { z } from "zod";

// Fonte única da verdade do JSON devolvido pelo Gemini.
// Usado para: validar no back-end, tipar o front e (adaptado) montar o responseSchema.

export const Prioridade = z.enum(["alta", "media", "baixa"]);
export const TipoMelhoria = z.enum(["estetica", "manutencao"]);

// [ymin, xmin, ymax, xmax] em escala 0–1000, ou null se não localizável
export const AreaNaFoto = z
  .tuple([
    z.number().min(0).max(1000),
    z.number().min(0).max(1000),
    z.number().min(0).max(1000),
    z.number().min(0).max(1000),
  ])
  .nullable();

const ItemBase = z.object({
  id: z.string().min(1),
  acao: z.string().min(1),
  prioridade: Prioridade,
  area_na_foto: AreaNaFoto,
});

export const ItemTarefa = ItemBase.extend({
  tempo_min: z.number().int().min(1).max(240),
});

export const ItemMelhoria = ItemBase.extend({
  tipo: TipoMelhoria,
});

export const ResultadoAnalise = z.object({
  foto_valida: z.boolean(),
  motivo_invalido: z.string().nullable(),
  comodo: z.string(),
  nivel_bagunca: z.number().int().min(0).max(10),
  resumo: z.string(),
  comeco_por_aqui: z
    .object({
      acao: z.string(),
      tempo_min: z.number().int().min(1).max(240),
    })
    .nullable(),
  limpar: z.array(ItemTarefa).max(5),
  organizar: z.array(ItemTarefa).max(5),
  melhorar: z.array(ItemMelhoria).max(3),
});

export type ResultadoAnalise = z.infer<typeof ResultadoAnalise>;
export type ItemTarefa = z.infer<typeof ItemTarefa>;
export type ItemMelhoria = z.infer<typeof ItemMelhoria>;
