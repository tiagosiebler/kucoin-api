/**
 * KuCoin WebSocket API Client - Complete Example
 *
 * This example demonstrates all available WebSocket API operations:
 * - Ping (health check)
 * - Spot trading: submit, modify, cancel, sync operations
 * - Margin trading: submit and cancel orders
 * - Futures trading: submit, cancel, batch operations
 *
 * Usage:
 * Make sure to set your API credentials in environment variables:
 *    - API_KEY
 *    - API_SECRET
 *    - API_PASSPHRASE
 *
 *  or pass them as arguments to the constructor
 */

import { DefaultLogger, WebsocketAPIClient } from '../../src/index.js';

async function main() {
  const customLogger = {
    ...DefaultLogger,
    // For a more detailed view of the WebsocketClient, enable the `trace` level by uncommenting the below line:
    trace: (...params) => console.log(new Date(), 'trace', ...params),
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

  // Example usage for each WebSocket API operation
  console.log('Starting WebSocket API examples...\n');

  // 2. Submit Spot Order
  /* try {
    console.log('\n2. Testing submitNewSpotOrder...');
    const spotOrderResponse = await wsClient.submitNewSpotOrder({
      side: 'buy',
      symbol: 'BTC-USDT',
      type: 'limit',
      price: '20000', // Very low price to avoid accidental execution
      size: '0.0001',
    });
    console.log('Spot order response:', spotOrderResponse);
  } catch (e) {
    console.log('Spot order error:', e);
  } */

  // 3. Submit Sync Spot Order
  /* try {
    console.log('\n3. Testing submitSyncSpotOrder...');
    const syncSpotOrderResponse = await wsClient.submitSyncSpotOrder({
      side: 'buy',
      symbol: 'BTC-USDT',
      type: 'limit',
      price: '1000', // Very high price to avoid accidental execution
      size: '0.01',
    });
    console.log('Sync spot order response:', syncSpotOrderResponse);
  } catch (e) {
    console.log('Sync spot order error:', e);
  }  */

  // 4. Modify Spot Order (requires existing order ID)
  /* try {
    console.log('\n4. Testing modifySpotOrder...');
    const modifyResponse = await wsClient.modifySpotOrder({
      symbol: 'BTC-USDT',
      orderId: '68cc3476693c1c00072ef1d9', // Replace with actual order ID
      newPrice: '2000',
    });
    console.log('Modify spot order response:', modifyResponse);
  } catch (e) {
    console.log('Modify spot order error:', e);
  }  */

  // 5. Cancel Spot Order
  /* try {
    console.log('\n5. Testing cancelSpotOrder...');
    const cancelSpotResponse = await wsClient.cancelSpotOrder({
      symbol: 'BTC-USDT',
      orderId: '68cc34c6693c1c0007301929', // Replace with actual order ID
    });
    console.log('Cancel spot order response:', cancelSpotResponse);
  } catch (e) {
    console.log('Cancel spot order error:', e);
  } */

  // 6. Cancel Sync Spot Order
  /* try {
    console.log('\n6. Testing cancelSyncSpotOrder...');
    const cancelSyncResponse = await wsClient.cancelSyncSpotOrder({
      symbol: 'BTC-USDT',
      orderId: '68cc3530b9870a0007670294', // Replace with actual client order ID
    });
    console.log('Cancel sync spot order response:', cancelSyncResponse);
  } catch (e) {
    console.log('Cancel sync spot order error:', e);
  } */

  /* // 7. Submit Margin Order
  try {
    console.log('\n7. Testing submitMarginOrder...');
    const marginOrderResponse = await wsClient.submitMarginOrder({
      clientOid: 'margin-test-' + Date.now(),
      side: 'buy',
      symbol: 'BTC-USDT',
      type: 'limit',
      price: '19000', // Very low price to avoid accidental execution
      size: '0.0001',
      isIsolated: false, // false for cross margin, true for isolated
    });
    console.log('Margin order response:', marginOrderResponse);
  } catch (e) {
    console.log('Margin order error:', e);
  } */

  /* // 8. Cancel Margin Order
  try {
    console.log('\n8. Testing cancelMarginOrder...');
    const cancelMarginResponse = await wsClient.cancelMarginOrder({
      symbol: 'BTC-USDT',
      orderId: 'your-margin-order-id-here', // Replace with actual order ID
    });
    console.log('Cancel margin order response:', cancelMarginResponse);
  } catch (e) {
    console.log('Cancel margin order error:', e);
  } */

  // 9. Submit Futures Order
  /* try {
    console.log('\n9. Testing submitFuturesOrder...');
    const futuresOrderResponse = await wsClient.submitFuturesOrder({
      clientOid: 'futures-test-' + Date.now(),
      side: 'buy',
      symbol: 'XBTUSDTM',
      marginMode: 'CROSS',
      type: 'limit',
      price: '1000', // Very low price to avoid accidental execution
      qty: '0.01',
      leverage: 10,
    });
    console.log('Futures order response:', futuresOrderResponse);
  } catch (e) {
    console.log('Futures order error:', e);
  } */

  // 10. Cancel Futures Order
  /* try {
    console.log('\n10. Testing cancelFuturesOrder...');
    const cancelFuturesResponse = await wsClient.cancelFuturesOrder({
      symbol: 'XBTUSDTM',
      orderId: '358196976308797441', // Replace with actual order ID
    });
    console.log('Cancel futures order response:', cancelFuturesResponse);
  } catch (e) {
    console.log('Cancel futures order error:', e);
  } */

  // 11. Submit Multiple Futures Orders
  try {
    console.log('\n11. Testing submitMultipleFuturesOrders...');
    const multiFuturesResponse = await wsClient.submitMultipleFuturesOrders([
      {
        clientOid: 'futures-test-1-' + Date.now(),
        side: 'buy',
        symbol: 'XBTUSDTM',
        marginMode: 'CROSS',
        type: 'limit',
        price: '1000', // Very low price to avoid accidental execution
        qty: '0.01',
        leverage: 10,
        positionSide: 'LONG', // Needed if trading hedge/two-way mode. Optional in one-way mode.
      },
      {
        clientOid: 'futures-test-2-' + Date.now(),
        side: 'buy',
        symbol: 'XBTUSDTM',
        marginMode: 'CROSS',
        type: 'limit',
        price: '1010', // Very low price to avoid accidental execution
        qty: '0.01',
        leverage: 10,
        positionSide: 'LONG',
      },
    ]);
    console.log('Multiple futures orders response:', multiFuturesResponse);
  } catch (e) {
    console.log('Multiple futures orders error:', e);
  }

  /* // 12. Cancel Multiple Futures Orders
  try {
    console.log('\n12. Testing cancelMultipleFuturesOrders...');
    const cancelMultiFuturesResponse =
      await wsClient.cancelMultipleFuturesOrders({
        orderIdsList: ['order-id-1', 'order-id-2'], // Replace with actual order IDs
      });
    console.log(
      'Cancel multiple futures orders response:',
      cancelMultiFuturesResponse,
    );
  } catch (e) {
    console.log('Cancel multiple futures orders error:', e);
  } */

  console.log('\nCompleted all WebSocket API examples!');
}

// Start executing the example workflow
main();
