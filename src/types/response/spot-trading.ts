/**
 *
 ***********
 * Spot Trading
 ***********
 *
 */

/**
 *
 * Market data
 *
 */

export interface CurrencyInfo {
  currency: string;
  name: string;
  fullName: string;
  precision: number;
  confirms: number | null;
  contractAddress: string | null;
  isMarginEnabled: boolean;
  isDebitEnabled: boolean;
  chains: Chain[];
}

interface Chain {
  chainName: string;
  withdrawalMinSize: string;
  depositMinSize: string | null;
  withdrawFeeRate: string;
  withdrawalMinFee: string;
  isWithdrawEnabled: boolean;
  isDepositEnabled: boolean;
  confirms: number;
  preConfirms: number;
  contractAddress: string;
  withdrawPrecision: number;
  maxWithdraw: string | null;
  maxDeposit: string | null;
  needTag: boolean;
  chainId: string;
}

export interface SymbolInfo {
  symbol: string;
  name: string;
  baseCurrency: string;
  quoteCurrency: string;
  feeCurrency: string;
  market: 'USDS' | 'BTC' | 'ALTS';
  baseMinSize: string;
  quoteMinSize: string;
  baseMaxSize: string;
  quoteMaxSize: string;
  baseIncrement: string;
  quoteIncrement: string;
  priceIncrement: string;
  priceLimitRate: string;
  minFunds: string;
  isMarginEnabled: boolean;
  enableTrading: boolean;
  feeCategory: 1 | 2 | 3;
  makerFeeCoefficient: string;
  takerFeeCoefficient: string;
  st: boolean;
}

export interface Ticker {
  sequence: string;
  price: string;
  size: string;
  bestAsk: string;
  bestAskSize: string;
  bestBid: string;
  bestBidSize: string;
  time: number;
}

export interface AllTickers {
  time: number;
  ticker: Ticker[];
}

// AllTickers returns different data than asking for one ticker
export interface AllTickersItem {
  symbol: string;
  symbolName: string;
  buy: string;
  bestBidSize: string;
  sell: string;
  bestAskSize: string;
  changeRate: string;
  changePrice: string;
  high: string;
  low: string;
  vol: string;
  volValue: string;
  last: string;
  averagePrice: string;
  takerFeeRate: string;
  makerFeeRate: string;
  takerCoefficient: string;
  makerCoefficient: string;
}

export interface Symbol24hrStats {
  time: number;
  symbol: string;
  buy: string;
  sell: string;
  changeRate: string;
  changePrice: string;
  high: string;
  low: string;
  vol: string;
  volValue: string;
  last: string;
  averagePrice: string;
  takerFeeRate: string;
  makerFeeRate: string;
  takerCoefficient: string;
  makerCoefficient: string;
}

export interface OrderBookLevel {
  sequence: string;
  time: number;
  bids: [string, string][];
  asks: [string, string][];
}

export interface TradeHistory {
  sequence: string;
  time: number;
  price: string;
  size: string;
  side: string;
}

export type Kline = [string, string, string, string, string, string, string];

/**
 *
 * Spot HF trade
 *
 */

export interface SubmitHFOrderSyncResponse {
  orderId: string; // An order Id is returned once an order is successfully Submitd.
  orderTime: number; // order time
  originSize: string; // original order size
  dealSize: string; // deal size
  remainSize: string; // remain size
  canceledSize: string; // Cumulative number of cancellations
  status: string; // Order Status. open: the order is active; done: the order has been completed
  matchTime: number; // matching time
  clientOid: string;
}

export interface SubmitMultipleHFOrdersResponse {
  orderId: string;
  success?: boolean;
  failMsg?: string; // Reason of failure, optional based on success status
  clientOid: string;
}

export interface SubmitMultipleHFOrdersSyncResponse {
  orderId: string; // An order Id is returned once an order is successfully Submitd.
  orderTime: number; // order time
  originSize: string; // original order size
  dealSize: string; // deal size
  remainSize: string; // remain size
  canceledSize: string; // Cumulative number of cancellations
  status: string; // Order Status. open: the order is active; done: the order has been completed
  matchTime: number; // matching time
  success: boolean; // Whether the order was submitted successfully.
  clientOid: string;
}

export interface SyncCancelHFOrderResponse {
  clientOid?: string; // client order Id
  orderId?: string; // order Id
  originSize: string; // original order size
  dealSize: string; // deal size
  remainSize: string; // remain size
  canceledSize: string; // Cumulative number of cancellations
  status: string; // Order Status. open: the order is active; done: the order has been completed
}

export interface CancelAllHFOrdersResponse {
  succeedSymbols?: string[]; // Cancel order successful symbol
  failedSymbols?: {
    symbol: string; // Cancel order failed symbol
    error: string; // Error message
  }[];
}

export interface AutoCancelHFOrderSettingQueryResponse {
  timeout: number; // Auto cancel order trigger setting time, the unit is second. range: timeout=-1 (meaning unset) or 5 <= timeout <= 86400
  symbols: string; // List of trading pairs. Separated by commas, empty means all trading pairs
  currentTime: number; // System current time (in seconds)
  triggerTime: number; // Trigger cancellation time (in seconds)
}

export interface HFFilledOrder {
  id: number;
  orderId: string;
  counterOrderId: string;
  tradeId: number;
  symbol: string;
  side: 'buy' | 'sell';
  liquidity: 'taker' | 'maker';
  type: 'limit' | 'market';
  forceTaker: boolean;
  price: string;
  size: string;
  funds: string;
  fee: string;
  feeRate: string;
  feeCurrency: string;
  stop: string;
  tradeType: string;
  taxRate: string;
  tax: string;
  createdAt: number;
}

