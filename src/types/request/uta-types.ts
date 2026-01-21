/**
 * Unified Trading Account Request Types
 */

export interface GetAnnouncementsRequestUTA {
  language?:
    | 'zh_HK'
    | 'ja_JP'
    | 'ko_KR'
    | 'en_US'
    | 'pl_PL'
    | 'es_ES'
    | 'fr_FR'
    | 'ar_AE'
    | 'it_IT'
    | 'id_ID'
    | 'nl_NL'
    | 'pt_PT'
    | 'vi_VN'
    | 'de_DE'
    | 'tr_TR'
    | 'ms_MY'
    | 'ru_RU'
    | 'th_TH'
    | 'hi_IN'
    | 'bn_BD'
    | 'fil_PH'
    | 'ur_PK';
  type?:
    | 'latest-announcements'
    | 'activities'
    | 'product-updates'
    | 'vip'
    | 'maintenance-updates'
    | 'delistings'
    | 'others'
    | 'api-campaigns'
    | 'new-listings'
    | 'futures-announcements';
  pageNumber?: number;
  pageSize?: number;
  startTime?: number;
  endTime?: number;
}

export interface GetCurrencyRequestUTA {
  currency?: string;
  chain?: string;
}

export interface GetSymbolRequestUTA {
  tradeType: 'SPOT' | 'FUTURES' | 'ISOLATED' | 'CROSS';
  symbol?: string;
}

export interface GetTickerRequestUTA {
  tradeType: 'SPOT' | 'FUTURES';
  symbol?: string;
}

export interface GetTradesRequestUTA {
  tradeType: 'SPOT' | 'FUTURES';
  symbol: string;
}

export interface GetOrderBookRequestUTA {
  tradeType: 'SPOT' | 'FUTURES';
  symbol: string;
  limit: '20' | '50' | '100' | 'FULL';
  /**
   * Whether it is an RPI Order. Applicable to FUTURES only.
   * 0: noneRPI Orders (default)
   * 1: noneRPI + RPI Orders
   */
  rpiFilter?: 0 | 1;
}

export interface GetKlinesRequestUTA {
  tradeType: 'SPOT' | 'FUTURES';
  symbol: string;
  interval:
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
  startAt?: number;
  endAt?: number;
}

export interface GetCurrentFundingRateRequestUTA {
  symbol: string;
}

export interface GetHistoryFundingRateRequestUTA {
  symbol: string;
  startAt: number;
  endAt: number;
}

export interface GetServiceStatusRequestUTA {
  tradeType: 'SPOT' | 'FUTURES';
}

/**
 * Account Endpoints
 */

export interface GetClassicAccountRequestUTA {
  accountType: 'FUNDING' | 'SPOT' | 'FUTURES' | 'CROSS' | 'ISOLATED';
  accountSubtype?: string; // For ISOLATED (trading pair) or FUTURES (settlement currency)
  currency?: string; // Up to 20 currencies, comma-separated
}

export interface GetSubAccountRequestUTA {
  UID?: string; // Up to 50 UIDs, comma-separated
  pageSize?: number; // Default 10, max 50
  lastId?: number;
}

export interface GetTransferQuotasRequestUTA {
  currency: string;
  accountType:
    | 'FUNDING'
    | 'SPOT'
    | 'FUTURES'
    | 'CROSS'
    | 'ISOLATED'
    | 'UNIFIED';
  symbol?: string; // Required when accountType is ISOLATED
}

export interface FlexTransferRequestUTA {
  clientOid: string;
  currency: string;
  amount: string;
  type: '0' | '1' | '2' | '3'; // 0=INTERNAL, 1=PARENT_TO_SUB, 2=SUB_TO_PARENT, 3=SUB_TO_SUB
  fromAccountType:
    | 'FUNDING'
    | 'SPOT'
    | 'FUTURES'
    | 'CROSS'
    | 'ISOLATED'
    | 'UNIFIED';
  toAccountType:
    | 'FUNDING'
    | 'SPOT'
    | 'FUTURES'
    | 'CROSS'
    | 'ISOLATED'
    | 'UNIFIED';
  fromAccountSymbol?: string; // Required when fromAccountType is ISOLATED
  toAccountSymbol?: string; // Required when toAccountType is ISOLATED
  fromUid?: string; // Required for SUB transfers
  toUid?: string; // Required for SUB transfers
}

