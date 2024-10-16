const { FuturesClient } = require('kucoin-api');

  // ENDPOINT: api/v1/orders/client-order/{clientOid}
  // METHOD: DELETE
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L324

const client = new FuturesClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.cancelOrderByClientOid(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
