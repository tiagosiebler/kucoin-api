const { FuturesClient } = require('kucoin-api');

  // ENDPOINT: api/v1/premium/query
  // METHOD: GET
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L279

const client = new FuturesClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getPremiumIndex(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
