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

export interface GetMarginBalancesResponse {
  debtRatio: string;
  accounts: MarginAccountBalance[];
}

export interface GetMarginBalanceResponse {
  timestamp: number;
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: MarginAccountDetail[];
}

export interface GetIsolatedMarginBalanceResponse {
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

export interface DepositAddress {
  address: string;
  memo: string;
  chain: string;
}

export interface DepositAddressV2 extends DepositAddress {
  contractAddress: string;
}

export interface DepositItem {
  address: string;
  memo: string;
  amount: string;
  fee: string;
  currency: string;
  chain: string;
  isInner: boolean;
  walletTxId: string;
  status: 'PROCESSING' | 'SUCCESS' | 'FAILURE';
  remark: string;
  createdAt: number;
  updatedAt: number;
}

export interface HistoricalDepositItem {
  currency: string;
  createAt: number;
  amount: string;
  walletTxId: string;
  isInner: boolean;
  status: 'PROCESSING' | 'SUCCESS' | 'FAILURE';
}

export interface GetDepositsResponse {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: DepositItem[];
}

export interface GetV1HistoricalDepositsResponse {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: HistoricalDepositItem[];
}

/**
 *
 * Withdrawals
 *
 */

interface WithdrawalItem {
  id: string;
  address: string;
  memo: string;
  currency: string;
  chain: string;
  amount: string;
  fee: string;
  walletTxId: string;
  isInner: boolean;
  status: 'PROCESSING' | 'WALLET_PROCESSING' | 'SUCCESS' | 'FAILURE';
  remark: string;
  createdAt: number;
  updatedAt: number;
}

interface HistoricalWithdrawalItem {
  currency: string;
  createAt: number;
  amount: string;
  address: string;
  walletTxId: string;
  isInner: boolean;
  status: 'PROCESSING' | 'SUCCESS' | 'FAILURE';
}

export interface GetWithdrawalsResponse {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: WithdrawalItem[];
}

export interface GetV1HistoricalWithdrawalsResponse {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: HistoricalWithdrawalItem[];
}

export interface GetWithdrawalQuotasResponse {
  limitBTCAmount: string;
  quotaCurrency: string;
  chain: string;
  remainAmount: string;
  innerWithdrawMinFee: string;
  usedBTCAmount: string;
  limitQuotaCurrencyAmount: string;
  withdrawMinSize: string;
  withdrawMinFee: string;
  precision: number;
  reason: string | null;
  usedQuotaCurrencyAmount: string;
  currency: string;
  availableAmount: string;
  isWithdrawEnabled: boolean;
}

/**
 *
 * Transfer
 *
 */

export interface TransferableResponse {
  currency: string; // Currency
  balance: string; // Total funds in an account.
  available: string; // Funds available to withdraw or trade.
  holds: string; // Funds on hold (not available for use).
  transferable: string; // Funds available to transfer.
}
