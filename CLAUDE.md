# CLAUDE.md — Organiza Cômodo

Leia este arquivo e `docs/PRODUTO.md` antes de qualquer alteração.

## O que é
Web app mobile-first de tela única. O usuário tira/escolhe uma foto de um cômodo bagunçado; o back-end envia a imagem ao Gemini; o app mostra um plano de ação em cards (limpar, organizar, melhorar).

## Stack (não trocar sem pedir)
- Front-end: Vite + React + TypeScript + Tailwind CSS
- Back-end: funções Node.js em `/api` (Vercel Functions)
- IA: `@google/genai`, modelo lido de `GEMINI_MODEL` (nunca fixo no código)
- Validação: Zod (`src/schema.ts` é a fonte única da verdade do JSON)
- Persistência (só na V1): Supabase

## Regras inegociáveis
1. Custo zero: cota gratuita do Google AI Studio e planos gratuitos de Vercel/Supabase.
2. A chave `GEMINI_API_KEY` existe só no back-end. Nunca no front, nunca no repositório, nunca em log.
3. A resposta do Gemini SEMPRE usa `responseMimeType: "application/json"` + `responseSchema` e é validada com Zod. Falhou a validação: 1 retry; falhou de novo: erro amigável.
4. Comprimir a imagem no front (lado maior ~1280px, JPEG ~0.8) antes de enviar. Corpo da requisição na Vercel tem limite de ~4,5 MB.
5. Rate limit simples por IP no `/api/analisar` (ex.: 5 análises/hora).
6. Foto de cômodo é dado sensível: aviso de privacidade visível na tela; não armazenar a foto original.
7. Todo texto da interface em português do Brasil.

## Convenções
- Código simples e organizado; sem abstração antes da necessidade.
- Componentes pequenos em `src/components`; tipos vindos de `src/schema.ts` (`z.infer`).
- Tratar `null` e listas vazias do resultado sem quebrar a tela.
- Acessibilidade: contraste, alvos de toque ≥ 44px, `aria-label` nos botões de ícone.

## UI: o que evitar
Visual genérico de "gerado por IA": excesso de cards, cantos muito arredondados, gradientes genéricos, ícones decorativos e animação em tudo. Buscar tipografia forte, hierarquia clara, uma única cor de destaque, sensação de produto real.

## Como trabalhar
- Entender o código existente antes de propor reescritas; preservar o que funciona.
- Construir em fatias pequenas (ver `docs/PRIMEIRO-PROMPT.md`), um commit por fatia, mensagens em português no padrão Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).
- Não mudar arquitetura, rotas ou dependências sem necessidade explícita.
- Ao terminar: rodar build/lint e dizer o que mudou, o que falta e riscos.
