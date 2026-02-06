import { AxiosRequestConfig } from 'axios';

import { BaseRestClient } from './lib/BaseRestClient.js';
import {
  REST_CLIENT_TYPE_ENUM,
  RestClientOptions,
  RestClientType,
} from './lib/requestUtils.js';
import {
  BatchCancelOrdersRequestUTA,
  BatchPlaceOrderRequestUTA,
  CancelOrderRequestUTA,
  FlexTransferRequestUTA,
  GetAccountLedgerRequestUTA,
  GetAccountPositionTiersRequestUTA,
  GetAnnouncementsRequestUTA,
  GetClassicAccountRequestUTA,
  GetCurrencyRequestUTA,
  GetCurrentFundingRateRequestUTA,
  GetDCPRequestUTA,
  GetDepositAddressRequestUTA,
  GetFeeRateRequestUTA,
  GetHistoryFundingRateRequestUTA,
  GetInterestHistoryRequestUTA,
  GetKlinesRequestUTA,
  GetOpenOrderListRequestUTA,
  GetOrderBookRequestUTA,
  GetOrderDetailsRequestUTA,
  GetOrderHistoryRequestUTA,
  GetPositionListRequestUTA,
  GetPositionsHistoryRequestUTA,
  GetServiceStatusRequestUTA,
  GetSubAccountRequestUTA,
  GetSymbolRequestUTA,
  GetTickerRequestUTA,
  GetTradeHistoryRequestUTA,
  GetTradesRequestUTA,
  GetTransferQuotasRequestUTA,
  ModifyLeverageRequestUTA,
  PlaceOrderRequestUTA,
  SetAccountModeRequestUTA,
  SetDCPRequestUTA,
  SetSubAccountTransferPermissionRequestUTA,
} from './types/request/uta-types.js';
import { APISuccessResponse } from './types/response/shared.types.js';
import {
  BatchCancelOrdersResponseUTA,
  BatchPlaceOrderResponseUTA,
  CancelOrderResponseUTA,
  DCPResponseUTA,
  DepositAddressUTA,
  FlexTransferResponseUTA,
  GetAccountLedgerResponseClassicUTA,
  GetAccountLedgerResponseUTA,
  GetAccountModeResponseUTA,
  GetAccountOverviewResponseUTA,
  GetAnnouncementsResponseUTA,
  GetClassicAccountResponseUTA,
  GetCrossMarginConfigResponseUTA,
  GetCurrencyResponseUTA,
  GetCurrentFundingRateResponseUTA,
  GetFeeRateResponseUTA,
  GetHistoryFundingRateResponseUTA,
  GetInterestHistoryResponseUTA,
  GetKlinesResponseUTA,
  GetOpenOrderListResponseUTA,
  GetOrderBookResponseUTA,
  GetOrderHistoryResponseUTA,
  GetPositionsHistoryResponseUTA,
  GetServiceStatusResponseUTA,
  GetSubAccountResponseUTA,
  GetSymbolResponseUTA,
  GetTickerResponseUTA,
  GetTradeHistoryResponseUTA,
  GetTradesResponseUTA,
  GetTransferQuotasResponseUTA,
  OrderDetailsUTA,
  PlaceOrderResponseUTA,
  PositionTierUTA,
  PositionUTA,
  SubAccountTransferPermissionUTA,
} from './types/response/uta-types.js';

/**
 * Unified Trading Account Client
 *
 * This client provides access to the Unified Trading Account API endpoints
 * that unify market data access across Spot, Futures, and Margin trading.
 */
export class UnifiedAPIClient extends BaseRestClient {
  getClientType(): RestClientType {
    return REST_CLIENT_TYPE_ENUM.unifiedTradingAccount;
  }

  /**
   *
   * REST - Unified Trading Account - Market Data
   *
   */

  /**
   * Get Announcements
   * This interface can obtain the latest news announcements, and the default
   * page search is for announcements within a month.
   */
  getAnnouncements(
    params?: GetAnnouncementsRequestUTA,
  ): Promise<APISuccessResponse<GetAnnouncementsResponseUTA>> {
    return this.get('api/ua/v1/market/announcement', params);
  }

