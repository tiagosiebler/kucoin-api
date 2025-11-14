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

export interface HFMarginOrder {
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
  stop?: string | null;
  stopTriggered: boolean;
  stopPrice: string;
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
  tax: string;
  active: boolean;
  createdAt: number;
  lastUpdatedAt: number;
  cancelReason?: number;
}

/** @deprecated not used anymore **/
export type HFMarginFilledOrder = HFMarginOrder & {
  inOrderBook: boolean;
  active: boolean;
};

export interface HFMarginTransactionRecord {
  id: number;
  symbol: string;
  tradeId: number;
  orderId: string;
  counterOrderId: string;
  side: 'buy' | 'sell';
  liquidity: 'taker' | 'maker';
  forceTaker: boolean;
  price: string;
  size: string;
  funds: string;
  fee: string;
  feeRate: string;
  feeCurrency: string;
  stop: string;
  tradeType: 'TRADE' | 'MARGIN_TRADE';
  tax: string;
  taxRate: string;
  type: 'limit' | 'market';
  createdAt: number;
}

/**
 *
 * Orders
 *
 */

export interface SubmitMarginOrderResponse {
  orderId: string; // An order Id is returned once an order is successfully submitted.
  borrowSize?: number; // Borrowed amount. The field is returned only after placing the order under the mode of Auto-Borrow.
  loanApplyId?: string; // ID of the borrowing response. The field is returned only after placing the order under the mode of Auto-Borrow.
}

/**
 *
 * Margin info
 *
 */

export interface MarginActivePairsV3 {
  symbol: string;
  name: string;
  enableTrading: boolean;
  market: string;
  baseCurrency: string;
  quoteCurrency: string;
  baseIncrement: string;
  baseMinSize: string;
  baseMaxSize: string;
  quoteIncrement: string;
  quoteMinSize: string;
  quoteMaxSize: string;
  priceIncrement: string;
  feeCurrency: string;
  priceLimitRate: string;
  minFunds: string;
}

export interface MarginLevTokenInfo {
  currency: string; // currency
  netAsset: number; // Net worth
  targetLeverage: string; // Target leverage
  actualLeverage: string; // Actual leverage
  issuedSize: string; // The amount of currency issued
  basket: string; // basket information
}

export interface MarginMarkPrice {
  symbol: string; // symbol
  timePoint: number; // Time (millisecond)
  value: number; // Mark price
}

export interface MarginConfigInfo {
  currencyList: string[]; // Available currencies for margin trade
  warningDebtRatio: string; // The warning debt ratio of the forced liquidation
  liqDebtRatio: string; // The debt ratio of the forced liquidation
  maxLeverage: number; // Max leverage available
}

export interface MarginRiskLimit {
  timestamp: number;
  currency?: string;
  symbol?: string;
  borrowMaxAmount?: string;
  buyMaxAmount?: string;
  holdMaxAmount?: string;
  borrowCoefficient?: string;
  marginCoefficient?: string;
  precision?: number;
  borrowMinAmount?: string;
  borrowMinUnit?: string;
  borrowEnabled?: boolean;
  baseMaxBorrowAmount?: string;
  quoteMaxBorrowAmount?: string;
  baseMaxBuyAmount?: string;
  quoteMaxBuyAmount?: string;
  baseMaxHoldAmount?: string;
  quoteMaxHoldAmount?: string;
  basePrecision?: number;
  quotePrecision?: number;
  baseBorrowCoefficient?: string;
  quoteBorrowCoefficient?: string;
  baseMarginCoefficient?: string;
  quoteMarginCoefficient?: string;
  baseBorrowMinAmount?: string | null;
  quoteBorrowMinAmount?: string | null;
  baseBorrowMinUnit?: string | null;
  quoteBorrowMinUnit?: string | null;
  baseBorrowEnabled?: boolean;
  quoteBorrowEnabled?: boolean;
}

/**
 *
 * Isolated Margin
 *
 */

