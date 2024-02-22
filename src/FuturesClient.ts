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
import { NewFuturesOrderV1 } from './types/request/futures.types.js';

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

  submitFuturesOrder(
    params: NewFuturesOrderV1,
  ): Promise<APISuccessResponse<{ orderId: string }>> {
    return this.postPrivate('api/v1/orders', params);
  }
}
