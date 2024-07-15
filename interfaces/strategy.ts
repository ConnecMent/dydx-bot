import type { Candle, PositionType } from "../types/common";

export default interface Strategy {
  run(data: Record<string, Candle[]>): Record<string, PositionType>;
}
