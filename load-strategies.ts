import { Strategy } from './types/strategy.js';
import config from './config.js';

/**
 * TODO: https://github.com/ConnecMent/dydx-bot/issues/28
 */
export const loadStrategies = async (): Promise<Strategy[]> => {
  config.strategiesFilePath.forEach((path) => {
    // TODO:
    // - Load file
    // - Validate file
    // - Parse file
    // - Return strategies
  });

  return [];
};
