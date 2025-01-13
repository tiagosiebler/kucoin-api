import { AxiosRequestConfig } from 'axios';
import { nanoid } from 'nanoid';
import {
  AccountFillsRequest,
  BatchCancelOrdersRequest,
  GetFundingHistoryRequest,
  GetFundingRatesRequest,
  GetInterestRatesRequest,
  GetKlinesRequest,
  GetOrdersRequest,
  GetStopOrdersRequest,
  GetTransactionsRequest,
  MaxOpenSizeRequest,
  Order,
  SLTPOrder,
} from 'types/request/futures.types.js';
import {
  AccountBalance,
  AccountSummary,
  AddMargin,
  BatchCancelOrderResult,
  FullOrderBookDetail,
  FuturesAccountFundingRateHistory,
  FuturesAccountTransaction,
  FuturesActiveOrder,
  FuturesClosedPositions,
  FuturesCurrentFundingRate,
  FuturesFill,
  FuturesFills,
  FuturesHistoricFundingRate,
  FuturesKline,
  FuturesMarkPrice,
  FuturesOrder,
  FuturesOrders,
  FuturesPosition,
  FuturesRiskLimit,
  FuturesSymbolInfo,
  IndexListItem,
  InterestRateItem,
  MarketTradeDetail,
  MaxOpenSize,
  PremiumIndexItem,
  SubBalance,
  SubmitMultipleOrdersFuturesResponse,
  TickerDetail,
} from 'types/response/futures.types.js';
import { WsConnectionInfo } from 'types/response/ws.js';

