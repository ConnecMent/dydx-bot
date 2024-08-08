import { baseUrl } from './url.js';

type Pair = string;
type TimeFrame = string;

async function fetchData(pair: Pair, timeFrame: TimeFrame): Promise<string> {
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
