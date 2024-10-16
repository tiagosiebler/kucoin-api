const { SpotClient } = require('kucoin-api');

  // ENDPOINT: api/v1/market/orderbook/level2_20
  // METHOD: GET
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L574

const client = new SpotClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getOrderBookLevel20(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
