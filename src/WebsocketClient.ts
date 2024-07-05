import WebSocket from 'isomorphic-ws';

import { BaseWebsocketClient, EmittableEvent } from './lib/BaseWSClient.js';
import { neverGuard } from './lib/misc-util.js';
import { signMessage } from './lib/webCryptoAPI.js';
import {
  MessageEventLike,
  WS_BASE_URL_MAP,
  WS_KEY_MAP,
  WsKey,
} from './lib/websocket/websocket-util.js';
import { WsMarket } from './types/websockets/client.js';
import {
  WsFuturesOperation,
  WsOperation,
  WsRequestOperation,
  WsSpotOperation,
} from './types/websockets/requests.js';

export const WS_LOGGER_CATEGORY = { category: 'kucoin-ws' };

/** Any WS keys in this list will trigger auth on connect, if credentials are available */
const PRIVATE_WS_KEYS: WsKey[] = [
  WS_KEY_MAP.spotPrivateV1,
  WS_KEY_MAP.futuresPrivateV1,
];

/** Any WS keys in this list will ALWAYS skip the authentication process, even if credentials are available */
export const PUBLIC_WS_KEYS: WsKey[] = [
  WS_KEY_MAP.spotPublicV1,
  WS_KEY_MAP.futuresPublicV1,
];

/**
 * WS topics are always a string for this exchange. Some exchanges use complex objects.
 */
type WsTopic = string;

export class WebsocketClient extends BaseWebsocketClient<
  WsMarket,
  WsKey,
  WsTopic
