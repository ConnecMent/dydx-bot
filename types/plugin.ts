import createOrderService from '../order-service/order-service.js';
import { Candle, Order, PositionType } from './common.js';

export interface PlanPlugin {
  chooseSide(candles: Candle[]): PositionType;
}

export interface ExecutePlugin {
  execute(
    candles: Candle[],
    side: PositionType,
    pair: string,
    orderService: Awaited<ReturnType<typeof createOrderService>>,
  ): Promise<string>;
}

export interface ManagePlugin {
  manage(orders: Order[]): Promise<void>;
}

export interface Plugin
  extends Partial<PlanPlugin>,
    Partial<ExecutePlugin>,
    Partial<ManagePlugin> {
  name: `bot-plugin-${string}`;
}
