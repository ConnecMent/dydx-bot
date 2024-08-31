import { Tx, Pair, Side, Position, OrderConfig } from '../types/common.js';
import {
  OrderType,
  BECH32_PREFIX,
  LocalWallet,
  SubaccountClient,
  Network,
  CompositeClient,
} from '@dydxprotocol/v4-client-js';

interface OrderService {
  placeLimitOrder: (
    pair: Pair,
    side: Side,
    price: number,
    size: number,
    config: OrderConfig,
  ) => Promise<Tx>;
  placeMarketOrder: (
    pair: Pair,
    side: Side,
    price: number,
    size: number,
    config: OrderConfig,
  ) => Promise<Tx>;
  placeLimitTakeProfitOrder: (/* same as prev */) => Promise<Tx>;
  placeMarketTakeProfitOrder: (/* same as prev */) => Promise<Tx>;
  placeLimitStopLossOrder: (/* same as prev */) => Promise<Tx>;
  placeMarketStopLossOrder: (/* same as prev */) => Promise<Tx>;
  listPositions: () => Promise<Position[]>;
}

const NETWORK = Network.testnet();
const client = await CompositeClient.connect(NETWORK);

// order factory function
const createOrderService = (mnemonic: string): OrderService => ({
  placeLimitOrder: (pair, side, price, size, config) => {
    return new Promise<Tx>(async (resolve) => {
      const wallet = await LocalWallet.fromMnemonic(mnemonic, BECH32_PREFIX);
      const subaccount = new SubaccountClient(wallet, 0);

      const tx = await client.placeOrder(
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
        config.reduceOnly,
        config.triggerPrice,
      );

      resolve(tx);
    });
  },
  placeMarketOrder: (pair, side, price, size, config) => {
    return new Promise<Tx>(async (resolve) => {
      const wallet = await LocalWallet.fromMnemonic(mnemonic, BECH32_PREFIX);
      const subaccount = new SubaccountClient(wallet, 0);

      const tx = await client.placeOrder(
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
        config.reduceOnly,
        config.triggerPrice,
      );

      resolve(tx);
    });
  },
  placeLimitTakeProfitOrder: () => {
    return new Promise<Tx>((resolve, reject) => {});
  },
  placeMarketTakeProfitOrder: () => {
    return new Promise<Tx>((resolve, reject) => {});
  },
  placeLimitStopLossOrder: () => {
    return new Promise<Tx>((resolve, reject) => {});
  },
  placeMarketStopLossOrder: () => {
    return new Promise<Tx>((resolve, reject) => {});
  },
  listPositions: () => {
    return new Promise<Position[]>((resolve, reject) => {});
  },
});
