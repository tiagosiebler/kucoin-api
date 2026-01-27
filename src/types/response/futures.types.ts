/**
 * REST - ACCOUNT  - BASIC INFO
 * Get Account Ledgers - Futures
 */

export interface FuturesAccountTransaction {
  time: number; // Event time
  type: 'RealisedPNL' | 'Deposit' | 'Withdrawal' | 'TransferIn' | 'TransferOut'; // Type
  amount: number; // Transaction amount
  fee: number | null; // Fees
  accountEquity: number; // Account equity
  status: 'Completed' | 'Pending'; // Status
  remark: string; // Ticker symbol of the contract
  offset: number; // Offset
  currency: string; // Currency
}

/**
 * REST - ACCOUNT  - SUBACCOUNT API
 */

export interface SubAccountAPI {
  apiKey: string; // API-Key
  createdAt: number; // Time of the event
  ipWhitelist: string; // IP whitelist
  permission: string; // Permissions
  remark: string; // Remarks
  subName: string; // Sub-account name
}

export type CreateSubAccountAPI = SubAccountAPI & {
  apiSecret: string; // API secret
  passphrase: string; // Password
};

export interface UpdateSubAccountAPI {
  apiKey: string; // API-Key
  ipWhitelist: string; // IP whitelist
  permission: string; // Permissions
  subName: string; // Sub-account name
}

/**
 * REST - FUNDING - FUNDING OVERVIEW
 */

export interface AccountBalance {
  accountEquity: number; // Account equity = marginBalance + Unrealised PNL
  unrealisedPNL: number; // Unrealised profit and loss
  marginBalance: number; // Margin balance = positionMargin + orderMargin + frozenFunds + availableBalance - unrealisedPNL
  positionMargin: number; // Position margin
  orderMargin: number; // Order margin
  frozenFunds: number; // Frozen funds for withdrawal and out-transfer
  availableBalance: number; // Available balance
  currency: string; // currency code
  riskRatio: number; // Cross margin risk ratio
  maxWithdrawAmount: number; // Maximum withdrawal amount
  availableMargin: number; // Cross margin available balance
}

export interface AccountSummary {
  accountEquityTotal: number; // Total Account Equity
  unrealisedPNLTotal: number; // Total unrealisedPNL
  marginBalanceTotal: number; // Total Margin Balance
  positionMarginTotal: number; // Total Position margin
  orderMarginTotal: number; // Total Order Margin
  frozenFundsTotal: number; // Total frozen funds for withdrawal and out-transfer
  availableBalanceTotal: number; // total available balance
  currency: string; // currency
}

export interface FuturesSubAccount {
  accountName: string;
  accountEquity: number;
  unrealisedPNL: number;
  marginBalance: number;
  positionMargin: number;
  orderMargin: number;
  frozenFunds: number;
  availableBalance: number;
  currency: string;
}

/**
 * REST - FUNDING - TRANSFER
 */

export interface TransferDetail {
  applyId: string; // Transfer-out request ID
  bizNo: string; // Business number
  payAccountType: string; // Pay account type
  payTag: string; // Pay account sub type
  remark: string; // User remark
  recAccountType: string; // Receive account type
  recTag: string; // Receive account sub type
  recRemark: string; // Receive account tx remark
  recSystem: string; // Receive system
  status: string; // Status: APPLY, PROCESSING, PENDING_APPROVAL, APPROVED, REJECTED, PENDING_CANCEL, CANCEL, SUCCESS
  currency: string; // Currency
  amount: string; // Transfer amount
  fee: string; // Transfer fee
  sn: number; // Serial number
  reason: string; // Fail Reason
  createdAt: number; // Create time
  updatedAt: number; // Update time
}

interface TransferOutRequestRecord {
  applyId: string; // Transfer-out request ID
  currency: string; // Currency
  recRemark: string; // Receive account tx remark
  recSystem: string; // Receive system
  status: string; // Status: PROCESSING, SUCCESS, FAILURE
  amount: string; // Transaction amount
  reason: string; // Reason caused the failure
  offset: number; // Offset
  createdAt: number; // Request application time
  remark: string; // User remark
}

