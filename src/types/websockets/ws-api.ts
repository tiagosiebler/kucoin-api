import { WS_KEY_MAP, WsKey } from '../../lib/websocket/websocket-util.js';
import { BatchCancelOrdersRequest, Order } from '../request/futures.types.js';
import { SubmitHFMarginOrderRequest } from '../request/spot-margin-trading.js';
import {
  ModifyHFOrderRequest,
  SubmitHFOrderRequest,
} from '../request/spot-trading.js';
import {
  BatchCancelOrderResult,
  SubmitMultipleOrdersFuturesResponse,
} from '../response/futures.types.js';
import { MarginSubmitOrderV3Response } from '../response/spot-margin-trading.js';
import {
  SubmitHFOrderSyncResponse,
  SyncCancelHFOrderResponse,
} from '../response/spot-trading.js';

export type WsOperationV1 =
  | 'subscribe'
  | 'unsubscribe'
  | 'login'
  | 'access'
  | 'request'
  | 'ping';

export type WsOperationV2 =
  | 'subscribe'
  | 'unsubscribe'
  | 'login'
  | 'ping'
  | 'pong';

/**
 * Kucoin's format for WS request operations with the V1 WebSockets
 */
export interface WsRequestOperationV1<TWSTopic extends string> {
  id: number;
  type: WsOperationV1;
  topic: TWSTopic;
  privateChannel: boolean;
  response: boolean;
}
/**
 * Kucoin's format for WS request operations with the V2 (Pro) WebSockets
 */
export interface WsRequestOperationV2<TWSTopic extends string> {
  id: number;
  action: WsOperationV2;
  channel: TWSTopic;
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
  op: WsOperationV1 | WsAPIOperation;
  args?: (TWSTopic | string | number)[] | TWSParams; // Business parameters, same as RestAPI
}

export interface WSAPIResponse<
  TResponseData extends object = object,
  TWSAPIOperation = WsAPIOperation,
> {
  /** Auto-generated */
  id: string;

  op: TWSAPIOperation;

  msg?: string;
  code: '200000' | string;

  data: TResponseData;
  inTime: number; //Gateway in time(ms)
  outTime: number; //Gateway out time(ms)
  rateLimit?: { limit: number; reset: number; remaining: number };

  wsKey: WsKey;
  isWSAPIResponse: boolean;

  request?: any;
}

export interface WsAPIWsKeyTopicMap {
  [WS_KEY_MAP.wsApiSpotV1]: WsAPIOperation;
  [WS_KEY_MAP.wsApiFuturesV1]: WsAPIOperation;
}

export type WSAPICancelOrderRequest = { symbol: string } & (
  | { orderId: string }
  | { clientOid: string }
);

export interface WSAPIOrderResponse {
  orderId: string;
  clientOid: string;
}

export interface WsAPITopicRequestParamMap {
  [key: string]: unknown;

  subscribe: never;
  unsubscribe: never;
  login: never;
  access: never;
  request: never;

  ping: void;

  'spot.order': SubmitHFOrderRequest;
  'margin.order': SubmitHFMarginOrderRequest;
  'futures.order': Order;
  'spot.cancel': WSAPICancelOrderRequest;
  'margin.cancel': WSAPICancelOrderRequest;
  'futures.cancel': { orderId: string } | { clientOid: string; symbol: string };
  'futures.multi_cancel': BatchCancelOrdersRequest;
  'futures.multi_order': Order[];
  'spot.sync_order': SubmitHFOrderRequest;
  'spot.modify': ModifyHFOrderRequest;
  'spot.sync_cancel': WSAPICancelOrderRequest;
}

export interface WsAPITopicResponseMap {
  [key: string]: unknown;

  subscribe: never;
  unsubscribe: never;
  login: never;
  access: never;
  request: never;

  ping: unknown;

  'spot.order': WSAPIResponse<WSAPIOrderResponse>;
  'margin.order': WSAPIResponse<MarginSubmitOrderV3Response>;
  'futures.order': WSAPIResponse<WSAPIOrderResponse>;
  'spot.cancel': WSAPIResponse<WSAPIOrderResponse>;
  'margin.cancel': WSAPIResponse<WSAPIOrderResponse>;
  'futures.cancel': WSAPIResponse<
    { cancelledOrderIds: string[] } | { clientOid: string }
  >;
  'futures.multi_cancel': WSAPIResponse<BatchCancelOrderResult[]>;
  'futures.multi_order': WSAPIResponse<SubmitMultipleOrdersFuturesResponse[]>;
  'spot.sync_order': WSAPIResponse<SubmitHFOrderSyncResponse>;
  'spot.modify': WSAPIResponse<{
    newOrderId: string;
    clientOid: string;
  }>;
  'spot.sync_cancel': WSAPIResponse<SyncCancelHFOrderResponse>;
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
