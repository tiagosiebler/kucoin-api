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
  symbol: string;
  opType: 'DEAL';
  type: 'limit' | 'market';
  side: 'buy' | 'sell';
  price: string;
  size: string;
  funds: string;
  dealFunds: string;
  dealSize: string;
  fee: string;
  feeCurrency: string;
  stp: string;
  timeInForce: 'GTC' | 'GTT' | 'IOC' | 'FOK';
  postOnly: boolean;
  hidden: boolean;
  iceberg: boolean;
  visibleSize: string;
  cancelAfter: number;
  channel: string;
  clientOid: string;
  remark: string;
  tags: string;
  active: boolean;
  inOrderBook: boolean;
  cancelExist: boolean;
  createdAt: number;
  lastUpdatedAt: number;
  tradeType: 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
}

export type HFMarginFilledOrder = HFMarginOrder & {
  inOrderBook: boolean; // Whether to enter the orderbook: true: enter the orderbook; false: not enter the orderbook
  active: boolean; // Order status: true-The status of the order is active; false-The status of the order is done
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
  type: 'limit' | 'market';
  stop: string;
  createdAt: number;
  tradeType: 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
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

export interface MarginLevTokenInfo {
  currency: string; // currency
  netAsset: number; // Net worth
  targetLeverage: string; // Target leverage
  actualLeverage: string; // Actual leverage
  assetsUnderManagement: string; // The amount of currency issued
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
  symbol: string; // The trading pair code
  symbolName: string; // Trading pair name
  baseCurrency: string; // Base currency type
  quoteCurrency: string; // Quote coin
  maxLeverage: number; // Maximum leverage
  flDebtRatio: string; // Liquidation debt ratio
  tradeEnable: boolean; // Trade switch
  autoRenewMaxDebtRatio: string; // During automatic renewal of the max debt ratio, the loan will only be renewed if it is lower than the debt ratio, with partial liquidation triggered for repayment if the debt ratio is in excess
  baseBorrowEnable: boolean; // base coin type borrow switch
  quoteBorrowEnable: boolean; // quote coin type borrow switch
  baseTransferInEnable: boolean; // base coin type transfer switch
  quoteTransferInEnable: boolean; // quote coin type transfer switch
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

export interface AssetInfo {
  symbol: string; // Trading pairs, with each trading pair indicating a position
  status: string; // The position status
  debtRatio: string; // Debt ratio
  baseAsset: AssetDetail;
  quoteAsset: AssetDetail;
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

/**
 *
 * Margin trading(v3)
 *
 */

export interface MarginOrderV3 {
  orderNo: string; // Borrow order number
  actualSize: number; // Actual borrowed amount
}

export interface MarginHistoryRecord {
  orderNo: string; // Borrow order ID
  symbol: string; // Isolated margin trading pair; empty for cross margin
  currency: string; // Currency
  size: number; // Initiated borrowing amount
  actualSize: number; // Actual borrowed amount
  status: string; // Status
  createdTime: number; // Time of borrowing
}

export interface MarginInterestRecord {
  createdAt: number;
  currency: string;
  interestAmount: string;
  dayRatio: string;
}

export interface MarginInterestRecords {
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
