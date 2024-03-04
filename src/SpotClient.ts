import { AxiosRequestConfig } from 'axios';
import { nanoid } from 'nanoid';

import { BaseRestClient } from './lib/BaseRestClient.js';
import {
  REST_CLIENT_TYPE_ENUM,
  RestClientOptions,
  RestClientType,
} from './lib/requestUtils.js';
import { APISuccessResponse } from './types/response/shared.types.js';
import { SpotAccountBalance } from './types/response/spot.types.js';

/**
 *
 */
export class SpotClient extends BaseRestClient {
  constructor(
    restClientOptions: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {},
  ) {
    super(restClientOptions, requestOptions);
    return this;
  }

  getClientType(): RestClientType {
    return REST_CLIENT_TYPE_ENUM.main;
  }

  /**
   *
   * Misc Utility Methods
   *
   */

  generateNewOrderID(): string {
    return nanoid(32);
  }

  /**
   *
   ***********
   * Account
   ***********
   *
   */

  /**
   *
   * Basic Info
   *
   */

  getAccountSummary(): Promise<APISuccessResponse<{}>> {
    return this.getPrivate('api/v2/user-info');
  }

  /**
   * Get a list of acounts and their balance states (spot/margin/trade_hf)
   *
   * Get Account List - Spot/Margin/trade_hf
   */
  getBalances(params?: {
    currency?: string;
    type?: 'main' | 'trade' | 'margin' | 'trade_hf';
  }): Promise<SpotAccountBalance[]> {
    return this.getPrivate('api/v1/accounts', params);
  }

  getAccount(params: { accountId: any }): Promise<any> {
    return this.getPrivate(`api/v1/accounts/${params.accountId}`);
  }

  /**
   * Get Account Ledgers - Spot/Margin
   */
  getAccountSpotMarginTransactions(params: {
    currency?: string; // Comma-separated list of currencies if more than one
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
  }): Promise<any> {
    return this.getPrivate('api/v1/accounts/ledgers', params);
  }

  /**
   * Get Account Ledgers - trade_hf
   */
  getAccountHFTransactions(params: {
    currency?: string; // Comma-separated list of currencies if more than one
    direction?: 'in' | 'out';
    bizType?: 'TRANSFER' | 'TRADE_EXCHANGE';
    lastId?: number;
    limit?: number;
    startAt?: number;
    endAt?: number;
  }): Promise<any> {
    return this.getPrivate('api/v1/hf/accounts/ledgers', params);
  }

  /**
   * Get Account Ledgers - margin_hf
   */
  getAccountHFMarginTransactions(params: {
    currency?: string; // Comma-separated list of currencies if more than one
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
  }): Promise<any> {
    return this.getPrivate('api/v3/hf/margin/account/ledgers', params);
  }

  /**
   * Get Account Ledgers - Futures
   */
  getAccountFuturesTransactions(params: {
    startAt?: number;
    endAt?: number;
    type?:
      | 'RealisedPNL'
      | 'Deposit'
      | 'Withdrawal'
      | 'Transferin'
      | 'TransferOut';
    offset?: number;
    maxCount?: number;
    currency?: string;
    forward?: boolean;
  }): Promise<any> {
    return this.getPrivate('api/v1/transaction-history', params);
  }

  /**
   *
   * Sub-Account
   *
   */

  getSubAccountsV1(): Promise<any> {
    return this.getPrivate('api/v1/sub/user');
  }

  getSubAccountsV2(params: {
    currentPage?: number;
    pageSize?: number;
  }): Promise<any> {
    return this.getPrivate('api/v2/sub/user', params);
  }

  createSubAccount(params: {
    password: string;
    remarks?: string;
    subName: string;
    access: string;
  }): Promise<any> {
    return this.postPrivate('api/v2/sub/user/created', params);
  }

  getSubAccountBalance(params: {
    subUserId: string;
    includeBaseAmount: boolean;
  }): Promise<any> {
    return this.getPrivate(`api/v1/sub-accounts/${params.subUserId}`, params);
  }

  getSubAccountBalancesV1(): Promise<any> {
    return this.getPrivate('api/v1/sub-accounts');
  }

  getSubAccountBalancesV2(params: {
    currentPage?: number;
    pageSize?: number;
  }): Promise<any> {
    return this.getPrivate('api/v2/sub-accounts', params);
  }

  /**
   *
   * Sub-Account API
   *
   *
   */

  getSubAccountAPIs(params: {
    apiKey?: string;
    subName: string;
  }): Promise<any> {
    return this.getPrivate('api/v1/sub/api-key', params);
  }

