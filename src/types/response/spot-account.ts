export interface SpotAccountSummary {
  level: number;
  subQuantity: number;
  maxDefaultSubQuantity: number;
  maxSubQuantity: number;
  spotSubQuantity: number;
  marginSubQuantity: number;
  futuresSubQuantity: number;
  maxSpotSubQuantity: number;
  maxMarginSubQuantity: number;
  maxFuturesSubQuantity: number;
}

export interface Balances {
  id: string;
  currency: string;
  type: 'main' | 'trade' | 'trade_hf' | 'margin';
  balance: string;
  available: string;
  holds: string;
}

export interface Account {
  currency: string;
  balance: string;
  available: string;
  holds: string;
}

export interface SpotAccountTransactions {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: {
    id: string;
    currency: string;
    amount: string;
    fee: string;
    balance: string;
    accountType: 'MAIN' | 'TRADE' | 'MARGIN' | 'CONTRACT';
    bizType: string;
    direction: 'in' | 'out';
    createdAt: number;
    context: string;
  }[];
}

export interface AccountHFTransactions {
  id: string;
  currency: string;
  amount: string;
  fee: string;
  balance: string;
  accountType: 'TRADE_HF';
  bizType: 'TRANSFER' | 'TRADE_EXCHANGE';
  direction: 'out' | 'in';
  createdAt: string;
  context: string;
}

export interface AccountHFMarginTransactions {
  id: string;
  currency: string;
  amount: string;
  fee: string;
  balance: string;
  accountType: 'MARGIN_V2' | 'ISOLATED_V2';
  bizType:
    | 'TRANSFER'
    | 'MARGIN_EXCHANGE'
    | 'ISOLATED_EXCHANGE'
    | 'LIQUIDATION'
    | 'ASSERT_RETURN';
  direction: 'out' | 'in';
  createdAt: string;
  context: string;
}

/**
 *
 * Sub-Account
 *
 */

export interface SubAccountInfo {
  userId: string;
  uid: string | number;
  subName: string;
  type: number;
  remarks: string | null;
  access: string;
  status?: number;
  createdAt?: number;
}

export interface SubAccountBalance {
  currency: string;
  balance: string;
  available: string;
  holds: string;
  baseCurrency: string;
  baseCurrencyPrice: string;
  baseAmount: string;
}

export interface SubAccountsV2 {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: SubAccountInfo[];
}

export interface CreateSubAccount {
  uid: number;
  subName: string;
  remarks: string;
  access: string;
}

export interface SubAccountBalances {
  subUserId: string;
  subName: string;
  mainAccounts: SubAccountBalance[];
  tradeAccounts: SubAccountBalance[];
  marginAccounts: SubAccountBalance[];
}

export interface SubAccountBalancesV2 {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: {
    subUserId: string;
    subName: string;
    mainAccounts: SubAccountBalance[];
  }[];
}

/**
 *
 * Sub-Account API
 *
 *
 */

export interface SubAccountAPIInfo {
  apiKey: string;
  createdAt: number;
  ipWhitelist: string;
  permission: string;
  remark: string;
  subName: string;
}

export interface CreateSubAPI extends SubAccountAPIInfo {
  apiSecret: string;
  passphrase: string;
}

export interface UpdateSubAPI {
  apiKey: string;
  ipWhitelist: string;
  permission: string;
  subName: string;
}

export interface DeleteSubAccountAPI {
  subName: string;
  apiKey: string;
}
