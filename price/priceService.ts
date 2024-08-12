import { baseUrl } from './url.js';
import {Pair} from '../types/common.js'

type TimeFrame = string;

async function fetchCandles(pair: Pair, timeFrame: TimeFrame): Promise<string> {
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
