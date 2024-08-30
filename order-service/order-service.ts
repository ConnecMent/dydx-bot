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
  placeTakeProfitOrder: (/* same as prev */) => Promise<Tx>;
  placeStopLossOrder: (/* same as prev */) => Promise<Tx>;
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
        0, // @param goodTilTimeInSeconds — The goodTilTimeInSeconds of the order to place.
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
        0, // @param goodTilTimeInSeconds — The goodTilTimeInSeconds of the order to place.
        config.execution,
        config.postOnly,
        config.reduceOnly,
        config.triggerPrice,
      );

      resolve(tx);
    });
  },
  placeTakeProfitOrder: () => {
    return new Promise<Tx>((resolve, reject) => {});
  },
  placeStopLossOrder: () => {
    return new Promise<Tx>((resolve, reject) => {});
  },
  listPositions: () => {
    return new Promise<Position[]>((resolve, reject) => {});
  },
});
