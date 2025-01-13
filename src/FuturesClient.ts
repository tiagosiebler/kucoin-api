import { AxiosRequestConfig } from 'axios';
import { nanoid } from 'nanoid';

import { BaseRestClient } from './lib/BaseRestClient.js';
import {
  REST_CLIENT_TYPE_ENUM,
  RestClientOptions,
  RestClientType,
} from './lib/requestUtils.js';
import {
  CreateSubAPIRequest,
  DeleteSubAPIRequest,
  GetSubAPIsRequest,
  GetTransfersRequest,
  SubmitTransfer,
  UpdateSubAPIRequest,
} from './types/request/futures.types.js';
import {
  CreateSubAccountAPI,
  FuturesTransferRecords,
  SubAccountAPI,
  TransferDetail,
  UpdateSubAccountAPI,
} from './types/response/futures.types.js';
import {
  APISuccessResponse,
  ServiceStatus,
} from './types/response/shared.types.js';

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

  getServerTime(): Promise<APISuccessResponse<number>> {
    return this.get('api/v1/timestamp');
  }

  getServiceStatus(): Promise<APISuccessResponse<ServiceStatus>> {
    return this.get('api/v1/status');
  }

  /**
   * REST - ACCOUNT  - BASIC INFO
   * Get Account Ledgers - Futures
   */

  /**
   * REST - ACCOUNT  - SUBACCOUNT API
   */

  getSubAPIs(
    params: GetSubAPIsRequest,
  ): Promise<APISuccessResponse<SubAccountAPI[]>> {
    return this.getPrivate('api/v1/sub/api-key', params);
  }

  createSubAPI(
    params: CreateSubAPIRequest,
  ): Promise<APISuccessResponse<CreateSubAccountAPI>> {
    return this.postPrivate('api/v1/sub/api-key', params);
  }

  updateSubAPI(
    params: UpdateSubAPIRequest,
  ): Promise<APISuccessResponse<UpdateSubAccountAPI>> {
    return this.postPrivate('api/v1/sub/api-key/update', params);
  }

  deleteSubAPI(params: DeleteSubAPIRequest): Promise<
    APISuccessResponse<{
      subName: string;
      apiKey: string;
    }>
  > {
    return this.deletePrivate('api/v1/sub/api-key', params);
  }

  /**
   * REST - FUNDING - FUNDING OVERVIEW
   */

  /**
   * REST - FUNDING - TRANSFER
   */

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the GET /api/v3/accounts/universal-transfer endpoint instead of this endpoint
   */
  submitTransferOut(
    params: SubmitTransfer,
  ): Promise<Promise<APISuccessResponse<TransferDetail>>> {
    return this.postPrivate('api/v3/transfer-out', params);
  }

  /**
   * @deprecated This method is deprecated.
   * It is recommended to use the GET /api/v3/accounts/universal-transfer endpoint instead of this endpoint
   */
  submitTransferIn(params: SubmitTransfer): Promise<any> {
    return this.postPrivate('api/v1/transfer-in', params);
  }

  /**
   * @deprecated This method is deprecated.
   */
  getTransfers(
    params: GetTransfersRequest,
  ): Promise<APISuccessResponse<FuturesTransferRecords>> {
    return this.getPrivate('api/v1/transfer-list', params);
  }

  /**
   * REST - FUNDING - TRADE FEE
   */

  /**
   *
   * REST - FUTURES TRADING - Market Data
   *
   */

  /**
   *
   * REST - FUTURES TRADING - Orders
   *
   */

  /**s
   * @deprecated, use cancelAllOrdersV3 instead
   */
  cancelAllOrders(params?: {
    symbol?: string;
  }): Promise<APISuccessResponse<{ cancelledOrderIds: string[] }>> {
    return this.deletePrivate('api/v1/orders', params);
  }

  /**
   *
   * REST - FUTURES TRADING - Fills
   *
   */

  /**
   * Get a list of recent fills.
   *
   * If you need to get your recent trade history with low latency, please query endpoint Get List of Orders Completed in 24h.
   * The requested data is not real-time.
   */

  /**
   * Get a list of recent 1000 fills in the last 24 hours.
   *
   * If you need to get your recent traded order history with low latency, you may query this endpoint.
   */

  /**
   *
   * REST - FUTURES TRADING - Positions
   *
   */

  /**
   * @deprecated This method is deprecated.
   * Currently, it is not recommended to use the Isolated margin + auto deposit margin feature.
   * It is recommended to switch to the cross margin mode.
   * Please refer to POST /api/v2/position/changeMarginMode endpoint
   */
  updateAutoDepositStatus(params: {
    symbol: string;
    status: boolean;
  }): Promise<APISuccessResponse<boolean>> {
    return this.postPrivate(
      'api/v1/position/margin/auto-deposit-status',
      params,
    );
  }

  /**
   *
   * REST - FUTURES TRADING - Risk limit
   *
   */

  /**
   *
   * REST - FUTURES TRADING - Funding fees
   *
   */
}
