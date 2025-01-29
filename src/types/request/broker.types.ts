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

export type BrokerSubAccountPermission = 'general' | 'spot' | 'futures';

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
  status?: 'PROCESSING' | 'SUCCESS' | 'FAILURE';
  hash?: string;
  startTimestamp?: number;
  endTimestamp?: number;
  limit?: number;
}
