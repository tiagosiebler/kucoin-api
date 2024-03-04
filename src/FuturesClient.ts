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

  cancelAccountOrderById(params: { orderId: string }): Promise<any> {
    return this.deletePrivate(`api/v1/orders/${params.orderId}`);
  }

  //check docs, very weird. Maybe ask API guys to check
  cancelOrderByClientOid(params: { clientOid: string }): Promise<any> {
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
  }): Promise<any> {
    return this.postPrivate('api/v1/orders/multi', params);
  }

  cancelMultipleOrders(params?: { symbol?: string }): Promise<any> {
    return this.deletePrivate('api/v1/orders', params);
  }

  cancelMultipleStopOrders(params?: { symbol?: string }): Promise<any> {
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
  }): Promise<any> {
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
  }): Promise<any> {
    return this.getPrivate('api/v1/stopOrders', params);
  }

  getAccountRecentOrders(params?: { symbol?: string }): Promise<any> {
    return this.getPrivate('api/v1/recentDoneOrders', params);
  }

  getAccountOrderDetailsByOrderId(params: { orderId: string }): Promise<any> {
    return this.getPrivate(`api/v1/orders/${params.orderId}`);
  }

  getAccountOrderDetailsByClientOrderId(params: {
    clientOid: string;
  }): Promise<any> {
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
  }): Promise<any> {
    return this.getPrivate('api/v1/fills', params);
  }

  /**
   * Get a list of recent 1000 fills in the last 24 hours.
   *
   * If you need to get your recent traded order history with low latency, you may query this endpoint.
   */
  getAccountRecentFills(params?: { symbol?: string }): Promise<any> {
    return this.getPrivate('api/v1/recentFills', params);
  }

  getAccountActiveOrderValueCalculation(params: {
    symbol: string;
  }): Promise<any> {
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
  getAccountPosition(params: { symbol: string }): Promise<any> {
    return this.getPrivate('api/v1/position', params);
  }

  /**
   * Get Position List
   */
  getAccountPositions(params?: { currency?: string }): Promise<any> {
    return this.getPrivate('api/v1/positions', params);
  }

  /**
   * Modify Auto-Deposit Margin Status
   */
  setAutoDepositMarginStatus(params: {
    symbol: string;
    status: boolean;
  }): Promise<any> {
    return this.postPrivate(
      'api/v1/position/margin/auto-deposit-status',
      params,
    );
  }

  getMaxWithdrawMargin(params: { symbol: string }): Promise<any> {
    return this.getPrivate('api/v1/margin/maxWithdrawMargin', params);
  }

  removeMarginManually(params: {
    symbol: string;
    withdrawAmount: string;
  }): Promise<any> {
    return this.postPrivate('api/v1/margin/withdrawMargin', params);
  }

  addMarginManually(params: {
    symbol: string;
    margin: number;
    bizNo: string;
  }): Promise<any> {
    return this.postPrivate('api/v1/position/margin/deposit-margin', params);
  }

  /**
   *
   * Futures risk limit
   *
   */

  getRiskLimitLevel(params: { symbol: string }): Promise<any> {
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

  getFundingRate(params: { symbol: string }): Promise<any> {
    return this.get(`api/v1/funding-rate/${params.symbol}/current`);
  }

  getFundingRates(params: {
    symbol: string;
    from: number;
    to: number;
  }): Promise<any> {
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
  }): Promise<any> {
    return this.getPrivate('api/v1/funding-history', params);
  }
}