  /**
   * Get Currency
   * Request the currency details of a specified currency via this endpoint.
   */
  getCurrency(
    params?: GetCurrencyRequestUTA,
  ): Promise<APISuccessResponse<GetCurrencyResponseUTA>> {
    return this.get('api/ua/v1/market/currency', params);
  }

  /**
   * Get Symbol
   * Request a list of available currency pairs for trading via this endpoint.
   */
  getSymbols(
    params: GetSymbolRequestUTA,
  ): Promise<APISuccessResponse<GetSymbolResponseUTA>> {
    return this.get('api/ua/v1/market/instrument', params);
  }

  /**
   * Get Ticker
   * Request market tickers for the trading pairs in the market (including 24h volume).
   */
  getTickers(
    params: GetTickerRequestUTA,
  ): Promise<APISuccessResponse<GetTickerResponseUTA>> {
    return this.get('api/ua/v1/market/ticker', params);
  }

  /**
   * Get Trades
   * Request via this endpoint to get the latest 100 public trades of the specified symbol.
   */
  getTrades(
    params: GetTradesRequestUTA,
  ): Promise<APISuccessResponse<GetTradesResponseUTA>> {
    return this.get('api/ua/v1/market/trade', params);
  }

  /**
   * Get OrderBook
   * Query order book depth information (aggregated by price).
   */
  getOrderBook(
    params: GetOrderBookRequestUTA,
  ): Promise<APISuccessResponse<GetOrderBookResponseUTA>> {
    return this.get('api/ua/v1/market/orderbook', params);
  }

  /**
   * Get Klines
   * Get the Kline of the symbol. Data are returned in grouped buckets based on requested type.
   */
  getKlines(
    params: GetKlinesRequestUTA,
  ): Promise<APISuccessResponse<GetKlinesResponseUTA>> {
    return this.get('api/ua/v1/market/kline', params);
  }

  /**
   * Get Current Funding Rate
   * Get current Futures funding fee rate.
   */
  getCurrentFundingRate(
    params: GetCurrentFundingRateRequestUTA,
  ): Promise<APISuccessResponse<GetCurrentFundingRateResponseUTA>> {
    return this.get('api/ua/v1/market/funding-rate', params);
  }

  /**
   * Get History Funding Rate
   * Query the Futures funding rate at each settlement time point within a certain time range.
   */
  getHistoryFundingRate(
    params: GetHistoryFundingRateRequestUTA,
  ): Promise<APISuccessResponse<GetHistoryFundingRateResponseUTA>> {
    return this.get('api/ua/v1/market/funding-rate-history', params);
  }

  /**
   * Get Cross Margin Config
   * Request the configure info of the 'spot cross margin' via this endpoint.
   */
  getCrossMarginConfig(): Promise<
    APISuccessResponse<GetCrossMarginConfigResponseUTA>
  > {
    return this.get('api/ua/v1/market/cross-config');
  }

  /**
   * Get Service Status
   * Get the service status.
   */
  getServiceStatus(
    params: GetServiceStatusRequestUTA,
  ): Promise<APISuccessResponse<GetServiceStatusResponseUTA>> {
    return this.get('api/ua/v1/server/status', params);
  }

  /**
   *
   * REST - Unified Trading Account - Account
   *
   */

  /**
   * Get Account (Classic)
   * Get information for Classic Account (FUNDING, SPOT, FUTURES, CROSS, ISOLATED).
   * Note: AccountType enum value changed from TRADING to SPOT as of 2026.01.17.
   */
  getClassicAccount(
    params: GetClassicAccountRequestUTA,
  ): Promise<APISuccessResponse<GetClassicAccountResponseUTA>> {
    return this.getPrivate('api/ua/v1/account/balance', params);
  }

  /**
   * Get Account (UTA)
   * Get information for Unified Trading Account.
   */
  getAccount(): Promise<APISuccessResponse<GetClassicAccountResponseUTA>> {
    return this.getPrivate('api/ua/v1/unified/account/balance');
  }

  /**
   * Get Account Overview (UTA)
   * Get account overview for Unified Trading Account.
   */
  getAccountOverview(): Promise<
    APISuccessResponse<GetAccountOverviewResponseUTA>
  > {
    return this.getPrivate('api/ua/v1/unified/account/overview');
  }

