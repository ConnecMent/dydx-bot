import { Tx, Pair, Position, OrderConfig } from '../types/common.js';
import DefV4ClientJs, {
  OrderSide,
  OrderType,
  SubaccountClient,
  Network,
  CompositeClient,
  IndexerClient,
  BECH32_PREFIX,
  OrderTimeInForce,
  Order_TimeInForce,
  OrderExecution,
} from '@dydxprotocol/v4-client-js';

const goodTilTimeInSeconds = 2592000; // ~ 1 month

const createOrderService = async (mnemonic: string, network: Network) => {
  const wallet = await DefV4ClientJs.LocalWallet.fromMnemonic(
    mnemonic,
    BECH32_PREFIX,
  );
  const subAccount = new SubaccountClient(wallet, 0);
  const client = await CompositeClient.connect(network);
  const indexerClient = new IndexerClient(network.indexerConfig);
  const clientIdGen = (): number => {
    return Date.now() * 1000 + Math.floor(Math.random() * 1000);
  };

  return {
    placeLimitOrder: async (
      pair: Pair,
      side: OrderSide,
      price: number,
      size: number,
      config?: OrderConfig,
    ): Promise<Tx> => {
      return client.placeOrder(
        subAccount,
        pair,
        OrderType.LIMIT,
        side,
        price,
        size,
        clientIdGen(),
        config?.timeInForce,
        goodTilTimeInSeconds,
        config?.execution,
        config?.postOnly,
        false,
      );
    },

    placeMarketOrder: async (
      pair: Pair,
      side: OrderSide,
      size: number,
    ): Promise<Tx> => {
      return client.placeShortTermOrder(
        subAccount,
        pair,
        side,
        side === OrderSide.BUY ? 10_000_000 : Number.EPSILON,
        size,
        clientIdGen(),
        +(await indexerClient.utility.getHeight()).height + 20,
        Order_TimeInForce.TIME_IN_FORCE_UNSPECIFIED,
        false,
      );
    },

    placeMarketTakeProfitOrder: async (
      pair: Pair,
      side: OrderSide,
      size: number,
      triggerPrice: number,
    ): Promise<Tx> => {
      return client.placeOrder(
        subAccount,
        pair,
        OrderType.TAKE_PROFIT_MARKET,
        side,
        side === OrderSide.BUY ? 10_000_000 : Number.EPSILON,
        size,
        clientIdGen(),
        OrderTimeInForce.GTT,
        goodTilTimeInSeconds,
        OrderExecution.IOC,
        false,
        true,
        triggerPrice,
      );
    },

    placeMarketStopLossOrder: async (
      pair: Pair,
      side: OrderSide,
      size: number,
      triggerPrice: number,
    ): Promise<Tx> => {
      return client.placeOrder(
        subAccount,
        pair,
        OrderType.STOP_MARKET,
        side,
        side === OrderSide.BUY ? 10_000_000 : Number.EPSILON,
        size,
        clientIdGen(),
        OrderTimeInForce.GTT,
        goodTilTimeInSeconds,
        OrderExecution.IOC,
        false,
        true,
        triggerPrice,
      );
    },

    listPositions: async (): Promise<Position[]> => {
      return indexerClient.account
        .getSubaccountPerpetualPositions(
          wallet.address || '',
          subAccount.subaccountNumber,
        )
        .then((res) => {
          return res.positions;
        });
    },

    listAssetPositions: async (): Promise<Position[]> => {
      return indexerClient.account
        .getSubaccountAssetPositions(
          wallet.address || '',
          subAccount.subaccountNumber,
        )
        .then((res) => {
          return res.positions;
        });
    },
  };
};

export default createOrderService;
