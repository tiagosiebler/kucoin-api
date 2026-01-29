import WebSocket from 'isomorphic-ws';

import { WsRequestOperationKucoin } from '../../types/websockets/ws-api.js';

/** Should be one WS key per unique URL */
export const WS_KEY_MAP = {
  spotPublicV1: 'spotPublicV1',
  spotPrivateV1: 'spotPrivateV1',
  futuresPublicV1: 'futuresPublicV1',
  futuresPrivateV1: 'futuresPrivateV1',
  /** Dedicated V2 (Pro) connection for push of public spot market data */
  spotPublicV2: 'spotPublicV2',
  /** Dedicated V2 (Pro) connection for push of public futures market data */
  futuresPublicV2: 'futuresPublicV2',
  /** shared V2 (Pro) connection for all private data (spot & futures) */
  privateV2: 'privateV2',
  wsApiSpotV1: 'wsApiSpotV1',
  wsApiFuturesV1: 'wsApiFuturesV1',
} as const;

/** This is used to differentiate between each of the available websocket streams */
export type WsKey = (typeof WS_KEY_MAP)[keyof typeof WS_KEY_MAP];
export type WSAPIWsKey =
  | typeof WS_KEY_MAP.wsApiFuturesV1
  | typeof WS_KEY_MAP.wsApiSpotV1;

/**
 * Normalised internal format for a request (subscribe/unsubscribe/etc) on a topic, with optional parameters.
 *
 * - Topic: the topic this event is for
 * - Payload: the parameters to include, optional. E.g. auth requires key + sign. Some topics allow configurable parameters.
 */
export interface WsTopicRequest<
  TWSTopic extends string = string,
  TWSPayload = any,
> {
  topic: TWSTopic;
  payload?: TWSPayload;
}

/**
 * Conveniently allow users to request a topic either as string topics or objects (containing string topic + params)
 */
export type WsTopicRequestOrStringTopic<
  TWSTopic extends string,
  TWSPayload = any,
> = WsTopicRequest<TWSTopic, TWSPayload> | string;

/**
 * #305: ws.terminate() is undefined in browsers.
 * This only works in node.js, not in browsers.
 * Does nothing if `ws` is undefined. Does nothing in browsers.
 */
export function safeTerminateWs(
  ws?: WebSocket | any,
  fallbackToClose?: boolean,
): boolean {
  if (!ws) {
    return false;
  }
  if (typeof ws['terminate'] === 'function') {
    ws.terminate();
    return true;
  } else if (fallbackToClose) {
    ws.close();
  }

  return false;
}

/**
 * WS API promises are stored using a primary key. This key is constructed using
 * properties found in every request & reply.
 *
 * The counterpart to this is in resolveEmittableEvents
 */
export function getPromiseRefForWSAPIRequest(
  wsKey: WsKey,
  requestEvent: WsRequestOperationKucoin<string>,
): string {
  const promiseRef = [wsKey, requestEvent.id].join('_');
  return promiseRef;
}

export function isWSAPIWsKey(wsKey: WsKey): wsKey is WSAPIWsKey {
  return (
    wsKey === WS_KEY_MAP.wsApiFuturesV1 || wsKey === WS_KEY_MAP.wsApiSpotV1
  );
}
