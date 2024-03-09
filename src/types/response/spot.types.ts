export interface SpotAccountBalance {
  id: string;
  currency: string;
  type: string;
  balance: string;
  available: string;
  holds: string;
}

export interface AccountSummaryResponse {
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

export interface BalancesResponse {
  id: string;
  currency: string;
  type: 'main' | 'trade' | 'trade_hf' | 'margin';
  balance: string;
  available: string;
  holds: string;
}

export interface AccountResponse {
  currency: string;
  balance: string;
  available: string;
  holds: string;
}

export interface AccountTransactionsResponse {
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

export interface AccountHFTransactionsResponse {
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

export interface AccountHFMarginTransactionsResponse {
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

export interface GetSubAccountsV2Response {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: SubAccountInfo[];
}

export interface CreateSubAccountResponse {
  uid: number;
  subName: string;
  remarks: string;
  access: string;
}

export interface GetSubAccountBalanceResponse {
  subUserId: string;
  subName: string;
  mainAccounts: SubAccountBalance[];
  tradeAccounts: SubAccountBalance[];
  marginAccounts: SubAccountBalance[];
}

export interface GetSubAccountBalancesV2Response {
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

export interface CreateSubAccountAPIResponse extends SubAccountAPIInfo {
  apiSecret: string;
  passphrase: string;
}

export interface UpdateSubAccountAPIResponse {
  apiKey: string;
  ipWhitelist: string;
  permission: string;
  subName: string;
}

export interface DeleteSubAccountAPIResponse {
  subName: string;
  apiKey: string;
}

/**
 *
 ***********
 * Funding
 ***********
 *
 */

export interface MarginAccountBalance {
  currency: string;
  totalBalance: string;
  availableBalance: string;
  holdBalance: string;
  liability: string;
  maxBorrowSize: string;
}

export interface MarginAssetDetail {
  currency: string;
  borrowEnabled: boolean;
  repayEnabled: boolean;
  transferEnabled: boolean;
  borrowed: string;
  totalAsset: string;
  available: string;
  hold: string;
  maxBorrowSize: string;
}

export interface MarginAccountDetail {
  totalLiabilityOfQuoteCurrency: string;
  totalAssetOfQuoteCurrency: string;
  debtRatio: string;
  status: 'EFFECTIVE' | 'BANKRUPTCY' | 'LIQUIDATION' | 'REPAY' | 'BORROW';
  assets: MarginAssetDetail[];
}

export interface IsolatedMarginAssetDetail {
  symbol: string;
  debtRatio: string;
  status: 'EFFECTIVE' | 'BANKRUPTCY' | 'LIQUIDATION' | 'REPAY' | 'BORROW';
  baseAsset: MarginAssetDetail;
  quoteAsset: MarginAssetDetail;
}

export interface GetMarginAccountBalancesResponse {
  debtRatio: string;
  accounts: MarginAccountBalance[];
}

export interface GetMarginAccountBalanceDetailResponse {
  timestamp: number;
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: MarginAccountDetail[];
}

export interface IsolatedMarginAccountDetailResponse {
  totalAssetOfQuoteCurrency: string;
  totalLiabilityOfQuoteCurrency: string;
  timestamp: number;
  assets: IsolatedMarginAssetDetail[];
}

/**
 *
 * Deposit
 *
 */
