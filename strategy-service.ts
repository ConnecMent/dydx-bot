import { type PositionType, type Pair, type Candle } from "./types/common";

export function evaluateAllStrategies(record: { [key: Pair]: Array<Candle> }): {
  [key: Pair]: PositionType;
} {
  return { pair1: "long" };
}
