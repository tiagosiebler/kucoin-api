export type WsOperation =
  | 'subscribe'
  | 'unsubscribe'
  | 'login'
  | 'access'
  | 'request';

export interface WsRequestOperation<TWSTopic extends string> {
  id: number;
  type: WsOperation;
  topic: TWSTopic;
  privateChannel: boolean;
  response: boolean;
}
