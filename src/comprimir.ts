const LADO_MAXIMO = 1280;
const QUALIDADE = 0.8;

export type FotoComprimida = { base64: string; mimeType: "image/jpeg" };

// Reduz o lado maior para ~1280px e converte para JPEG (~0.8) antes de enviar:
// o corpo da requisição na Vercel tem limite de ~4,5 MB.
export async function comprimirFoto(arquivo: File): Promise<FotoComprimida> {
  const bitmap = await createImageBitmap(arquivo, { imageOrientation: "from-image" });
  const escala = Math.min(1, LADO_MAXIMO / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * escala);
  canvas.height = Math.round(bitmap.height * escala);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((ok) => canvas.toBlob(ok, "image/jpeg", QUALIDADE));
  if (!blob) throw new Error("Falha ao comprimir a imagem");

  const dataUrl = await new Promise<string>((ok, falha) => {
    const leitor = new FileReader();
    leitor.onload = () => ok(leitor.result as string);
    leitor.onerror = () => falha(leitor.error);
    leitor.readAsDataURL(blob);
  });
  return { base64: dataUrl.slice(dataUrl.indexOf(",") + 1), mimeType: "image/jpeg" };
}
