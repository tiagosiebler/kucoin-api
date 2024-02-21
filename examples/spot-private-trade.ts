import { SpotClient } from '../src';

const readWriteAccount = {
  key: 'keyHere',
  secret: 'secretHere',
  memo: 'memoHere',
};

async function start() {
  const account = readWriteAccount;

  const client = new SpotClient({
    apiKey: account.key,
    apiSecret: account.secret,
    apiMemo: account.memo,
  });

  try {
    const usdValue = 6;
    const price = 52000;
    const qty = usdValue / price;

    const limitBuyOrder = {
      symbol: 'BTC_USDT',
      side: 'buy',
      type: 'limit',
      size: String(qty),
      price: String(price),
    };

    // const res = await client.submitSpotOrder({
    //   symbol: 'BTC_USDT',
    //   side: 'buy',
    //   type: 'market',
    //   size: String(qty),
    // });

    const res = await client.submitSpotOrder({
      symbol: 'BTC_USDT',
      side: 'sell',
      type: 'market',
      size: String(0.00011),
    });
    console.log('res ', JSON.stringify(res, null, 2));
  } catch (e) {
    console.error(`Req error: `, e);
  }
}

start();
