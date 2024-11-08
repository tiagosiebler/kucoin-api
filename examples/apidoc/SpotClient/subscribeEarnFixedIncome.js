const { SpotClient } = require('kucoin-api');

  // This example shows how to call this kucoin API endpoint with either node.js, javascript (js) or typescript (ts) with the npm module "kucoin-api" for kucoin exchange
  // This kucoin API SDK is available on npm via "npm install kucoin-api"
  // ENDPOINT: api/v1/earn/orders
  // METHOD: POST
  // PUBLIC: NO

const client = new SpotClient({
  apiKey: 'apiKeyHere',
  apiSecret: 'apiSecretHere',
  apiPassphrase: 'apiPassPhraseHere',
});

client.subscribeEarnFixedIncome(params)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
