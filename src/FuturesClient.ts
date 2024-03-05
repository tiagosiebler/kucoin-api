import { AxiosRequestConfig } from 'axios';
import { nanoid } from 'nanoid';

import { BaseRestClient } from './lib/BaseRestClient.js';
import {
  REST_CLIENT_TYPE_ENUM,
  RestClientOptions,
  RestClientType,
} from './lib/requestUtils.js';
import { NewFuturesOrderV1 } from './types/request/futures.types.js';
import { APISuccessResponse } from './types/response/shared.types.js';

/**
 *
 */
export class FuturesClient extends BaseRestClient {
  constructor(
    restClientOptions: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {},
  ) {
    super(restClientOptions, requestOptions);
    return this;
  }

  getClientType(): RestClientType {
    return REST_CLIENT_TYPE_ENUM.futures;
  }

  /**
   *
   * Misc Utility Methods
   *
   */

  generateNewOrderID(): string {
    return nanoid(32);
  }

  getServerTime(): Promise<any> {
    return this.get('api/v1/timestamp');
  }

  getServiceStatus(): Promise<any> {
    return this.get('api/v1/status');
  }

  /**
   * REST - ACCOUNT  - BASIC INFO
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
  }): Promise<
    APISuccessResponse<{
      hasMore: boolean; // Whether there are more pages
      dataList: Array<{
        time: number; // Event time
        type:
          | 'RealisedPNL'
          | 'Deposit'
          | 'Withdrawal'
          | 'TransferIn'
          | 'TransferOut'; // Type
        amount: number; // Transaction amount
        fee: number | null; // Fees
        accountEquity: number; // Account equity
        status: 'Completed' | 'Pending'; // Status
        remark: string; // Ticker symbol of the contract
        offset: number; // Offset
        currency: string; // Currency
      }>;
    }>
  > {
    return this.getPrivate('api/v1/transaction-history', params);
  }

  /**
   * REST - ACCOUNT  - SUBACCOUNT API
   */

  getSubAccountAPIs(params: { apiKey?: string; subName: string }): Promise<
    APISuccessResponse<
      Array<{
        apiKey: string; // API-Key
        createdAt: number; // Time of the event
        ipWhitelist: string; // IP whitelist
        permission: string; // Permissions
        remark: string; // Remarks
        subName: string; // Sub-account name
      }>
    >
  > {
    return this.getPrivate('api/v1/sub/api-key', params);
  }

  createSubAccountAPI(params: {
    subName: string;
    passphrase: string;
    remark: string;
    permission?: string;
    ipWhitelist?: string;
    expire?: string;
  }): Promise<
    APISuccessResponse<{
      apiKey: string; // API-Key
      createdAt: number; // Time of the event
      ipWhitelist: string; // IP whitelist
      permission: string; // Permissions
      remark: string; // Remarks
      subName: string; // Sub-account name
      apiSecret: string; // API secret
      passphrase: string; // Password
    }>
  > {
    return this.postPrivate('api/v1/sub/api-key', params);
  }

  updateSubAccountAPI(params: {
    subName: string;
    apiKey: string;
    passphrase: string;
    permission?: string;
    ipWhitelist?: string;
    expire?: string;
  }): Promise<
    APISuccessResponse<{
      apiKey: string; // API-Key
      ipWhitelist: string; // IP whitelist
      permission: string; // Permissions
      subName: string; // Sub-account name
    }>
  > {
    return this.postPrivate('api/v1/sub/api-key/update', params);
  }

  deleteSubAccountAPI(params: {
    apiKey: string;
    passphrase: string;
    subName: string;
  }): Promise<
    APISuccessResponse<{
      subName: string; // Sub-account name
      apiKey: string; // API-Key
    }>
  > {
    return this.deletePrivate('api/v1/sub/api-key', params);
  }

  /**
   * REST - FUNDING - FUNDING OVERVIEW
   */

