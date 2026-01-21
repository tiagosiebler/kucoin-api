/**
 * Unified Trading Account Response Types
 */

export interface AnnouncementItemUTA {
  id: number;
  title: string;
  type: string[];
  description: string;
  releaseTime: number;
  language: string;
  url: string;
}

export interface GetAnnouncementsResponseUTA {
  totalNumber: number;
  totalPage: number;
  pageNumber: number;
  pageSize: number;
  list: AnnouncementItemUTA[];
}

export interface CurrencyChainUTA {
  chainName: string;
  minWithdrawSize: string | null;
  minDepositSize: string | null;
  withdrawFeeRate: string;
  minWithdrawFee: string;
  isWithdrawEnabled: boolean;
  isDepositEnabled: boolean;
  confirms: number;
  preConfirms: number;
  contractAddress: string;
  withdrawPrecision: number;
  maxWithdrawSize: string | null;
  maxDepositSize: string | null;
  needTag: boolean;
  chainId: string;
}

export interface GetCurrencyResponseUTA {
  currency: string;
  name: string;
  fullName: string;
  precision: number;
  confirms: number | null;
  contractAddress: string | null;
  isMarginEnabled: boolean;
  isDebitEnabled: boolean;
  list: CurrencyChainUTA[];
}

export interface SymbolUTA {
  symbol: string;
  name?: string;
  baseCurrency: string;
  quoteCurrency: string;
  market?: string;
  minBaseOrderSize?: string;
  minQuoteOrderSize?: string;
  maxBaseOrderSize?: string | number;
  maxQuoteOrderSize?: string;
  baseOrderStep?: string;
  quoteOrderStep?: string;
  tickSize?: string | number;
  feeCurrency?: string;
  tradingStatus?: string;
  marginMode?: string;
  priceLimitRatio?: string;
  feeCategory?: number;
  makerFeeCoefficient?: string;
  takerFeeCoefficient?: string;
  st?: boolean;
  settlementCurrency?: string;
  contractType?: string;
  isInverse?: boolean;
  launchTime?: number;
  expiryTime?: number | null;
  settlementTime?: number | null;
  maxPrice?: string | number;
  lotSize?: string | number;
  /**
   * Unit size. As of 2026.01.12:
   * - For inverse contracts: changed from -1 to 1 (1 contract = 1 USD)
   * - For Futures: unitSize indicates contract size
   */
  unitSize?: string | number;
  makerFeeRate?: string | number;
  takerFeeRate?: string | number;
  settlementFeeRate?: string | number | null;
  maxLeverage?: number;
  indexSourceExchanges?: string[];
  k?: string | number;
  m?: string | number;
  f?: string | number;
  mmrLimit?: string | number;
  mmrLevConstant?: string | number;
  alertRiskRatio?: string;
  liquidationRiskRatio?: string;
  baseBorrowEnable?: boolean | string;
  quoteBorrowEnable?: boolean | string;
  baseTransferInEnable?: boolean | string;
  quoteTransferInEnable?: boolean | string;
  /** Display symbol for Futures (added 2025.12.26 & 2026.01.12) */
  displaySymbol?: string;
  /** Display base currency for Futures (added 2025.12.26 & 2026.01.12) */
  displayBaseCurrency?: string;
}

export interface GetSymbolResponseUTA {
  tradeType: string;
  list: SymbolUTA[];
}

export interface TickerUTA {
  symbol: string;
  name?: string;
  bestBidPrice: string;
  bestBidSize: string;
  bestAskPrice: string;
  bestAskSize: string;
  high: string;
  low: string;
  baseVolume: string;
  quoteVolume: string;
  lastPrice: string;
  open: string;
  size: string;
}

export interface GetTickerResponseUTA {
  tradeType: string;
  /** Timestamp in nanoseconds (as of 2026.01.12) */
  ts: number;
  list: TickerUTA[];
}

export interface TradeUTA {
  sequence: string | number;
  tradeId: string;
  price: string;
  size: string;
  side: 'buy' | 'sell';
  /** Timestamp in nanoseconds */
  ts: number;
  /** Whether it is an RPI trade (Futures only) */
  isRpiTrade?: boolean;
}

export interface GetTradesResponseUTA {
  tradeType: string;
  list: TradeUTA[];
}

