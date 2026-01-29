import { FuturesClient } from './FuturesClient.js';
import { SignedRequest } from './lib/BaseRestClient.js';
import { BaseWebsocketClient, EmittableEvent } from './lib/BaseWSClient.js';
import { neverGuard } from './lib/misc-util.js';
import {
  APIIDFutures,
  APIIDFuturesSign,
  APIIDMain,
  APIIDMainSign,
  RestClientOptions,
  serializeParams,
} from './lib/requestUtils.js';
import {
  hashMessage,
  SignAlgorithm,
  SignEncodeMethod,
  signMessage,
} from './lib/webCryptoAPI.js';
import {
  getPromiseRefForWSAPIRequest,
  isWSAPIWsKey,
  WS_KEY_MAP,
  WsKey,
  WsTopicRequest,
} from './lib/websocket/websocket-util.js';
import { WSConnectedResult } from './lib/websocket/WsStore.types.js';
import { SpotClient } from './SpotClient.js';
import { APISuccessResponse } from './types/response/shared.types.js';
import { WsConnectionInfo, WsConnectionInfoV2 } from './types/response/ws.js';
import {
  Exact,
  WSAPIAuthenticationRequestFromServer,
  WsAPITopicRequestParamMap,
  WsAPITopicResponseMap,
  WsAPIWsKeyTopicMap,
  WsOperationV1,
  WsRequestOperationKucoin,
  WsRequestOperationV1,
  WsRequestOperationV2,
} from './types/websockets/ws-api.js';
import { MessageEventLike } from './types/websockets/ws-events.js';
import { WsMarket } from './types/websockets/ws-general.js';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export const WS_LOGGER_CATEGORY = { category: 'kucoin-ws' };

export interface WSAPIRequestFlags {
  /** If true, will skip auth requirement for WS API connection */
  authIsOptional?: boolean | undefined;
}

/** Any WS keys in this list will trigger auth on connect, if credentials are available */
const PRIVATE_WS_KEYS: WsKey[] = [
  WS_KEY_MAP.spotPrivateV1,
  WS_KEY_MAP.futuresPrivateV1,
  WS_KEY_MAP.privateV2,
];

/** Any WS keys in this list will ALWAYS skip the authentication process, even if credentials are available */
export const PUBLIC_WS_KEYS: WsKey[] = [
  WS_KEY_MAP.spotPublicV1,
  WS_KEY_MAP.futuresPublicV1,
  WS_KEY_MAP.spotPublicV2,
  WS_KEY_MAP.futuresPublicV2,
];

/**
 * WS topics are always a string for this exchange. Some exchanges use complex objects.
 */
type WsTopic = string;

export class WebsocketClient extends BaseWebsocketClient<WsKey> {
  private RESTClientCache: Record<
    WsMarket,
    SpotClient | FuturesClient | undefined
  > = {
    spot: undefined,
    futures: undefined,
  };

  private getRESTClient(wsKey: WsKey): SpotClient | FuturesClient {
    const getClientType = (wsKey: WsKey): 'spot' | 'futures' | null => {
      if (wsKey.startsWith('spot')) return 'spot';
      if (wsKey.startsWith('futures')) return 'futures';

      if (wsKey === WS_KEY_MAP.privateV2) {
        return 'spot'; // arbitrarily pick spot for privateV2, as it covers both spot & futures
      }

      return null;
    };

    const clientType = getClientType(wsKey);
    if (!clientType) {
      throw new Error(`Unhandled WsKey: "${wsKey}"`);
    }

    if (this.RESTClientCache[clientType]) {
      return this.RESTClientCache[clientType]!;
    }

    const ClientClass = clientType === 'spot' ? SpotClient : FuturesClient;
    const newClient = new ClientClass(
      this.getRestClientOptions(),
      this.options.requestOptions,
    );

    this.RESTClientCache[clientType] = newClient;

    return newClient;
  }

