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

export interface GetSpotKlinesRequest {
  symbol: string;
  startAt?: number;
  endAt?: number;
  type:
    | '1min'
    | '3min'
    | '5min'
    | '15min'
    | '30min'
    | '1hour'
    | '2hour'
    | '4hour'
    | '6hour'
    | '8hour'
    | '12hour'
    | '1day'
    | '1week'
    | '1month';
}

/**
 *
 * Spot HF trade
 *
 */

export interface SubmitHFOrderRequest {
  // Required fields
  type: 'limit' | 'market';
  symbol: string;
  side: 'buy' | 'sell';

  // Optional base fields
  clientOid?: string;
  stp?: 'DC' | 'CO' | 'CN' | 'CB';
  tags?: string;
  remark?: string;

  // Limit order fields
  price?: string;
  size?: string;
  timeInForce?: 'GTC' | 'GTT' | 'IOC' | 'FOK';
  cancelAfter?: number;
  postOnly?: boolean;
  hidden?: boolean;
  iceberg?: boolean;
  visibleSize?: string;

  // Market order fields
  funds?: string; // Required for market orders if size is not provided
}

export interface ModifyHFOrderRequest {
  symbol: string;
  clientOid?: string;
  orderId?: string;
  newPrice?: string;
  newSize?: string;
}

export interface CancelSpecifiedNumberHFOrdersRequest {
  orderId: string;
  symbol: string;
  cancelSize: string;
}

export interface GetHFCompletedOrdersRequest {
  symbol: string;
  side?: 'buy' | 'sell';
  type?: 'limit' | 'market';
  startAt?: number;
  endAt?: number;
  lastId?: number;
  limit?: number;
}

export interface GetHFFilledListRequest {
  orderId?: string;
  symbol: string;
  side?: 'buy' | 'sell';
  type?: 'limit' | 'market';
  startAt?: number;
  endAt?: number;
  lastId?: number;
  limit?: number;
}

/**
 *
 * Orders
 *
 */

export interface SubmitOrderRequest {
  clientOid: string;
  side: 'buy' | 'sell';
  symbol: string;
  type?: 'limit' | 'market';
  remark?: string;
  stp?: 'CN' | 'CO' | 'CB' | 'DC';
  tradeType?: 'TRADE' | 'MARGIN_TRADE';
  price?: string;
  size?: string;
  timeInForce?: 'GTC' | 'GTT' | 'IOC' | 'FOK';
  cancelAfter?: number;
  postOnly?: boolean;
  hidden?: boolean;
  iceberg?: boolean;
  visibleSize?: string;
  funds?: string;
}

export interface SubmitMultipleOrdersRequest {
  clientOid: string;
  side: 'buy' | 'sell';
  type?: 'limit';
  remark?: string;
  stop?: 'loss' | 'entry';
  stopPrice?: string;
  stp?: 'CN' | 'CO' | 'CB' | 'DC';
  tradeType?: 'TRADE';
  price: string;
  size: string;
  timeInForce?: 'GTC' | 'GTT' | 'IOC' | 'FOK';
  cancelAfter?: number;
  postOnly?: boolean;
  hidden?: boolean;
  iceberg?: boolean;
  visibleSize?: string;
}

export interface CancelAllOrdersRequest {
  symbol?: string;
  tradeType?: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
}

export interface GetOrderListRequest {
  status?: 'active' | 'done';
  symbol?: string;
  side?: 'buy' | 'sell';
  type?: 'limit' | 'market' | 'limit_stop' | 'market_stop';
  tradeType?: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
  startAt?: number;
  endAt?: number;
  currentPage?: number;
  pageSize?: number;
}

/**
 *
 * Fills
 *
 */

export interface GetFillsRequest {
  orderId?: string;
  symbol?: string;
  side?: 'buy' | 'sell';
  type?: 'limit' | 'market' | 'limit_stop' | 'market_stop';
  startAt?: number;
  endAt?: number;
  tradeType: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
}

/**
 *
 * Stop order
 *
 */

export interface SubmitStopOrderRequest {
  // Required fields
  symbol: string;
  side: 'buy' | 'sell';
  stopPrice: string;
  type: 'limit' | 'market';

  // Optional base fields
  clientOid?: string;
  stp?: 'DC' | 'CO' | 'CN' | 'CB';
  remark?: string;
  tradeType?: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';

  // Limit order required fields (when type is 'limit')
  price?: string;
  size?: string;
  timeInForce?: 'GTC' | 'GTT' | 'IOC' | 'FOK';

  // Optional limit order fields
  cancelAfter?: number;
  postOnly?: boolean;
  hidden?: boolean;
  iceberg?: boolean;
  visibleSize?: string;

  // Market order fields (when type is 'market')
  funds?: string; // Required for market orders if size is not provided
}

export interface CancelStopOrdersRequest {
  symbol?: string;
  tradeType?: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
  orderIds?: string;
}

export interface GetStopOrdersListRequest {
  symbol?: string;
  side?: 'buy' | 'sell';
  type?: 'limit' | 'market' | 'limit_stop' | 'market_stop';
  tradeType?: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
  startAt?: number;
  endAt?: number;
  currentPage?: number;
  orderIds?: string;
  pageSize?: number;
  stop?: 'stop' | 'oco';
}

/**
 *
 * OCO order
 *
 */

export interface SubmitOCOOrderRequest {
  symbol: string;
  side: 'buy' | 'sell';
  price: string;
  size: string;
  stopPrice: string;
  limitPrice: string;
  tradeType?: 'TRADE'; // Currently only supports TRADE
  clientOid: string;
  remark?: string;
}

export interface GetOCOOrdersRequest {
  pageSize: string;
  currentPage: string;
  symbol?: string;
  startAt?: number;
  endAt?: number;
  orderIds?: string;
}