export interface SetSubAccountTransferPermissionRequestUTA {
  subUids: string; // Comma-separated sub account UIDs
  subToSub: boolean;
}

export interface SetAccountModeRequestUTA {
  accountType: 'CLASSIC' | 'UNIFIED';
}

export interface GetFeeRateRequestUTA {
  tradeType: 'SPOT' | 'FUTURES';
  symbol: string; // Spot: up to 10 symbols comma-separated, Futures: 1 symbol only
}

export interface GetAccountLedgerRequestUTA {
  accountType:
    | 'FUNDING'
    | 'SPOT'
    | 'FUTURES'
    | 'CROSS'
    | 'ISOLATED'
    | 'UNIFIED';
  currency?: string; // Up to 10 currencies, comma-separated
  direction?: 'IN' | 'OUT';
  businessType?:
    | 'TRADE_EXCHANGE'
    | 'TRANSFER'
    | 'SUB_TRANSFER'
    | 'RETURNED_FEES'
    | 'DEDUCTION_FEES'
    | 'OTHER'
    | 'SUB_TO_SUB_TRANSFER'
    | 'SPOT_EXCHANGE'
    | 'SPOT_EXCHANGE_REBATE'
    | 'FUTURES_EXCHANGE_OPEN'
    | 'FUTURES_EXCHANGE_CLOSE'
    | 'FUTURES_EXCHANGE_REBATE'
    | 'FUNDING_FEE'
    | 'LIABILITY_INTEREST'
    | 'KCS_DEDUCTION_FEES'
    | 'KCS_RETURNED_FEES'
    | 'AUTO_EXCHANGE_USER';
  lastId?: number;
  startAt?: number; // milliseconds
  endAt?: number; // milliseconds
  pageSize?: number; // Default 100, max 200
}

export interface GetInterestHistoryRequestUTA {
  accountType: 'UNIFIED';
  currency?: string;
  startTime?: number; // milliseconds
  endTime?: number; // milliseconds
  page?: number;
  size?: number; // Default 50, max 1000
}

export interface ModifyLeverageRequestUTA {
  symbol: string;
  leverage: string;
}

export interface GetDepositAddressRequestUTA {
  currency: string;
  chain?: string; // If both currency and chain provided, address will be created if not exists
}

/**
 * Order Endpoints
 */

export interface PlaceOrderRequestUTA {
  tradeType: 'SPOT' | 'FUTURES' | 'ISOLATED' | 'CROSS';
  clientOid?: string; // Mandatory for futures and margin; optional otherwise. Max 40 chars
  symbol: string;
  side: 'BUY' | 'SELL';
  positionSide?: 'BOTH' | 'LONG' | 'SHORT'; // For Classic Futures only
  orderType: 'LIMIT' | 'MARKET';
  size: string;
  sizeUnit: 'BASECCY' | 'QUOTECCY' | 'UNIT'; // Required for UTA, UNIT for Futures
  price?: string;
  leverage?: number; // Only for Classic Mode isolated margin
  reduceOnly?: boolean; // Only for Futures
  marginMode?: 'ISOLATED' | 'CROSS'; // Only for Classic Futures
  stp?: 'DC' | 'CO' | 'CN' | 'CB';
  /**
   * Time in Force. Added 'RPI' as of 2025.01.02
   * - GTC: Good Till Cancel (default)
   * - FOK: Fill Or Kill
   * - IOC: Immediate Or Cancel
   * - GTT: Good Till Time (not supported for Futures)
   * - RPI: Retail Price Improvement Order (Phase 1: Futures only)
   */
  timeInForce?: 'GTC' | 'IOC' | 'GTT' | 'FOK' | 'RPI';
  cancelAfter?: number; // Only effective when timeInForce is GTT
  postOnly?: boolean;
  autoBorrow?: boolean; // Only for Isolated/Cross Margin (Classic only)
  autoRepay?: boolean; // Only for Isolated/Cross Margin (Classic only)
  tags?: string; // Max length 20
  triggerDirection?: 'DOWN' | 'UP'; // Required when triggerPrice is set
  triggerPrice?: string;
  triggerPriceType?: 'TP' | 'IP' | 'MP'; // Only for Futures
  tpTriggerPrice?: string; // Only for Futures
  tpTriggerPriceType?: 'TP' | 'IP' | 'MP';
  slTriggerPrice?: string; // Only for Futures
  slTriggerPriceType?: 'TP' | 'IP' | 'MP';
}

