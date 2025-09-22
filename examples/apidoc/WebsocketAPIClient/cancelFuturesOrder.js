const { WebsocketAPIClient } = require('kucoin-api');

// This example shows how to call this kucoin WebSocket API endpoint with either node.js, javascript (js) or typescript (ts) with the npm module "kucoin-api" for kucoin exchange
// This kucoin API SDK is available on npm via "npm install kucoin-api"
// WS API ENDPOINT: futures.cancel
// METHOD: WebSocket API
// PUBLIC: 'NO'

// Create a WebSocket API client instance
const client = new WebsocketAPIClient({
  apiKey: 'apiKeyHere',
  apiSecret: 'apiSecretHere',
  apiPassphrase: 'apiPassPhraseHere',
});

// The WebSocket connection is established automatically when needed
// You can use the client to make requests immediately

// Example use of the cancelFuturesOrder method
client.cancelFuturesOrder(params)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });

