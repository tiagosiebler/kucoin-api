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


export interface MarginBalance {
  timestamp: number;
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: MarginAccountDetail[];
}

export interface IsolatedMarginBalance {
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

export interface Deposits {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: DepositItem[];
}

export interface V1HistoricalDeposits {
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

export interface Withdrawals {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: WithdrawalItem[];
}

export interface V1HistoricalWithdrawals {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: HistoricalWithdrawalItem[];
}

export interface WithdrawalQuotas{
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

export interface TransferableFunds {
  currency: string; // Currency
  balance: string; // Total funds in an account.
  available: string; // Funds available to withdraw or trade.
  holds: string; // Funds on hold (not available for use).
  transferable: string; // Funds available to transfer.
}
