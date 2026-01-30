/* eslint-disable @typescript-eslint/no-unused-vars */
import { DefaultLogger, WebsocketClient } from '../../src/index.js';
// import { DefaultLogger, WebsocketClient } from 'kucoin-api';
// normally you should install this module via npm: `npm install kucoin-api`

async function start() {
  // Optional: fully customise the logging experience by injecting a custom logger
  // const logger: typeof DefaultLogger = {
  //   ...DefaultLogger,
  //   trace: (...params) => {
  //     if (
  //       [
  //         'Sending ping',
  //         'Sending upstream ws message: ',
  //         'Received pong',
  //       ].includes(params[0])
  //     ) {
  //       return;
  //     }
  //     console.log('trace', params);
  //   },
  // };

  // const client = new WebsocketClient({}, logger);
  const client = new WebsocketClient();

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
    // await client.connect('futuresPublicV1');

    /**
     * Examples for public futures websocket topics (that don't require authentication).
     *
     * These should all subscribe via the "futuresPublicV1" wsKey. For detailed usage, refer to the ws-spot-public.ts example.
     */
    client.subscribe(
      [
        '/contractMarket/tickerV2:XBTUSDM',
        '/contractMarket/ticker:XBTUSDM',
        '/contractMarket/level2:XBTUSDM',
        '/contractMarket/execution:XBTUSDM',
        '/contractMarket/level2Depth5:XBTUSDM',
        '/contractMarket/level2Depth50:XBTUSDM',
        '/contractMarket/limitCandle:XBTUSDTM_1hour',
        '/contract/instrument:XBTUSDM',
        '/contract/announcement',
        '/contractMarket/snapshot:XBTUSDM',
      ],
      'futuresPublicV1',
    );
  } catch (e) {
    console.error('Subscribe exception: ', e);
  }
}

start();
