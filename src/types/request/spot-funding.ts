/**
 *
 ***********
 * Funding
 ***********
 *
 */

export interface CreateDepositAddressV3Request {
  currency: string;
  chain?: string;
  to?: 'main' | 'trade';
  amount?: string;
}

export interface GetMarginBalanceRequest {
  quoteCurrency?: string;
  queryType?: 'MARGIN' | 'MARGIN_V2' | 'ALL';
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

export interface SubmitWithdrawV3Request {
  currency: string;
  toAddress: string;
  amount: number;
  memo?: string;
  isInner?: boolean;
  remark?: string;
  chain?: string;
  feeDeductType?: 'INTERNAL' | 'EXTERNAL';
  withdrawType: 'ADDRESS' | 'UID' | 'MAIL' | 'PHONE';
}

/**
 *
 * Transfer
 *
 */

export interface GetTransferableRequest {
  currency: string;
  type: 'MAIN' | 'TRADE' | 'TRADE_HF' | 'MARGIN' | 'ISOLATED' | 'OPTION';
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
    | 'ISOLATED_V2'
    | 'OPTION';
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
    | 'ISOLATED_V2'
    | 'OPTION';
  toAccountTag?: string;
}

export interface submitTransferMasterSubRequest {
  clientOid: string;
  currency: string;
  amount: string;
  direction: 'OUT' | 'IN';
  accountType?:
    | 'MAIN'
    | 'TRADE'
    | 'TRADE_HF'
    | 'MARGIN'
    | 'CONTRACT'
    | 'OPTION';
  subAccountType?:
    | 'MAIN'
    | 'TRADE'
    | 'TRADE_HF'
    | 'MARGIN'
    | 'CONTRACT'
    | 'OPTION';
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
    | 'contract'
    | 'option';
  to:
    | 'main'
    | 'trade'
    | 'trade_hf'
    | 'margin'
    | 'isolated'
    | 'margin_v2'
    | 'isolated_v2'
    | 'contract'
    | 'option';
  amount: string;
  fromTag?: string;
  toTag?: string;
}
