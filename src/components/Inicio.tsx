import Privacidade from "./Privacidade";

export default function Inicio() {
  return (
    <section className="pt-16">
      <h1 className="text-5xl leading-[0.95] font-black tracking-tight [font-stretch:80%]">
        Mostre a<br />bagunça.
        <br />
        <span className="text-destaque">Receba o plano.</span>
      </h1>
      <p className="mt-6 max-w-sm text-lg leading-snug">
        Uma foto do cômodo vira uma lista do que limpar, organizar e melhorar,
        com o primeiro passo já escolhido.
      </p>
      <div className="mt-10 max-w-sm">
        <Privacidade />
      </div>
    </section>
  );
}
