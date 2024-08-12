/* eslint-disable @typescript-eslint/no-unused-vars */
import { DefaultLogger, WebsocketClient } from '../src/index.js';

async function start() {
  // Optional: inject and customise a logger for more control over internal logging
  // const logger: typeof DefaultLogger = {
  //   ...DefaultLogger,
  //   trace: (...params) => {
  //     if (
  //       [
  //         'Sending ping',
  //         // 'Sending upstream ws message: ',
  //         'Received pong',
  //       ].includes(params[0])
  //     ) {
  //       return;
  //     }
  //     console.log('trace', JSON.stringify(params, null, 2));
  //   },
  // };

  const account = {
    key: process.env.API_KEY || 'keyHere',
    secret: process.env.API_SECRET || 'secretHere',
    passphrase: process.env.API_PASSPHRASE || 'apiPassPhraseHere', // This is NOT your account password
  };

  console.log(`connecting with `, account);
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
    console.info('response: ', data);
    // throw new Error('res?');
  });

  client.on('exception', (data) => {
    console.error('exception: ', {
      msg: data.msg,
      errno: data.errno,
      code: data.code,
      syscall: data.syscall,
      hostname: data.hostname,
    });
  });

  try {
    // Optional: await a connection to be ready before subscribing (this is not necessary)
    await client.connect('futuresPrivateV1');
    console.log('connected');

    /**
     * For more detailed usage info, refer to the ws-spot-public.ts example.
     *
     * Below are some examples for subscribing to private futures websockets.
     * Note: all "private" websocket topics should use the "futuresPrivateV1" wsKey.
     */
    client.subscribe(
      [
        '/contractMarket/tradeOrders:XBTUSDM',
        '/contractMarket/tradeOrders',
        '/contractMarket/advancedOrders',
        '/contractAccount/wallet',
        '/contract/position:XBTUSDM',
        '/contract/positionAll',
      ],
      'futuresPrivateV1',
    );
  } catch (e) {
    console.error(`Subscribe exception: `, e);
  }
}

start();
