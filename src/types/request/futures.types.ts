/**
 * REST - ACCOUNT  - BASIC INFO
 * Get Account Ledgers - Futures
 */

export interface GetTransactionsRequest {
  startAt?: number;
  endAt?: number;
  type?:
    | 'RealisedPNL'
    | 'Deposit'
    | 'Withdrawal'
    | 'Transferin'
    | 'TransferOut';
  offset?: number;
  maxCount?: number;
  currency?: string;
  forward?: boolean;
}

/**
 * REST - ACCOUNT  - SUBACCOUNT API
 */

export interface GetSubAPIsRequest {
  apiKey?: string;
  subName: string;
}

export interface CreateSubAPIRequest {
  subName: string;
  passphrase: string;
  remark: string;
  permission?: string;
  ipWhitelist?: string;
  expire?: string;
}

export interface UpdateSubAPIRequest {
  subName: string;
  apiKey: string;
  passphrase: string;
  permission?: string;
  ipWhitelist?: string;
  expire?: string;
}

export interface DeleteSubAPIRequest {
  apiKey: string;
  passphrase: string;
  subName: string;
}

/**
 * REST - FUNDING - FUNDING OVERVIEW
 */

/**
 * REST - FUNDING - TRANSFER
 */

export interface SubmitTransfer {
  amount: number;
  currency: string;
  recAccountType: 'MAIN' | 'TRADE';
}

export interface GetTransfersRequest {
  startAt?: number;
  endAt?: number;
  status?: 'PROCESSING' | 'SUCCESS' | 'FAILURE';
  queryStatus?: 'PROCESSING' | 'SUCCESS' | 'FAILURE'[];
  currency?: string;
  currentPage?: number;
  pageSize?: number;
}

/**
 *
 * Futures Market Data
 *
 */

export interface GetKlinesRequest {
  symbol: string;
  granularity: number;
  from?: number;
  to?: number;
}

export interface GetInterestRatesRequest {
  symbol: string;
  startAt?: number;
  endAt?: number;
  reverse?: boolean;
  offset?: number;
  forward?: boolean;
  maxCount?: number;
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

export interface Order {
  clientOid: string;
  side: 'buy' | 'sell';
  symbol: string;
  leverage?: number;
  type?: 'limit' | 'market';
  remark?: string;
  stop?: 'down' | 'up';
  stopPriceType?: 'TP' | 'MP' | 'IP';
  stopPrice?: string;
  reduceOnly?: boolean;
  closeOrder?: boolean;
  forceHold?: boolean;
  stp?: 'CN' | 'CO' | 'CB';
  marginMode?: 'ISOLATED' | 'CROSS';
  price?: string;
  size?: number;
  qty?: string;
  valueQty?: string;
  timeInForce?: 'GTC' | 'IOC';
  postOnly?: boolean;
  hidden?: boolean;
  iceberg?: boolean;
  visibleSize?: string;
  positionSide?: 'BOTH' | 'LONG' | 'SHORT';
}

export interface SLTPOrder {
  clientOid: string;
  side: 'buy' | 'sell';
  symbol: string;
  leverage?: number;
  type: 'limit' | 'market';
  remark?: string;
  triggerStopUpPrice?: string;
  stopPriceType?: 'TP' | 'MP' | 'IP';
  triggerStopDownPrice?: string;
  reduceOnly?: boolean;
  closeOrder?: boolean;
  forceHold?: boolean;
  stp?: 'CN' | 'CO' | 'CB';
  marginMode?: 'ISOLATED' | 'CROSS';
  price?: string;
  size?: number;
  qty?: string;
  valueQty?: string;
  timeInForce?: 'GTC' | 'IOC';
  postOnly?: boolean;
  hidden?: boolean;
  iceberg?: boolean;
  visibleSize?: string;
}
export interface GetOrdersRequest {
  status: 'active' | 'done';
  symbol?: string;
  side: 'buy' | 'sell';
  type: 'limit' | 'market' | 'limit_stop' | 'market_stop';
  startAt?: number;
  endAt?: number;
  currentPage?: number;
  pageSize?: number;
}

export interface GetStopOrdersRequest {
  symbol?: string;
  side?: 'buy' | 'sell';
  type?: 'limit' | 'market';
  startAt?: number;
  endAt?: number;
  currentPage?: number;
  pageSize?: number;
}

// Note: Either orderIdsList or clientOidsList must be provided, but not both.
// When both are provided, orderIdsList takes precedence.
export interface BatchCancelOrdersRequest {
  orderIdsList?: string[];
  clientOidsList?: {
    symbol: string;
    clientOid: string;
  }[];
}

/**
 *
 * Futures Fills
 *
 */

export interface AccountFillsRequest {
  orderId?: string;
  symbol?: string;
  side?: 'buy' | 'sell';
  type?: 'limit' | 'market' | 'limit_stop' | 'market_stop';
  startAt?: number;
  endAt?: number;
  currentPage?: number;
  pageSize?: number;
  tradeTypes?: string;
}

/**
 *
 * Futures Positions
 *
 */

export interface MaxOpenSizeRequest {
  symbol: string;
  price: string;
  leverage: number;
}

/**
 *
 * Futures risk limit
 *
 */

/**
 *
 * Futures funding fees
 *
 */

export interface GetFundingRatesRequest {
  symbol: string;
  from: number;
  to: number;
}

export interface GetFundingHistoryRequest {
  symbol: string;
  from?: number;
  to?: number;
  reverse?: boolean;
  offset?: number;
  forward?: boolean;
  maxCount?: number;
}

/**
 *
 * Futures Copy Trading
 *
 */

export interface CopyTradeOrderRequest {
  clientOid: string;
  side: 'buy' | 'sell';
  symbol: string;
  type: 'limit' | 'market';
  leverage?: number;
  remark?: string;
  stop?: 'up' | 'down';
  stopPriceType?: 'TP' | 'MP' | 'IP';
  stopPrice?: string;
  reduceOnly?: boolean;
  closeOrder?: boolean;
  forceHold?: boolean;
  marginMode?: 'ISOLATED' | 'CROSS';
  positionSide?: 'BOTH' | 'LONG' | 'SHORT';
  price?: string;
  size: number;
  timeInForce?: 'GTC' | 'IOC';
  postOnly?: boolean;
  hidden?: boolean;
  iceberg?: boolean;
  visibleSize?: string;
}

export interface CopyTradeSLTPOrderRequest extends CopyTradeOrderRequest {
  triggerStopUpPrice?: string; // Take profit price
  triggerStopDownPrice?: string; // Stop loss price
  stopPriceType?: 'TP' | 'MP' | 'IP';
}

/**
 * Switch Margin Mode (Copy Trading)
 */
export interface CopyTradeSwitchMarginModeRequest {
  symbol: string;
  marginMode: 'ISOLATED' | 'CROSS';
}

/**
 * Modify Cross Margin Leverage (Copy Trading)
 */
export interface CopyTradeChangeCrossMarginLeverageRequest {
  symbol: string;
  leverage: string;
}

/**
 * Get Cross Margin Requirement (Copy Trading)
 */
export interface CopyTradeGetCrossMarginRequirementRequest {
  symbol: string;
  positionValue: string;
  leverage?: string;
}

/**
 * Switch Position Mode (Copy Trading)
 */
export interface CopyTradeSwitchPositionModeRequest {
  positionMode: '0' | '1'; // 0 = one-way mode, 1 = hedge mode
}
