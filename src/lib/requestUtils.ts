import { neverGuard } from './misc-util.js';

/**
 * Used to switch how authentication/requests work under the hood
 */
export const REST_CLIENT_TYPE_ENUM = {
  /** Global & AU: Spot & Margin */
  main: 'main',
  /** Global & AU: Futures */
  futures: 'futures',
  /** Global: Broker */
  broker: 'broker',
  /** Global: Unified Trading Account */
  unifiedTradingAccount: 'unifiedTradingAccount',
  /** Dedicated EU: main (Spot & Margin). No futures at this time. */
  mainEU: 'mainEU',
} as const;

export type RestClientType =
  (typeof REST_CLIENT_TYPE_ENUM)[keyof typeof REST_CLIENT_TYPE_ENUM];

const kucoinURLMap: Record<RestClientType, string> = {
  [REST_CLIENT_TYPE_ENUM.main]: 'https://api.kucoin.com',
  // https://www.kucoin.com/en-eu/docs-new/introduction/eu
  [REST_CLIENT_TYPE_ENUM.mainEU]: 'https://api.kucoin.eu',
  [REST_CLIENT_TYPE_ENUM.futures]: 'https://api-futures.kucoin.com',
  [REST_CLIENT_TYPE_ENUM.broker]: 'https://api-broker.kucoin.com',
  [REST_CLIENT_TYPE_ENUM.unifiedTradingAccount]: 'https://api.kucoin.com',
} as const;

export type APIRegion = 'global' | 'EU' | 'AU';

// TODO: how can user specify non-global market (e.g. EU or AU)? what did I do for other exchanges?
// TODO: API calls for AU require extra header (X-SITE-TYPE: australia)
export interface RestClientOptions {
  /** Your API key */
  apiKey?: string;

  /** Your API secret */
  apiSecret?: string;

  /** Your API passphrase (can be anything) that you set when creating this API key (NOT your account password) */
  apiPassphrase?: string;

  /**
   * Use access token instead of sign, if this is provided.
   * For guidance refer to: https://github.com/tiagosiebler/kucoin-api/issues/2
   */
  apiAccessToken?: string;

  /** The API key version. Defaults to "2" right now. You can see this in your API management page */
  apiKeyVersion?: number | string;

  /**
   * The API region you would like to work with:
   * - Global (default)
   *   - API Docs: https://www.kucoin.com/docs-new/introduction
   * - EU:
   *   - API Docs: https://www.kucoin.com/en-eu/docs-new/introduction/eu
   *   - Behaves the same as global, but keep in mind that futures may not be available at this time for EU users.
   * - AU:
   *   - API Docs: https://www.kucoin.com/en-au/docs-new/introduction/au
   *   - Ensures regional market data is retrieved (e.g. correct trading pairs, correct tickers, etc).
   *   - Also ensures requests for AU users include the required extra header (X-SITE-TYPE: australia).
   */
  apiRegion?: APIRegion;

  /** Default: false. If true, we'll throw errors if any params are undefined */
  strictParamValidation?: boolean;

  /**
   * Optionally override API protocol + domain
   * e.g baseUrl: 'https://api.kucoin.com'
   **/
  baseUrl?: string;

  /** Default: true. whether to try and post-process request exceptions (and throw them). */
  parseExceptions?: boolean;

  customTimestampFn?: () => number;

  /**
   * Enable keep alive for REST API requests (via axios).
   */
  keepAlive?: boolean;

  /**
   * When using HTTP KeepAlive, how often to send TCP KeepAlive packets over sockets being kept alive. Default = 1000.
   * Only relevant if keepAlive is set to true.
   * Default: 1000 (defaults comes from https agent)
   */
  keepAliveMsecs?: number;

  /**
   * Allows you to provide a custom "signMessage" function, e.g. to use node's much faster createHmac method
   *
   * Look in the examples folder for a demonstration on using node's createHmac instead.
   */
  customSignMessageFn?: (message: string, secret: string) => Promise<string>;
}

export function serializeParams<T extends Record<string, any> | undefined = {}>(
  params: T,
  strict_validation: boolean | undefined,
  encodeValues: boolean,
  prefixWith: string,
): string {
  if (!params) {
    return '';
  }

  const queryString = Object.keys(params)
    .sort()
    .map((key) => {
      const value = params[key];
      if (strict_validation === true && typeof value === 'undefined') {
        throw new Error(
          'Failed to sign API request due to undefined parameter',
        );
      }
      const encodedValue = encodeValues ? encodeURIComponent(value) : value;
      return `${key}=${encodedValue}`;
    })
    .join('&');

  // Only prefix if there's a value
  return queryString ? prefixWith + queryString : queryString;
}

export const APIIDMain = 'NODESDK';
export const APIIDMainSign = 'd28f5b4a-179d-4fcb-9c00-c8319c0bb82c';

export const APIIDFutures = 'NODESDKFUTURES';
export const APIIDFuturesSign = '7f7fb0d6-e600-4ef4-8fe3-41e6aea9af84';

export function getRestBaseUrl(
  useTestnet: boolean,
  restOptions: RestClientOptions,
  restClientType: RestClientType,
): string {
  let resolvedClientType = restClientType;

  // Override to EU URL for EU regional users
  if (restOptions.apiRegion === 'EU') {
    switch (restClientType) {
      case REST_CLIENT_TYPE_ENUM.main:
      case REST_CLIENT_TYPE_ENUM.mainEU: {
        resolvedClientType = REST_CLIENT_TYPE_ENUM.mainEU;
        break;
      }
      case REST_CLIENT_TYPE_ENUM.futures: {
        console.warn(
          'Futures market is not available for EU users at this time. API requests may not function as expected',
        );
        break;
      }
      case REST_CLIENT_TYPE_ENUM.broker: {
        break;
      }
      case REST_CLIENT_TYPE_ENUM.unifiedTradingAccount: {
        resolvedClientType = REST_CLIENT_TYPE_ENUM.mainEU;
        break;
      }
      default: {
        throw neverGuard(
          restClientType,
          `Unhandled REST Client Type "${restClientType}"`,
        );
      }
    }
  }

  const exchangeBaseUrls = {
    livenet: kucoinURLMap[resolvedClientType],
    testnet: 'https://noTestnet',
  };

  if (restOptions.baseUrl) {
    return restOptions.baseUrl;
  }

  if (useTestnet) {
    return exchangeBaseUrls.testnet;
  }

  return exchangeBaseUrls.livenet;
}
