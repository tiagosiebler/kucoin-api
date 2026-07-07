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

/**
 * UTA WebSocket private balance push (`channel: balance`).
 * Field `cS` added 2026.07.01 (platform-level margin collateral status).
 * @see https://www.kucoin.com/docs-new/3470231w0
 */
export interface WsUTABalancePushData {
  U: number | string;
  a: string;
  b: string;
  c: string;
  e?: string;
  h: string;
  l?: string;
  /** Platform-level margin collateral status (UNIFIED balance pushes) */
  cS?: string;
}

export interface WsUTABalancePush {
  P: number;
  T: string;
  d: WsUTABalancePushData;
}

/**
 * UTA WebSocket private position push (`channel: position` / `positionAll`).
 * Fields `pM` and `r` added 2026.06.03; `adl` added 2026.05.15.
 * @see https://www.kucoin.com/docs-new/3470233w0
 */
export interface WsUTAPositionPushData {
  O?: number;
  U: number;
  l?: string;
  q: string;
  s: string;
  bP?: string;
  eP?: string;
  iM?: string;
  lP?: string;
  mM: string;
  /** Mark price */
  mP?: string;
  pV?: string;
  pi?: string;
  mmr?: string;
  mtM?: string;
  rPL?: string;
  uPL?: string;
  /** Margin occupied by the futures position (as of 2026.06.03) */
  pM?: string;
  /** Isolated futures risk ratio, e.g. 0.65 = 65% (as of 2026.06.03) */
  r?: string;
  /** ADL ranking percentile, e.g. 0.46 = 46% (as of 2026.05.15) */
  adl?: string;
}

export interface WsUTAPositionPush {
  P: number;
  T: string;
  d: WsUTAPositionPushData;
}

/**
 * UTA WebSocket public Funding Fee channel (`channel: fundingFee`, FUTURES).
 * Added 2026.07.01.
 */
export interface WsUTAFundingFeePublicPush {
  T: string;
  P: number;
  d: {
    s: string;
    fR?: string;
    fT?: number;
    M?: number;
    [key: string]: string | number | boolean | undefined;
  };
}

/**
 * UTA WebSocket public Mark Price channel (`channel: markPrice`, FUTURES).
 * Added 2026.07.01.
 */
export interface WsUTAMarkPricePublicPush {
  T: string;
  P: number;
  d: {
    s: string;
    mP?: string;
    M?: number;
    [key: string]: string | number | boolean | undefined;
  };
}

/**
 * Classic futures WebSocket `/contract/positionAll` funding fee settlement push.
 * `symbol` added to `data` field 2026.07.01.
 * @see https://www.kucoin.com/docs-new/3470088w0
 */
export interface WsClassicFuturesFundingFeeSettlement {
  topic: string;
  subject: 'funding.begin' | 'funding.end';
  data: {
    symbol: string;
    fundingTime: number;
    fundingRate: number;
    timestamp: number;
  };
}
