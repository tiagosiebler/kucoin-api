import { FuturesClient } from '../../src/index.ts';
// import { FuturesClient } from 'kucoin-api';
// normally you should install this module via npm: `npm install kucoin-api`

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
     * =======
     * Credits for this guide go to user: @DKTradingClient / Code Nerd from the Kucoin API Telegram group!
     * =======

    /**
     * Futures are contracts, not currencies. In the futures symbols list you will see a "multiplier" field for each of the symbols. 
     * Each contract equals to  Multiplier x Size
     * For example:  https://api-futures.kucoin.com/api/v1/contracts/XRPUSDTM  - see the "multiplier" value.
     * */

    const symbolInfo = await client.getSymbol({ symbol: 'XRPUSDTM' });
    const multiplier = symbolInfo.data.multiplier;

    /**
     * E.g. if multiplier is 10(what you can see from the endpoint), that means each SIZE is 10 XRP. So if XRP is currently at $0.5,
     * then each 1 contract (size 10) is going to cost $5.00
     * size = (Funds x leverage) / (price x multiplier)
     */

    const XRPPriceExample = 0.5;
    const leverage = 5;
    const fundsToTradeUSDT = 100;

    const costOfContract = XRPPriceExample * multiplier;

    const size = (fundsToTradeUSDT * leverage) / costOfContract;
    console.log(`Size: ${size}`);

    /**
     * The trade amount indicates the amount of contract to buy or sell, and contract uses the base currency or lot as the trading unit.
     * The trade amount must be no less than 1 lot for the contract and no larger than the maxOrderQty.
     * It should be a multiple number of the lot, or the system will report an error when you place the order.
     * E.g. 1 lot of XBTUSDTM is 0.001 Bitcoin, while 1 lot of XBTUSDM is 1 USD.
     * or check the XRPUSDTM example above.
     *
     * Here are function examples using the Futures Create Order endpoint:
     */

    // A MARKET SHORT of 2 contracts of XBT using leverage of 5:
    const marketShort = client.submitOrder({
      clientOid: '123456789',
      leverage: 5,
      side: 'sell',
      size: 2,
      symbol: 'XBTUSDTM',
      timeInForce: 'GTC',
      type: 'market',
    });
    console.log('Market short: ', marketShort);

    // A MARKET LONG of 2 contracts of XBT using leverage of 5:
    const marketLong = client.submitOrder({
      clientOid: '123456789',
      leverage: 5,
      side: 'buy',
      size: 2,
      symbol: 'XBTUSDTM',
      timeInForce: 'GTC',
      type: 'market',
    });
    console.log('Market long: ', marketLong);

    // A LIMIT SHORT of 2 contracts of XBT using leverage of 5:
    const limitShort = client.submitOrder({
      clientOid: '123456789',
      leverage: 5,
      price: '70300.31',
      side: 'sell',
      size: 2,
      symbol: 'XBTUSDTM',
      timeInForce: 'GTC',
      type: 'limit',
    });
    console.log('Limit short: ', limitShort);

    // A LIMIT LONG of 2 contracts of XBT using leverage of 5:
    const limitLong = client.submitOrder({
      clientOid: '123456789',
      leverage: 5,
      price: '40300.31',
      side: 'buy',
      size: 2,
      symbol: 'XBTUSDTM',
      timeInForce: 'GTC',
      type: 'limit',
    });
    console.log('Limit long: ', limitLong);
    // On any "close position" action, if you specify a SIZE=0 or leave off the SIZE parameter,
    // then it will close the whole position, regardless of the size.
    // If you specify a SIZE, it will close only the number of contracts you specify.

    // If closeOrder is set to TRUE,
    // the system will close the position and the position size will become 0.
    // Side, Size and Leverage fields can be left empty and the system will determine the side and size automatically.

    // A MARKET CLOSE POSITION example:
    const marketClose = client.submitOrder({
      clientOid: '123456789',
      closeOrder: true,
      symbol: 'XBTUSDTM',
      timeInForce: 'GTC',
      type: 'market',
      side: 'sell',
      size: 0,
    });
    console.log('Market close: ', marketClose);

    // A LIMIT CLOSE of a LONG example:
    const limitCloseLong = client.submitOrder({
      clientOid: '123456789',
      leverage: 5,
      price: '70300.31',
      closeOrder: true,
      side: 'sell',
      size: 2,
      symbol: 'XBTUSDTM',
      timeInForce: 'GTC',
      type: 'limit',
    });
    console.log('Limit close long: ', limitCloseLong);

    // A LIMIT CLOSE of a SHORT example:
    const limitCloseShort = client.submitOrder({
      clientOid: '123456789',
      leverage: 5,
      price: '40300.31',
      closeOrder: true,
      side: 'buy',
      size: 2,
      symbol: 'XBTUSDTM',
      timeInForce: 'GTC',
      type: 'limit',
    });
    console.log('Limit close short: ', limitCloseShort);

    // A STOP LOSS example for a LONG position:
    const stopLossLong = client.submitOrder({
      clientOid: '123456789',
      closeOrder: true,
      stop: 'down',
      side: 'buy',
      stopPrice: '40200.31',
      stopPriceType: 'TP',
      symbol: 'XBTUSDTM',
      timeInForce: 'GTC',
      type: 'market',
    });
    console.log('Stoploss long: ', stopLossLong);

    // A STOP LOSS example for a SHORT position:
    const stopLossShort = client.submitOrder({
      clientOid: '123456789',
      closeOrder: true,
      stop: 'up',
      side: 'sell',
      stopPrice: '40200.31',
      stopPriceType: 'TP',
      symbol: 'XBTUSDTM',
      timeInForce: 'GTC',
      type: 'market',
    });

    console.log('Stoploss short: ', stopLossShort);
  } catch (e) {
    console.error('Req error: ', e);
  }
}

start();
