export type WsOperation =
  | 'subscribe'
  | 'unsubscribe'
  | 'login'
  | 'access'
  | 'request';

export interface WsSpotOperation<TWSTopic extends string = string> {
  op: WsOperation;
  args: TWSTopic[];
}

export interface WsFuturesOperation<TWSTopic extends string> {
  action: WsOperation;
  args: TWSTopic[];
}

export type WsRequestOperation<TWSTopic extends string> =
  | WsSpotOperation<TWSTopic>
  | WsFuturesOperation<TWSTopic>;
