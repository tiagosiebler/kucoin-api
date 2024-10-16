const { FuturesClient } = require('kucoin-api');

  // ENDPOINT: api/v1/contracts/{symbol}
  // METHOD: GET
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L209

const client = new FuturesClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getSymbol(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
