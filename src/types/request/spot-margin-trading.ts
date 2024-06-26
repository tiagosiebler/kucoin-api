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

export interface HFMarginOrder {
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
