const { SpotClient } = require('kucoin-api');

  // ENDPOINT: api/v2/sub-accounts
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L284

const client = new SpotClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getSubAccountBalancesV2(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
