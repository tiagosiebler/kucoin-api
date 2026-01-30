export interface WsDataEvent<TData = any, TWSKey = string> {
  data: TData;
  table: string;
  wsKey: TWSKey;
}

export interface MessageEventLike<TDataType = string> {
  target: WebSocket;
  type: 'message';
  data: TDataType;
}

export function isMessageEvent(msg: unknown): msg is MessageEventLike {
  if (typeof msg !== 'object' || !msg) {
    return false;
  }

  const message = msg as MessageEventLike;
  return message['type'] === 'message' && typeof message['data'] === 'string';
}
