import { AxiosRequestConfig } from 'axios';
import { nanoid } from 'nanoid';
import {
  AccountBalance,
  AddMargin,
  CreateSubAccountAPIResponseItem,
  FillDetail,
  FullOrderBookDetail,
  GetAccountActiveOrderResponse,
  GetAccountFillsFuturesResponse,
  GetAccountOrdersFuturesResponse,
  GetAccountTransactionsFuturesResponse,
  GetAllSubAccountBalancesFuturesResponse,
  GetClosePosition,
  GetFundingHistoryResponse,
  GetFundingRateFuturesResponse,
  GetFundingRatesFuturesResponse,
  GetFuturesTransferRecordsResponse,
  GetIndexListFuturesResponse,
  GetInterestRateListFuturesResponse,
  GetMarkPriceFuturesResponse,
  GetPremiumIndexFuturesResponse,
  Klines,
  MarketTradeDetail,
  OrderDetail,
  PositionDetail,
  RiskLimit,
  SubAccountAPIItem,
  SubmitMultipleOrdersFuturesResponse,
  SymbolDetail,
  TickerDetail,
  TransferDetail,
  UpdateSubAccountAPIResponse,
} from 'types/response/futures.types.js';

import { BaseRestClient } from './lib/BaseRestClient.js';
import {
  REST_CLIENT_TYPE_ENUM,
  RestClientOptions,
  RestClientType,
} from './lib/requestUtils.js';
import {
  AccountFillsRequest,
  CreateSubAccountAPIRequest,
  DeleteSubAccountAPIRequest,
  GetAccountOrdersFuturesRequest,
  GetAccountTransactionsFuturesRequest,
  GetAccountUntriggeredStopOrdersListFuturesRequest,
  GetFundingHistoryRequest,
  GetFundingRatesRequest,
  GetFuturesTransferRecordRequest,
  GetInterestIndexPremiumRequest,
  GetKlinesFuturesRequest,
  NewFuturesOrderV1,
  SubmitMultipleOrdersFuturesRequest,
  TransferFromAccountFuturesRequest,
  TransferToFuturesAccountFuturesRequest,
  UpdateSubAccountAPIRequest,
} from './types/request/futures.types.js';
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
  getAccountTransactions(
    params: GetAccountTransactionsFuturesRequest,
  ): Promise<APISuccessResponse<GetAccountTransactionsFuturesResponse>> {
    return this.getPrivate('api/v1/transaction-history', params);
  }

  /**
   * REST - ACCOUNT  - SUBACCOUNT API
   */

  getSubAccountAPIs(params: {
    apiKey?: string;
    subName: string;
  }): Promise<APISuccessResponse<SubAccountAPIItem[]>> {
    return this.getPrivate('api/v1/sub/api-key', params);
  }

  createSubAccountAPI(
    params: CreateSubAccountAPIRequest,
  ): Promise<APISuccessResponse<CreateSubAccountAPIResponseItem>> {
    return this.postPrivate('api/v1/sub/api-key', params);
  }

  updateSubAccountAPI(
    params: UpdateSubAccountAPIRequest,
  ): Promise<APISuccessResponse<UpdateSubAccountAPIResponse>> {
    return this.postPrivate('api/v1/sub/api-key/update', params);
  }

  deleteSubAccountAPI(params: DeleteSubAccountAPIRequest): Promise<
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

  getAccountBalance(params?: {
    currency?: string;
  }): Promise<APISuccessResponse<AccountBalance>> {
    return this.getPrivate('api/v1/account-overview', params);
  }

  getAllSubAccountBalances(params?: {
    currency?: string;
  }): Promise<APISuccessResponse<GetAllSubAccountBalancesFuturesResponse>> {
    return this.getPrivate('api/v1/account-overview-all', params);
  }

  /**
   * REST - FUNDING - TRANSFER
   */

  transferFromAccount(
    params: TransferFromAccountFuturesRequest,
  ): Promise<Promise<APISuccessResponse<TransferDetail>>> {
    return this.postPrivate('api/v3/transfer-out', params);
  }

  transferToFuturesAccount(
    params: TransferToFuturesAccountFuturesRequest,
  ): Promise<any> {
    return this.postPrivate('api/v1/transfer-in', params);
  }

  getFuturesTransferOutRequestRecords(
    params: GetFuturesTransferRecordRequest,
  ): Promise<APISuccessResponse<GetFuturesTransferRecordsResponse>> {
    return this.getPrivate('api/v1/transfer-list', params);
  }

  /**
   * REST - FUNDING - TRADE FEE
   */

  getTradingPairActualFee(params: { symbols: string }): Promise<
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
   * Futures Market Data
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

  getKlines(
    params: GetKlinesFuturesRequest,
  ): Promise<APISuccessResponse<Klines[]>> {
    return this.get('api/v1/kline/query', params);
  }

  getInterestRateList(
    params: GetInterestIndexPremiumRequest,
  ): Promise<APISuccessResponse<GetInterestRateListFuturesResponse>> {
    return this.get('api/v1/interest/query', params);
  }

  getIndexList(
    params: GetInterestIndexPremiumRequest,
  ): Promise<APISuccessResponse<GetIndexListFuturesResponse>> {
    return this.get('api/v1/index/query', params);
  }

  getMarkPrice(params: {
    symbol: string;
  }): Promise<APISuccessResponse<GetMarkPriceFuturesResponse>> {
    return this.get(`api/v1/mark-price/${params.symbol}/current`);
  }

  getPremiumIndex(
    params: GetInterestIndexPremiumRequest,
  ): Promise<APISuccessResponse<GetPremiumIndexFuturesResponse>> {
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

  submitNewOrderTest(): Promise<any> {
    return this.postPrivate('api/v1/orders/test');
  }

  cancelAccountOrderById(params: {
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
    params: SubmitMultipleOrdersFuturesRequest,
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

  getAccountOrders(
    params?: GetAccountOrdersFuturesRequest,
  ): Promise<APISuccessResponse<GetAccountOrdersFuturesResponse>> {
    return this.getPrivate('api/v1/orders', params);
  }

  getAccountUntriggeredStopOrdersList(
    params?: GetAccountUntriggeredStopOrdersListFuturesRequest,
  ): Promise<APISuccessResponse<GetAccountOrdersFuturesResponse>> {
    return this.getPrivate('api/v1/stopOrders', params);
  }

  getAccountRecentOrders(params?: {
    symbol?: string;
  }): Promise<APISuccessResponse<OrderDetail[]>> {
    return this.getPrivate('api/v1/recentDoneOrders', params);
  }

  getAccountOrderDetailsByOrderId(params: {
    orderId: string;
  }): Promise<APISuccessResponse<OrderDetail>> {
    return this.getPrivate(`api/v1/orders/${params.orderId}`);
  }

  getAccountOrderDetailsByClientOrderId(params: {
    clientOid: string;
  }): Promise<APISuccessResponse<OrderDetail>> {
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
  getAccountFills(
    params?: AccountFillsRequest,
  ): Promise<APISuccessResponse<GetAccountFillsFuturesResponse>> {
    return this.getPrivate('api/v1/fills', params);
  }

  /**
   * Get a list of recent 1000 fills in the last 24 hours.
   *
   * If you need to get your recent traded order history with low latency, you may query this endpoint.
   */
  getAccountRecentFills(params?: {
    symbol?: string;
  }): Promise<APISuccessResponse<FillDetail[]>> {
    return this.getPrivate('api/v1/recentFills', params);
  }

  getAccountActiveOrderValueCalculation(params: {
    symbol: string;
  }): Promise<APISuccessResponse<GetAccountActiveOrderResponse>> {
    return this.getPrivate('api/v1/openOrderStatistics', params);
  }

  /**
   *
   * Futures Positions
   *
   */

  getAccountPosition(params: {
    symbol: string;
  }): Promise<APISuccessResponse<PositionDetail>> {
    return this.getPrivate('api/v1/position', params);
  }

  getAccountPositions(params?: {
    currency?: string;
  }): Promise<APISuccessResponse<PositionDetail[]>> {
    return this.getPrivate('api/v1/positions', params);
  }

  getAccountHistoryPositions(params?: {
    symbol?: string;
    from?: number;
    to?: number;
    limit?: number;
    pageId?: number;
  }): Promise<APISuccessResponse<GetClosePosition>> {
    return this.getPrivate('/api/v1/history-positions', params);
  }

  setAutoDepositMarginStatus(params: {
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

  removeMarginManually(params: {
    symbol: string;
    withdrawAmount: string;
  }): Promise<APISuccessResponse<{ sybmol: string; withdrawAmount: number }>> {
    return this.postPrivate('api/v1/margin/withdrawMargin', params);
  }

  addMarginManually(params: {
    symbol: string;
    margin: number;
    bizNo: string;
  }): Promise<APISuccessResponse<AddMargin>> {
    return this.postPrivate('api/v1/position/margin/deposit-margin', params);
  }

  /**
   *
   * Futures risk limit
   *
   */

  getRiskLimitLevel(params: {
    symbol: string;
  }): Promise<APISuccessResponse<RiskLimit[]>> {
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

  getFundingRate(params: {
    symbol: string;
  }): Promise<APISuccessResponse<GetFundingRateFuturesResponse>> {
    return this.get(`api/v1/funding-rate/${params.symbol}/current`);
  }

  getFundingRates(
    params: GetFundingRatesRequest,
  ): Promise<APISuccessResponse<GetFundingRatesFuturesResponse[]>> {
    return this.get('api/v1/contract/funding-rates', params);
  }

  getAccountFundingHistory(
    params: GetFundingHistoryRequest,
  ): Promise<APISuccessResponse<GetFundingHistoryResponse>> {
    return this.getPrivate('api/v1/funding-history', params);
  }
}
