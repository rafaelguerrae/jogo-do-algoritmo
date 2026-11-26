export type Corrida = {
  id: number;
  origem: string;
  destino: string;
  kmColeta: number;
  kmEntrega: number;
  valor: number;
  /** Corrida complexa: pouco tempo para analisar (regra 1). */
  complexa: boolean;
  /** Observação visível na carta. Se houver `risco`, recusar tem motivo de segurança. */
  obs?: string;
  risco?: boolean;
};

export const TEMPO_COMPLEXA_S = 9;
export const TEMPO_SIMPLES_S = 20;

const c = (
  id: number, origem: string, destino: string, kmColeta: number, kmEntrega: number,
  valor: number, complexa: boolean, obs?: string, risco = false,
): Corrida => ({ id, origem, destino, kmColeta, kmEntrega, valor, complexa, obs, risco });

/** Baralho fictício. Locais genéricos da região, valores inventados para o jogo. */
export const BARALHO: Corrida[] = [
  c(1, "UFABC", "Alameda Kennedy", 1.8, 2.2, 6.7, true),
  c(2, "Lanchonete 24h", "Jd. Bela Vista", 0.9, 3.1, 7.2, false),
  c(3, "Padaria Central", "Vila Gilda", 1.2, 2.4, 5.9, false),
  c(4, "Pizzaria do Centro", "Parque das Nações", 2.0, 5.6, 11.5, true, "2 pedidos na mesma sacola"),
  c(5, "Farmácia 24h", "Campestre", 0.7, 4.0, 8.4, false),
  c(6, "Hamburgueria", "Rudge Ramos", 1.5, 6.2, 12.9, true, "Chuva forte, pista molhada", true),
  c(7, "Mercado Bairro", "Jd. do Estádio", 2.3, 1.9, 6.1, false),
  c(8, "Sorveteria", "Vila Assunção", 0.6, 2.8, 5.5, false),
  c(9, "Restaurante Self-service", "Centro de Santo André", 1.1, 3.7, 8.0, true),
  c(10, "Açaí Express", "Jd. Santo André", 1.9, 2.1, 6.4, false),
  c(11, "Doceria", "Bairro Jardim", 0.8, 3.3, 7.0, true, "Entrega no 4º andar, sem elevador"),
  c(12, "Marmitaria", "Av. dos Estados", 1.4, 2.6, 6.3, false),
  c(13, "Cervejaria", "Vila Humaitá", 2.8, 7.4, 14.6, true, "23h, rua sem iluminação", true),
  c(14, "Pastelaria", "Jd. Utinga", 1.0, 1.7, 5.2, false),
  c(15, "Lanchonete 24h", "Parque Capuava", 3.1, 4.8, 9.9, true),
  c(16, "Sushi Delivery", "Vila Metalúrgica", 1.6, 5.1, 10.7, false),
  c(17, "Mercado Bairro", "Jd. Stella", 0.9, 3.5, 7.6, true, "Pedido volumoso para moto", true),
  c(18, "Cafeteria", "Centro de São Bernardo", 2.2, 2.9, 7.1, false),
  c(19, "Pizzaria do Centro", "Vila Luzita", 1.3, 4.4, 9.2, true),
  c(20, "Farmácia 24h", "Jd. Cristiane", 0.5, 2.3, 5.8, false),
  c(21, "Hamburgueria", "Parque Erasmo Assunção", 2.6, 6.8, 13.4, true, "Local sinalizado como área de risco", true),
  c(22, "Padaria Central", "Vila Pires", 1.1, 1.5, 4.9, false),
  c(23, "Restaurante Self-service", "Jd. Ocidental", 1.8, 3.0, 7.3, true),
  c(24, "Sorveteria", "Vila Alpina", 0.7, 2.0, 5.4, false),
];

export const porId = (id: number) => BARALHO.find((x) => x.id === id)!;
export const limiteMs = (x: Corrida) => (x.complexa ? TEMPO_COMPLEXA_S : TEMPO_SIMPLES_S) * 1000;
export const brl = (v: number) => v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const km = (v: number) => v.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
