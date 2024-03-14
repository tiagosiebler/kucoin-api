/**
 * REST - ACCOUNT  - BASIC INFO
 * Get Account Ledgers - Futures
 */

export interface GetAccountTransactionsFuturesRequest {
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

export interface GetSubAccountAPIsRequest {
  apiKey?: string;
  subName: string;
}

export interface CreateSubAccountAPIRequest {
  subName: string;
  passphrase: string;
  remark: string;
  permission?: string;
  ipWhitelist?: string;
  expire?: string;
}

export interface UpdateSubAccountAPIRequest {
  subName: string;
  apiKey: string;
  passphrase: string;
  permission?: string;
  ipWhitelist?: string;
  expire?: string;
}

export interface DeleteSubAccountAPIRequest {
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

export interface TransferFromAccountFuturesRequest {
  amount: number;
  currency: string;
  recAccountType: 'MAIN' | 'TRADE';
}

export interface TransferToFuturesAccountFuturesRequest {
  amount: number;
  currency: string;
  payAccountType: 'MAIN' | 'TRADE';
}

export interface GetFuturesTransferRecordRequest {
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

export interface GetKlinesFuturesRequest {
  symbol: string;
  granularity: number;
  from?: number;
  to?: number;
}

export interface GetInterestIndexPremiumRequest {
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

export interface NewFuturesOrderV1 {
  clientOid: string;
  side: 'buy' | 'sell';
  symbol: string;
  leverage?: string;
  type?: 'market' | 'limit';
  remark?: string;
  stop?: 'down' | 'up';
  stopPriceType?: 'TP' | 'IP' | 'MP';
  stopPrice?: string;
  reduceOnly?: boolean;
  postOnly?: boolean;
  closeOrder?: boolean;
  forceHold?: boolean;
  stp?: 'CN' | 'CO' | 'CB';
  price?: string;
  size: number;
  timeInForce?: 'GTC' | 'IOC';
  hidden?: boolean;
  iceberg?: boolean;
  visibleSize?: number;
}

export interface SubmitMultipleOrdersFuturesRequest {
  clientOid: string;
  side: 'buy' | 'sell';
  symbol: string;
  leverage: string;
  type?: 'limit' | 'market';
  remark?: string;
  stop?: 'down' | 'up';
  stopPriceType?: 'TP' | 'IP' | 'MP';
  stopPrice?: string;
  reduceOnly?: boolean;
  closeOrder?: boolean;
  forceHold?: boolean;
  stp?: 'CN' | 'CO' | 'CB';
  price?: string;
  size?: number;
  timeInForce?: 'GTC' | 'IOC';
  postOnly?: boolean;
  hidden?: boolean;
  iceberg?: boolean;
  visibleSize?: number;
}

export interface GetAccountOrdersFuturesRequest {
  status?: 'active' | 'done';
  symbol?: string;
  side?: 'buy' | 'sell';
  type?: 'limit' | 'market' | 'limit_stop' | 'market_stop';
  startAt?: number;
  endAt?: number;
  currentPage?: number;
  pageSize?: number;
}

export interface GetAccountUntriggeredStopOrdersListFuturesRequest {
  symbol?: string;
  side?: 'buy' | 'sell';
  type?: 'limit' | 'market';
  startAt?: number;
  endAt?: number;
  currentPage?: number;
  pageSize?: number;
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
}

/**
 *
 * Futures Positions
 *
 */

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
  startAt?: number;
  endAt?: number;
  reverse?: boolean;
  offset?: number;
  forward?: boolean;
  maxCount?: number;
}
