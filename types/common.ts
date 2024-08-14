/**
 * TODO: implement the type
 * https://github.com/ConnecMent/dydx-bot/issues/1
 */

export type Pair = string;
export type PositionType = 'long' | 'short' | null;
export type TimeFrame = string;
export interface Candle {
  startedAt: string;
  ticker: string;
  resolution:
    | '1MIN'
    | '5MINS'
    | '15MINS'
    | '30MINS'
    | '1HOUR'
    | '4HOURS'
    | '1DAY';
  low: string | number;
  high: string | number;
  open: string | number;
  close: string | number;
  baseTokenVolume: string | number;
  usdVolume: string | number;
  trades: number;
  startingOpenInterest: string;
}
