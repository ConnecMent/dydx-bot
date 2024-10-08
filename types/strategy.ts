import { TimeFrame } from './common.js';

export interface Strategy {
  /**
   * FIXME: Change to string when support for other platforms is planned
   * https://github.com/ConnecMent/dydx-bot/issues/20
   */
  platform: 'dydx';
  pair: string;
  timeframe: TimeFrame;
  planPlugin: string;
  executePlugin: string;
  managePlugin: string;
}

export const strategySchema: Readonly<{
  platform: (value: any) => boolean;
  pair: (value: any) => boolean;
  timeframe: (value: any) => boolean;
  planPlugin: (value: any) => boolean;
  executePlugin: (value: any) => boolean;
  managePlugin: (value: any) => boolean;
}> = {
  platform: (value: any): boolean => value === 'dydx',
  pair: (value: any): boolean => typeof value === 'string',
  timeframe: (value: any): boolean =>
    typeof value === 'string' &&
    ['1MIN', '5MINS', '15MINS', '30MINS', '1HOUR', '4HOURS', '1DAY'].includes(
      value,
    ),
  planPlugin: (value: any): boolean => typeof value === 'string',
  executePlugin: (value: any): boolean => typeof value === 'string',
  managePlugin: (value: any): boolean => typeof value === 'string',
};