  createSubAccountAPI(params: {
    subName: string;
    passphrase: string;
    remark: string;
    permission?: string;
    ipWhitelist?: string;
    expire?: string;
  }): Promise<any> {
    return this.postPrivate('api/v1/sub/api-key', params);
  }

  updateSubAccountAPI(params: {
    subName: string;
    apiKey: string;
    passphrase: string;
    permission?: string;
    ipWhitelist?: string;
    expire?: string;
  }): Promise<any> {
    return this.postPrivate('api/v1/sub/api-key/update', params);
  }

  deleteSubAccountAPI(params: {
    apiKey: string;
    passphrase: string;
    subName: string;
  }): Promise<any> {
    return this.deletePrivate('api/v1/sub/api-key', params);
  }

  /**
   *
   ***********
   * Funding
   ***********
   *
   */

  getMarginAccountBalances(): Promise<any> {
    return this.getPrivate('api/v1/margin/account');
  }

  getMarginAccountBalanceDetail(params?: {
    quoteCurrency?: string;
    queryType?: 'MARGIN' | 'MARGIN_V2' | 'ALL';
  }): Promise<any> {
    return this.getPrivate('api/v3/margin/accounts', params);
  }

  getIsolatedMarginAccountBalanceDetail(params?: {
    symbol?: string;
    quoteCurrency?: string;
    queryType?: 'ISOLATED' | 'ISOLATED_V2' | 'ALL';
  }): Promise<any> {
    return this.getPrivate('api/v3/isolated/accounts', params);
  }

  getFuturesAccountBalance(params?: { currency?: string }): Promise<any> {
    return this.getPrivate('api/v1/account-overview', params);
  }

  getAllSubAccountFuturesBalances(params?: {
    currency?: string;
  }): Promise<any> {
    return this.getPrivate('api/v1/account-overview-all', params);
  }

  /**
   *
   * Deposit
   *
   */

  createDepositAddress(params: {
    currency: string;
    chain?: string;
  }): Promise<any> {
    return this.postPrivate('api/v1/deposit-addresses', params);
  }

  getDepositAddressesV2(params: { currency: string }): Promise<any> {
    return this.getPrivate('api/v2/deposit-addresses', params);
  }

  getDepositAddress(params: {
    currency: string;
    chain?: string;
  }): Promise<any> {
    return this.getPrivate('api/v1/deposit-addresses', params);
  }

  getDepositList(params?: {
    currency?: string;
    startAt?: number;
    endAt?: number;
    status?: 'PROCESSING' | 'SUCCESS' | 'FAILURE';
  }): Promise<any> {
    return this.getPrivate('api/v1/deposits', params);
  }

  getV1HistoricalDepositsList(params?: {
    currency?: string;
    startAt?: number;
    endAt?: number;
    status?: 'PROCESSING' | 'SUCCESS' | 'FAILURE';
  }): Promise<any> {
    return this.getPrivate('api/v1/hist-deposits', params);
  }

  /**
   *
   * Withdrawals
   *
   */

  getWithdrawalsList(params?: {
    currency?: string;
    status?: 'PROCESSING' | 'WALLET_PROCESSING' | 'SUCCESS' | 'FAILURE';
    startAt?: number;
    endAt?: number;
  }): Promise<any> {
    return this.getPrivate('api/v1/withdrawals', params);
  }

  getV1HistoricalWithdrawalsList(params?: {
    currency?: string;
    startAt?: number;
    endAt?: number;
    status?: 'PROCESSING' | 'SUCCESS' | 'FAILURE';
  }): Promise<any> {
    return this.getPrivate('api/v1/hist-withdrawals', params);
  }

  getWithdrawalQuotas(params: {
    currency: string;
    chain?: string;
  }): Promise<any> {
    return this.getPrivate('api/v1/withdrawals/quotas', params);
  }

  applyWithdraw(params: {
    currency: string;
    address: string;
    amount: number;
    memo?: string;
    isInner?: boolean;
    remark?: string;
    chain?: string;
    feeDeductType?: 'INTERNAL' | 'EXTERNAL';
  }): Promise<any> {
    return this.postPrivate('api/v1/withdrawals', params);
  }

  cancelWithdrawal(params: { withdrawalId: string }): Promise<any> {
    return this.deletePrivate(`api/v1/withdrawals/${params.withdrawalId}`);
  }

  /**
   *
   * Transfer
   *
   */

