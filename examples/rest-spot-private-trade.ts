import { SpotClient } from '../src';

async function start() {
  const account = {
    key: 'keyHere',
    secret: 'secretHere',
    passphrase: 'memoHere',
  };

  const client = new SpotClient({
    apiKey: account.key,
    apiSecret: account.secret,
    apiPassphrase: account.passphrase,
  });

  try {
    const spotBuyResult = await client.submitOrder({
      clientOid: client.generateNewOrderID(),
      side: 'buy',
      type: 'market',
      symbol: 'BTC-USDT',
      size: '0.00001',
    });
    console.log('spotBuy ', JSON.stringify(spotBuyResult, null, 2));

    const spotSellResult = await client.submitOrder({
      clientOid: client.generateNewOrderID(),
      side: 'sell',
      type: 'market',
      symbol: 'BTC-USDT',
      size: '0.00001',
    });

    console.log('spotSellResult ', JSON.stringify(spotSellResult, null, 2));
  } catch (e) {
    console.error(`Req error: `, e);
  }
}

start();
