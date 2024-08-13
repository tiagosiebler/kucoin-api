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
    const symbols = await client.getSymbols();
    console.log('symbols:', JSON.stringify(symbols, null, 2));

    const ticker = await client.getTicker({ symbol: 'XBTUSDM' });
    console.log('ticker:', JSON.stringify(ticker, null, 2));

    const klines = await client.getKlines({
      symbol: 'XBTUSDM',
      granularity: 60,
    });
    console.log('klines:', JSON.stringify(klines, null, 2));
  } catch (e) {
    console.error(`Req error: `, e);
  }
}

start();
