import { AxiosRequestConfig } from 'axios';
import { nanoid } from 'nanoid';

import { BaseRestClient } from './lib/BaseRestClient.js';
import {
  REST_CLIENT_TYPE_ENUM,
  RestClientOptions,
  RestClientType,
} from './lib/requestUtils.js';
import { NewSpotOrderV1 } from './types/request/spot.types.js';
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

  //TODO:

  getDeposits(params?: any): Promise<APISuccessResponse<any>> {
    return this.getPrivate('api/v1/deposits', params);
  }

  getHistoricalDeposits(params?: any): Promise<APISuccessResponse<any>> {
    return this.getPrivate('api/v1/hist-deposits', params);
  }

  /**
   *
   * Withdrawals
   *
   */

  //TODO:

  /**
   *
   * Transfer
   *
   */

  //TODO:

  /**
   *
   * Trade Fee
   *
   */

  //TODO:

  /**
   *
   ***********
   * Spot Trading
   ***********
   *
   */

  /**
   *
   * Orders
   *
   */

  submitSpotOrder(params: NewSpotOrderV1): Promise<APISuccessResponse<any>> {
    return this.postPrivate('api/v1/orders', params);
  }
}