export interface BatchPlaceOrderRequestUTA {
  tradeType: 'SPOT' | 'FUTURES' | 'ISOLATED' | 'CROSS';
  orderList: Omit<PlaceOrderRequestUTA, 'tradeType'>[];
}

export interface GetOrderDetailsRequestUTA {
  tradeType: 'SPOT' | 'FUTURES' | 'ISOLATED' | 'CROSS';
  symbol: string;
  orderId?: string; // At least one of orderId or clientOid required
  clientOid?: string; // At least one of orderId or clientOid required
}

export interface GetOpenOrderListRequestUTA {
  tradeType: 'SPOT' | 'FUTURES' | 'ISOLATED' | 'CROSS';
  symbol?: string; // Required for SPOT, ISOLATED, and CROSS
  orderFilter?: 'NORMAL' | 'CONDITION'; // Defaults to NORMAL
  startAt?: number; // milliseconds
  endAt?: number; // milliseconds
  pageNumber?: number;
  pageSize?: number; // Default 50, max 200
}

export interface GetOrderHistoryRequestUTA {
  tradeType: 'SPOT' | 'FUTURES' | 'ISOLATED' | 'CROSS';
  symbol?: string; // Required for SPOT, ISOLATED, and CROSS
  side?: 'BUY' | 'SELL';
  orderFilter?: 'NORMAL' | 'CONDITION'; // Defaults to NORMAL
  startAt?: number; // milliseconds
  endAt?: number; // milliseconds
  lastId?: string;
  pageSize?: number; // Default 50, max 200
}

export interface GetTradeHistoryRequestUTA {
  tradeType: 'SPOT' | 'FUTURES' | 'ISOLATED' | 'CROSS';
  symbol?: string; // Required for SPOT, ISOLATED, and CROSS
  orderId?: string;
  side?: 'BUY' | 'SELL';
  type?: 'LIMIT' | 'MARKET';
  startAt?: number; // milliseconds
  endAt?: number; // milliseconds
  lastId?: string;
  pageSize?: number; // Default 50, max 200
}

export interface CancelOrderRequestUTA {
  tradeType: 'SPOT' | 'FUTURES' | 'ISOLATED' | 'CROSS';
  symbol: string; // For FUTURES optional for single order cancellation (ignored if orderId provided); For UTA FUTURES, required
  orderId?: string; // At least one of orderId or clientOid required
  clientOid?: string; // At least one of orderId or clientOid required
}

export interface CancelOrderItemRequestUTA {
  symbol: string;
  orderId?: string; // At least one of orderId or clientOid required
  clientOid?: string; // At least one of orderId or clientOid required
}

export interface BatchCancelOrdersRequestUTA {
  tradeType: 'SPOT' | 'FUTURES' | 'ISOLATED' | 'CROSS';
  cancelOrderList: CancelOrderItemRequestUTA[]; // Maximum 20 orders
}

export interface SetDCPRequestUTA {
  tradeType: 'SPOT' | 'FUTURES' | 'MARGIN';
  timeout: number; // Range: timeout=-1 (unset) or 5 <= timeout <= 86400 seconds
  symbols?: string[]; // Up to 50 trading pairs. Empty means all trading pairs
}

export interface GetDCPRequestUTA {
  tradeType: 'SPOT' | 'FUTURES' | 'MARGIN';
}

/**
 * Position Endpoints
 */

export interface GetPositionListRequestUTA {
  symbol?: string; // Optional, if not provided returns all open positions
}

export interface GetPositionsHistoryRequestUTA {
  symbol?: string;
  startAt?: number; // milliseconds
  endAt?: number; // milliseconds
  lastId?: number; // For cursor-based pagination
  pageSize?: number; // Default 10, max 200
}

export interface GetAccountPositionTiersRequestUTA {
  symbol: string; // Supports up to 10 symbols, comma-separated
  tradeType?: 'FUTURES' | 'MARGIN'; // Not support margin for the time being
  marginMode?: 'ISOLATED' | 'CROSS'; // Not support cross for the time being
  data?: 'RISK_LIMIT' | 'BORROW'; // Not support borrow for the time being
}
