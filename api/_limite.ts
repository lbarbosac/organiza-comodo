const JANELA_MS = 60 * 60 * 1000;

// Contagem em memória por instância da função. Em serverless isso é um limite
// "melhor esforço": instâncias novas zeram a conta. Suficiente para o MVP; se o
// abuso aparecer, trocar por Vercel KV/Upstash.
const acessos = new Map<string, number[]>();

export function excedeuLimite(ip: string, maximo: number, agora = Date.now()): boolean {
  const recentes = (acessos.get(ip) ?? []).filter((t) => agora - t < JANELA_MS);
  if (recentes.length >= maximo) {
    acessos.set(ip, recentes);
    return true;
  }
  recentes.push(agora);
  acessos.set(ip, recentes);

  if (acessos.size > 5000) {
    for (const [chave, tempos] of acessos) {
      if (tempos.every((t) => agora - t >= JANELA_MS)) acessos.delete(chave);
    }
  }
  return false;
}
