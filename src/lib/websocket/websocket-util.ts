import WebSocket from 'isomorphic-ws';

import { WsRequestOperationKucoin } from '../../types/websockets/ws-api.js';
import { MessageEventLike } from '../../types/websockets/ws-events.js';

/** Should be one WS key per unique URL */
export const WS_KEY_MAP = {
  spotPublicV1: 'spotPublicV1',
  spotPrivateV1: 'spotPrivateV1',
  futuresPublicV1: 'futuresPublicV1',
  futuresPrivateV1: 'futuresPrivateV1',
  /** Dedicated V2 (Pro) connection for push of public spot market data */
  spotPublicProV2: 'spotPublicProV2',
  /** Dedicated V2 (Pro) connection for push of public futures market data */
  futuresPublicProV2: 'futuresPublicProV2',
  /** Shared (spot & futures) V2 (Pro) connection for all private data */
  privateProV2: 'privateProV2',
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

export function isBufferMessageEvent(
  msg: unknown,
): msg is MessageEventLike<Buffer> {
  if (typeof msg !== 'object' || !msg) {
    return false;
  }

  const message = msg as MessageEventLike;
  return message['type'] === 'message' && Buffer.isBuffer(message['data']);
}

export function bufferLooksLikeText(
  data?: Buffer | ArrayBufferLike | null,
): boolean {
  if (!data) {
    return false;
  }
  const buf = Buffer.isBuffer(data)
    ? data
    : Buffer.from(data as ArrayBufferLike);
  if (!buf.length) {
    return false;
  }
  const first = buf[0];
  // '{' '[' or '"' are common JSON prefixes; fast heuristic to detect plaintext
  return first === 0x7b || first === 0x5b || first === 0x22;
}

export async function decompressMessageEvent(
  event: MessageEventLike<Buffer<ArrayBufferLike>>,
): Promise<MessageEventLike<any>> {
  const data = event.data;
  if (typeof data === 'string') {
    return { ...event, type: 'message', data };
  }

  // Some KuCoin streams (notably newer spot public v2) send JSON in a binary
  // frame without compression. If the payload already looks like UTF-8 text,
  // skip decompression and just decode it so the message can be processed.
  if (bufferLooksLikeText(data)) {
    return {
      ...event,
      type: 'message',
      data: Buffer.from(data as any).toString('utf8'),
    };
  }

  const ds = new DecompressionStream('deflate-raw');

  const dataStream = new Response(data).body;

  let decompressedStream: ReadableStream;
  if (!dataStream) {
    const uint8 = new Uint8Array(data);
    const rs = new ReadableStream({
      start(controller) {
        controller.enqueue(uint8);
        controller.close();
      },
    });
    decompressedStream = rs.pipeThrough(ds);
  } else {
    decompressedStream = (dataStream as ReadableStream).pipeThrough(ds);
  }

  return {
    ...event,
    type: 'message',
    data: await new Response(decompressedStream).text(),
  };
}
