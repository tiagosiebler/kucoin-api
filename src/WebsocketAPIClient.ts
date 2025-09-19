import { DefaultLogger } from './lib/websocket/logger.js';
import { WS_KEY_MAP, WSAPIWsKey } from './lib/websocket/websocket-util.js';
import {
  BatchCancelOrdersRequest,
  Order,
} from './types/request/futures.types.js';
import { SubmitHFMarginOrderRequest } from './types/request/spot-margin-trading.js';
import {
  ModifyHFOrderRequest,
  SubmitHFOrderRequest,
} from './types/request/spot-trading.js';
import {
  BatchCancelOrderResult,
  SubmitMultipleOrdersFuturesResponse,
} from './types/response/futures.types.js';
import { MarginSubmitOrderV3Response } from './types/response/spot-margin-trading.js';
import {
  SubmitHFOrderSyncResponse,
  SyncCancelHFOrderResponse,
} from './types/response/spot-trading.js';
import {
  WSAPICancelOrderRequest,
  WSAPIOrderResponse,
  WSAPIResponse,
} from './types/websockets/ws-api.js';
import { WSClientConfigurableOptions } from './types/websockets/ws-general.js';
import { WebsocketClient } from './WebsocketClient.js';

/**
 * Configurable options specific to only the REST-like WebsocketAPIClient
 */
export interface WSAPIClientConfigurableOptions {
  /**
   * Default: true
   *
   * Attach default event listeners, which will console log any high level
   * events (opened/reconnecting/reconnected/etc).
   *
   * If you disable this, you should set your own event listeners
   * on the embedded WS Client `wsApiClient.getWSClient().on(....)`.
   */
  attachEventListeners: boolean;
}

/**
 * This is a minimal Websocket API wrapper around the WebsocketClient.
 *
 * Some methods support passing in a custom "wsKey". This is a reference to which WS connection should
 * be used to transmit that message. This is only useful if you wish to use an alternative wss
 * domain that is supported by the SDK.
 *
 * Note: To use testnet, don't set the wsKey - use `testnet: true` in
 * the constructor instead.
 *
 * Note: You can also directly use the sendWSAPIRequest() method to make WS API calls, but some
 * may find the below methods slightly more intuitive.
 *
 * Refer to the WS API promises example for a more detailed example on using sendWSAPIRequest() directly:
 * https://github.com/tiagosiebler/binance/blob/master/examples/WebSockets/ws-api-raw-promises.ts#L108
 */
export class WebsocketAPIClient {
  private wsClient: WebsocketClient;

  private options: WSClientConfigurableOptions & WSAPIClientConfigurableOptions;

  constructor(
    options?: WSClientConfigurableOptions &
      Partial<WSAPIClientConfigurableOptions>,
    logger?: DefaultLogger,
  ) {
    this.wsClient = new WebsocketClient(options, logger);

    this.options = {
      attachEventListeners: true,
      ...options,
    };

    this.setupDefaultEventListeners();
  }

  public getWSClient(): WebsocketClient {
    return this.wsClient;
  }

