export interface NewFuturesOrderV1 {
  clientOid: string;
  side: 'buy' | 'sell';
  symbol: string;
  leverage?: string;
  type?: 'market' | 'limit';
  remark?: string;
  stop?: 'down' | 'up';
  stopPriceType?: 'TP' | 'IP' | 'MP';
  stopPrice?: string;
  reduceOnly?: boolean;
  postOnly?: boolean;
  closeOrder?: boolean;
  forceHold?: boolean;
  stp?: 'CN' | 'CO' | 'CB';
  price?: string;
  size: number;
  timeInForce?: 'GTC' | 'IOC';
  hidden?: boolean;
  iceberg?: boolean;
  visibleSize?: number;
}
