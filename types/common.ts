export type Pair = string;
export type PositionType = 'long' | 'short' | null;
export type TimeFrame =
  | '1MIN'
  | '5MINS'
  | '15MINS'
  | '30MINS'
  | '1HOUR'
  | '4HOURS'
  | '1DAY';
export interface Candle {
  startedAt: string;
  ticker: string;
  resolution: TimeFrame;
  low: string;
  high: string;
  open: string;
  close: string;
  baseTokenVolume: string;
  usdVolume: string;
  trades: number;
  startingOpenInterest: string;
}
/**
 * FIXME: Update when order service is implemented
 * https://github.com/ConnecMent/dydx-bot/issues/4
 */
export type Order = any;
