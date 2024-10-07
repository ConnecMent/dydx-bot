import { Strategy } from './types/strategy.js';
import { readFileSync } from 'fs';
import config from './config.js';

/**
 * TODO: https://github.com/ConnecMent/dydx-bot/issues/28
 */
export const loadStrategies = async (): Promise<Strategy[]> => {
  const loaded_strategies: Strategy[] = [];

  config.strategiesFilePath.forEach((path) => {
    try {
      const loadedConfig = readFileSync(path, 'utf-8');
      const importedJson = JSON.parse(loadedConfig);

      // If validation passes, add to loaded strategies
      loaded_strategies.push(importedJson as Strategy);
    } catch (error) {
      console.error(`Error loading a strategy file ${path}: ${error}`);
    }
  });

  return loaded_strategies;
};

console.log(await loadStrategies());
