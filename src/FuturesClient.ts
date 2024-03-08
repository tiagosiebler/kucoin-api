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

  getSymbols(): Promise<
    APISuccessResponse<
      Array<{
        symbol: string; // Contract status
        rootSymbol: string; // Contract group
        type: string; // Type of the contract
        firstOpenDate: number; // First Open Date
        expireDate: number | null; // Expiration date. Null means it will never expire
        settleDate: number | null; // Settlement date. Null indicates that automatic settlement is not supported
        baseCurrency: string; // Base currency
        quoteCurrency: string; // Quote currency
        settleCurrency: string; // Currency used to clear and settle the trades
        maxOrderQty: number; // Maximum order quantity
        maxPrice: number; // Maximum order price
        lotSize: number; // Minimum lot size
        tickSize: number; // Minimum price changes
        indexPriceTickSize: number; // Index price of tick size
        multiplier: number; // Contract multiplier
        initialMargin: number; // Initial margin requirement
        maintainMargin: number; // Maintenance margin requirement
        maxRiskLimit: number; // Maximum risk limit (unit: XBT)
        minRiskLimit: number; // Minimum risk limit (unit: XBT)
        riskStep: number; // Risk limit increment value (unit: XBT)
        makerFeeRate: number; // Maker fees
        takerFeeRate: number; // Taker fees
        takerFixFee: number; // Fixed taker fees(Deprecated field, no actual use of the value field)
        makerFixFee: number; // Fixed maker fees(Deprecated field, no actual use of the value field)
        settlementFee: number | null; // settlement fee
        isDeleverage: boolean; // Enabled ADL or not
        isQuanto: boolean; // Whether quanto or not(Deprecated field, no actual use of the value field)
        isInverse: boolean; // Reverse contract or not
        markMethod: string; // Marking method
        fairMethod: string; // Fair price marking method
        fundingBaseSymbol: string; // Ticker symbol of the based currency
        fundingQuoteSymbol: string; // Ticker symbol of the quote currency
        fundingRateSymbol: string; // Funding rate symbol
        indexSymbol: string; // Index symbol
        settlementSymbol: string; // Settlement Symbol
        status: string; // Contract status
        fundingFeeRate: number; // Funding fee rate
        predictedFundingFeeRate: number; // Predicted funding fee rate
        openInterest: string; // open interest
        turnoverOf24h: number; // turnover of 24 hours
        volumeOf24h: number; // volume of 24 hours
        markPrice: number; // Mark price
        indexPrice: number; // Index price
        lastTradePrice: number; // last trade price
        nextFundingRateTime: number; // next funding rate time
        maxLeverage: number; // maximum leverage
        sourceExchanges: Array<string>; // The contract index source exchange
        premiumsSymbol1M: string; // Premium index symbol (1 minute)
        premiumsSymbol8H: string; // Premium index symbol (8 hours)
        fundingBaseSymbol1M: string; // Base currency interest rate symbol (1 minute)
        fundingQuoteSymbol1M: string; // Quote currency interest rate symbol (1 minute)
        lowPrice: number; // 24H Low
        highPrice: number; // 24H High
        priceChgPct: number; // 24H Change%
        priceChg: number; // 24H Change
      }>
    >
  > {
    return this.get('api/v1/contracts/active');
  }

  getSymbol(params: { symbol: string }): Promise<
    APISuccessResponse<{
      symbol: string; // Contract status
      rootSymbol: string; // Contract group
      type: string; // Type of the contract
      firstOpenDate: number; // First Open Date
      expireDate: number | null; // Expiration date. Null means it will never expire
      settleDate: number | null; // Settlement date. Null indicates that automatic settlement is not supported
      baseCurrency: string; // Base currency
      quoteCurrency: string; // Quote currency
      settleCurrency: string; // Currency used to clear and settle the trades
      maxOrderQty: number; // Maximum order quantity
      maxPrice: number; // Maximum order price
      lotSize: number; // Minimum lot size
      tickSize: number; // Minimum price changes
      indexPriceTickSize: number; // Index price of tick size
      multiplier: number; // Contract multiplier
      initialMargin: number; // Initial margin requirement
      maintainMargin: number; // Maintenance margin requirement
      maxRiskLimit: number; // Maximum risk limit (unit: XBT)
      minRiskLimit: number; // Minimum risk limit (unit: XBT)
      riskStep: number; // Risk limit increment value (unit: XBT)
      makerFeeRate: number; // Maker fees
      takerFeeRate: number; // Taker fees
      takerFixFee: number; // Fixed taker fees(Deprecated field, no actual use of the value field)
      makerFixFee: number; // Fixed maker fees(Deprecated field, no actual use of the value field)
      settlementFee: number | null; // settlement fee
      isDeleverage: boolean; // Enabled ADL or not
      isQuanto: boolean; // Whether quanto or not(Deprecated field, no actual use of the value field)
      isInverse: boolean; // Reverse contract or not
      markMethod: string; // Marking method
      fairMethod: string; // Fair price marking method
      fundingBaseSymbol: string; // Ticker symbol of the based currency
      fundingQuoteSymbol: string; // Ticker symbol of the quote currency
      fundingRateSymbol: string; // Funding rate symbol
      indexSymbol: string; // Index symbol
      settlementSymbol: string; // Settlement Symbol
      status: string; // Contract status
      fundingFeeRate: number; // Funding fee rate
      predictedFundingFeeRate: number; // Predicted funding fee rate
      openInterest: string; // open interest
      turnoverOf24h: number; // turnover of 24 hours
      volumeOf24h: number; // volume of 24 hours
      markPrice: number; // Mark price
      indexPrice: number; // Index price
      lastTradePrice: number; // last trade price
      nextFundingRateTime: number; // next funding rate time
      maxLeverage: number; // maximum leverage
      sourceExchanges: Array<string>; // The contract index source exchange
      premiumsSymbol1M: string; // Premium index symbol (1 minute)
      premiumsSymbol8H: string; // Premium index symbol (8 hours)
      fundingBaseSymbol1M: string; // Base currency interest rate symbol (1 minute)
      fundingQuoteSymbol1M: string; // Quote currency interest rate symbol (1 minute)
      lowPrice: number; // 24H Low
      highPrice: number; // 24H High
      priceChgPct: number; // 24H Change%
      priceChg: number; // 24H Change
    }>
  > {
    return this.get(`api/v1/contracts/${params.symbol}`);
  }

  getTicker(params: { symbol: string }): Promise<
    APISuccessResponse<{
      sequence: number; // Sequence number
      symbol: string; // Symbol
      side: string; // Side of liquidity taker
      size: number; // Filled quantity
      price: string; // Filled price
      bestBidSize: number; // Best bid size
      bestBidPrice: string; // Best bid price
      bestAskSize: number; // Best ask size
      bestAskPrice: string; // Best ask price
      tradeId: string; // Transaction ID
      ts: number; // Filled time - nanosecond
    }>
  > {
    return this.get('api/v1/ticker', params);
  }

  getFullOrderBookLevel2(params: { symbol: string }): Promise<
    APISuccessResponse<{
      symbol: string; // Symbol
      sequence: number; // Ticker sequence number
      asks: Array<[string, number]>; // asks. [Price, quantity]
      bids: Array<[string, number]>; // bids. [Price, quantity]
      ts: number; // timestamp
    }>
  > {
    return this.get('api/v1/level2/snapshot', params);
  }

  getPartOrderBookLevel2Depth20(params: { symbol: string }): Promise<
    APISuccessResponse<{
      symbol: string; // Symbol
      sequence: number; // Ticker sequence number
      asks: Array<[string, number]>; // asks. [Price, quantity]
      bids: Array<[string, number]>; // bids. [Price, quantity]
      ts: number; // timestamp
    }>
  > {
    return this.get('api/v1/level2/depth20', params);
  }

  getPartOrderBookLevel2Depth100(params: { symbol: string }): Promise<
    APISuccessResponse<{
      symbol: string; // Symbol
      sequence: number; // Ticker sequence number
      asks: Array<[string, number]>; // asks. [Price, quantity]
      bids: Array<[string, number]>; // bids. [Price, quantity]
      ts: number; // timestamp
    }>
  > {
    return this.get('api/v1/level2/depth100', params);
  }

  getMarketTrades(params: { symbol: string }): Promise<
    APISuccessResponse<{
      sequence: number; // Sequence number
      tradeId: string; // Transaction ID
      takerOrderId: string; // Taker order ID
      makerOrderId: string; // Maker order ID
      price: string; // Filled price
      size: number; // Filled quantity
      side: string; // Side-taker
      ts: number; // Filled time - nanosecond
    }>
  > {
    return this.get('api/v1/trade/history', params);
  }

  getKlines(params: {
    symbol: string;
    granularity: number;
    from?: number;
    to?: number;
  }): Promise<
    APISuccessResponse<
      Array<
        [
          number, // Time
          number, // Entry price
          number, // Highest price
          number, // Lowest price
          number, // Close price
          number, // Trading volume
        ]
      >
    >
  > {
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
  }): Promise<
    APISuccessResponse<{
      dataList: Array<{
        symbol: string; // Symbol of the Bitcoin Lending Rate
        granularity: number; // Granularity (millisecond)
        timePoint: number; // Time point (millisecond)
        value: number; // Interest rate value
      }>;
      hasMore: boolean; // Whether there are more pages
    }>
  > {
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
  }): Promise<
    APISuccessResponse<{
      dataList: Array<{
        symbol: string; // Symbol of Bitcoin spot
        granularity: number; // Granularity (millisecond)
        timePoint: number; // Time point (millisecond)
        value: number; // Index Value
        decomposionList: Array<{
          exchange: string; // Exchange
          price: number; // Last traded price
          weight: number; // Weight
        }>;
      }>;
      hasMore: boolean; // Whether there are more pages
    }>
  > {
    return this.get('api/v1/index/query', params);
  }

  getMarkPrice(params: { symbol: string }): Promise<
    APISuccessResponse<{
      symbol: string; // Symbol
      granularity: number; // Granularity (millisecond)
      timePoint: number; // Time point (millisecond)
      value: number; // Mark price
      indexPrice: number; // Index price
    }>
  > {
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
  }): Promise<
    APISuccessResponse<{
      dataList: Array<{
        symbol: string; // Premium index symbol
        granularity: number; // Granularity (millisecond)
        timePoint: number; // Time point (millisecond)
        value: number; // Premium index
      }>;
      hasMore: boolean; // Whether there are more pages
    }>
  > {
    return this.get('api/v1/premium/query', params);
  }

  get24HourTransactionVolume(): Promise<
    APISuccessResponse<{
      turnoverOf24h: number; // 24-hour platform Futures trading volume. Unit is USD
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

  sumbitNewOrderTest(): Promise<any> {
    return this.postPrivate('api/v1/orders/test');
  }

  cancelAccountOrderById(params: {
    orderId: string;
  }): Promise<APISuccessResponse<{ cancelledOrderIds: string[] }>> {
    return this.deletePrivate(`api/v1/orders/${params.orderId}`);
  }

  //check docs, very weird. Maybe ask API guys to check
  cancelOrderByClientOid(params: {
    clientOid: string;
  }): Promise<APISuccessResponse<{ clientOid: string }>> {
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
  }): Promise<
    APISuccessResponse<
      Array<{
        orderId: string; // order id
        clientOid: string; // client order ID
        symbol: string; // symbol
        code: string;
        msg: string;
      }>
    >
  > {
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

  getAccountOrders(params?: {
    status?: 'active' | 'done';
    symbol?: string;
    side?: 'buy' | 'sell';
    type?: 'limit' | 'market' | 'limit_stop' | 'market_stop';
    startAt?: number;
    endAt?: number;
    currentPage?: number;
    pageSize?: number;
  }): Promise<
    APISuccessResponse<{
      currentPage: number;
      pageSize: number;
      totalNum: number;
      totalPage: number;
      items: Array<{
        id: string; // Order ID
        symbol: string; // Symbol of the contract
        type: string; // Order type, market order or limit order
        side: string; // Transaction side
        price: string; // Order price
        size: number; // Order quantity
        value: string; // Order value
        dealValue: string; // Executed size of funds
        dealSize: number; // Executed quantity
        stp: string; // self trade prevention
        stop: string; // Stop order type (stop limit or stop market)
        stopPriceType: string; // Trigger price type of stop orders
        stopTriggered: boolean; // Mark to show whether the stop order is triggered
        stopPrice: string | null; // Trigger price of stop orders
        timeInForce: string; // Time in force policy type
        postOnly: boolean; // Mark of post only
        hidden: boolean; // Mark of the hidden order
        iceberg: boolean; // Mark of the iceberg order
        leverage: string; // Leverage of the order
        forceHold: boolean; // A mark to forcely hold the funds for an order
        closeOrder: boolean; // A mark to close the position
        visibleSize: number | null; // Visible size of the iceberg order
        clientOid: string; // Unique order id created by users to identify their orders
        remark: string | null; // Remark of the order
        tags: string | null; // tag order source
        isActive: boolean; // Mark of the active orders
        cancelExist: boolean; // Mark of the canceled orders
        createdAt: number; // Time the order created
        updatedAt: number; // last update time
        endAt: number; // End time
        orderTime: number; // Order create time in nanosecond
        settleCurrency: string; // settlement currency
        status: string; // order status: “open” or “done”
        filledSize: number; // Value of the executed orders
        filledValue: string; // Executed order quantity
        reduceOnly: boolean; // A mark to reduce the position size only
      }>;
    }>
  > {
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
  }): Promise<
    APISuccessResponse<{
      currentPage: number;
      pageSize: number;
      totalNum: number;
      totalPage: number;
      items: Array<{
        id: string; // Order ID
        symbol: string; // Symbol of the contract
        type: string; // Order type, market order or limit order
        side: string; // Transaction side
        price: string; // Order price
        size: number; // Order quantity
        value: string; // Order value
        dealValue: string; // Executed size of funds
        dealSize: number; // Executed quantity
        stp: string; // self trade prevention
        stop: string; // Stop order type (stop limit or stop market)
        stopPriceType: string; // Trigger price type of stop orders
        stopTriggered: boolean; // Mark to show whether the stop order is triggered
        stopPrice: string | null; // Trigger price of stop orders
        timeInForce: string; // Time in force policy type
        postOnly: boolean; // Mark of post only
        hidden: boolean; // Mark of the hidden order
        iceberg: boolean; // Mark of the iceberg order
        leverage: string; // Leverage of the order
        forceHold: boolean; // A mark to forcely hold the funds for an order
        closeOrder: boolean; // A mark to close the position
        visibleSize: number | null; // Visible size of the iceberg order
        clientOid: string; // Unique order id created by users to identify their orders
        remark: string | null; // Remark of the order
        tags: string | null; // tag order source
        isActive: boolean; // Mark of the active orders
        cancelExist: boolean; // Mark of the canceled orders
        createdAt: number; // Time the order created
        updatedAt: number; // last update time
        endAt: number; // End time
        orderTime: number; // Order create time in nanosecond
        settleCurrency: string; // settlement currency
        status: string; // order status: “open” or “done”
        filledSize: number; // Value of the executed orders
        filledValue: string; // Executed order quantity
        reduceOnly: boolean; // A mark to reduce the position size only
      }>;
    }>
  > {
    return this.getPrivate('api/v1/stopOrders', params);
  }

  getAccountRecentOrders(params?: { symbol?: string }): Promise<
    APISuccessResponse<
      Array<{
        id: string; // Order ID
        symbol: string; // Symbol of the contract
        type: string; // Order type, market order or limit order
        side: string; // Transaction side
        price: string; // Order price
        size: number; // Order quantity
        value: string; // Order value
        dealValue: string; // Executed size of funds
        dealSize: number; // Executed quantity
        stp: string; // self trade prevention
        stop: string; // Stop order type (stop limit or stop market)
        stopPriceType: string; // Trigger price type of stop orders
        stopTriggered: boolean; // Mark to show whether the stop order is triggered
        stopPrice: string | null; // Trigger price of stop orders
        timeInForce: string; // Time in force policy type
        postOnly: boolean; // Mark of post only
        hidden: boolean; // Mark of the hidden order
        iceberg: boolean; // Mark of the iceberg order
        leverage: string; // Leverage of the order
        forceHold: boolean; // A mark to forcely hold the funds for an order
        closeOrder: boolean; // A mark to close the position
        visibleSize: number | null; // Visible size of the iceberg order
        clientOid: string; // Unique order id created by users to identify their orders
        remark: string | null; // Remark of the order
        tags: string | null; // tag order source
        isActive: boolean; // Mark of the active orders
        cancelExist: boolean; // Mark of the canceled orders
        createdAt: number; // Time the order created
        updatedAt: number; // last update time
        endAt: number; // End time
        orderTime: number; // Order create time in nanosecond
        settleCurrency: string; // settlement currency
        status: string; // order status: “open” or “done”
        filledSize: number; // Value of the executed orders
        filledValue: string; // Executed order quantity
        reduceOnly: boolean; // A mark to reduce the position size only
      }>
    >
  > {
    return this.getPrivate('api/v1/recentDoneOrders', params);
  }

  getAccountOrderDetailsByOrderId(params: { orderId: string }): Promise<
    APISuccessResponse<{
      id: string; // Order ID
      symbol: string; // Symbol of the contract
      type: string; // Order type, market order or limit order
      side: string; // Transaction side
      price: string; // Order price
      size: number; // Order quantity
      value: string; // Order value
      dealValue: string; // Executed size of funds
      dealSize: number; // Executed quantity
      stp: string; // self trade prevention
      stop: string; // Stop order type (stop limit or stop market)
      stopPriceType: string; // Trigger price type of stop orders
      stopTriggered: boolean; // Mark to show whether the stop order is triggered
      stopPrice: string | null; // Trigger price of stop orders
      timeInForce: string; // Time in force policy type
      postOnly: boolean; // Mark of post only
      hidden: boolean; // Mark of the hidden order
      iceberg: boolean; // Mark of the iceberg order
      leverage: string; // Leverage of the order
      forceHold: boolean; // A mark to forcely hold the funds for an order
      closeOrder: boolean; // A mark to close the position
      visibleSize: number | null; // Visible size of the iceberg order
      clientOid: string; // Unique order id created by users to identify their orders
      remark: string | null; // Remark of the order
      tags: string | null; // tag order source
      isActive: boolean; // Mark of the active orders
      cancelExist: boolean; // Mark of the canceled orders
      createdAt: number; // Time the order created
      updatedAt: number; // last update time
      endAt: number; // End time
      orderTime: number; // Order create time in nanosecond
      settleCurrency: string; // settlement currency
      status: string; // order status: “open” or “done”
      filledSize: number; // Value of the executed orders
      filledValue: string; // Executed order quantity
      reduceOnly: boolean; // A mark to reduce the position size only
    }>
  > {
    return this.getPrivate(`api/v1/orders/${params.orderId}`);
  }

  getAccountOrderDetailsByClientOrderId(params: { clientOid: string }): Promise<
    APISuccessResponse<{
      id: string; // Order ID
      symbol: string; // Symbol of the contract
      type: string; // Order type, market order or limit order
      side: string; // Transaction side
      price: string; // Order price
      size: number; // Order quantity
      value: string; // Order value
      dealValue: string; // Executed size of funds
      dealSize: number; // Executed quantity
      stp: string; // self trade prevention
      stop: string; // Stop order type (stop limit or stop market)
      stopPriceType: string; // Trigger price type of stop orders
      stopTriggered: boolean; // Mark to show whether the stop order is triggered
      stopPrice: string | null; // Trigger price of stop orders
      timeInForce: string; // Time in force policy type
      postOnly: boolean; // Mark of post only
      hidden: boolean; // Mark of the hidden order
      iceberg: boolean; // Mark of the iceberg order
      leverage: string; // Leverage of the order
      forceHold: boolean; // A mark to forcely hold the funds for an order
      closeOrder: boolean; // A mark to close the position
      visibleSize: number | null; // Visible size of the iceberg order
      clientOid: string; // Unique order id created by users to identify their orders
      remark: string | null; // Remark of the order
      tags: string | null; // tag order source
      isActive: boolean; // Mark of the active orders
      cancelExist: boolean; // Mark of the canceled orders
      createdAt: number; // Time the order created
      updatedAt: number; // last update time
      endAt: number; // End time
      orderTime: number; // Order create time in nanosecond
      settleCurrency: string; // settlement currency
      status: string; // order status: “open” or “done”
      filledSize: number; // Value of the executed orders
      filledValue: string; // Executed order quantity
      reduceOnly: boolean; // A mark to reduce the position size only
    }>
  > {
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
  }): Promise<
    APISuccessResponse<{
      currentPage: number;
      pageSize: number;
      totalNum: number;
      totalPage: number;
      items: Array<{
        symbol: string; // Symbol of the contract
        tradeId: string; // Trade ID
        orderId: string; // Order ID
        side: string; // Transaction side
        liquidity: string; // Liquidity- taker or maker
        forceTaker: boolean; // Whether to force processing as a taker
        price: string; // Filled price
        size: number; // Filled amount
        value: string; // Order value
        feeRate: string; // Floating fees
        fixFee: string; // Fixed fees
        feeCurrency: string; // Charging currency
        stop: string; // A mark to the stop order type
        fee: string; // Transaction fee
        orderType: string; // Order type
        tradeType: string; // Trade type (trade, liquidation, ADL or settlement)
        createdAt: number; // Time the order created
        settleCurrency: string; // settlement currency
        openFeePay: string; // Opening transaction fee
        closeFeePay: string; // Closing transaction fee
        tradeTime: number; // trade time in nanosecond
      }>;
    }>
  > {
    return this.getPrivate('api/v1/fills', params);
  }

  /**
   * Get a list of recent 1000 fills in the last 24 hours.
   *
   * If you need to get your recent traded order history with low latency, you may query this endpoint.
   */
  getAccountRecentFills(params?: { symbol?: string }): Promise<
    APISuccessResponse<
      Array<{
        symbol: string; // Symbol of the contract
        tradeId: string; // Trade ID
        orderId: string; // Order ID
        side: string; // Transaction side
        liquidity: string; // Liquidity- taker or maker
        forceTaker: boolean; // Whether to force processing as a taker
        price: string; // Filled price
        size: number; // Filled amount
        value: string; // Order value
        feeRate: string; // Floating fees
        fixFee: string; // Fixed fees
        feeCurrency: string; // Charging currency
        stop: string; // A mark to the stop order type
        fee: string; // Transaction fee
        orderType: string; // Order type
        tradeType: string; // Trade type (trade, liquid, cancel, ADL or settlement)
        createdAt: number; // Time the order created
        settleCurrency: string; // settlement currency
        openFeePay: string; // Opening transaction fee
        closeFeePay: string; // Closing transaction fee
        tradeTime: number; // trade time in nanosecond
      }>
    >
  > {
    return this.getPrivate('api/v1/recentFills', params);
  }

  getAccountActiveOrderValueCalculation(params: { symbol: string }): Promise<
    APISuccessResponse<{
      openOrderBuySize: number; // Total number of the unexecuted buy orders
      openOrderSellSize: number; // Total number of the unexecuted sell orders
      openOrderBuyCost: string; // Value of all the unexecuted buy orders
      openOrderSellCost: string; // Value of all the unexecuted sell orders
      settleCurrency: string; // settlement currency
    }>
  > {
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
  getAccountPosition(params: { symbol: string }): Promise<
    APISuccessResponse<{
      id: string; // Position ID
      symbol: string; // Symbol
      autoDeposit: boolean; // Auto deposit margin or not
      maintMarginReq: number; // Maintenance margin requirement
      riskLimit: number; // Risk limit
      realLeverage: number; // Leverage of the order
      crossMode: boolean; // Cross mode or not
      delevPercentage: number; // ADL ranking percentile
      openingTimestamp: number; // Open time
      currentTimestamp: number; // Current timestamp
      currentQty: number; // Current position quantity
      currentCost: number; // Current position value
      currentComm: number; // Current commission
      unrealisedCost: number; // Unrealised value
      realisedGrossCost: number; // Accumulated realised gross profit value
      realisedCost: number; // Current realised position value
      isOpen: boolean; // Opened position or not
      markPrice: number; // Mark price
      markValue: number; // Mark value
      posCost: number; // Position value
      posCross: number; // added margin
      posInit: number; // Leverage margin
      posComm: number; // Bankruptcy cost
      posLoss: number; // Funding fees paid out
      posMargin: number; // Bankruptcy cost
      posMaint: number; // Maintenance margin
      maintMargin: number; // Position margin
      realisedGrossPnl: number; // Accumulated realised gross profit value
      realisedPnl: number; // Realised profit and loss
      unrealisedPnl: number; // Unrealised profit and loss
      unrealisedPnlPcnt: number; // Profit-loss ratio of the position
      unrealisedRoePcnt: number; // Rate of return on investment
      avgEntryPrice: number; // Average entry price
      liquidationPrice: number; // Liquidation price
      bankruptPrice: number; // Bankruptcy price
      settleCurrency: string; // Currency used to clear and settle the trades
      maintainMargin: number; // Maintenance margin rate
      userId: number; // userId
      riskLimitLevel: number; // Risk Limit Level
    }>
  > {
    return this.getPrivate('api/v1/position', params);
  }

  /**
   * Get Position List
   */
  getAccountPositions(params?: { currency?: string }): Promise<
    APISuccessResponse<
      {
        id: string; // Position ID
        symbol: string; // Symbol
        autoDeposit: boolean; // Auto deposit margin or not
        maintMarginReq: number; // Maintenance margin requirement
        riskLimit: number; // Risk limit
        realLeverage: number; // Leverage of the order
        crossMode: boolean; // Cross mode or not
        delevPercentage: number; // ADL ranking percentile
        openingTimestamp: number; // Open time
        currentTimestamp: number; // Current timestamp
        currentQty: number; // Current position quantity
        currentCost: number; // Current position value
        currentComm: number; // Current commission
        unrealisedCost: number; // Unrealised value
        realisedGrossCost: number; // Accumulated realised gross profit value
        realisedCost: number; // Current realised position value
        isOpen: boolean; // Opened position or not
        markPrice: number; // Mark price
        markValue: number; // Mark value
        posCost: number; // Position value
        posCross: number; // added margin
        posInit: number; // Leverage margin
        posComm: number; // Bankruptcy cost
        posLoss: number; // Funding fees paid out
        posMargin: number; // Bankruptcy cost
        posMaint: number; // Maintenance margin
        maintMargin: number; // Position margin
        realisedGrossPnl: number; // Accumulated realised gross profit value
        realisedPnl: number; // Realised profit and loss
        unrealisedPnl: number; // Unrealised profit and loss
        unrealisedPnlPcnt: number; // Profit-loss ratio of the position
        unrealisedRoePcnt: number; // Rate of return on investment
        avgEntryPrice: number; // Average entry price
        liquidationPrice: number; // Liquidation price
        bankruptPrice: number; // Bankruptcy price
        settleCurrency: string; // Currency used to clear and settle the trades
        maintainMargin: number; // Maintenance margin rate
        userId: number; // userId
        riskLimitLevel: number; // Risk Limit Level
      }[]
    >
  > {
    return this.getPrivate('api/v1/positions', params);
  }

  /**
   * Modify Auto-Deposit Margin Status
   */
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
  }): Promise<
    APISuccessResponse<{
      id: string; // Position ID
      symbol: string; // Symbol of the contract
      autoDeposit: boolean; // Auto deposit margin or not
      maintMarginReq: number; // Maintenance margin requirement
      riskLimit: number; // Risk limit
      realLeverage: number; // Leverage of the order
      crossMode: boolean; // Cross mode or not
      delevPercentage: number; // ADL ranking percentile
      openingTimestamp: number; // Open time
      currentTimestamp: number; // Current timestamp
      currentQty: number; // Current position quantity
      currentCost: number; // Current position value
      currentComm: number; // Current commission
      unrealisedCost: number; // Unrealised value
      realisedGrossCost: number; // Accumulated realised gross profit value
      realisedCost: number; // Current realised position value
      isOpen: boolean; // Opened position or not
      markPrice: number; // Mark price
      markValue: number; // Mark value
      posCost: number; // Position value
      posCross: number; // added margin
      posInit: number; // Leverage margin
      posComm: number; // Bankruptcy cost
      posLoss: number; // Funding fees paid out
      posMargin: number; // Position margin
      posMaint: number; // Maintenance margin
      maintMargin: number; // Position margin
      realisedGrossPnl: number; // Accumulated realised gross profit value
      realisedPnl: number; // Realised profit and loss
      unrealisedPnl: number; // Unrealised profit and loss
      unrealisedPnlPcnt: number; // Profit-loss ratio of the position
      unrealisedRoePcnt: number; // Rate of return on investment
      avgEntryPrice: number; // Average entry price
      liquidationPrice: number; // Liquidation price
      bankruptPrice: number; // Bankruptcy price
      settleCurrency: string; // Currency used to clear and settle the trades
      userId: number; // userId
    }>
  > {
    return this.postPrivate('api/v1/position/margin/deposit-margin', params);
  }

  /**
   *
   * Futures risk limit
   *
   */

  getRiskLimitLevel(params: { symbol: string }): Promise<
    APISuccessResponse<
      Array<{
        symbol: string; // Path parameter. Symbol of the contract.
        level: number; // level
        maxRiskLimit: number; // Upper limit (includes)
        minRiskLimit: number; // Lower limit
        maxLeverage: number; // Max leverage
        initialMargin: number; // Initial margin rate
        maintainMargin: number; // Maintenance margin rate
      }>
    >
  > {
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

  getFundingRate(params: { symbol: string }): Promise<
    APISuccessResponse<{
      symbol: string; // Funding Rate Symbol
      granularity: number; // Granularity (milliseconds)
      timePoint: number; // Time point (milliseconds)
      value: number; // Funding rate
      predictedValue: number; // Predicted funding rate
    }>
  > {
    return this.get(`api/v1/funding-rate/${params.symbol}/current`);
  }

  getFundingRates(params: {
    symbol: string;
    from: number;
    to: number;
  }): Promise<
    APISuccessResponse<
      Array<{
        symbol: string; // Symbol of the contract
        timePoint: number; // Time point (milliseconds)
        fundingRate: number; // Funding rate
      }>
    >
  > {
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
  }): Promise<
    APISuccessResponse<{
      dataList: Array<{
        id: number; // id
        symbol: string; // Symbol of the contract
        timePoint: number; // Time point (milliseconds)
        fundingRate: number; // Funding rate
        markPrice: number; // Mark price
        positionQty: number; // Position size
        positionCost: number; // Position value at settlement period
        funding: number; // Settled funding fees. A positive number means that the user received the funding fee, and vice versa.
        settleCurrency: string; // settlement currency
      }>;
      hasMore: boolean; // Whether there are more pages
    }>
  > {
    return this.getPrivate('api/v1/funding-history', params);
  }
}
