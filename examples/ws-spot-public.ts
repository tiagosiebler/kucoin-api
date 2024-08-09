/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DefaultLogger,
  WebsocketClient,
  // WsSpotOperation,
} from '../src/index.js';
// import { WsTopicRequest } from '../src/lib/websocket/websocket-util';

async function start() {
  const logger: typeof DefaultLogger = {
    ...DefaultLogger,
    trace: (...params) => {
      if (
        [
          'Sending ping',
          'Sending upstream ws message: ',
          'Received pong',
        ].includes(params[0])
      ) {
        return;
      }
      console.log('trace', params);
    },
  };

  const client = new WebsocketClient({}, logger);

  client.on('open', (data) => {
    console.log('open: ', data?.wsKey);
  });

  // Data received
  client.on('update', (data) => {
    // console.info('data received: ', JSON.stringify(data));
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
    /**
     * Use the client subscribe(topic, market) pattern to subscribe to any websocket topic.
     *
     * You can subscribe to topics one at a time:
     */
    // Topics can be sent as simple strings
    // client.subscribe('/market/ticker:BTC-USDT,ETH-USDT', 'spotPublicV1');
    // client.subscribe('/market/snapshot:KCS-BTC', 'spotPublicV1');

    // Margin also goes to the "spotPublicV1" key
    client.subscribe('/indicator/index:USDT-BTC,ETH-USDT', 'spotPublicV1');

    // Or, as an array of simple strings
    // client.subscribe(
    //   ['/market/ticker:BTC-USDT,ETH-USDT', '/market/snapshot:KCS-BTC'],
    //   'spotPublicV1',
    // );

    // Or send a more structured object with parameters
    // const subRequest: WsTopicRequest<string> = {
    //   topic: '/market/ticker:BTC-USDT',
    //   // Anything in the payload will be merged into the subscribe request.
    //   // For more info on parameters, see: https://www.kucoin.com/docs/websocket/basic-info/subscribe/introduction
    //   payload: {
    //     id: 123456,
    //     response: false,
    //   },
    // };

    // client.subscribe(subRequest, 'spotPublicV1');
    // Or, as an array of structured objects with parameters
    // client.subscribe([subRequest1, subRequest2, etc], 'spotPublicV1');

    /**
     * The above examples are all for public spot websockets, via the "spotPublicV1" key.
     *
     * For futurt
     */

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    /**
     * make a list of some topics shown in the docs
     *
     * maybe make the subscribe call use spot or futures, instead of ws key (since we can determine auth needs automagically)
     *
     *
     */
    // KLine/Candles Channel
    // client.subscribe('spot/kline1m:BTC_USDT', 'spot');
    // Depth-All Channel
    // client.subscribe('spot/depth5:BTC_USDT', 'spot');
    // Depth-Increase Channel
    // client.subscribe('spot/depth/increase100:BTC_USDT', 'spot');
    // Trade Channel
    // client.subscribe('spot/trade:BTC_USDT', 'spot');
    /**
     * Or have multiple topics in one array, in a single request:
     */
    // client.subscribe(
    //   [
    //     'spot/ticker:BTC_USDT',
    //     'spot/ticker:ETH_USDT',
    //     'spot/ticker:XRP_USDT',
    //     'spot/ticker:BMX_USDT',
    //     'spot/ticker:SOL_USDT',
    //   ],
    //   'spot',
    // );
  } catch (e) {
    console.error(`Req error: `, e);
  }
}

start();
