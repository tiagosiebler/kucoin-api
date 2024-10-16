const { SpotClient } = require('kucoin-api');

  // This example shows how to call this kucoin API endpoint with either node.js, javascript (js) or typescript (ts) with the npm module "kucoin-api" for kucoin exchange
  // This kucoin API SDK is available on npm via "npm install kucoin-api"
  // ENDPOINT: api/v1/hf/orders/dead-cancel-all
  // METHOD: POST
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L762

const client = new SpotClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.cancelHFOrderAutoSetting(params)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
