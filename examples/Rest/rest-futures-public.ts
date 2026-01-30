import { FuturesClient } from '../../src/index.ts';
// import { FuturesClient } from 'kucoin-api';
// normally you should install this module via npm: `npm install kucoin-api`

async function start() {
  const client = new FuturesClient();

  try {
    // Fetch all symbols
    const symbols = await client.getSymbols();
    console.log('symbols:', JSON.stringify(symbols, null, 2));

    // Fetch ticker for a specific symbol
    const ticker = await client.getTicker({ symbol: 'XBTUSDM' });
    console.log('ticker:', JSON.stringify(ticker, null, 2));

    // Fetch klines for a specific symbol
    const klines = await client.getKlines({
      symbol: 'XBTUSDM',
      granularity: 60,
    });
    console.log('klines:', JSON.stringify(klines, null, 2));
  } catch (e) {
    console.error('Req error: ', e);
  }
}

start();