  getTransferable(params: {
    currency: string;
    type: 'MAIN' | 'TRADE' | 'TRADE_HF' | 'MARGIN' | 'ISOLATED';
    tag?: string;
  }): Promise<any> {
    return this.getPrivate('api/v1/accounts/transferable', params);
  }

  flexTransfer(params: {
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
  }): Promise<any> {
    return this.postPrivate('api/v3/accounts/universal-transfer', params);
  }

  transferBetweenMasterAndSubAccount(params: {
    clientOid: string;
    currency: string;
    amount: string;
    direction: 'OUT' | 'IN';
    accountType?: 'MAIN' | 'TRADE' | 'TRADE_HF' | 'MARGIN' | 'CONTRACT';
    subAccountType?: 'MAIN' | 'TRADE' | 'TRADE_HF' | 'MARGIN' | 'CONTRACT';
    subUserId: string;
  }): Promise<any> {
    return this.postPrivate('api/v2/accounts/sub-transfer', params);
  }

  innerTransfer(params: {
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
  }): Promise<any> {
    return this.postPrivate('api/v2/accounts/inner-transfer', params);
  }

  // Futures
  transferFromFuturesAccount(params: {
    amount: number;
    currency: string;
    recAccountType: 'MAIN' | 'TRADE';
  }): Promise<any> {
    return this.postPrivate('api/v3/transfer-out', params);
  }

  // Futures
  transferToFuturesAccount(params: {
    amount: number;
    currency: string;
    payAccountType: 'MAIN' | 'TRADE';
  }): Promise<any> {
    return this.postPrivate('api/v1/transfer-in', params);
  }

  // Futures
  getFuturesTransferOutRequestRecords(params: {
    startAt?: number;
    endAt?: number;
    status?: 'PROCESSING' | 'SUCCESS' | 'FAILURE';
    queryStatus?: Array<'PROCESSING' | 'SUCCESS' | 'FAILURE'>;
    currency?: string;
    currentPage?: number;
    pageSize?: number;
  }): Promise<any> {
    return this.getPrivate('api/v1/transfer-list', params);
  }

  /**
   *
   * Trade Fee
   *
   */

  getBasicUserFee(params: { currencyType: string }): Promise<any> {
    return this.getPrivate('api/v1/base-fee', params);
  }