export interface FuturesTransferRecords {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: TransferOutRequestRecord[];
}

/**
 *
 * Futures Market Data
 *
 */

export interface FuturesSymbolInfo {
  symbol: string;
  rootSymbol: string;
  type: 'FFWCSX' | 'FFICSX';
  firstOpenDate: number;
  expireDate: number | null;
  settleDate: number | null;
  baseCurrency: string;
  quoteCurrency: string;
  settleCurrency: string;
  /** Display symbol for multilingual compatibility (added 2025.12.26 & 2026.01.12) */
  displaySymbol?: string;
  /** Display base currency for multilingual compatibility (added 2025.12.26 & 2026.01.12) */
  displayBaseCurrency?: string;
  maxOrderQty: number;
  maxPrice: number;
  lotSize: number;
  tickSize: number;
  indexPriceTickSize: number;
  multiplier: number;
  initialMargin: number;
  maintainMargin: number;
  maxRiskLimit: number;
  minRiskLimit: number;
  riskStep: number;
  makerFeeRate: number;
  takerFeeRate: number;
  takerFixFee: number;
  makerFixFee: number;
  settlementFee: number | null;
  isDeleverage: boolean;
  isQuanto: boolean;
  isInverse: boolean;
  markMethod: 'FairPrice';
  fairMethod: 'FundingRate';
  fundingBaseSymbol: string;
  fundingQuoteSymbol: string;
  fundingRateSymbol: string;
  indexSymbol: string;
  settlementSymbol: string | null;
  status:
    | 'Init'
    | 'Open'
    | 'BeingSettled'
    | 'Settled'
    | 'Paused'
    | 'Closed'
    | 'CancelOnly';
  fundingFeeRate: number;
  predictedFundingFeeRate: number;
  fundingRateGranularity: number;
  effectiveFundingRateCycleStartTime: number; // Funding rate time interval (fundingRateGranularity) configuration start effective time
  currentFundingRateGranularity: number; // Current effective funding rate period granularity (e.g., 8 hours/4 hours)
  openInterest: string;
  turnoverOf24h: number;
  volumeOf24h: number;
  markPrice: number;
  indexPrice: number;
  lastTradePrice: number;
  nextFundingRateTime: number;
  maxLeverage: number;
  sourceExchanges: string[];
  premiumsSymbol1M: string;
  premiumsSymbol8H: string;
  fundingBaseSymbol1M: string;
  fundingQuoteSymbol1M: string;
  lowPrice: number;
  highPrice: number;
  priceChgPct: number;
  priceChg: number;
  k: number;
  m: number;
  f: number;
  mmrLimit: number;
  mmrLevConstant: number;
  supportCross: boolean;
}

export interface TickerDetail {
  sequence: number; // Sequence number
  symbol: string; // Symbol
  side: string; // Side of liquidity taker
  size: number; // Filled quantity
  price: string; // Filled price
  bestBidSize: number; // Best bid size
  bestBidPrice: string; // Best bid price
  bestAskSize: number; // Best ask size
  bestAskPrice: string; // Best ask price
  tradeId: string; // Transaction ID
  ts: number; // Filled time - nanosecond
}

export interface MarketTradeDetail {
  sequence: number; // Sequence number
  tradeId: string; // Transaction ID
  takerOrderId: string; // Taker order ID
  makerOrderId: string; // Maker order ID
  price: string; // Filled price
  size: number; // Filled quantity
  side: string; // Side-taker
  ts: number; // Filled time - nanosecond
}

export interface FullOrderBookDetail {
  symbol: string; // Symbol
  sequence: number; // Ticker sequence number
  asks: [number, number][]; // asks. [Price, quantity]
  bids: [number, number][]; // bids. [Price, quantity]
  ts: number; // Timestamp
}

export type FuturesKline = [
  number, // Time
  number, // Entry price
  number, // Highest price
  number, // Lowest price
  number, // Close price
  number, // Trading volume(lots)
  number, // Trading volume
];