  getFuturesAccountBalance(params?: { currency?: string }): Promise<
    APISuccessResponse<{
      accountEquity: number; // Account equity = marginBalance + Unrealised PNL
      unrealisedPNL: number; // Unrealised profit and loss
      marginBalance: number; // Margin balance = positionMargin + orderMargin + frozenFunds + availableBalance - unrealisedPNL
      positionMargin: number; // Position margin
      orderMargin: number; // Order margin
      frozenFunds: number; // Frozen funds for withdrawal and out-transfer
      availableBalance: number; // Available balance
      currency: string; // currency code
    }>
  > {
    return this.getPrivate('api/v1/account-overview', params);
  }

  getAllSubAccountFuturesBalances(params?: { currency?: string }): Promise<
    APISuccessResponse<{
      summary: {
        accountEquityTotal: number; // Total Account Equity
        unrealisedPNLTotal: number; // Total unrealisedPNL
        marginBalanceTotal: number; // Total Margin Balance
        positionMarginTotal: number; // Total Position margin
        orderMarginTotal: number; // Total Order Margin
        frozenFundsTotal: number; // Total frozen funds for withdrawal and out-transfer
        availableBalanceTotal: number; // total available balance
        currency: string; // currency
      };
      accounts: Array<{
        accountName: string; // Account name, main account is main
        accountEquity: number; // Account Equity = marginBalance + unrealisedPNL
        unrealisedPNL: number; // unrealisedPNL
        marginBalance: number; // Margin Balance = positionMargin + orderMargin + frozenFunds + availableBalance - unrealisedPNL
        positionMargin: number; // Position margin
        orderMargin: number; // Order Margin
        frozenFunds: number; // Frozen funds for withdrawal and out-transfer
        availableBalance: number; // Available balance
        currency: string; // currency
      }>;
    }>
  > {
    return this.getPrivate('api/v1/account-overview-all', params);
  }

  /**
   * REST - FUNDING - TRANSFER
   */

  transferFromFuturesAccount(params: {
    amount: number;
    currency: string;
    recAccountType: 'MAIN' | 'TRADE';
  }): Promise<
    Promise<
      APISuccessResponse<{
        applyId: string; // Transfer-out request ID
        bizNo: string; // Business number
        payAccountType: string; // Pay account type
        payTag: string; // Pay account sub type
        remark: string; // User remark
        recAccountType: string; // Receive account type
        recTag: string; // Receive account sub type
        recRemark: string; // Receive account tx remark
        recSystem: string; // Receive system
        status: string; // Status: APPLY, PROCESSING, PENDING_APPROVAL, APPROVED, REJECTED, PENDING_CANCEL, CANCEL, SUCCESS
        currency: string; // Currency
        amount: string; // Transfer amount
        fee: string; // Transfer fee
        sn: number; // Serial number
        reason: string; // Fail Reason
        createdAt: number; // Create time
        updatedAt: number; // Update time
      }>
    >
  > {
    return this.postPrivate('api/v3/transfer-out', params);
  }

  transferToFuturesAccount(params: {
    amount: number;
    currency: string;
    payAccountType: 'MAIN' | 'TRADE';
  }): Promise<any> {
    return this.postPrivate('api/v1/transfer-in', params);
  }

  getFuturesTransferOutRequestRecords(params: {
    startAt?: number;
    endAt?: number;
    status?: 'PROCESSING' | 'SUCCESS' | 'FAILURE';
    queryStatus?: Array<'PROCESSING' | 'SUCCESS' | 'FAILURE'>;
    currency?: string;
    currentPage?: number;
    pageSize?: number;
  }): Promise<
    APISuccessResponse<{
      currentPage: number;
      pageSize: number;
      totalNum: number;
      totalPage: number;
      items: Array<{
        applyId: string; // Transfer-out request ID
        currency: string; // Currency
        recRemark: string; // Receive account tx remark
        recSystem: string; // Receive system
        status: string; // Status: PROCESSING, SUCCESS, FAILURE
        amount: string; // Transaction amount
        reason: string; // Reason caused the failure
        offset: number; // Offset
        createdAt: number; // Request application time
        remark: string; // User remark
      }>;
    }>
  > {
    return this.getPrivate('api/v1/transfer-list', params);
  }

