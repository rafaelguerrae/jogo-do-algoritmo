import { Fragment, type ReactElement } from "react";
import { REF_IDS, REFERENCIAS } from "@/lib/conteudo";

/** Converte os trechos entre *asteriscos* em itálico. */
export const Italico = ({ texto }: { texto: string }) => (
  <>
    {texto.split("*").map((t, i) => (
      <Fragment key={i}>{i % 2 ? <em>{t}</em> : t}</Fragment>
    ))}
  </>
);

/** Transforma cada citação "(Autor, ano…)" do texto em link para a referência na própria página. */
export function ComCitacoes({ texto }: { texto: string }) {
  let partes: (string | ReactElement)[] = [texto];
  for (const id of REF_IDS) {
    const { citacao } = REFERENCIAS[id];
    partes = partes.flatMap((p) =>
      typeof p !== "string"
        ? [p]
        : p.split(citacao).flatMap((t, i) =>
            i === 0
              ? [t]
              : [
                  <a key={`${id}-${t}`} href={`#ref-${id}`}>
                    {citacao}
                  </a>,
                  t,
                ],
          ),
    );
  }
  return <>{partes}</>;
}