export interface IsolatedMarginSymbolsConfig {
  symbol: string;
  symbolName: string;
  baseCurrency: string;
  quoteCurrency: string;
  maxLeverage: number;
  flDebtRatio: string;
  tradeEnable: boolean;
  autoRenewMaxDebtRatio: string;
  baseBorrowEnable: boolean;
  quoteBorrowEnable: boolean;
  baseTransferInEnable: boolean;
  quoteTransferInEnable: boolean;
  baseBorrowCoefficient: string;
  quoteBorrowCoefficient: string;
}
export interface AssetDetail {
  currency: string; // Coin type Code
  totalBalance: string; // Current coin type asset amount
  holdBalance: string; // Current coin type frozen
  availableBalance: string; // The available balance
  liability: string; // Liability
  interest: string; // Interest
  borrowableAmount: string; // Borrowable amount
}
export interface AssetInfo {
  symbol: string; // Trading pairs, with each trading pair indicating a position
  status: string; // The position status
  debtRatio: string; // Debt ratio
  baseAsset: AssetDetail;
  quoteAsset: AssetDetail;
}

export interface IsolatedMarginAccountInfo {
  totalConversionBalance: string; // The total balance of the isolated margin account (in the specified coin)
  liabilityConversionBalance: string; // Total liabilities of the isolated margin account (in the specified coin)
  assets: AssetInfo[];
}

export interface SingleIsolatedMarginAccountInfo {
  symbol: string; // Trading pair
  status: string; // The position status
  debtRatio: string; // Debt ratio
  baseAsset: AssetDetail;
  quoteAsset: AssetDetail;
}

/**
 *
 * Margin trading(v3)
 *
 */

export interface MarginSubmitOrderV3Response {
  orderId: string;
  clientOid: string;
  borrowSize: string;
  loanApplyId: string;
}
export interface MarginOrderV3 {
  timestamp: number;
  orderNo: string; // Borrow order number
  actualSize: number; // Actual borrowed amount
}
export interface MarginBorrowHistoryRecord {
  orderNo: string; // Borrow order ID
  symbol: string; // Isolated margin trading pair; empty for cross margin
  currency: string; // Currency
  size: number; // Initiated borrowing amount
  actualSize: number; // Actual borrowed amount
  status: string; // Status
  createdTime: number; // Time of borrowing
}

export interface MarginBorrowHistoryV3 {
  timestamp: number;
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: MarginBorrowHistoryRecord[];
}
export interface MarginRepayHistoryRecord {
  orderNo: string;
  symbol: string | null;
  currency: string;
  size: string;
  principal: string;
  interest: string;
  status: string;
  createdTime: number;
}

export interface MarginRepayHistoryV3 {
  timestamp: number;
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: MarginRepayHistoryRecord[];
}

export interface MarginInterestRecord {
  currency: string;
  dayRatio: string;
  interestAmount: string;
  createdTime: number;
}

export interface MarginInterestRecords {
  timestamp: number;
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: MarginInterestRecord[];
}

/**
 *
 * Lending market(v3)
 *
 */

interface LendingMarketItem {
  currency: string; // Currency
  purchaseEnable: boolean; // Support subscription
  redeemEnable: boolean; // Support redemption
  increment: string; // Increment precision for subscription and redemption
  minPurchaseSize: string; // Minimum subscription amount
  minInterestRate: string; // Minimum annualized interest rate
  maxInterestRate: string; // Maximum annualized interest rate
  interestIncrement: string; // Increment precision for interest; default is 0.0001
  maxPurchaseSize: string; // Maximum subscription limit per user
  marketInterestRate: string; // Latest market annualized interest rate
  autoPurchaseEnable: boolean; // Auto-Subscribe enabled?: true: enable, false: disable
}

export interface LendingCurrencyV3 {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: LendingMarketItem[];
}

export interface LendingOrder {
  currency: string; // Currency
  purchaseOrderNo: string; // Subscription order number
  redeemOrderNo?: string; // Redemption order number
  redeemAmount?: string; // Redemption amount
  receiptAmount?: string; // Redeemed amount
  purchaseAmount?: string; // Total subscription amount
  lendAmount?: string; // Executed amount
  interestRate?: string; // Target annualized interest rate
  incomeAmount?: string; // Total earnings
  applyTime: number; // Time of subscription or redemption
  status: 'DONE' | 'PENDING'; // Status: DONE-completed; PENDING-settling
}

export interface LendingRedemption {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: LendingOrder[];
}