> {
  /**
   * Request connection of all dependent (public & private) websockets, instead of waiting for automatic connection by library
   */
  public connectAll(): Promise<WebSocket | undefined>[] {
    return [
      this.connect(WS_KEY_MAP.spotPublicV1),
      this.connect(WS_KEY_MAP.spotPrivateV1),
      this.connect(WS_KEY_MAP.futuresPublicV1),
      this.connect(WS_KEY_MAP.futuresPrivateV1),
    ];
  }

  /**
   * Request subscription to one or more topics.
   *
   * - Subscriptions are automatically routed to the correct websocket connection.
   * - Authentication/connection is automatic.
   * - Resubscribe after network issues is automatic.
   *
   * Call `unsubscribeTopics(topics)` to remove topics
   */
  public subscribeTopics(topics: WsTopic[]) {
    const topicsByWsKey = this.arrangeTopicsIntoWsKeyGroups(topics);

    for (const untypedWsKey in topicsByWsKey) {
      const typedWsKey = untypedWsKey as WsKey;
      const topics = topicsByWsKey[typedWsKey];

      this.subscribeTopicsForWsKey(topics, typedWsKey);
    }
  }

  /**
   * Unsubscribe from one or more topics.
   *
   * - Requests are automatically routed to the correct websocket connection.
   * - These topics will be removed from the topic cache, so they won't be subscribed to again.
   */
  public unsubscribeTopics(topics: WsTopic[]) {
    const topicsByWsKey = this.arrangeTopicsIntoWsKeyGroups(topics);

    for (const untypedWsKey in topicsByWsKey) {
      const typedWsKey = untypedWsKey as WsKey;
      const topics = topicsByWsKey[typedWsKey];

      this.subscribeTopicsForWsKey(topics, typedWsKey);
    }
  }

  /**
   *
   * Internal methods
   *
   */

  protected sendPingEvent(wsKey: WsKey) {
    switch (wsKey) {
      case WS_KEY_MAP.spotPublicV1:
      case WS_KEY_MAP.spotPrivateV1: {
        return this.tryWsSend(wsKey, 'ping');
      }
      case WS_KEY_MAP.futuresPublicV1:
      case WS_KEY_MAP.futuresPrivateV1: {
        return this.tryWsSend(wsKey, '{"action":"ping"}');
      }
      default: {
        throw neverGuard(wsKey, `Unhandled ping format: "${wsKey}"`);
      }
    }
  }

  protected isWsPong(msg: any): boolean {
    console.log(`isWsPing??`, msg?.data, msg?.event?.data);
    // spot
    if (msg?.data === 'pong') {
      return true;
    }

    // futures
    // if (typeof event?.data === 'string') {
    //   return true;
    // }
    if (
      typeof msg?.event?.data === 'string' &&
      msg.event.data.startsWith('pong')
    ) {
      return true;
    }

    // this.logger.info(`Not a pong: `, msg);

    return false;
  }

  protected resolveEmittableEvents(event: MessageEventLike): EmittableEvent[] {
    const results: EmittableEvent[] = [];

    try {
      const parsed = JSON.parse(event.data);

      const responseEvents = ['subscribe', 'unsubscribe'];
      const authenticatedEvents = ['login', 'access'];

      const eventAction = parsed.event || parsed.action;
      if (typeof eventAction === 'string') {
        if (parsed.success === false) {
          results.push({
            eventType: 'exception',
            event: parsed,
          });
          return results;
        }

        // These are request/reply pattern events (e.g. after subscribing to topics or authenticating)
        if (responseEvents.includes(eventAction)) {
          results.push({
            eventType: 'response',
            event: parsed,
          });
          return results;
        }

        // Request/reply pattern for authentication success
        if (authenticatedEvents.includes(eventAction)) {
          results.push({
            eventType: 'authenticated',
            event: parsed,
          });
          return results;
        }

        this.logger.error(
          `!! Unhandled string event type "${eventAction}. Defaulting to "update" channel...`,
          parsed,
        );
      }

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

      this.logger.error(`Failed to parse event data due to exception: `, {
        exception: e,
        eventData: event.data,
      });
    }

    return results;
  }

  /**
   * Determines if a topic is for a private channel, using a hardcoded list of strings
   */
  protected isPrivateChannel(topic: WsTopic): boolean {
    const splitTopic = topic.toLowerCase().split('/');
    if (!splitTopic.length) {
      return false;
    }

    const topicName = splitTopic[1];

    if (!topicName) {
      // console.error(`No topic name? "${topicName}" from topic "${topic}"?`);
      return false;
    }

    if (
      /** Spot */
      topicName.startsWith('user') ||
      /** Futures */
      topicName.startsWith('asset') ||
      topicName.startsWith('position') ||
      topicName.startsWith('order') ||
      topicName.startsWith('position')
    ) {
      return true;
    }

    return false;
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

  protected getWsMarketForWsKey(key: WsKey): WsMarket {
    switch (key) {
      case 'futuresPrivateV1':
      case 'futuresPublicV1': {
        return 'futures';
      }
      case 'spotPrivateV1':
      case 'spotPublicV1': {
        return 'spot';
      }
      default: {
        throw neverGuard(key, `Unhandled ws key "${key}"`);
      }
    }
  }

  protected getWsKeyForTopic(topic: WsTopic): WsKey {
    const market = this.getMarketForTopic(topic);
    const isPrivateTopic = this.isPrivateChannel(topic);

    return this.getWsKeyForMarket(market, isPrivateTopic);
  }

  protected getPrivateWSKeys(): WsKey[] {
    return PRIVATE_WS_KEYS;
  }

  protected getWsUrl(wsKey: WsKey): string {
    if (this.options.wsUrl) {
      return this.options.wsUrl;
    }

    const networkKey = 'livenet';

    switch (wsKey) {
      case WS_KEY_MAP.spotPublicV1: {
        return WS_BASE_URL_MAP.spotPublicV1.all[networkKey];
      }
      case WS_KEY_MAP.spotPrivateV1: {
        return WS_BASE_URL_MAP.spotPrivateV1.all[networkKey];
      }
      case WS_KEY_MAP.futuresPublicV1: {
        return WS_BASE_URL_MAP.futuresPublicV1.all[networkKey];
      }
      case WS_KEY_MAP.futuresPrivateV1: {
        return WS_BASE_URL_MAP.futuresPrivateV1.all[networkKey];
      }
      default: {
        this.logger.error('getWsUrl(): Unhandled wsKey: ', {
          ...WS_LOGGER_CATEGORY,
          wsKey,
        });
        throw neverGuard(wsKey, `getWsUrl(): Unhandled wsKey`);
      }
    }
  }

  /** Force subscription requests to be sent in smaller batches, if a number is returned */
  protected getMaxTopicsPerSubscribeEvent(wsKey: WsKey): number | null {
    switch (wsKey) {
      case 'futuresPrivateV1':
      case 'futuresPublicV1':
      case 'spotPrivateV1':
      case 'spotPublicV1': {
        // Return a number if there's a limit on the number of sub topics per rq
        return null;
      }
      default: {
        throw neverGuard(wsKey, `getWsKeyForTopic(): Unhandled wsKey`);
      }
    }
  }

  /**
   * Map one or more topics into fully prepared "subscribe request" events (already stringified and ready to send)
   */
  protected getWsSubscribeEventsForTopics(
    topics: WsTopic[],
    wsKey: WsKey,
  ): string[] {
    if (!topics.length) {
      return [];
    }

    const market = this.getWsMarketForWsKey(wsKey);

    const subscribeEvents: string[] = [];

    const maxTopicsPerEvent = this.getMaxTopicsPerSubscribeEvent(wsKey);
    if (
      maxTopicsPerEvent &&
      maxTopicsPerEvent !== null &&
      topics.length > maxTopicsPerEvent
    ) {
      for (let i = 0; i < topics.length; i += maxTopicsPerEvent) {
        const batch = topics.slice(i, i + maxTopicsPerEvent);
        const subscribeEvent = this.getWsRequestEvent(
          market,
          'subscribe',
          batch,
        );
        subscribeEvents.push(JSON.stringify(subscribeEvent));
      }

      return subscribeEvents;
    }

    const subscribeEvent = this.getWsRequestEvent(market, 'subscribe', topics);
    return [JSON.stringify(subscribeEvent)];
  }

  /**
   * Map one or more topics into fully prepared "unsubscribe request" events (already stringified and ready to send)
   */
  protected getWsUnsubscribeEventsForTopics(
    topics: WsTopic[],
    wsKey: WsKey,
  ): string[] {
    if (!topics.length) {
      return [];
    }

    const market = this.getWsMarketForWsKey(wsKey);

    const subscribeEvents: string[] = [];

    const maxTopicsPerEvent = this.getMaxTopicsPerSubscribeEvent(wsKey);
    if (
      maxTopicsPerEvent &&
      maxTopicsPerEvent !== null &&
      topics.length > maxTopicsPerEvent
    ) {
      for (let i = 0; i < topics.length; i += maxTopicsPerEvent) {
        const batch = topics.slice(i, i + maxTopicsPerEvent);
        const subscribeEvent = this.getWsRequestEvent(
          market,
          'unsubscribe',
          batch,
        );
        subscribeEvents.push(JSON.stringify(subscribeEvent));
      }

      return subscribeEvents;
    }

    const subscribeEvent = this.getWsRequestEvent(market, 'subscribe', topics);
    return [JSON.stringify(subscribeEvent)];
  }

  /**
   * @returns a correctly structured events for performing an operation over WS. This can vary per exchange spec.
   */
  private getWsRequestEvent(
    market: WsMarket,
    operation: WsOperation,
    args: WsTopic[],
  ): WsRequestOperation<WsTopic> {
    switch (market) {
      case 'spot': {
        const wsRequestEvent: WsSpotOperation<WsTopic> = {
          op: operation,
          args: args,
        };

        return wsRequestEvent;
      }
      case 'futures': {
        const wsRequestEvent: WsFuturesOperation<WsTopic> = {
          action: operation,
          args: args,
        };
        return wsRequestEvent;
      }
      default: {
        throw neverGuard(market, `Unhandled market "${market}"`);
      }
    }
  }

  protected async getWsAuthRequestEvent(wsKey: WsKey): Promise<object> {
    const market = this.getWsMarketForWsKey(wsKey);
    if (
      !this.options.apiKey ||
      !this.options.apiSecret ||
      !this.options.apiMemo
    ) {
      throw new Error(
        `Cannot auth - missing api key, secret or memo in config`,
      );
    }

    const signTimestamp = Date.now() + this.options.recvWindow;

    const signMessageInput =
      signTimestamp + '#' + this.options.apiMemo + '#' + 'bitmart.WebSocket';

    let signature: string;
    if (typeof this.options.customSignMessageFn === 'function') {
      signature = await this.options.customSignMessageFn(
        signMessageInput,
        this.options.apiSecret,
      );
    } else {
      signature = await signMessage(
        signMessageInput,
        this.options.apiSecret,
        'hex',
      );
    }

    const authArgs = [this.options.apiKey, `${signTimestamp}`, signature];
    if (market === 'futures') {
      authArgs.push('web');
    }

    switch (market) {
      case 'spot': {
        const wsRequestEvent: WsSpotOperation<string> = {
          op: 'login',
          args: authArgs,
        };

        return wsRequestEvent;
      }
      case 'futures': {
        const wsRequestEvent: WsFuturesOperation<string> = {
          action: 'access',
          args: authArgs,
        };
        return wsRequestEvent;
      }
      default: {
        throw neverGuard(market, `Unhandled market "${market}"`);
      }
    }
  }

  /**
   * This exchange API is split into "markets" that behave differently (different base URLs).
   * The market can easily be resolved using the topic name.
   */
  private getMarketForTopic(topic: string): WsMarket {
    if (topic.startsWith('futures')) {
      return 'futures';
    }
    if (topic.startsWith('spot')) {
      return 'spot';
    }

    throw new Error(`Could not resolve "market" for topic: "${topic}"`);
  }

  /**
   * Used to split sub/unsub logic by websocket connection
   */
  private arrangeTopicsIntoWsKeyGroups(
    topics: WsTopic[],
  ): Record<WsKey, WsTopic[]> {
    const topicsByWsKey: Record<WsKey, WsTopic[]> = {
      futuresPrivateV1: [],
      futuresPublicV1: [],
      spotPrivateV1: [],
      spotPublicV1: [],
    };

    for (const topic in topics) {
      const wsKeyForTopic = this.getWsKeyForTopic(topic);

      const wsKeyTopicList = topicsByWsKey[wsKeyForTopic];
      if (!wsKeyTopicList.includes(topic)) {
        wsKeyTopicList.push(topic);
      }
    }

    return topicsByWsKey;
  }
}
