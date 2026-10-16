import { useRef } from "react";

type Props = { onFoto: (arquivo: File) => void };

// Fixo na base da tela (alcance do polegar). Um input abre a câmera, outro a galeria.
export default function BotaoFoto({ onFoto }: Props) {
  const camera = useRef<HTMLInputElement>(null);
  const galeria = useRef<HTMLInputElement>(null);

  function aoEscolher(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0];
    if (arquivo) onFoto(arquivo);
    e.target.value = "";
  }

  return (
    <div className="fixed inset-x-0 bottom-0 border-t border-linha bg-papel px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto max-w-xl">
        <button
          type="button"
          onClick={() => camera.current?.click()}
          className="min-h-14 w-full bg-destaque text-lg font-bold text-white active:brightness-90"
        >
          Fotografar o cômodo
        </button>
        <button
          type="button"
          onClick={() => galeria.current?.click()}
          className="mt-1 min-h-11 w-full text-sm font-semibold underline underline-offset-4"
        >
          Escolher da galeria
        </button>
        <input ref={camera} type="file" accept="image/*" capture="environment" onChange={aoEscolher} hidden />
        <input ref={galeria} type="file" accept="image/*" onChange={aoEscolher} hidden />
      </div>
    </div>
  );
}
