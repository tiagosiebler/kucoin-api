/**
 * REST - ACCOUNT  - BASIC INFO
 * Get Account Ledgers - Futures
 */

interface AccountTransactionItem {
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

export interface AccountTransactions {
  hasMore: boolean; // Whether there are more pages
  dataList: AccountTransactionItem[];
}

/**
 * REST - ACCOUNT  - SUBACCOUNT API
 */

export interface SubAccountAPIItem {
  apiKey: string; // API-Key
  createdAt: number; // Time of the event
  ipWhitelist: string; // IP whitelist
  permission: string; // Permissions
  remark: string; // Remarks
  subName: string; // Sub-account name
}

export interface GetSubAccountAPIsResponse {
  data: SubAccountAPIItem[];
}

export interface CreateSubAccountAPI extends SubAccountAPIItem {
  apiSecret: string; // API secret
  passphrase: string; // Password
}

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

export interface SubBalance extends AccountBalance {
  accountName: string; // Account name, main account is main
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

export interface SymbolDetail {
  symbol: string; // Contract status
  rootSymbol: string; // Contract group
  type: string; // Type of the contract
  firstOpenDate: number; // First Open Date
  expireDate: number | null; // Expiration date. Null means it will never expire
  settleDate: number | null; // Settlement date. Null indicates that automatic settlement is not supported
  baseCurrency: string; // Base currency
  quoteCurrency: string; // Quote currency
  settleCurrency: string; // Currency used to clear and settle the trades
  maxOrderQty: number; // Maximum order quantity
  maxPrice: number; // Maximum order price
  lotSize: number; // Minimum lot size
  tickSize: number; // Minimum price changes
  indexPriceTickSize: number; // Index price of tick size
  multiplier: number; // Contract multiplier
  initialMargin: number; // Initial margin requirement
  maintainMargin: number; // Maintenance margin requirement
  maxRiskLimit: number; // Maximum risk limit (unit: XBT)
  minRiskLimit: number; // Minimum risk limit (unit: XBT)
  riskStep: number; // Risk limit increment value (unit: XBT)
  makerFeeRate: number; // Maker fees
  takerFeeRate: number; // Taker fees
  takerFixFee: number; // Fixed taker fees(Deprecated field, no actual use of the value field)
  makerFixFee: number; // Fixed maker fees(Deprecated field, no actual use of the value field)
  settlementFee: number | null; // settlement fee
  isDeleverage: boolean; // Enabled ADL or not
  isQuanto: boolean; // Whether quanto or not(Deprecated field, no actual use of the value field)
  isInverse: boolean; // Reverse contract or not
  markMethod: string; // Marking method
  fairMethod: string; // Fair price marking method
  fundingBaseSymbol: string; // Ticker symbol of the based currency
  fundingQuoteSymbol: string; // Ticker symbol of the quote currency
  fundingRateSymbol: string; // Funding rate symbol
  indexSymbol: string; // Index symbol
  settlementSymbol: string; // Settlement Symbol
  status: string; // Contract status
  fundingFeeRate: number; // Funding fee rate
  predictedFundingFeeRate: number; // Predicted funding fee rate
  openInterest: string; // open interest
  turnoverOf24h: number; // turnover of 24 hours
  volumeOf24h: number; // volume of 24 hours
  markPrice: number; // Mark price
  indexPrice: number; // Index price
  lastTradePrice: number; // last trade price
  nextFundingRateTime: number; // next funding rate time
  maxLeverage: number; // maximum leverage
  sourceExchanges: string[]; // The contract index source exchange
  premiumsSymbol1M: string; // Premium index symbol (1 minute)
  premiumsSymbol8H: string; // Premium index symbol (8 hours)
  fundingBaseSymbol1M: string; // Base currency interest rate symbol (1 minute)
  fundingQuoteSymbol1M: string; // Quote currency interest rate symbol (1 minute)
  lowPrice: number; // 24H Low
  highPrice: number; // 24H High
  priceChgPct: number; // 24H Change%
  priceChg: number; // 24H Change
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
  asks: [string, number][]; // asks. [Price, quantity]
  bids: [string, number][]; // bids. [Price, quantity]
  ts: number; // Timestamp
}

export type Klines = [
  number, // Time
  number, // Entry price
  number, // Highest price
  number, // Lowest price
  number, // Close price
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

export interface OrderDetail {
  id: string; // Order ID
  symbol: string; // Symbol of the contract
  type: string; // Order type, market order or limit order
  side: string; // Transaction side
  price: string; // Order price
  size: number; // Order quantity
  value: string; // Order value
  dealValue: string; // Executed size of funds
  dealSize: number; // Executed quantity
  stp: string; // self trade prevention
  stop: string; // Stop order type (stop limit or stop market)
  stopPriceType: string; // Trigger price type of stop orders
  stopTriggered: boolean; // Mark to show whether the stop order is triggered
  stopPrice: string | null; // Trigger price of stop orders
  timeInForce: string; // Time in force policy type
  postOnly: boolean; // Mark of post only
  hidden: boolean; // Mark of the hidden order
  iceberg: boolean; // Mark of the iceberg order
  leverage: string; // Leverage of the order
  forceHold: boolean; // A mark to forcibly hold the funds for an order
  closeOrder: boolean; // A mark to close the position
  visibleSize: number | null; // Visible size of the iceberg order
  clientOid: string; // Unique order id created by users to identify their orders
  remark: string | null; // Remark of the order
  tags: string | null; // tag order source
  isActive: boolean; // Mark of the active orders
  cancelExist: boolean; // Mark of the canceled orders
  createdAt: number; // Time the order created
  updatedAt: number; // last update time
  endAt: number; // End time
  orderTime: number; // Order create time in nanosecond
  settleCurrency: string; // settlement currency
  status: string; // order status: “open” or “done”
  filledSize: number; // Value of the executed orders
  filledValue: string; // Executed order quantity
  reduceOnly: boolean; // A mark to reduce the position size only
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
  items: OrderDetail[];
}

/**
 *
 * Futures Fills
 *
 */

export interface FillDetail {
  symbol: string; // Symbol of the contract
  tradeId: string; // Trade ID
  orderId: string; // Order ID
  side: string; // Transaction side
  liquidity: string; // Liquidity- taker or maker
  forceTaker: boolean; // Whether to force processing as a taker
  price: string; // Filled price
  size: number; // Filled amount
  value: string; // Order value
  feeRate: string; // Floating fees
  fixFee: string; // Fixed fees
  feeCurrency: string; // Charging currency
  stop: string; // A mark to the stop order type
  fee: string; // Transaction fee
  orderType: string; // Order type
  tradeType: string; // Trade type (trade, liquidation, ADL or settlement)
  createdAt: number; // Time the order created
  settleCurrency: string; // settlement currency
  openFeePay: string; // Opening transaction fee
  closeFeePay: string; // Closing transaction fee
  tradeTime: number; // trade time in nanosecond
}

export interface FuturesFills {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: FillDetail[];
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

export interface PositionDetail {
  id: string; // Position ID
  symbol: string; // Symbol
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
  posMargin: number; // Bankruptcy cost
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
  maintainMargin: number; // Maintenance margin rate
  userId: number; // userId
  riskLimitLevel: number; // Risk Limit Level
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

/**
 *
 * Futures risk limit
 *
 */

export interface RiskLimit {
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

export interface FuturesFundingRate {
  symbol: string; // Funding Rate Symbol
  granularity: number; // Granularity (milliseconds)
  timePoint: number; // Time point (milliseconds)
  value: number; // Funding rate
  predictedValue: number; // Predicted funding rate
}

export interface FuturesFundingRates {
  symbol: string; // Symbol of the contract
  timePoint: number; // Time point (milliseconds)
  fundingRate: number; // Funding rate
}

export interface FundingHistoryItem {
  id: number; // id
  symbol: string; // Symbol of the contract
  timePoint: number; // Time point (milliseconds)
  fundingRate: number; // Funding rate
  markPrice: number; // Mark price
  positionQty: number; // Position size
  positionCost: number; // Position value at settlement period
  funding: number; // Settled funding fees. A positive number means that the user received the funding fee, and vice versa.
  settleCurrency: string; // settlement currency
}

export interface ClosePositionDetail {
  closeId: string;
  positionId: string;
  uid: number;
  userId: string;
  symbol: string;
  settleCurrency: string;
  leverage: string;
  type: string;
  side: string | null;
  closeSize: number | null;
  pnl: string;
  realisedGrossCost: string;
  withdrawPnl: string;
  roe: number | null;
  tradeFee: string;
  fundingFee: string;
  openTime: number;
  closeTime: number;
  openPrice: number | null;
  closePrice: number | null;
}

export interface FuturesClosedPositions {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: ClosePositionDetail[];
}
