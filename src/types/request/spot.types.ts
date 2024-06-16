export interface NewSpotOrderV1 {
  clientOid: string;
  side: 'buy' | 'sell';
  symbol: string;
  type?: 'market' | 'limit';
  remark?: string;
  stp?: 'CN' | 'CO' | 'CB' | 'DC';
  tradeType?: 'TRADE' | 'MARGIN_TRADE';
  price?: string;
  size?: string;
  funds?: string;
  timeInForce?: 'GTC' | 'GTT' | 'IOC' | 'FOK';
  cancelAfter?: number;
  postOnly?: boolean;
  hidden?: boolean;
  iceberg?: boolean;
  visibleSize?: string;
}

export interface GetBalancesRequest {
  currency?: string;
  type?: 'main' | 'trade' | 'margin' | 'trade_hf';
}

export interface AccountTransactionsRequest {
  currency?: string;
  direction?: 'in' | 'out';
  bizType?:
    | 'DEPOSIT'
    | 'WITHDRAW'
    | 'TRANSFER'
    | 'SUB_TRANSFER'
    | 'TRADE_EXCHANGE'
    | 'MARGIN_EXCHANGE'
    | 'KUCOIN_BONUS';
  startAt?: number;
  endAt?: number;
}

export interface AccountHFTransactionsRequest {
  currency?: string;
  direction?: 'in' | 'out';
  bizType?: 'TRANSFER' | 'TRADE_EXCHANGE';
  lastId?: number;
  limit?: number;
  startAt?: number;
  endAt?: number;
}

export interface AccountHFMarginTransactionsRequest {
  currency?: string;
  direction?: 'in' | 'out';
  bizType?:
    | 'TRANSFER'
    | 'MARGIN_EXCHANGE'
    | 'ISOLATED_EXCHANGE'
    | 'LIQUIDATION'
    | 'ASSERT_RETURN';
  lastId?: number;
  limit?: number;
  startAt?: number;
  endAt?: number;
}

export interface CreateSubAccountRequest {
  password: string;
  remarks?: string;
  subName: string;
  access: string;
}

export interface CreateSubAccountAPIRequest {
  subName: string;
  passphrase: string;
  remark: string;
  permission?: string;
  ipWhitelist?: string;
  expire?: string;
}

export interface UpdateSubAccountAPIRequest {
  subName: string;
  apiKey: string;
  passphrase: string;
  permission?: string;
  ipWhitelist?: string;
  expire?: string;
}

export interface DeleteSubAccountAPIRequest {
  apiKey: string;
  passphrase: string;
  subName: string;
}

/**
 *
 ***********
 * Funding
 ***********
 *
 */

export interface GetMarginAccountBalanceDetailRequest {
  quoteCurrency?: string;
  queryType?: 'MARGIN' | 'MARGIN_V2' | 'ALL';
}

export interface GetIsolatedMarginAccountBalanceDetailRequest {
  symbol?: string;
  quoteCurrency?: string;
  queryType?: 'ISOLATED' | 'ISOLATED_V2' | 'ALL';
}

/**
 *
 * Deposit
 *
 */

export interface GetDepositListRequest {
  currency?: string;
  startAt?: number;
  endAt?: number;
  status?: 'PROCESSING' | 'SUCCESS' | 'FAILURE';
}

export interface GetV1HistoricalDepositsListRequest {
  currency?: string;
  startAt?: number;
  endAt?: number;
  status?: 'PROCESSING' | 'SUCCESS' | 'FAILURE';
}

/**
 *
 * Withdrawals
 *
 */

export interface GetWithdrawalsListRequest {
  currency?: string;
  status?: 'PROCESSING' | 'WALLET_PROCESSING' | 'SUCCESS' | 'FAILURE';
  startAt?: number;
  endAt?: number;
}

