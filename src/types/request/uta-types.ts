/**
 * Unified Trading Account Request Types
 */

export interface GetAnnouncementsRequestUTA {
  language?:
    | 'zh_HK'
    | 'ja_JP'
    | 'ko_KR'
    | 'en_US'
    | 'pl_PL'
    | 'es_ES'
    | 'fr_FR'
    | 'ar_AE'
    | 'it_IT'
    | 'id_ID'
    | 'nl_NL'
    | 'pt_PT'
    | 'vi_VN'
    | 'de_DE'
    | 'tr_TR'
    | 'ms_MY'
    | 'ru_RU'
    | 'th_TH'
    | 'hi_IN'
    | 'bn_BD'
    | 'fil_PH'
    | 'ur_PK';
  type?:
    | 'latest-announcements'
    | 'activities'
    | 'product-updates'
    | 'vip'
    | 'maintenance-updates'
    | 'delistings'
    | 'others'
    | 'api-campaigns'
    | 'new-listings'
    | 'futures-announcements';
  pageNumber?: number;
  pageSize?: number;
  startTime?: number;
  endTime?: number;
}

export interface GetCurrencyRequestUTA {
  currency?: string;
  chain?: string;
}

export interface GetSymbolRequestUTA {
  tradeType: 'SPOT' | 'FUTURES' | 'ISOLATED' | 'CROSS';
  symbol?: string;
}

export interface GetTickerRequestUTA {
  tradeType: 'SPOT' | 'FUTURES';
  symbol?: string;
}

export interface GetTradesRequestUTA {
  tradeType: 'SPOT' | 'FUTURES';
  symbol: string;
}

export interface GetOrderBookRequestUTA {
  tradeType: 'SPOT' | 'FUTURES';
  symbol: string;
  limit: '20' | '50' | '100' | 'FULL';
}

export interface GetKlinesRequestUTA {
  tradeType: 'SPOT' | 'FUTURES';
  symbol: string;
  interval:
    | '1min'
    | '3min'
    | '5min'
    | '15min'
    | '30min'
    | '1hour'
    | '2hour'
    | '4hour'
    | '6hour'
    | '8hour'
    | '12hour'
    | '1day'
    | '1week'
    | '1month';
  startAt?: number;
  endAt?: number;
}

export interface GetCurrentFundingRateRequestUTA {
  symbol: string;
}

export interface GetHistoryFundingRateRequestUTA {
  symbol: string;
  startAt: number;
  endAt: number;
}

export interface GetServiceStatusRequestUTA {
  tradeType: 'SPOT' | 'FUTURES';
}
