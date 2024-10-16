const { SpotClient } = require('kucoin-api');

  // ENDPOINT: api/v1/hf/orders/active/symbols
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L728

const client = new SpotClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getHFActiveSymbols(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