  /**
   * Get Sub Account
   * Request sub account info via this endpoint.
   */
  getSubAccount(
    params?: GetSubAccountRequestUTA,
  ): Promise<APISuccessResponse<GetSubAccountResponseUTA>> {
    return this.getPrivate('api/ua/v1/sub-account/balance', params);
  }

  /**
   * Get Transfer Quotas
   * This endpoint returns the transferable balance of a specified account.
   * Note: AccountType enum value changed from TRADING to SPOT as of 2026.01.17.
   */
  getTransferQuotas(
    params: GetTransferQuotasRequestUTA,
  ): Promise<APISuccessResponse<GetTransferQuotasResponseUTA>> {
    return this.getPrivate('api/ua/v1/account/transfer-quota', params);
  }

  /**
   * Flex Transfer
   * This interface can be used for transfers between master- and sub-accounts and transfers.
   * Note: AccountType enum value changed from TRADING to SPOT as of 2026.01.17.
   */
  flexTransfer(
    params: FlexTransferRequestUTA,
  ): Promise<APISuccessResponse<FlexTransferResponseUTA>> {
    return this.postPrivate('api/ua/v1/account/transfer', params);
  }

  /**
   * Set Sub Account Transfer Permission
   * This endpoint supports setting whether the specified sub-account needs to open the SUB_TO_SUB transfer permission.
   */
  setSubAccountTransferPermission(
    params: SetSubAccountTransferPermissionRequestUTA,
  ): Promise<APISuccessResponse<SubAccountTransferPermissionUTA[]>> {
    return this.postPrivate('api/ua/v1/sub-account/canTransferOut', params);
  }

  /**
   * Get Account Mode
   * This interface supports query the list of unified and classic sub-accounts and current account mode.
   */
  getAccountMode(): Promise<APISuccessResponse<GetAccountModeResponseUTA>> {
    return this.getPrivate('api/ua/v1/account/mode');
  }

  /**
   * Set Account Mode
   * This interface supports set account mode to UTA.
   */
  setAccountMode(
    params: SetAccountModeRequestUTA,
  ): Promise<APISuccessResponse<null>> {
    return this.postPrivate('api/ua/v1/account/mode', params);
  }

  /**
   * Get Fee Rate
   * This interface is for the trading pair's actual fee rate.
   * You can inquire about fee rates of 10 trading pairs each time at most for Spot.
   * Futures only supports 1 symbol at a time.
   */
  getFeeRate(
    params: GetFeeRateRequestUTA,
  ): Promise<APISuccessResponse<GetFeeRateResponseUTA>> {
    return this.getPrivate('api/ua/v1/user/fee-rate', params);
  }

  /**
   * Get Account Ledger
   * This API endpoint returns all transfer (in and out) records and supports multi-coin queries.
   * The query results are sorted in descending order by createdAt and ID.
   * Note: AccountType enum value changed from TRADING to SPOT as of 2026.01.17.
   * Note: direction values unified to uppercase IN/OUT as of 2026.01.17.
   * Note: For Futures - id changed from Number to String, balance/amount changed from Number to String as of 2026.01.17.
   * Note: ts standardized to nanoseconds as of 2026.01.12.
   */
  getAccountLedger(
    params: GetAccountLedgerRequestUTA,
  ): Promise<
    APISuccessResponse<
      GetAccountLedgerResponseUTA | GetAccountLedgerResponseClassicUTA
    >
  > {
    return this.getPrivate('api/ua/v1/account/ledger', params);
  }

  /**
   * Get Interest History (UTA)
   * Request the interest records via this endpoint.
   */
  getInterestHistory(
    params: GetInterestHistoryRequestUTA,
  ): Promise<APISuccessResponse<GetInterestHistoryResponseUTA>> {
    return this.getPrivate('api/ua/v1/account/interest-history', params);
  }

  /**
   * Modify Leverage (UTA)
   * This interface supports modify leverage of the specified symbol.
   */
  modifyLeverage(
    params: ModifyLeverageRequestUTA,
  ): Promise<APISuccessResponse<null>> {
    return this.postPrivate(
      'api/ua/v1/unified/account/modify-leverage',
      params,
    );
  }

