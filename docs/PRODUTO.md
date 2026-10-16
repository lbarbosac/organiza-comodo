# PRODUTO — Organiza Cômodo

## Conceito
Foto de um cômodo bagunçado → plano de ação específico e priorizado. Não é uma lista genérica: cada item cita algo visível na foto da própria pessoa.

## Fluxo da tela única
1. **Início:** botão grande de câmera na parte de baixo (alcance do polegar) + opção "escolher da galeria". Aviso curto de privacidade.
2. **Prévia:** a foto aparece; o front comprime e envia ao `/api/analisar`.
3. **Carregando (8–15 s):** linha de "scan" sobre a foto e mensagens curtas em rotação ("Identificando o cômodo…", "Procurando o que está fora do lugar…").
4. **Resultado:**
   - cômodo identificado + placar de bagunça (0–10) em tipografia grande
   - resumo de uma frase
   - destaque **"Comece por aqui"**: a ação de maior impacto e menor esforço, com tempo estimado
   - três seções: **Limpar**, **Organizar**, **Melhorar**
   - cada item: checkbox, texto da ação, tempo estimado e prioridade; marcar risca o item e sobe o progresso
5. **Recomeçar:** botão "Analisar outro cômodo".

## Regras de negócio
- Só analisa fotos de cômodos/ambientes de casa. Outra coisa → `foto_valida: false` + mensagem útil + "tentar de novo".
- Máx. 5 itens em Limpar, 5 em Organizar, 3 em Melhorar. Qualidade acima de quantidade.
- Itens ordenados do maior para o menor impacto visual.
- Itens de risco físico (fio exposto, mofo extenso, objeto instável) entram em Melhorar com prioridade alta.
- Cômodo já arrumado: listas curtas ou vazias e reconhecimento no resumo.
- Estado dos checkboxes na V0 fica só em memória (estado local).

## Estados de erro (todos com botão "tentar de novo")
Foto escura/ilegível · não é um cômodo · falha da API · cota esgotada / rate limit · sem conexão.

## Fora do escopo do MVP
Login, histórico, pins sobre a foto, antes/depois, lembretes, compartilhamento.

## Evolução (V1)
- Pins numerados sobre a foto usando `area_na_foto` (`[ymin, xmin, ymax, xmax]`, escala 0–1000).
- Supabase com Anonymous Auth: tabela `analises` (resultado em `jsonb`, miniatura no Storage, RLS `user_id = auth.uid()`), depois `tarefas` para checklist persistente.
- Antes/depois comparando o placar de bagunça.

## Riscos conhecidos
- Cota gratuita do Gemini muda; conferir modelo e limites no AI Studio.
- Conteúdo enviado na cota gratuita pode ser usado pelo Google para melhorar produtos: avisar o usuário.
- Sem login, a cota pode ser esgotada por abuso: rate limit por IP.
- Vercel Hobby é para uso não comercial; Supabase pausa projetos inativos.
