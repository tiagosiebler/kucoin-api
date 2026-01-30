/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DefaultLogger,
  WebsocketClient,
  WS_KEY_MAP,
} from '../../../src/index.js';
// import { DefaultLogger, WebsocketClient, WS_KEY_MAP } from 'kucoin-api';
// normally you should install this module via npm: `npm install kucoin-api`

async function start() {
  // Optional: inject a custom logger to override internal logging behaviour
  const logger: DefaultLogger = {
    ...DefaultLogger,
    // Uncomment the below callback to introduce filtered trace logging in the WebsocketClient.
    // trace: (...params) => {
    //   if (
    //     [
    //       'Sending ping',
    //       // 'Sending upstream ws message: ',
    //       'Received pong',
    //     ].includes(params[0])
    //   ) {
    //     return;
    //   }
    //   console.log('trace', JSON.stringify(params, null, 2));
    // },
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

  /**
   *
   * Raw events can be routed via the sendWSAPIRequest in the WebsocketClient, as shown below.
   * However, for a simpler integration, it is recommended to use the WebsocketAPIClient. The
   * WebsocketAPIClient class is a wrapper around sendWSAPIRequest, with clear functions, typed
   * requests and typed responses. The simpler WSAPIClient interface behaves much like a REST API
   * wrapper, but all calls are routed via the WebSocket API.
   *
   * For a clearer example, refer to the "ws-api-client.ts" example found in this folder.
   */
  try {
    const res = await client.sendWSAPIRequest(
      WS_KEY_MAP.wsApiSpotV1,
      'spot.order',
      {
        side: 'buy',
        symbol: 'BTC-USDT',
        type: 'limit',
        price: '20000', // Very low price to avoid accidental execution
        size: '0.0001',
      },
    );
    console.log('ws api res: ', res);
  } catch (e) {
    console.error('ws api exception: ', e);
  }
}

start();