  /**
   * Get Deposit Address
   * Return a deposit address; when both currency and chain are provided,
   * the address will be created if it does not exist.
   * URL unified to GET /api/ua/v1/asset/deposit/address as of 2026.01.17.
   */
  getDepositAddress(
    params: GetDepositAddressRequestUTA,
  ): Promise<APISuccessResponse<DepositAddressUTA[]>> {
    return this.getPrivate('api/ua/v1/asset/deposit/address', params);
  }

  /**
   *
   * REST - Unified Trading Account - Orders
   *
   */

  /**
   * Place Order
   * This interface can be used to place orders.
   * Supports RPI (Retail Price Improvement) orders for Futures as of 2025.01.02.
   * Note: timeInForce supports 'RPI' value for Futures only (Phase 1).
   * Note: For Classic mode, tradeType is required in query param.
   * Note: For Unified mode, tradeType should not be in query param.
   */
  placeOrder(
    params: PlaceOrderRequestUTA,
    accountMode: 'classic' | 'unified' = 'unified',
  ): Promise<APISuccessResponse<PlaceOrderResponseUTA>> {
    const { tradeType, ...bodyParams } = params;
    const url =
      accountMode === 'classic'
        ? `api/ua/v1/${accountMode}/order/place?tradeType=${tradeType}`
        : `api/ua/v1/${accountMode}/order/place`;
    return this.postPrivate(url, bodyParams);
  }

  /**
   * Batch Place Order (Classic)
   * This interface can be used for placing batch orders.
   * URL changed to /api/ua/v1/{accountMode}/order/place-batch as of 2026.01.17.
   * Note: timeInForce supports 'RPI' value for Futures as of 2025.01.02.
   */
  batchPlaceOrder(
    params: BatchPlaceOrderRequestUTA,
    accountMode: 'classic' | 'unified' = 'classic',
  ): Promise<APISuccessResponse<BatchPlaceOrderResponseUTA>> {
    const url =
      accountMode === 'classic'
        ? `api/ua/v1/${accountMode}/order/place-batch?tradeType=${params.tradeType}`
        : `api/ua/v1/${accountMode}/order/place-batch`;
    return this.postPrivate(url, params);
  }

  /**
   * Get Order Details
   * This interface can be used getting single order details.
   * Note: timeInForce returns 'RPI' value for Futures RPI orders as of 2025.01.02.
   * Note: status changed from String to Number for UTA as of 2026.01.17.
   * Note: orderTime/updatedTime standardized to nanoseconds as of 2026.01.12.
   */
  getOrderDetails(
    params: GetOrderDetailsRequestUTA,
    accountMode: 'classic' | 'unified' = 'unified',
  ): Promise<APISuccessResponse<OrderDetailsUTA>> {
    return this.getPrivate(`api/ua/v1/${accountMode}/order/detail`, params);
  }

  /**
   * Get Open Order List
   * This interface can be used getting open order list.
   * Note: timeInForce returns 'RPI' value for Futures RPI orders as of 2025.01.02.
   * Note: status changed from String to Number for UTA as of 2026.01.17.
   * Note: orderTime/updatedTime standardized to nanoseconds as of 2026.01.12.
   */
  getOpenOrderList(
    params: GetOpenOrderListRequestUTA,
    accountMode: 'classic' | 'unified' = 'unified',
  ): Promise<APISuccessResponse<GetOpenOrderListResponseUTA>> {
    return this.getPrivate(`api/ua/v1/${accountMode}/order/open-list`, params);
  }

  /**
   * Get Order History
   * This interface can be used for getting order history.
   * Note: timeInForce returns 'RPI' value for Futures RPI orders as of 2025.01.02.
   * Note: status changed from String to Number for UTA as of 2026.01.17.
   * Note: orderTime/updatedTime standardized to nanoseconds as of 2026.01.12.
   */
  getOrderHistory(
    params: GetOrderHistoryRequestUTA,
    accountMode: 'classic' | 'unified' = 'unified',
  ): Promise<APISuccessResponse<GetOrderHistoryResponseUTA>> {
    return this.getPrivate(`api/ua/v1/${accountMode}/order/history`, params);
  }

