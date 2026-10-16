# Organiza Cômodo

Tire uma foto de um cômodo bagunçado e receba um plano de ação específico: o que limpar, o que organizar e como melhorar. Web app mobile-first, tela única, custo zero.

## Stack
Vite + React + TypeScript + Tailwind · funções Node.js em `/api` (Vercel) · Gemini via `@google/genai` · Zod.

## Estado atual
Fatias 1 a 3 prontas: foto comprimida no navegador, `/api/analisar` (Gemini, Zod, 1 retry, rate limit por IP) e tela ligada à API. Use `?mock=1` na URL para ver a tela sem chamar a API. Ver `docs/PRIMEIRO-PROMPT.md`.

## Documentos
- `CLAUDE.md`: regras do projeto para o Claude Code
- `docs/PRODUTO.md`: conceito, fluxo e regras de negócio
- `docs/PRIMEIRO-PROMPT.md`: roteiro das fatias e prompt da Fatia 1
- `prompts/analisar-comodo.md`: system prompt do Gemini
- `src/schema.ts`: schema Zod do resultado

## Rodando (após a Fatia 1)
```bash
cp .env.example .env.local   # preencha GEMINI_API_KEY
npm install
npx vercel dev   # serve o front e a pasta api juntos (npm run dev serve só o front; use ?mock=1)
```
