type Props = { mensagem: string; onTentarDeNovo: () => void };

export default function EstadoErro({ mensagem, onTentarDeNovo }: Props) {
  return (
    <section className="pt-16" role="alert">
      <h2 className="text-4xl leading-none font-black tracking-tight [font-stretch:80%]">
        Não deu certo.
      </h2>
      <p className="mt-4 max-w-sm text-lg leading-snug">{mensagem}</p>
      <button
        type="button"
        onClick={onTentarDeNovo}
        className="mt-8 min-h-12 bg-tinta px-6 font-bold text-papel active:brightness-125"
      >
        Tentar de novo
      </button>
    </section>
  );
}
