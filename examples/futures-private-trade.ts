import { FuturesClient } from '../src';

async function start() {
  const account = {
    key: 'keyHere',
    secret: 'secretHere',
    passphrase: 'memoHere',
  };
  const client = new FuturesClient({
    apiKey: account.key,
    apiSecret: account.secret,
    apiPassphrase: account.passphrase,
  });

  try {
    /**
     * The trade amount indicates the amount of contract to buy or sell, and contract uses the base currency or lot as the trading unit.
     * The trade amount must be no less than 1 lot for the contract and no larger than the maxOrderQty.
     * It should be a multiple number of the lot, or the system will report an error when you place the order.
     * E.g. 1 lot of XBTUSDTM is 0.001 Bitcoin, while 1 lot of XBTUSDM is 1 USD.
     */

    // Submit a futures entry order for 1 lot of XBTUSDTM (0.001 bitcoin)
    const orderRes = await client.submitFuturesOrder({
      clientOid: client.generateNewOrderID(),
      side: 'buy',
      type: 'market',
      symbol: 'XBTUSDTM',
      size: 1,
      leverage: '2',
    });

    console.log('orderRes ', JSON.stringify(orderRes, null, 2));
  } catch (e) {
    console.error(`Req error: `, e);
  }
}

start();