export interface InterestRateItem {
  symbol: string; // Symbol of the Bitcoin Lending Rate
  granularity: number; // Granularity (millisecond)
  timePoint: number; // Time point (millisecond)
  value: number; // Interest rate value
}

export interface IndexListItem {
  symbol: string; // Symbol of Bitcoin spot
  granularity: number; // Granularity (millisecond)
  timePoint: number; // Time point (millisecond)
  value: number; // Index Value
  decomposionList: {
    exchange: string; // Exchange
    price: number; // Last traded price
    weight: number; // Weight
  }[];
}

export interface FuturesMarkPrice {
  symbol: string; // Symbol
  granularity: number; // Granularity (millisecond)
  timePoint: number; // Time point (millisecond)
  value: number; // Mark price
  indexPrice: number; // Index price
}

export interface PremiumIndexItem {
  symbol: string; // Premium index symbol
  granularity: number; // Granularity (millisecond)
  timePoint: number; // Time point (millisecond)
  value: number; // Premium index
}

/**
 *
 ***********
 * Account
 ***********
 *
 */

/**
 *
 * Orders
 *
 */

export interface FuturesOrder {
  id: string;
  symbol: string;
  type: 'market' | 'limit';
  side: 'buy' | 'sell';
  price: string;
  size: number;
  value: string;
  dealValue: string;
  dealSize: number;
  stp: 'CN' | 'CO' | 'CB' | '';
  stop: string;
  stopPriceType: 'TP' | 'MP' | 'IP' | '';
  stopTriggered: boolean;
  stopPrice: number | null;
  /**
   * Time in Force. Added 'RPI' as of 2025.01.02
   * - GTC: Good Till Cancel
   * - IOC: Immediate Or Cancel
   * - RPI: Retail Price Improvement Order (Phase 1: Futures only)
   */
  timeInForce: string;
  postOnly: boolean;
  hidden: boolean;
  iceberg: boolean;
  leverage: string;
  forceHold: boolean;
  closeOrder: boolean;
  visibleSize: number;
  clientOid: string;
  remark: string | null;
  tags: string;
  isActive: boolean;
  cancelExist: boolean;
  createdAt: number;
  /** Updated time, standardized to nanoseconds as of 2026.01.12 */
  updatedAt: number;
  endAt: number | null;
  /** Order time, standardized to nanoseconds as of 2026.01.12 */
  orderTime: number;
  settleCurrency: string;
  marginMode: 'ISOLATED' | 'CROSS';
  avgDealPrice: string;
  filledSize: number;
  filledValue: string;
  status: 'open' | 'done';
  reduceOnly: boolean;
}

export interface BatchCancelOrderResult {
  orderId: string | null;
  clientOid: string | null;
  code: string;
  msg: string;
}

export interface SubmitMultipleOrdersFuturesResponse {
  orderId: string;
  clientOid: string;
  symbol: string;
  code: string;
  msg: string;
}

export interface FuturesOrders {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: FuturesOrder[];
}

/**
 *
 * Futures Fills
 *
 */

export interface FuturesFill {
  symbol: string;
  tradeId: string;
  orderId: string;
  side: 'buy' | 'sell';
  liquidity: 'taker' | 'maker';
  forceTaker: boolean;
  price: string;
  size: number;
  value: string;
  openFeePay: string;
  closeFeePay: string;
  stop: string;
  feeRate: string;
  fixFee: string; // Deprecated field
  feeCurrency: string;
  marginMode: 'ISOLATED' | 'CROSS';
  fee: string;
  settleCurrency: string;
  orderType: 'market' | 'limit';
  displayType: 'limit' | 'market' | 'limit_stop' | 'market_stop';
  tradeType: 'trade' | 'cancel' | 'liquid' | 'adl' | 'settlement';
  subTradeType: string | null; // Deprecated field
  /** Trade time (execution time), standardized to nanoseconds as of 2026.01.12 */
  tradeTime: number;
  createdAt: number;
  /** Whether it is an RPI trade (added 2025.01.02) */
  isRpiTrade?: boolean;
}

export interface FuturesFills {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: FuturesFill[];
}

