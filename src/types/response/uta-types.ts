/**
 * Unified Trading Account Response Types
 */

export interface AnnouncementItemUTA {
  id: number;
  title: string;
  type: string[];
  description: string;
  releaseTime: number;
  language: string;
  url: string;
}

export interface GetAnnouncementsResponseUTA {
  totalNumber: number;
  totalPage: number;
  pageNumber: number;
  pageSize: number;
  list: AnnouncementItemUTA[];
}

export interface CurrencyChainUTA {
  chainName: string;
  minWithdrawSize: string | null;
  minDepositSize: string | null;
  withdrawFeeRate: string;
  minWithdrawFee: string;
  isWithdrawEnabled: boolean;
  isDepositEnabled: boolean;
  confirms: number;
  preConfirms: number;
  contractAddress: string;
  withdrawPrecision: number;
  maxWithdrawSize: string | null;
  maxDepositSize: string | null;
  needTag: boolean;
  chainId: string;
}

export interface GetCurrencyResponseUTA {
  currency: string;
  name: string;
  fullName: string;
  precision: number;
  confirms: number | null;
  contractAddress: string | null;
  isMarginEnabled: boolean;
  isDebitEnabled: boolean;
  list: CurrencyChainUTA[];
}

export interface SymbolUTA {
  symbol: string;
  name?: string;
  baseCurrency: string;
  quoteCurrency: string;
  market?: string;
  minBaseOrderSize?: string;
  minQuoteOrderSize?: string;
  maxBaseOrderSize?: string | number;
  maxQuoteOrderSize?: string;
  baseOrderStep?: string;
  quoteOrderStep?: string;
  tickSize?: string | number;
  feeCurrency?: string;
  tradingStatus?: string;
  marginMode?: string;
  priceLimitRatio?: string;
  feeCategory?: number;
  makerFeeCoefficient?: string;
  takerFeeCoefficient?: string;
  st?: boolean;
  settlementCurrency?: string;
  contractType?: string;
  isInverse?: boolean;
  launchTime?: number;
  expiryTime?: number | null;
  settlementTime?: number | null;
  maxPrice?: string | number;
  lotSize?: string | number;
  unitSize?: string | number;
  makerFeeRate?: string | number;
  takerFeeRate?: string | number;
  settlementFeeRate?: string | number | null;
  maxLeverage?: number;
  indexSourceExchanges?: string[];
  k?: string | number;
  m?: string | number;
  f?: string | number;
  mmrLimit?: string | number;
  mmrLevConstant?: string | number;
  alertRiskRatio?: string;
  liquidationRiskRatio?: string;
  baseBorrowEnable?: boolean | string;
  quoteBorrowEnable?: boolean | string;
  baseTransferInEnable?: boolean | string;
  quoteTransferInEnable?: boolean | string;
}

export interface GetSymbolResponseUTA {
  tradeType: string;
  list: SymbolUTA[];
}

export interface TickerUTA {
  symbol: string;
  name?: string;
  bestBidPrice: string;
  bestBidSize: string;
  bestAskPrice: string;
  bestAskSize: string;
  high: string;
  low: string;
  baseVolume: string;
  quoteVolume: string;
  lastPrice: string;
  open: string;
  size: string;
}

export interface GetTickerResponseUTA {
  tradeType: string;
  ts: number;
  list: TickerUTA[];
}

export interface TradeUTA {
  sequence: string;
  tradeId: string;
  price: string;
  size: string;
  side: 'buy' | 'sell';
  ts: number;
}

export interface GetTradesResponseUTA {
  tradeType: string;
  list: TradeUTA[];
}

export interface OrderBookLevelUTA {
  price: string;
  size: string;
}

export interface GetOrderBookResponseUTA {
  tradeType: string;
  symbol: string;
  sequence: string;
  bids: OrderBookLevelUTA[];
  asks: OrderBookLevelUTA[];
}

export interface GetKlinesResponseUTA {
  tradeType: string;
  symbol: string;
  list: string[][]; // [time, open, close, high, low, volume, turnover]
}

export interface GetCurrentFundingRateResponseUTA {
  symbol: string;
  nextFundingRate: number;
  fundingTime: number;
  fundingRateCap: number;
  fundingRateFloor: number;
}

export interface FundingRateHistoryItemUTA {
  fundingRate: number;
  ts: number;
}

export interface GetHistoryFundingRateResponseUTA {
  symbol: string;
  list: FundingRateHistoryItemUTA[];
}

export interface GetCrossMarginConfigResponseUTA {
  maxLeverage: number;
  alertRiskRatio: string;
  liquidationRiskRatio: string;
  currencyList: string[];
}

export interface GetServiceStatusResponseUTA {
  tradeType: string;
  serverStatus: 'open' | 'close' | 'cancelonly';
  msg: string;
}
