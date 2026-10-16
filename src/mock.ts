import { ResultadoAnalise } from "./schema";

// Dados falsos da Fatia 1. Validados pelo schema para garantir que o formato bate.
export const resultadoMock: ResultadoAnalise = ResultadoAnalise.parse({
  foto_valida: true,
  motivo_invalido: null,
  comodo: "Quarto",
  nivel_bagunca: 7,
  resumo:
    "Roupas espalhadas na cadeira e na cama, e a mesa de cabeceira está tomada por copos e papéis.",
  comeco_por_aqui: {
    acao: "Recolher as roupas da cadeira e da cama e separar entre cesto e guarda-roupa",
    tempo_min: 10,
  },
  limpar: [
    { id: "l1", acao: "Levar os dois copos e o prato da mesa de cabeceira para a cozinha", prioridade: "alta", tempo_min: 3, area_na_foto: [520, 640, 700, 820] },
    { id: "l2", acao: "Jogar fora os papéis e embalagens soltos sobre a escrivaninha", prioridade: "media", tempo_min: 5, area_na_foto: [430, 60, 600, 360] },
    { id: "l3", acao: "Passar pano na poeira visível da prateleira acima da cama", prioridade: "baixa", tempo_min: 8, area_na_foto: null },
  ],
  organizar: [
    { id: "o1", acao: "Dobrar ou pendurar as roupas limpas que estão sobre a cadeira", prioridade: "alta", tempo_min: 12, area_na_foto: [380, 700, 760, 960] },
    { id: "o2", acao: "Reunir os livros empilhados no chão ao lado da cama em uma só pilha na prateleira", prioridade: "media", tempo_min: 6, area_na_foto: null },
    { id: "o3", acao: "Guardar os sapatos que estão no meio do caminho dentro do armário", prioridade: "media", tempo_min: 4, area_na_foto: null },
  ],
  melhorar: [
    { id: "m1", acao: "Prender o fio do carregador que fica solto atravessando o chão perto da cama", prioridade: "alta", tipo: "manutencao", area_na_foto: [800, 300, 900, 600] },
    { id: "m2", acao: "Trocar a lâmpada da mesa de cabeceira por uma de luz mais quente", prioridade: "baixa", tipo: "estetica", area_na_foto: null },
  ],
});
