import { WS_KEY_MAP, WsKey } from '../../lib/websocket/websocket-util.js';

export type WsOperation =
  | 'subscribe'
  | 'unsubscribe'
  | 'login'
  | 'access'
  | 'request'
  | 'ping';

export interface WsRequestOperation<TWSTopic extends string> {
  id: number;
  type: WsOperation;
  topic: TWSTopic;
  privateChannel: boolean;
  response: boolean;
}

export type Exact<T> = {
  // This part says: if there's any key that's not in T, it's an error
  // This conflicts sometimes for some reason...
  // [K: string]: never;
} & {
  [K in keyof T]: T[K];
};

/**
 * WS API commands (for sending requests via WS)
 */
export const WS_API_Operations = [
  'ping',
  'spot.order',
  'spot.modify',
  'spot.cancel',
  'spot.sync_order',
  'spot.sync_cancel',
  'margin.order',
  'margin.cancel',
  'futures.order',
  'futures.cancel',
  'futures.multi_order',
  'futures.multi_cancel',
] as const;

export type WsAPIOperation = (typeof WS_API_Operations)[number];

export interface WsRequestOperationKucoin<
  TWSTopic extends string,
  TWSParams extends object = any,
> {
  id: string;
  op: WsOperation | WsAPIOperation;
  args?: (TWSTopic | string | number)[] | TWSParams; // Business parameters, same as RestAPI
}

export interface WSAPIResponse<TResponseData extends object = object> {
  /** Auto-generated */
  id: string;

  status: number;
  result: TResponseData;

  wsKey: WsKey;
  isWSAPIResponse: boolean;

  request?: any;
}

export interface WsAPIWsKeyTopicMap {
  [WS_KEY_MAP.wsApiSpotV1]: WsAPIOperation;
  [WS_KEY_MAP.wsApiFuturesV1]: WsAPIOperation;
}

export interface WsAPITopicRequestParamMap {
  [key: string]: unknown;

  subscribe: never;
  unsubscribe: never;
  login: never;
  access: never;
  request: never;

  ping: void;

  'spot.order': void;
  'spot.modify': void;
  'spot.cancel': void;
  'spot.sync_order': void;
  'spot.sync_cancel': void;
  'margin.order': void;
  'margin.cancel': void;
  'futures.order': void;
  'futures.cancel': void;
  'futures.multi_order': void;
  'futures.multi_cancel': void;
}

export interface WsAPITopicResponseMap {
  [key: string]: unknown;

  subscribe: never;
  unsubscribe: never;
  login: never;
  access: never;
  request: never;

  ping: unknown;
}

export interface WSAPIAuthenticationRequestFromServer {
  timestamp: number;
  sessionId: string;
}

export interface WSAPIAuthenticationConfirmedFromServer {
  pingInterval: number;
  sessionId: string;
  pingTimeout: number;
  data: 'welcome';
}
