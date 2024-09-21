import { Tx, Pair, Position, OrderConfig } from '../types/common.js';
import DefV4ClientJs, {
  OrderSide,
  OrderType,
  SubaccountClient,
  Network,
  CompositeClient,
  IndexerClient,
  BECH32_PREFIX,
} from '@dydxprotocol/v4-client-js';

const createOrderService = async (mnemonic: string, network: Network) => {
  const wallet = await DefV4ClientJs.LocalWallet.fromMnemonic(
    mnemonic,
    BECH32_PREFIX,
  );
  const subAccount = new SubaccountClient(wallet, 0);
  const client = await CompositeClient.connect(network);
  const indexerClient = new IndexerClient(network.indexerConfig);
  const clientId = Math.floor(Math.random() * 1000 + 1000); // 1000 -> 2000

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
        clientId,
        config?.timeInForce,
        0,
        config?.execution,
        config?.postOnly,
        false,
      );
    },

    placeMarketOrder: async (
      pair: Pair,
      side: OrderSide,
      price: number,
      size: number,
      config?: OrderConfig,
    ): Promise<Tx> => {
      return client.placeOrder(
        subAccount,
        pair,
        OrderType.MARKET,
        side,
        price,
        size,
        clientId,
        config?.timeInForce,
        0,
        config?.execution,
        config?.postOnly,
        false,
      );
    },

    placeLimitTakeProfitOrder: async (
      pair: Pair,
      side: OrderSide,
      price: number,
      size: number,
      triggerPrice: number,
      config?: OrderConfig,
    ): Promise<Tx> => {
      return client.placeOrder(
        subAccount,
        pair,
        OrderType.TAKE_PROFIT_LIMIT,
        side,
        price,
        size,
        clientId,
        config?.timeInForce,
        0,
        config?.execution,
        config?.postOnly,
        true,
        triggerPrice,
      );
    },

    placeMarketTakeProfitOrder: async (
      pair: Pair,
      side: OrderSide,
      price: number,
      size: number,
      triggerPrice: number,
      config?: OrderConfig,
    ): Promise<Tx> => {
      return client.placeOrder(
        subAccount,
        pair,
        OrderType.TAKE_PROFIT_MARKET,
        side,
        price,
        size,
        clientId,
        config?.timeInForce,
        0,
        config?.execution,
        config?.postOnly,
        true,
        triggerPrice,
      );
    },

    placeLimitStopLossOrder: async (
      pair: Pair,
      side: OrderSide,
      price: number,
      size: number,
      triggerPrice: number,
      config?: OrderConfig,
    ): Promise<Tx> => {
      return client.placeOrder(
        subAccount,
        pair,
        OrderType.STOP_LIMIT,
        side,
        price,
        size,
        clientId,
        config?.timeInForce,
        0,
        config?.execution,
        config?.postOnly,
        true,
        triggerPrice,
      );
    },

    placeMarketStopLossOrder: async (
      pair: Pair,
      side: OrderSide,
      price: number,
      size: number,
      triggerPrice: number,
      config?: OrderConfig,
    ): Promise<Tx> => {
      return client.placeOrder(
        subAccount,
        pair,
        OrderType.STOP_MARKET,
        side,
        price,
        size,
        clientId,
        config?.timeInForce,
        0,
        config?.execution,
        config?.postOnly,
        true,
        triggerPrice,
      );
    },

    listPositions: async (): Promise<Position[]> => {
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