export interface GetOrderBookResponseUTA {
  tradeType: string;
  symbol: string;
  /** Sequence number. Changed from string to number for Spot as of 2026.01.17 */
  sequence: number;
  /**
   * Bids array, ordered from high to low.
   * When rpiFilter=0 (or not set): each entry is [price, size]
   * When rpiFilter=1: each entry is [price, noneRPISize, RPISize]
   * As of 2026.01.17: All values are strings
   */
  bids: string[][];
  /**
   * Asks array, ordered from low to high.
   * When rpiFilter=0 (or not set): each entry is [price, size]
   * When rpiFilter=1: each entry is [price, noneRPISize, RPISize]
   * As of 2026.01.17: All values are strings
   */
  asks: string[][];
  /** Timestamp in nanoseconds (Futures only) */
  ts?: number;
}

export interface GetKlinesResponseUTA {
  tradeType: string;
  symbol: string;
  list: string[][]; // [time, open, close, high, low, volume, turnover]
}

export interface GetCurrentFundingRateResponseUTA {
  symbol: string;
  nextFundingRate: number;
  fundingTime: number;
  fundingRateCap: number;
  fundingRateFloor: number;
}

export interface FundingRateHistoryItemUTA {
  fundingRate: number;
  ts: number;
}

export interface GetHistoryFundingRateResponseUTA {
  symbol: string;
  list: FundingRateHistoryItemUTA[];
}

export interface GetCrossMarginConfigResponseUTA {
  maxLeverage: number;
  alertRiskRatio: string;
  liquidationRiskRatio: string;
  currencyList: string[];
}

export interface GetServiceStatusResponseUTA {
  tradeType: string;
  serverStatus: 'open' | 'close' | 'cancelonly';
  msg: string;
}

/**
 * Account Response Types
 */

export interface AccountCurrencyUTA {
  currency: string;
  hold: string;
  available: string;
  balance: string;
  equity: string;
  liability?: string;
  totalCrossMargin?: string;
  crossPosMargin?: string;
  crossOrderMargin?: string;
  crossUnPnl?: string;
  isolatedPosMargin?: string;
  isolatedOrderMargin?: string;
  isolatedFundingFeeMargin?: string;
  isolatedUnPnl?: string;
  liabilityPrinciple?: string;
  liabilityInterest?: string;
  unrealisedPnl?: string;
}

export interface AccountDataUTA {
  accountSubtype?: string; // For ISOLATED (trading pair) or FUTURES (settlement currency)
  riskRatio?: string;
  currencies: AccountCurrencyUTA[];
}

export interface GetClassicAccountResponseUTA {
  accountType: string;
  ts: number;
  accounts: AccountDataUTA[];
}

export interface GetAccountOverviewResponseUTA {
  accountType: string;
  riskRatio: string;
  equity: string;
  liability: string;
  availableMargin: string;
  adjustedEquity: string;
  im: string;
  mm: string;
}

export interface SubAccountUserUTA {
  uid: number;
  accountList: {
    accountType:
      | 'FUNDING'
      | 'SPOT'
      | 'FUTURES'
      | 'CROSS'
      | 'ISOLATED'
      | 'OPTIONS'
      | 'UNIFIED';
    accountSubType: string | null;
    currencyList: AccountCurrencyUTA[];
  }[];
}

export interface GetSubAccountResponseUTA {
  ts: number;
  userList: SubAccountUserUTA[];
}

export interface GetTransferQuotasResponseUTA {
  currency: string;
  transferable: string;
  accountType: string;
}

export interface FlexTransferResponseUTA {
  orderId: string;
  clientOid: string;
}

export interface SubAccountTransferPermissionUTA {
  subUid: string;
  subToSub: boolean;
}

export interface GetAccountModeResponseUTA {
  selfAccountMode: 'CLASSIC' | 'UNIFIED';
  unifiedSubAccount: number[];
  classicSubAccount: number[];
}

export interface FeeRateItemUTA {
  symbol: string;
  takerFeeRate: string;
  makerFeeRate: string;
}

export interface GetFeeRateResponseUTA {
  tradeType: string;
  list: FeeRateItemUTA[];
}