export interface FuturesActiveOrder {
  openOrderBuySize: number; // Total number of the unexecuted buy orders
  openOrderSellSize: number; // Total number of the unexecuted sell orders
  openOrderBuyCost: string; // Value of all the unexecuted buy orders
  openOrderSellCost: string; // Value of all the unexecuted sell orders
  settleCurrency: string; // settlement currency
}

/**
 *
 * Futures Positions
 *
 */

export interface BatchMarginModeUpdateResponse {
  marginMode: {
    [symbol: string]: 'ISOLATED' | 'CROSS';
  };
  errors: {
    code: string;
    msg: string;
    symbol: string;
  }[];
}

export interface GetPositionModeResponse {
  positionMode: 0 | 1; // 0 = one-way mode, 1 = hedge mode
}

export interface MaxOpenSize {
  symbol: string;
  maxBuyOpenSize: number;
  maxSellOpenSize: number;
}

export interface FuturesPosition {
  id: string;
  symbol: string;
  marginMode: 'CROSS' | 'ISOLATED';
  crossMode: boolean;
  delevPercentage: number;
  openingTimestamp: number;
  currentTimestamp: number;
  currentQty: number;
  currentCost: number;
  currentComm: number;
  realisedGrossPnl: number;
  realisedGrossCost: number;
  realisedCost: number;
  unrealisedCost: number;
  unrealisedPnlPcnt: number;
  unrealisedPnl: number;
  unrealisedRoePcnt: number;
  isOpen: boolean;
  markPrice: number;
  markValue: number;
  posCost: number;
  posInit: number;
  posMargin: number;
  realisedPnl: number;
  avgEntryPrice: number;
  liquidationPrice: number;
  bankruptPrice: number;
  settleCurrency: string;
  isInverse: boolean;
  positionSide: 'BOTH';
  leverage: number;

  // Isolated margin specific fields
  autoDeposit?: boolean;
  maintMarginReq?: number;
  riskLimit?: number;
  realLeverage?: number;
  posCross?: number;
  posCrossMargin?: number;
  posComm?: number;
  posCommCommon?: number;
  posLoss?: number;
  posFunding?: number;
  posMaint?: number;
  maintMargin?: number;
  maintainMargin?: number;
  riskLimitLevel?: number;
}

export interface AddMargin {
  id: string; // Position ID
  symbol: string; // Symbol of the contract
  autoDeposit: boolean; // Auto deposit margin or not
  maintMarginReq: number; // Maintenance margin requirement
  riskLimit: number; // Risk limit
  realLeverage: number; // Leverage of the order
  crossMode: boolean; // Cross mode or not
  delevPercentage: number; // ADL ranking percentile
  openingTimestamp: number; // Open time
  currentTimestamp: number; // Current timestamp
  currentQty: number; // Current position quantity
  currentCost: number; // Current position value
  currentComm: number; // Current commission
  unrealisedCost: number; // Unrealised value
  realisedGrossCost: number; // Accumulated realised gross profit value
  realisedCost: number; // Current realised position value
  isOpen: boolean; // Opened position or not
  markPrice: number; // Mark price
  markValue: number; // Mark value
  posCost: number; // Position value
  posCross: number; // added margin
  posInit: number; // Leverage margin
  posComm: number; // Bankruptcy cost
  posLoss: number; // Funding fees paid out
  posMargin: number; // Position margin
  posMaint: number; // Maintenance margin
  maintMargin: number; // Position margin
  realisedGrossPnl: number; // Accumulated realised gross profit value
  realisedPnl: number; // Realised profit and loss
  unrealisedPnl: number; // Unrealised profit and loss
  unrealisedPnlPcnt: number; // Profit-loss ratio of the position
  unrealisedRoePcnt: number; // Rate of return on investment
  avgEntryPrice: number; // Average entry price
  liquidationPrice: number; // Liquidation price
  bankruptPrice: number; // Bankruptcy price
  settleCurrency: string; // Currency used to clear and settle the trades
  userId: number; // userId
}

