import type { Candle, Pair, PositionType } from "../types/common";

export default interface Strategy {
  run(marketData: Record<Pair, Candle[]>): Record<Pair, PositionType>;
}