export interface BorrowInterestRateItem {
  currency: string; // Currency
  hourlyBorrowRate: string; // Hourly borrow rate
  annualizedBorrowRate: string; // Annualized borrow rate
}

export interface BorrowInterestRate {
  vipLevel: number; // The VIP level (0-12)
  items: BorrowInterestRateItem[]; // Array of currency borrow rates
}

/**
 * Margin Stop Order Response Types
 */
export interface MarginStopOrderResponse {
  orderId: string; // The unique order ID generated by the trading system
  clientOid: string; // The user self-defined order ID
}

export interface CancelMarginOrdersResponse {
  cancelledOrderIds: string[]; // Array of cancelled order IDs
}

export interface MarginStopOrderItem {
  id?: string; // Order ID
  symbol?: string; // Symbol name
  userId?: string; // User ID
  status?: 'NEW' | 'TRIGGERED'; // Order status
  type?: 'limit' | 'market'; // Order type
  side?: 'buy' | 'sell'; // Transaction direction
  price?: string; // Order price
  size?: string; // Order quantity
  funds?: string | null; // Order funds
  stp?: string | null; // Self Trade Prevention
  timeInForce?: 'GTC' | 'GTT' | 'IOC' | 'FOK'; // Time in force
  cancelAfter?: number; // Cancel after seconds
  postOnly?: boolean; // Post only
  hidden?: boolean; // Hidden order
  iceberg?: boolean; // Iceberg order
  visibleSize?: string | null; // Visible size for iceberg orders
  channel?: string; // Order source
  clientOid?: string; // Client order ID
  remark?: string | null; // Remarks
  tags?: string | null; // Tag order source
  relatedNo?: string | null; // Related number
  orderTime?: number; // Order time (nanoseconds)
  domainId?: string; // Domain ID
  tradeSource?: 'USER' | 'MARGIN_SYSTEM'; // Trade source
  tradeType?: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE'; // Trade type
  feeCurrency?: string; // Fee currency
  takerFeeRate?: string; // Taker fee rate
  makerFeeRate?: string; // Maker fee rate
  createdAt?: number; // Order creation time
  stop?: 'loss' | 'entry'; // Stop order type
  stopTriggerTime?: number | null; // Stop trigger time
  stopPrice?: string; // Stop price
  limitPrice?: string | null; // Limit price
  pop?: string | null; // POP
  activateCondition?: string | null; // Activate condition
}

export interface MarginStopOrdersList {
  currentPage: number; // Current page
  pageSize: number; // Page size
  totalNum: number; // Total number of stop orders
  totalPage: number; // Total pages
  items: MarginStopOrderItem[]; // Array of stop orders
}

/**
 * Margin OCO Order Response Types
 */
export interface MarginOcoOrderResponse {
  orderId: string; // The unique order ID generated by the trading system
}

export interface MarginOcoOrderItem {
  orderId: string; // Order ID
  symbol: string; // Symbol
  clientOid: string; // Client Order ID
  orderTime: number; // Order placement time (milliseconds)
  status: 'NEW' | 'DONE' | 'TRIGGERED' | 'CANCELLED'; // Order status
}

export interface MarginOcoOrderSubOrder {
  id: string; // Sub-order ID
  symbol: string; // Symbol of the sub-order
  side: 'buy' | 'sell'; // Side of the sub-order
  price: string; // Price of the sub-order
  stopPrice: string; // Stop price of the sub-order
  size: string; // Size of the sub-order
  status: 'NEW' | 'DONE' | 'TRIGGERED' | 'CANCELLED'; // Status of the sub-order
}

export interface MarginOcoOrderDetails {
  orderId: string; // Order ID
  symbol: string; // Symbol
  clientOid: string; // Client Order ID
  orderTime: number; // Order placement time (milliseconds)
  status: 'NEW' | 'DONE' | 'TRIGGERED' | 'CANCELLED'; // Order status
  orders: MarginOcoOrderSubOrder[]; // Sub-orders array
}

/**
 * Get Margin Collateral Ratio Response
 */
export interface MarginCollateralRatioItem {
  lowerLimit: string;
  upperLimit: string;
  collateralRatio: string;
}

export interface MarginCollateralRatioData {
  currencyList: string[];
  items: MarginCollateralRatioItem[];
}