  /**
   *
   * Futures Market Data
   *
   */

  getSymbols(): Promise<any> {
    return this.get('api/v1/contracts/active');
  }

  getSymbol(params: { symbol: string }): Promise<any> {
    return this.get(`api/v1/contracts/${params.symbol}`);
  }

  getTicker(params: { symbol: string }): Promise<any> {
    return this.get('api/v1/ticker', params);
  }

  getFullOrderBookLevel2(params: { symbol: string }): Promise<any> {
    return this.get('api/v1/level2/snapshot', params);
  }

  getPartOrderBookLevel2Depth20(params: { symbol: string }): Promise<any> {
    return this.get('api/v1/level2/depth20', params);
  }

  getPartOrderBookLevel2Depth100(params: { symbol: string }): Promise<any> {
    return this.get('api/v1/level2/depth100', params);
  }

  getMarketTrades(params: { symbol: string }): Promise<any> {
    return this.get('api/v1/trade/history', params);
  }

  getKlines(params: {
    symbol: string;
    granularity: number;
    from?: number;
    to?: number;
  }): Promise<any> {
    return this.get('api/v1/kline/query', params);
  }

  getInterestRateList(params: {
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

  getIndexList(params: {
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

  getMarkPrice(params: { symbol: string }): Promise<any> {
    return this.get(`api/v1/mark-price/${params.symbol}/current`);
  }

  getPremiumIndex(params: {
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

  get24HourTransactionVolume(): Promise<any> {
    return this.get('api/v1/trade-statistics');
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
   * Orders
   *
   */

  submitNewOrder(
    params: NewFuturesOrderV1,
  ): Promise<APISuccessResponse<{ orderId: string }>> {
    return this.postPrivate('api/v1/orders', params);
  }

  sumbitNewOrderTest(): Promise<any> {
    return this.postPrivate('api/v1/orders/test');
  }

  cancelAccountOrderById(params: { orderId: string }): Promise<any> {
    return this.deletePrivate(`api/v1/orders/${params.orderId}`);
  }

  //check docs, very weird. Maybe ask API guys to check
  cancelOrderByClientOid(params: { clientOid: string }): Promise<any> {
    return this.deletePrivate(`api/v1/orders/client-order/${params.clientOid}`);
  }

  submitMultipleOrders(params: {
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
    // Parameters specific to limit orders
    price?: string; // Mandatory for limit orders
    size?: number; // Mandatory for both limit and market orders
    timeInForce?: 'GTC' | 'IOC';
    postOnly?: boolean;
    hidden?: boolean;
    iceberg?: boolean;
    visibleSize?: number;
  }): Promise<any> {
    return this.postPrivate('api/v1/orders/multi', params);
  }

  cancelMultipleOrders(params?: { symbol?: string }): Promise<any> {
    return this.deletePrivate('api/v1/orders', params);
  }

  cancelMultipleStopOrders(params?: { symbol?: string }): Promise<any> {
    return this.deletePrivate('api/v1/stopOrders', params);
  }

  getAccountOrders(params?: {
    status?: 'active' | 'done';
    symbol?: string;
    side?: 'buy' | 'sell';
    type?: 'limit' | 'market' | 'limit_stop' | 'market_stop';
    startAt?: number;
    endAt?: number;
    currentPage?: number;
    pageSize?: number;
  }): Promise<any> {
    return this.getPrivate('api/v1/orders', params);
  }

  getAccountUntriggeredStopOrdersList(params?: {
    symbol?: string;
    side?: 'buy' | 'sell';
    type?: 'limit' | 'market';
    startAt?: number;
    endAt?: number;
    currentPage?: number;
    pageSize?: number;
  }): Promise<any> {
    return this.getPrivate('api/v1/stopOrders', params);
  }

  getAccountRecentOrders(params?: { symbol?: string }): Promise<any> {
    return this.getPrivate('api/v1/recentDoneOrders', params);
  }

  getAccountOrderDetailsByOrderId(params: { orderId: string }): Promise<any> {
    return this.getPrivate(`api/v1/orders/${params.orderId}`);
  }

  getAccountOrderDetailsByClientOrderId(params: {
    clientOid: string;
  }): Promise<any> {
    return this.getPrivate(`api/v1/orders/byClientOid`, params);
  }

  /**
   *
   * Futures Fills
   *
   */

  /**
   * Get a list of recent fills.
   *
   * If you need to get your recent trade history with low latency, please query endpoint Get List of Orders Completed in 24h.
   * The requested data is not real-time.
   */
  getAccountFills(params?: {
    orderId?: string;
    symbol?: string;
    side?: 'buy' | 'sell';
    type?: 'limit' | 'market' | 'limit_stop' | 'market_stop';
    startAt?: number;
    endAt?: number;
    currentPage?: number;
    pageSize?: number;
  }): Promise<any> {
    return this.getPrivate('api/v1/fills', params);
  }

  /**
   * Get a list of recent 1000 fills in the last 24 hours.
   *
   * If you need to get your recent traded order history with low latency, you may query this endpoint.
   */
  getAccountRecentFills(params?: { symbol?: string }): Promise<any> {
    return this.getPrivate('api/v1/recentFills', params);
  }

  getAccountActiveOrderValueCalculation(params: {
    symbol: string;
  }): Promise<any> {
    return this.getPrivate('api/v1/openOrderStatistics', params);
  }

  /**
   *
   * Futures Positions
   *
   */

  /**
   * Get Position Details
   */
  getAccountPosition(params: { symbol: string }): Promise<any> {
    return this.getPrivate('api/v1/position', params);
  }

  /**
   * Get Position List
   */
  getAccountPositions(params?: { currency?: string }): Promise<any> {
    return this.getPrivate('api/v1/positions', params);
  }

  /**
   * Modify Auto-Deposit Margin Status
   */
  setAutoDepositMarginStatus(params: {
    symbol: string;
    status: boolean;
  }): Promise<any> {
    return this.postPrivate(
      'api/v1/position/margin/auto-deposit-status',
      params,
    );
  }

  getMaxWithdrawMargin(params: { symbol: string }): Promise<any> {
    return this.getPrivate('api/v1/margin/maxWithdrawMargin', params);
  }

  removeMarginManually(params: {
    symbol: string;
    withdrawAmount: string;
  }): Promise<any> {
    return this.postPrivate('api/v1/margin/withdrawMargin', params);
  }

  addMarginManually(params: {
    symbol: string;
    margin: number;
    bizNo: string;
  }): Promise<any> {
    return this.postPrivate('api/v1/position/margin/deposit-margin', params);
  }

  /**
   *
   * Futures risk limit
   *
   */

  getRiskLimitLevel(params: { symbol: string }): Promise<any> {
    return this.getPrivate(`api/v1/contracts/risk-limit/${params.symbol}`);
  }

  setRiskLimitLevel(params: { symbol: string; level: number }): Promise<any> {
    return this.postPrivate('api/v1/position/risk-limit-level/change', params);
  }

  /**
   *
   * Futures funding fees
   *
   */

  getFundingRate(params: { symbol: string }): Promise<any> {
    return this.get(`api/v1/funding-rate/${params.symbol}/current`);
  }

  getFundingRates(params: {
    symbol: string;
    from: number;
    to: number;
  }): Promise<any> {
    return this.get('api/v1/contract/funding-rates', params);
  }

  getAccountFundingHistory(params: {
    symbol: string;
    startAt?: number;
    endAt?: number;
    reverse?: boolean;
    offset?: number;
    forward?: boolean;
    maxCount?: number;
  }): Promise<any> {
    return this.getPrivate('api/v1/funding-history', params);
  }
}
