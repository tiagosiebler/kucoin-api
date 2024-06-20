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

export interface GetOrdersRequest {
  status?: 'active' | 'done';
  symbol?: string;
  side?: 'buy' | 'sell';
  type?: 'limit' | 'market' | 'limit_stop' | 'market_stop';
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