  getTradingPairActualFee(params: { symbols: string }): Promise<any> {
    return this.getPrivate('api/v1/trade-fees', params);
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

  getSpotCurrencyList(): Promise<any> {
    return this.get('api/v3/currencies');
  }

  getSpotCurrencyDetail(params: {
    currency: string;
    chain?: string;
  }): Promise<any> {
    return this.get(`api/v3/currencies/${params.currency}`, params);
  }

  getSpotSymbolsList(params?: { market?: string }): Promise<any> {
    return this.get('api/v2/symbols', params);
  }

  getSpotTicker(params: { symbol: string }): Promise<any> {
    return this.get(`api/v1/market/orderbook/level1`, params);
  }

  getSpotAllTickers(): Promise<any> {
    return this.get('api/v1/market/allTickers');
  }

  getSpot24hrStats(params: { symbol: string }): Promise<any> {
    return this.get('api/v1/market/stats', params);
  }

  getSpotMarketList(): Promise<any> {
    return this.get('api/v1/markets');
  }

  getSpotPartOrderBookLevel20(params: { symbol: string }): Promise<any> {
    return this.get(`api/v1/market/orderbook/level2_20`, params);
  }

  getSpotPartOrderBookLevel100(params: { symbol: string }): Promise<any> {
    return this.get(`api/v1/market/orderbook/level2_100`, params);
  }

  getSpotFullOrderBook(params: { symbol: string }): Promise<any> {
    return this.get('api/v3/market/orderbook/level2', params);
  }

  getSpotTradeHistories(params: { symbol: string }): Promise<any> {
    return this.get('api/v1/market/histories', params);
  }

  getSpotKlines(params: {
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
      | '1week';
  }): Promise<any> {
    return this.get('api/v1/market/candles', params);
  }

  getSpotFiatPrice(params?: {
    base?: string;
    currencies?: string;
  }): Promise<any> {
    return this.get('api/v1/prices', params);
  }

  getSpotServerTime(): Promise<any> {
    return this.get('api/v1/timestamp');
  }

  getSpotServiceStatus(): Promise<any> {
    return this.get('api/v1/status');
  }

  /**
   *
   * Spot HF trade
   *
   */
  placeSpotHFOrder(params: {
    clientOid?: string;
    symbol: string;
    type: 'limit' | 'market';
    side: 'buy' | 'sell';
    stp?: 'CN' | 'CO' | 'CB' | 'DC';
    tags?: string;
    remark?: string;
  }): Promise<any> {
    return this.postPrivate('api/v1/hf/orders', params);
  }

  placeSpotHFOrderTest(): Promise<any> {
    return this.postPrivate('api/v1/hf/orders/test');
  }

  placeSpotHFOrderSync(params: {
    clientOid?: string;
    symbol: string;
    type: 'limit' | 'market';
    side: 'buy' | 'sell';
    stp?: 'CN' | 'CO' | 'CB' | 'DC';
    tags?: string;
    remark?: string;
  }): Promise<any> {
    return this.postPrivate('api/v1/hf/orders/sync', params);
  }

  placeSpotMultipleHFOrders(params: {
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
  }): Promise<any> {
    return this.postPrivate('api/v1/hf/orders/multi', params);
  }

  placeSpotMultipleHFOrdersSync(params: {
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
  }): Promise<any> {
    return this.postPrivate('api/v1/hf/orders/multi/sync', params);
  }

  modifySpotHFOrder(params: {
    symbol: string;
    clientOid?: string;
    orderId?: string;
    newPrice?: string;
    newSize?: string;
  }): Promise<any> {
    return this.postPrivate('api/v1/hf/orders/alter', params);
  }

  cancelSpotHFOrder(params: { orderId: string; symbol: string }): Promise<any> {
    return this.deletePrivate(`api/v1/hf/orders/${params.orderId}`, params);
  }

  syncSpotCancelHFOrder(params: {
    orderId: string;
    symbol: string;
  }): Promise<any> {
    return this.deletePrivate(
      `api/v1/hf/orders/sync/${params.orderId}`,
      params,
    );
  }

  cancelSpotHFOrderByClientOId(params: {
    clientOid: string;
    symbol: string;
  }): Promise<any> {
    return this.deletePrivate(
      `api/v1/hf/orders/client-order/${params.clientOid}`,
      params,
    );
  }

  syncSpotCancelHFOrderByClientOId(params: {
    clientOid: string;
    symbol: string;
  }): Promise<any> {
    return this.deletePrivate(
      `api/v1/hf/orders/sync/client-order/${params.clientOid}`,
      params,
    );
  }

  cancelSpotSpecifiedNumberHFOrders(params: {
    orderId: string;
    symbol: string;
    cancelSize: string;
  }): Promise<any> {
    return this.deletePrivate(
      `api/v1/hf/orders/cancel/${params.orderId}`,
      params,
    );
  }

  cancelSpotAllHFOrdersBySymbol(params: { symbol: string }): Promise<any> {
    return this.deletePrivate(`api/v1/hf/orders`, params);
  }

  cancelSpotAllHFOrders(): Promise<any> {
    return this.deletePrivate(`api/v1/hf/orders/cancelAll`);
  }

  getSpotActiveHFOrders(params: { symbol: string }): Promise<any> {
    return this.getPrivate(`api/v1/hf/orders/active`, params);
  }

  getSpotActiveHFSymbols(): Promise<any> {
    return this.getPrivate(`api/v1/hf/orders/active/symbols`);
  }

  getSpotHFCompletedOrders(params: {
    symbol: string;
    side?: 'buy' | 'sell';
    type?: 'limit' | 'market';
    startAt?: number;
    endAt?: number;
    lastId?: number;
    limit?: number;
  }): Promise<any> {
    return this.getPrivate(`api/v1/hf/orders/done`, params);
  }

  getSpotHFOrderDetailsByOrderId(params: {
    orderId: string;
    symbol: string;
  }): Promise<any> {
    return this.getPrivate(`api/v1/hf/orders/${params.orderId}`, params);
  }

  getSpotHFOrderDetailsByClientOid(params: {
    clientOid: string;
    symbol: string;
  }): Promise<any> {
    return this.getPrivate(
      `api/v1/hf/orders/client-order/${params.clientOid}`,
      params,
    );
  }

  autoCancelSpotHFOrderSetting(params: {
    timeout: number;
    symbols?: string;
  }): Promise<any> {
    return this.postPrivate('api/v1/hf/orders/dead-cancel-all', params);
  }

  autoCancelSpotHFOrderSettingQuery(): Promise<any> {
    return this.getPrivate('api/v1/hf/orders/dead-cancel-all/query');
  }

  getSpotHFFilledList(params: {
    orderId?: string;
    symbol: string;
    side?: 'buy' | 'sell';
    type?: 'limit' | 'market';
    startAt?: number;
    endAt?: number;
    lastId?: number;
    limit?: number;
  }): Promise<any> {
    return this.getPrivate('api/v1/hf/fills', params);
  }

  /**
   *
   * Orders
   *
   */

  // SPOT and MARGIN
  placeOrder(params: {
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
  }): Promise<any> {
    return this.postPrivate('api/v1/orders', params);
  }

  // SPOT and MARGIN
  placeOrderTest(): Promise<any> {
    return this.postPrivate('api/v1/orders/test');
  }

  //SPOT
  placeMultipleOrders(params: {
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
  }): Promise<any> {
    return this.postPrivate('api/v1/orders/multi', params);
  }

  // Used for Spot and Margin Trading: Cancels a single order by orderId.
  cancelOrderById(params: { orderId: string }): Promise<any> {
    return this.deletePrivate(`api/v1/orders/${params.orderId}`);
  }

  // Used for Spot and Margin Trading: Cancels a single order by clientOid.
  cancelOrderByClientOid(params: { clientOid: string }): Promise<any> {
    return this.deletePrivate(`api/v1/order/client-order/${params.clientOid}`);
  }

  // Used for Spot and Margin Trading: Cancels all open orders.
  cancelAllOrders(params?: {
    symbol?: string;
    tradeType?: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
  }): Promise<any> {
    return this.deletePrivate('api/v1/orders', params);
  }

  // Retrieves the current list of orders. Supports filtering by status and trade type.
  getOrderList(params?: {
    status?: 'active' | 'done';
    symbol?: string;
    side?: 'buy' | 'sell';
    type?: 'limit' | 'market' | 'limit_stop' | 'market_stop';
    tradeType?: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
    startAt?: number;
    endAt?: number;
  }): Promise<any> {
    return this.getPrivate('api/v1/orders', params);
  }

  // Needs General permission, Retrieves a list of the most recent 1000 orders within the last 24 hours, sorted in descending order by time.
  getRecentOrdersList(): Promise<any> {
    return this.getPrivate('api/v1/limit/orders');
  }

  // Needs General Permission, Retrieves the details of a single order by its orderId. Useful for tracking the status and details of specific trades.
  getOrderDetailsByOrderId(params: { orderId: string }): Promise<any> {
    return this.getPrivate(`api/v1/orders/${params.orderId}`);
  }

  // Needs general permission, Retrieves the details of a single order by its clientOid. This is useful for checking the status of orders placed with a unique client-provided identifier.
  getOrderDetailsByClientOid(params: { clientOid: string }): Promise<any> {
    return this.getPrivate(`api/v1/order/client-order/${params.clientOid}`);
  }

  /**
   *
   * Fills
   *
   */

  // General permission, Retrieves a list of the most recent fills for your orders, providing details such as the executed price, size, and the fees incurred. Useful for tracking trade executions and their impact on your portfolio.
  getSpotFilledList(params?: {
    orderId?: string;
    symbol?: string;
    side?: 'buy' | 'sell';
    type?: 'limit' | 'market' | 'limit_stop' | 'market_stop';
    startAt?: number;
    endAt?: number;
    tradeType: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
  }): Promise<any> {
    return this.getPrivate('api/v1/fills', params);
  }

  // General permission, Retrieves a list of the most recent 1000 fills within the last 24 hours, sorted in descending order by time.
  getSpotRecentFillsList(): Promise<any> {
    return this.getPrivate('api/v1/limit/fills');
  }

  /**
   *
   * Stop order
   *
   */

  // Spot and margin trading, places a stop order on the platform.
  placeStopOrder(params: {
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
  }): Promise<any> {
    return this.postPrivate('api/v1/stop-order', params);
  }

  // Cancels a single stop order by orderId. Applicable for both spot and margin trading.
  // This endpoint requires the "Spot Trading" or "Margin Trading" permission on your API key.
  cancelStopOrderById(params: { orderId: string }): Promise<any> {
    return this.deletePrivate(`api/v1/stop-order/${params.orderId}`);
  }

  // Cancels a stop order by clientOid. Requires "Spot Trading" or "Margin Trading" permission.
  cancelStopOrderByClientOid(params: {
    clientOid: string;
    symbol?: string;
  }): Promise<any> {
    return this.deletePrivate(
      `api/v1/stop-order/cancelOrderByClientOid`,
      params,
    );
  }

  // Cancels a batch of stop orders. Requires "Spot Trading" or "Margin Trading" permission.
  cancelStopOrders(params?: {
    symbol?: string;
    tradeType?: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
    orderIds?: string;
  }): Promise<any> {
    return this.deletePrivate(`api/v1/stop-order/cancel`, params);
  }

  // Retrieves your current untriggered stop order list, paginated and sorted to show the latest first.
  getStopOrdersList(params?: {
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
  }): Promise<any> {
    return this.getPrivate('api/v1/stop-order', params);
  }

  // Retrieves the details of a single stop order by its orderId.
  getStopOrderDetailsByOrderId(params: { orderId: string }): Promise<any> {
    return this.getPrivate(`api/v1/stop-order/${params.orderId}`);
  }

  // Retrieves the details of a single stop order by its clientOid.
  getStopOrderDetailsByClientOid(params: {
    clientOid: string;
    symbol?: string;
  }): Promise<any> {
    return this.getPrivate('api/v1/stop-order/queryOrderByClientOid', params);
  }
  /**
   *
   * OCO order
   *
   */

  // Places an OCO (One Cancels the Other) order on the platform.
  placeOCOOrder(params: {
    symbol: string;
    side: 'buy' | 'sell';
    price: string;
    size: string;
    stopPrice: string;
    limitPrice: string;
    tradeType?: 'TRADE'; // Currently only supports TRADE
    clientOid: string;
    remark?: string;
  }): Promise<any> {
    return this.postPrivate('api/v3/oco/order', params);
  }

  // Cancels a single OCO order by orderId.
  cancelOCOOrderById(params: { orderId: string }): Promise<any> {
    return this.deletePrivate(`api/v3/oco/order/${params.orderId}`);
  }

  // Cancels a single OCO order by clientOid.
  cancelOCOOrderByClientOid(params: { clientOid: string }): Promise<any> {
    return this.deletePrivate(`api/v3/oco/client-order/${params.clientOid}`);
  }

  // Batch cancels OCO orders through orderIds.
  cancelMultipleOCOOrders(params?: {
    orderIds?: string;
    symbol?: string;
  }): Promise<any> {
    return this.deletePrivate('api/v3/oco/orders', params);
  }

  // Retrieves the details of a single OCO order by its orderId.
  getOCOOrderDetailsByOrderId(params: { orderId: string }): Promise<any> {
    return this.getPrivate(`api/v3/oco/order/${params.orderId}`);
  }

  // Retrieves the details of a single OCO order by its orderId, including detailed information about the individual orders.
  getOCOOrderDetails(params: { orderId: string }): Promise<any> {
    return this.getPrivate(`api/v3/oco/order/details/${params.orderId}`);
  }

  // Retrieves the details of a single OCO order by its clientOid.
  getOCOOrderDetailsByClientOid(params: { clientOid: string }): Promise<any> {
    return this.getPrivate(`api/v3/oco/client-order/${params.clientOid}`);
  }

  // Retrieves your current OCO order list, paginated and sorted to show the latest first.
  getOCOOrdersList(params: {
    pageSize: string;
    currentPage: string;
    symbol?: string;
    startAt?: number;
    endAt?: number;
    orderIds?: string;
  }): Promise<any> {
    return this.getPrivate('api/v3/oco/orders', params);
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

  placeHFMarginOrder(params: {
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
  }): Promise<any> {
    return this.postPrivate('api/v3/hf/margin/order', params);
  }

  placeHFMarginOrderTest(): Promise<any> {
    return this.postPrivate('api/v3/hf/margin/order/test');
  }

  cancelHFMarginOrder(params: {
    orderId: string;
    symbol: string;
  }): Promise<any> {
    return this.deletePrivate(
      `api/v3/hf/margin/orders/${params.orderId}`,
      params,
    );
  }

  cancelHFMarginOrderByClientOid(params: {
    clientOid: string;
    symbol: string;
  }): Promise<any> {
    return this.deletePrivate(
      `api/v3/hf/margin/orders/client-order/${params.clientOid}`,
      params,
    );
  }

  cancelAllHFMarginOrders(params: {
    symbol: string;
    tradeType: 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
  }): Promise<any> {
    return this.deletePrivate(`api/v3/hf/margin/orders`, params);
  }

  getActiveHFMarginOrders(params: {
    symbol: string;
    tradeType: 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
  }): Promise<any> {
    return this.getPrivate(`api/v3/hf/margin/orders/active`, params);
  }

  getHFMarginFilledList(params: {
    symbol: string;
    tradeType: 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
    side?: 'buy' | 'sell';
    type?: 'limit' | 'market';
    startAt?: number;
    endAt?: number;
    lastId?: number;
    limit?: number;
  }): Promise<any> {
    return this.getPrivate('api/v3/hf/margin/orders/done', params);
  }

  getHFMarginOrderDetailsByOrderId(params: {
    orderId: string;
    symbol: string;
  }): Promise<any> {
    return this.getPrivate(`api/v3/hf/margin/orders/${params.orderId}`, params);
  }

  getHFMarginOrderDetailsByClientOid(params: {
    clientOid: string;
    symbol: string;
  }): Promise<any> {
    return this.getPrivate(
      `api/v3/hf/margin/orders/client-order/${params.clientOid}?symbol=${params.symbol}`,
    );
  }

  getHFMarginTransactionRecords(params: {
    orderId?: string;
    symbol: string;
    tradeType: 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
    side?: 'buy' | 'sell';
    type?: 'limit' | 'market';
    startAt?: number;
    endAt?: number;
    lastId?: number;
    limit?: number;
  }): Promise<any> {
    return this.getPrivate('api/v3/hf/margin/fills', params);
  }

  /**
   *
   * Orders
   *
   */

  placeMarginOrder(params: {
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
  }): Promise<any> {
    return this.postPrivate('api/v1/margin/order', params);
  }

  placeMarginOrderTest(): Promise<any> {
    return this.postPrivate('api/v1/margin/order/test');
  }

  /**
   *
   * Margin info
   *
   */

  getMarginLeveragedTokenInfo(params?: { currency?: string }): Promise<any> {
    return this.get('api/v3/etf/info', params);
  }

  getMarginMarkPrice(params: { symbol: string }): Promise<any> {
    return this.get(`api/v1/mark-price/${params.symbol}/current`);
  }

  getMarginConfigInfo(): Promise<any> {
    return this.get('api/v1/margin/config');
  }

  getMarginRiskLimitCurrencyConfig(params: {
    isIsolated: boolean;
    symbol?: string;
    currency?: string;
  }): Promise<any> {
    return this.get('api/v3/margin/currencies', params);
  }

  /**
   *
   * Isolated Margin
   *
   */

  getIsolatedMarginSymbolsConfig(): Promise<any> {
    return this.getPrivate('api/v1/isolated/symbols');
  }

  getIsolatedMarginAccountInfo(params?: {
    balanceCurrency?: 'USDT' | 'KCS' | 'BTC';
  }): Promise<any> {
    return this.getPrivate('api/v1/isolated/accounts', params);
  }

  getSingleIsolatedMarginAccountInfo(params: { symbol: string }): Promise<any> {
    return this.getPrivate(`api/v1/isolated/account/${params.symbol}`);
  }

  /**
   *
   * Margin trading(v3)
   *
   */

  marginBorrowV3(params: {
    isIsolated?: boolean;
    symbol?: string;
    currency: string;
    size: number;
    timeInForce: 'IOC' | 'FOK';
  }): Promise<any> {
    return this.postPrivate('api/v3/margin/borrow', params);
  }

  marginRepayV3(params: {
    isIsolated?: boolean;
    symbol?: string;
    currency: string;
    size: number;
  }): Promise<any> {
    return this.postPrivate('api/v3/margin/repay', params);
  }

  getMarginBorrowingHistoryV3(params: {
    currency: string;
    isIsolated?: boolean;
    symbol?: string;
    orderNo?: string;
    startTime?: number;
    endTime?: number;
    currentPage?: number;
    pageSize?: number;
  }): Promise<any> {
    return this.getPrivate('api/v3/margin/borrow', params);
  }

  getMarginRepaymentHistoryV3(params: {
    currency: string;
    isIsolated?: boolean;
    symbol?: string;
    orderNo?: string;
    startTime?: number;
    endTime?: number;
    currentPage?: number;
    pageSize?: number;
  }): Promise<any> {
    return this.getPrivate('api/v3/margin/repay', params);
  }

  /**
   *
   * Lending market(v3)
   *
   */

  getLendingMarketCurrencyInfoV3(params?: { currency?: string }): Promise<any> {
    return this.get('api/v3/project/list', params);
  }

  getLendingMarketInterestRatesV3(params: { currency: string }): Promise<any> {
    return this.get('api/v3/project/marketInterestRate', params);
  }

  initiateLendingSubscriptionV3(params: {
    currency: string;
    size: string;
    interestRate: string;
  }): Promise<any> {
    return this.postPrivate('api/v3/purchase', params);
  }

  initiateLendingRedemptionV3(params: {
    currency: string;
    size: string;
    purchaseOrderNo: string;
  }): Promise<any> {
    return this.postPrivate('api/v3/redeem', params);
  }

  modifyLendingSubscriptionOrdersV3(params: {
    currency: string;
    purchaseOrderNo: string;
    interestRate: string;
  }): Promise<any> {
    return this.postPrivate('api/v3/lend/purchase/update', params);
  }

  getLendingRedemptionOrdersV3(params: {
    currency: string;
    redeemOrderNo?: string;
    status: 'DONE' | 'PENDING';
    currentPage?: number;
    pageSize?: number;
  }): Promise<any> {
    return this.getPrivate('api/v3/redeem/orders', params);
  }

  getLendingSubscriptionOrdersV3(params: {
    currency: string;
    purchaseOrderNo?: string;
    status: 'DONE' | 'PENDING';
    currentPage?: number;
    pageSize?: number;
  }): Promise<any> {
    return this.getPrivate('api/v3/purchase/orders', params);
  }

  /**
   *
   ******************************************************************
   * FUTURES TRADING
   ******************************************************************
   */

  /**
   *
   * Futures Market Data
   *
   */

  getFuturesSymbolsList(): Promise<any> {
    return this.get('api/v1/contracts/active');
  }

  getFuturesSymbolDetail(params: { symbol: string }): Promise<any> {
    return this.get(`api/v1/contracts/${params.symbol}`);
  }

  getFuturesTicker(params: { symbol: string }): Promise<any> {
    return this.get('api/v1/ticker', params);
  }

  getFuturesFullOrderBookLevel2(params: { symbol: string }): Promise<any> {
    return this.get('api/v1/level2/snapshot', params);
  }

  getFuturesPartOrderBookLevel2Depth20(params: {
    symbol: string;
  }): Promise<any> {
    return this.get('api/v1/level2/depth20', params);
  }

  getFuturesPartOrderBookLevel2Depth100(params: {
    symbol: string;
  }): Promise<any> {
    return this.get('api/v1/level2/depth100', params);
  }

  getFuturesTransactionHistory(params: { symbol: string }): Promise<any> {
    return this.get('api/v1/trade/history', params);
  }

  getFuturesKlines(params: {
    symbol: string;
    granularity: number;
    from?: number;
    to?: number;
  }): Promise<any> {
    return this.get('api/v1/kline/query', params);
  }

  getFuturesInterestRateList(params: {
    symbol: string;
    startAt?: number;
    endAt?: number;
    reverse?: boolean;
    offset?: number;
    forward?: boolean;
    maxCount?: number;
  }): Promise<any> {
    return this.get('api/v1/interest/query', params);
  }

  getFuturesIndexList(params: {
    symbol: string;
    startAt?: number;
    endAt?: number;
    reverse?: boolean;
    offset?: number;
    forward?: boolean;
    maxCount?: number;
  }): Promise<any> {
    return this.get('api/v1/index/query', params);
  }

  getFuturesMarkPrice(params: { symbol: string }): Promise<any> {
    return this.get(`api/v1/mark-price/${params.symbol}/current`);
  }

  getFuturesPremiumIndex(params: {
    symbol: string;
    startAt?: number;
    endAt?: number;
    reverse?: boolean;
    offset?: number;
    forward?: boolean;
    maxCount?: number;
  }): Promise<any> {
    return this.get('api/v1/premium/query', params);
  }

  getFutures24HourTransactionVolume(): Promise<any> {
    return this.get('api/v1/trade-statistics');
  }

  getServerTime(): Promise<any> {
    return this.get('api/v1/timestamp');
  }

  getServiceStatus(): Promise<any> {
    return this.get('api/v1/status');
  }

  /**
   *
   * Futures orders
   *
   */

  submitFuturesOrder(params: {
    clientOid: string;
    side: 'buy' | 'sell';
    symbol: string;
    leverage: string;
    type?: 'limit' | 'market';
    remark?: string;
    stop?: 'down' | 'up';
    stopPriceType?: 'TP' | 'IP' | 'MP';
    stopPrice?: string;
    reduceOnly?: boolean;
    closeOrder?: boolean;
    forceHold?: boolean;
    stp?: 'CN' | 'CO' | 'CB';
    price: string;
    size?: number;
    timeInForce?: 'GTC' | 'IOC';
    postOnly?: boolean;
    hidden?: boolean;
    iceberg?: boolean;
    visibleSize?: number;
  }): Promise<any> {
    return this.postPrivate('api/v1/orders', params);
  }
}