export interface GetV1HistoricalWithdrawalsListRequest {
  currency?: string;
  startAt?: number;
  endAt?: number;
  status?: 'PROCESSING' | 'SUCCESS' | 'FAILURE';
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

export interface TransferBetweenMasterAndSubAccountRequest {
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

/**
 *
 ***********
 * Spot Trading
 ***********
 *
 */

/**
 *
 * Market data
 *
 */

export interface GetKlinesRequest {
  symbol: string;
  startAt?: number;
  endAt?: number;
  type:
    | '1min'
    | '3min'
    | '5min'
    | '15min'
    | '30min'
    | '1hour'
    | '2hour'
    | '4hour'
    | '6hour'
    | '8hour'
    | '12hour'
    | '1day'
    | '1week'
    | '1month';
}

/**
 *
 * Spot HF trade
 *
 */

export interface SubmitHFOrderRequest {
  clientOid?: string;
  symbol: string;
  type: 'limit' | 'market';
  side: 'buy' | 'sell';
  stp?: 'CN' | 'CO' | 'CB' | 'DC';
  tags?: string;
  remark?: string;
}

export interface SubmitMultipleHFOrdersRequest {
  clientOid?: string;
  symbol: string;
  type: 'limit' | 'market';
  timeInForce?: 'GTC' | 'GTT' | 'IOC' | 'FOK';
  stp?: 'CN' | 'CO' | 'CB' | 'DC';
  side: 'buy' | 'sell';
  price: string;
  size: string;
  cancelAfter?: number;
  postOnly?: boolean;
  hidden?: boolean;
  iceberg?: boolean;
  visibleSize?: string;
  tags?: string;
  remark?: string;
}

export interface ModifyHFOrderRequest {
  symbol: string;
  clientOid?: string;
  orderId?: string;
  newPrice?: string;
  newSize?: string;
}

export interface CancelSpecifiedNumberHFOrdersRequest {
  orderId: string;
  symbol: string;
  cancelSize: string;
}

export interface GetHFCompletedOrdersRequest {
  symbol: string;
  side?: 'buy' | 'sell';
  type?: 'limit' | 'market';
  startAt?: number;
  endAt?: number;
  lastId?: number;
  limit?: number;
}

export interface GetHFFilledListRequest {
  orderId?: string;
  symbol: string;
  side?: 'buy' | 'sell';
  type?: 'limit' | 'market';
  startAt?: number;
  endAt?: number;
  lastId?: number;
  limit?: number;
}

/**
 *
 * Orders
 *
 */

export interface SubmitOrderRequest {
  clientOid: string;
  side: 'buy' | 'sell';
  symbol: string;
  type?: 'limit' | 'market';
  remark?: string;
  stp?: 'CN' | 'CO' | 'CB' | 'DC';
  tradeType?: 'TRADE' | 'MARGIN_TRADE';
  price?: string;
  size?: string;
  timeInForce?: 'GTC' | 'GTT' | 'IOC' | 'FOK';
  cancelAfter?: number;
  postOnly?: boolean;
  hidden?: boolean;
  iceberg?: boolean;
  visibleSize?: string;
  funds?: string;
}

export interface SubmitMultipleOrdersRequest {
  clientOid: string;
  side: 'buy' | 'sell';
  symbol: string;
  type?: 'limit';
  remark?: string;
  stop?: 'loss' | 'entry';
  stopPrice?: string;
  stp?: 'CN' | 'CO' | 'CB' | 'DC';
  tradeType?: 'TRADE';
  price: string;
  size: string;
  timeInForce?: 'GTC' | 'GTT' | 'IOC' | 'FOK';
  cancelAfter?: number;
  postOnly?: boolean;
  hidden?: boolean;
  iceberg?: boolean;
  visibleSize?: string;
}

export interface CancelAllOrdersRequest {
  symbol?: string;
  tradeType?: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
}

export interface GetOrderListRequest {
  status?: 'active' | 'done';
  symbol?: string;
  side?: 'buy' | 'sell';
  type?: 'limit' | 'market' | 'limit_stop' | 'market_stop';
  tradeType?: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
  startAt?: number;
  endAt?: number;
}

/**
 *
 * Fills
 *
 */

export interface GetFilledListRequest {
  orderId?: string;
  symbol?: string;
  side?: 'buy' | 'sell';
  type?: 'limit' | 'market' | 'limit_stop' | 'market_stop';
  startAt?: number;
  endAt?: number;
  tradeType: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
}

/**
 *
 * Stop order
 *
 */

export interface SubmitStopOrderRequest {
  clientOid: string;
  side: 'buy' | 'sell';
  symbol: string;
  type?: 'limit' | 'market';
  remark?: string;
  stop?: 'loss' | 'entry';
  stopPrice?: string;
  stp?: 'CN' | 'CO' | 'CB' | 'DC';
  tradeType?: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
  price?: string;
  size?: string;
  timeInForce?: 'GTC' | 'GTT' | 'IOC' | 'FOK';
  cancelAfter?: number;
  postOnly?: boolean;
  hidden?: boolean;
  iceberg?: boolean;
  visibleSize?: string;
  funds?: string;
}

export interface CancelStopOrdersRequest {
  symbol?: string;
  tradeType?: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
  orderIds?: string;
}

export interface GetStopOrdersListRequest {
  symbol?: string;
  side?: 'buy' | 'sell';
  type?: 'limit' | 'market' | 'limit_stop' | 'market_stop';
  tradeType?: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
  startAt?: number;
  endAt?: number;
  currentPage?: number;
  orderIds?: string;
  pageSize?: number;
  stop?: 'stop' | 'oco';
}

/**
 *
 * OCO order
 *
 */

export interface SubmitOCOOrderRequest {
  symbol: string;
  side: 'buy' | 'sell';
  price: string;
  size: string;
  stopPrice: string;
  limitPrice: string;
  tradeType?: 'TRADE'; // Currently only supports TRADE
  clientOid: string;
  remark?: string;
}

export interface GetOCOOrdersListRequest {
  pageSize: string;
  currentPage: string;
  symbol?: string;
  startAt?: number;
  endAt?: number;
  orderIds?: string;
}

/**
 *
 ***********
 * Margin Trading
 ***********
 *
 */

/**
 *
 * Margin HF trade
 *
 */

export interface SubmitHFMarginOrderRequest {
  clientOid: string;
  side: 'buy' | 'sell';
  symbol: string;
  type?: 'limit' | 'market';
  stp?: 'CN' | 'CO' | 'CB' | 'DC';
  isIsolated?: boolean;
  autoBorrow?: boolean;
  autoRepay?: boolean;
  price?: string;
  size?: string;
  timeInForce?: 'GTC' | 'GTT' | 'IOC' | 'FOK';
  cancelAfter?: number;
  postOnly?: boolean;
  hidden?: boolean;
  iceberg?: boolean;
  visibleSize?: string;
  funds?: string;
}

export interface HFMarginOrder {
  symbol: string;
  tradeType: 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
}

export interface GetHFMarginFilledListRequest {
  symbol: string;
  tradeType: 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
  side?: 'buy' | 'sell';
  type?: 'limit' | 'market';
  startAt?: number;
  endAt?: number;
  lastId?: number;
  limit?: number;
}

export interface GetHFMarginTransactionRecordsRequest {
  orderId?: string;
  symbol: string;
  tradeType: 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
  side?: 'buy' | 'sell';
  type?: 'limit' | 'market';
  startAt?: number;
  endAt?: number;
  lastId?: number;
  limit?: number;
}

/**
 *
 * Orders
 *
 */

export interface SubmitMarginOrderRequest {
  clientOid: string;
  side: 'buy' | 'sell';
  symbol: string;
  type?: 'limit' | 'market';
  remark?: string;
  stp?: 'CN' | 'CO' | 'CB' | 'DC';
  marginModel?: 'cross' | 'isolated';
  autoBorrow?: boolean;
  autoRepay?: boolean;
  price: string;
  size?: string;
  timeInForce?: 'GTC' | 'GTT' | 'IOC' | 'FOK';
  cancelAfter?: number;
  postOnly?: boolean;
  hidden?: boolean;
  iceberg?: boolean;
  visibleSize?: string;
  funds?: string;
}

/**
 *
 * Margin info
 *
 */

export interface MarginRiskLimitRequest {
  isIsolated: boolean;
  symbol?: string;
  currency?: string;
}

/**
 *
 * Isolated Margin
 *
 */

/**
 *
 * Margin trading(v3)
 *
 */

export interface MarginBorrowV3Request {
  isIsolated?: boolean;
  symbol?: string;
  currency: string;
  size: number;
  timeInForce: 'IOC' | 'FOK';
  isHf: boolean;
}

export interface MarginRepayV3Request {
  isIsolated?: boolean;
  symbol?: string;
  currency: string;
  size: number;
  isHf: boolean;
}

export interface MarginHistoryV3Request {
  currency: string;
  isIsolated?: boolean;
  symbol?: string;
  orderNo?: string;
  startTime?: number;
  endTime?: number;
  currentPage?: number;
  pageSize?: number;
}

/**
 *
 * Lending market(v3)
 *
 */

export interface InitiateLendingSubscriptionV3Request {
  currency: string;
  size: string;
  interestRate: string;
}

export interface InitiateLendingRedemptionV3Request {
  currency: string;
  size: string;
  purchaseOrderNo: string;
}

export interface ModifyLendingSubscriptionOrdersV3Request {
  currency: string;
  purchaseOrderNo: string;
  interestRate: string;
}

export interface GetLendingRedemptionOrdersV3Request {
  currency: string;
  redeemOrderNo?: string;
  status: 'DONE' | 'PENDING';
  currentPage?: number;
  pageSize?: number;
}

export interface GetLendingSubscriptionOrdersV3Request {
  currency: string;
  purchaseOrderNo?: string;
  status: 'DONE' | 'PENDING';
  currentPage?: number;
  pageSize?: number;
}

/**
 *
 * EARN
 *
 */

export interface SubscribeEarnFixedIncomeRequest {
  productId: string;
  amount: string;
  accountType: 'MAIN' | 'TRADE';
}

export interface InitiateRedemptionRequest {
  orderId: string;
  amount: string;
  fromAccountType?: 'MAIN' | 'TRADE';
  confirmPunishRedeem?: '1';
}

export interface GetEarnRedeemPreviewRequest {
  orderId: string;
  fromAccountType?: 'MAIN' | 'TRADE';
}

export interface GetEarnFixedIncomeHoldAssetsRequest {
  currentPage?: number;
  pageSize?: number;
  productId?: string;
  productCategory?: string;
  currency?: string;
}

/**
 *
 ***********
 * VIP LENDING
 ***********
 *
 */