  /**
   * Submit a spot order
   */
  submitNewSpotOrder(
    params: SubmitHFOrderRequest,
    wsKey?: WSAPIWsKey,
  ): Promise<WSAPIResponse<WSAPIOrderResponse>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.wsApiSpotV1,
      'spot.order',
      params,
    );
  }

  /**
   * Modify a spot order
   */
  modifySpotOrder(
    params: ModifyHFOrderRequest,
    wsKey?: WSAPIWsKey,
  ): Promise<WSAPIResponse<{ newOrderId: string; clientOid: string }>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.wsApiSpotV1,
      'spot.modify',
      params,
    );
  }

  /**
   * Cancel a spot order
   */
  cancelSpotOrder(
    params: WSAPICancelOrderRequest,
    wsKey?: WSAPIWsKey,
  ): Promise<WSAPIResponse<WSAPIOrderResponse>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.wsApiSpotV1,
      'spot.cancel',
      params,
    );
  }

  /**
   * Submit a sync spot order
   */
  submitSyncSpotOrder(
    params: SubmitHFOrderRequest,
    wsKey?: WSAPIWsKey,
  ): Promise<WSAPIResponse<SubmitHFOrderSyncResponse>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.wsApiSpotV1,
      'spot.sync_order',
      params,
    );
  }

  /**
   * Cancel a sync spot order
   */
  cancelSyncSpotOrder(
    params: WSAPICancelOrderRequest,
    wsKey?: WSAPIWsKey,
  ): Promise<WSAPIResponse<SyncCancelHFOrderResponse>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.wsApiSpotV1,
      'spot.sync_cancel',
      params,
    );
  }

  /**
   * Submit a margin order
   */
  submitMarginOrder(
    params: SubmitHFMarginOrderRequest,
    wsKey?: WSAPIWsKey,
  ): Promise<WSAPIResponse<MarginSubmitOrderV3Response>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.wsApiSpotV1,
      'margin.order',
      params,
    );
  }

  /**
   * Cancel a margin order
   */
  cancelMarginOrder(
    params: WSAPICancelOrderRequest,
    wsKey?: WSAPIWsKey,
  ): Promise<WSAPIResponse<WSAPIOrderResponse>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.wsApiSpotV1,
      'margin.cancel',
      params,
    );
  }

  /**
   * Submit a futures order
   */
  submitFuturesOrder(
    params: Order,
    wsKey?: WSAPIWsKey,
  ): Promise<WSAPIResponse<WSAPIOrderResponse>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.wsApiFuturesV1,
      'futures.order',
      params,
    );
  }

  /**
   * Cancel a futures order
   */
  cancelFuturesOrder(
    params: { orderId: string } | { clientOid: string; symbol: string },
    wsKey?: WSAPIWsKey,
  ): Promise<
    WSAPIResponse<{ cancelledOrderIds: string[] } | { clientOid: string }>
  > {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.wsApiFuturesV1,
      'futures.cancel',
      params,
    );
  }

  /**
   * Submit multiple futures orders
   */
  submitMultipleFuturesOrders(
    params: Order[],
    wsKey?: WSAPIWsKey,
  ): Promise<WSAPIResponse<SubmitMultipleOrdersFuturesResponse[]>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.wsApiFuturesV1,
      'futures.multi_order',
      params,
    );
  }

  /**
   * Cancel multiple futures orders
   */
  cancelMultipleFuturesOrders(
    params: BatchCancelOrdersRequest,
    wsKey?: WSAPIWsKey,
  ): Promise<WSAPIResponse<BatchCancelOrderResult[]>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.wsApiFuturesV1,
      'futures.multi_cancel',
      params,
    );
  }

  /**
   *
   *
   *
   *
   *
   *
   *
   * Private methods for handling some of the convenience/automation provided by the WS API Client
   *
   *
   *
   *
   *
   *
   *
   */

  public connectWSAPI(wsKey: WSAPIWsKey) {
    return this.getWSClient().assertIsAuthenticated(wsKey);
  }

  private setupDefaultEventListeners() {
    if (this.options.attachEventListeners) {
      /**
       * General event handlers for monitoring the WebsocketClient
       */
      this.wsClient
        .on('open', (data) => {
          console.log(new Date(), 'ws connected', data.wsKey);
        })
        .on('reconnect', ({ wsKey }) => {
          console.log(new Date(), 'ws automatically reconnecting.... ', wsKey);
        })
        .on('reconnected', (data) => {
          console.log(new Date(), 'ws has reconnected ', data?.wsKey);
        })
        .on('authenticated', (data) => {
          console.info(new Date(), 'ws has authenticated ', data?.wsKey);
        })
        .on('exception', (data) => {
          console.error(new Date(), 'ws exception: ', JSON.stringify(data));
        });
    }
  }
}