export interface AccountLedgerItemUTA {
  accountType:
    | 'FUNDING'
    | 'SPOT'
    | 'FUTURES'
    | 'CROSS'
    | 'ISOLATED'
    | 'UNIFIED';
  id: string;
  currency: string;
  direction: 'IN' | 'OUT';
  businessType: string;
  amount: string;
  balance: string;
  fee: string;
  tax: string;
  remark: string;
  /** Timestamp in nanoseconds (standardized as of 2026.01.12) */
  ts: number;
}

export interface GetAccountLedgerResponseUTA {
  lastId?: number;
  items?: AccountLedgerItemUTA[];
}

export type GetAccountLedgerResponseClassicUTA = AccountLedgerItemUTA[];

export interface InterestHistoryItemUTA {
  liability: string;
  interest: string;
  hourlyInterestRate: string;
  currency: string;
  ts: number;
  interestFreeLiability: string;
}

export interface GetInterestHistoryResponseUTA {
  items: InterestHistoryItemUTA[];
  lastId: number;
}

export interface DepositAddressUTA {
  address: string;
  memo: string;
  chainId: string;
  to: 'MAIN' | 'TRADE';
  currency: string;
  contractAddress: string;
  chainName: string;
  expirationDate: string;
  remark: string;
}

/**
 * Order Response Types
 */

export interface PlaceOrderResponseUTA {
  tradeType: 'SPOT' | 'FUTURES' | 'ISOLATED' | 'CROSS';
  orderId: string;
  clientOid: string;
  /** Timestamp when system completes order request in nanoseconds. Classic mode not supported */
  ts?: number;
  /** Borrow amount. Unified mode not supported */
  borrowSize?: string;
  /** Loan order ID. Unified mode not supported */
  loanApplyId?: string;
}

export interface BatchPlaceOrderItemResponseUTA {
  orderId?: string;
  clientOid?: string;
  symbol?: string;
  code?: string;
  msg?: string;
}

export interface BatchPlaceOrderResponseUTA {
  tradeType: 'SPOT' | 'FUTURES' | 'ISOLATED' | 'CROSS';
  items: BatchPlaceOrderItemResponseUTA[];
}

export interface OrderDetailsUTA {
  tradeType: 'SPOT' | 'FUTURES' | 'ISOLATED' | 'CROSS';
  orderId: string;
  clientOid: string;
  /**
   * Order status:
   * - 0: notTriggered (conditional order, not triggered)
   * - 1: triggered (conditional order, triggered but not live)
   * - 2: live (not filled)
   * - 3: filled (fully filled)
   * - 4: partial filled (partially filled, still active)
   * - 5: canceled (no fills, fully canceled)
   * - 6: partial canceled (partially filled, remainder canceled)
   * Changed from String to Number for UTA as of 2026.01.17
   */
  status: number;
  filledSize: string;
  avgPrice: string;
  fee: string;
  feeCurrency: string;
  tax: string;
  tradeId: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  positionSide?: 'BOTH' | 'LONG' | 'SHORT';
  orderType: 'LIMIT' | 'MARKET';
  size: string;
  sizeUnit: 'BASECCY' | 'QUOTECCY' | 'UNIT';
  price: string;
  leverage?: string;
  reduceOnly?: boolean;
  marginMode?: 'ISOLATED' | 'CROSS';
  stp?: 'DC' | 'CO' | 'CN' | 'CB' | '';
  /**
   * Time in Force. Added 'RPI' as of 2025.01.02
   */
  timeInForce: 'GTC' | 'IOC' | 'GTT' | 'FOK' | 'RPI';
  cancelReason?: number;
  cancelSize: string;
  cancelAfter?: number;
  triggerDirection?: 'UP' | 'DOWN';
  triggerPrice?: string;
  triggerPriceType?: 'TP' | 'IP' | 'MP';
  tpTriggerPrice?: string;
  tpTriggerPriceType?: 'TP' | 'IP' | 'MP';
  tpOrderPrice?: string;
  slTriggerPrice?: string;
  slTriggerPriceType?: 'TP' | 'IP' | 'MP';
  slOrderPrice?: string;
  postOnly?: boolean;
  tags?: string;
  triggerOrderId?: string;
  /** Order creation time in nanoseconds (standardized as of 2026.01.12) */
  orderTime: number;
  /** Latest order update time in nanoseconds (standardized as of 2026.01.12) */
  updatedTime: number;
}