  private getRestClientOptions(): RestClientOptions {
    return {
      apiKey: this.options.apiKey,
      apiSecret: this.options.apiSecret,
      ...this.options,
      ...this.options.restOptions,
    };
  }

  private async getWSConnectionInfo(
    wsKey: WsKey,
  ): Promise<APISuccessResponse<WsConnectionInfo | WsConnectionInfoV2>> {
    const restClient = this.getRESTClient(wsKey);

    if (wsKey === WS_KEY_MAP.privateV2) {
      return restClient.getPrivateWSConnectionTokenV2();
    }

    if (PRIVATE_WS_KEYS.includes(wsKey)) {
      return restClient.getPrivateWSConnectionToken();
    }

    return restClient.getPublicWSConnectionToken();
  }

  private async signMessage(
    paramsStr: string,
    secret: string,
    method: SignEncodeMethod,
    algorithm: SignAlgorithm,
  ): Promise<string> {
    if (typeof this.options.customSignMessageFn === 'function') {
      return this.options.customSignMessageFn(paramsStr, secret);
    }
    return await signMessage(paramsStr, secret, method, algorithm);
  }

  /**
   * Request connection of all dependent (public & private) websockets, instead of waiting for automatic connection by library
   */
  public connectAll(): Promise<(WSConnectedResult | undefined)[]> {
    return Promise.all([
      this.connect(WS_KEY_MAP.spotPublicV1),
      this.connect(WS_KEY_MAP.spotPrivateV1),
      this.connect(WS_KEY_MAP.futuresPublicV1),
      this.connect(WS_KEY_MAP.futuresPrivateV1),
    ]);
  }

  /**
   * Request subscription to one or more topics. Pass topics as either an array of strings, or array of objects (if the topic has parameters).
   * Objects should be formatted as {topic: string, params: object}.
   *
   * - Subscriptions are automatically routed to the correct websocket connection.
   * - Authentication/connection is automatic.
   * - Resubscribe after network issues is automatic.
   *
   * Call `unsubscribe(topics)` to remove topics
   */
  public subscribe(
    requests:
      | (WsTopicRequest<WsTopic> | WsTopic)
      | (WsTopicRequest<WsTopic> | WsTopic)[],
    wsKey: WsKey,
  ) {
    if (!Array.isArray(requests)) {
      this.subscribeTopicsForWsKey([requests], wsKey);
      return;
    }

    if (requests.length) {
      this.subscribeTopicsForWsKey(requests, wsKey);
    }
  }

  /**
   * Unsubscribe from one or more topics. Similar to subscribe() but in reverse.
   *
   * - Requests are automatically routed to the correct websocket connection.
   * - These topics will be removed from the topic cache, so they won't be subscribed to again.
   */
  public unsubscribe(
    requests:
      | (WsTopicRequest<WsTopic> | WsTopic)
      | (WsTopicRequest<WsTopic> | WsTopic)[],
    wsKey: WsKey,
  ) {
    if (!Array.isArray(requests)) {
      this.unsubscribeTopicsForWsKey([requests], wsKey);
      return;
    }

    if (requests.length) {
      this.unsubscribeTopicsForWsKey(requests, wsKey);
    }
  }

