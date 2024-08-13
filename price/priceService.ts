import { baseUrl } from './url.js';
import {Pair} from '../types/common.js'

type TimeFrame = string;

interface Candle {
  startedAt: string,
  ticker: string,
  resolution: "1MIN"|"5MINS"|"15MINS"|"30MINS"|"1HOUR"|"4HOURS"|"1DAY",
  low: string|number,
  high: string|number,
  open: string|number,
  close: string|number,
  baseTokenVolume: string|number,
  usdVolume: string|number,
  trades: number,
  startingOpenInterest: string,
}

async function fetchCandles(pair: Pair, timeFrame: TimeFrame): Promise<Candle[]> {
  const response = await fetch(
    `${baseUrl}/candles/perpetualMarkets/${pair}?resolution=${timeFrame}`,
  );

  if (!response.ok) {
    throw new Error(
      'Network response was not ok or maybe input not valid pair and timeFrame',
    );
  }

  const data = await response.json();

  return data;
}
