import { AxiosRequestConfig } from 'axios';
import { nanoid } from 'nanoid';

import { BaseRestClient } from './lib/BaseRestClient.js';
import {
  REST_CLIENT_TYPE_ENUM,
  RestClientOptions,
  RestClientType,
} from './lib/requestUtils.js';
import {
  AccountHFMarginTransactionsRequest,
  AccountHFTransactionsRequest,
  CreateSubAccountAPIRequest,
  CreateSubAccountRequest,
  DeleteSubAccountAPIRequest,
  GetBalancesRequest,
  GetSpotTransactionsRequest,
  UpdateSubAccountAPIRequest,
} from './types/request/spot-account.js';
import {
  GetEarnFixedIncomeHoldAssetsRequest,
  GetEarnRedeemPreviewRequest,
  InitiateRedemptionRequest,
  SubscribeEarnFixedIncomeRequest,
} from './types/request/spot-earn.js';
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
} from './types/request/spot-funding.js';
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
} from './types/request/spot-margin-trading.js';
import { GetAnnouncementsRequest } from './types/request/spot-misc.js';
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
  SubmitMultipleOrdersRequest,
  SubmitOCOOrderRequest,
  SubmitOrderRequest,
  SubmitStopOrderRequest,
} from './types/request/spot-trading.js';
import {
  APISuccessResponse,
  ServiceStatus,
} from './types/response/shared.types.js';
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
} from './types/response/spot-account.js';
import {
  EarnFixedIncomeHoldAssets,
  EarnProduct,
  GetEarnRedeemPreviewResponse,
  InitiateRedemptionResponse,
  SubscribeEarnFixedIncomeResponse,
} from './types/response/spot-earn.js';
import {
  CreateDepositAddressV3Response,
  DepositAddress,
  DepositAddressV2,
  DepositAddressV3,
  Deposits,
  HistoricalWithdrawalsV1,
  IsolatedMarginBalance,
  MarginAccountBalance,
  MarginBalance,
  TransferableFunds,
  V1HistoricalDeposits,
  WithdrawalQuotas,
  Withdrawals,
} from './types/response/spot-funding.js';
import {
  HFMarginOrder,
  HFMarginTransactionRecord,
  IsolatedMarginAccountInfo,
  IsolatedMarginSymbolsConfig,
  LendingCurrencyV3,
  LendingRedemption,
  MarginActivePairsV3,
  MarginBorrowHistoryV3,
  MarginConfigInfo,
  MarginInterestRecords,
  MarginLevTokenInfo,
  MarginMarkPrice,
  MarginOrderV3,
  MarginRepayHistoryV3,
  MarginRiskLimit,
  MarginSubmitOrderV3Response,
  SingleIsolatedMarginAccountInfo,
  SubmitMarginOrderResponse,
} from './types/response/spot-margin-trading.js';
import { Announcements } from './types/response/spot-misc.js';
import {
  AllTickers,
  AutoCancelHFOrderSettingQueryResponse,
  CallAuctionInfo,
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
} from './types/response/spot-trading.js';
import {
  DiscountRateConfig,
  OtcLoan,
  OtcLoanAccount,
} from './types/response/spot-vip.js';
import { WsConnectionInfo } from './types/response/ws.js';

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

  getMyIp(): Promise<APISuccessResponse<number>> {
    return this.get('api/v1/ip');
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

  /**
   * Get Account Summary Info
   *
   * This endpoint can be used to obtain account summary information.
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
   * This endpoint determines whether the current user is a spot high-frequency user or a spot low-frequency user.
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

  /**
   * Get Account - Cross Margin
   *
   * Request via this endpoint to get the info of the cross margin account.
   */
  getMarginBalance(
    params?: GetMarginBalanceRequest,
  ): Promise<APISuccessResponse<MarginBalance>> {
    return this.getPrivate('api/v3/margin/accounts', params);
  }

  /**
   * Get Account - Isolated Margin
   *
   * Request via this endpoint to get the info of the isolated margin account.
   */
  getIsolatedMarginBalance(
    params?: GetIsolatedMarginBalanceRequest,
  ): Promise<APISuccessResponse<IsolatedMarginBalance[]>> {
    return this.getPrivate('api/v3/isolated/accounts', params);
  }

  /**
   * Get Account Ledgers - Spot/Margin
   *
   * This endpoint is for transaction records from all types of your accounts, supporting inquiry of various currencies.
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
  /**
   * Add SubAccount Margin Permission
   *
   * This endpoint can be used to add sub-accounts Margin permission.
   * Before using this endpoints, you need to ensure that the master account apikey has Margin permissions and the Margin function has been activated.
   */
  enableSubAccountMargin(params: { uid: string }): Promise<boolean | null> {
    return this.postPrivate('api/v3/sub/user/margin/enable', params);
  }

  /**
   * Add SubAccount Futures Permission
   *
   * This endpoint can be used to add sub-accounts Futures permission.
   * Before using this endpoints, you need to ensure that the master account apikey has Futures permissions and the Futures function has been activated.
   */
  enableSubAccountFutures(params: { uid: string }): Promise<boolean | null> {
    return this.postPrivate('api/v3/sub/user/futures/enable', params);
  }

  /**
   * Get SubAccount List - Summary Info
   *
   * This endpoint can be used to get a paginated list of sub-accounts. Pagination is required.
   */
  getSubAccountsV2(params?: {
    currentPage?: number;
    pageSize?: number;
  }): Promise<APISuccessResponse<SubAccountsV2>> {
    return this.getPrivate('api/v2/sub/user', params);
  }

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the getSubAccountBalancesV2() endpoint instead of this endpoint
   */
  getSubAccountBalance(params: {
    subUserId: string;
    includeBaseAmount: boolean;
  }): Promise<APISuccessResponse<SubAccountBalance>> {
    return this.getPrivate(`api/v1/sub-accounts/${params.subUserId}`, params);
  }

  /**
   * Get SubAccount List - Spot Balance(V2)
   *
   * This endpoint can be used to get paginated Spot sub-account information.
   * Pagination is required.
   */
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

  /**
   * Add SubAccount API
   *
   * This endpoint can be used to create APIs for sub-accounts.
   */
  createSubAPI(
    params: CreateSubAccountAPIRequest,
  ): Promise<APISuccessResponse<CreateSubAPI>> {
    return this.postPrivate('api/v1/sub/api-key', params);
  }

  /**
   * Modify SubAccount API
   *
   * This endpoint can be used to update APIs for sub-accounts.
   */
  updateSubAPI(
    params: UpdateSubAccountAPIRequest,
  ): Promise<APISuccessResponse<UpdateSubAPI>> {
    return this.postPrivate('api/v1/sub/api-key/update', params);
  }

  /**
   * Get SubAccount API List
   *
   * This endpoint can be used to obtain a list of APIs pertaining to a sub-account.
   * (Not contain ND Broker Sub Account)
   */
  getSubAPIs(params: {
    apiKey?: string;
    subName: string;
  }): Promise<APISuccessResponse<SubAccountAPIInfo[]>> {
    return this.getPrivate('api/v1/sub/api-key', params);
  }

  /**
   * Delete SubAccount API
   *
   * This endpoint can be used to delete an API for a sub-account.
   */
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

  /**
   * Add Deposit Address(V3)
   *
   * Request via this endpoint to create a deposit address for a currency you intend to deposit.
   */
  createDepositAddressV3(
    params: CreateDepositAddressV3Request,
  ): Promise<APISuccessResponse<CreateDepositAddressV3Response>> {
    return this.postPrivate('api/v3/deposit-address/create', params);
  }

  /**
   * Get Deposit Address(V3)
   *
   * Get all deposit addresses for the currency you intend to deposit.
   * If the returned data is empty, you may need to Add Deposit Address first.
   */
  getDepositAddressesV3(params: {
    currency: string;
    amount?: string;
    chain?: string;
  }): Promise<APISuccessResponse<DepositAddressV3[]>> {
    return this.getPrivate('api/v3/deposit-addresses', params);
  }

  /**
   * Get Deposit History
   *
   * Request via this endpoint to get deposit list Items are paginated and sorted to show the latest first.
   * See the Pagination section for retrieving additional entries after the first page.
   */
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

  /**
   * Get Withdrawal Quotas
   *
   * This endpoint can obtain the withdrawal quotas information of this currency.
   */
  getWithdrawalQuotas(params: {
    currency: string;
    chain?: string;
  }): Promise<APISuccessResponse<WithdrawalQuotas>> {
    return this.getPrivate('api/v1/withdrawals/quotas', params);
  }

  /**
   * Withdraw(V3)
   *
   * Use this endpoint to withdraw the specified currency
   */
  submitWithdrawV3(params: SubmitWithdrawV3Request): Promise<
    APISuccessResponse<{
      withdrawalId: string;
    }>
  > {
    return this.postPrivate('api/v3/withdrawals', params);
  }

  /**
   * Cancel Withdrawal
   *
   * This endpoint can cancel the withdrawal, Only withdrawals requests of PROCESSING status could be canceled.
   */
  cancelWithdrawal(params: {
    withdrawalId: string;
  }): Promise<APISuccessResponse<string | null>> {
    return this.deletePrivate(`api/v1/withdrawals/${params.withdrawalId}`);
  }

  /**
   * Get Withdrawal History
   *
   * Request via this endpoint to get withdrawal list Items are paginated and sorted to show the latest first.
   * See the Pagination section for retrieving additional entries after the first page.
   */
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

  /**
   * Get Transfer Quotas
   *
   * This endpoint returns the transferable balance of a specified account.
   */
  getTransferable(
    params: GetTransferableRequest,
  ): Promise<APISuccessResponse<TransferableFunds>> {
    return this.getPrivate('api/v1/accounts/transferable', params);
  }

  /**
   * Flex Transfer
   *
   * This endpoint can be used for transfers between master and sub accounts and inner transfers
   */
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

  /**
   * Get Basic Fee - Spot/Margin
   *
   * This endpoint is for the spot/margin basic fee rate of users
   */
  getBasicUserFee(params: { currencyType: number }): Promise<
    APISuccessResponse<{
      takerFeeRate: string;
      makerFeeRate: string;
    }>
  > {
    return this.getPrivate('api/v1/base-fee', params);
  }

  /**
   * Get Actual Fee - Spot/Margin
   *
   * This endpoint is for the actual fee rate of the trading pair.
   * You can inquire about fee rates of 10 trading pairs each time at most.
   * The fee rate of your sub-account is the same as that of the master account.
   */
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

  /**
   * Get Announcements
   *
   * This endpoint can obtain the latest news announcements, and the default page search is for announcements within a month.
   */
  getAnnouncements(
    params?: GetAnnouncementsRequest,
  ): Promise<APISuccessResponse<Announcements>> {
    return this.get('api/v3/announcements', params);
  }

  /**
   * Get Currency
   *
   * Request via this endpoint to get the currency details of a specified currency.
   */
  getCurrency(params: {
    currency: string;
    chain?: string;
  }): Promise<APISuccessResponse<CurrencyInfo>> {
    return this.get(`api/v3/currencies/${params.currency}`, params);
  }

  /**
   * Get All Currencies
   *
   * Request via this endpoint to get the currency list. Not all currencies currently can be used for trading.
   */
  getCurrencies(): Promise<APISuccessResponse<CurrencyInfo[]>> {
    return this.get('api/v3/currencies');
  }

  /**
   * Get Symbol
   *
   * Request via this endpoint to get detail currency pairs for trading.
   * If you want to get the market information of the trading symbol, please use Get All Tickers.
   */
  getSymbol(params: {
    symbol: string;
  }): Promise<APISuccessResponse<SymbolInfo>> {
    return this.get(`api/v2/symbols/${params.symbol}`);
  }

  /**
   * Get All Symbols
   *
   * Request via this endpoint to get detail currency pairs for trading.
   * If you want to get the market information of the trading symbol, please use Get All Tickers.
   */
  getSymbols(params?: {
    market?: string;
  }): Promise<APISuccessResponse<SymbolInfo[]>> {
    return this.get('api/v2/symbols', params);
  }

  /**
   * Get Ticker
   *
   * Request via this endpoint to get Level 1 Market Data.
   * The returned value includes the best bid price and size,
   * the best ask price and size as well as the last traded price and the last traded size.
   */
  getTicker(params: { symbol: string }): Promise<APISuccessResponse<Ticker>> {
    return this.get(`api/v1/market/orderbook/level1`, params);
  }

  /**
   * Get All Tickers
   *
   * Request market tickers for all the trading pairs in the market (including 24h volume), takes a snapshot every 2 seconds.
   */
  getTickers(): Promise<APISuccessResponse<AllTickers>> {
    return this.get('api/v1/market/allTickers');
  }

  /**
   * Get Trade History
   *
   * Request via this endpoint to get the trade history of the specified symbol,
   * the returned quantity is the last 100 transaction records.
   */

  getTradeHistories(params: {
    symbol: string;
  }): Promise<APISuccessResponse<TradeHistory[]>> {
    return this.get('api/v1/market/histories', params);
  }

  /**
   * Get Klines
   *
   * Get the Kline of the symbol.
   * Data are returned in grouped buckets based on requested type.
   */
  getKlines(
    params: GetSpotKlinesRequest,
  ): Promise<APISuccessResponse<Kline[]>> {
    return this.get('api/v1/market/candles', params);
  }

  /**
   * Get Part OrderBook
   *
   * Query for part orderbook depth data. Level 20(aggregated by price)
   */
  getOrderBookLevel20(params: {
    symbol: string;
  }): Promise<APISuccessResponse<OrderBookLevel>> {
    return this.get(`api/v1/market/orderbook/level2_20`, params);
  }

  /**
   * Get Part OrderBook
   *
   * Query for part orderbook depth data. Level 100(aggregated by price)
   */
  getOrderBookLevel100(params: {
    symbol: string;
  }): Promise<APISuccessResponse<OrderBookLevel>> {
    return this.get(`api/v1/market/orderbook/level2_100`, params);
  }

  /**
   * Get Full OrderBook
   *
   * Query for full orderbook depth data. (aggregated by price)
   */
  getFullOrderBook(params: {
    symbol: string;
  }): Promise<APISuccessResponse<OrderBookLevel>> {
    return this.getPrivate('api/v3/market/orderbook/level2', params);
  }

  /**
   * Get Call Auction Part OrderBook
   *
   * Query for call auction part orderbook depth data (aggregated by price).
   * It is recommended that you submit requests via this endpoint as the system response will be faster and consume less traffic.
   */
  getCallAuctionPartOrderBook(params: {
    symbol: string;
    size: 20 | 100;
  }): Promise<APISuccessResponse<OrderBookLevel>> {
    const { symbol, size } = params;
    return this.get(`api/v1/market/orderbook/callauction/level2_${size}`, {
      symbol,
    });
  }

  /**
   * Get Call Auction Info
   *
   * Get call auction data. This endpoint will return the following information for the specified symbol
   * during the call auction phase: estimated transaction price, estimated transaction quantity,
   * bid price range, and ask price range.
   */
  getCallAuctionInfo(params: {
    symbol: string;
  }): Promise<APISuccessResponse<CallAuctionInfo>> {
    return this.get('api/v1/market/callauctionData', params);
  }

  /**
   * Get Fiat Price
   *
   * Request via this endpoint to get the fiat price of the currencies for the available trading pairs.
   */
  getFiatPrice(params?: { base?: string; currencies?: string }): Promise<any> {
    return this.get('api/v1/prices', params);
  }

  /**
   * Get 24hr Stats
   *
   * Request via this endpoint to get the statistics of the specified ticker in the last 24 hours.
   */
  get24hrStats(params: {
    symbol: string;
  }): Promise<APISuccessResponse<Symbol24hrStats>> {
    return this.get('api/v1/market/stats', params);
  }

  /**
   * Get Market List
   *
   * Request via this endpoint to get the transaction currency for the entire trading market.
   */
  getMarkets(): Promise<APISuccessResponse<string[]>> {
    return this.get('api/v1/markets');
  }

  /**
   *
   * REST - SPOT TRADING - Orders
   *
   */

  /**
   * Add Order
   *
   * Place order to the Spot trading system, you can place two major types of orders: limit and market.
   * Orders can only be placed if your account has sufficient funds. Once an order is placed, your funds will be put on hold for the duration of the order.
   * The amount of funds on hold depends on the order type and parameters specified.
   */
  submitHFOrder(params: SubmitHFOrderRequest): Promise<
    APISuccessResponse<{
      orderId: string;
      clientOid: string;
    }>
  > {
    return this.postPrivate('api/v1/hf/orders', params);
  }

  /**
   * Add Order Sync
   *
   * Place order to the spot trading system
   *
   * The difference between this endpoint and "SubmitHFOrder()" is that this endpoint will synchronously return the order information after the order matching is completed.
   */
  submitHFOrderSync(
    params: SubmitHFOrderRequest,
  ): Promise<APISuccessResponse<SubmitHFOrderSyncResponse>> {
    return this.postPrivate('api/v1/hf/orders/sync', params);
  }

  /**
   * Add Order Test
   *
   * Order test endpoint, the request parameters and return parameters of this endpoint are exactly the same as the order endpoint,
   * and can be used to verify whether the signature is correct and other operations. After placing an order, the order will not enter the matching system, and the order cannot be queried.
   */
  submitHFOrderTest(params: SubmitHFOrderRequest): Promise<any> {
    return this.postPrivate('api/v1/hf/orders/test', params);
  }

  /**
   * Batch Add Orders
   *
   * This endpoint supports sequential batch order placement from a single endpoint. A maximum of 20 orders can be placed simultaneously.
   */
  submitHFMultipleOrders(params: {
    orderList: SubmitHFOrderRequest[];
  }): Promise<APISuccessResponse<SubmitMultipleHFOrdersResponse[]>> {
    return this.postPrivate('api/v1/hf/orders/multi', params);
  }

  /**
   * Batch Add Orders Sync
   *
   * This endpoint supports sequential batch order placement from a single endpoint. A maximum of 20 orders can be placed simultaneously.
   * The difference between this endpoint and "submitHFMultipleOrders()" is that this endpoint will synchronously return the order information after the order matching is completed.
   */
  submitHFMultipleOrdersSync(params: {
    orderList: SubmitHFOrderRequest[];
  }): Promise<APISuccessResponse<SubmitMultipleHFOrdersSyncResponse[]>> {
    return this.postPrivate('api/v1/hf/orders/multi/sync', params);
  }

  /**
   * Cancel Order By OrderId
   *
   * This endpoint can be used to cancel a spot order by orderId.
   * This endpoint only sends cancellation requests. The results of the requests must be obtained by checking the order status or subscribing to websocket.
   */
  cancelHFOrder(params: { orderId: string; symbol: string }): Promise<
    APISuccessResponse<{
      orderId: string;
    }>
  > {
    return this.deletePrivate(`api/v1/hf/orders/${params.orderId}`, params);
  }

  /**
   * Cancel Order By OrderId Sync
   *
   * This endpoint can be used to cancel a spot order by orderId.
   * The difference between this endpoint and "cancelHFOrder()" is that this endpoint will synchronously return the order information after the order canceling is completed.
   */
  cancelHFOrderSync(params: {
    orderId: string;
    symbol: string;
  }): Promise<APISuccessResponse<SyncCancelHFOrderResponse>> {
    return this.deletePrivate(
      `api/v1/hf/orders/sync/${params.orderId}`,
      params,
    );
  }

  /**
   * Cancel Order By ClientOid
   *
   * This endpoint can be used to cancel a spot order by clientOid.
   * This endpoint only sends cancellation requests. The results of the requests must be obtained by checking the order status or subscribing to websocket.
   */
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

  /**
   * Cancel Order By ClientOid Sync
   *
   * This endpoint can be used to cancel a spot order by clientOid.
   * The difference between this endpoint and "cancelHFOrderByClientOId()" is that this endpoint will synchronously return the order information after the order canceling is completed.
   */
  cancelHFOrderSyncByClientOId(params: {
    clientOid: string;
    symbol: string;
  }): Promise<APISuccessResponse<SyncCancelHFOrderResponse>> {
    return this.deletePrivate(
      `api/v1/hf/orders/sync/client-order/${params.clientOid}`,
      params,
    );
  }

  /**
   * Cancel Partial Order
   *
   * This endpoint can cancel the specified quantity of the order according to the orderId.
   */
  cancelHFOrdersNumber(params: CancelSpecifiedNumberHFOrdersRequest): Promise<{
    orderId: string;
    cancelSize: string;
  }> {
    return this.deletePrivate(
      `api/v1/hf/orders/cancel/${params.orderId}`,
      params,
    );
  }

  /**
   * Cancel All Orders By Symbol
   *
   * This endpoint can cancel all spot orders for specific symbol.
   */
  cancelHFAllOrdersBySymbol(params: {
    symbol: string;
  }): Promise<APISuccessResponse<string>> {
    return this.deletePrivate(`api/v1/hf/orders`, params);
  }

  /**
   * Cancel All Orders
   *
   * This endpoint can cancel all spot orders for all symbol.
   */
  cancelHFAllOrders(): Promise<APISuccessResponse<CancelAllHFOrdersResponse>> {
    return this.deletePrivate(`api/v1/hf/orders/cancelAll`);
  }

  /**
   * Modify Order
   *
   * This endpoint can modify the price and quantity of the order according to orderId or clientOid.
   */
  updateHFOrder(params: ModifyHFOrderRequest): Promise<
    APISuccessResponse<{
      newOrderId: string;
      clientOid: string;
    }>
  > {
    return this.postPrivate('api/v1/hf/orders/alter', params);
  }

  /**
   * Get Order By OrderId
   *
   * This endpoint can be used to obtain information for a single Spot order using the order id.
   */
  getHFOrderDetailsByOrderId(params: {
    orderId: string;
    symbol: string;
  }): Promise<APISuccessResponse<HFOrder>> {
    return this.getPrivate(`api/v1/hf/orders/${params.orderId}`, params);
  }

  /**
   * Get Order By ClientOid
   *
   * This endpoint can be used to obtain information for a single Spot order using the clientOid.
   */
  getHFOrderDetailsByClientOid(params: {
    clientOid: string;
    symbol: string;
  }): Promise<APISuccessResponse<HFOrder>> {
    return this.getPrivate(
      `api/v1/hf/orders/client-order/${params.clientOid}`,
      params,
    );
  }

  /**
   * Get Symbols With Open Order
   *
   * This endpoint can query all spot symbol that has active orders
   */
  getHFActiveSymbols(): Promise<
    APISuccessResponse<{
      symbols: string[];
    }>
  > {
    return this.getPrivate(`api/v1/hf/orders/active/symbols`);
  }

  /**
   * Get Open Orders
   *
   * This endpoint is to obtain all Spot active order lists, and the return value of the active order endpoint is the paged data of all uncompleted order lists.
   * The returned data is sorted in descending order according to the latest update time of the order.
   */
  getHFActiveOrders(params: {
    symbol: string;
  }): Promise<APISuccessResponse<HFOrder[]>> {
    return this.getPrivate(`api/v1/hf/orders/active`, params);
  }
  /**
   * Get Closed Orders
   *
   * This endpoint is to obtain all Spot completed order lists, and the return value of the completed order endpoint is the paged data of all completed order lists.
   * The returned data is sorted in descending order according to the latest update time of the order.
   */
  getHFCompletedOrders(params: GetHFCompletedOrdersRequest): Promise<
    APISuccessResponse<{
      lastId: number;
      items: HFOrder[];
    }>
  > {
    return this.getPrivate(`api/v1/hf/orders/done`, params);
  }

  /**
   * Get Trade History
   *
   * This endpoint can be used to obtain a list of the latest Spot transaction details.
   */
  getHFFilledOrders(params: GetHFFilledListRequest): Promise<
    APISuccessResponse<{
      items: HFFilledOrder[];
      lastId: number;
    }>
  > {
    return this.getPrivate('api/v1/hf/fills', params);
  }

  /**
   * Get DCP
   *
   * Get Disconnection Protect(Deadman Swich)
   * Through this endpoint, you can query the settings of automatic order cancellation
   */
  cancelHFOrderAutoSettingQuery(): Promise<
    APISuccessResponse<AutoCancelHFOrderSettingQueryResponse>
  > {
    return this.getPrivate('api/v1/hf/orders/dead-cancel-all/query');
  }

  /**
   * Set DCP
   *
   * Set Disconnection Protect(Deadman Swich)
   * Through this endpoint, Call this endpoint to automatically cancel all orders of the set trading pair after the specified time.
   * If this endpoint is not called again for renewal or cancellation before the set time, the system will help the user to cancel the order of the corresponding trading pair. Otherwise it will not.
   */
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

  /**
   * Add Stop Order
   *
   * Place stop order to the Spot trading system.
   */
  submitStopOrder(
    params: SubmitStopOrderRequest,
  ): Promise<APISuccessResponse<{ orderId: string; clientOid: string }>> {
    return this.postPrivate('api/v1/stop-order', params);
  }

  /**
   * Cancel Stop Order By ClientOid
   *
   * This endpoint can be used to cancel a spot stop order by clientOid.
   */
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

  /**
   * Cancel Stop Order By OrderId
   *
   * Request via this endpoint to cancel a single stop order previously placed.
   */
  cancelStopOrderById(params: { orderId: string }): Promise<
    APISuccessResponse<{
      cancelledOrderIds: string[]; // Unique ID of the cancelled order
    }>
  > {
    return this.deletePrivate(`api/v1/stop-order/${params.orderId}`);
  }

  /**
   * Batch Cancel Stop Orders
   *
   * Request via this endpoint to cancel a batch of stop orders.
   */
  cancelStopOrders(params?: CancelStopOrdersRequest): Promise<
    APISuccessResponse<{
      cancelledOrderIds: string[]; // Unique IDs of the cancelled orders
    }>
  > {
    return this.deletePrivate(`api/v1/stop-order/cancel`, params);
  }

  /**
   * Get Stop Orders List
   *
   * Request via this endpoint to get your current untriggered stop order list.
   */
  getStopOrders(
    params?: GetStopOrdersListRequest,
  ): Promise<APISuccessResponse<StopOrders>> {
    return this.getPrivate('api/v1/stop-order', params);
  }

  /**
   * Get Stop Order By OrderId
   *
   * Request via this endpoint to get a stop order information via the order ID.


   */
  getStopOrderByOrderId(params: {
    orderId: string;
  }): Promise<APISuccessResponse<StopOrderItem>> {
    return this.getPrivate(`api/v1/stop-order/${params.orderId}`);
  }

  /**
   * Get Stop Order By ClientOid
   *
   *
   */
  getStopOrderByClientOid(params: {
    clientOid: string;
    symbol?: string;
  }): Promise<APISuccessResponse<StopOrderItem[]>> {
    return this.getPrivate('api/v1/stop-order/queryOrderByClientOid', params);
  }
  /**
   * Add OCO Order
   *
   * Place OCO order to the Spot trading system
   */
  submitOCOOrder(params: SubmitOCOOrderRequest): Promise<
    APISuccessResponse<{
      orderId: string; // An order Id is returned once an order is successfully submitd.
    }>
  > {
    return this.postPrivate('api/v3/oco/order', params);
  }
  /**
   * Cancel OCO Order By OrderId
   *
   * Request via this endpoint to cancel a single oco order previously placed.
   */
  cancelOCOOrderById(params: { orderId: string }): Promise<
    APISuccessResponse<{
      cancelledOrderIds: string[];
    }>
  > {
    return this.deletePrivate(`api/v3/oco/order/${params.orderId}`);
  }

  /**
   * Cancel OCO Order By ClientOid
   *
   * Request via this endpoint to cancel a single oco order previously placed.
   */
  cancelOCOOrderByClientOid(params: { clientOid: string }): Promise<
    APISuccessResponse<{
      cancelledOrderIds: string[];
    }>
  > {
    return this.deletePrivate(`api/v3/oco/client-order/${params.clientOid}`);
  }

  /**
   * Batch Cancel OCO Order
   *
   * This endpoint can batch cancel OCO orders through orderIds.
   */
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

  /**
   * Get OCO Order By OrderId
   *
   * Request via this endpoint to get a oco order information via the order ID.
   */
  getOCOOrderByOrderId(params: {
    orderId: string;
  }): Promise<APISuccessResponse<OCOOrderListItem>> {
    return this.getPrivate(`api/v3/oco/order/${params.orderId}`);
  }

  /**
   * Get OCO Order By ClientOid
   *
   * Request via this endpoint to get a oco order information via the clientOid.
   */
  getOCOOrderByClientOid(params: {
    clientOid: string;
  }): Promise<APISuccessResponse<OCOOrderListItem>> {
    return this.getPrivate(`api/v3/oco/client-order/${params.clientOid}`);
  }

  /**
   * Get OCO Order Details
   *
   * Request via this endpoint to get a oco order information via the order ID.
   */
  getOCOOrderDetails(params: {
    orderId: string;
  }): Promise<APISuccessResponse<OCOOrderDetails>> {
    return this.getPrivate(`api/v3/oco/order/details/${params.orderId}`);
  }

  /**
   * Get OCO Order List
   *
   * Request via this endpoint to get your current OCO order list.
   */
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

  /**
   * Get Symbols - Cross Margin
   *
   * This  endpoint allows querying the configuration of cross margin symbol.
   */
  getMarginActivePairsV3(params?: {
    symbol?: string;
  }): Promise<
    APISuccessResponse<{ timestamp: number; items: MarginActivePairsV3[] }>
  > {
    return this.getPrivate('api/v3/margin/symbols', params);
  }
  /**
   * Get Margin Config
   *
   * Request via this endpoint to get the configure info of the cross margin.
   */
  getMarginConfigInfo(): Promise<APISuccessResponse<MarginConfigInfo>> {
    return this.get('api/v1/margin/config');
  }

  /**
   * Get ETF Info
   *
   * This endpoint returns leveraged token information
   */
  getMarginLeveragedToken(params?: {
    currency?: string;
  }): Promise<APISuccessResponse<MarginLevTokenInfo[]>> {
    return this.getPrivate('api/v3/etf/info', params);
  }

  /**
   * Get Mark Price List
   *
   * This endpoint returns the current Mark price for all margin trading pairs.
   */
  getMarginMarkPrices(): Promise<APISuccessResponse<MarginMarkPrice[]>> {
    return this.get('api/v3/mark-price/all-symbols');
  }

  /**
   * Get Mark Price Detail
   *
   * This endpoint returns the current Mark price for specified margin trading pairs.
   */
  getMarginMarkPrice(params: {
    symbol: string;
  }): Promise<APISuccessResponse<MarginMarkPrice>> {
    return this.get(`api/v1/mark-price/${params.symbol}/current`);
  }
  /**
   * Get Symbols - Isolated Margin
   *
   * This endpoint allows querying the configuration of isolated margin symbol.
   */
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

  /**
   * Add Order
   *
   * Place order to the Cross-margin or Isolated-margin trading system
   */
  submitHFMarginOrder(
    params: SubmitHFMarginOrderRequest,
  ): Promise<APISuccessResponse<MarginSubmitOrderV3Response>> {
    return this.postPrivate('api/v3/hf/margin/order', params);
  }
  /**
   * Add Order Test
   *
   * This endpoint is used to test the order submission.
   */
  submitHFMarginOrderTest(
    params: SubmitHFMarginOrderRequest,
  ): Promise<MarginSubmitOrderV3Response> {
    return this.postPrivate('api/v3/hf/margin/order/test', params);
  }
  /**
   * Cancel Order By OrderId
   *
   * This endpoint can be used to cancel a margin order by orderId.
   */
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

  /**
   * Cancel Order By ClientOid
   *
   * This endpoint can be used to cancel a margin order by clientOid.
   */
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
  /**
   * Cancel All Orders By Symbol
   *
   * This endpoint can cancel all open Margin orders by symbol
   */
  cancelHFAllMarginOrders(params: {
    symbol: string;
    tradeType: string;
  }): Promise<any> {
    return this.deletePrivate(`api/v3/hf/margin/orders`, params);
  }

  /**
   * Get Symbols With Open Order
   *
   * This endpoint can query all Margin symbol that has active orders
   */
  getHFMarginOpenSymbols(params: {
    tradeType: string;
  }): Promise<APISuccessResponse<{ symbolSize: number; symbols: string[] }>> {
    return this.getPrivate('api/v3/hf/margin/order/active/symbols', params);
  }

  /**
   * Get Open Orders
   *
   * This endpoint is to obtain all Margin active order lists, and the return value of the active order endpoint is the paged data of all uncompleted order lists.
   */
  getHFActiveMarginOrders(
    params: HFMarginRequestOrder,
  ): Promise<APISuccessResponse<HFMarginOrder[]>> {
    return this.getPrivate(`api/v3/hf/margin/orders/active`, params);
  }

  /**
   * Get Closed Orders
   *
   * This endpoint is to obtain all Margin Closed order lists
   */
  getHFMarginFilledOrders(params: GetHFMarginFilledRequest): Promise<
    APISuccessResponse<{
      lastId: number;
      items: HFMarginOrder[];
    }>
  > {
    return this.getPrivate('api/v3/hf/margin/orders/done', params);
  }

  /**
   * Get Trade History
   *
   * This endpoint can be used to obtain a list of the latest Margin transaction details.
   */
  getHFMarginFills(params: getHFMarginFillsRequest): Promise<
    APISuccessResponse<{
      lastId: number;
      items: HFMarginTransactionRecord[];
    }>
  > {
    return this.getPrivate('api/v3/hf/margin/fills', params);
  }

  /**
   * Get Order By OrderId
   *
   * This endpoint can be used to obtain a Margin order by orderId.
   */
  getHFMarginOrderByOrderId(params: {
    orderId: string;
    symbol: string;
  }): Promise<APISuccessResponse<HFMarginOrder>> {
    return this.getPrivate(`api/v3/hf/margin/orders/${params.orderId}`, params);
  }
  /**
   * Get Order By ClientOid
   *
   * This endpoint can be used to obtain a Margin order by clientOid.
   */
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

  /**
   * Borrow
   *
   * This API endpoint is used to initiate an application for cross or isolated margin borrowing.
   */
  marginBorrowV3(
    params: MarginBorrowV3Request,
  ): Promise<APISuccessResponse<MarginOrderV3>> {
    return this.postPrivate('api/v3/margin/borrow', params);
  }

  /**
   * Get Borrow History
   *
   * This API endpoint is used to get the borrowing orders for cross and isolated margin accounts
   */
  getMarginBorrowHistoryV3(
    params: MarginHistoryV3Request,
  ): Promise<APISuccessResponse<MarginBorrowHistoryV3[]>> {
    return this.getPrivate('api/v3/margin/borrow', params);
  }

  /**
   * Repay
   *
   * This API endpoint is used to initiate an application for cross or isolated margin repayment.
   */
  marginRepayV3(
    params: MarginRepayV3Request,
  ): Promise<APISuccessResponse<MarginOrderV3>> {
    return this.postPrivate('api/v3/margin/repay', params);
  }

  /**
   * Get Repay History
   *
   * This API endpoint is used to get the repayment orders for cross and isolated margin accounts
   */
  getMarginRepayHistoryV3(
    params: MarginHistoryV3Request,
  ): Promise<APISuccessResponse<MarginRepayHistoryV3[]>> {
    return this.getPrivate('api/v3/margin/repay', params);
  }

  /**
   * Get Interest History
   *
   * Request via this endpoint to get the interest records of the cross/isolated margin lending.
   */
  getMarginInterestRecordsV3(
    params?: MarginInterestRecordsRequest,
  ): Promise<APISuccessResponse<MarginInterestRecords>> {
    return this.getPrivate('api/v3/margin/interest', params);
  }

  /**
   * Modify Leverage
   *
   * This endpoint allows modifying the leverage multiplier for cross margin or isolated margin.
   */
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

  /**
   * Get Loan Market
   *
   * This API endpoint is used to get the information about the currencies available for lending.
   */
  getLendingCurrencyV3(params?: {
    currency?: string;
  }): Promise<APISuccessResponse<LendingCurrencyV3>> {
    return this.get('api/v3/project/list', params);
  }

  /**
   * Get Loan Market Interest Rate
   *
   * This API endpoint is used to get the interest rates of the margin lending market over the past 7 days.
   */
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

  /**
   * Purchase
   *
   * Invest credit in the market and earn interest,Please ensure that the funds are in the main(funding) account
   */
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

  /**
   * Modify Purchase
   *
   * This API endpoint is used to update the interest rates of subscription orders, which will take effect at the beginning of the next hour.
   */
  updateLendingSubscriptionOrdersV3(
    params: ModifyLendingSubscriptionOrdersV3Request,
  ): Promise<any> {
    return this.postPrivate('api/v3/lend/purchase/update', params);
  }

  /**
   * Get Purchase Orders
   *
   * This API endpoint provides pagination query for the purchase orders.
   */
  getLendingSubscriptionOrdersV3(
    params: GetLendingSubscriptionOrdersV3Request,
  ): Promise<APISuccessResponse<LendingRedemption>> {
    return this.getPrivate('api/v3/purchase/orders', params);
  }

  /**
   * Redeem
   *
   * Redeem your loan order
   */
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

  /**
   * Get Redeem Orders
   *
   * This API endpoint provides pagination query for the redeem orders.
   */
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

  /**
   * Get Margin Risk Limit
   *
   * Request via this endpoint to get the Configure and Risk limit info of the margin.
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
   * Earn Purchase
   *
   * This endpoint allows subscribing earn product
   */
  subscribeEarnFixedIncome(
    params: SubscribeEarnFixedIncomeRequest,
  ): Promise<APISuccessResponse<SubscribeEarnFixedIncomeResponse>> {
    return this.postPrivate('api/v1/earn/orders', params);
  }

  /**
   * Get Earn Redeem Preview
   *
   * This endpoint retrieves redemption preview information by holding ID. If the current holding is fully redeemed or in the process of being redeemed, it indicates that the holding does not exist.
   */
  getEarnRedeemPreview(
    params: GetEarnRedeemPreviewRequest,
  ): Promise<APISuccessResponse<GetEarnRedeemPreviewResponse>> {
    return this.getPrivate('api/v1/earn/redeem-preview', params);
  }

  /**
   * Earn Redeem
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
   * Get Earn Account Holdings
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
  getEarnEthStakingProducts(params?: {
    currency: string;
  }): Promise<APISuccessResponse<EarnProduct[]>> {
    return this.getPrivate('api/v1/earn/eth-staking/products', params);
  }

  /**
   *
   * REST - VIP LENDING
   *
   */

  /**
   * Get Discount Rate Configs
   *
   * Get the gradient discount rate of each currency.
   * Returns the discount rate configuration for different USDT value ranges per currency.
   */
  getDiscountRateConfigs(): Promise<APISuccessResponse<DiscountRateConfig[]>> {
    return this.getPrivate('api/v1/otc-loan/discount-rate-configs');
  }

  /**
   * Get Account Detail - VIP Lending
   *
   * The following information is only applicable to loans.
   * Get information on off-exchange funding and loans.
   * This endpoint is only for querying accounts that are currently involved in loans.
   */
  getOtcLoan(): Promise<APISuccessResponse<OtcLoan>> {
    return this.getPrivate('api/v1/otc-loan/loan');
  }

  /**
   * Get Accounts - VIP Lending
   *
   * Accounts participating in OTC lending, This endpoint is only for querying accounts currently running OTC lending.
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
  getAffiliateUserRebateInfo(): Promise<APISuccessResponse<any>> {
    return this.getPrivate('api/v2/affiliate/inviter/statistics');
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
   * DEPRECATED
   */

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the getSubAccountsV2() endpoint instead of this endpoint
   */
  getSubAccountsV1(): Promise<APISuccessResponse<SubAccountInfo[]>> {
    return this.getPrivate('api/v1/sub/user');
  }

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the getSubAccountsV2() endpoint instead of this endpoint
   */
  getSubAccountBalancesV1(): Promise<APISuccessResponse<SubAccountBalance>> {
    return this.getPrivate('api/v1/sub-accounts');
  }

  /**
   *
   * REST - FUNDING - Funding overview
   * DEPRECATED
   */

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the getMarginBalance() endpoint instead of this endpoint
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
   * DEPRECATED
   */

  /**
   * @deprecated This method is deprecated. Please use createDepositAddressV3() instead.
   */
  createDepositAddress(params: {
    currency: string;
    chain?: string;
  }): Promise<APISuccessResponse<DepositAddress>> {
    return this.postPrivate('api/v1/deposit-addresses', params);
  }

  /**
   * @deprecated This method is deprecated. Please use getDepositAddressesV3() instead.
   */
  getDepositAddressesV2(params: {
    currency: string;
  }): Promise<APISuccessResponse<DepositAddressV2[]>> {
    return this.getPrivate('api/v2/deposit-addresses', params);
  }

  /**
   * @deprecated This method is deprecated. Please use getDepositAddressesV3() instead.
   */
  getDepositAddressV1(params: {
    currency: string;
    chain?: string;
  }): Promise<APISuccessResponse<DepositAddress>> {
    return this.getPrivate('api/v1/deposit-addresses', params);
  }

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the getDeposits() endpoint instead of this endpoint
   */
  getHistoricalDepositsV1(
    params?: GetDepositsRequest,
  ): Promise<APISuccessResponse<V1HistoricalDeposits>> {
    return this.getPrivate('api/v1/hist-deposits', params);
  }

  /**
   *
   * REST - FUNDING -Withdrawals
   * DEPRECATED
   */

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the getWithdrawals() endpoint instead of this endpoint
   */
  getHistoricalWithdrawalsV1(
    params?: GetWithdrawalsRequest,
  ): Promise<APISuccessResponse<HistoricalWithdrawalsV1>> {
    return this.getPrivate('api/v1/hist-withdrawals', params);
  }

  /**
   * @deprecated This method is deprecated. Please use submitWithdrawV3() instead.
   */
  submitWithdraw(
    params: ApplyWithdrawRequest,
  ): Promise<APISuccessResponse<{ withdrawalId: string }>> {
    return this.postPrivate('api/v1/withdrawals', params);
  }

  /**
   *
   * REST - FUNDING - Transfer
   * DEPRECATED
   */

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the submitFlexTransfer() endpoint instead of this endpoint
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
   * It is recommended to use the submitFlexTransfer() endpoint instead of this endpoint
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
   * DEPRECATED
   */

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the submitHFOrder() endpoint instead of this endpoint
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
   * It is recommended to use the submitHFOrderTest() endpoint instead of this endpoint
   */
  submitOrderTest(): Promise<any> {
    return this.postPrivate('api/v1/orders/test');
  }

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the submitMultipleHFOrders() endpoint instead of this endpoint
   */
  submitMultipleOrders(params: {
    symbol: string;
    orderList: SubmitMultipleOrdersRequest[];
  }): Promise<APISuccessResponse<MultipleOrdersResponse[]>> {
    return this.postPrivate('api/v1/orders/multi', params);
  }

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the cancelHFOrder() endpoint instead of this endpoint
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
   * It is recommended to use the cancelHFOrderByClientOid() endpoint instead of this endpoint
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
   * It is recommended to use the cancelHFAllOrders() endpoint instead of this endpoint
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
   * It is recommended to use the getHfOrderDetails() endpoint instead of this endpoint
   */
  getOrders(
    params?: GetOrderListRequest,
  ): Promise<APISuccessResponse<SpotOrderList>> {
    return this.getPrivate('api/v1/orders', params);
  }

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the getHFOrders() endpoint instead of this endpoint
   */
  getRecentOrders(params?: {
    currentPage?: number;
    pageSize?: number;
  }): Promise<APISuccessResponse<SpotOrder[]>> {
    return this.getPrivate('api/v1/limit/orders', params);
  }

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the getHFOrderDetailsByOrderId() instead of this endpoint
   */
  getOrderByOrderId(params: {
    orderId: string;
  }): Promise<APISuccessResponse<SpotOrder>> {
    return this.getPrivate(`api/v1/orders/${params.orderId}`);
  }

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the getHFOrderDetailsByClientOid() instead of this endpoint
   */
  getOrderByClientOid(params: {
    clientOid: string;
  }): Promise<APISuccessResponse<SpotOrder>> {
    return this.getPrivate(`api/v1/order/client-order/${params.clientOid}`);
  }

  /**
   *
   * REST - SPOT TRADING -Fills
   * DEPRECATED
   */

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the getHFFilledOrders() instead of this endpoint
   */
  getFills(
    params?: GetFillsRequest,
  ): Promise<APISuccessResponse<SpotOrderFills>> {
    return this.getPrivate('api/v1/fills', params);
  }

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the getHFFilledOrders() instead of this endpoint
   */
  getRecentFills(): Promise<APISuccessResponse<SpotOrderFill[]>> {
    return this.getPrivate('api/v1/limit/fills');
  }

  /**
   *
   * REST - MARGIN TRADING - Orders
   * DEPRECATED
   */

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the submitHFMarginOrder() endpoint instead of this endpoint
   */
  submitMarginOrder(
    params: SubmitMarginOrderRequest,
  ): Promise<APISuccessResponse<SubmitMarginOrderResponse>> {
    return this.postPrivate('api/v1/margin/order', params);
  }

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the submitHFMarginOrderTest() endpoint instead of this endpoint
   */
  submitMarginOrderTest(): Promise<any> {
    return this.postPrivate('api/v1/margin/order/test');
  }

  /**
   *
   * REST - MARGIN TRADING - Isolated Margin
   * DEPRECATED
   */

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the getMarginBalance() endpoint instead of this endpoint
   */
  getIsolatedMarginAccounts(params?: {
    balanceCurrency?: 'USDT' | 'KCS' | 'BTC';
  }): Promise<APISuccessResponse<IsolatedMarginAccountInfo>> {
    return this.getPrivate('api/v1/isolated/accounts', params);
  }

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the getIsolatedMarginBalance() endpoint instead of this endpoint
   */
  getIsolatedMarginAccount(params: {
    symbol: string;
  }): Promise<APISuccessResponse<SingleIsolatedMarginAccountInfo>> {
    return this.getPrivate(`api/v1/isolated/account/${params.symbol}`);
  }
}
