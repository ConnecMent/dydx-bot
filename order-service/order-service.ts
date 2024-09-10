import { Tx, Pair, Position, OrderConfig } from '../types/common.js';
import {
  OrderSide,
  OrderType,
  SubaccountClient,
  Network,
  CompositeClient,
  IndexerClient,
} from '@dydxprotocol/v4-client-js';

const createOrderService = async (
  subaccount: SubaccountClient,
  network: Network,
) => {
  const client = await CompositeClient.connect(network);
  const indexerClient = new IndexerClient(network.indexerConfig);

  return {
    placeLimitOrder: async (
      pair: Pair,
      side: OrderSide,
      price: number,
      size: number,
      config: OrderConfig,
    ): Promise<Tx> => {
      return client.placeOrder(
        subaccount,
        pair,
        OrderType.LIMIT,
        side,
        price,
        size,
        config.clientId,
        config.timeInForce,
        config.goodTilTimeInSeconds,
        config.execution,
        config.postOnly,
        false,
        config.triggerPrice,
      );
    },

    placeMarketOrder: async (
      pair: Pair,
      side: OrderSide,
      price: number,
      size: number,
      config: OrderConfig,
    ): Promise<Tx> => {
      return client.placeOrder(
        subaccount,
        pair,
        OrderType.MARKET,
        side,
        price,
        size,
        config.clientId,
        config.timeInForce,
        config.goodTilTimeInSeconds,
        config.execution,
        config.postOnly,
        false,
        config.triggerPrice,
      );
    },

    placeLimitTakeProfitOrder: async (
      pair: Pair,
      side: OrderSide,
      price: number,
      size: number,
      config: OrderConfig,
    ): Promise<Tx> => {
      return client.placeOrder(
        subaccount,
        pair,
        OrderType.TAKE_PROFIT_LIMIT,
        side,
        price,
        size,
        config.clientId,
        config.timeInForce,
        config.goodTilTimeInSeconds,
        config.execution,
        config.postOnly,
        true,
        config.triggerPrice,
      );
    },

    placeMarketTakeProfitOrder: async (
      pair: Pair,
      side: OrderSide,
      price: number,
      size: number,
      config: OrderConfig,
    ): Promise<Tx> => {
      return client.placeOrder(
        subaccount,
        pair,
        OrderType.TAKE_PROFIT_MARKET,
        side,
        price,
        size,
        config.clientId,
        config.timeInForce,
        config.goodTilTimeInSeconds,
        config.execution,
        config.postOnly,
        true,
        config.triggerPrice,
      );
    },

    placeLimitStopLossOrder: async (
      pair: Pair,
      side: OrderSide,
      price: number,
      size: number,
      config: OrderConfig,
    ): Promise<Tx> => {
      return client.placeOrder(
        subaccount,
        pair,
        OrderType.STOP_LIMIT,
        side,
        price,
        size,
        config.clientId,
        config.timeInForce,
        config.goodTilTimeInSeconds,
        config.execution,
        config.postOnly,
        true,
        config.triggerPrice,
      );
    },

    placeMarketStopLossOrder: async (
      pair: Pair,
      side: OrderSide,
      price: number,
      size: number,
      config: OrderConfig,
    ): Promise<Tx> => {
      return client.placeOrder(
        subaccount,
        pair,
        OrderType.STOP_MARKET,
        side,
        price,
        size,
        config.clientId,
        config.timeInForce,
        config.goodTilTimeInSeconds,
        config.execution,
        config.postOnly,
        true,
        config.triggerPrice,
      );
    },

    listPositions: async (): Promise<Position[]> => {
      return indexerClient.account
        .getSubaccountAssetPositions(
          subaccount.address,
          subaccount.subaccountNumber,
        )
        .then((res) => {
          return res.positions;
        });
    },
  };
};
