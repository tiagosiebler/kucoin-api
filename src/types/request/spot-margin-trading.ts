/**
 *
 ***********
 * Margin Trading
 ***********
 *
 */

/**
 *
 * Margin HF trade
 *
 */

export interface SubmitHFMarginOrderRequest {
  clientOid: string;
  side: 'buy' | 'sell';
  symbol: string;
  type?: 'limit' | 'market';
  stp?: 'CN' | 'CO' | 'CB' | 'DC';
  isIsolated?: boolean;
  autoBorrow?: boolean;
  autoRepay?: boolean;
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

export interface HFMarginRequestOrder {
  symbol: string;
  tradeType: 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
}

export interface GetHFMarginFilledRequest {
  symbol: string;
  tradeType: 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
  side?: 'buy' | 'sell';
  type?: 'limit' | 'market';
  startAt?: number;
  endAt?: number;
  lastId?: number;
  limit?: number;
}

export interface getHFMarginFillsRequest {
  orderId?: string;
  symbol: string;
  tradeType: 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
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

export interface SubmitMarginOrderRequest {
  clientOid: string;
  side: 'buy' | 'sell';
  symbol: string;
  type?: 'limit' | 'market';
  remark?: string;
  stp?: 'CN' | 'CO' | 'CB' | 'DC';
  marginModel?: 'cross' | 'isolated';
  autoBorrow?: boolean;
  autoRepay?: boolean;
  price: string;
  size?: string;
  timeInForce?: 'GTC' | 'GTT' | 'IOC' | 'FOK';
  cancelAfter?: number;
  postOnly?: boolean;
  hidden?: boolean;
  iceberg?: boolean;
  visibleSize?: string;
  funds?: string;
}

/**
 *
 * Margin info
 *
 */

export interface MarginRiskLimitRequest {
  isIsolated: boolean;
  symbol?: string;
  currency?: string;
}

/**
 *
 * Isolated Margin
 *
 */

/**
 *
 * Margin trading(v3)
 *
 */

export interface MarginBorrowV3Request {
  isIsolated?: boolean;
  symbol?: string;
  currency: string;
  size: number;
  timeInForce: 'IOC' | 'FOK';
  isHf: boolean;
}

export interface MarginRepayV3Request {
  isIsolated?: boolean;
  symbol?: string;
  currency: string;
  size: number;
  isHf: boolean;
}

export interface MarginHistoryV3Request {
  currency: string;
  isIsolated?: boolean;
  symbol?: string;
  orderNo?: string;
  startTime?: number;
  endTime?: number;
  currentPage?: number;
  pageSize?: number;
}

export interface MarginInterestRecordsRequest {
  isIsolated?: boolean;
  symbol?: string;
  currency?: string;
  startTime?: number;
  endTime?: number;
  currentPage?: number;
  pageSize?: number;
}

/**
 *
 * Lending market(v3)
 *
 */

export interface InitiateLendingSubscriptionV3Request {
  currency: string;
  size: string;
  interestRate: string;
}

export interface InitiateLendingRedemptionV3Request {
  currency: string;
  size: string;
  purchaseOrderNo: string;
}

export interface ModifyLendingSubscriptionOrdersV3Request {
  currency: string;
  purchaseOrderNo: string;
  interestRate: string;
}

export interface GetLendingRedemptionOrdersV3Request {
  currency: string;
  redeemOrderNo?: string;
  status: 'DONE' | 'PENDING';
  currentPage?: number;
  pageSize?: number;
}

export interface GetLendingSubscriptionOrdersV3Request {
  currency: string;
  purchaseOrderNo?: string;
  status: 'DONE' | 'PENDING';
  currentPage?: number;
  pageSize?: number;
}

export interface GetBorrowInterestRateRequest {
  vipLevel?: number; // optional - If empty, default to current user vip level (0-12)
  currency?: string; // optional - Supports multiple currencies (up to 50), comma-separated
}

/**
 * Margin Stop Order Requests
 */
export interface SubmitMarginStopOrderRequest {
  clientOid: string; // Client Order ID
  side: 'buy' | 'sell'; // Order side
  symbol: string; // Trading symbol
  type?: 'limit' | 'market'; // Order type, default: limit
  remark?: string; // Order note, max 100 characters
  stop?: string; // Stop condition, default: loss
  stopPrice: string; // Trigger price (required)
  stp?: 'DC' | 'CO' | 'CN' | 'CB'; // Self Trade Prevention
  isIsolated: boolean; // True - isolated margin; false - cross margin
  autoRepay: boolean; // AutoPay for borrowed assets
  autoBorrow: boolean; // Auto borrow for insufficient balance
  price?: string; // Order price (required for limit orders)
  size?: string; // Order quantity (required for limit orders)
  timeInForce?: 'GTC' | 'GTT' | 'IOC' | 'FOK'; // Time in force
  cancelAfter?: number; // Cancel after n seconds (GTT strategy)
  postOnly?: boolean; // Passive order labels
  hidden?: boolean; // Hidden order
  iceberg?: boolean; // Iceberg order
  visibleSize?: string; // Visible size for iceberg orders
  funds?: string; // Order funds (for market orders)
}

export interface CancelMarginStopOrderByClientOidRequest {
  clientOid: string; // Client order ID
}

export interface BatchCancelMarginStopOrdersRequest {
  symbol?: string; // Trading symbol
  tradeType: 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE'; // Margin type (required)
  orderIds?: string; // Comma separated order IDs
}

export interface GetMarginStopOrdersListRequest {
  symbol?: string; // Trading symbol
  side?: string; // Order side (buy/sell)
  type?: 'limit' | 'market' | 'limit_stop' | 'market_stop'; // Order type
  tradeType?: 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE'; // Margin type
  startAt?: number; // Start time (millisecond)
  endAt?: number; // End time (millisecond)
  currentPage?: number; // Current page (>=1, default: 1)
  orderIds?: string; // Comma separated order IDs
  pageSize?: number; // Page size (>=10, <=500, default: 50)
  stop?: 'stop' | 'oco'; // Order type
}

export interface GetMarginStopOrderByOrderIdRequest {
  orderId: string; // Order ID
}

export interface GetMarginStopOrderByClientOidRequest {
  clientOid: string; // Client order ID
}

/**
 * Margin OCO Order Requests
 */
export interface SubmitMarginOcoOrderRequest {
  symbol: string; // Trading symbol (required)
  side: 'buy' | 'sell'; // Order side (required)
  price: string; // Order price (required)
  size: string; // Order quantity (required)
  stopPrice: string; // Trigger price (required)
  limitPrice: string; // Limit order price after trigger (required)
  clientOid: string; // Client Order ID (required)
  isIsolated: boolean; // true - isolated, false - cross (required)
  autoRepay?: boolean; // Auto repay
  autoBorrow?: boolean; // Auto borrow
}

export interface CancelMarginOcoOrderByOrderIdRequest {
  orderId: string; // Order ID
}

export interface CancelMarginOcoOrderByClientOidRequest {
  clientOid: string; // Client order ID
}

export interface BatchCancelMarginOcoOrdersRequest {
  orderIds?: string; // Comma separated order IDs
  symbol?: string; // Trading symbol
  tradeType?: 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE'; // Margin type
}

export interface GetMarginOcoOrderByClientOidRequest {
  clientOid: string; // Client order ID
}

export interface GetMarginOcoOrderDetailByOrderIdRequest {
  orderId: string; // Order ID
}
