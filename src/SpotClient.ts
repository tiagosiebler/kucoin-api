import { AxiosRequestConfig } from 'axios';
import { nanoid } from 'nanoid';
import {
  AccountHFMarginTransactionsRequest,
  AccountHFTransactionsRequest,
  AccountTransactionsRequest,
  ApplyWithdrawRequest,
  CancelAllOrdersRequest,
  CancelSpecifiedNumberHFOrdersRequest,
  CancelStopOrdersRequest,
  CreateSubAccountAPIRequest,
  CreateSubAccountRequest,
  DeleteSubAccountAPIRequest,
  FlexTransferRequest,
  GetBalancesRequest,
  GetDepositListRequest,
  GetFilledListRequest,
  GetHFCompletedOrdersRequest,
  GetHFFilledListRequest,
  GetHFMarginFilledListRequest,
  GetHFMarginTransactionRecordsRequest,
  GetIsolatedMarginAccountBalanceDetailRequest,
  GetKlinesRequest,
  GetLendingRedemptionOrdersV3Request,
  GetLendingSubscriptionOrdersV3Request,
  GetMarginAccountBalanceDetailRequest,
  GetOCOOrdersListRequest,
  GetOrderListRequest,
  GetStopOrdersListRequest,
  GetTransferableRequest,
  GetV1HistoricalDepositsListRequest,
  GetV1HistoricalWithdrawalsListRequest,
  GetWithdrawalsListRequest,
  HFMarginOrder,
  InitiateLendingRedemptionV3Request,
  InitiateLendingSubscriptionV3Request,
  InnerTransferRequest,
  MarginBorrowV3Request,
  MarginHistoryV3Request,
  MarginRepayV3Request,
  MarginRiskLimitRequest,
  ModifyHFOrderRequest,
  ModifyLendingSubscriptionOrdersV3Request,
  PlaceHFMarginOrderRequest,
  PlaceHFOrderRequest,
  PlaceMarginOrderRequest,
  PlaceMultipleHFOrdersRequest,
  PlaceMultipleOrdersRequest,
  PlaceOCOOrderRequest,
  PlaceOrderRequest,
  PlaceStopOrderRequest,
  TransferBetweenMasterAndSubAccountRequest,
  UpdateSubAccountAPIRequest,
} from 'types/request/spot.types.js';
import {
  AccountHFMarginTransactionsResponse,
  AccountHFTransactionsResponse,
  AccountResponse,
  AccountSummaryResponse,
  AccountTransactionsResponse,
  AllTickersInfo,
  AutoCancelHFOrderSettingQueryResponse,
  BalancesResponse,
  CancelAllHFOrdersResponse,
  CreateSubAccountAPIResponse,
  CreateSubAccountResponse,
  CurrencyInfo,
  DepositAddress,
  DepositAddressV2,
  FillItemResponse,
  GetDepositListResponse,
  GetFilledListResponse,
  GetHFFilledListResponse,
  GetLendingMarketCurrencyInfoV3Response,
  GetMarginAccountBalanceDetailResponse,
  GetMarginAccountBalancesResponse,
  GetSubAccountBalanceResponse,
  GetSubAccountBalancesV2Response,
  GetSubAccountsV2Response,
  GetV1HistoricalDepositsListResponse,
  GetV1HistoricalWithdrawalsListResponse,
  GetWithdrawalQuotasResponse,
  GetWithdrawalsListResponse,
  HFMarginFilledListResponse,
  HFMarginOrderItemResponse,
  HFMarginTransactionListResponse,
  HFOrder,
  IsolatedMarginAccountDetailResponse,
  IsolatedMarginAccountInfoResponse,
  IsolatedMarginSymbolsConfigResponse,
  Kline,
  LendingRedemptionResponse,
  MarginConfigInfoResponse,
  MarginHistoryRecord,
  MarginLevTokenInfoResponse,
  MarginMarkPriceResponse,
  MarginOrderResponse,
  MarginRiskLimitResponse,
  MarketInterestRateItem,
  OCOOrderDetailsResponse,
  OCOOrderListItemResponse,
  OCOOrdersListResponse,
  OrderBookLevel,
  OrderListItem,
  OrderListResponse,
  PlaceHFOrderSyncResponse,
  PlaceMarginOrderResponse,
  PlaceMultipleHFOrdersResponse,
  PlaceMultipleHFOrdersSyncResponse,
  PlaceMultipleOrdersResponse,
  SingleIsolatedMarginAccountInfoResponse,
  StopOrderItemResponse,
  StopOrdersListResponse,
  SubAccountAPIInfo,
  SubAccountInfo,
  SymbolInfo,
  SyncCancelHFOrderResponse,
  TickerInfo,
  TradeHistory,
  TransferableResponse,
  UpdateSubAccountAPIResponse,
} from 'types/response/spot.types.js';

