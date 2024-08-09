/**
 * Used to switch how authentication/requests work under the hood
 */
export const REST_CLIENT_TYPE_ENUM = {
  /** Spot & Margin */
  main: 'main',
  /** Futures */
  futures: 'futures',
} as const;

export type RestClientType =
  (typeof REST_CLIENT_TYPE_ENUM)[keyof typeof REST_CLIENT_TYPE_ENUM];

const kucoinURLMap = {
  [REST_CLIENT_TYPE_ENUM.main]: 'https://api.kucoin.com',
  [REST_CLIENT_TYPE_ENUM.futures]: 'https://api-futures.kucoin.com',
} as const;

export interface RestClientOptions {
  /** Your API key */
  apiKey?: string;

  /** Your API secret */
  apiSecret?: string;

  /** Your API passphrase (can be anything) that you set when creating this API key (NOT your account password) */
  apiPassphrase?: string;

  /** The API key version. Defaults to "2" right now. You can see this in your API management page */
  apiKeyVersion?: number | string;

  /** Default: false. If true, we'll throw errors if any params are undefined */
  strictParamValidation?: boolean;

  /**
   * Optionally override API protocol + domain
   * e.g baseUrl: 'https://api.kucoin.com'
   **/
  baseUrl?: string;

  /** Default: true. whether to try and post-process request exceptions (and throw them). */
  parseExceptions?: boolean;
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
  restInverseOptions: RestClientOptions,
  restClientType: RestClientType,
): string {
  const exchangeBaseUrls = {
    livenet: kucoinURLMap[restClientType],
    testnet: 'https://noTestnet',
  };

  if (restInverseOptions.baseUrl) {
    return restInverseOptions.baseUrl;
  }

  if (useTestnet) {
    return exchangeBaseUrls.testnet;
  }

  return exchangeBaseUrls.livenet;
}
