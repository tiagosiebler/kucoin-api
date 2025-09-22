import { SpotClient } from '../../src/index.js';

// or
// import { SpotClient } from 'kucoin-api';

async function start() {
  /**
   * All REST clients support passing the access token. If available, sign will be skipped for the request and the access token will instead be used via an authorization header.
   *
   * More details: https://github.com/tiagosiebler/kucoin-api/issues/2
   */
  const client = new SpotClient({
    apiAccessToken: 'accessTokenHere!',
  });

  try {
    const result = await client.getBalances();

    console.log('result ', JSON.stringify(result, null, 2));
  } catch (e) {
    console.error('Req error: ', e);
  }

  // If you later need to set a new access token (e.g. it expired):
  client.setAccessToken('newAccessTokenHere');
}

start();