import { BaseRestClient } from './lib/BaseRestClient.js';
import {
  REST_CLIENT_TYPE_ENUM,
  RestClientOptions,
  RestClientType,
} from './lib/requestUtils.js';
import { APISuccessResponse } from './types/response/shared.types.js';

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

  getServerTime(): Promise<any> {
    return this.get('api/v1/timestamp');
  }

  getServiceStatus(): Promise<any> {
    return this.get('api/v1/status');
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

  getAccountSummary(): Promise<APISuccessResponse<AccountSummaryResponse>> {
    return this.getPrivate('api/v2/user-info');
  }

  /**
   * Get a list of acounts and their balance states (spot/margin/trade_hf)
   *
   * Get Account List - Spot/Margin/trade_hf
   */
  getBalances(
    params?: GetBalancesRequest,
  ): Promise<Promise<APISuccessResponse<BalancesResponse[]>>> {
    return this.getPrivate('api/v1/accounts', params);
  }

  getAccount(params: {
    accountId: any;
  }): Promise<APISuccessResponse<AccountResponse>> {
    return this.getPrivate(`api/v1/accounts/${params.accountId}`);
  }

  /**
   * Get Account Ledgers - Spot/Margin
   */
  getAccountTransactions(
    params: AccountTransactionsRequest,
  ): Promise<APISuccessResponse<AccountTransactionsResponse>> {
    return this.getPrivate('api/v1/accounts/ledgers', params);
  }

  /**
   * Get Account Ledgers - trade_hf
   */
  getAccountHFTransactions(
    params: AccountHFTransactionsRequest,
  ): Promise<APISuccessResponse<AccountHFTransactionsResponse[]>> {
    return this.getPrivate('api/v1/hf/accounts/ledgers', params);
  }

  /**
   * Get Account Ledgers - margin_hf
   */
  getAccountHFMarginTransactions(
    params: AccountHFMarginTransactionsRequest,
  ): Promise<APISuccessResponse<AccountHFMarginTransactionsResponse[]>> {
    return this.getPrivate('api/v3/hf/margin/account/ledgers', params);
  }

  /**
   *
   * Sub-Account
   *
   */

  getSubAccountsV1(): Promise<APISuccessResponse<SubAccountInfo[]>> {
    return this.getPrivate('api/v1/sub/user');
  }

  getSubAccountsV2(params: {
    currentPage?: number;
    pageSize?: number;
  }): Promise<APISuccessResponse<GetSubAccountsV2Response>> {
    return this.getPrivate('api/v2/sub/user', params);
  }

  createSubAccount(
    params: CreateSubAccountRequest,
  ): Promise<APISuccessResponse<CreateSubAccountResponse>> {
    return this.postPrivate('api/v2/sub/user/created', params);
  }

  getSubAccountBalance(params: {
    subUserId: string;
    includeBaseAmount: boolean;
  }): Promise<APISuccessResponse<GetSubAccountBalanceResponse>> {
    return this.getPrivate(`api/v1/sub-accounts/${params.subUserId}`, params);
  }

  getSubAccountBalancesV1(): Promise<
    APISuccessResponse<GetSubAccountBalanceResponse>
  > {
    return this.getPrivate('api/v1/sub-accounts');
  }

  getSubAccountBalancesV2(params: {
    currentPage?: number;
    pageSize?: number;
  }): Promise<APISuccessResponse<GetSubAccountBalancesV2Response>> {
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
  }): Promise<APISuccessResponse<SubAccountAPIInfo[]>> {
    return this.getPrivate('api/v1/sub/api-key', params);
  }

  createSubAccountAPI(
    params: CreateSubAccountAPIRequest,
  ): Promise<APISuccessResponse<CreateSubAccountAPIResponse>> {
    return this.postPrivate('api/v1/sub/api-key', params);
  }

  updateSubAccountAPI(
    params: UpdateSubAccountAPIRequest,
  ): Promise<APISuccessResponse<UpdateSubAccountAPIResponse>> {
    return this.postPrivate('api/v1/sub/api-key/update', params);
  }

  deleteSubAccountAPI(params: DeleteSubAccountAPIRequest): Promise<
    APISuccessResponse<{
      subName: string; // Sub-account name
      apiKey: string; // API-Key
    }>
  > {
    return this.deletePrivate('api/v1/sub/api-key', params);
  }

  /**
   *
   ***********
   * Funding
   ***********
   *
   */

  getMarginAccountBalances(): Promise<
    APISuccessResponse<GetMarginAccountBalancesResponse>
  > {
    return this.getPrivate('api/v1/margin/account');
  }

  getMarginAccountBalanceDetail(
    params?: GetMarginAccountBalanceDetailRequest,
  ): Promise<APISuccessResponse<GetMarginAccountBalanceDetailResponse>> {
    return this.getPrivate('api/v3/margin/accounts', params);
  }

  getIsolatedMarginAccountBalanceDetail(
    params?: GetIsolatedMarginAccountBalanceDetailRequest,
  ): Promise<APISuccessResponse<IsolatedMarginAccountDetailResponse[]>> {
    return this.getPrivate('api/v3/isolated/accounts', params);
  }

  /**
   *
   * Deposit
   *
   */

  createDepositAddress(params: {
    currency: string;
    chain?: string;
  }): Promise<APISuccessResponse<DepositAddress>> {
    return this.postPrivate('api/v1/deposit-addresses', params);
  }

  getDepositAddressesV2(params: {
    currency: string;
  }): Promise<APISuccessResponse<DepositAddressV2[]>> {
    return this.getPrivate('api/v2/deposit-addresses', params);
  }

  getDepositAddress(params: {
    currency: string;
    chain?: string;
  }): Promise<APISuccessResponse<DepositAddress>> {
    return this.getPrivate('api/v1/deposit-addresses', params);
  }

  getDepositList(
    params?: GetDepositListRequest,
  ): Promise<APISuccessResponse<GetDepositListResponse>> {
    return this.getPrivate('api/v1/deposits', params);
  }

  getV1HistoricalDepositsList(
    params?: GetV1HistoricalDepositsListRequest,
  ): Promise<APISuccessResponse<GetV1HistoricalDepositsListResponse>> {
    return this.getPrivate('api/v1/hist-deposits', params);
  }

  /**
   *
   * Withdrawals
   *
   */

  getWithdrawalsList(
    params?: GetWithdrawalsListRequest,
  ): Promise<APISuccessResponse<GetWithdrawalsListResponse>> {
    return this.getPrivate('api/v1/withdrawals', params);
  }

  getV1HistoricalWithdrawalsList(
    params?: GetV1HistoricalWithdrawalsListRequest,
  ): Promise<APISuccessResponse<GetV1HistoricalWithdrawalsListResponse>> {
    return this.getPrivate('api/v1/hist-withdrawals', params);
  }

  getWithdrawalQuotas(params: {
    currency: string;
    chain?: string;
  }): Promise<APISuccessResponse<GetWithdrawalQuotasResponse>> {
    return this.getPrivate('api/v1/withdrawals/quotas', params);
  }

  applyWithdraw(
    params: ApplyWithdrawRequest,
  ): Promise<APISuccessResponse<{ withdrawalId: string }>> {
    return this.postPrivate('api/v1/withdrawals', params);
  }

  cancelWithdrawal(params: {
    withdrawalId: string;
  }): Promise<APISuccessResponse<{ withdrawalId: string }>> {
    return this.deletePrivate(`api/v1/withdrawals/${params.withdrawalId}`);
  }

  /**
   *
   * Transfer
   *
   */

  getTransferable(
    params: GetTransferableRequest,
  ): Promise<APISuccessResponse<TransferableResponse>> {
    return this.getPrivate('api/v1/accounts/transferable', params);
  }

  flexTransfer(params: FlexTransferRequest): Promise<
    APISuccessResponse<{
      orderId: string; // Transfer order ID
    }>
  > {
    return this.postPrivate('api/v3/accounts/universal-transfer', params);
  }

  transferBetweenMasterAndSubAccount(
    params: TransferBetweenMasterAndSubAccountRequest,
  ): Promise<
    APISuccessResponse<{
      orderId: string; // Transfer order ID
    }>
  > {
    return this.postPrivate('api/v2/accounts/sub-transfer', params);
  }

  innerTransfer(params: InnerTransferRequest): Promise<
    APISuccessResponse<{
      orderId: string; // Transfer order ID
    }>
  > {
    return this.postPrivate('api/v2/accounts/inner-transfer', params);
  }

  /**
   *
   * Trade Fee
   *
   */

  getBasicUserFee(params: { currencyType: string }): Promise<
    APISuccessResponse<{
      takerFeeRate: string; // Taker fee rate
      makerFeeRate: string; // Maker fee rate
    }>
  > {
    return this.getPrivate('api/v1/base-fee', params);
  }

  getTradingPairActualFee(params: { symbols: string }): Promise<
    APISuccessResponse<
      {
        symbol: string; // Trading pair
        takerFeeRate: string; // Taker fee rate
        makerFeeRate: string; // Maker fee rate
      }[]
    >
  > {
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

  getCurrencyList(): Promise<APISuccessResponse<CurrencyInfo[]>> {
    return this.get('api/v3/currencies');
  }

  getCurrencyDetail(params: {
    currency: string;
    chain?: string;
  }): Promise<APISuccessResponse<CurrencyInfo>> {
    return this.get(`api/v3/currencies/${params.currency}`, params);
  }

  getSymbolsList(params?: {
    market?: string;
  }): Promise<APISuccessResponse<SymbolInfo[]>> {
    return this.get('api/v2/symbols', params);
  }

  getTicker(params: {
    symbol: string;
  }): Promise<APISuccessResponse<TickerInfo>> {
    return this.get(`api/v1/market/orderbook/level1`, params);
  }

  getAllTickers(): Promise<APISuccessResponse<AllTickersInfo>> {
    return this.get('api/v1/market/allTickers');
  }

  get24hrStats(params: {
    symbol: string;
  }): Promise<APISuccessResponse<AllTickersInfo>> {
    return this.get('api/v1/market/stats', params);
  }

  getMarketList(): Promise<APISuccessResponse<string[]>> {
    return this.get('api/v1/markets');
  }

  getPartOrderBookLevel20(params: {
    symbol: string;
  }): Promise<APISuccessResponse<OrderBookLevel>> {
    return this.get(`api/v1/market/orderbook/level2_20`, params);
  }

  getPartOrderBookLevel100(params: {
    symbol: string;
  }): Promise<APISuccessResponse<OrderBookLevel>> {
    return this.get(`api/v1/market/orderbook/level2_100`, params);
  }

  getFullOrderBook(params: {
    symbol: string;
  }): Promise<APISuccessResponse<OrderBookLevel>> {
    return this.get('api/v3/market/orderbook/level2', params);
  }

  getTradeHistories(params: {
    symbol: string;
  }): Promise<APISuccessResponse<TradeHistory[]>> {
    return this.get('api/v1/market/histories', params);
  }

  getKlines(params: GetKlinesRequest): Promise<APISuccessResponse<Kline[]>> {
    return this.get('api/v1/market/candles', params);
  }

  getFiatPrice(params?: { base?: string; currencies?: string }): Promise<any> {
    return this.get('api/v1/prices', params);
  }

  /**
   *
   * Spot HF trade
   *
   */

  placeHFOrder(params: PlaceHFOrderRequest): Promise<
    APISuccessResponse<{
      orderId: string; // Transfer order ID
    }>
  > {
    return this.postPrivate('api/v1/hf/orders', params);
  }

  placeHFOrderTest(): Promise<any> {
    return this.postPrivate('api/v1/hf/orders/test');
  }

  placeHFOrderSync(
    params: PlaceHFOrderRequest,
  ): Promise<APISuccessResponse<PlaceHFOrderSyncResponse>> {
    return this.postPrivate('api/v1/hf/orders/sync', params);
  }

  placeMultipleHFOrders(
    params: PlaceMultipleHFOrdersRequest,
  ): Promise<APISuccessResponse<PlaceMultipleHFOrdersResponse[]>> {
    return this.postPrivate('api/v1/hf/orders/multi', params);
  }

  placeMultipleHFOrdersSync(
    params: PlaceMultipleHFOrdersRequest,
  ): Promise<APISuccessResponse<PlaceMultipleHFOrdersSyncResponse[]>> {
    return this.postPrivate('api/v1/hf/orders/multi/sync', params);
  }

  modifyHFOrder(params: ModifyHFOrderRequest): Promise<
    APISuccessResponse<{
      newOrderId: string; // New order ID
    }>
  > {
    return this.postPrivate('api/v1/hf/orders/alter', params);
  }

  cancelHFOrder(params: { orderId: string; symbol: string }): Promise<
    APISuccessResponse<{
      orderId: string; // New order ID
    }>
  > {
    return this.deletePrivate(`api/v1/hf/orders/${params.orderId}`, params);
  }

  syncCancelHFOrder(params: {
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
      clientOid: string; // New order ID
    }>
  > {
    return this.deletePrivate(
      `api/v1/hf/orders/client-order/${params.clientOid}`,
      params,
    );
  }

  syncCancelHFOrderByClientOId(params: {
    clientOid: string;
    symbol: string;
  }): Promise<APISuccessResponse<SyncCancelHFOrderResponse>> {
    return this.deletePrivate(
      `api/v1/hf/orders/sync/client-order/${params.clientOid}`,
      params,
    );
  }

  cancelSpecifiedNumberHFOrders(
    params: CancelSpecifiedNumberHFOrdersRequest,
  ): Promise<any> {
    return this.deletePrivate(
      `api/v1/hf/orders/cancel/${params.orderId}`,
      params,
    );
  }

  cancelAllHFOrdersBySymbol(params: { symbol: string }): Promise<
    APISuccessResponse<{
      orderId: string; // order Id
      cancelSize: string; // Size of the order to be canceled
    }>
  > {
    return this.deletePrivate(`api/v1/hf/orders`, params);
  }

  cancelAllHFOrders(): Promise<APISuccessResponse<CancelAllHFOrdersResponse>> {
    return this.deletePrivate(`api/v1/hf/orders/cancelAll`);
  }

  getActiveHFOrders(params: {
    symbol: string;
  }): Promise<APISuccessResponse<HFOrder[]>> {
    return this.getPrivate(`api/v1/hf/orders/active`, params);
  }

  getActiveHFSymbols(): Promise<
    APISuccessResponse<{
      symbols: string[];
    }>
  > {
    return this.getPrivate(`api/v1/hf/orders/active/symbols`);
  }

  getHFCompletedOrders(params: GetHFCompletedOrdersRequest): Promise<
    APISuccessResponse<{
      lastId: number;
      items: HFOrder[];
    }>
  > {
    return this.getPrivate(`api/v1/hf/orders/done`, params);
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

  autoCancelHFOrderSetting(params: {
    timeout: number;
    symbols?: string;
  }): Promise<
    APISuccessResponse<{
      currentTime: number; // System current time (in seconds)
      triggerTime: number; // Trigger cancellation time (in seconds)
    }>
  > {
    return this.postPrivate('api/v1/hf/orders/dead-cancel-all', params);
  }

  autoCancelHFOrderSettingQuery(): Promise<
    APISuccessResponse<AutoCancelHFOrderSettingQueryResponse>
  > {
    return this.getPrivate('api/v1/hf/orders/dead-cancel-all/query');
  }

  getHFFilledList(
    params: GetHFFilledListRequest,
  ): Promise<APISuccessResponse<GetHFFilledListResponse>> {
    return this.getPrivate('api/v1/hf/fills', params);
  }

  /**
   *
   * Orders
   *
   */

  // SPOT and MARGIN
  placeOrder(params: PlaceOrderRequest): Promise<
    APISuccessResponse<{
      orderId: string; // An order Id is returned once an order is successfully placed.
    }>
  > {
    return this.postPrivate('api/v1/orders', params);
  }

  // SPOT and MARGIN
  placeOrderTest(): Promise<any> {
    return this.postPrivate('api/v1/orders/test');
  }

  //SPOT
  placeMultipleOrders(
    params: PlaceMultipleOrdersRequest,
  ): Promise<APISuccessResponse<PlaceMultipleOrdersResponse[]>> {
    return this.postPrivate('api/v1/orders/multi', params);
  }

  // Used for Spot and Margin Trading: Cancels a single order by orderId.
  cancelOrderById(params: { orderId: string }): Promise<
    APISuccessResponse<{
      cancelledOrderIds: string[]; // Unique ID of the cancelled order
    }>
  > {
    return this.deletePrivate(`api/v1/orders/${params.orderId}`);
  }

  // Used for Spot and Margin Trading: Cancels a single order by clientOid.
  cancelOrderByClientOid(params: { clientOid: string }): Promise<
    APISuccessResponse<{
      cancelledOrderId: string; // Unique ID of the cancelled order
      clientOid: string; // Unique order id created by users to identify their orders
    }>
  > {
    return this.deletePrivate(`api/v1/order/client-order/${params.clientOid}`);
  }

  // Used for Spot and Margin Trading: Cancels all open orders.
  cancelAllOrders(params?: CancelAllOrdersRequest): Promise<
    APISuccessResponse<{
      cancelledOrderIds: string[]; // Unique ID of the cancelled order
    }>
  > {
    return this.deletePrivate('api/v1/orders', params);
  }

  // Retrieves the current list of orders. Supports filtering by status and trade type.
  getOrderList(
    params?: GetOrderListRequest,
  ): Promise<APISuccessResponse<OrderListResponse>> {
    return this.getPrivate('api/v1/orders', params);
  }

  // Needs General permission, Retrieves a list of the most recent 1000 orders within the last 24 hours, sorted in descending order by time.
  getRecentOrdersList(): Promise<APISuccessResponse<OrderListItem[]>> {
    return this.getPrivate('api/v1/limit/orders');
  }

  // Needs General Permission, Retrieves the details of a single order by its orderId. Useful for tracking the status and details of specific trades.
  getOrderDetailsByOrderId(params: {
    orderId: string;
  }): Promise<APISuccessResponse<OrderListItem[]>> {
    return this.getPrivate(`api/v1/orders/${params.orderId}`);
  }

  // Needs general permission, Retrieves the details of a single order by its clientOid. This is useful for checking the status of orders placed with a unique client-provided identifier.
  getOrderDetailsByClientOid(params: {
    clientOid: string;
  }): Promise<APISuccessResponse<OrderListItem[]>> {
    return this.getPrivate(`api/v1/order/client-order/${params.clientOid}`);
  }

  /**
   *
   * Fills
   *
   */

  // General permission, Retrieves a list of the most recent fills for your orders, providing details such as the executed price, size, and the fees incurred. Useful for tracking trade executions and their impact on your portfolio.
  getFilledList(
    params?: GetFilledListRequest,
  ): Promise<APISuccessResponse<GetFilledListResponse>> {
    return this.getPrivate('api/v1/fills', params);
  }

  // General permission, Retrieves a list of the most recent 1000 fills within the last 24 hours, sorted in descending order by time.
  getRecentFillsList(): Promise<APISuccessResponse<FillItemResponse[]>> {
    return this.getPrivate('api/v1/limit/fills');
  }

  /**
   *
   * Stop order
   *
   */

  // Spot and margin trading, places a stop order on the platform.
  placeStopOrder(
    params: PlaceStopOrderRequest,
  ): Promise<APISuccessResponse<{ orderId: string }>> {
    return this.postPrivate('api/v1/stop-order', params);
  }

  // Cancels a single stop order by orderId. Applicable for both spot and margin trading.
  // This endpoint requires the "Spot Trading" or "Margin Trading" permission on your API key.
  cancelStopOrderById(params: { orderId: string }): Promise<
    APISuccessResponse<{
      cancelledOrderIds: string[]; // Unique ID of the cancelled order
    }>
  > {
    return this.deletePrivate(`api/v1/stop-order/${params.orderId}`);
  }

  // Cancels a stop order by clientOid. Requires "Spot Trading" or "Margin Trading" permission.
  cancelStopOrderByClientOid(params: {
    clientOid: string;
    symbol?: string;
  }): Promise<
    APISuccessResponse<{
      cancelledOrderId: string; // Unique ID of the cancelled order
      clientOid: string; // Unique order id created by users to identify their orders
    }>
  > {
    return this.deletePrivate(
      `api/v1/stop-order/cancelOrderByClientOid`,
      params,
    );
  }

  // Cancels a batch of stop orders. Requires "Spot Trading" or "Margin Trading" permission.
  cancelStopOrders(params?: CancelStopOrdersRequest): Promise<
    APISuccessResponse<{
      cancelledOrderIds: string[]; // Unique IDs of the cancelled orders
    }>
  > {
    return this.deletePrivate(`api/v1/stop-order/cancel`, params);
  }

  // Retrieves your current untriggered stop order list, paginated and sorted to show the latest first.
  getStopOrdersList(
    params?: GetStopOrdersListRequest,
  ): Promise<APISuccessResponse<StopOrdersListResponse>> {
    return this.getPrivate('api/v1/stop-order', params);
  }

  // Retrieves the details of a single stop order by its orderId.
  getStopOrderDetailsByOrderId(params: {
    orderId: string;
  }): Promise<APISuccessResponse<StopOrderItemResponse>> {
    return this.getPrivate(`api/v1/stop-order/${params.orderId}`);
  }

  // Retrieves the details of a single stop order by its clientOid.
  getStopOrderDetailsByClientOid(params: {
    clientOid: string;
    symbol?: string;
  }): Promise<APISuccessResponse<StopOrderItemResponse[]>> {
    return this.getPrivate('api/v1/stop-order/queryOrderByClientOid', params);
  }
  /**
   *
   * OCO order
   *
   */

  // Places an OCO (One Cancels the Other) order on the platform.
  placeOCOOrder(params: PlaceOCOOrderRequest): Promise<
    APISuccessResponse<{
      orderId: string; // An order Id is returned once an order is successfully placed.
    }>
  > {
    return this.postPrivate('api/v3/oco/order', params);
  }

  // Cancels a single OCO order by orderId.
  cancelOCOOrderById(params: { orderId: string }): Promise<
    APISuccessResponse<{
      cancelledOrderIds: string[]; // List of few order IDs related to the canceled OCO order
    }>
  > {
    return this.deletePrivate(`api/v3/oco/order/${params.orderId}`);
  }

  // Cancels a single OCO order by clientOid.
  cancelOCOOrderByClientOid(params: { clientOid: string }): Promise<
    APISuccessResponse<{
      cancelledOrderIds: string[]; // List of two order IDs related to the canceled OCO order
    }>
  > {
    return this.deletePrivate(`api/v3/oco/client-order/${params.clientOid}`);
  }

  // Batch cancels OCO orders through orderIds.
  cancelMultipleOCOOrders(params?: {
    orderIds?: string;
    symbol?: string;
  }): Promise<
    APISuccessResponse<{
      cancelledOrderIds: string[]; // List of two order IDs related to the canceled OCO order
    }>
  > {
    return this.deletePrivate('api/v3/oco/orders', params);
  }

  // Retrieves the details of a single OCO order by its orderId.
  getOCOOrderDetailsByOrderId(params: {
    orderId: string;
  }): Promise<APISuccessResponse<OCOOrderListItemResponse>> {
    return this.getPrivate(`api/v3/oco/order/${params.orderId}`);
  }

  // Retrieves the details of a single OCO order by its clientOid.
  getOCOOrderDetailsByClientOid(params: {
    clientOid: string;
  }): Promise<APISuccessResponse<OCOOrderListItemResponse>> {
    return this.getPrivate(`api/v3/oco/client-order/${params.clientOid}`);
  }

  // Retrieves the details of a single OCO order by its orderId, including detailed information about the individual orders.
  getOCOOrderDetails(params: {
    orderId: string;
  }): Promise<APISuccessResponse<OCOOrderDetailsResponse>> {
    return this.getPrivate(`api/v3/oco/order/details/${params.orderId}`);
  }

  // Retrieves your current OCO order list, paginated and sorted to show the latest first.
  getOCOOrdersList(
    params: GetOCOOrdersListRequest,
  ): Promise<APISuccessResponse<OCOOrdersListResponse>> {
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

  placeHFMarginOrder(params: PlaceHFMarginOrderRequest): Promise<
    APISuccessResponse<{
      orderNo: string; // An order Id is returned once an order is successfully placed.
    }>
  > {
    return this.postPrivate('api/v3/hf/margin/order', params);
  }

  placeHFMarginOrderTest(): Promise<any> {
    return this.postPrivate('api/v3/hf/margin/order/test');
  }

  cancelHFMarginOrder(params: { orderId: string; symbol: string }): Promise<
    APISuccessResponse<{
      orderId: string; // Order id of the cancelled order
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
      clientOid: string; // Order id of the cancelled order
    }>
  > {
    return this.deletePrivate(
      `api/v3/hf/margin/orders/client-order/${params.clientOid}`,
      params,
    );
  }

  cancelAllHFMarginOrders(params: HFMarginOrder): Promise<any> {
    return this.deletePrivate(`api/v3/hf/margin/orders`, params);
  }

  getActiveHFMarginOrders(
    params: HFMarginOrder,
  ): Promise<APISuccessResponse<HFMarginOrderItemResponse[]>> {
    return this.getPrivate(`api/v3/hf/margin/orders/active`, params);
  }

  getHFMarginFilledList(
    params: GetHFMarginFilledListRequest,
  ): Promise<APISuccessResponse<HFMarginFilledListResponse>> {
    return this.getPrivate('api/v3/hf/margin/orders/done', params);
  }

  getHFMarginOrderDetailsByOrderId(params: {
    orderId: string;
    symbol: string;
  }): Promise<APISuccessResponse<HFMarginOrderItemResponse>> {
    return this.getPrivate(`api/v3/hf/margin/orders/${params.orderId}`, params);
  }

  getHFMarginOrderDetailsByClientOid(params: {
    clientOid: string;
    symbol: string;
  }): Promise<APISuccessResponse<HFMarginOrderItemResponse>> {
    return this.getPrivate(
      `api/v3/hf/margin/orders/client-order/${params.clientOid}?symbol=${params.symbol}`,
    );
  }

  getHFMarginTransactionRecords(
    params: GetHFMarginTransactionRecordsRequest,
  ): Promise<APISuccessResponse<HFMarginTransactionListResponse>> {
    return this.getPrivate('api/v3/hf/margin/fills', params);
  }

  /**
   *
   * Orders
   *
   */

  placeMarginOrder(
    params: PlaceMarginOrderRequest,
  ): Promise<APISuccessResponse<PlaceMarginOrderResponse>> {
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

  getMarginLeveragedTokenInfo(params?: {
    currency?: string;
  }): Promise<APISuccessResponse<MarginLevTokenInfoResponse[]>> {
    return this.get('api/v3/etf/info', params);
  }

  getMarginMarkPrice(params: {
    symbol: string;
  }): Promise<APISuccessResponse<MarginMarkPriceResponse>> {
    return this.get(`api/v1/mark-price/${params.symbol}/current`);
  }

  getMarginConfigInfo(): Promise<APISuccessResponse<MarginConfigInfoResponse>> {
    return this.get('api/v1/margin/config');
  }

  getMarginRiskLimitCurrencyConfig(
    params: MarginRiskLimitRequest,
  ): Promise<APISuccessResponse<MarginRiskLimitResponse[]>> {
    return this.get('api/v3/margin/currencies', params);
  }

  /**
   *
   * Isolated Margin
   *
   */

  getIsolatedMarginSymbolsConfig(): Promise<
    APISuccessResponse<IsolatedMarginSymbolsConfigResponse[]>
  > {
    return this.getPrivate('api/v1/isolated/symbols');
  }

  getIsolatedMarginAccountInfo(params?: {
    balanceCurrency?: 'USDT' | 'KCS' | 'BTC';
  }): Promise<APISuccessResponse<IsolatedMarginAccountInfoResponse>> {
    return this.getPrivate('api/v1/isolated/accounts', params);
  }

  getSingleIsolatedMarginAccountInfo(params: {
    symbol: string;
  }): Promise<APISuccessResponse<SingleIsolatedMarginAccountInfoResponse>> {
    return this.getPrivate(`api/v1/isolated/account/${params.symbol}`);
  }

  /**
   *
   * Margin trading(v3)
   *
   */

  marginBorrowV3(
    params: MarginBorrowV3Request,
  ): Promise<APISuccessResponse<MarginOrderResponse>> {
    return this.postPrivate('api/v3/margin/borrow', params);
  }

  marginRepayV3(
    params: MarginRepayV3Request,
  ): Promise<APISuccessResponse<MarginOrderResponse>> {
    return this.postPrivate('api/v3/margin/repay', params);
  }

  getMarginBorrowingHistoryV3(
    params: MarginHistoryV3Request,
  ): Promise<APISuccessResponse<MarginHistoryRecord[]>> {
    return this.getPrivate('api/v3/margin/borrow', params);
  }

  getMarginRepaymentHistoryV3(
    params: MarginHistoryV3Request,
  ): Promise<APISuccessResponse<MarginHistoryRecord[]>> {
    return this.getPrivate('api/v3/margin/repay', params);
  }

  /**
   *
   * Lending market(v3)
   *
   */

  getLendingMarketCurrencyInfoV3(params?: {
    currency?: string;
  }): Promise<APISuccessResponse<GetLendingMarketCurrencyInfoV3Response>> {
    return this.get('api/v3/project/list', params);
  }

  getLendingMarketInterestRatesV3(params: {
    currency: string;
  }): Promise<APISuccessResponse<MarketInterestRateItem[]>> {
    return this.get('api/v3/project/marketInterestRate', params);
  }

  initiateLendingSubscriptionV3(
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

  initiateLendingRedemptionV3(
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

  modifyLendingSubscriptionOrdersV3(
    params: ModifyLendingSubscriptionOrdersV3Request,
  ): Promise<any> {
    return this.postPrivate('api/v3/lend/purchase/update', params);
  }

  getLendingRedemptionOrdersV3(
    params: GetLendingRedemptionOrdersV3Request,
  ): Promise<APISuccessResponse<LendingRedemptionResponse>> {
    return this.getPrivate('api/v3/redeem/orders', params);
  }

  getLendingSubscriptionOrdersV3(
    params: GetLendingSubscriptionOrdersV3Request,
  ): Promise<APISuccessResponse<LendingRedemptionResponse>> {
    return this.getPrivate('api/v3/purchase/orders', params);
  }
}
