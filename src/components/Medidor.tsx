import { LIMITE_BARRA } from "@/lib/game";

export default function Medidor({ pontos, grande = false }: { pontos: number; grande?: boolean }) {
  return (
    <div className="medidor">
      <div className="l">PONTOS DE<br />SOBRECARGA</div>
      <div className="barra" style={{ height: grande ? "min(46vh,420px)" : 300 }} role="meter" aria-valuemin={0} aria-valuemax={LIMITE_BARRA} aria-valuenow={Math.min(pontos, LIMITE_BARRA)} aria-label="Pontos de sobrecarga (fictícios)">
        {Array.from({ length: LIMITE_BARRA }, (_, i) => <i key={i} className={i < pontos ? "on" : ""} />)}
      </div>
      <div className="num">{pontos}<small>pts{pontos > LIMITE_BARRA ? " (acima da escala)" : ""}</small></div>
      <div className="rotulo" style={{ marginTop: 6 }}>Recurso didático. Não mede pessoas.</div>
    </div>
  );
}
