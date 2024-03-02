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
  getBalances(): Promise<SpotAccountBalance[]> {
    return this.getPrivate('api/v1/accounts');
  }

  getAccount(params?: { accountId: any }): Promise<any> {
    return this.getPrivate('api/v1/accounts', params);
  }

  /**
   * Get Account Ledgers - Spot/Margin
   */
  getAccountSpotMarginTransactions(params: {
    currency: string;
    startAt: number;
  }): Promise<any> {
    return this.getPrivate('api/v1/accounts/ledgers', params);
  }

  /**
   * Get Account Ledgers - trade_hf
   */
  getAccountHFTransactions(params: {
    bizType: string;
    currency: string;
    startAt: number;
  }): Promise<any> {
    return this.getPrivate('api/v1/hf/accounts/ledgers', params);
  }

  /**
   * Get Account Ledgers - margin_hf
   */
  getAccountHFMarginTransactions(params: {
    bizType: string;
    currency: string;
    startAt: number;
  }): Promise<any> {
    return this.getPrivate('api/v3/hf/margin/account/ledgers', params);
  }

  /**
   * Get Account Ledgers - Futures
   */
  getAccountFuturesTransactions(params: {
    offset: number;
    forward: boolean;
    maxCount: number;
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

  getSubAccountsV2(): Promise<any> {
    return this.getPrivate('api/v2/sub/user');
  }

  createSubAccount(params: {}): Promise<any> {
    return this.postPrivate('api/v2/sub/user/created', params);
  }

  getSubAccountBalance(params: { subUserId: any }): Promise<any> {
    return this.getPrivate('api/v1/sub-accounts', params);
  }

  getSubAccountBalancesV1(): Promise<any> {
    return this.getPrivate('api/v1/sub-accounts');
  }

  getSubAccountBalancesV2(): Promise<any> {
    return this.getPrivate('api/v2/sub-accounts');
  }

  /**
   *
   * Sub-Account API
   *
   *
   */

  getSubAccountAPIs(params: any): Promise<any> {
    return this.getPrivate('api/v1/sub/api-key', params);
  }

  createSubAccountAPI(params: any): Promise<any> {
    return this.postPrivate('api/v1/sub/api-key', params);
  }

  updateSubAccountAPI(params: any): Promise<any> {
    return this.postPrivate('api/v1/sub/api-key/update', params);
  }

  deleteSubAccountAPI(params: any): Promise<any> {
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

  getMarginAccountBalanceDetail(params: {
    quoteCurrency: string;
  }): Promise<any> {
    return this.getPrivate('api/v3/margin/accounts', params);
  }

  getIsolatedMarginAccountBalanceDetail(params: {
    quoteCurrency: string;
  }): Promise<any> {
    return this.getPrivate('api/v3/isolated/accounts', params);
  }

  getFuturesAccountBalance(params: { currency: string }): Promise<any> {
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

  createDepositAddress(params: any): Promise<any> {
    return this.postPrivate('api/v1/deposit-addresses', params);
  }

  getDepositAddressesV2(params: any): Promise<any> {
    return this.getPrivate('api/v2/deposit-addresses', params);
  }

  getDepositAddress(params: any): Promise<any> {
    return this.getPrivate('api/v1/deposit-addresses', params);
  }

  getDepositList(params: any): Promise<any> {
    return this.getPrivate('api/v1/deposits', params);
  }

  getV1HistoricalDepositsList(params: any): Promise<any> {
    return this.getPrivate('api/v1/hist-deposits', params);
  }

  /**
   *
   * Withdrawals
   *
   */

  getWithdrawalsList(params: any): Promise<any> {
    return this.getPrivate('api/v1/withdrawals', params);
  }

  getV1HistoricalWithdrawalsList(params: any): Promise<any> {
    return this.getPrivate('api/v1/hist-withdrawals', params);
  }

  getWithdrawalQuotas(params: any): Promise<any> {
    return this.getPrivate('api/v1/withdrawals/quotas', params);
  }

  applyWithdraw(params: any): Promise<any> {
    return this.postPrivate('api/v1/withdrawals', params);
  }

  cancelWithdrawal(params: any): Promise<any> {
    return this.deletePrivate('api/v1/withdrawals/{withdrawalId}', params);
  }

  /**
   *
   * Transfer
   *
   */

  getTransferable(params: any): Promise<any> {
    return this.getPrivate('api/v1/accounts/transferable', params);
  }

  flexTransfer(params: any): Promise<any> {
    return this.postPrivate('api/v3/accounts/universal-transfer', params);
  }

  transferBetweenMasterAndSubAccount(params: any): Promise<any> {
    return this.postPrivate('api/v2/accounts/sub-transfer', params);
  }

  innerTransfer(params: any): Promise<any> {
    return this.postPrivate('api/v2/accounts/inner-transfer', params);
  }

  // Futures
  transferFromFuturesAccount(params: any): Promise<any> {
    return this.postPrivate('api/v3/transfer-out', params);
  }

  // Futures
  transferToFuturesAccount(params: any): Promise<any> {
    return this.postPrivate('api/v1/transfer-in', params);
  }

  // Futures
  getFuturesTransferOutRequestRecords(params: any): Promise<any> {
    return this.getPrivate('api/v1/transfer-list', params);
  }

  /**
   *
   * Trade Fee
   *
   */

  getBasicUserFee(params: any): Promise<any> {
    return this.getPrivate('api/v1/base-fee', params);
  }

  getTradingPairActualFee(params: any): Promise<any> {
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

  getSpotCurrencyList(params: any): Promise<any> {
    return this.get('api/v3/currencies', params);
  }

  getSpotCurrencyDetail(params: any): Promise<any> {
    // Replace {currency} in the URL with the actual currency parameter provided
    return this.get(`api/v3/currencies`, params);
  }

  getSpotSymbolsList(): Promise<any> {
    return this.get('api/v2/symbols');
  }

  getSpotTicker(params: any): Promise<any> {
    // Append the symbol query parameter to the request URL
    return this.get(`api/v1/market/orderbook`, params);
  }

  getSpotAllTickers(): Promise<any> {
    return this.get('api/v1/market/allTickers');
  }

  getSpot24hrStats(params: any): Promise<any> {
    return this.get('api/v1/market/stats', params);
  }

  getSpotMarketList(params: any): Promise<any> {
    return this.get('api/v1/markets', params);
  }

  getSpotPartOrderBook(params: any): Promise<any> {
    return this.get(`api/v1/market/orderbook`, params);
  }

  getSpotFullOrderBook(params: any): Promise<any> {
    return this.get('api/v3/market/orderbook/level2', params);
  }

  getSpotTradeHistories(params: any): Promise<any> {
    return this.get('api/v1/market/histories', params);
  }

  getSpotKlines(params: any): Promise<any> {
    return this.get('api/v1/market/candles', params);
  }

  getSpotFiatPrice(params: any): Promise<any> {
    return this.get('api/v1/prices', params);
  }

  getSpotServerTime(params: any): Promise<any> {
    return this.get('api/v1/timestamp', params);
  }

  getSpotServiceStatus(params: any): Promise<any> {
    return this.get('api/v1/status', params);
  }

  /**
   *
   * Spot HF trade
   *
   */
  placeSpotHFOrder(params: any): Promise<any> {
    return this.postPrivate('api/v1/hf/orders', params);
  }

  placeSpotHFOrderTest(params: any): Promise<any> {
    return this.postPrivate('api/v1/hf/orders/test', params);
  }

  placeSpotHFOrderSync(params: any): Promise<any> {
    return this.postPrivate('api/v1/hf/orders/sync', params);
  }

  placeSpotMultipleHFOrders(params: any): Promise<any> {
    return this.postPrivate('api/v1/hf/orders/multi', params);
  }

  placeSpotMultipleHFOrdersSync(params: any): Promise<any> {
    return this.postPrivate('api/v1/hf/orders/multi/sync', params);
  }

  modifySpotHFOrder(params: any): Promise<any> {
    return this.postPrivate('api/v1/hf/orders/alter', params);
  }

  // check this one for Tiago
  cancelSpotHFOrder(params: any): Promise<any> {
    return this.deletePrivate(
      `api/v1/hf/orders/${params.orderId}?symbol=${params.symbol}`,
    );
  }

  syncSpotCancelHFOrder(params: any): Promise<any> {
    return this.deletePrivate(
      `api/v1/hf/orders/sync/${params.orderId}/cancel`,
      params,
    );
  }

  cancelSpotHFOrderByClientOId(params: any): Promise<any> {
    return this.deletePrivate(
      `api/v1/hf/orders/client-order/${params.clientOid}?symbol=${params.symbol}`,
    );
  }

  syncSpotCancelHFOrderByClientOId(params: any): Promise<any> {
    return this.deletePrivate(`api/v1/hf/orders/sync/client-order`, params);
  }

  cancelSpotSpecifiedNumberHFOrders(params: any): Promise<any> {
    return this.deletePrivate(`api/v1/hf/orders/cancel`, params);
  }

  cancelSpotAllHFOrdersBySymbol(params: any): Promise<any> {
    return this.deletePrivate(`api/v1/hf/orders`, params);
  }

  cancelSpotAllHFOrders(params: any): Promise<any> {
    return this.deletePrivate(`api/v1/hf/orders/cancelAll`, params);
  }

  getSpotActiveHFOrders(params: any): Promise<any> {
    return this.getPrivate(`api/v1/hf/orders/active`, params);
  }

  getSpotActiveHFOrdersSymbols(params: any): Promise<any> {
    return this.getPrivate(`api/v1/hf/orders/active/symbols`, params);
  }

  getSpotHFCompletedOrders(params: any): Promise<any> {
    return this.getPrivate(`api/v1/hf/orders/done`, params);
  }

  getSpotHFOrderDetailsByOrderId(params: any): Promise<any> {
    return this.getPrivate(`api/v1/hf/orders`, params);
  }

  getSpotHFOrderDetailsByClientOid(params: any): Promise<any> {
    return this.getPrivate(
      `api/v1/hf/orders/client-order/${params.clientOid}`,
      { symbol: params.symbol },
    );
  }

  autoCancelSpotHFOrderSetting(params: any): Promise<any> {
    return this.postPrivate('api/v1/hf/orders/dead-cancel-all', params);
  }

  autoCancelSpotHFOrderSettingQuery(params: any): Promise<any> {
    return this.getPrivate('api/v1/hf/orders/dead-cancel-all/query', params);
  }

  getSpotHFFilledList(params: any): Promise<any> {
    return this.getPrivate('api/v1/hf/fills', params);
  }

  /**
   *
   * Orders
   *
   */

  // SPOT and MARGIN
  placeOrder(params: any): Promise<any> {
    return this.postPrivate('api/v1/orders', params);
  }

  // SPOT and MARGIN
  placeOrderTest(params: any): Promise<any> {
    return this.postPrivate('api/v1/orders/test', params);
  }

  //SPOT
  placeMultipleOrders(params: any): Promise<any> {
    return this.postPrivate('api/v1/orders/multi', params);
  }

  // Used for Spot and Margin Trading: Cancels a single order by orderId.
  cancelOrderById(params: any): Promise<any> {
    return this.deletePrivate(`api/v1/orders/${params.orderId}`);
  }

  // Used for Spot and Margin Trading: Cancels a single order by clientOid.
  cancelOrderByClientOid(params: any): Promise<any> {
    return this.deletePrivate(`api/v1/order/client-order/${params.clientOid}`);
  }

  // Used for Spot and Margin Trading: Cancels all open orders.
  cancelAllOrders(params?: any): Promise<any> {
    return this.deletePrivate('api/v1/orders', params);
  }

  // Retrieves the current list of orders. Supports filtering by status and trade type.
  getOrderList(params?: any): Promise<any> {
    return this.getPrivate('api/v1/orders', params);
  }

  // Needs General permission, Retrieves a list of the most recent 1000 orders within the last 24 hours, sorted in descending order by time.
  getRecentOrdersList(params?: any): Promise<any> {
    return this.getPrivate('api/v1/limit/orders', params);
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
  getSpotFilledList(params?: any): Promise<any> {
    return this.getPrivate('api/v1/fills', params);
  }

  // General permission, Retrieves a list of the most recent 1000 fills within the last 24 hours, sorted in descending order by time.
  getSpotRecentFillsList(params?: any): Promise<any> {
    return this.getPrivate('api/v1/limit/fills', params);
  }

  /**
   *
   * Stop order
   *
   */

  // Spot and margin trading, places a stop order on the platform.
  placeStopOrder(params: { orderId: string }): Promise<any> {
    return this.postPrivate('api/v1/stop-order', params);
  }

  // Cancels a single stop order by orderId. Applicable for both spot and margin trading.
  // This endpoint requires the "Spot Trading" or "Margin Trading" permission on your API key.
  cancelStopOrderById(params: { orderId: string }): Promise<any> {
    return this.deletePrivate(`api/v1/stop-order/${params.orderId}`);
  }

  // Cancels a stop order by clientOid. Requires "Spot Trading" or "Margin Trading" permission.
  cancelStopOrderByClientOid(params: any): Promise<any> {
    return this.deletePrivate(
      `api/v1/stop-order/cancelOrderByClientOid`,
      params,
    );
  }

  // Cancels a batch of stop orders. Requires "Spot Trading" or "Margin Trading" permission.
  cancelStopOrders(params: any): Promise<any> {
    return this.deletePrivate(`api/v1/stop-order/cancel`, params);
  }

  // Retrieves your current untriggered stop order list, paginated and sorted to show the latest first.
  getStopOrdersList(params: any): Promise<any> {
    return this.getPrivate('api/v1/stop-order', params);
  }

  // Retrieves the details of a single stop order by its orderId.
  getStopOrderDetailsByOrderId(params: any): Promise<any> {
    return this.getPrivate(`api/v1/stop-order/${params.orderId}`);
  }

  // Retrieves the details of a single stop order by its clientOid.
  getStopOrderDetailsByClientOid(params: any): Promise<any> {
    return this.getPrivate('api/v1/stop-order/queryOrderByClientOid', params);
  }
  /**
   *
   * OCO order
   *
   */

  // Places an OCO (One Cancels the Other) order on the platform.
  placeOCOOrder(params: any): Promise<any> {
    return this.postPrivate('api/v3/oco/order', params);
  }

  // Cancels a single OCO order by orderId.
  cancelOCOOrderById(params: any): Promise<any> {
    return this.deletePrivate(`api/v3/oco/order/${params.orderId}`);
  }

  // Cancels a single OCO order by clientOid.
  cancelOCOOrderByClientOid(params: any): Promise<any> {
    return this.deletePrivate(`api/v3/oco/client-order/${params.clientOid}`);
  }

  // Batch cancels OCO orders through orderIds.
  cancelMultipleOCOOrders(params: any): Promise<any> {
    return this.deletePrivate('api/v3/oco/orders', params);
  }

  // Retrieves the details of a single OCO order by its orderId.
  getOCOOrderDetailsByOrderId(params: any): Promise<any> {
    return this.getPrivate(`api/v3/oco/order/${params.orderId}`);
  }

  // Retrieves the details of a single OCO order by its orderId, including detailed information about the individual orders.
  getOCOOrderDetails(params: any): Promise<any> {
    return this.getPrivate(`api/v3/oco/order/details/${params.orderId}`);
  }

  // Retrieves the details of a single OCO order by its clientOid.
  getOCOOrderDetailsByClientOid(params: any): Promise<any> {
    return this.getPrivate(`api/v3/oco/client-order/${params.clientOid}`);
  }

  // Retrieves your current OCO order list, paginated and sorted to show the latest first.
  getOCOOrdersList(params: any): Promise<any> {
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

  placeHFMarginOrder(params: any): Promise<any> {
    return this.postPrivate('api/v3/hf/margin/order', params);
  }

  placeHFMarginOrderTest(params: any): Promise<any> {
    return this.postPrivate('api/v3/hf/margin/order/test', params);
  }

  cancelHFMarginOrder(params: any): Promise<any> {
    return this.deletePrivate(
      `api/v3/hf/margin/orders/${params.orderId}?symbol=${params.symbol}`,
    );
  }

  cancelHFMarginOrderByClientOid(params: any): Promise<any> {
    return this.deletePrivate(
      `api/v3/hf/margin/orders/client-order/${params.clientOid}?symbol=${params.symbol}`,
    );
  }

  cancelAllHFMarginOrders(params: any): Promise<any> {
    return this.deletePrivate(
      `api/v3/hf/margin/orders?symbol=${params.symbol}&tradeType=${params.tradeType}`,
    );
  }

  getActiveHFMarginOrders(params: any): Promise<any> {
    return this.getPrivate(`api/v3/hf/margin/orders/active`, params);
  }

  getHFMarginFilledList(params: any): Promise<any> {
    return this.getPrivate('api/v3/hf/margin/orders/done', params);
  }

  getHFMarginOrderDetailsByOrderId(params: any): Promise<any> {
    return this.getPrivate(
      `api/v3/hf/margin/orders/${params.orderId}?symbol=${params.symbol}`,
    );
  }

  getHFMarginOrderDetailsByClientOid(params: any): Promise<any> {
    return this.getPrivate(
      `api/v3/hf/margin/orders/client-order/${params.clientOid}?symbol=${params.symbol}`,
    );
  }

  getHFMarginTransactionRecords(params: any): Promise<any> {
    return this.getPrivate('api/v3/hf/margin/fills', params);
  }

  /**
   *
   * Orders
   *
   */

  placeMarginOrder(params: any): Promise<any> {
    return this.postPrivate('api/v1/margin/order', params);
  }

  placeMarginOrderTest(params: any): Promise<any> {
    return this.postPrivate('api/v1/margin/order/test', params);
  }

  /**
   *
   * Margin info
   *
   */

  getMarginLeveragedTokenInfo(params: any): Promise<any> {
    return this.get('api/v3/etf/info', params);
  }

  getMarginMarkPrice(params: any): Promise<any> {
    return this.get(`api/v1/mark-price/${params.symbol}/current`, params);
  }

  getMarginConfigInfo(params: any): Promise<any> {
    return this.get('api/v1/margin/config', params);
  }

  getMarginRiskLimitCurrencyConfig(params: any): Promise<any> {
    return this.get('api/v3/margin/currencies', params);
  }

  /**
   *
   * Isolated Margin
   *
   */

  getIsolatedMarginSymbolsConfig(params: any): Promise<any> {
    return this.getPrivate('api/v1/isolated/symbols', params);
  }

  getIsolatedMarginAccountInfo(params: any): Promise<any> {
    return this.getPrivate('api/v1/isolated/accounts', params);
  }

  getSingleIsolatedMarginAccountInfo(params: any): Promise<any> {
    return this.getPrivate(`api/v1/isolated/account/${params.symbol}`, params);
  }

  /**
   *
   * Margin trading(v3)
   *
   */

  marginBorrowV3(params: any): Promise<any> {
    return this.postPrivate('api/v3/margin/borrow', params);
  }

  marginRepayV3(params: any): Promise<any> {
    return this.postPrivate('api/v3/margin/repay', params);
  }

  getMarginBorrowingHistoryV3(params: any): Promise<any> {
    return this.getPrivate('api/v3/margin/borrow', params);
  }

  getmarginRepaymentHistoryV3(params: any): Promise<any> {
    return this.getPrivate('api/v3/margin/repay', params);
  }

  /**
   *
   * Lending market(v3)
   *
   */

  getLendingMarketCurrencyInfoV3(params: any): Promise<any> {
    return this.get('api/v3/project/list', params);
  }

  getLendingMarketInterestRatesV3(params: any): Promise<any> {
    return this.get('api/v3/project/marketInterestRate', params);
  }

  initiateLendingSubscriptionV3(params: any): Promise<any> {
    return this.postPrivate('api/v3/purchase', params);
  }

  initiateLendingRedemptionV3(params: any): Promise<any> {
    return this.postPrivate('api/v3/redeem', params);
  }

  modifyLendingSubscriptionOrdersV3(params: any): Promise<any> {
    return this.postPrivate('api/v3/lend/purchase/update', params);
  }

  getLendingRedemptionOrdersV3(params: any): Promise<any> {
    return this.getPrivate('api/v3/redeem/orders', params);
  }

  getLendingSubscriptionOrdersV3(params: any): Promise<any> {
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

  getFuturesTicker(params: any): Promise<any> {
    return this.get('api/v1/ticker', params);
  }

  getFuturesFullOrderBookLevel2(params: any): Promise<any> {
    return this.get('api/v1/level2/snapshot', params);
  }

  getFuturesPartOrderBookLevel2Depth20(params: any): Promise<any> {
    return this.get('api/v1/level2/depth20', params);
  }

  getFuturesPartOrderBookLevel2Depth100(params: any): Promise<any> {
    return this.get('api/v1/level2/depth100', params);
  }

  getFuturesTransactionHistory(params: any): Promise<any> {
    return this.get('api/v1/trade/history', params);
  }

  getFuturesKlines(params: any): Promise<any> {
    return this.get('api/v1/kline/query', params);
  }

  getFuturesInterestRateList(params: any): Promise<any> {
    return this.get('api/v1/interest/query', params);
  }

  getFuturesIndexList(params: any): Promise<any> {
    return this.get('api/v1/index/query', params);
  }

  getFuturesMarkPrice(params: { symbol: string }): Promise<any> {
    return this.get(`api/v1/mark-price/${params.symbol}/current`);
  }

  getFuturesPremiumIndex(params: any): Promise<any> {
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

  submitFuturesOrder(params: any): Promise<any> {
    return this.postPrivate('api/v1/orders', params);
  }

  sumbitFuturesOrderTest(params: any): Promise<any> {
    return this.postPrivate('api/v1/orders/test', params);
  }

  cancelFuturesOrderById(params: { orderId: string }): Promise<any> {
    return this.deletePrivate(`api/v1/orders/${params.orderId}`);
  }

  cancelFuturesOrderByClientOid(params: { clientOid: string }): Promise<any> {
    return this.deletePrivate(`api/v1/orders/client-order/${params.clientOid}`);
  }

  submitMultipleFuturesOrders(params: any): Promise<any> {
    return this.postPrivate('api/v1/orders/multi', params);
  }

  cancelMultipleFuturesOrders(params?: any): Promise<any> {
    return this.deletePrivate('api/v1/orders', params);
  }

  cancelMultipleFuturesStopOrders(params?: any): Promise<any> {
    return this.deletePrivate('api/v1/stopOrders', params);
  }

  getFuturesOrderList(params?: any): Promise<any> {
    return this.getPrivate('api/v1/orders', params);
  }

  getFuturesUntriggeredStopOrdersList(params: any): Promise<any> {
    return this.getPrivate('api/v1/stopOrders', params);
  }

  getFuturesRecentOrdersList(params?: any): Promise<any> {
    return this.getPrivate('api/v1/recentDoneOrders', params);
  }

  getFuturesOrderDetailsByOrderId(params: { orderId: string }): Promise<any> {
    return this.getPrivate(`api/v1/orders/${params.orderId}`);
  }

  getFuturesOrderDetailsByClientOid(params: any): Promise<any> {
    return this.getPrivate(`api/v1/orders/byClientOid`, params);
  }

  /**
   *
   * Futures Fills
   *
   */

  getFuturesFilledList(params?: any): Promise<any> {
    return this.getPrivate('api/v1/fills', params);
  }

  getFuturesRecentFilledList(params?: any): Promise<any> {
    return this.getPrivate('api/v1/recentFills', params);
  }

  getFuturesActiveOrderValue(params?: any): Promise<any> {
    return this.getPrivate('api/v1/openOrderStatistics', params);
  }

  /**
   *
   * Futures Positions
   *
   */

  getFuturesPositionDetails(params: any): Promise<any> {
    return this.getPrivate('api/v1/position', params);
  }

  getFuturesPositionList(params?: any): Promise<any> {
    return this.getPrivate('api/v1/positions', params);
  }

  modifyFuturesAutoDepositMarginStatus(params: any): Promise<any> {
    return this.postPrivate(
      'api/v1/position/margin/auto-deposit-status',
      params,
    );
  }

  getFuturesMaxWithdrawMargin(params: any): Promise<any> {
    return this.getPrivate('api/v1/margin/maxWithdrawMargin', params);
  }

  removeFuturesMarginManually(params: any): Promise<any> {
    return this.postPrivate('api/v1/margin/withdrawMargin', params);
  }

  addFuturesMarginManually(params: any): Promise<any> {
    return this.postPrivate('api/v1/position/margin/deposit-margin', params);
  }

  /**
   *
   * Futures risk limit
   *
   */

  getFuturesRiskLimitLevel(params: { symbol: string }): Promise<any> {
    return this.get(`api/v1/contracts/risk-limit/${params.symbol}`);
  }

  modifyFuturesRiskLimitLevel(params: any): Promise<any> {
    return this.postPrivate('api/v1/position/risk-limit-level/change', params);
  }

  /**
   *
   * Futures funding fees
   *
   */

  getFuturesFundingRate(params: { symbol: string }): Promise<any> {
    return this.get(`api/v1/funding-rate/${params.symbol}/current`);
  }

  getFuturesPublicFundingHistory(params: any): Promise<any> {
    return this.get('api/v1/contract/funding-rates', params);
  }

  getFuturesPrivateFundingHistory(params: any): Promise<any> {
    return this.getPrivate('api/v1/funding-history', params);
  }
}
