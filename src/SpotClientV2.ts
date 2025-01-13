import { AxiosRequestConfig } from 'axios';
import { nanoid } from 'nanoid';
import {
  AccountHFMarginTransactionsRequest,
  AccountHFTransactionsRequest,
  CreateSubAccountAPIRequest,
  CreateSubAccountRequest,
  DeleteSubAccountAPIRequest,
  GetBalancesRequest,
  GetSpotTransactionsRequest,
  UpdateSubAccountAPIRequest,
} from 'types/request/spot-account.js';
import {
  GetEarnFixedIncomeHoldAssetsRequest,
  GetEarnRedeemPreviewRequest,
  InitiateRedemptionRequest,
  SubscribeEarnFixedIncomeRequest,
} from 'types/request/spot-earn.js';
import {
  ApplyWithdrawRequest,
  CreateDepositAddressV3Request,
  FlexTransferRequest,
  GetDepositsRequest,
  GetIsolatedMarginBalanceRequest,
  GetMarginBalanceRequest,
  GetTransferableRequest,
  GetWithdrawalsRequest,
  InnerTransferRequest,
  submitTransferMasterSubRequest,
  SubmitWithdrawV3Request,
} from 'types/request/spot-funding.js';
import {
  GetHFMarginFilledRequest,
  getHFMarginFillsRequest,
  GetLendingRedemptionOrdersV3Request,
  GetLendingSubscriptionOrdersV3Request,
  HFMarginRequestOrder,
  InitiateLendingRedemptionV3Request,
  InitiateLendingSubscriptionV3Request,
  MarginBorrowV3Request,
  MarginHistoryV3Request,
  MarginInterestRecordsRequest,
  MarginRepayV3Request,
  MarginRiskLimitRequest,
  ModifyLendingSubscriptionOrdersV3Request,
  SubmitHFMarginOrderRequest,
  SubmitMarginOrderRequest,
} from 'types/request/spot-margin-trading.js';
import { GetAnnouncementsRequest } from 'types/request/spot-misc.js';
import {
  CancelAllOrdersRequest,
  CancelSpecifiedNumberHFOrdersRequest,
  CancelStopOrdersRequest,
  GetFillsRequest,
  GetHFCompletedOrdersRequest,
  GetHFFilledListRequest,
  GetOCOOrdersRequest,
  GetOrderListRequest,
  GetSpotKlinesRequest,
  GetStopOrdersListRequest,
  ModifyHFOrderRequest,
  SubmitHFOrderRequest,
  SubmitMultipleHFOrdersRequest,
  SubmitMultipleOrdersRequest,
  SubmitOCOOrderRequest,
  SubmitOrderRequest,
  SubmitStopOrderRequest,
} from 'types/request/spot-trading.js';
import {
  Account,
  AccountHFMarginTransactions,
  Balances,
  CreateSubAccount,
  CreateSubAPI,
  DeleteSubAccountAPI,
  SpotAccountSummary,
  SpotAccountTransaction,
  SpotAccountTransactions,
  SubAccountAPIInfo,
  SubAccountBalance,
  SubAccountBalancesV2,
  SubAccountInfo,
  SubAccountsV2,
  UpdateSubAPI,
} from 'types/response/spot-account.js';
import {
  EarnFixedIncomeHoldAssets,
  EarnProduct,
  GetEarnRedeemPreviewResponse,
  InitiateRedemptionResponse,
  SubscribeEarnFixedIncomeResponse,
} from 'types/response/spot-earn.js';
import {
  CreateDepositAddressV3Response,
  DepositAddress,
  DepositAddressV2,
  Deposits,
  HistoricalWithdrawalsV1,
  IsolatedMarginBalance,
  MarginAccountBalance,
  MarginBalance,
  TransferableFunds,
  V1HistoricalDeposits,
  WithdrawalQuotas,
  Withdrawals,
} from 'types/response/spot-funding.js';
import {
  HFMarginFilledOrder,
  HFMarginOrder,
  HFMarginTransactionRecord,
  IsolatedMarginAccountInfo,
  IsolatedMarginSymbolsConfig,
  LendingCurrencyV3,
  LendingRedemption,
  MarginConfigInfo,
  MarginHistoryRecord,
  MarginInterestRecords,
  MarginLevTokenInfo,
  MarginMarkPrice,
  MarginOrderV3,
  MarginRiskLimit,
  SingleIsolatedMarginAccountInfo,
  SubmitMarginOrderResponse,
} from 'types/response/spot-margin-trading.js';
import { Announcements } from 'types/response/spot-misc.js';
import {
  AutoCancelHFOrderSettingQueryResponse,
  CancelAllHFOrdersResponse,
  CurrencyInfo,
  HFFilledOrder,
  HFOrder,
  Kline,
  MultipleOrdersResponse,
  OCOOrderDetails,
  OCOOrderListItem,
  OCOOrders,
  OrderBookLevel,
  SpotOrder,
  SpotOrderFill,
  SpotOrderFills,
  SpotOrderList,
  StopOrderItem,
  StopOrders,
  SubmitHFOrderSyncResponse,
  SubmitMultipleHFOrdersResponse,
  SubmitMultipleHFOrdersSyncResponse,
  Symbol24hrStats,
  SymbolInfo,
  SyncCancelHFOrderResponse,
  Ticker,
  TradeHistory,
} from 'types/response/spot-trading.js';
import { OtcLoan, OtcLoanAccount } from 'types/response/spot-vip.js';
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
   * Misc SDK Methods
   *
   */

  /**
   * This method is used to get the latency and time sync between the client and the server.
   * This is not official API endpoint and is only used for internal testing purposes.
   * Use this method to check the latency and time sync between the client and the server.
   * Final values might vary slightly, but it should be within few ms difference.
   * If you have any suggestions or improvements to this measurement, please create an issue or pull request on GitHub.
   */
  async fetchLatencySummary(): Promise<any> {
    const clientTimeReqStart = Date.now();
    const serverTime = await this.getServerTime();
    const clientTimeReqEnd = Date.now();

    const serverTimeMs = serverTime.data;
    const roundTripTime = clientTimeReqEnd - clientTimeReqStart;
    const estimatedOneWayLatency = Math.floor(roundTripTime / 2);

    // Adjust server time by adding estimated one-way latency
    const adjustedServerTime = serverTimeMs + estimatedOneWayLatency;

    // Calculate time difference between adjusted server time and local time
    const timeDifference = adjustedServerTime - clientTimeReqEnd;

    const result = {
      localTime: clientTimeReqEnd,
      serverTime: serverTimeMs,
      roundTripTime,
      estimatedOneWayLatency,
      adjustedServerTime,
      timeDifference,
    };

    console.log('Time synchronization results:');
    console.log(result);

    console.log(
      `Your approximate latency to exchange server: 
    One way: ${estimatedOneWayLatency}ms.
    Round trip: ${roundTripTime}ms.
    `,
    );

    if (timeDifference > 500) {
      console.warn(
        `WARNING! Time difference between server and client clock is greater than 500ms. It is currently ${timeDifference}ms.
      Consider adjusting your system clock to avoid unwanted clock sync errors!
      Visit https://github.com/tiagosiebler/awesome-crypto-examples/wiki/Timestamp-for-this-request-is-outside-of-the-recvWindow for more information`,
      );
    } else {
      console.log(
        `Time difference between server and client clock is within acceptable range of 500ms. It is currently ${timeDifference}ms.`,
      );
    }

    return result;
  }

  /**
   *
   * Misc Utility Methods
   *
   */

  generateNewOrderID(): string {
    return nanoid(32);
  }

  getServerTime(): Promise<APISuccessResponse<number>> {
    return this.get('api/v1/timestamp');
  }

  getServiceStatus(): Promise<APISuccessResponse<ServiceStatus>> {
    return this.get('api/v1/status');
  }

  /**
   *
   * REST - Account Info - Account & Funding
   *
   */

  getAccountSummary(): Promise<APISuccessResponse<SpotAccountSummary>> {
    return this.getPrivate('api/v2/user-info');
  }

  /**
   * Get API Key Information
   *
   * Get information about the API key being used. Works for both master and sub user API keys.
   */
  getApikeyInfo(): Promise<
    APISuccessResponse<{
      remark: string;
      apiKey: string;
      apiVersion: number;
      permission: string;
      ipWhitelist: string;
      createdAt: number;
      uid: number;
      isMaster: boolean;
    }>
  > {
    return this.getPrivate('api/v1/user/api-key');
  }

  /**
   * Get Account Type - Spot
   *
   * This interface determines whether the current user is a spot high-frequency user or a spot low-frequency user.
   */
  getUserType(): Promise<APISuccessResponse<boolean>> {
    return this.getPrivate('api/v1/hf/accounts/opened');
  }

  /**
   * Get a list of acounts and their balance states (spot/margin/trade_hf)
   *
   * Get Account List - Spot
   */
  getBalances(
    params?: GetBalancesRequest,
  ): Promise<APISuccessResponse<Balances[]>> {
    return this.getPrivate('api/v1/accounts', params);
  }

  /**
   * Get Account Detail - Spot
   *
   * Get Information for a single spot account. Use this endpoint when you know the accountId.
   */
  getAccountDetail(params: {
    accountId: any;
  }): Promise<APISuccessResponse<Account>> {
    return this.getPrivate(`api/v1/accounts/${params.accountId}`);
  }

  getMarginBalance(
    params?: GetMarginBalanceRequest,
  ): Promise<APISuccessResponse<MarginBalance>> {
    return this.getPrivate('api/v3/margin/accounts', params);
  }

  getIsolatedMarginBalance(
    params?: GetIsolatedMarginBalanceRequest,
  ): Promise<APISuccessResponse<IsolatedMarginBalance[]>> {
    return this.getPrivate('api/v3/isolated/accounts', params);
  }

  /**
   * Get Account Ledgers - Spot/Margin
   *
   * This interface is for transaction records from all types of your accounts, supporting inquiry of various currencies.
   * Items are paginated and sorted to show the latest first.
   * See the Pagination section for retrieving additional entries after the first page.
   */
  getTransactions(
    params?: GetSpotTransactionsRequest,
  ): Promise<APISuccessResponse<SpotAccountTransactions>> {
    return this.getPrivate('api/v1/accounts/ledgers', params);
  }

  /**
   * Get Account Ledgers - trade_hf
   *
   * This API endpoint returns all transfer (in and out) records in high-frequency trading account and supports multi-coin queries.
   * The query results are sorted in descending order by createdAt and id.
   */
  getHFTransactions(
    params: AccountHFTransactionsRequest,
  ): Promise<APISuccessResponse<SpotAccountTransaction[]>> {
    return this.getPrivate('api/v1/hf/accounts/ledgers', params);
  }

  /**
   * Get Account Ledgers - margin_hf
   *
   * This API endpoint returns all transfer (in and out) records in high-frequency margin trading account and supports multi-coin queries.
   * The query results are sorted in descending order by createdAt and id.
   */
  getHFMarginTransactions(
    params: AccountHFMarginTransactionsRequest,
  ): Promise<APISuccessResponse<AccountHFMarginTransactions[]>> {
    return this.getPrivate('api/v3/hf/margin/account/ledgers', params);
  }

  /**
   *
   * REST - Account Info - Sub Account
   *
   */

  /**
   * Add SubAccount
   *
   * This endpoint is used to create a sub-account.
   */
  createSubAccount(
    params: CreateSubAccountRequest,
  ): Promise<APISuccessResponse<CreateSubAccount>> {
    return this.postPrivate('api/v2/sub/user/created', params);
  }

  enableSubAccountMargin(params: { uid: string }): Promise<void> {
    return this.postPrivate('api/v3/sub/user/margin/enable', params);
  }

  enableSubAccountFutures(params: { uid: string }): Promise<void> {
    return this.postPrivate('api/v3/sub/user/futures/enable', params);
  }

  getSubAccountsV2(params?: {
    currentPage?: number;
    pageSize?: number;
  }): Promise<APISuccessResponse<SubAccountsV2>> {
    return this.getPrivate('api/v2/sub/user', params);
  }

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the GET /api/v2/sub/accounts/balance endpoint instead of this endpoint
   */
  getSubAccountBalance(params: {
    subUserId: string;
    includeBaseAmount: boolean;
  }): Promise<APISuccessResponse<SubAccountBalance>> {
    return this.getPrivate(`api/v1/sub-accounts/${params.subUserId}`, params);
  }

  getSubAccountBalancesV2(params?: {
    currentPage?: number;
    pageSize?: number;
  }): Promise<APISuccessResponse<SubAccountBalancesV2>> {
    return this.getPrivate('api/v2/sub-accounts', params);
  }

  /**
   *
   * REST - Account Info - Sub Account API
   *
   */

  createSubAPI(
    params: CreateSubAccountAPIRequest,
  ): Promise<APISuccessResponse<CreateSubAPI>> {
    return this.postPrivate('api/v1/sub/api-key', params);
  }

  updateSubAPI(
    params: UpdateSubAccountAPIRequest,
  ): Promise<APISuccessResponse<UpdateSubAPI>> {
    return this.postPrivate('api/v1/sub/api-key/update', params);
  }

  getSubAPIs(params: {
    apiKey?: string;
    subName: string;
  }): Promise<APISuccessResponse<SubAccountAPIInfo[]>> {
    return this.getPrivate('api/v1/sub/api-key', params);
  }

  deleteSubAPI(
    params: DeleteSubAccountAPIRequest,
  ): Promise<APISuccessResponse<DeleteSubAccountAPI>> {
    return this.deletePrivate('api/v1/sub/api-key', params);
  }

  /**
   *
   * REST - Account Info - Deposit
   *
   */

  createDepositAddressV3(
    params: CreateDepositAddressV3Request,
  ): Promise<APISuccessResponse<CreateDepositAddressV3Response>> {
    return this.postPrivate('api/v3/deposit-address/create', params);
  }

  getDepositAddressesV3(params: {
    currency: string;
    amount?: string;
    chain?: string;
  }): Promise<APISuccessResponse<DepositAddress[]>> {
    return this.getPrivate('api/v3/deposit-addresses', params);
  }

  getDeposits(
    params?: GetDepositsRequest,
  ): Promise<APISuccessResponse<Deposits>> {
    return this.getPrivate('api/v1/deposits', params);
  }

  /**
   *
   * REST - Account Info - Withdrawals
   *
   */

  getWithdrawalQuotas(params: {
    currency: string;
    chain?: string;
  }): Promise<APISuccessResponse<WithdrawalQuotas>> {
    return this.getPrivate('api/v1/withdrawals/quotas', params);
  }

  submitWithdrawV3(params: SubmitWithdrawV3Request): Promise<
    APISuccessResponse<{
      withdrawalId: string;
    }>
  > {
    return this.postPrivate('api/v3/withdrawals', params);
  }

  cancelWithdrawal(params: {
    withdrawalId: string;
  }): Promise<APISuccessResponse<{ withdrawalId: string }>> {
    return this.deletePrivate(`api/v1/withdrawals/${params.withdrawalId}`);
  }

  getWithdrawals(
    params?: GetWithdrawalsRequest,
  ): Promise<APISuccessResponse<Withdrawals>> {
    return this.getPrivate('api/v1/withdrawals', params);
  }

  /**
   *
   * REST - Account Info - Transfer
   *
   */

  getTransferable(
    params: GetTransferableRequest,
  ): Promise<APISuccessResponse<TransferableFunds>> {
    return this.getPrivate('api/v1/accounts/transferable', params);
  }

  submitFlexTransfer(params: FlexTransferRequest): Promise<
    APISuccessResponse<{
      orderId: string;
    }>
  > {
    return this.postPrivate('api/v3/accounts/universal-transfer', params);
  }

  /**
   *
   * REST - Account Info - Trade Fee
   *
   */

  getBasicUserFee(params: { currencyType: string }): Promise<
    APISuccessResponse<{
      takerFeeRate: string;
      makerFeeRate: string;
    }>
  > {
    return this.getPrivate('api/v1/base-fee', params);
  }

  getTradingPairFee(params: { symbol: string }): Promise<
    APISuccessResponse<
      {
        symbol: string;
        takerFeeRate: string;
        makerFeeRate: string;
      }[]
    >
  > {
    return this.getPrivate('api/v1/trade-fees', params);
  }

  /**
   *
   * REST - SPOT TRADING - Market Data
   *
   */

  getAnnouncements(
    params?: GetAnnouncementsRequest,
  ): Promise<APISuccessResponse<Announcements>> {
    return this.get('api/v3/announcements', params);
  }

  getCurrency(params: {
    currency: string;
    chain?: string;
  }): Promise<APISuccessResponse<CurrencyInfo>> {
    return this.get(`api/v3/currencies/${params.currency}`, params);
  }

  getCurrencies(): Promise<APISuccessResponse<CurrencyInfo[]>> {
    return this.get('api/v3/currencies');
  }

  getSymbol(params: {
    symbol: string;
  }): Promise<APISuccessResponse<SymbolInfo>> {
    return this.get(`api/v2/symbols/${params.symbol}`);
  }

  getSymbols(params?: {
    market?: string;
  }): Promise<APISuccessResponse<SymbolInfo[]>> {
    return this.get('api/v2/symbols', params);
  }

  getTicker(params: { symbol: string }): Promise<APISuccessResponse<Ticker>> {
    return this.get(`api/v1/market/orderbook/level1`, params);
  }

  getTickers(): Promise<
    APISuccessResponse<{
      time: number;
      ticker: Ticker[];
    }>
  > {
    return this.get('api/v1/market/allTickers');
  }

  getTradeHistories(params: {
    symbol: string;
  }): Promise<APISuccessResponse<TradeHistory[]>> {
    return this.get('api/v1/market/histories', params);
  }

  getKlines(
    params: GetSpotKlinesRequest,
  ): Promise<APISuccessResponse<Kline[]>> {
    return this.get('api/v1/market/candles', params);
  }

  getOrderBookLevel20(params: {
    symbol: string;
  }): Promise<APISuccessResponse<OrderBookLevel>> {
    return this.get(`api/v1/market/orderbook/level2_20`, params);
  }

  getOrderBookLevel100(params: {
    symbol: string;
  }): Promise<APISuccessResponse<OrderBookLevel>> {
    return this.get(`api/v1/market/orderbook/level2_100`, params);
  }

  getFullOrderBook(params: {
    symbol: string;
  }): Promise<APISuccessResponse<OrderBookLevel>> {
    return this.getPrivate('api/v3/market/orderbook/level2', params);
  }

  getFiatPrice(params?: { base?: string; currencies?: string }): Promise<any> {
    return this.get('api/v1/prices', params);
  }

  get24hrStats(params: {
    symbol: string;
  }): Promise<APISuccessResponse<Symbol24hrStats>> {
    return this.get('api/v1/market/stats', params);
  }

  getMarkets(): Promise<APISuccessResponse<string[]>> {
    return this.get('api/v1/markets');
  }

  /**
   *
   * REST - SPOT TRADING - Orders
   *
   */

  submitHFOrder(params: SubmitHFOrderRequest): Promise<
    APISuccessResponse<{
      orderId: string;
      clientOid: string;
    }>
  > {
    return this.postPrivate('api/v1/hf/orders', params);
  }

  submitHFOrderSync(
    params: SubmitHFOrderRequest,
  ): Promise<APISuccessResponse<SubmitHFOrderSyncResponse>> {
    return this.postPrivate('api/v1/hf/orders/sync', params);
  }

  submitHFOrderTest(): Promise<any> {
    return this.postPrivate('api/v1/hf/orders/test');
  }

  submitHFMultipleOrders(params: {
    orderList: SubmitMultipleHFOrdersRequest[];
  }): Promise<APISuccessResponse<SubmitMultipleHFOrdersResponse[]>> {
    return this.postPrivate('api/v1/hf/orders/multi', params);
  }

  submitHFMultipleOrdersSync(params: {
    orderList: SubmitMultipleHFOrdersRequest[];
  }): Promise<APISuccessResponse<SubmitMultipleHFOrdersSyncResponse[]>> {
    return this.postPrivate('api/v1/hf/orders/multi/sync', params);
  }

  cancelHFOrder(params: { orderId: string; symbol: string }): Promise<
    APISuccessResponse<{
      orderId: string;
    }>
  > {
    return this.deletePrivate(`api/v1/hf/orders/${params.orderId}`, params);
  }

  cancelHFOrderSync(params: {
    orderId: string;
    symbol: string;
  }): Promise<APISuccessResponse<SyncCancelHFOrderResponse>> {
    return this.deletePrivate(
      `api/v1/hf/orders/sync/${params.orderId}`,
      params,
    );
  }

  cancelHFOrderByClientOId(params: {
    clientOid: string;
    symbol: string;
  }): Promise<
    APISuccessResponse<{
      clientOid: string;
    }>
  > {
    return this.deletePrivate(
      `api/v1/hf/orders/client-order/${params.clientOid}`,
      params,
    );
  }

  cancelHFOrderSyncByClientOId(params: {
    clientOid: string;
    symbol: string;
  }): Promise<APISuccessResponse<SyncCancelHFOrderResponse>> {
    return this.deletePrivate(
      `api/v1/hf/orders/sync/client-order/${params.clientOid}`,
      params,
    );
  }

  cancelHFOrdersNumber(
    params: CancelSpecifiedNumberHFOrdersRequest,
  ): Promise<any> {
    return this.deletePrivate(
      `api/v1/hf/orders/cancel/${params.orderId}`,
      params,
    );
  }

  cancelHFAllOrdersBySymbol(params: { symbol: string }): Promise<
    APISuccessResponse<{
      orderId: string;
      cancelSize: string;
    }>
  > {
    return this.deletePrivate(`api/v1/hf/orders`, params);
  }

  cancelHFAllOrders(): Promise<APISuccessResponse<CancelAllHFOrdersResponse>> {
    return this.deletePrivate(`api/v1/hf/orders/cancelAll`);
  }

  updateHFOrder(params: ModifyHFOrderRequest): Promise<
    APISuccessResponse<{
      newOrderId: string;
      clientOid: string;
    }>
  > {
    return this.postPrivate('api/v1/hf/orders/alter', params);
  }

  getHFOrderDetailsByOrderId(params: {
    orderId: string;
    symbol: string;
  }): Promise<APISuccessResponse<HFOrder>> {
    return this.getPrivate(`api/v1/hf/orders/${params.orderId}`, params);
  }

  getHFOrderDetailsByClientOid(params: {
    clientOid: string;
    symbol: string;
  }): Promise<APISuccessResponse<HFOrder>> {
    return this.getPrivate(
      `api/v1/hf/orders/client-order/${params.clientOid}`,
      params,
    );
  }

  getHFActiveSymbols(): Promise<
    APISuccessResponse<{
      symbols: string[];
    }>
  > {
    return this.getPrivate(`api/v1/hf/orders/active/symbols`);
  }

  getHFActiveOrders(params: {
    symbol: string;
  }): Promise<APISuccessResponse<HFOrder[]>> {
    return this.getPrivate(`api/v1/hf/orders/active`, params);
  }

  getHFCompletedOrders(params: GetHFCompletedOrdersRequest): Promise<
    APISuccessResponse<{
      lastId: number;
      items: HFOrder[];
    }>
  > {
    return this.getPrivate(`api/v1/hf/orders/done`, params);
  }

  getHFFilledOrders(params: GetHFFilledListRequest): Promise<
    APISuccessResponse<{
      items: HFFilledOrder[];
      lastId: number;
    }>
  > {
    return this.getPrivate('api/v1/hf/fills', params);
  }

  cancelHFOrderAutoSettingQuery(): Promise<
    APISuccessResponse<AutoCancelHFOrderSettingQueryResponse>
  > {
    return this.getPrivate('api/v1/hf/orders/dead-cancel-all/query');
  }

  cancelHFOrderAutoSetting(params: {
    timeout: number;
    symbols?: string;
  }): Promise<
    APISuccessResponse<{
      currentTime: number;
      triggerTime: number;
    }>
  > {
    return this.postPrivate('api/v1/hf/orders/dead-cancel-all', params);
  }

  submitStopOrder(
    params: SubmitStopOrderRequest,
  ): Promise<APISuccessResponse<{ orderId: string }>> {
    return this.postPrivate('api/v1/stop-order', params);
  }

  cancelStopOrderByClientOid(params: {
    clientOid: string;
    symbol?: string;
  }): Promise<
    APISuccessResponse<{
      cancelledOrderId: string;
      clientOid: string;
    }>
  > {
    return this.deletePrivate(
      `api/v1/stop-order/cancelOrderByClientOid`,
      params,
    );
  }

  cancelStopOrderById(params: { orderId: string }): Promise<
    APISuccessResponse<{
      cancelledOrderIds: string[]; // Unique ID of the cancelled order
    }>
  > {
    return this.deletePrivate(`api/v1/stop-order/${params.orderId}`);
  }

  cancelStopOrders(params?: CancelStopOrdersRequest): Promise<
    APISuccessResponse<{
      cancelledOrderIds: string[]; // Unique IDs of the cancelled orders
    }>
  > {
    return this.deletePrivate(`api/v1/stop-order/cancel`, params);
  }

  getStopOrders(
    params?: GetStopOrdersListRequest,
  ): Promise<APISuccessResponse<StopOrders>> {
    return this.getPrivate('api/v1/stop-order', params);
  }

  getStopOrderByOrderId(params: {
    orderId: string;
  }): Promise<APISuccessResponse<StopOrderItem>> {
    return this.getPrivate(`api/v1/stop-order/${params.orderId}`);
  }

  getStopOrderByClientOid(params: {
    clientOid: string;
    symbol?: string;
  }): Promise<APISuccessResponse<StopOrderItem[]>> {
    return this.getPrivate('api/v1/stop-order/queryOrderByClientOid', params);
  }

  submitOCOOrder(params: SubmitOCOOrderRequest): Promise<
    APISuccessResponse<{
      orderId: string; // An order Id is returned once an order is successfully submitd.
    }>
  > {
    return this.postPrivate('api/v3/oco/order', params);
  }

  cancelOCOOrderById(params: { orderId: string }): Promise<
    APISuccessResponse<{
      cancelledOrderIds: string[];
    }>
  > {
    return this.deletePrivate(`api/v3/oco/order/${params.orderId}`);
  }

  cancelOCOOrderByClientOid(params: { clientOid: string }): Promise<
    APISuccessResponse<{
      cancelledOrderIds: string[];
    }>
  > {
    return this.deletePrivate(`api/v3/oco/client-order/${params.clientOid}`);
  }

  cancelMultipleOCOOrders(params?: {
    orderIds?: string;
    symbol?: string;
  }): Promise<
    APISuccessResponse<{
      cancelledOrderIds: string[];
    }>
  > {
    return this.deletePrivate('api/v3/oco/orders', params);
  }

  getOCOOrderByOrderId(params: {
    orderId: string;
  }): Promise<APISuccessResponse<OCOOrderListItem>> {
    return this.getPrivate(`api/v3/oco/order/${params.orderId}`);
  }

  getOCOOrderByClientOid(params: {
    clientOid: string;
  }): Promise<APISuccessResponse<OCOOrderListItem>> {
    return this.getPrivate(`api/v3/oco/client-order/${params.clientOid}`);
  }

  getOCOOrderDetails(params: {
    orderId: string;
  }): Promise<APISuccessResponse<OCOOrderDetails>> {
    return this.getPrivate(`api/v3/oco/order/details/${params.orderId}`);
  }

  getOCOOrders(
    params: GetOCOOrdersRequest,
  ): Promise<APISuccessResponse<OCOOrders>> {
    return this.getPrivate('api/v3/oco/orders', params);
  }

  /**
   *
   * REST - MARGIN TRADING - Market Data
   *
   */

  getMarginActivePairsV3(params?: {
    symbol?: string;
  }): Promise<APISuccessResponse<{ timestamp: number; items: any[] }>> {
    return this.getPrivate('api/v3/margin/symbols', params);
  }

  getMarginConfigInfo(): Promise<APISuccessResponse<MarginConfigInfo>> {
    return this.get('api/v1/margin/config');
  }

  getMarginLeveragedToken(params?: {
    currency?: string;
  }): Promise<APISuccessResponse<MarginLevTokenInfo[]>> {
    return this.getPrivate('api/v3/etf/info', params);
  }

  getMarginMarkPrices(): Promise<APISuccessResponse<MarginMarkPrice[]>> {
    return this.get('api/v3/mark-price/all-symbols');
  }

  getMarginMarkPrice(params: {
    symbol: string;
  }): Promise<APISuccessResponse<MarginMarkPrice>> {
    return this.get(`api/v1/mark-price/${params.symbol}/current`);
  }

  getIsolatedMarginSymbolsConfig(): Promise<
    APISuccessResponse<IsolatedMarginSymbolsConfig[]>
  > {
    return this.getPrivate('api/v1/isolated/symbols');
  }

  /**
   *
   * REST - MARGIN TRADING - Orders
   *
   */

  submitHFMarginOrder(params: SubmitHFMarginOrderRequest): Promise<
    APISuccessResponse<{
      orderNo: string; // An order Id is returned once an order is successfully submitd.
    }>
  > {
    return this.postPrivate('api/v3/hf/margin/order', params);
  }

  submitHFMarginOrderTest(): Promise<any> {
    return this.postPrivate('api/v3/hf/margin/order/test');
  }

  cancelHFMarginOrder(params: { orderId: string; symbol: string }): Promise<
    APISuccessResponse<{
      orderId: string;
    }>
  > {
    return this.deletePrivate(
      `api/v3/hf/margin/orders/${params.orderId}`,
      params,
    );
  }

  cancelHFMarginOrderByClientOid(params: {
    clientOid: string;
    symbol: string;
  }): Promise<
    APISuccessResponse<{
      clientOid: string;
    }>
  > {
    return this.deletePrivate(
      `api/v3/hf/margin/orders/client-order/${params.clientOid}`,
      params,
    );
  }

  cancelHFAllMarginOrders(params: HFMarginOrder): Promise<any> {
    return this.deletePrivate(`api/v3/hf/margin/orders`, params);
  }

  getHFMarginOpenSymbols(params: {
    tradeType: string;
  }): Promise<APISuccessResponse<{ symbolSize: number; symbols: string[] }>> {
    return this.getPrivate('api/v3/hf/margin/order/active/symbols', params);
  }

  getHFActiveMarginOrders(
    params: HFMarginRequestOrder,
  ): Promise<APISuccessResponse<HFMarginOrder[]>> {
    return this.getPrivate(`api/v3/hf/margin/orders/active`, params);
  }

  getHFMarginFilledOrders(params: GetHFMarginFilledRequest): Promise<
    APISuccessResponse<{
      lastId: number;
      items: HFMarginFilledOrder[];
    }>
  > {
    return this.getPrivate('api/v3/hf/margin/orders/done', params);
  }

  getHFMarginFills(params: getHFMarginFillsRequest): Promise<
    APISuccessResponse<{
      lastId: number;
      items: HFMarginTransactionRecord[];
    }>
  > {
    return this.getPrivate('api/v3/hf/margin/fills', params);
  }

  getHFMarginOrderByOrderId(params: {
    orderId: string;
    symbol: string;
  }): Promise<APISuccessResponse<HFMarginOrder>> {
    return this.getPrivate(`api/v3/hf/margin/orders/${params.orderId}`, params);
  }

  getHFMarginOrderByClientOid(params: {
    clientOid: string;
    symbol: string;
  }): Promise<APISuccessResponse<HFMarginOrder>> {
    return this.getPrivate(
      `api/v3/hf/margin/orders/client-order/${params.clientOid}?symbol=${params.symbol}`,
    );
  }

  /**
   *
   * REST - MARGIN TRADING - Debit
   *
   */

  marginBorrowV3(
    params: MarginBorrowV3Request,
  ): Promise<APISuccessResponse<MarginOrderV3>> {
    return this.postPrivate('api/v3/margin/borrow', params);
  }

  getMarginBorrowHistoryV3(
    params: MarginHistoryV3Request,
  ): Promise<APISuccessResponse<MarginHistoryRecord[]>> {
    return this.getPrivate('api/v3/margin/borrow', params);
  }

  marginRepayV3(
    params: MarginRepayV3Request,
  ): Promise<APISuccessResponse<MarginOrderV3>> {
    return this.postPrivate('api/v3/margin/repay', params);
  }

  getMarginRepayHistoryV3(
    params: MarginHistoryV3Request,
  ): Promise<APISuccessResponse<MarginHistoryRecord[]>> {
    return this.getPrivate('api/v3/margin/repay', params);
  }

  getMarginInterestRecordsV3(
    params?: MarginInterestRecordsRequest,
  ): Promise<APISuccessResponse<MarginInterestRecords>> {
    return this.getPrivate('api/v3/margin/interest', params);
  }

  updateMarginLeverageV3(params: {
    symbol?: string;
    leverage: string;
    isIsolated?: boolean;
  }): Promise<APISuccessResponse<any>> {
    return this.postPrivate('api/v3/position/update-user-leverage', params);
  }

  /**
   *
   * REST - MARGIN TRADING - Credit
   *
   */

  getLendingCurrencyV3(params?: {
    currency?: string;
  }): Promise<APISuccessResponse<LendingCurrencyV3>> {
    return this.get('api/v3/project/list', params);
  }

  getLendingInterestRateV3(params: { currency: string }): Promise<
    APISuccessResponse<
      {
        time: string; // Time: YYYYMMDDHH00
        marketInterestRate: string; // Market interest rate
      }[]
    >
  > {
    return this.get('api/v3/project/marketInterestRate', params);
  }

  submitLendingSubscriptionV3(
    params: InitiateLendingSubscriptionV3Request,
  ): Promise<
    APISuccessResponse<
      {
        orderNo: string;
      }[]
    >
  > {
    return this.postPrivate('api/v3/purchase', params);
  }

  updateLendingSubscriptionOrdersV3(
    params: ModifyLendingSubscriptionOrdersV3Request,
  ): Promise<any> {
    return this.postPrivate('api/v3/lend/purchase/update', params);
  }

  getLendingSubscriptionOrdersV3(
    params: GetLendingSubscriptionOrdersV3Request,
  ): Promise<APISuccessResponse<LendingRedemption>> {
    return this.getPrivate('api/v3/purchase/orders', params);
  }

  submitLendingRedemptionV3(
    params: InitiateLendingRedemptionV3Request,
  ): Promise<
    APISuccessResponse<
      {
        orderNo: string;
      }[]
    >
  > {
    return this.postPrivate('api/v3/redeem', params);
  }

  getLendingRedemptionOrdersV3(
    params: GetLendingRedemptionOrdersV3Request,
  ): Promise<APISuccessResponse<LendingRedemption>> {
    return this.getPrivate('api/v3/redeem/orders', params);
  }

  /**
   *
   * REST - MARGIN TRADING - Risk Limit
   *
   */

  getMarginRiskLimitConfig(
    params: MarginRiskLimitRequest,
  ): Promise<APISuccessResponse<MarginRiskLimit[]>> {
    return this.getPrivate('api/v3/margin/currencies', params);
  }

  /**
   *
   * REST - COPY TRADING
   *
   */

  /**
   *
   * REST - EARN
   *
   */

  /**
  /**
   * Subscribe to Earn Fixed Income Products
   *
   * This endpoint allows subscribing to fixed income products.
   * If the subscription fails, it returns the corresponding error code.
   */
  subscribeEarnFixedIncome(
    params: SubscribeEarnFixedIncomeRequest,
  ): Promise<APISuccessResponse<SubscribeEarnFixedIncomeResponse>> {
    return this.postPrivate('api/v1/earn/orders', params);
  }

  /**
   * Get Earn Redeem Preview by Holding ID
   *
   * This endpoint retrieves redemption preview information by holding ID. If the current holding is fully redeemed or in the process of being redeemed, it indicates that the holding does not exist.
   */
  getEarnRedeemPreview(
    params: GetEarnRedeemPreviewRequest,
  ): Promise<APISuccessResponse<GetEarnRedeemPreviewResponse>> {
    return this.getPrivate('api/v1/earn/redeem-preview', params);
  }

  /**
   * Initiate redemption by holding ID
   *
   * This endpoint allows initiating redemption by holding ID. If the current holding is fully redeemed or in the process of being redeemed, it indicates that the holding does not exist.
   */
  submitRedemption(
    params: InitiateRedemptionRequest,
  ): Promise<APISuccessResponse<InitiateRedemptionResponse>> {
    return this.deletePrivate('api/v1/earn/orders', params);
  }

  /**
   * Get Earn Savings Products
   *
   * This endpoint retrieves savings products. If no savings products are available, an empty list is returned.
   */
  getEarnSavingsProducts(params?: {
    currency?: string;
  }): Promise<APISuccessResponse<EarnProduct[]>> {
    return this.getPrivate('api/v1/earn/saving/products', params);
  }

  /**
   * Get Earn Limited-Time Promotion Products
   *
   * This endpoint retrieves limited-time promotion products. If no products are available, an empty list is returned.
   */
  getEarnPromotionProducts(params?: {
    currency?: string;
  }): Promise<APISuccessResponse<EarnProduct[]>> {
    return this.getPrivate('api/v1/earn/promotion/products', params);
  }

  /**
   * Get Earn Fixed Income Current Holdings
   *
   * This endpoint retrieves current holding assets of fixed income products. If no current holding assets are available, an empty list is returned.
   */
  getEarnFixedIncomeHoldAssets(
    params?: GetEarnFixedIncomeHoldAssetsRequest,
  ): Promise<APISuccessResponse<EarnFixedIncomeHoldAssets>> {
    return this.getPrivate('api/v1/earn/hold-assets', params);
  }

  /**
   * Get Earn Staking Products
   *
   * This endpoint retrieves staking products. If no staking products are available, an empty list is returned.
   */
  getEarnStakingProducts(params?: {
    currency?: string;
  }): Promise<APISuccessResponse<EarnProduct[]>> {
    return this.getPrivate('api/v1/earn/staking/products', params);
  }

  /**
   * Get Earn KCS Staking Products
   *
   * This endpoint retrieves KCS Staking products. If no KCS Staking products are available, an empty list is returned.
   *
   */
  getEarnKcsStakingProducts(params?: {
    currency?: string;
  }): Promise<APISuccessResponse<EarnProduct[]>> {
    return this.getPrivate('api/v1/earn/kcs-staking/products', params);
  }

  /**
   * Get Earn ETH Staking Products
   *
   * This endpoint retrieves ETH Staking products. If no ETH Staking products are available, an empty list is returned.
   *
   */
  getEarnEthStakingProducts(): Promise<APISuccessResponse<EarnProduct[]>> {
    return this.getPrivate('api/v1/earn/eth-staking/products');
  }

  /**
   *
   * REST - VIP LENDING
   *
   */

  /**
   * Get information on off-exchange funding and loans
   *
   * This endpoint is only for querying accounts that are currently involved in loans.
   *
   */
  getOtcLoan(): Promise<APISuccessResponse<OtcLoan>> {
    return this.getPrivate('api/v1/otc-loan/loan');
  }

  /**
   * Get information on accounts involved in off-exchange loans
   *
   * This endpoint is only for querying accounts that are currently involved in off-exchange funding and loans.
   */
  getOtcLoanAccounts(): Promise<APISuccessResponse<OtcLoanAccount[]>> {
    return this.getPrivate('api/v1/otc-loan/accounts');
  }

  /**
   *
   * REST - AFFILIATE
   *
   */

  /**
   * Get Affiliate User Rebate Information
   *
   * This endpoint allows getting affiliate user rebate information.
   */
  getAffiliateUserRebateInfo(params: {
    date: string;
    maxCount?: number;
    offset: string;
  }): Promise<APISuccessResponse<any>> {
    return this.getPrivate('api/v2/affiliate/inviter/statistics', params);
  }

  /**
   *
   * REST - BROKER
   *
   */

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

  /**
   *
   * DEPRECATED
   *
   */

  /**
   *
   * REST - ACCOUNT - Sub-Account
   *
   */

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the GET /api/v2/sub/user endpoint instead of this endpoint
   */
  getSubAccountsV1(): Promise<APISuccessResponse<SubAccountInfo[]>> {
    return this.getPrivate('api/v1/sub/user');
  }

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the GET /api/v2/sub/accounts/balance endpoint instead of this endpoint
   */
  getSubAccountBalancesV1(): Promise<APISuccessResponse<SubAccountBalance>> {
    return this.getPrivate('api/v1/sub-accounts');
  }

  /**
   *
   * REST - FUNDING - Funding overview
   *
   */

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the GET /api/v3/margin/accounts endpoint instead of this endpoint
   */
  getMarginBalances(): Promise<
    APISuccessResponse<{
      debtRatio: string;
      accounts: MarginAccountBalance[];
    }>
  > {
    return this.getPrivate('api/v1/margin/account');
  }

  /**
   *
   * REST - FUNDING -Deposit
   *
   */

  /**
   * @deprecated This method is deprecated. Please use createDepositAddressV3 instead.
   */
  createDepositAddress(params: {
    currency: string;
    chain?: string;
  }): Promise<APISuccessResponse<DepositAddress>> {
    return this.postPrivate('api/v1/deposit-addresses', params);
  }

  /**
   * @deprecated This method is deprecated. Please use getDepositAddressesV3 instead.
   */
  getDepositAddressesV2(params: {
    currency: string;
  }): Promise<APISuccessResponse<DepositAddressV2[]>> {
    return this.getPrivate('api/v2/deposit-addresses', params);
  }

  /**
   * @deprecated This method is deprecated. Please use getDepositAddressesV3 instead.
   */
  getDepositAddressV1(params: {
    currency: string;
    chain?: string;
  }): Promise<APISuccessResponse<DepositAddress>> {
    return this.getPrivate('api/v1/deposit-addresses', params);
  }

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the GET /api/v1/deposits endpoint instead of this endpoint
   */
  getHistoricalDepositsV1(
    params?: GetDepositsRequest,
  ): Promise<APISuccessResponse<V1HistoricalDeposits>> {
    return this.getPrivate('api/v1/hist-deposits', params);
  }

  /**
   *
   * REST - FUNDING -Withdrawals
   *
   */

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the GET /api/v1/withdrawals endpoint instead of this endpoint
   */
  getHistoricalWithdrawalsV1(
    params?: GetWithdrawalsRequest,
  ): Promise<APISuccessResponse<HistoricalWithdrawalsV1>> {
    return this.getPrivate('api/v1/hist-withdrawals', params);
  }

  /**
   * @deprecated This method is deprecated. Please use submitWithdrawV3 instead.
   */
  submitWithdraw(
    params: ApplyWithdrawRequest,
  ): Promise<APISuccessResponse<{ withdrawalId: string }>> {
    return this.postPrivate('api/v1/withdrawals', params);
  }

  /**
   *
   * REST - FUNDING - Transfer
   *
   */

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the GET /api/v3/accounts/universal-transfer endpoint instead of this endpoint
   */
  submitTransferMasterSub(params: submitTransferMasterSubRequest): Promise<
    APISuccessResponse<{
      orderId: string;
    }>
  > {
    return this.postPrivate('api/v2/accounts/sub-transfer', params);
  }

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the GET /api/v3/accounts/universal-transfer endpoint instead of this endpoint
   */
  submitInnerTransfer(params: InnerTransferRequest): Promise<
    APISuccessResponse<{
      orderId: string;
    }>
  > {
    return this.postPrivate('api/v2/accounts/inner-transfer', params);
  }

  /**
   *
   * REST - SPOT TRADING - Orders
   *
   */

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the POST /api/v1/hf/orders endpoint instead of this endpoint
   */
  submitOrder(params: SubmitOrderRequest): Promise<
    APISuccessResponse<{
      orderId: string; // An order Id is returned once an order is successfully submitd.
    }>
  > {
    return this.postPrivate('api/v1/orders', params);
  }

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the POST /api/v1/hf/orders/test endpoint instead of this endpoint
   */
  submitOrderTest(): Promise<any> {
    return this.postPrivate('api/v1/orders/test');
  }

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the POST /api/v1/hf/orders/multi endpoint instead of this endpoint
   */
  submitMultipleOrders(params: {
    symbol: string;
    orderList: SubmitMultipleOrdersRequest[];
  }): Promise<APISuccessResponse<MultipleOrdersResponse[]>> {
    return this.postPrivate('api/v1/orders/multi', params);
  }

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the DELETE /api/v1/hf/orders/{orderId} endpoint instead of this endpoint
   */
  cancelOrderById(params: { orderId: string }): Promise<
    APISuccessResponse<{
      cancelledOrderIds: string[];
    }>
  > {
    return this.deletePrivate(`api/v1/orders/${params.orderId}`);
  }

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the DELETE /api/v1/hf/orders/client-order/{params.clientOid} endpoint instead of this endpoint
   */
  cancelOrderByClientOid(params: { clientOid: string }): Promise<
    APISuccessResponse<{
      cancelledOrderId: string;
      clientOid: string;
    }>
  > {
    return this.deletePrivate(`api/v1/order/client-order/${params.clientOid}`);
  }

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the DELETE /api/v1/hf/orders/cancelAll endpoint instead of this endpoint
   */
  cancelAllOrders(params?: CancelAllOrdersRequest): Promise<
    APISuccessResponse<{
      cancelledOrderIds: string[];
    }>
  > {
    return this.deletePrivate('api/v1/orders', params);
  }

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the GET /api/v1/hf/orders/active endpoint instead of this endpoint
   */
  getOrders(
    params?: GetOrderListRequest,
  ): Promise<APISuccessResponse<SpotOrderList>> {
    return this.getPrivate('api/v1/orders', params);
  }

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the GET /api/v1/hf/orders/active endpoint instead of this endpoint
   */
  getRecentOrders(params?: {
    currentPage?: number;
    pageSize?: number;
  }): Promise<APISuccessResponse<SpotOrder[]>> {
    return this.getPrivate('api/v1/limit/orders', params);
  }

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the GET /api/v1/hf/orders/{params.orderId} endpoint instead of this endpoint
   */
  getOrderByOrderId(params: {
    orderId: string;
  }): Promise<APISuccessResponse<SpotOrder>> {
    return this.getPrivate(`api/v1/orders/${params.orderId}`);
  }

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the GET /api/v1/hf/orders/client-order/{params.clientOid} endpoint instead of this endpoint
   */
  getOrderByClientOid(params: {
    clientOid: string;
  }): Promise<APISuccessResponse<SpotOrder>> {
    return this.getPrivate(`api/v1/order/client-order/${params.clientOid}`);
  }

  /**
   *
   * REST - SPOT TRADING -Fills
   *
   */

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the GET /api/v1/hf/fills endpoint instead of this endpoint
   */
  getFills(
    params?: GetFillsRequest,
  ): Promise<APISuccessResponse<SpotOrderFills>> {
    return this.getPrivate('api/v1/fills', params);
  }

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the GET /api/v1/hf/fills endpoint instead of this endpoint
   */
  getRecentFills(): Promise<APISuccessResponse<SpotOrderFill[]>> {
    return this.getPrivate('api/v1/limit/fills');
  }

  /**
   *
   * REST - MARGIN TRADING - Orders
   *
   */

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the POST /api/v3/hf/margin/order endpoint instead of this endpoint
   */
  submitMarginOrder(
    params: SubmitMarginOrderRequest,
  ): Promise<APISuccessResponse<SubmitMarginOrderResponse>> {
    return this.postPrivate('api/v1/margin/order', params);
  }

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the POST /api/v3/hf/margin/order/test endpoint instead of this endpoint
   */
  submitMarginOrderTest(): Promise<any> {
    return this.postPrivate('api/v1/margin/order/test');
  }

  /**
   *
   * REST - MARGIN TRADING - Isolated Margin
   *
   */

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the GET /api/v3/margin/accounts endpoint instead of this endpoint
   */
  getIsolatedMarginAccounts(params?: {
    balanceCurrency?: 'USDT' | 'KCS' | 'BTC';
  }): Promise<APISuccessResponse<IsolatedMarginAccountInfo>> {
    return this.getPrivate('api/v1/isolated/accounts', params);
  }

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the GET /api/v3/isolated/accounts endpoint instead of this endpoint
   */
  getIsolatedMarginAccount(params: {
    symbol: string;
  }): Promise<APISuccessResponse<SingleIsolatedMarginAccountInfo>> {
    return this.getPrivate(`api/v1/isolated/account/${params.symbol}`);
  }
}
