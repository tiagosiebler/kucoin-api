import { DefaultLogger, WebsocketAPIClient } from '../../src/index.js';

async function main() {
  const customLogger = {
    ...DefaultLogger,
    // For a more detailed view of the WebsocketClient, enable the `trace` level by uncommenting the below line:
    // trace: (...params) => console.log(new Date(), 'trace', ...params),
  };

  const account = {
    key: process.env.API_KEY || 'keyHere',
    secret: process.env.API_SECRET || 'secretHere',
    passphrase: process.env.API_PASSPHRASE || 'apiPassPhraseHere', // This is NOT your account password
  };

  const wsClient = new WebsocketAPIClient(
    {
      apiKey: account.key,
      apiSecret: account.secret,
      apiPassphrase: account.passphrase,

      // If you want your own event handlers instead of the default ones with logs, disable this setting and see the `attachEventHandlers` example below:
      // attachEventListeners: false
    },
    customLogger,
  );

  // Optional, attach basic event handlers, so nothing is left unhandled
  // attachEventHandlers(wsClient.getWSClient());

  try {
    const response = await wsClient.submitNewSpotOrder({
      side: 'buy',
      symbol: 'BTC-USDT',
      type: 'market',
      size: '0.001',
    });

    const response2 = {
      wsKey: 'wsApiSpotV1',
      inTime: 1758206953829,
      outTime: 1758206953862,
      code: '200000',
      data: { orderId: '68cc1be9401faa0007a8a046' },
      id: '1',
      op: 'spot.order',
      request: {
        wsKey: 'wsApiSpotV1',
        id: '1',
        op: 'spot.order',
        args: {
          side: 'buy',
          symbol: 'BTC-USDT',
          type: 'market',
          size: '0.0001',
        },
      },
    };

    console.log('submitNewSpotOrder response: ', response);
  } catch (e) {
    console.log('submitNewSpotOrder error: ', e);
  }
}

// Start executing the example workflow
main();
