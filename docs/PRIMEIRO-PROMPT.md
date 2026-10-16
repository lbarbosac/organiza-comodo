# Roteiro de construção e prompt da Fatia 1

Abra o Claude Code na raiz do repositório, entre em **Plan Mode** e cole o prompt abaixo.

## Fatias (um commit por fatia)
1. **Fatia 1:** estrutura do projeto + tela com dados falsos (mock).
2. **Fatia 2:** `/api/analisar` com Gemini, `responseSchema`, Zod, 1 retry e rate limit.
3. **Fatia 3:** captura da foto, compressão no front e integração com a API real.
4. **Fatia 4:** acabamento (loading com scan, checkboxes, estados de erro) e deploy na Vercel.
5. **V1:** pins sobre a foto + Supabase (histórico, antes/depois).

## Prompt da Fatia 1

```
OBJETIVO
Construir a Fatia 1 do app "Organiza Cômodo": estrutura do projeto e a tela única com DADOS FALSOS (sem Gemini, sem API ainda).

CONTEXTO
Leia CLAUDE.md, docs/PRODUTO.md e src/schema.ts antes de agir. O schema Zod já existe e é a fonte da verdade dos tipos.

PLANO (apresente antes de executar e aguarde minha aprovação)
1. Inicializar Vite + React + TypeScript + Tailwind na raiz, preservando os arquivos existentes.
2. Criar um mock tipado (`ResultadoAnalise`) com um cômodo de exemplo: itens específicos, prioridades variadas, `comeco_por_aqui`, `nivel_bagunca`.
3. Construir a tela única, mobile-first, conforme docs/PRODUTO.md:
   - estado inicial: botão grande de câmera/galeria (`<input type="file" accept="image/*" capture="environment">`) fixo na parte de baixo + aviso de privacidade
   - estado de resultado (com o mock): cômodo, placar de bagunça, resumo, "Comece por aqui", seções Limpar / Organizar / Melhorar com checkbox, tempo e prioridade; progresso sobe ao marcar
   - estado de erro com botão "tentar de novo"
4. Design: uma única cor de destaque, tipografia forte, hierarquia clara. Evitar visual genérico de IA (ver CLAUDE.md).

EXECUÇÃO
- Sem dependências além de react, tailwind e zod.
- Tratar null e listas vazias sem quebrar.
- Rodar build e lint ao final.

RESULTADO ESPERADO
- `npm run dev` abre a tela com o mock no celular e no desktop.
- Um commit: `feat: estrutura inicial e tela de resultado com dados mock`.
- Relatório curto: o que foi feito, o que falta, riscos.
```
