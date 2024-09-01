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
  placeLimitTakeProfitOrder: (
    pair: Pair,
    side: Side,
    price: number,
    size: number,
    config: OrderConfig,
  ) => Promise<Tx>;
  placeMarketTakeProfitOrder: (
    pair: Pair,
    side: Side,
    price: number,
    size: number,
    config: OrderConfig,
  ) => Promise<Tx>;
  placeLimitStopLossOrder: (
    pair: Pair,
    side: Side,
    price: number,
    size: number,
    config: OrderConfig,
  ) => Promise<Tx>;
  placeMarketStopLossOrder: (
    pair: Pair,
    side: Side,
    price: number,
    size: number,
    config: OrderConfig,
  ) => Promise<Tx>;
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
        false,
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
        false,
        config.triggerPrice,
      );

      resolve(tx);
    });
  },
  placeLimitTakeProfitOrder: (pair, side, price, size, config) => {
    return new Promise<Tx>(async (resolve) => {
      const wallet = await LocalWallet.fromMnemonic(mnemonic, BECH32_PREFIX);
      const subaccount = new SubaccountClient(wallet, 0);

      const tx = await client.placeOrder(
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

      resolve(tx);
    });
  },
  placeMarketTakeProfitOrder: (pair, side, price, size, config) => {
    return new Promise<Tx>(async (resolve) => {
      const wallet = await LocalWallet.fromMnemonic(mnemonic, BECH32_PREFIX);
      const subaccount = new SubaccountClient(wallet, 0);

      const tx = await client.placeOrder(
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

      resolve(tx);
    });
  },
  placeLimitStopLossOrder: (pair, side, price, size, config) => {
    return new Promise<Tx>(async (resolve) => {
      const wallet = await LocalWallet.fromMnemonic(mnemonic, BECH32_PREFIX);
      const subaccount = new SubaccountClient(wallet, 0);

      const tx = await client.placeOrder(
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

      resolve(tx);
    });
  },
  placeMarketStopLossOrder: (pair, side, price, size, config) => {
    return new Promise<Tx>(async (resolve) => {
      const wallet = await LocalWallet.fromMnemonic(mnemonic, BECH32_PREFIX);
      const subaccount = new SubaccountClient(wallet, 0);

      const tx = await client.placeOrder(
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

      resolve(tx);
    });
  },
  listPositions: () => {
    return new Promise<Position[]>((resolve, reject) => {});
  },
});
