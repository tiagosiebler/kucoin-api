export interface NewSpotOrderV1 {
  clientOid: string;
  side: 'buy' | 'sell';
  symbol: string;
  type?: 'market' | 'limit';
  remark?: string;
  stp?: 'CN' | 'CO' | 'CB' | 'DC';
  tradeType?: 'TRADE' | 'MARGIN_TRADE';
  price?: string;
  size?: string;
  funds?: string;
  timeInForce?: 'GTC' | 'GTT' | 'IOC' | 'FOK';
  cancelAfter?: number;
  postOnly?: boolean;
  hidden?: boolean;
  iceberg?: boolean;
  visibleSize?: string;
}