  async sendWSAPIRequest<
    TWSKey extends keyof WsAPIWsKeyTopicMap,
    TWSOperation extends WsAPIWsKeyTopicMap[TWSKey],
    // if this throws a type error, probably forgot to add a new operation to WsAPITopicRequestParamMap
    TWSParams extends Exact<WsAPITopicRequestParamMap[TWSOperation]>,
    TWSAPIResponse extends
      WsAPITopicResponseMap[TWSOperation] = WsAPITopicResponseMap[TWSOperation],
  >(
    wsKey: TWSKey,
    operation: TWSOperation,
    params: TWSParams & { signRequest?: boolean },
    requestFlags?: WSAPIRequestFlags,
  ): Promise<TWSAPIResponse> {
    /**
     * Base Info:
     * - https://www.kucoin.com/docs-new/websocket-api/base-info/introduction
     *
     * Add/Cancel API info:
     * - https://www.kucoin.com/docs-new/3470133w0
     **/

    // this.logger.trace(`sendWSAPIRequest(): assertIsConnected("${wsKey}")...`);
    await this.assertIsConnected(wsKey);
    // this.logger.trace('sendWSAPIRequest(): assertIsConnected(${wsKey}) ok');

    // Some commands don't require authentication.
    if (requestFlags?.authIsOptional !== true) {
      // this.logger.trace(
      //   'sendWSAPIRequest(): assertIsAuthenticated(${wsKey})...',
      // );
      await this.assertIsAuthenticated(wsKey);
      // this.logger.trace(
      //   'sendWSAPIRequest(): assertIsAuthenticated(${wsKey}) ok',
      // );
    }

    const request: WsRequestOperationKucoin<string> = {
      id: this.getNewRequestId(),
      op: operation,
      args: Array.isArray(params)
        ? [...params]
        : {
            ...params,
          },
    };

    // Sign, if needed
    const signedEvent = await this.signWSAPIRequest(request);

    // Store deferred promise, resolved within the "resolveEmittableEvents" method while parsing incoming events
    const promiseRef = getPromiseRefForWSAPIRequest(wsKey, signedEvent);

    const deferredPromise = this.getWsStore().createDeferredPromise<
      TWSAPIResponse & { request: any }
    >(wsKey, promiseRef, false);

    // Enrich returned promise with request context for easier debugging
    deferredPromise.promise
      ?.then((res) => {
        if (!Array.isArray(res)) {
          res.request = {
            wsKey,
            ...signedEvent,
          };
        }

        return res;
      })
      .catch((e) => {
        if (typeof e === 'string') {
          this.logger.error('unexpcted string', { e });
          return e;
        }
        e.request = {
          wsKey,
          operation,
          params: signedEvent.args,
        };
        // throw e;
        return e;
      });

    this.logger.trace(
      `sendWSAPIRequest(): sending raw request: ${JSON.stringify(signedEvent)} with promiseRef(${promiseRef})`,
    );

    // Send event.
    const throwExceptions = true;
    this.tryWsSend(wsKey, JSON.stringify(signedEvent), throwExceptions);

    this.logger.trace(
      `sendWSAPIRequest(): sent "${operation}" event with promiseRef(${promiseRef})`,
    );

    // Return deferred promise, so caller can await this call
    return deferredPromise.promise!;
  }

  /**
   *
   * Internal methods
   *
   */

  private async signWSAPIRequest<TRequestParams extends string = string>(
    requestEvent: WsRequestOperationKucoin<TRequestParams>,
  ): Promise<WsRequestOperationKucoin<TRequestParams>> {
    return requestEvent;
  }

