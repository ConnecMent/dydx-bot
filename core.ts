import { Network } from '@dydxprotocol/v4-client-js';
import config from './config.js';

import { installPlugins } from './install-plugins.js';
import { loadStrategies } from './load-strategies.js';
import createOrderService from './order-service/order-service.js';
import { fetchCandles } from './price/priceService.js';

import { Order } from './types/common.js';
import { ExecutePlugin, ManagePlugin, PlanPlugin } from './types/plugin.js';

const strategies = await loadStrategies();
const requiredPluginNames = [
  ...new Set(
    strategies.flatMap((strategy) => [
      strategy.planPlugin,
      strategy.executePlugin,
      strategy.managePlugin,
    ]),
  ),
];

/**
 * TODO: Step 2 - Install required plugins
 * https://github.com/ConnecMent/dydx-bot/issues/27
 */
const plugins = await installPlugins(requiredPluginNames);

const orders: Order[] = [];

// Step 3: Run
const orderService = await createOrderService('', Network.mainnet());

const main = () => {
  strategies.forEach(async (strategy) => {
    const candles = await fetchCandles(strategy.pair, strategy.timeframe);

    const side = (plugins[strategy.planPlugin] as PlanPlugin).chooseSide(
      candles,
    );

    if (side) {
      /**
       * TODO: Call `execute` with bot context
       * https://github.com/ConnecMent/dydx-bot/issues/4
       */
      (plugins[strategy.executePlugin] as ExecutePlugin).execute(
        candles,
        side,
        strategy.pair,
        orderService,
      );
    }

    /**
     * TODO: Call `manage` with bot context
     * https://github.com/ConnecMent/dydx-bot/issues/4
     */
    (plugins[strategy.managePlugin] as ManagePlugin).manage(orders);
  });
};

setInterval(main, config.interval);