export interface GetOpenOrderListResponseUTA {
  pageNumber: number;
  pageSize?: number;
  totalNum?: number;
  totalPage?: number;
  tradeType: 'SPOT' | 'FUTURES' | 'ISOLATED' | 'CROSS';
  items: OrderDetailsUTA[];
}

export interface GetOrderHistoryResponseUTA {
  lastId: number;
  tradeType: 'SPOT' | 'FUTURES' | 'ISOLATED' | 'CROSS';
  items: OrderDetailsUTA[];
}

export interface TradeHistoryItemUTA {
  tradeId: string;
  orderId: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  positionSide?: 'BOTH' | 'LONG' | 'SHORT';
  type: 'LIMIT' | 'MARKET';
  price: string;
  size: string;
  sizeUnit: 'BASECCY' | 'QUOTECCY' | 'UNIT';
  value: string;
  feeRate: string;
  fee: string;
  feeCurrency: string;
  tax: string;
  liquidity: 'TAKER' | 'MAKER';
  /** Execution time in nanoseconds (standardized as of 2026.01.12) */
  executionTime: number;
  /** Whether it is an RPI trade (added 2025.01.02, Futures only) */
  isRpiTrade?: boolean;
}

export interface GetTradeHistoryResponseUTA {
  lastId: number;
  tradeType: 'SPOT' | 'FUTURES' | 'ISOLATED' | 'CROSS';
  items: TradeHistoryItemUTA[];
}

export interface CancelOrderResponseUTA {
  tradeType: 'SPOT' | 'FUTURES' | 'ISOLATED' | 'CROSS';
  orderId?: string;
  clientOid?: string;
  /** Timestamp when system completes order cancellation request (nanoseconds). Only for unified accounts */
  ts?: number;
}

export interface BatchCancelOrderItemResponseUTA {
  code?: string;
  msg?: string;
  orderId?: string;
  clientOid?: string;
  /** Timestamp when system completes order cancellation request (nanoseconds). Not supported for classic accounts */
  ts?: number;
}

export interface BatchCancelOrdersResponseUTA {
  tradeType: 'SPOT' | 'FUTURES' | 'ISOLATED' | 'CROSS';
  items: BatchCancelOrderItemResponseUTA[];
}

export interface DCPResponseUTA {
  tradeType: 'SPOT' | 'FUTURES' | 'MARGIN';
  symbol: string[]; // Empty means effective for all symbols
  systemTime: number; // Time when system received request (in seconds)
  triggerTime: number; // Trigger cancellation time (in seconds)
}

/**
 * Position Response Types
 */

export interface PositionUTA {
  id: string;
  symbol: string;
  marginMode: 'CROSS' | 'ISOLATED';
  size: string; // Positive = long, negative = short
  entryPrice: string;
  positionValue: string;
  markPrice: string;
  leverage: string;
  unrealizedPnL: string;
  realizedPnL: string;
  initialMargin: string;
  mmr: string; // Maintenance Margin Rate
  maintenanceMargin: string;
  /** Timestamp when position was first opened (nanoseconds, standardized as of 2026.01.12) */
  creationTime: number;
}

export interface PositionHistoryItemUTA {
  closeId: string;
  symbol: string;
  marginMode: 'CROSS' | 'ISOLATED';
  side: 'LONG' | 'SHORT';
  entryPrice: string;
  closePrice: string;
  avgClosePrice: string;
  maxSize: string;
  leverage: string;
  realizedPnL: string;
  fee: string;
  tax: string;
  fundingFee: string;
  /** Position opening timestamp (nanoseconds, standardized as of 2026.01.12) */
  creationTime: number;
  /** Position closing timestamp (nanoseconds, standardized as of 2026.01.12) */
  closingTime: number;
}

export interface GetPositionsHistoryResponseUTA {
  items: PositionHistoryItemUTA[];
  lastId?: number;
}

export interface PositionTierUTA {
  symbol: string;
  tier: number; // Current tier of user
  maxSize: string; // Upper limit (USDT) (included)
  minSize: string; // Lower limit (USDT)
  maxLeverage: string;
  initialMarginRate: string;
  maintainMarginRate: string;
}
