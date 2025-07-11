/**
 *
 ***********
 * Spot Convert
 ***********
 *
 */

/**
 * Get Convert Symbol
 */
export interface GetConvertSymbolRequest {
  fromCurrency: string;
  toCurrency: string;
  orderType?: 'MARKET' | 'LIMIT';
}

/**
 * Add Convert Order
 */
export interface AddConvertOrderRequest {
  clientOrderId: string;
  quoteId: string;
  accountType?: 'BOTH' | 'FUNDING' | 'TRADING';
}

/**
 * Get Convert Quote
 */
export interface GetConvertQuoteRequest {
  fromCurrency: string;
  toCurrency: string;
  fromCurrencySize?: number;
  toCurrencySize?: number;
}

/**
 * Get Convert Order Detail
 */
export interface GetConvertOrderDetailRequest {
  clientOrderId?: string;
  orderId?: string;
}

/**
 * Get Convert Order History
 */
export interface GetConvertOrderHistoryRequest {
  startAt?: number;
  endAt?: number;
  page?: number;
  pageSize?: number;
  status?: 'OPEN' | 'SUCCESS' | 'FAIL';
}

/**
 * Add Convert Limit Order
 */
export interface AddConvertLimitOrderRequest {
  clientOrderId: string;
  fromCurrency: string;
  toCurrency: string;
  fromCurrencySize: number;
  toCurrencySize: number;
  accountType?: 'BOTH' | 'FUNDING' | 'TRADING';
}

/**
 * Get Convert Limit Quote
 */
export interface GetConvertLimitQuoteRequest {
  fromCurrency: string;
  toCurrency: string;
  fromCurrencySize?: number;
  toCurrencySize?: number;
}

/**
 * Get Convert Limit Order Detail
 */
export interface GetConvertLimitOrderDetailRequest {
  clientOrderId?: string;
  orderId?: string;
}

/**
 * Get Convert Limit Orders
 */
export interface GetConvertLimitOrdersRequest {
  startAt?: number;
  endAt?: number;
  page?: number;
  pageSize?: number;
  status?: 'OPEN' | 'SUCCESS' | 'FAIL' | 'CANCELLED';
}

/**
 * Cancel Convert Limit Order
 */
export interface CancelConvertLimitOrderRequest {
  clientOrderId?: string;
  orderId?: string;
}