import { BaseRestClient } from './lib/BaseRestClient.js';
import {
  REST_CLIENT_TYPE_ENUM,
  RestClientOptions,
  RestClientType,
} from './lib/requestUtils.js';
import {
  APISuccessResponse,
  ServiceStatus,
} from './types/response/shared.types.js';

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

  /**
   *
   * REST - ACCOUNT INFO - Account & Funding
   *
   */

  getBalance(params?: {
    currency?: string;
  }): Promise<APISuccessResponse<AccountBalance>> {
    return this.getPrivate('api/v1/account-overview', params);
  }

  getTransactions(params: GetTransactionsRequest): Promise<
    APISuccessResponse<{
      hasMore: boolean; // Whether there are more pages
      dataList: FuturesAccountTransaction[];
    }>
  > {
    return this.getPrivate('api/v1/transaction-history', params);
  }

  /**
   *
   * REST - ACCOUNT INFO - Sub Account
   *
   */

  getSubBalances(params?: { currency?: string }): Promise<
    APISuccessResponse<{
      summary: AccountSummary;
      accounts: SubBalance[];
    }>
  > {
    return this.getPrivate('api/v1/account-overview-all', params);
  }

  /**
   *
   * REST - Account Info - Trade Fee
   *
   */

  getTradingPairFee(params: { symbol: string }): Promise<
    APISuccessResponse<{
      symbol: string;
      takerFeeRate: string;
      makerFeeRate: string;
    }>
  > {
    return this.getPrivate('api/v1/trade-fees', params);
  }

  /**
   *
   * REST - Futures Trading - Market Data
   *
   */

  getSymbols(): Promise<APISuccessResponse<FuturesSymbolInfo[]>> {
    return this.get('api/v1/contracts/active');
  }

  getSymbol(params: {
    symbol: string;
  }): Promise<APISuccessResponse<FuturesSymbolInfo>> {
    return this.get(`api/v1/contracts/${params.symbol}`);
  }

  getTicker(params: {
    symbol: string;
  }): Promise<APISuccessResponse<TickerDetail>> {
    return this.get('api/v1/ticker', params);
  }

  getTickers(): Promise<APISuccessResponse<TickerDetail[]>> {
    return this.get('api/v1/allTickers');
  }

  getFullOrderBookLevel2(params: {
    symbol: string;
  }): Promise<APISuccessResponse<FullOrderBookDetail>> {
    return this.get('api/v1/level2/snapshot', params);
  }

  getPartOrderBookLevel2Depth20(params: {
    symbol: string;
  }): Promise<APISuccessResponse<FullOrderBookDetail>> {
    return this.get('api/v1/level2/depth20', params);
  }

  getPartOrderBookLevel2Depth100(params: {
    symbol: string;
  }): Promise<APISuccessResponse<FullOrderBookDetail>> {
    return this.get('api/v1/level2/depth100', params);
  }

  getMarketTrades(params: {
    symbol: string;
  }): Promise<APISuccessResponse<MarketTradeDetail>> {
    return this.get('api/v1/trade/history', params);
  }

  getKlines(
    params: GetKlinesRequest,
  ): Promise<APISuccessResponse<FuturesKline[]>> {
    return this.get('api/v1/kline/query', params);
  }

  getMarkPrice(params: {
    symbol: string;
  }): Promise<APISuccessResponse<FuturesMarkPrice>> {
    return this.get(`api/v1/mark-price/${params.symbol}/current`);
  }

  getIndex(params: GetInterestRatesRequest): Promise<
    APISuccessResponse<{
      dataList: IndexListItem[];
      hasMore: boolean; // Whether there are more pages
    }>
  > {
    return this.get('api/v1/index/query', params);
  }

  getInterestRates(params: GetInterestRatesRequest): Promise<
    APISuccessResponse<{
      dataList: InterestRateItem[];
      hasMore: boolean; // Whether there are more pages
    }>
  > {
    return this.get('api/v1/interest/query', params);
  }

  getPremiumIndex(params: GetInterestRatesRequest): Promise<
    APISuccessResponse<{
      dataList: PremiumIndexItem[];
      hasMore: boolean; // Whether there are more pages
    }>
  > {
    return this.get('api/v1/premium/query', params);
  }

  get24HourTransactionVolume(): Promise<
    APISuccessResponse<{
      turnoverOf24h: number;
    }>
  > {
    return this.get('api/v1/trade-statistics');
  }

  getServerTime(): Promise<APISuccessResponse<number>> {
    return this.get('api/v1/timestamp');
  }

  getServiceStatus(): Promise<APISuccessResponse<ServiceStatus>> {
    return this.get('api/v1/status');
  }

  /**
   *
   * REST - Futures Trading - Orders
   *
   */

  submitOrder(params: Order): Promise<
    APISuccessResponse<{
      orderId?: string;
      clientOid?: string;
    }>
  > {
    return this.postPrivate('api/v1/orders', params);
  }

  submitNewOrderTest(): Promise<{
    orderId?: string;
    clientOid?: string;
  }> {
    return this.postPrivate('api/v1/orders/test');
  }

  submitMultipleOrders(
    params: Order[],
  ): Promise<APISuccessResponse<SubmitMultipleOrdersFuturesResponse[]>> {
    return this.postPrivate('api/v1/orders/multi', params);
  }

  submitSLTPOrder(params: SLTPOrder): Promise<
    APISuccessResponse<{
      orderId?: string;
      clientOid?: string;
    }>
  > {
    return this.postPrivate('api/v1/st-orders', params);
  }

  cancelOrderById(params: {
    orderId: string;
  }): Promise<APISuccessResponse<{ cancelledOrderIds: string[] }>> {
    return this.deletePrivate(`api/v1/orders/${params.orderId}`);
  }

  cancelOrderByClientOid(params: {
    clientOid: string;
  }): Promise<APISuccessResponse<{ clientOid: string }>> {
    return this.deletePrivate(`api/v1/orders/client-order/${params.clientOid}`);
  }

  batchCancelOrders(params: BatchCancelOrdersRequest): Promise<
    APISuccessResponse<{
      data: BatchCancelOrderResult[];
    }>
  > {
    return this.deletePrivate('api/v1/orders/multi-cancel', params);
  }

  cancelAllOrdersV3(params: {
    symbol: string;
  }): Promise<APISuccessResponse<{ cancelledOrderIds: string[] }>> {
    return this.deletePrivate('api/v3/orders', params);
  }

  cancelAllStopOrders(params?: {
    symbol?: string;
  }): Promise<APISuccessResponse<{ cancelledOrderIds: string[] }>> {
    return this.deletePrivate('api/v1/stopOrders', params);
  }

  getOrderByOrderId(params: {
    orderId: string;
  }): Promise<APISuccessResponse<FuturesOrder>> {
    return this.getPrivate(`api/v1/orders/${params.orderId}`);
  }

  getOrderByClientOrderId(params: {
    clientOid: string;
  }): Promise<APISuccessResponse<FuturesOrder>> {
    return this.getPrivate(`api/v1/orders/byClientOid`, params);
  }

  getOrders(
    params?: GetOrdersRequest,
  ): Promise<APISuccessResponse<FuturesOrders>> {
    return this.getPrivate('api/v1/orders', params);
  }

  getRecentOrders(params?: {
    symbol?: string;
  }): Promise<APISuccessResponse<FuturesOrder[]>> {
    return this.getPrivate('api/v1/recentDoneOrders', params);
  }

  getStopOrders(
    params?: GetStopOrdersRequest,
  ): Promise<APISuccessResponse<FuturesOrders>> {
    return this.getPrivate('api/v1/stopOrders', params);
  }

  getOpenOrderStatistics(params: {
    symbol: string;
  }): Promise<APISuccessResponse<FuturesActiveOrder>> {
    return this.getPrivate('api/v1/openOrderStatistics', params);
  }

  getRecentFills(params?: {
    symbol?: string;
  }): Promise<APISuccessResponse<FuturesFill[]>> {
    return this.getPrivate('api/v1/recentFills', params);
  }

  getFills(
    params?: AccountFillsRequest,
  ): Promise<APISuccessResponse<FuturesFills>> {
    return this.getPrivate('api/v1/fills', params);
  }

  /**
   *
   * REST - Futures Trading - Positions
   *
   */

  getMarginMode(params: { symbol: string }): Promise<
    APISuccessResponse<{
      symbol: string;
      marginMode: 'ISOLATED' | 'CROSS';
    }>
  > {
    return this.getPrivate('api/v2/position/getMarginMode', params);
  }

  updateMarginMode(params: {
    symbol: string;
    marginMode: 'ISOLATED' | 'CROSS';
  }): Promise<
    APISuccessResponse<{
      symbol: string;
      marginMode: 'ISOLATED' | 'CROSS';
    }>
  > {
    return this.postPrivate('api/v2/position/changeMarginMode', params);
  }

  getMaxOpenSize(
    params: MaxOpenSizeRequest,
  ): Promise<APISuccessResponse<MaxOpenSize>> {
    return this.getPrivate('api/v2/getMaxOpenSize', params);
  }

  getPosition(params: {
    symbol: string;
  }): Promise<APISuccessResponse<FuturesPosition>> {
    return this.getPrivate('api/v1/position', params);
  }

  getPositions(params?: {
    currency?: string;
  }): Promise<APISuccessResponse<FuturesPosition[]>> {
    return this.getPrivate('api/v1/positions', params);
  }

  getHistoryPositions(params?: {
    symbol?: string;
    from?: number;
    to?: number;
    limit?: number;
    pageId?: number;
  }): Promise<APISuccessResponse<FuturesClosedPositions>> {
    return this.getPrivate('api/v1/history-positions', params);
  }

  getMaxWithdrawMargin(params: {
    symbol: string;
  }): Promise<APISuccessResponse<number>> {
    return this.getPrivate('api/v1/margin/maxWithdrawMargin', params);
  }

  getCrossMarginLeverage(params: { symbol: string }): Promise<
    APISuccessResponse<{
      symbol: string;
      leverage: string;
    }>
  > {
    return this.getPrivate('api/v2/getCrossUserLeverage', params);
  }

  changeCrossMarginLeverage(params: {
    symbol: string;
    leverage: string;
  }): Promise<
    APISuccessResponse<{
      symbol: string;
      leverage: string;
    }>
  > {
    return this.postPrivate('api/v2/changeCrossUserLeverage', params);
  }

  depositMargin(params: {
    symbol: string;
    margin: number;
    bizNo: string;
  }): Promise<APISuccessResponse<AddMargin>> {
    return this.postPrivate('api/v1/position/margin/deposit-margin', params);
  }

  withdrawMargin(params: {
    symbol: string;
    withdrawAmount: string;
  }): Promise<APISuccessResponse<{ sybmol: string; withdrawAmount: number }>> {
    return this.postPrivate('api/v1/margin/withdrawMargin', params);
  }

  getRiskLimitLevel(params: {
    symbol: string;
  }): Promise<APISuccessResponse<FuturesRiskLimit[]>> {
    return this.getPrivate(`api/v1/contracts/risk-limit/${params.symbol}`);
  }

  updateRiskLimitLevel(params: {
    symbol: string;
    level: number;
  }): Promise<any> {
    return this.postPrivate('api/v1/position/risk-limit-level/change', params);
  }

  /**
   *
   * REST - Futures Trading - Funding Fees
   *
   */

  getFundingRate(params: {
    symbol: string;
  }): Promise<APISuccessResponse<FuturesCurrentFundingRate>> {
    return this.get(`api/v1/funding-rate/${params.symbol}/current`);
  }

  getFundingRates(
    params: GetFundingRatesRequest,
  ): Promise<APISuccessResponse<FuturesHistoricFundingRate[]>> {
    return this.get('api/v1/contract/funding-rates', params);
  }

  getFundingHistory(params: GetFundingHistoryRequest): Promise<
    APISuccessResponse<{
      dataList: FuturesAccountFundingRateHistory[];
      hasMore: boolean; // Whether there are more pages
    }>
  > {
    return this.getPrivate('api/v1/funding-history', params);
  }

  /**
   * Get download link for broker rebate orders
   *
   * trade type 1 = spot, trade type 2 = futures
   */
  getBrokerRebateOrderDownloadLink(params: {
    begin: string;
    end: string;
    tradeType: 1 | 2;
  }): Promise<APISuccessResponse<any>> {
    return this.getPrivate('api/v1/broker/api/rebase/download', params);
  }

  /**
   *
   * WebSockets
   *
   */

  getPublicWSConnectionToken(): Promise<APISuccessResponse<WsConnectionInfo>> {
    return this.post('api/v1/bullet-public');
  }

  getPrivateWSConnectionToken(): Promise<APISuccessResponse<WsConnectionInfo>> {
    return this.postPrivate('api/v1/bullet-private');
  }
}