  /**
   * Whatever url this method returns, it's connected to as-is!
   *
   * If a token or anything else is needed in the URL, this is a good place to add it.
   */
  protected async getWsUrl(wsKey: WsKey): Promise<string> {
    if (this.options.wsUrl) {
      return this.options.wsUrl;
    }

    switch (wsKey) {
      case WS_KEY_MAP.spotPublicV1:
      case WS_KEY_MAP.spotPrivateV1:
      case WS_KEY_MAP.futuresPublicV1:
      case WS_KEY_MAP.futuresPrivateV1: {
        // These WS URLs are dynamically fetched via the REST API, as per API spec
        const connectionInfo = await this.getWSConnectionInfo(wsKey);
        this.logger.trace('getWSConnectionInfo', {
          wsKey,
          ...connectionInfo,
        });

        const servers = connectionInfo.data.instanceServers;
        if (!servers || !servers.length) {
          this.logger.error(
            'No servers returned by connection info response?',
            JSON.stringify(
              {
                wsKey,
                connectionInfo,
              },
              null,
              2,
            ),
          );
          throw new Error('No servers returned by connection info response?');
        }

        const server = servers[0];
        const connectionUrl = `${server.endpoint}?token=${connectionInfo.data.token}`;
        return connectionUrl;
      }
      case WS_KEY_MAP.privateV2: {
        // https://www.kucoin.com/docs-new/websocket-api/base-info/introduction-uta#3-create-connection
        const baseWSUrl = 'wss://wsapi-push.kucoin.com/?token=';

        const connectionInfo = await this.getWSConnectionInfo(wsKey);

        const connectionUrl = baseWSUrl + connectionInfo.data.token;
        return connectionUrl;
      }
      // https://www.kucoin.com/docs-new/websocket-api/base-info/introduction-uta
      case WS_KEY_MAP.spotPublicV2: {
        return 'wss://x-push-spot.kucoin.com';
      }
      case WS_KEY_MAP.futuresPublicV2: {
        return 'wss://x-push-futures.kucoin.com';
      }
      case WS_KEY_MAP.wsApiSpotV1:
      case WS_KEY_MAP.wsApiFuturesV1: {
        // WS API URL works differently: https://www.kucoin.com/docs-new/3470133w0
        // wss://wsapi.kucoin.com/v1/private?apikey=xxx&sign=xxx&passphrase=xxx&timestamp=xxx

        const WS_API_ENDPOINT = 'v1/private';
        const WS_API_BASE_URL = 'wss://wsapi.kucoin.com/';

        const isSpotWsKey = wsKey === WS_KEY_MAP.wsApiSpotV1;

        // ws_url = f"{url}/v1/private?{url_path}&sign={sign_value}&passphrase={passphrase_sign}"

        const queryString = {
          apikey: this.options.apiKey,
          timestamp: Date.now(),
          sign: '',
          passphrase: '',
          partner: isSpotWsKey ? APIIDMain : APIIDFutures,
          partner_sign: '',
        };
        // original = f"{apikey}{timestamp}"
        const paramsStr = `${queryString.apikey}${queryString.timestamp}`;

        queryString.passphrase = await this.signMessage(
          this.options.apiPassphrase!,
          this.options.apiSecret!,
          'base64',
          'SHA-256',
        );

        queryString.sign = await this.signMessage(
          paramsStr,
          this.options.apiSecret!,
          'base64',
          'SHA-256',
        );

        const partnerSignParam = `${queryString.timestamp}${queryString.partner}${queryString.apikey}`;

        queryString.partner_sign = await this.signMessage(
          partnerSignParam,
          isSpotWsKey ? APIIDMainSign : APIIDFuturesSign,
          'base64',
          'SHA-256',
        );

        const strictParamValidation = false;
        const encodeQueryStringValues = true;

        const finalQueryString = serializeParams(
          queryString,
          strictParamValidation,
          encodeQueryStringValues,
          '?',
        );

        const finalUrl = WS_API_BASE_URL + WS_API_ENDPOINT + finalQueryString;

        // console.log('signParams: ', {
        //   paramsStr,
        //   partnerSignParam,
        //   queryString,
        //   finalUrl,
        // });

        return finalUrl;
      }
      default: {
        throw neverGuard(wsKey, `Unhandled WsKey "${wsKey}} in getWsUrl()`);
      }
    }
  }

  protected sendPingEvent(wsKey: WsKey) {
    if (isWSAPIWsKey(wsKey)) {
      return this.tryWsSend(
        wsKey,
        `{"id": "ping-${this.getNewRequestId()}", "op": "ping", "timestamp": "${Date.now()}"}`,
      );
    }
    return this.tryWsSend(wsKey, `{ "id": "${Date.now()}", "type": "ping" }`);
  }

  protected sendPongEvent(wsKey: WsKey) {
    try {
      this.logger.trace('Sending upstream ws PONG: ', {
        ...WS_LOGGER_CATEGORY,
        wsMessage: 'PONG',
        wsKey,
      });
      if (!wsKey) {
        throw new Error('Cannot send PONG, no wsKey provided');
      }

      const wsState = this.getWsStore().get(wsKey);
      if (!wsState || !wsState?.ws) {
        throw new Error(`Cannot send pong, ${wsKey} socket not connected yet`);
      }

      // Send a protocol layer pong
      wsState.ws.pong();
    } catch (e) {
      this.logger.error('Failed to send WS PONG', {
        ...WS_LOGGER_CATEGORY,
        wsMessage: 'PONG',
        wsKey,
        exception: e,
      });
    }
  }

