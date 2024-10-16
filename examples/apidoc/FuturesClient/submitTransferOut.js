const { FuturesClient } = require('kucoin-api');

  // ENDPOINT: api/v3/transfer-out
  // METHOD: POST
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L169

const client = new FuturesClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.submitTransferOut(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
