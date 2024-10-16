const { SpotClient } = require('kucoin-api');

  // ENDPOINT: api/v1/sub/api-key/update
  // METHOD: POST
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L311

const client = new SpotClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.updateSubAPI(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
