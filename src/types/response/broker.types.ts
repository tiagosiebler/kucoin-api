export interface BrokerInfo {
  accountSize: number;
  maxAccountSize: number | null;
  level: number;
}

export interface CreateBrokerSubAccountResponse {
  accountName: string;
  uid: string;
  createdAt: number;
  level: number;
}

export interface BrokerSubAccount {
  accountName: string;
  uid: string;
  createdAt: number;
  level: number;
}

export interface GetBrokerSubAccountsResponse {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: BrokerSubAccount[];
}

export interface CreateBrokerSubAccountApiResponse {
  uid: string;
  label: string;
  apiKey: string;
  secretKey: string;
  apiVersion: number;
  permissions: string[];
  ipWhitelist: string[];
  createdAt: number;
}

export interface BrokerSubAccountApi {
  uid: string;
  label: string;
  apiKey: string;
  apiVersion: number;
  permissions: ('General' | 'Spot' | 'Futures')[];
  ipWhitelist: string[];
  createdAt: number;
}

export type BrokerTransferAccountType =
  | 'MAIN'
  | 'TRADE'
  | 'CONTRACT'
  | 'MARGIN'
  | 'ISOLATED';
export type BrokerTransferStatus = 'PROCESSING' | 'SUCCESS' | 'FAILURE';

export interface BrokerTransferHistory {
  orderId: string;
  currency: string;
  amount: string;
  fromUid: number;
  fromAccountType: BrokerTransferAccountType;
  fromAccountTag: string;
  toUid: number;
  toAccountType: BrokerTransferAccountType;
  toAccountTag: string;
  status: BrokerTransferStatus;
  reason: string | null;
  createdAt: number;
}

export interface BrokerDepositRecord {
  uid: number;
  hash: string;
  address: string;
  memo: string;
  amount: string;
  fee: string;
  currency: string;
  isInner: boolean;
  walletTxId: string;
  status: BrokerTransferStatus;
  remark: string;
  chain: string;
  createdAt: number;
  updatedAt: number;
}

export type BrokerWithdrawalStatus =
  | 'PROCESSING'
  | 'WALLET_PROCESSING'
  | 'REVIEW'
  | 'SUCCESS'
  | 'FAILURE';

export interface BrokerWithdrawalRecord {
  id: string;
  chain: string;
  walletTxId: string;
  uid: number;
  amount: string;
  memo: string;
  fee: string;
  address: string;
  remark: string;
  isInner: boolean;
  currency: string;
  status: BrokerWithdrawalStatus;
  createdAt: number;
  updatedAt: number;
}
