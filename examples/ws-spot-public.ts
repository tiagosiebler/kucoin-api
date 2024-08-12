/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DefaultLogger,
  WebsocketClient,
  WsTopicRequest,
  // WsSpotOperation,
} from '../src/index.js';
// import { WsTopicRequest } from '../src/lib/websocket/websocket-util';

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
    // await client.connect('spotPublicV1');

    /**
     * Use the client subscribe(topic, market) pattern to subscribe to any websocket topic.
     *
     * You can subscribe to topics one at a time or many one one request. Topics can be sent as simple strings:
     *
     */
    client.subscribe('/market/ticker:BTC-USDT,ETH-USDT', 'spotPublicV1');
    client.subscribe('/market/snapshot:KCS-BTC', 'spotPublicV1');

    /**
     * Or, as an array of simple strings
     *
     */
    client.subscribe(
      ['/market/ticker:BTC-USDT,ETH-USDT', '/market/snapshot:KCS-BTC'],
      'spotPublicV1',
    );

    /**
     * Or send a more structured object with parameters
     *
     */
    const subRequest: WsTopicRequest<string> = {
      topic: '/market/ticker:BTC-USDT',
      /** Anything in the payload will be merged into the subscribe "request", allowing you to send misc parameters supported by the exchange.
       *    For more info on parameters, see: https://www.kucoin.com/docs/websocket/basic-info/subscribe/introduction
       */
      payload: {
        id: 123456,
        response: false,
      },
    };
    client.subscribe(subRequest, 'spotPublicV1');

    /**
     * Or, send an array of structured objects with parameters, if you wanted to send multiple in one request
     *
     */
    // client.subscribe([subRequest1, subRequest2, etc], 'spotPublicV1');

    /**
     * Other spot websocket topics:
     */
    client.subscribe(
      [
        '/market/ticker:BTC-USDT,ETH-USDT',
        '/market/ticker:all',
        '/market/snapshot:KCS-BTC',
        '/market/snapshot:BTC',
        '/spotMarket/level1:BTC-USDT,ETH-USDT',
        '/market/level2:BTC-USDT,ETH-USDT',
        '/spotMarket/level2Depth5:BTC-USDT,ETH-USDT',
        '/spotMarket/level2Depth50:BTC-USDT,ETH-USDT',
        '/market/candles:BTC-USDT_1hour',
        '/market/match:BTC-USDT,ETH-USDT',
      ],
      'spotPublicV1',
    );

    /**
     * Other margin websocket topics, which also use the "spotPublicV1" WsKey:
     */
    client.subscribe(
      [
        '/indicator/index:USDT-BTC,ETH-USDT',
        '/indicator/markPrice:USDT-BTC,ETH-USDT',
      ],
      'spotPublicV1',
    );
  } catch (e) {
    console.error(`Subscribe exception: `, e);
  }
}

start();
