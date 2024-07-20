import { type PositionType, type Pair, type Candle } from "./types/common";

export function evaluateAllStrategies(pairCandles: {
  [key: Pair]: Array<Candle>;
}): {
  [key: Pair]: PositionType;
} {
  return {};
}