export interface HFOrder {
  id: string;
  clientOid: string;
  symbol: string;
  opType: string;
  type: 'limit' | 'market';
  side: 'buy' | 'sell';
  price: string;
  size: string;
  funds: string;
  dealSize: string;
  dealFunds: string;
  remainSize: string;
  remainFunds: string;
  cancelledSize: string;
  cancelledFunds: string;
  fee: string;
  feeCurrency: string;
  stp?: 'DC' | 'CO' | 'CN' | 'CB' | null;
  timeInForce: 'GTC' | 'GTT' | 'IOC' | 'FOK';
  postOnly: boolean;
  hidden: boolean;
  iceberg: boolean;
  visibleSize: string;
  cancelAfter: number;
  channel: string;
  remark?: string | null;
  tags?: string | null;
  cancelExist: boolean;
  tradeType: string;
  inOrderBook: boolean;
  active: boolean;
  tax: string;
  createdAt: number;
  lastUpdatedAt: number;
}

/**
 *
 * Orders
 *
 */

export interface MultipleOrdersResponse {
  symbol: string;
  type?: string;
  side: string;
  price: string;
  size: string;
  funds?: any;
  stp?: string;
  stop?: string;
  stopPrice?: any;
  timeInForce?: string;
  cancelAfter?: number;
  postOnly?: boolean;
  hidden?: boolean;
  iceberg?: boolean;
  visibleSize?: any;
  channel: string;
  id: string;
  status: string;
  failMsg?: any;
  clientOid: string;
}

export interface SpotOrderList {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: SpotOrder[];
}

export interface SpotOrder {
  id: string;
  symbol: string;
  opType: string;
  type: string;
  side: string;
  price: string;
  size: string;
  funds: string;
  dealFunds: string;
  dealSize: string;
  fee: string;
  feeCurrency: string;
  stp: string;
  stop: string;
  stopTriggered: boolean;
  stopPrice: string;
  timeInForce: string;
  postOnly: boolean;
  hidden: boolean;
  iceberg: boolean;
  visibleSize: string;
  cancelAfter: number;
  channel: string;
  clientOid: string;
  remark: string;
  tags: string;
  isActive: boolean;
  cancelExist: boolean;
  createdAt: number;
  tradeType: string;
}

/**
 *
 * Fills
 *
 */

export interface SpotOrderFill {
  symbol: string; // symbol.
  tradeId: string; // trade id, it is generated by Matching engine.
  orderId: string; // Order ID, unique identifier of an order.
  counterOrderId: string; // counter order id.
  side: 'buy' | 'sell'; // transaction direction, include buy and sell.
  price: string; // order price
  size: string; // order quantity
  funds: string; // order funds
  type: 'limit' | 'market' | 'limit_stop' | 'market_stop'; // order type, e.g. limit, market, stop_limit.
  fee: string; // fee
  feeCurrency: string; // charge fee currency
  stop: string; // stop type, include entry and loss
  liquidity: 'taker' | 'maker'; // include taker and maker
  forceTaker: boolean; // forced to become taker, include true and false
  createdAt: number; // create time
  tradeType: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE'; // The type of trading: TRADE（Spot Trading）, MARGIN_TRADE (Margin Trading).
}

export interface SpotOrderFills {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: SpotOrderFill[];
}

/**
 *
 * Stop order
 *
 */

export interface StopOrders {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: StopOrderItem[];
}

export interface StopOrderItem {
  id?: string;
  symbol?: string;
  userId?: string;
  status?: 'NEW' | 'TRIGGERED';
  type?: 'limit' | 'market' | 'limit_stop' | 'market_stop';
  side?: 'buy' | 'sell';
  price?: string;
  size?: string;
  funds?: string | null;
  stp?: string | null;
  timeInForce?: 'GTC' | 'GTT' | 'IOC' | 'FOK';
  cancelAfter?: number;
  postOnly?: boolean;
  hidden?: boolean;
  iceberg?: boolean;
  visibleSize?: string | null;
  channel?: string;
  clientOid?: string;
  remark?: string | null;
  tags?: string | null;
  domainId?: string;
  tradeSource?: 'USER' | 'MARGIN_SYSTEM';
  tradeType?: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
  feeCurrency?: string;
  takerFeeRate?: string;
  makerFeeRate?: string;
  createdAt?: number;
  stop?: 'loss' | 'entry';
  stopTriggerTime?: number | null;
  stopPrice?: string;
  orderTime?: number;
}

/**
 *
 * OCO order
 *
 */

export interface OCOOrderDetails {
  orderId: string; // order id, Unique order id created by users to identify their orders
  symbol: string; // symbol, such as, ETH-BTC
  clientOid: string; // client order id
  orderTime: number; // Order Submitment time, milliseconds
  status: 'NEW' | 'DONE' | 'TRIGGERED' | 'CANCELLED'; // Order status
  orders: OCOOrderSubOrder[];
}

export interface OCOOrderSubOrder {
  id: string; // Sub-order ID
  symbol: string; // Symbol of the sub-order
  side: 'buy' | 'sell'; // Side of the sub-order
  price: string; // Price of the sub-order
  stopPrice: string; // Stop price of the sub-order
  size: string; // Size of the sub-order
  status: 'NEW' | 'DONE' | 'TRIGGERED' | 'CANCELLED'; // Status of the sub-order
}

export interface OCOOrders {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: OCOOrderListItem[];
}

export interface OCOOrderListItem {
  orderId: string; // order id, Unique order id created by users to identify their orders
  symbol: string; // symbol, such as, ETH-BTC
  clientOid: string; // client order id
  orderTime: number; // Order Submitment time, milliseconds
  status: 'NEW' | 'DONE' | 'TRIGGERED' | 'CANCELLED'; // Order status
}
