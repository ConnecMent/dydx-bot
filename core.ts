import { Network } from '@dydxprotocol/v4-client-js';
import config from './config.js';

import { installPlugins } from './install-plugins.js';
import { loadStrategies } from './load-strategies.js';
import logger from './log-service.js';
import createOrderService from './order-service/order-service.js';
import { fetchCandles } from './price/priceService.js';

import { ExecutePlugin, ManagePlugin, PlanPlugin } from './types/plugin.js';

logger.info('Starting bot');

const strategies = await loadStrategies();
logger.info('Strategies loaded');
const requiredPluginNames = [
  ...new Set(
    strategies.flatMap((strategy) => [
      strategy.planPlugin,
      strategy.executePlugin,
      strategy.managePlugin,
    ]),
  ),
];

logger.debug('Installing or loading required plugins', requiredPluginNames);
const plugins = await installPlugins(requiredPluginNames);
logger.info('Plugins installed or loaded');

// Step 3: Run
logger.info('Order service created');

const main = () => {
  strategies.forEach(async (strategy) => {
    logger.info(`Running strategy with id ${strategy.id}`);
    const candles = await fetchCandles(strategy.pair, strategy.timeframe);
    logger.info(
      `Candles for ${strategy.pair} in timeframe ${strategy.timeframe} fetched`,
    );

    const side = (plugins[strategy.planPlugin] as PlanPlugin).chooseSide(
      candles,
    );
    logger.info(`Plan plugin ran over fetched candles`);
    logger.info(`Plan plugin result: ${side}`);

    if (side) {
      logger.debug(
        'Running execute plugin because plan plugin result was not null',
      );

      await (plugins[strategy.executePlugin] as ExecutePlugin).execute(
        candles,
        side,
        strategy.pair,
        orderService,
      );
      logger.info('Execute plugin ran based on plan');
    }

    (plugins[strategy.managePlugin] as ManagePlugin).manage(orderService);
    logger.info('Manage plugin ran');
  });
};

main();
setInterval(main, config.interval);