  // Not really used for kucoin - they don't send pings
  protected isWsPing(msg: any): boolean {
    if (msg?.data === 'ping') {
      return true;
    }
    return false;
  }

  protected isWsPong(msg: any): boolean {
    if (msg?.data?.includes('pong')) {
      return true;
    }

    // this.logger.info(`Not a pong: `, msg);
    return false;
  }

  protected resolveEmittableEvents(
    wsKey: WsKey,
    event: MessageEventLike,
  ): EmittableEvent[] {
    const results: EmittableEvent[] = [];

    try {
      const parsed = JSON.parse(event.data);

      const isForWSAPIWsKey = isWSAPIWsKey(wsKey);

      const responseEvents = ['subscribe', 'unsubscribe', 'ack'];
      const authenticatedEvents = ['login', 'access'];
      const connectionReadyEvents = ['welcome'];

      const eventType = parsed.event || parsed.type;

      const traceEmittable = false;
      if (traceEmittable) {
        this.logger.info('resolveEmittableEvents', {
          ...WS_LOGGER_CATEGORY,
          wsKey,
          parsedEvent: JSON.stringify(event),
          parsedEventData: JSON.stringify(parsed),
          eventType,
          properties: {
            parsedEventId: parsed?.id,
            parsedEventErrorCode: parsed?.code,
          },
          // parsed: JSON.stringify(parsed, null, 2),
        });
      }

      if (typeof eventType === 'string') {
        if (parsed.success === false) {
          results.push({
            eventType: 'exception',
            event: parsed,
          });
          return results;
        }

        if (connectionReadyEvents.includes(eventType)) {
          results.push({
            eventType: 'connectionReady',
            event: parsed,
          });

          return results;
        }

        // These are request/reply pattern events (e.g. after subscribing to topics or authenticating)
        if (responseEvents.includes(eventType)) {
          results.push({
            eventType: 'response',
            event: parsed,
          });
          return results;
        }

        // Request/reply pattern for authentication success
        if (authenticatedEvents.includes(eventType)) {
          results.push({
            eventType: 'authenticated',
            event: parsed,
          });
          return results;
        }

        if (eventType === 'message') {
          return [{ eventType: 'update', event: parsed }];
        }

        this.logger.error(
          `!! (${wsKey}) Unhandled string event type "${eventType}". Defaulting to "update" channel...`,
          parsed,
        );

        results.push({
          eventType: 'update',
          event: parsed,
        });

        return results;
      }

      if (!eventType) {
        if (isForWSAPIWsKey) {
          const isWSAPIResponse = typeof parsed.op === 'string';
          if (isWSAPIResponse) {
            const parsedEventErrorCode = Number(parsed.code);
            const parsedEventId = parsed.id;

            const isError =
              typeof parsedEventErrorCode === 'number' &&
              parsedEventErrorCode !== 0 &&
              parsedEventErrorCode !== 200000;

            // This is the counterpart to getPromiseRefForWSAPIRequest
            const promiseRef = [wsKey, parsedEventId].join('_');

            if (!parsedEventId) {
              this.logger.error(
                'WS API response is missing reqId - promisified workflow could get stuck. If this happens, please get in touch with steps to reproduce. Trace:',
                {
                  wsKey,
                  promiseRef,
                  parsedEvent: parsed,
                },
              );
            }

            // WS API Exception
            if (isError) {
              try {
                this.getWsStore().rejectDeferredPromise(
                  wsKey,
                  promiseRef,
                  {
                    wsKey,
                    ...parsed,
                  },
                  true,
                );
              } catch (e) {
                this.logger.error('Exception trying to reject WSAPI promise', {
                  wsKey,
                  promiseRef,
                  parsedEvent: parsed,
                  e,
                });
              }

              results.push({
                eventType: 'exception',
                event: parsed,
                isWSAPIResponse: isWSAPIResponse,
              });
              return results;
            }

            // WS API Success
            try {
              this.getWsStore().resolveDeferredPromise(
                wsKey,
                promiseRef,
                {
                  wsKey,
                  ...parsed,
                },
                true,
              );
            } catch (e) {
              this.logger.error('Exception trying to resolve WSAPI promise', {
                wsKey,
                promiseRef,
                parsedEvent: parsed,
                e,
              });
            }

            results.push({
              eventType: 'response',
              event: {
                ...parsed,
              },
              isWSAPIResponse: isWSAPIResponse,
            });

            return results;
          }

          if (parsed.sessionId && parsed.data === 'welcome') {
            results.push({
              eventType: 'authenticated',
              event: parsed,
            });
            return results;
          }
          if (parsed.sessionId && parsed.timestamp) {
            results.push({
              eventType: 'connectionReady',
              event: parsed,
            });
            results.push({
              eventType: 'connectionReadyForAuth',
              event: parsed,
            });
            return results;
          }
        }
      }

      this.logger.error(
        `!! (${wsKey}) Unhandled non-string event type "${eventType}". Defaulting to "update" channel...`,
        parsed,
      );

      results.push({
        eventType: 'update',
        event: parsed,
      });
    } catch (e) {
      results.push({
        event: {
          message: 'Failed to parse event data due to exception',
          exception: e,
          eventData: event.data,
        },
        eventType: 'exception',
      });

      this.logger.error('Failed to parse event data due to exception: ', {
        exception: e,
        eventData: event.data,
      });
    }

    return results;
  }

