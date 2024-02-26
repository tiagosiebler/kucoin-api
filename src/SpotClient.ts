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
   * Get a list of acounts and their balance states
   */
  getAccountBalances(): Promise<APISuccessResponse<SpotAccountBalance[]>> {
    return this.getPrivate('api/v1/accounts');
  }

  getAccountSpotMarginLedgers(params?: any): Promise<APISuccessResponse<any>> {
    return this.getPrivate('api/v1/accounts/ledgers', params);
  }

  /**
   *
   ***********
   * Funding
   ***********
   *
   */

  /**
   *
   * Deposit
   *
   */

  getDeposits(params?: any): Promise<APISuccessResponse<any>> {
    return this.getPrivate('api/v1/deposits', params);
  }

  getHistoricalDeposits(params?: any): Promise<APISuccessResponse<any>> {
    return this.getPrivate('api/v1/hist-deposits', params);
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
   * Orders
   *
   */

  submitSpotOrder(params: NewSpotOrderV1): Promise<APISuccessResponse<any>> {
    return this.postPrivate('api/v1/orders', params);
  }
}
