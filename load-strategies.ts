import { Strategy, strategySchema } from './types/strategy.js';
import { readFileSync } from 'fs';
import config from './config.js';

export const loadStrategies = async (): Promise<Strategy[]> => {
  const loaded_strategies: Strategy[] = [];

  config.strategiesFilePath.forEach((path) => {
    try {
      const loadedConfig = readFileSync(path, 'utf-8');
      const importedJson: Strategy = JSON.parse(loadedConfig);

      const isValid = Object.keys(strategySchema).every((key) => {
        const typedKey = key as keyof Strategy;
        return strategySchema[typedKey](importedJson[typedKey]);
      });

      if (!isValid) {
        throw new Error('Invalid strategy file');
      }

      loaded_strategies.push(importedJson as Strategy);
    } catch (error) {
      console.error(`Error loading a strategy file ${path}: ${error}`);
    }
  });

  return loaded_strategies;
};

console.log(await loadStrategies());
