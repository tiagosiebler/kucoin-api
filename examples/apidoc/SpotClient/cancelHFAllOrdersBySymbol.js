const { SpotClient } = require('kucoin-api');

  // ENDPOINT: api/v1/hf/orders
  // METHOD: DELETE
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L709

const client = new SpotClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.cancelHFAllOrdersBySymbol(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
