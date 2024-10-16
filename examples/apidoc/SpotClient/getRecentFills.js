const { SpotClient } = require('kucoin-api');

  // This example shows how to call this kucoin API endpoint with either node.js, javascript (js) or typescript (ts) with the npm module "kucoin-api" for kucoin exchange
  // This kucoin API SDK is available on npm via "npm install kucoin-api"
  // ENDPOINT: api/v1/limit/fills
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L888

const client = new SpotClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getRecentFills(params)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
