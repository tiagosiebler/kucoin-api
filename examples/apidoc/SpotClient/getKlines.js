const { SpotClient } = require('kucoin-api');

  // ENDPOINT: api/v1/market/candles
  // METHOD: GET
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L598

const client = new SpotClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getKlines(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
