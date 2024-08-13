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
    const symbols = await client.getSymbols();
    console.log('symbols:', JSON.stringify(symbols, null, 2));

    const ticker = await client.getTicker({ symbol: 'BTC-USDT' });
    console.log('ticker:', JSON.stringify(ticker, null, 2));

    const klines = await client.getKlines({
      symbol: 'BTC-USDT',
      type: '1day',
    });
    console.log(klines);
  } catch (e) {
    console.error(`Req error: `, e);
  }
}

start();
