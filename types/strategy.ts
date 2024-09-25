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