  /**
   * Determines if a topic is for a private channel, using a hardcoded list of strings
   */
  protected isPrivateTopicRequest(
    request: WsTopicRequest<string>,
    wsKey: WsKey,
  ): boolean {
    return request && PRIVATE_WS_KEYS.includes(wsKey);
  }

  private getWSKeyVersion(wsKey: WsKey): 'v1' | 'v2' {
    switch (wsKey) {
      case WS_KEY_MAP.spotPublicV1:
      case WS_KEY_MAP.spotPrivateV1:
      case WS_KEY_MAP.futuresPublicV1:
      case WS_KEY_MAP.futuresPrivateV1:
      case WS_KEY_MAP.wsApiSpotV1:
      case WS_KEY_MAP.wsApiFuturesV1: {
        return 'v1';
      }
      case WS_KEY_MAP.spotPublicV2:
      case WS_KEY_MAP.futuresPublicV2:
      case WS_KEY_MAP.privateV2: {
        return 'v2';
      }
      default: {
        throw neverGuard(wsKey, `Unhandled wsKey "${wsKey}"`);
      }
    }
  }

  protected getWsKeyForMarket(market: WsMarket, isPrivate: boolean): WsKey {
    return isPrivate
      ? market === 'spot'
        ? WS_KEY_MAP.spotPrivateV1
        : WS_KEY_MAP.futuresPrivateV1
      : market === 'spot'
        ? WS_KEY_MAP.spotPublicV1
        : WS_KEY_MAP.futuresPublicV1;
  }

  /** Not really in use for Kucoin */
  protected getWsMarketForWsKey(key: WsKey): WsMarket {
    switch (key) {
      case WS_KEY_MAP.futuresPrivateV1:
      case WS_KEY_MAP.futuresPublicV1:
      case WS_KEY_MAP.futuresPublicV2:
      case WS_KEY_MAP.wsApiFuturesV1: {
        return 'futures';
      }
      case WS_KEY_MAP.spotPrivateV1:
      case WS_KEY_MAP.spotPublicV1:
      case WS_KEY_MAP.spotPublicV2:
      case WS_KEY_MAP.wsApiSpotV1: {
        return 'spot';
      }
      case WS_KEY_MAP.privateV2: {
        return 'spot'; // arbitrarily pick spot for privateV2, as it covers both spot & futures
      }
      default: {
        throw neverGuard(key, `Unhandled ws key "${key}"`);
      }
    }
  }

