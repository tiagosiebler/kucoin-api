import { AxiosRequestConfig } from 'axios';
import { nanoid } from 'nanoid';

import { BaseRestClient } from './lib/BaseRestClient.js';
import {
  REST_CLIENT_TYPE_ENUM,
  RestClientOptions,
  RestClientType,
} from './lib/requestUtils.js';
import {
  AccountFillsRequest,
  CreateSubAPIRequest,
  DeleteSubAPIRequest,
  GetFundingHistoryRequest,
  GetFundingRatesRequest,
  GetInterestRatesRequest,
  GetKlinesRequest,
  GetOrdersRequest,
  GetStopOrdersRequest,
  GetSubAPIsRequest,
  GetTransactionsRequest,
  GetTransfersRequest,
  Order,
  SubmitTransfer,
  UpdateSubAPIRequest,
} from './types/request/futures.types.js';
import {
  AccountBalance,
  AddMargin,
  FillDetail,
  FullOrderBookDetail,
  FundingHistoryItem,
  FuturesActiveOrder,
  FuturesClosedPositions,
  FuturesFills,
  FuturesFundingRate,
  FuturesFundingRates,
  FuturesMarkPrice,
  FuturesOrders,
  FuturesTransferRecords,
  IndexListItem,
  InterestRateItem,
  Klines,
  MarketTradeDetail,
  OrderDetail,
  PositionDetail,
  PremiumIndexItem,
  RiskLimit,
  SubAccountAPIItem,
  SubmitMultipleOrdersFuturesResponse,
  SymbolDetail,
  TickerDetail,
  TransferDetail,
  UpdateSubAccountAPI,
  AccountSummary,
  AccountTransactions,
  CreateSubAccountAPI,

  SubBalance,
} from './types/response/futures.types.js';
import { APISuccessResponse } from './types/response/shared.types.js';
import { WsConnectionInfo } from './types/response/ws.js';

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

  getTransactions(
    params: GetTransactionsRequest,
  ): Promise<APISuccessResponse<AccountTransactions>> {
    return this.getPrivate('api/v1/transaction-history', params);
  }

  /**
   * REST - ACCOUNT  - SUBACCOUNT API
   */

  getSubAPIs(
    params: GetSubAPIsRequest,
  ): Promise<APISuccessResponse<SubAccountAPIItem[]>> {
    return this.getPrivate('api/v1/sub/api-key', params);
  }

  createSubAPI(
    params: CreateSubAPIRequest,
  ): Promise<APISuccessResponse<CreateSubAccountAPI>> {
    return this.postPrivate('api/v1/sub/api-key', params);
  }

  updateSubAPI(
    params: UpdateSubAPIRequest,
  ): Promise<APISuccessResponse<UpdateSubAccountAPI>> {
    return this.postPrivate('api/v1/sub/api-key/update', params);
  }

  deleteSubAPI(params: DeleteSubAPIRequest): Promise<
    APISuccessResponse<{
      subName: string;
      apiKey: string;
    }>
  > {
    return this.deletePrivate('api/v1/sub/api-key', params);
  }

  /**
   * REST - FUNDING - FUNDING OVERVIEW
   */

  getBalance(params?: {
    currency?: string;
  }): Promise<APISuccessResponse<AccountBalance>> {
    return this.getPrivate('api/v1/account-overview', params);
  }

  getSubBalances(params?: { currency?: string }): Promise<
    APISuccessResponse<{
      summary: AccountSummary;
      accounts: SubBalance[];
    }>
  > {
    return this.getPrivate('api/v1/account-overview-all', params);
  }

  /**
   * REST - FUNDING - TRANSFER
   */

  submitTransferOut(
    params: SubmitTransfer,
  ): Promise<Promise<APISuccessResponse<TransferDetail>>> {
    return this.postPrivate('api/v3/transfer-out', params);
  }

  submitTransferIn(params: SubmitTransfer): Promise<any> {
    return this.postPrivate('api/v1/transfer-in', params);
  }

  getTransfers(
    params: GetTransfersRequest,
  ): Promise<APISuccessResponse<FuturesTransferRecords>> {
    return this.getPrivate('api/v1/transfer-list', params);
  }

  /**
   * REST - FUNDING - TRADE FEE
   */

  getTradingPairFee(params: { symbols: string }): Promise<
    APISuccessResponse<{
      symbol: string;
      takerFeeRate: string;
      makerFeeRate: string;
    }>
  > {
    return this.getPrivate('/api/v1/trade-fees', params);
  }

  /**
   *
   * REST - FUTURES TRADING - Market Data
   *
   */

  getSymbols(): Promise<APISuccessResponse<SymbolDetail[]>> {
    return this.get('api/v1/contracts/active');
  }

  getSymbol(params: {
    symbol: string;
  }): Promise<APISuccessResponse<SymbolDetail>> {
    return this.get(`api/v1/contracts/${params.symbol}`);
  }

  getTicker(params: {
    symbol: string;
  }): Promise<APISuccessResponse<TickerDetail>> {
    return this.get('api/v1/ticker', params);
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

  getKlines(params: GetKlinesRequest): Promise<APISuccessResponse<Klines[]>> {
    return this.get('api/v1/kline/query', params);
  }

  getInterestRates(params: GetInterestRatesRequest): Promise<
    APISuccessResponse<{
      dataList: InterestRateItem[];
      hasMore: boolean; // Whether there are more pages
    }>
  > {
    return this.get('api/v1/interest/query', params);
  }

  getIndex(params: GetInterestRatesRequest): Promise<
    APISuccessResponse<{
      dataList: IndexListItem[];
      hasMore: boolean; // Whether there are more pages
    }>
  > {
    return this.get('api/v1/index/query', params);
  }

  getMarkPrice(params: {
    symbol: string;
  }): Promise<APISuccessResponse<FuturesMarkPrice>> {
    return this.get(`api/v1/mark-price/${params.symbol}/current`);
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

  /**
   *
   * REST - FUTURES TRADING - Orders
   *
   */

  submitOrder(params: Order): Promise<APISuccessResponse<{ orderId: string }>> {
    return this.postPrivate('api/v1/orders', params);
  }

  submitNewOrderTest(): Promise<any> {
    return this.postPrivate('api/v1/orders/test');
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

  submitMultipleOrders(
    params: Order,
  ): Promise<APISuccessResponse<SubmitMultipleOrdersFuturesResponse[]>> {
    return this.postPrivate('api/v1/orders/multi', params);
  }

  cancelMultipleOrders(params?: {
    symbol?: string;
  }): Promise<APISuccessResponse<{ cancelledOrderIds: string[] }>> {
    return this.deletePrivate('api/v1/orders', params);
  }

  cancelMultipleStopOrders(params?: {
    symbol?: string;
  }): Promise<APISuccessResponse<{ cancelledOrderIds: string[] }>> {
    return this.deletePrivate('api/v1/stopOrders', params);
  }

  getOrders(
    params?: GetOrdersRequest,
  ): Promise<APISuccessResponse<FuturesOrders>> {
    return this.getPrivate('api/v1/orders', params);
  }

  getStopOrders(
    params?: GetStopOrdersRequest,
  ): Promise<APISuccessResponse<FuturesOrders>> {
    return this.getPrivate('api/v1/stopOrders', params);
  }

  getRecentOrders(params?: {
    symbol?: string;
  }): Promise<APISuccessResponse<OrderDetail[]>> {
    return this.getPrivate('api/v1/recentDoneOrders', params);
  }

  getOrderByOrderId(params: {
    orderId: string;
  }): Promise<APISuccessResponse<OrderDetail>> {
    return this.getPrivate(`api/v1/orders/${params.orderId}`);
  }

  getOrderByClientOrderId(params: {
    clientOid: string;
  }): Promise<APISuccessResponse<OrderDetail>> {
    return this.getPrivate(`api/v1/orders/byClientOid`, params);
  }

  /**
   *
   * REST - FUTURES TRADING - Fills
   *
   */

  /**
   * Get a list of recent fills.
   *
   * If you need to get your recent trade history with low latency, please query endpoint Get List of Orders Completed in 24h.
   * The requested data is not real-time.
   */
  getFills(
    params?: AccountFillsRequest,
  ): Promise<APISuccessResponse<FuturesFills>> {
    return this.getPrivate('api/v1/fills', params);
  }

  /**
   * Get a list of recent 1000 fills in the last 24 hours.
   *
   * If you need to get your recent traded order history with low latency, you may query this endpoint.
   */
  getRecentFills(params?: {
    symbol?: string;
  }): Promise<APISuccessResponse<FillDetail[]>> {
    return this.getPrivate('api/v1/recentFills', params);
  }

  getOpenOrderStatistics(params: {
    symbol: string;
  }): Promise<APISuccessResponse<FuturesActiveOrder>> {
    return this.getPrivate('api/v1/openOrderStatistics', params);
  }

  /**
   *
   * REST - FUTURES TRADING - Positions
   *
   */

  getPosition(params: {
    symbol: string;
  }): Promise<APISuccessResponse<PositionDetail>> {
    return this.getPrivate('api/v1/position', params);
  }

  getPositions(params?: {
    currency?: string;
  }): Promise<APISuccessResponse<PositionDetail[]>> {
    return this.getPrivate('api/v1/positions', params);
  }

  getHistoryPositions(params?: {
    symbol?: string;
    from?: number;
    to?: number;
    limit?: number;
    pageId?: number;
  }): Promise<APISuccessResponse<FuturesClosedPositions>> {
    return this.getPrivate('/api/v1/history-positions', params);
  }

  updateAutoDepositStatus(params: {
    symbol: string;
    status: boolean;
  }): Promise<APISuccessResponse<boolean>> {
    return this.postPrivate(
      'api/v1/position/margin/auto-deposit-status',
      params,
    );
  }

  getMaxWithdrawMargin(params: {
    symbol: string;
  }): Promise<APISuccessResponse<number>> {
    return this.getPrivate('api/v1/margin/maxWithdrawMargin', params);
  }

  withdrawMargin(params: {
    symbol: string;
    withdrawAmount: string;
  }): Promise<APISuccessResponse<{ sybmol: string; withdrawAmount: number }>> {
    return this.postPrivate('api/v1/margin/withdrawMargin', params);
  }

  depositMargin(params: {
    symbol: string;
    margin: number;
    bizNo: string;
  }): Promise<APISuccessResponse<AddMargin>> {
    return this.postPrivate('api/v1/position/margin/deposit-margin', params);
  }

  /**
   *
   * REST - FUTURES TRADING - Risk limit
   *
   */

  getRiskLimitLevel(params: {
    symbol: string;
  }): Promise<APISuccessResponse<RiskLimit[]>> {
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
   * REST - FUTURES TRADING - Funding fees
   *
   */

  getFundingRate(params: {
    symbol: string;
  }): Promise<APISuccessResponse<FuturesFundingRate>> {
    return this.get(`api/v1/funding-rate/${params.symbol}/current`);
  }

  getFundingRates(
    params: GetFundingRatesRequest,
  ): Promise<APISuccessResponse<FuturesFundingRates[]>> {
    return this.get('api/v1/contract/funding-rates', params);
  }

  getFundingHistory(params: GetFundingHistoryRequest): Promise<
    APISuccessResponse<{
      dataList: FundingHistoryItem[];
      hasMore: boolean; // Whether there are more pages
    }>
  > {
    return this.getPrivate('api/v1/funding-history', params);
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
