import {
  WebsocketClient,
  // WsSpotOperation,
} from '../src';

async function start() {
  const client = new WebsocketClient();

  client.on('open', (data) => {
    console.log('open: ', data?.wsKey);

    // Some topics allow requests, here's an example for sending a request
    // const wsKey = 'spotPublicV1';
    // if (data?.wsKey === wsKey) {
    //   const depthIncreaseDataRequest: WsSpotOperation = {
    //     op: 'request',
    //     args: ['spot/depth/increase100:BTC_USDT'],
    //   };

    //   client.tryWsSend(
    //     'spotPublicV1',
    //     JSON.stringify(depthIncreaseDataRequest),
    //   );
    // }
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
  });

  client.on('exception', (data) => {
    console.error('exception: ', data);
  });

  try {
    /**
     * Use the client subscribe(topic, market) pattern to subscribe to any websocket topic.
     *
     * You can subscribe to topics one at a time:
     */

    // Ticker Channel
    // client.subscribe('spot/ticker:BTC_USDT', 'spot');

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
    client.subscribe(
      [
        'spot/ticker:BTC_USDT',
        'spot/ticker:ETH_USDT',
        'spot/ticker:XRP_USDT',
        'spot/ticker:BMX_USDT',
        'spot/ticker:SOL_USDT',
      ],
      'spot',
    );
  } catch (e) {
    console.error(`Req error: `, e);
  }
}

start();