  protected getPrivateWSKeys(): WsKey[] {
    return PRIVATE_WS_KEYS;
  }

  /** Force subscription requests to be sent in smaller batches, if a number is returned */
  protected getMaxTopicsPerSubscribeEvent(wsKey: WsKey): number | null {
    switch (wsKey) {
      case WS_KEY_MAP.futuresPrivateV1:
      case WS_KEY_MAP.futuresPublicV1:
      case WS_KEY_MAP.futuresPublicV2:
      case WS_KEY_MAP.spotPrivateV1:
      case WS_KEY_MAP.spotPublicV1:
      case WS_KEY_MAP.spotPublicV2:
      case WS_KEY_MAP.wsApiSpotV1:
      case WS_KEY_MAP.wsApiFuturesV1:
      case WS_KEY_MAP.privateV2: {
        // Return a number if there's a limit on the number of sub topics per rq
        // Always 1 at a time for this exchange
        return 1;
      }
      default: {
        throw neverGuard(
          wsKey,
          'getMaxTopicsPerSubscribeEvent(): Unhandled wsKey',
        );
      }
    }
  }

  /**
   * Map one or more topics into fully prepared "subscribe request" events (already stringified and ready to send)
   */
  protected async getWsOperationEventsForTopics(
    topicRequests: WsTopicRequest<string>[],
    wsKey: WsKey,
    operation: WsOperationV1,
  ): Promise<string[]> {
    if (!topicRequests.length) {
      return [];
    }

    const wsKeyVersion = this.getWSKeyVersion(wsKey);

    // Operations structured in a way that this exchange understands
    const operationEvents = topicRequests.map((topicRequest) => {
      const isPrivateWsTopic = this.isPrivateTopicRequest(topicRequest, wsKey);

      // V2 (Pro) requests are slightly different:
      if (wsKeyVersion === 'v2') {
        // https://www.kucoin.com/docs-new/websocket-api/base-info/introduction-uta#5-subscribe
        const wsRequestEvent: WsRequestOperationV2<WsTopic> = {
          id: getRandomInt(999999999999),
          action: operation,
          channel: topicRequest.topic,
          ...topicRequest.payload,
        };

        return wsRequestEvent;
      }

      const wsRequestEvent: WsRequestOperationV1<WsTopic> = {
        id: getRandomInt(999999999999),
        type: operation,
        topic: topicRequest.topic,
        privateChannel: isPrivateWsTopic,
        response: true,
        ...topicRequest.payload,
      };

      return wsRequestEvent;
    });

    // Events that are ready to send (usually stringified JSON)
    return operationEvents.map((event) => JSON.stringify(event));
  }

  protected async getWsAuthRequestEvent(
    wsKey: WsKey,
    eventToAuth?: WSAPIAuthenticationRequestFromServer,
  ): Promise<object | string | 'waitForEvent' | void> {
    // Send anything for WS API
    if (isWSAPIWsKey(wsKey)) {
      if (eventToAuth) {
        const eventToAuthAsString = JSON.stringify(eventToAuth);

        this.logger.trace(
          `getWsAuthRequestEvent(${wsKey}): responding to WS API auth handshake...`,
          {
            eventToAuth,
          },
        );

        const sessionInfo = await this.signMessage(
          eventToAuthAsString,
          this.options.apiSecret!,
          'base64',
          'SHA-256',
        );

        return sessionInfo;
      }

      // Don't send anything, don't resolve auth promise. Wait for auth handshake from server
      return 'waitForEvent';
    }

    // Don't send anything for all other WS connections, since they auth as part of the connection (not after connect). Returning an empty value here will short-circuit the assertIsAuthenticated workflow.
    return;
  }
}
