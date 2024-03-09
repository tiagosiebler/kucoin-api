export interface NewSpotOrderV1 {
  clientOid: string;
  side: 'buy' | 'sell';
  symbol: string;
  type?: 'market' | 'limit';
  remark?: string;
  stp?: 'CN' | 'CO' | 'CB' | 'DC';
  tradeType?: 'TRADE' | 'MARGIN_TRADE';
  price?: string;
  size?: string;
  funds?: string;
  timeInForce?: 'GTC' | 'GTT' | 'IOC' | 'FOK';
  cancelAfter?: number;
  postOnly?: boolean;
  hidden?: boolean;
  iceberg?: boolean;
  visibleSize?: string;
}

export interface GetBalancesRequest {
  currency?: string;
  type?: 'main' | 'trade' | 'margin' | 'trade_hf';
}

export interface AccountTransactionsRequest {
  currency?: string;
  direction?: 'in' | 'out';
  bizType?:
    | 'DEPOSIT'
    | 'WITHDRAW'
    | 'TRANSFER'
    | 'SUB_TRANSFER'
    | 'TRADE_EXCHANGE'
    | 'MARGIN_EXCHANGE'
    | 'KUCOIN_BONUS';
  startAt?: number;
  endAt?: number;
}

export interface AccountHFTransactionsRequest {
  currency?: string;
  direction?: 'in' | 'out';
  bizType?: 'TRANSFER' | 'TRADE_EXCHANGE';
  lastId?: number;
  limit?: number;
  startAt?: number;
  endAt?: number;
}

export interface AccountHFMarginTransactionsRequest {
  currency?: string;
  direction?: 'in' | 'out';
  bizType?:
    | 'TRANSFER'
    | 'MARGIN_EXCHANGE'
    | 'ISOLATED_EXCHANGE'
    | 'LIQUIDATION'
    | 'ASSERT_RETURN';
  lastId?: number;
  limit?: number;
  startAt?: number;
  endAt?: number;
}

export interface CreateSubAccountRequest {
  password: string;
  remarks?: string;
  subName: string;
  access: string;
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
 *
 ***********
 * Funding
 ***********
 *
 */

export interface GetMarginAccountBalanceDetailRequest {
  quoteCurrency?: string;
  queryType?: 'MARGIN' | 'MARGIN_V2' | 'ALL';
}

export interface GetIsolatedMarginAccountBalanceDetailRequest {
  symbol?: string;
  quoteCurrency?: string;
  queryType?: 'ISOLATED' | 'ISOLATED_V2' | 'ALL';
}

/**
 *
 * Deposit
 *
 */
