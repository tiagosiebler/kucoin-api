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
  currency: string;
  total: string;
  available: string;
  hold: string;
  liability: string;
  maxBorrowSize: string;
  borrowEnabled: boolean;
  transferInEnabled: boolean;
}

export interface MarginBalance {
  totalAssetOfQuoteCurrency: string;
  totalLiabilityOfQuoteCurrency: string;
  debtRatio: string;
  status: 'EFFECTIVE' | 'BANKRUPTCY' | 'LIQUIDATION' | 'REPAY' | 'BORROW';
  accounts: MarginAccountDetail[];
}

export interface IsolatedMarginBalance {
  totalAssetOfQuoteCurrency: string;
  totalLiabilityOfQuoteCurrency: string;
  timestamp: number;
  assets: IsolatedMarginAssetDetail[];
}

export interface IsolatedMarginAssetDetail {
  symbol: string;
  debtRatio: string;
  status: 'EFFECTIVE' | 'BANKRUPTCY' | 'LIQUIDATION' | 'REPAY' | 'BORROW';
  baseAsset: MarginAssetDetail;
  quoteAsset: MarginAssetDetail;
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

export type DepositAddressV2 = DepositAddress & {
  contractAddress: string;
};

export interface DepositAddressV3 {
  address: string;
  memo: string;
  chainId: string;
  to: 'MAIN' | 'TRADE'; // main (funding account), trade (spot trading account)
  expirationDate: number;
  currency: string;
  contractAddress: string;
  chainName: string;
}

export interface HistoricalDepositItem {
  currency: string;
  createAt: number;
  amount: string;
  walletTxId: string;
  isInner: boolean;
  status: 'PROCESSING' | 'SUCCESS' | 'FAILURE';
}

export interface Deposits {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: DepositItem[];
}

export interface DepositItem {
  currency?: string;
  chain?: string;
  status?: 'PROCESSING' | 'SUCCESS' | 'FAILURE';
  address?: string;
  memo?: string;
  isInner?: boolean;
  amount?: string;
  fee?: string;
  walletTxId?: string | null;
  createdAt?: number;
  updatedAt?: number;
  remark?: string;
  arrears?: boolean;
}

export interface V1HistoricalDeposits {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: HistoricalDepositItem[];
}

export interface CreateDepositAddressV3Response {
  address: string;
  memo: string | null;
  chainName: string;
  chainId: string;
  to: string;
  currency: string;
  expirationDate?: string;
}

/**
 *
 * Withdrawals
 *
 */

interface DetailedWithdrawal {
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

interface HistoricalWithdrawal {
  currency: string;
  createAt: number;
  amount: string;
  address: string;
  walletTxId: string;
  isInner: boolean;
  status: 'PROCESSING' | 'SUCCESS' | 'FAILURE';
}

export interface Withdrawals {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: DetailedWithdrawal[];
}

export interface HistoricalWithdrawalsV1 {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: HistoricalWithdrawal[];
}

export interface WithdrawalQuotas {
  currency: string;
  limitBTCAmount: string;
  usedBTCAmount: string;
  quotaCurrency: string;
  limitQuotaCurrencyAmount: string;
  usedQuotaCurrencyAmount: string;
  remainAmount: string;
  availableAmount: string;
  withdrawMinFee: string;
  innerWithdrawMinFee: string;
  withdrawMinSize: string;
  isWithdrawEnabled: boolean;
  precision: number;
  chain: string;
  reason: string | null;
  lockedAmount: string;
}

/**
 *
 * Transfer
 *
 */

export interface TransferableFunds {
  currency: string; // Currency
  balance: string; // Total funds in an account.
  available: string; // Funds available to withdraw or trade.
  holds: string; // Funds on hold (not available for use).
  transferable: string; // Funds available to transfer.
}
