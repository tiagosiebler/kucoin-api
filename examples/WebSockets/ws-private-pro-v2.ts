import {
  WebsocketClient,
  WS_KEY_MAP,
  WsTopicRequest,
} from '../../src/index.js';
// import { DefaultLogger, WebsocketClient } from 'kucoin-api';
// normally you should install this module via npm: `npm install kucoin-api`

async function start() {
  // Optional: inject a custom logger to override internal logging behaviour
  // const logger: typeof DefaultLogger = {
  //   ...DefaultLogger,
  //   trace: (...params) => {
  //     // Simple way to exclude certain messages from trace logs
  //     if (
  //       [
  //         'Sending ping',
  //         // 'Sending upstream ws message: ',
  //         'Received pong',
  //         'Decompressed message event from buffer',
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

  console.log('connecting with ', account);
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

  /**
   * The below examples demonstrate consuming private V2 (Pro) WebSocket topics.
   * For V1 private WebSocket examples, see ws-private-spot-v1.ts and ws-private-futures-v1.ts
   */
  try {
    // Optional: await a connection to be ready before subscribing (this is not necessary)
    // await client.connect(WS_KEY_MAP.privateProV2);
    // console.log('connected');

    /**
     * Structure your requests into the following format. The below example will be sent as per the example in the docs. The parameters are automatically merged into the request. Just follow the example below:
     * {
     *   "id": "1545910660739", // OPTIONAL
     *   "action": "SUBSCRIBE", // or UNSUBSCRIBE
     *   "channel":"orderAll", //
     *   "tradeType": "SPOT" // SPOT / FUTURES / ISOLATED / CROSS / UNIFIED
     * }
     *
     * https://www.kucoin.com/docs-new/3470228w0
     */
    const orderAllSpotRequest: WsTopicRequest = {
      topic: 'orderAll',
      /**
       * Anything in the payload will be merged into the subscribe "request", allowing you to send misc parameters supported by the exchange.
       * For more info on parameters, see: https://www.kucoin.com/docs-new/websocket-api/base-info/introduction-uta#5-subscribe
       */
      payload: {
        tradeType: 'SPOT', // SPOT / FUTURES / ISOLATED / CROSS / UNIFIED
      },
    };
    client.subscribe(orderAllSpotRequest, WS_KEY_MAP.privateProV2);

    // Or, subscribe to multiple topics at once:
    client.subscribe(
      [
        // Other markets for orderAll topic:
        // https://www.kucoin.com/docs-new/3470228w0
        {
          topic: 'orderAll',
          payload: {
            tradeType: 'FUTURES', // SPOT / FUTURES / ISOLATED / CROSS / UNIFIED
          },
        },
        // Specific order updates for a given symbol:
        // https://www.kucoin.com/docs-new/3470228w0
        {
          topic: 'order',
          payload: {
            tradeType: 'SPOT', // SPOT / FUTURES / ISOLATED / CROSS / UNIFIED
            symbol: 'BTC-USDT',
          },
        },
        // Futures positions:
        // https://www.kucoin.com/docs-new/3470233w0
        {
          topic: 'positionAll',
          payload: {
            tradeType: 'FUTURES', //  FUTURES / UNIFIED
          },
        },
        {
          topic: 'position',
          payload: {
            tradeType: 'FUTURES', //  FUTURES / UNIFIED
            symbol: 'XBTUSDTM',
          },
        },
        // Account balance updates:
        // https://www.kucoin.com/docs-new/3470231w0
        {
          topic: 'balance',
          payload: {
            accountType: 'TRADING', // TRADING / ISOLATED / CROSS / FUTURES / UNIFIED
          },
        },
        // Execution/trade updates:
        // https://www.kucoin.com/docs-new/3470232w0
        {
          topic: 'execution',
          payload: {
            tradeType: 'SPOT', // SPOT / ISOLATED / CROSS / FUTURES / UNIFIED
          },
        },
        // Liquidation warnings:
        // https://www.kucoin.com/docs-new/3470236w0
        {
          topic: 'lw',
          payload: {
            tradeType: 'UNIFIED',
          },
        },
        // Leverage updates:
        // https://www.kucoin.com/docs-new/3470237w0
        {
          topic: 'leverage',
          payload: {
            tradeType: 'UNIFIED',
          },
        },
      ],
      WS_KEY_MAP.privateProV2,
    );
  } catch (e) {
    console.error('Subscribe exception: ', e);
  }
}

start();
