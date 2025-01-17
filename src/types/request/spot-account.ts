export interface GetBalancesRequest {
  currency?: string;
  type?: 'main' | 'trade';
}

export interface GetSpotTransactionsRequest {
  currency?: string;
  direction?: 'in' | 'out';
  bizType?:
    | 'DEPOSIT'
    | 'WITHDRAW'
    | 'TRANSFER'
    | 'SUB_TRANSFER'
    | 'TRADE_EXCHANGE'
    | 'MARGIN_EXCHANGE'
    | 'KUCOIN_BONUS'
    | 'BROKER_TRANSFER'
    | 'REBATE';
  startAt?: number;
  endAt?: number;
  currentPage?: number;
  pageSize?: number;
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
