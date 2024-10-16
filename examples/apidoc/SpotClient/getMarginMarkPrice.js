const { SpotClient } = require('kucoin-api');

  // ENDPOINT: api/v1/mark-price/{symbol}/current
  // METHOD: GET
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1185

const client = new SpotClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getMarginMarkPrice(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
