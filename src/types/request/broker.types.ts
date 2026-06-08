export interface GetBrokerInfoRequest {
  begin: string;
  end: string;
  tradeType: '1' | '2';
}

export interface GetBrokerSubAccountsRequest {
  uid: string;
  currentPage?: number;
  pageSize?: number;
}

export type BrokerSubAccountPermission =
  | 'General'
  | 'Spot'
  | 'Margin'
  | 'Futures'
  | 'InnerTransfer'
  | 'Transfer'
  | 'Earn';

export interface CreateBrokerSubAccountApiRequest {
  uid: string;
  passphrase: string;
  ipWhitelist: string[];
  permissions: BrokerSubAccountPermission[];
  label: string;
}

export interface GetBrokerSubAccountApisRequest {
  uid: string;
  apiKey?: string;
}

export interface UpdateBrokerSubAccountApiRequest {
  uid: string;
  apiKey: string;
  ipWhitelist: string[];
  permissions: BrokerSubAccountPermission[];
  label: string;
}

export interface DeleteBrokerSubAccountApiRequest {
  uid: string;
  apiKey: string;
}

export type BrokerTransferDirection = 'OUT' | 'IN';
export type BrokerAccountType = 'MAIN' | 'TRADE';

export interface BrokerTransferRequest {
  currency: string;
  amount: string;
  clientOid: string;
  direction: BrokerTransferDirection;
  accountType: BrokerAccountType;
  specialUid: string;
  specialAccountType: BrokerAccountType;
}

export interface GetBrokerDepositListRequest {
  currency?: string;
  status?:
    | 'PROCESSING'
    | 'SUCCESS'
    | 'FAILURE'
    | 'PRE_SUCCESS'
    | 'WAIT_TRM_MGT'
    | 'TRM_MGT_REJECTED'
    | 'ROLLBACKING'
    | 'ROLLBACK'
    | 'WAIT_RISK_MGT'
    | 'RISK_MGT_REJECTED';
  hash?: string;
  startTimestamp?: number;
  endTimestamp?: number;
  limit?: number;
}

export interface FastApiWithdrawValidationFactor {
  factorType: string;
  factorValue: string;
}

export interface FastApiWithdrawValidation {
  factors: FastApiWithdrawValidationFactor[];
  transactionId: string;
}

export interface FastApiWithdrawApplyRequest {
  address: string;
  amount: number;
  currency: string;
  memo: string;
  remark: string;
  chain?: string;
  feeDeductType?: 'EXTERNAL' | 'INTERNAL';
  isInner?: boolean;
  wallet?: string;
  withdrawType?: 'ADDRESS' | 'MAIL' | 'PHONE' | 'UID';
  validation?: FastApiWithdrawValidation;
  tin?: string;
  country?: string;
  lastName?: string;
  firstName?: string;
  identityNo?: string;
  companyName?: string;
  identityType?: string;
  receiverType?: 'COMPANY' | 'INDIVIDUAL';
  questionnaire?: string;
  reasonOfTransfer?: string;
}
