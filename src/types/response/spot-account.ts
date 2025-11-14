export interface SpotAccountSummary {
  level: number;
  subQuantity: number;
  spotSubQuantity: number;
  marginSubQuantity: number;
  futuresSubQuantity: number;
  optionSubQuantity: number;
  maxSubQuantity: number;
  maxDefaultSubQuantity: number;
  maxSpotSubQuantity: number;
  maxMarginSubQuantity: number;
  maxFuturesSubQuantity: number;
  maxOptionSubQuantity: number;
}

export interface Balances {
  id: string;
  currency: string;
  type: 'main' | 'trade';
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

export interface SpotAccountTransaction {
  id: string;
  currency: string;
  amount: string;
  fee: string;
  tax: string;
  balance: string;
  accountType: string; // 'TRADE_HF'
  bizType: string;
  direction: 'out' | 'in';
  createdAt: string;
  context: string;
}

export interface SpotAccountTransactions {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: SpotAccountTransaction[];
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
  tax: string;
  context: string;
}

/**
 *
 * Sub-Account
 *
 */

export interface SubAccountInfo {
  userId: string;
  uid: number;
  subName: string;
  status: number;
  type: number;
  access: string;
  createdAt: number;
  remarks: string;
  tradeTypes: string[];
  openedTradeTypes: string[];
  hostedStatus: null | string;
}

export interface SubAccountsV2 {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: SubAccountInfo[];
}

export interface SubAccountItem {
  userId: string;
  uid: number;
  subName: string;
  status: number;
  type: number;
  access: string;
  createdAt: number;
  remarks: string;
  tradeTypes: string[];
  openedTradeTypes: string[];
  hostedStatus: null | string;
}

export interface CreateSubAccount {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: SubAccountItem[];
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

// deprecated
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
export interface SubAccountV2Details {
  currency?: string;
  balance?: string;
  available?: string;
  holds?: string;
  baseCurrency?: string;
  baseCurrencyPrice?: string;
  baseAmount?: string;
  tag?: string;
}

export interface SubAccountBalanceItemV2 {
  subUserId: string;
  subName: string;
  mainAccounts: SubAccountV2Details[]; // Funding Account
  tradeAccounts: SubAccountV2Details[]; // Spot Account
  marginAccounts: SubAccountV2Details[]; // Margin Account
  tradeHFAccounts: string[]; // Deprecated, only for old users
}

/**
 *
 * Sub-Account API
 *
 *
 */

export interface SubAccountAPIInfo {
  subName: string;
  remark: string;
  apiKey: string;
  apiVersion: number;
  permission: string;
  ipWhitelist: string;
  createdAt: number;
  uid: number;
  isMaster: boolean;
}

export interface CreateSubAPI {
  subName: string;
  remark: string;
  apiKey: string;
  apiSecret: string;
  apiVersion: number;
  passphrase: string;
  permission: string;
  createdAt: number;
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

/**
 * Get KYC Regions Response
 */
export interface KYCRegion {
  code: string; // Two-letter country code
  enName: string; // English name of the region
}

/**
 * Get API Key Info Response
 */
export interface ApiKeyInfo {
  uid: number; // Account UID
  parentUid?: number; // Master account UID. Returns empty when called by the master account itself
  region: string; // KYC region of the account, returns the two-letter country code
  kycStatus: 0 | 1; // KYC status
  subName?: string; // Sub-account name (not present for the master account)
  remark: string; // Remarks
  apiKey: string; // API key
  apiVersion: number; // API version
  permission: string; // Permissions
  ipWhitelist?: string; // IP whitelist (comma-separated list of allowed IPs)
  isMaster: boolean; // Indicates whether this is the master account
  createdAt: number; // API key creation timestamp (Unix milliseconds)
  expiredAt?: number | null; // API key expiration timestamp (Unix milliseconds). Returns null if no expiration is set
  thirdPartyApp?: string; // Third-party application name. Returns empty string if not associated with any third-party app
}
