/**
 *
 ***********
 * Funding
 ***********
 *
 */

export interface GetMarginBalanceRequest {
  quoteCurrency?: string;
  queryType?: 'MARGIN' | 'MARGIN_V2' | 'ALL';
  currentPage?: number;
  pageSize?: number;
}

export interface GetIsolatedMarginBalanceRequest {
  symbol?: string;
  quoteCurrency?: string;
  queryType?: 'ISOLATED' | 'ISOLATED_V2' | 'ALL';
}

/**
 *
 * Deposit
 *
 */

export interface GetDepositsRequest {
  currency?: string;
  startAt?: number;
  endAt?: number;
  status?: 'PROCESSING' | 'SUCCESS' | 'FAILURE';
  currentPage?: number;
  pageSize?: number;
}

/**
 *
 * Withdrawals
 *
 */

export interface GetWithdrawalsRequest {
  currency?: string;
  status?: 'PROCESSING' | 'WALLET_PROCESSING' | 'SUCCESS' | 'FAILURE';
  startAt?: number;
  endAt?: number;
  currentPage?: number;
  pageSize?: number;
}

export interface ApplyWithdrawRequest {
  currency: string;
  address: string;
  amount: number;
  memo?: string;
  isInner?: boolean;
  remark?: string;
  chain?: string;
  feeDeductType?: 'INTERNAL' | 'EXTERNAL';
}

/**
 *
 * Transfer
 *
 */

export interface GetTransferableRequest {
  currency: string;
  type: 'MAIN' | 'TRADE' | 'TRADE_HF' | 'MARGIN' | 'ISOLATED';
  tag?: string;
}

export interface FlexTransferRequest {
  clientOid: string;
  currency?: string;
  amount: string;
  fromUserId?: string;
  fromAccountType:
    | 'MAIN'
    | 'TRADE'
    | 'CONTRACT'
    | 'MARGIN'
    | 'ISOLATED'
    | 'TRADE_HF'
    | 'MARGIN_V2'
    | 'ISOLATED_V2';
  fromAccountTag?: string;
  type: 'INTERNAL' | 'PARENT_TO_SUB' | 'SUB_TO_PARENT';
  toUserId?: string;
  toAccountType:
    | 'MAIN'
    | 'TRADE'
    | 'CONTRACT'
    | 'MARGIN'
    | 'ISOLATED'
    | 'TRADE_HF'
    | 'MARGIN_V2'
    | 'ISOLATED_V2';
  toAccountTag?: string;
}

export interface submitTransferMasterSubRequest {
  clientOid: string;
  currency: string;
  amount: string;
  direction: 'OUT' | 'IN';
  accountType?: 'MAIN' | 'TRADE' | 'TRADE_HF' | 'MARGIN' | 'CONTRACT';
  subAccountType?: 'MAIN' | 'TRADE' | 'TRADE_HF' | 'MARGIN' | 'CONTRACT';
  subUserId: string;
}

export interface InnerTransferRequest {
  clientOid: string;
  currency: string;
  from:
    | 'main'
    | 'trade'
    | 'trade_hf'
    | 'margin'
    | 'isolated'
    | 'margin_v2'
    | 'isolated_v2'
    | 'contract';
  to:
    | 'main'
    | 'trade'
    | 'trade_hf'
    | 'margin'
    | 'isolated'
    | 'margin_v2'
    | 'isolated_v2'
    | 'contract';
  amount: string;
  fromTag?: string;
  toTag?: string;
}
