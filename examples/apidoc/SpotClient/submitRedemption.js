const { SpotClient } = require('kucoin-api');

  // ENDPOINT: api/v1/earn/orders
  // METHOD: DELETE
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1364

const client = new SpotClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.submitRedemption(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
