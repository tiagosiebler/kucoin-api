import { AxiosRequestConfig } from 'axios';

import { BaseRestClient } from './lib/BaseRestClient.js';
import {
  REST_CLIENT_TYPE_ENUM,
  RestClientOptions,
  RestClientType,
} from './lib/requestUtils.js';
import {
  GetAnnouncementsRequestUTA,
  GetCurrencyRequestUTA,
  GetCurrentFundingRateRequestUTA,
  GetHistoryFundingRateRequestUTA,
  GetKlinesRequestUTA,
  GetOrderBookRequestUTA,
  GetServiceStatusRequestUTA,
  GetSymbolRequestUTA,
  GetTickerRequestUTA,
  GetTradesRequestUTA,
} from './types/request/uta-types.js';
import { APISuccessResponse } from './types/response/shared.types.js';
import {
  GetAnnouncementsResponseUTA,
  GetCrossMarginConfigResponseUTA,
  GetCurrencyResponseUTA,
  GetCurrentFundingRateResponseUTA,
  GetHistoryFundingRateResponseUTA,
  GetKlinesResponseUTA,
  GetOrderBookResponseUTA,
  GetServiceStatusResponseUTA,
  GetSymbolResponseUTA,
  GetTickerResponseUTA,
  GetTradesResponseUTA,
} from './types/response/uta-types.js';

/**
 * Unified Trading Account Client
 *
 * This client provides access to the Unified Trading Account API endpoints
 * that unify market data access across Spot, Futures, and Margin trading.
 */
export class UnifiedAPIClient extends BaseRestClient {
  constructor(
    restClientOptions: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {},
  ) {
    super(restClientOptions, requestOptions);
    return this;
  }

  getClientType(): RestClientType {
    return REST_CLIENT_TYPE_ENUM.unifiedTradingAccount;
  }

  /**
   *
   * REST - Unified Trading Account - Market Data
   *
   */

  /**
   * Get Announcements
   * This interface can obtain the latest news announcements, and the default
   * page search is for announcements within a month.
   */
  getAnnouncements(
    params?: GetAnnouncementsRequestUTA,
  ): Promise<APISuccessResponse<GetAnnouncementsResponseUTA>> {
    return this.get('api/ua/v1/market/announcement', params);
  }

  /**
   * Get Currency
   * Request the currency details of a specified currency via this endpoint.
   */
  getCurrency(
    params?: GetCurrencyRequestUTA,
  ): Promise<APISuccessResponse<GetCurrencyResponseUTA>> {
    return this.get('api/ua/v1/market/currency', params);
  }

  /**
   * Get Symbol
   * Request a list of available currency pairs for trading via this endpoint.
   */
  getSymbol(
    params: GetSymbolRequestUTA,
  ): Promise<APISuccessResponse<GetSymbolResponseUTA>> {
    return this.get('api/ua/v1/market/instrument', params);
  }

  /**
   * Get Ticker
   * Request market tickers for the trading pairs in the market (including 24h volume).
   */
  getTicker(
    params: GetTickerRequestUTA,
  ): Promise<APISuccessResponse<GetTickerResponseUTA>> {
    return this.get('api/ua/v1/market/ticker', params);
  }

  /**
   * Get Trades
   * Request via this endpoint to get the latest 100 public trades of the specified symbol.
   */
  getTrades(
    params: GetTradesRequestUTA,
  ): Promise<APISuccessResponse<GetTradesResponseUTA>> {
    return this.get('api/ua/v1/market/trade', params);
  }

  /**
   * Get OrderBook
   * Query order book depth information (aggregated by price).
   */
  getOrderBook(
    params: GetOrderBookRequestUTA,
  ): Promise<APISuccessResponse<GetOrderBookResponseUTA>> {
    return this.get('api/ua/v1/market/orderbook', params);
  }

  /**
   * Get Klines
   * Get the Kline of the symbol. Data are returned in grouped buckets based on requested type.
   */
  getKlines(
    params: GetKlinesRequestUTA,
  ): Promise<APISuccessResponse<GetKlinesResponseUTA>> {
    return this.get('api/ua/v1/market/kline', params);
  }

  /**
   * Get Current Funding Rate
   * Get current Futures funding fee rate.
   */
  getCurrentFundingRate(
    params: GetCurrentFundingRateRequestUTA,
  ): Promise<APISuccessResponse<GetCurrentFundingRateResponseUTA>> {
    return this.get('api/ua/v1/market/funding-rate', params);
  }

  /**
   * Get History Funding Rate
   * Query the Futures funding rate at each settlement time point within a certain time range.
   */
  getHistoryFundingRate(
    params: GetHistoryFundingRateRequestUTA,
  ): Promise<APISuccessResponse<GetHistoryFundingRateResponseUTA>> {
    return this.get('api/ua/v1/market/funding-rate-history', params);
  }

  /**
   * Get Cross Margin Config
   * Request the configure info of the 'spot cross margin' via this endpoint.
   */
  getCrossMarginConfig(): Promise<
    APISuccessResponse<GetCrossMarginConfigResponseUTA>
  > {
    return this.get('api/ua/v1/market/cross-config');
  }

  /**
   * Get Service Status
   * Get the service status.
   */
  getServiceStatus(
    params: GetServiceStatusRequestUTA,
  ): Promise<APISuccessResponse<GetServiceStatusResponseUTA>> {
    return this.get('api/ua/v1/server/status', params);
  }
}
