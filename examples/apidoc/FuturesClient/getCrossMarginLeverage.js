const { FuturesClient } = require('kucoin-api');

  // ENDPOINT: api/v2/getCrossUserLeverage
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L516

const client = new FuturesClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getCrossMarginLeverage(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
