import { Tx, Pair, Position, OrderConfig } from '../types/common.js';
import {
  OrderSide,
  OrderType,
  BECH32_PREFIX,
  LocalWallet,
  SubaccountClient,
  Network,
  CompositeClient,
  IndexerClient,
} from '@dydxprotocol/v4-client-js';

const createOrderService = async (mnemonic: string, network: Network) => {
  const wallet = await LocalWallet.fromMnemonic(mnemonic, BECH32_PREFIX);
  const subaccount = new SubaccountClient(wallet, 0);
  const client = await CompositeClient.connect(network);

  const indexer_client = new IndexerClient(network.indexerConfig);

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
      const subAccRes = await indexer_client.account.getSubaccounts(
        wallet.address || '',
      );

      return indexer_client.account
        .getSubaccountAssetPositions(
          wallet.address || '',
          subAccRes.subaccounts[0],
        )
        .then((res) => {
          return res.positions;
        });
    },
  };
};
