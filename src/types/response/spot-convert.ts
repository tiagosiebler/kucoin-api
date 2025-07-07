/**
 *
 ***********
 * Spot Convert
 ***********
 *
 */

/**
 * Get Convert Symbol Response
 */
export interface ConvertSymbol {
  fromCurrency: string;
  toCurrency: string;
  fromCurrencyMaxSize: string;
  fromCurrencyMinSize: string;
  fromCurrencyStep: string;
  toCurrencyMaxSize: string;
  toCurrencyMinSize: string;
  toCurrencyStep: string;
}

/**
 * Convert Currency Info
 */
export interface ConvertCurrency {
  currency: string;
  maxSize: string;
  minSize: string;
  step: string;
  tradeDirection: string;
}

/**
 * USDT Currency Limit Info
 */
export interface UsdtCurrencyLimit {
  currency: string;
  maxSize: string;
  minSize: string;
  step: string;
}

/**
 * Get Convert Currencies Response
 */
export interface ConvertCurrencies {
  currencies: ConvertCurrency[];
  usdtCurrencyLimit: UsdtCurrencyLimit[];
}

/**
 * Add Convert Order Response
 */
export interface SubmitConvertOrderResponse {
  orderId: string;
  clientOrderId: string;
}

/**
 * Get Convert Quote Response
 */
export interface ConvertQuote {
  quoteId: string;
  price: string;
  fromCurrencySize: string;
  toCurrencySize: string;
  validUntill: number;
}

/**
 * Convert Order Detail
 */
export interface ConvertOrder {
  orderId: number;
  clientOrderId: string;
  status: 'OPEN' | 'SUCCESS' | 'FAIL';
  fromCurrency: string;
  toCurrency: string;
  fromCurrencySize: string;
  toCurrencySize: string;
  accountType: 'BOTH' | 'FUNDING' | 'TRADING';
  price: string;
  orderTime: number;
}

/**
 * Get Convert Order History Response
 */
export interface ConvertOrderHistory {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: ConvertOrder[];
}

/**
 * Add Convert Limit Order Response
 */
export interface SumbitConvertLimitResp {
  orderId: string;
  clientOrderId: string;
}

/**
 * Get Convert Limit Quote Response
 */
export interface ConvertLimitQuote {
  price: string;
  validUntill: number;
}

/**
 * Convert Limit Order Detail
 */
export interface ConvertLimitOrder {
  orderId: string;
  clientOrderId: string;
  status: 'OPEN' | 'SUCCESS' | 'FAIL' | 'CANCELLED';
  fromCurrency: string;
  toCurrency: string;
  fromCurrencySize: string;
  toCurrencySize: string;
  accountType: string;
  price: string;
  orderTime: number;
  expiryTime: number;
  cancelTime?: number;
  filledTime?: number;
  cancelType?: number;
}

/**
 * Get Convert Limit Orders Response
 */
export interface ConvertLimitOrdersList {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: ConvertLimitOrder[];
}