export interface CrossMarginRiskLimit {
  symbol: string;
  maxOpenSize: number;
  maxOpenValue: string;
  totalMargin: string;
  price: string;
  leverage: string;
  mmr: string;
  imr: string;
  currency: string;
}

export interface CrossMarginRequirement {
  symbol: string;
  imr: string;
  mmr: string;
  size: number;
  positionValue: string;
  price: string;
}

/**
 *
 * Futures risk limit
 *
 */

export interface FuturesRiskLimit {
  symbol: string; // Path parameter. Symbol of the contract.
  level: number; // level
  maxRiskLimit: number; // Upper limit (includes)
  minRiskLimit: number; // Lower limit
  maxLeverage: number; // Max leverage
  initialMargin: number; // Initial margin rate
  maintainMargin: number; // Maintenance margin rate
}

/**
 *
 * Futures funding fees
 *
 */

export interface FuturesCurrentFundingRate {
  symbol: string; // Funding Rate Symbol
  granularity: number; // Granularity (milliseconds)
  timePoint: number; // Time point (milliseconds)
  value: number; // Funding rate
  predictedValue: number; // Predicted funding rate
  fundingRateCap: number; // Funding rate cap
  fundingRateFloor: number; // Funding rate floor
  period: number; // Funding rate period
  fundingTime: number; // Funding time
}

export interface FuturesHistoricFundingRate {
  symbol: string; // Symbol of the contract
  timePoint: number; // Time point (milliseconds)
  fundingRate: number; // Funding rate
}

export interface FuturesAccountFundingRateHistory {
  id: number;
  symbol: string;
  timePoint: number;
  fundingRate: number;
  markPrice: number;
  positionQty: number;
  positionCost: number;
  funding: number;
  settleCurrency: string;
  context: string; // JSON string containing additional details
  marginMode: 'ISOLATED' | 'CROSS';
}

export interface FuturesClosedPosition {
  closeId: string;
  userId: string;
  symbol: string;
  settleCurrency: string;
  leverage: string;
  type: string;
  pnl: string;
  realisedGrossCost: string;
  withdrawPnl: string;
  tradeFee: string;
  fundingFee: string;
  openTime: number;
  closeTime: number;
  openPrice: string;
  closePrice: string;
  marginMode: 'CROSS' | 'ISOLATED';
}

export interface FuturesClosedPositions {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: FuturesClosedPosition[];
}

/**
 *
 * Copy Trading
 *
 */

export interface CopyTradePosition {
  id: string;
  symbol: string;
  autoDeposit: boolean;
  maintMarginReq: string;
  riskLimit: number;
  realLeverage: string;
  crossMode: boolean;
  marginMode: string;
  positionSide: string;
  leverage: string;
  delevPercentage: number;
  openingTimestamp: number;
  currentTimestamp: number;
  currentQty: number;
  currentCost: string;
  currentComm: string;
  unrealisedCost: string;
  realisedGrossCost: string;
  realisedCost: string;
  isOpen: boolean;
  markPrice: string;
  markValue: string;
  posCost: string;
  posCross: string;
  posInit: string;
  posComm: string;
  posLoss: string;
  posMargin: string;
  posMaint: string;
  maintMargin: string;
  realisedGrossPnl: string;
  realisedPnl: string;
  unrealisedPnl: string;
  unrealisedPnlPcnt: string;
  unrealisedRoePcnt: string;
  avgEntryPrice: string;
  liquidationPrice: string;
  bankruptPrice: string;
  settleCurrency: string;
}

/**
 * Switch Margin Mode Response (Copy Trading)
 */
export interface CopyTradeSwitchMarginModeResponse {
  symbol: string;
  marginMode: 'ISOLATED' | 'CROSS';
}

/**
 * Get Cross Margin Requirement Response (Copy Trading)
 */
export interface CopyTradeCrossMarginRequirement {
  imr: string;
  mmr: string;
  positionValue: string;
  price: string;
  size: number;
  symbol: string;
}

/**
 * Switch Position Mode Response (Copy Trading)
 */
export interface CopyTradeSwitchPositionModeResponse {
  positionMode: '0' | '1'; // 0 = one-way mode, 1 = hedge mode
}
