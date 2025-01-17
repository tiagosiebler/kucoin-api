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
} from './types/request/futures.types.js';
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
} from './types/response/futures.types.js';
import {
  APISuccessResponse,
  ServiceStatus,
} from './types/response/shared.types.js';
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

  /**
   *
   * REST - ACCOUNT INFO - Account & Funding
   *
   */

  /**
   * Get Account - Futures
   * Request via this endpoint to get the info of the futures account.
   */
  getBalance(params?: {
    currency?: string;
  }): Promise<APISuccessResponse<AccountBalance>> {
    return this.getPrivate('api/v1/account-overview', params);
  }

  /**
   * Get Account Ledgers - Futures
   * This interface can query the ledger records of the futures business line
   */
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

  /**
   * Get SubAccount List - Futures Balance(V2)
   * This endpoint can be used to get Futures sub-account information.
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

  /**
   * Get Actual Fee - Futures
   * This interface is for the actual futures fee rate of the trading pair. The fee rate of your sub-account is the same as that of the master account.
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

  /**
   * Get Symbol
   * Get information of specified contracts that can be traded.
   * This API will return a list of tradable contracts, including some key parameters of the contract such as the symbol name, tick size, mark price,etc.
   */
  getSymbol(params: {
    symbol: string;
  }): Promise<APISuccessResponse<FuturesSymbolInfo>> {
    return this.get(`api/v1/contracts/${params.symbol}`);
  }

  /**
   * Get Symbol
   * Get information of specified contracts that can be traded.
   * This API will return a list of tradable contracts, including some key parameters of the contract such as the symbol name, tick size, mark price,etc.
   */
  getSymbols(): Promise<APISuccessResponse<FuturesSymbolInfo[]>> {
    return this.get('api/v1/contracts/active');
  }

  /**
   * Get Ticker
   * This endpoint returns "last traded price/size"、"best bid/ask price/size" etc. of a single symbol.
   */
  getTicker(params: {
    symbol: string;
  }): Promise<APISuccessResponse<TickerDetail>> {
    return this.get('api/v1/ticker', params);
  }

  /**
   * Get All Tickers
   * This endpoint returns "last traded price/size"、"best bid/ask price/size" etc. of all symbol.
   */
  getTickers(): Promise<APISuccessResponse<TickerDetail[]>> {
    return this.get('api/v1/allTickers');
  }

  /**
   * Get Full OrderBook
   * Query for Full orderbook depth data. (aggregated by price)
   */
  getFullOrderBookLevel2(params: {
    symbol: string;
  }): Promise<APISuccessResponse<FullOrderBookDetail>> {
    return this.get('api/v1/level2/snapshot', params);
  }

  /**
   * Get Part OrderBook
   * Query for part orderbook depth data. (aggregated by price)
   */
  getPartOrderBookLevel2Depth20(params: {
    symbol: string;
  }): Promise<APISuccessResponse<FullOrderBookDetail>> {
    return this.get('api/v1/level2/depth20', params);
  }

  /**
   * Get Part OrderBook
   * Query for part orderbook depth data. (aggregated by price)
   */
  getPartOrderBookLevel2Depth100(params: {
    symbol: string;
  }): Promise<APISuccessResponse<FullOrderBookDetail>> {
    return this.get('api/v1/level2/depth100', params);
  }

  /**
   * Get Trade History
   * Request via this endpoint to get the trade history of the specified symbol, the returned quantity is the last 100 transaction records.
   */
  getMarketTrades(params: {
    symbol: string;
  }): Promise<APISuccessResponse<MarketTradeDetail>> {
    return this.get('api/v1/trade/history', params);
  }

  /**
   * Get Klines
   * Get the Kline of the symbol. Data are returned in grouped buckets based on requested type.
   */
  getKlines(
    params: GetKlinesRequest,
  ): Promise<APISuccessResponse<FuturesKline[]>> {
    return this.get('api/v1/kline/query', params);
  }

  /**
   * Get Mark Price
   * Get the mark price of the symbol.
   */
  getMarkPrice(params: {
    symbol: string;
  }): Promise<APISuccessResponse<FuturesMarkPrice>> {
    return this.get(`api/v1/mark-price/${params.symbol}/current`);
  }

  /**
   * Get Spot Index Price
   * This endpoint returns the index price of the specified symbol.
   */
  getIndex(params: GetInterestRatesRequest): Promise<
    APISuccessResponse<{
      dataList: IndexListItem[];
      hasMore: boolean; // Whether there are more pages
    }>
  > {
    return this.get('api/v1/index/query', params);
  }

  /**
   * Get Interest Rate Index
   * This endpoint returns the interest rate index of the specified symbol.
   */
  getInterestRates(params: GetInterestRatesRequest): Promise<
    APISuccessResponse<{
      dataList: InterestRateItem[];
      hasMore: boolean; // Whether there are more pages
    }>
  > {
    return this.get('api/v1/interest/query', params);
  }

  /**
   * Get Premium Index
   * This endpoint returns the premium index of the specified symbol.
   */
  getPremiumIndex(params: GetInterestRatesRequest): Promise<
    APISuccessResponse<{
      dataList: PremiumIndexItem[];
      hasMore: boolean; // Whether there are more pages
    }>
  > {
    return this.get('api/v1/premium/query', params);
  }

  /**
   * Get 24hr Stats
   * Get the statistics of the platform futures trading volume in the last 24 hours.
   */
  get24HourTransactionVolume(): Promise<
    APISuccessResponse<{
      turnoverOf24h: number;
    }>
  > {
    return this.get('api/v1/trade-statistics');
  }

  /**
   * Get Server Time
   * Get the API server time. This is the Unix timestamp.
   */
  getServerTime(): Promise<APISuccessResponse<number>> {
    return this.get('api/v1/timestamp');
  }

  /**
   * Get Service Status
   * This endpoint returns the status of the API service.
   */
  getServiceStatus(): Promise<APISuccessResponse<ServiceStatus>> {
    return this.get('api/v1/status');
  }

  /**
   *
   * REST - Futures Trading - Orders
   *
   */

  /**
   * Add Order
   * Place order to the futures trading system
   */
  submitOrder(params: Order): Promise<
    APISuccessResponse<{
      orderId?: string;
      clientOid?: string;
    }>
  > {
    return this.postPrivate('api/v1/orders', params);
  }

  /**
   * Add Order Test
   * Order test endpoint, the request parameters and return parameters of this endpoint are exactly the same as the order endpoint, and can be used to verify whether the signature is correct and other operations.
   */
  submitNewOrderTest(params: Order): Promise<{
    orderId?: string;
    clientOid?: string;
  }> {
    return this.postPrivate('api/v1/orders/test', params);
  }

  /**
   * Batch Add Orders
   * Place multiple order to the futures trading system
   */
  submitMultipleOrders(
    params: Order[],
  ): Promise<APISuccessResponse<SubmitMultipleOrdersFuturesResponse[]>> {
    return this.postPrivate('api/v1/orders/multi', params);
  }

  /**
   * Add Take Profit And Stop Loss Order
   * Place take profit and stop loss order supports both take-profit and stop-loss functions, and other functions are exactly the same as the place order interface.
   */
  submitSLTPOrder(params: SLTPOrder): Promise<
    APISuccessResponse<{
      orderId?: string;
      clientOid?: string;
    }>
  > {
    return this.postPrivate('api/v1/st-orders', params);
  }

  /**
   * Cancel Order By OrderId
   * Cancel an order (including a stop order).
   */
  cancelOrderById(params: {
    orderId: string;
  }): Promise<APISuccessResponse<{ cancelledOrderIds: string[] }>> {
    return this.deletePrivate(`api/v1/orders/${params.orderId}`);
  }

  /**
   * Cancel Order By Client Order Id
   * Cancel an order (including a stop order) by client order id.
   */
  cancelOrderByClientOid(params: {
    clientOid: string;
  }): Promise<APISuccessResponse<{ clientOid: string }>> {
    return this.deletePrivate(`api/v1/orders/client-order/${params.clientOid}`);
  }

  /**
   * Batch Cancel Orders
   * Cancel multiple orders.
   */
  batchCancelOrders(params: BatchCancelOrdersRequest): Promise<
    APISuccessResponse<{
      data: BatchCancelOrderResult[];
    }>
  > {
    return this.deletePrivate('api/v1/orders/multi-cancel', params);
  }

  /**
   * Cancel All Orders
   * Using this endpoint, all open orders (excluding stop orders) can be canceled in batches.
   */
  cancelAllOrdersV3(params: {
    symbol: string;
  }): Promise<APISuccessResponse<{ cancelledOrderIds: string[] }>> {
    return this.deletePrivate('api/v3/orders', params);
  }

  /**
   * Cancel All Stop orders
   * Using this endpoint, all untriggered stop orders can be canceled in batches.
   */
  cancelAllStopOrders(params?: {
    symbol?: string;
  }): Promise<APISuccessResponse<{ cancelledOrderIds: string[] }>> {
    return this.deletePrivate('api/v1/stopOrders', params);
  }

  /**
   * Get Order By OrderId
   * Get order details by order id.
   */
  getOrderByOrderId(params: {
    orderId: string;
  }): Promise<APISuccessResponse<FuturesOrder>> {
    return this.getPrivate(`api/v1/orders/${params.orderId}`);
  }

  /**
   * Get Order By Client Order Id
   * Get order details by client order id.
   */
  getOrderByClientOrderId(params: {
    clientOid: string;
  }): Promise<APISuccessResponse<FuturesOrder>> {
    return this.getPrivate(`api/v1/orders/byClientOid`, params);
  }

  /**
   * Get Order List
   * List your current orders. Any limit order on the exchange order book is in active status.
   */
  getOrders(
    params?: GetOrdersRequest,
  ): Promise<APISuccessResponse<FuturesOrders>> {
    return this.getPrivate('api/v1/orders', params);
  }

  /**
   * Get Recent Closed Orders
   * Get a list of recent 1000 closed orders in the last 24 hours.
   */
  getRecentOrders(params?: {
    symbol?: string;
  }): Promise<APISuccessResponse<FuturesOrder[]>> {
    return this.getPrivate('api/v1/recentDoneOrders', params);
  }

  /**
   * Get Stop Order List
   * Get the un-triggered stop orders list. Stop orders that have been triggered can be queried through the general order interface
   */
  getStopOrders(
    params?: GetStopOrdersRequest,
  ): Promise<APISuccessResponse<FuturesOrders>> {
    return this.getPrivate('api/v1/stopOrders', params);
  }

  /**
   * Get Open Order Value
   * You can query this endpoint to get the the total number and value of the all your active orders.
   */
  getOpenOrderStatistics(params: {
    symbol: string;
  }): Promise<APISuccessResponse<FuturesActiveOrder>> {
    return this.getPrivate('api/v1/openOrderStatistics', params);
  }

  /**
   * Get Recent Trade History
   * Get a list of recent 1000 fills in the last 24 hours.
   */
  getRecentFills(params?: {
    symbol?: string;
  }): Promise<APISuccessResponse<FuturesFill[]>> {
    return this.getPrivate('api/v1/recentFills', params);
  }

  /**
   * Get Trade History
   * Get a list of recent fills.
   * If you need to get your recent trade history with low latency, please query endpoint Get List of Orders Completed in 24h. The requested data is not real-time.
   */
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

  /**
   * Get Margin Mode
   * This interface can query the margin mode of the current symbol.
   */
  getMarginMode(params: { symbol: string }): Promise<
    APISuccessResponse<{
      symbol: string;
      marginMode: 'ISOLATED' | 'CROSS';
    }>
  > {
    return this.getPrivate('api/v2/position/getMarginMode', params);
  }

  /**
   * Switch Margin Mode
   * Modify the margin mode of the current symbol.
   */
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

  /**
   * Get Max Open Size
   * Get Maximum Open Position Size.
   */
  getMaxOpenSize(
    params: MaxOpenSizeRequest,
  ): Promise<APISuccessResponse<MaxOpenSize>> {
    return this.getPrivate('api/v2/getMaxOpenSize', params);
  }

  /**
   * Get Position Details
   * Get the position details of a specified position.
   */
  getPosition(params: {
    symbol: string;
  }): Promise<APISuccessResponse<FuturesPosition>> {
    return this.getPrivate('api/v1/position', params);
  }

  /**
   * Get Position List
   * Get the position details of a specified position.
   */
  getPositions(params?: {
    currency?: string;
  }): Promise<APISuccessResponse<FuturesPosition[]>> {
    return this.getPrivate('api/v1/positions', params);
  }

  /**
   * Get Positions History
   * This interface can query position history information records.
   */
  getHistoryPositions(params?: {
    symbol?: string;
    from?: number;
    to?: number;
    limit?: number;
    pageId?: number;
  }): Promise<APISuccessResponse<FuturesClosedPositions>> {
    return this.getPrivate('api/v1/history-positions', params);
  }

  /**
   * Get Max Withdraw Margin
   * This interface can query the maximum amount of margin that the current position supports withdrawal.
   */
  getMaxWithdrawMargin(params: {
    symbol: string;
  }): Promise<APISuccessResponse<number>> {
    return this.getPrivate('api/v1/margin/maxWithdrawMargin', params);
  }

  /**
   * Get Cross Margin Leverage
   * This interface can query the current symbol’s cross-margin leverage multiple.
   */
  getCrossMarginLeverage(params: { symbol: string }): Promise<
    APISuccessResponse<{
      symbol: string;
      leverage: string;
    }>
  > {
    return this.getPrivate('api/v2/getCrossUserLeverage', params);
  }

  /**
   * Modify Cross Margin Leverage
   * This interface can modify the current symbol’s cross-margin leverage multiple.
   */
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

  /**
   * Add Isolated Margin
   * Add Isolated Margin Manually.
   */
  depositMargin(params: {
    symbol: string;
    margin: number;
    bizNo: string;
  }): Promise<APISuccessResponse<AddMargin>> {
    return this.postPrivate('api/v1/position/margin/deposit-margin', params);
  }

  /**
   * Remove Isolated Margin
   * Remove Isolated Margin Manually.
   */
  withdrawMargin(params: {
    symbol: string;
    withdrawAmount: string;
  }): Promise<APISuccessResponse<{ sybmol: string; withdrawAmount: number }>> {
    return this.postPrivate('api/v1/margin/withdrawMargin', params);
  }

  /**
   * Get Isolated Margin Risk Limit
   * This interface can be used to obtain information about risk limit level of a specific contract(Only valid for isolated Margin).
   */
  getRiskLimitLevel(params: {
    symbol: string;
  }): Promise<APISuccessResponse<FuturesRiskLimit[]>> {
    return this.getPrivate(`api/v1/contracts/risk-limit/${params.symbol}`);
  }

  /**
   * Modify Isolated Margin Risk Limit
   * This interface is for the adjustment of the risk limit level(Only valid for isolated Margin).
   */
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

  /**
   * Get Current Funding Rate
   * This interface can be used to obtain the current funding rate of the specified symbol.
   */
  getFundingRate(params: {
    symbol: string;
  }): Promise<APISuccessResponse<FuturesCurrentFundingRate>> {
    return this.get(`api/v1/funding-rate/${params.symbol}/current`);
  }

  /**
   * Get Public Funding History
   * Query the funding rate at each settlement time point within a certain time range of the corresponding contract
   */
  getFundingRates(
    params: GetFundingRatesRequest,
  ): Promise<APISuccessResponse<FuturesHistoricFundingRate[]>> {
    return this.get('api/v1/contract/funding-rates', params);
  }

  /**
   * Get Private Funding History
   * Submit request to get the funding history.
   */
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

  /*
   *
   * DEPRECATED
   *
   */

  /**
   * @deprecated - please use universal transfer from SpotClient
   */
  submitTransferOut(params: {
    currency: string;
    amount: number;
    recAccountType: 'MAIN' | 'TRADE';
  }): Promise<APISuccessResponse<any>> {
    return this.postPrivate('api/v3/transfer-out', params);
  }

  /**
   * @deprecated - please use universal transfer from SpotClient
   */
  submitTransferIn(params: {
    currency: string;
    amount: number;
    payAccountType: 'MAIN' | 'TRADE';
  }): Promise<APISuccessResponse<any>> {
    return this.postPrivate('api/v1/transfer-in', params);
  }

  /**
   * @deprecated - please use universal transfer from SpotClient
   */
  getTransfers(params?: {
    currency?: string;
    type?: 'MAIN' | 'TRADE' | 'MARGIN' | 'ISOLATED';
    tag?: string[];
    startAt?: number;
    endAt?: number;
    currentPage?: number;
    pageSize?: number;
  }): Promise<APISuccessResponse<any>> {
    return this.getPrivate('api/v1/transfer-list', params);
  }

  /**
   * @deprecated - please use updateMarginMode() instead
   */
  updateAutoDepositStatus(params: {
    symbol: string;
    status: boolean;
  }): Promise<APISuccessResponse<any>> {
    console.warn(
      'WARNING: This method is deprecated. It is recommended to use cross margin mode instead.',
    );
    return this.postPrivate(
      'api/v1/position/margin/auto-deposit-status',
      params,
    );
  }
}
