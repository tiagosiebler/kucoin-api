/* eslint-disable @typescript-eslint/no-unused-vars */
import { DefaultLogger, WebsocketClient, WS_KEY_MAP } from '../../src/index.js';
// import { DefaultLogger, WebsocketClient, WS_KEY_MAP } from 'kucoin-api';
// normally you should install this module via npm: `npm install kucoin-api`

async function start() {
  // Optional: inject a custom logger to override internal logging behaviour
  const logger: DefaultLogger = {
    ...DefaultLogger,
    trace: (...params) => {
      if (
        [
          'Sending ping',
          // 'Sending upstream ws message: ',
          'Received pong',
        ].includes(params[0])
      ) {
        return;
      }
      console.log('trace', JSON.stringify(params, null, 2));
    },
  };

  const account = {
    key: process.env.API_KEY || 'keyHere',
    secret: process.env.API_SECRET || 'secretHere',
    passphrase: process.env.API_PASSPHRASE || 'apiPassPhraseHere', // This is NOT your account password
  };

  // console.log('connecting with ', account);
  const client = new WebsocketClient(
    {
      apiKey: account.key,
      apiSecret: account.secret,
      apiPassphrase: account.passphrase,
    },
    // logger,
  );

  client.on('open', (data) => {
    console.log('open: ', data?.wsKey);
  });

  // Data received
  client.on('update', (data) => {
    console.info('data received: ', JSON.stringify(data));
  });

  // Something happened, attempting to reconenct
  client.on('reconnect', (data) => {
    console.log('reconnect: ', data);
  });

  // Reconnect successful
  client.on('reconnected', (data) => {
    console.log('reconnected: ', data);
  });

  // Connection closed. If unexpected, expect reconnect -> reconnected.
  client.on('close', (data) => {
    console.error('close: ', data);
  });

  // Reply to a request, e.g. "subscribe"/"unsubscribe"/"authenticate"
  client.on('response', (data) => {
    // console.info('response: ', data);
  });

  client.on('exception', (data) => {
    console.error('exception: ', data);
  });

  try {
    const res = await client.sendWSAPIRequest(
      WS_KEY_MAP.wsApiSpotV1,
      'spot.cancel',
      {
        clientOid: 'asdfasf',
        symbol: 'adsfasf',
      },
    );
    console.log('ws api res: ', res);
  } catch (e) {
    console.error('ws api exception: ', e);
  }
}

start();