  /**
   * Get Trade History
   * This interface can be used for getting trade execution history.
   * Note: executionTime standardized to nanoseconds as of 2026.01.12.
   * Note: isRpiTrade added for Futures as of 2025.01.02.
   */
  getTradeHistory(
    params: GetTradeHistoryRequestUTA,
    accountMode: 'classic' | 'unified' = 'unified',
  ): Promise<APISuccessResponse<GetTradeHistoryResponseUTA>> {
    return this.getPrivate(`api/ua/v1/${accountMode}/order/execution`, params);
  }

  /**
   * Cancel Order
   * This interface can be used to cancel orders.
   * Note: ts (timestamp in nanoseconds) only effective for unified account mode.
   */
  cancelOrder(
    params: CancelOrderRequestUTA,
    accountMode: 'classic' | 'unified' = 'unified',
  ): Promise<APISuccessResponse<CancelOrderResponseUTA>> {
    const url =
      accountMode === 'classic'
        ? `api/ua/v1/${accountMode}/order/cancel?tradeType=${params.tradeType}`
        : `api/ua/v1/${accountMode}/order/cancel`;
    return this.postPrivate(url, params);
  }

  /**
   * Batch Cancel Orders
   * This interface can be used for batch cancel orders (maximum 20 orders).
   * Note: tradeType required for Classic accounts only; ignored in UTA (UNIFIED) mode.
   * Note: ts (timestamp in nanoseconds) not supported for classic accounts.
   */
  batchCancelOrders(
    params: BatchCancelOrdersRequestUTA,
    accountMode: 'classic' | 'unified' = 'unified',
  ): Promise<APISuccessResponse<BatchCancelOrdersResponseUTA>> {
    const url =
      accountMode === 'classic'
        ? `api/ua/v1/${accountMode}/order/cancel-batch?tradeType=${params.tradeType}`
        : `api/ua/v1/${accountMode}/order/cancel-batch`;
    return this.postPrivate(url, params);
  }

  /**
   * Set DCP (Disconnection Protect / Deadman Switch) - Classic Only
   * Set automatic order cancellation after specified time.
   * Call this interface to automatically cancel all orders of the set trading pair after the specified time.
   * Note: Order cancellation delay is between 0 and 10 seconds.
   * Note: timeout range: -1 (unset) or 5 <= timeout <= 86400 seconds.
   */
  setDCP(
    params: SetDCPRequestUTA,
  ): Promise<APISuccessResponse<DCPResponseUTA>> {
    return this.postPrivate('api/ua/v1/dcp/set', params);
  }

  /**
   * Get DCP (Disconnection Protect / Deadman Switch) - Classic Only
   * Get automatic order cancellation settings.
   * If data is empty, it means DCP is not set.
   */
  getDCP(
    params: GetDCPRequestUTA,
  ): Promise<APISuccessResponse<DCPResponseUTA>> {
    return this.getPrivate('api/ua/v1/dcp/query', params);
  }

  /**
   *
   * REST - Unified Trading Account - Positions
   *
   */

  /**
   * Get Position List (UTA)
   * Get the position details of all open positions.
   * Note: creationTime standardized to nanoseconds as of 2026.01.12.
   */
  getPositionList(
    params?: GetPositionListRequestUTA,
  ): Promise<APISuccessResponse<PositionUTA[]>> {
    return this.getPrivate('api/ua/v1/unified/position/open-list', params);
  }

  /**
   * Get Positions History (UTA)
   * Query position history information records.
   * Note: Data retained for up to 3 months.
   * Note: Each query limited to 7 days time range.
   * Note: creationTime and closingTime standardized to nanoseconds as of 2026.01.12.
   */
  getPositionsHistory(
    params?: GetPositionsHistoryRequestUTA,
  ): Promise<APISuccessResponse<GetPositionsHistoryResponseUTA>> {
    return this.getPrivate('api/ua/v1/position/history', params);
  }

  /**
   * Get Account Position Tiers
   * Request account position tiers (risk limit) info.
   * Note: Currently only queries of classic - futures isolated margin are supported.
   */
  getAccountPositionTiers(
    params: GetAccountPositionTiersRequestUTA,
    accountMode: 'classic' | 'unified' = 'classic',
  ): Promise<APISuccessResponse<PositionTierUTA[]>> {
    return this.getPrivate(`api/ua/v1/${accountMode}/position/tiers`, params);
  }
}
