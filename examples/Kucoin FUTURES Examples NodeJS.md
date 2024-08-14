# **KuCoin FUTURES API Examples** - Node.js, JavaScript & Typescript SDK for Kucoin REST APIs & WebSockets

<p align="center">
  <a href="https://www.npmjs.com/package/kucoin-api">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/tiagosiebler/kucoin-api/blob/master/docs/images/logoDarkMode2.svg?raw=true#gh-dark-mode-only">
      <img alt="SDK Logo" src="https://github.com/tiagosiebler/kucoin-api/blob/master/docs/images/logoBrightMode2.svg?raw=true#gh-light-mode-only">
    </picture>
  </a>
</p>

This document provides comprehensive examples for using the KuCoin FUTURES API with Node.js and JavaScript. It covers various functionalities including account management, fund transfers, trade execution, order management, and market data retrieval. The examples are designed to help developers quickly integrate KuCoin Futures API into their NodeJS, Javascript and Typscript applications.

If you are here, it means you will be great addition to our [Node.js Traders](https://t.me/nodetraders) community on Telegram where we discuss trading ideas, provide support regarding SDKs and share valuable resources!

- [KuCoin Documentation](https://docs.kucoin.com/futures/#introduction) - official Kucoin API docs

- [Node.js & JavaScript SDK for Kucoin](https://github.com/tiagosiebler/kucoin-api) - Github repo of our SDK

Current file contains only certain most used examples. If you can't find what you need, you can search [FuturesClient.ts](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts) - all of the endpoints and functions will be there! Otherwise, just ask in [Node.js Traders](https://t.me/nodetraders) Telegram group.

Do you need help with Spot? Check out [Spot Quickstart guide](https://github.com/tiagosiebler/kucoin-api/blob/master/examples/Kucoin%20SPOT%20Examples%20NodeJS.md)

**Table of contents:**

- [Installation](#installation)
- [Usage](#usage)
- [REST API](#rest-api)

  - [Account and balance](#account-examples)
  - [Subaccount API management](#subaccount-api-management)
  - [Market Data](#market-data)
    - [Symbol and exchange info](#symbol-and-exchange-info)
    - [Order Book data](#order-book-data)
    - [Public Trades and Index data](#public-trades-and-index-data)
    - [Funding Fees](#funding-fees)
    - [Kline/Candles](#klinecandles)
  - [Transfer funds in and out of Futures Account](#transfer-funds-in-and-out-of-futures-account)
  - [Trade Execution](#trade)
    - [General info](#general-info)
    - [Market short](#market-short)
    - [Market long](#market-long)
    - [Limit short](#limit-short)
    - [Limit long](#limit-long)
    - [Market close](#market-close)
    - [Limit close](#limit-close)
    - [Stop loss](#stop-loss)
    - [Place multiple orders](#place-multiple-orders)
    - [Cancel order](#cancel-order)
    - [Cancel all orders for specific symbol](#cancel-all-orders-for-specific-symbol)
  - [Trade/Order/Positions Management](#tradeorderpositions-management)
    - [Fetching orders](#fetching-orders)
    - [Fills](#fills)
    - [Positions](#positions)

- [WebSocket](#websocket)
- [Community group](#community-group)

## Installation:

```js
// Install by npm
npm install kucoin-api


// Install by yarn
yarn add kucoin-api
```

## Usage

```js
// require
const { FuturesClient } = require('kucoin-api');

// import
import { FuturesClient } from 'kucoin-api';

// initialise Futures Client
const futuresClient = new FuturesClient({
  // insert your api key, secret and passphrase - use env vars, if not just fill the string values
  apiKey: process.env.KUCOIN_API_KEY || 'insert-your-api-key',
  apiSecret: process.env.KUCOIN_API_SECRET || 'insert-your-api-secret',
  apiPassphrase:
    process.env.KUCOIN_API_PASSPHRASE || 'insert-your-api-passphrase',
});
```

## REST API

### Account examples

#### Get Account Overview

```js
// Get Account Balance - XBT or USDT, default XBT
futuresClient.getBalance({ currency: 'XBT' });

// Get All Subaccount Accounts Balance
futuresClient.getSubBalances({ currency: 'XBT' });
```

#### Get Transaction History

```js
futuresClient.getTransactions({
  type: 'RealisedPNL', // 'RealisedPNL' | 'Deposit' | 'Withdrawal' | 'Transferin' | 'TransferOut'
  maxCount: 10,
  currency: 'USDT',
});
```

### Subaccount API management

```js
// Get all subaccount APIs

futuresClient.getSubAPIs({
  subName: 'my_sub_name',
});

// Create Futures APIs for Sub-Account

futuresClient.createSubAPI({
  subName: 'my_sub_name',
  passphrase: 'my_passphrase',
  remark: 'my_remark',
});

// Modify Sub-Account Futures APIs

futuresClient.updateSubAPI({
  subName: 'my_sub_name',
  passphrase: 'my_passphrase',
  apiKey: 'my_api_key',
});

// Delete Sub-Account Futures APIs

futuresClient.deleteSubAPI({
  subName: 'my_sub_name',
  passphrase: 'my_passphrase',
  apiKey: 'my_api_key',
});
```

### Market Data

#### Symbol and exchange info

```js
// Get All Contract List
futuresClient.getSymbols();

// Get Order Info of the Contract
futuresClient.getSymbol({ symbol: 'XBTUSDTM' });

// Get Ticker
futuresClient.getTicker({ symbol: 'XBTUSDTM' });
```

#### Order Book data

```js
// Get Full Order Book - Level 2
futuresClient.getFullOrderBookLevel2({ symbol: 'XBTUSDTM' });

// Get Level2 depth20
futuresClient.getPartOrderBookLevel2Depth20({ symbol: 'XBTUSDTM' });

// Get Level2 depth100
futuresClient.getPartOrderBookLevel2Depth100({ symbol: 'XBTUSDTM' });
```

#### Public Trades and Index data

```js
// Get Public Trades
futuresClient.getMarketTrades({ symbol: 'XBTUSDTM' });

// Get Interest Rate List
futuresClient.getInterestRates({ symbol: '.XBTINT' });

// Get Index List
futuresClient.getIndex({ symbol: '.KXBT' });

// Get Current Mark Price
futuresClient.getMarkPrice({ symbol: 'XBTUSDM' });

// Get Premium Index
futuresClient.getPremiumIndex({ symbol: '.XBTUSDMPI' });

// Get 24hour futures transaction volume
futuresClient.get24HourTransactionVolume();
```

#### Funding Fees

```js
// Get Current Funding Rate
futuresClient.getFundingRate({ symbol: 'XBTUSDM' });

// Get Public Funding History
futuresClient.getFundingRates({
  symbol: 'XBTUSDTM',
  from: '1700310700000',
  to: '1702310700000',
});

// Get Private Funding History
futuresClient.getFundingHistory({ symbol: 'ETHUSDTM' });
```

#### Kline/Candles

```js
futuresClient.getKlines({
  symbol: 'XBTUSDTM',
  granularity: 60,
  from: new Date().getTime() - 24 * 60 * 60 * 1000, // 24 hours ago
  to: new Date().getTime(),
});
```

### Transfer funds in and out of Futures Account

```js
// Transfer out of the Futures to main acc

futuresClient.submitTransferOut({
  amount: 0.01,
  currency: 'USDT',
  recAccountType: 'MAIN',
});

// Transfer to Futures Account

futuresClient.submitTransferIn({
  amount: 0.01,
  currency: 'USDT',
  payAccountType: 'MAIN',
});

// Get All Transfers

futuresClient.futureTransfers({
  status: 'SUCCESS', // optional, 'PROCESSING' | 'SUCCESS' | 'FAILURE';
  currency: 'USDT', // optional
  startAt: 1723550000, // optional
  endAt: 1723557472, // optional
  currentPage: 1, // optional
  pageSize: 100, // optional
});
```

---

### Trade

#### General info

Futures are contracts, not currencies. In the futures symbols list you will see a "multiplier" field for each of the symbols. Each contract is equal to Multiplier x Size.

For example click on this endpoint and get a symbol info for XRPUSDTM: https://api-futures.kucoin.com/api/v1/contracts/XRPUSDTM

In the object, find the "multiplier" value.

```js
// In your code, you can fetch it like this
const symbolInfo = await client.getSymbol({ symbol: 'XRPUSDTM' });
const multiplier = symbolInfo.data.multiplier;
```

E.g. if multiplier is 10(what you can see from the endpoint), that means each SIZE is 10 XRP. So if XRP is currently at $0.5, then each 1 contract (size 10) is going to cost $5.00

size = (Funds x leverage) / (price x multiplier)

```js
const XRPPriceExample = 0.5;
const leverage = 5;
const fundsToTradeUSDT = 100;

const costOfContract = XRPPriceExample * multiplier;

const size = (fundsToTradeUSDT * leverage) / costOfContract;
console.log(`Size: ${size}`);
```

The trade amount indicates the amount of contract to buy or sell, and contract uses the base currency or lot as the trading unit.
The trade amount must be no less than 1 lot for the contract and no larger than the maxOrderQty.
It should be a multiple number of the lot, or the system will report an error when you place the order.
E.g. 1 lot of XBTUSDTM is 0.001 Bitcoin, while 1 lot of XBTUSDM is 1 USD.
or check the XRPUSDTM example above.
Here are function examples using the Futures Create Order endpoint:

#### Market Short

```js
// A MARKET SHORT of 2 contracts of XBT using leverage of 5:
const marketShort = futureTransfers.submitOrder({
  clientOid: '123456789',
  leverage: '5',
  side: 'sell',
  size: 2,
  symbol: 'XBTUSDTM',
  timeInForce: 'GTC',
  type: 'market',
});
```

#### Market Long

```js
// A MARKET LONG of 2 contracts of XBT using leverage of 5:
const marketLong = futureTransfers.submitOrder({
  clientOid: '123456789',
  leverage: '5',
  side: 'buy',
  size: 2,
  symbol: 'XBTUSDTM',
  timeInForce: 'GTC',
  type: 'market',
});
```

#### Limit Short

```js
// A LIMIT SHORT of 2 contracts of XBT using leverage of 5:
const limitShort = futureTransfers.submitOrder({
  clientOid: '123456789',
  leverage: '5',
  price: '70300.31',
  side: 'sell',
  size: 2,
  symbol: 'XBTUSDTM',
  timeInForce: 'GTC',
  type: 'limit',
});
```

#### Limit Long

```js
// A LIMIT LONG of 2 contracts of XBT using leverage of 5:
const limitLong = futureTransfers.submitOrder({
  clientOid: '123456789',
  leverage: '5',
  price: '40300.31',
  side: 'buy',
  size: 2,
  symbol: 'XBTUSDTM',
  timeInForce: 'GTC',
  type: 'limit',
});
```

On any "close position" action, if you specify a SIZE=0 or leave off the SIZE parameter,
then it will close the whole position, regardless of the size.
If you specify a SIZE, it will close only the number of contracts you specify.

If closeOrder is set to TRUE,
the system will close the position and the position size will become 0.
Side, Size and Leverage fields can be left empty and the system will determine the side and size automatically.

#### Market close

```js
// A MARKET CLOSE POSITION example:
const marketClose = futureTransfers.submitOrder({
  clientOid: '123456789',
  closeOrder: true,
  symbol: 'XBTUSDTM',
  timeInForce: 'GTC',
  type: 'market',
  side: 'sell',
  size: 0,
});
```

#### Limit close

```js
// A LIMIT CLOSE of a LONG example:
const limitCloseLong = futureTransfers.submitOrder({
  clientOid: '123456789',
  leverage: '5',
  price: '70300.31',
  closeOrder: true,
  side: 'sell',
  size: 2,
  symbol: 'XBTUSDTM',
  timeInForce: 'GTC',
  type: 'limit',
});

// A LIMIT CLOSE of a SHORT example:
const limitCloseShort = futureTransfers.submitOrder({
  clientOid: '123456789',
  leverage: '5',
  price: '40300.31',
  closeOrder: true,
  side: 'buy',
  size: 2,
  symbol: 'XBTUSDTM',
  timeInForce: 'GTC',
  type: 'limit',
});
```

#### Stop loss

```js
// A STOP LOSS example for a LONG position:
const stopLossLong = futureTransfers.submitOrder({
  clientOid: '123456789',
  closeOrder: true,
  stop: 'down',
  stopPrice: '40200.31',
  stopPriceType: 'TP',
  symbol: 'XBTUSDTM',
  timeInForce: 'GTC',
  type: 'market',
});

// A STOP LOSS example for a SHORT position:
const stopLossShort = futureTransfers.submitOrder({
  clientOid: '123456789',
  closeOrder: true,
  stop: 'up',
  stopPrice: '40200.31',
  stopPriceType: 'TP',
  symbol: 'XBTUSDTM',
  timeInForce: 'GTC',
  type: 'market',
});
```

##### Place Multiple Orders

```js
//request

const orders = [
  {
    clientOid: '5c52e11203aa677f33e491',
    side: 'buy',
    symbol: 'ETHUSDTM',
    type: 'limit',
    price: '2150',
    leverage: '1',
    size: 2,
  },
  {
    clientOid: 'je12019ka012ja013099',
    side: 'buy',
    symbol: 'XBTUSDTM',
    type: 'limit',
    price: '32150',
    leverage: '1',
    size: 2,
  },
];

futuresClient.submitMultipleOrders(orders);
```

#### Cancel Order

```js
futuresClient.cancelOrderById({ orderId: 'orderId' });
futuresClient.cancelOrderByClientOid({ clientOid: 'clientOid' });
```

#### Cancel all orders for specific symbol

```js
futuresClient.cancelAllOrders({ symbol: 'XBTUSDTM' });

futuresClient.cancelAllStopOrders({ symbol: 'XBTUSDTM' });
```

### Trade/Order/Positions Management

#### Fetching orders

```js
// Get open orders
futuresClient.getOrders({ status: 'active' });

// Get closed orders
futuresClient.getOrders({ status: 'done' });

// Get Untriggered Stop Orders
futuresClient.getStopOrders({ type: 'limit' });

// Get List of Orders Completed in 24h
futuresClient.getRecentOrders();

// Get Details of a Single Order by ClientOrderId
futuresClient.getOrderByClientOrderId({ clientOid: 'clientOid' });
// Or By OrderId
futuresClient.getOrderByOrderId({ orderId: 'orderId' });
```

#### Fills

```js
// Get Specific Fills
futuresClient.getFills({ type: 'market' });
// or search for all
futuresClient.getFills({});

// Recent Fills from last 24 hours
futuresClient.futuresRecentFills({ symbol: 'ETHUSDTM' });
// Or Search All
futuresClient.futuresRecentFills({});

// Active Order Value Calculation
futuresClient.getOpenOrderStatistics({ symbol: 'ETHUSDTM' });
```

#### Positions

```js
// Get Position Details
futuresClient.getPosition({ symbol: 'ETHUSDTM' });

// Get Position List
futuresClient.getPositions({ currency: 'USDT' });
// Or Search All
futuresClient.getPositions();

// Get History Positions
futuresClient.getHistoryPositions({ symbol: 'ETHUSDTM' });
```

---

## Websocket

For Websocket examples, please refer to these links:

- [Spot Public Websocket](https://github.com/tiagosiebler/kucoin-api/blob/master/examples/ws-spot-public.ts)
- [Spot Private Websocket](https://github.com/tiagosiebler/kucoin-api/blob/master/examples/ws-spot-private.ts)
- [Futures Public Websocket](https://github.com/tiagosiebler/kucoin-api/blob/master/examples/ws-futures-public.ts)
- [Futures Private Websocket](https://github.com/tiagosiebler/kucoin-api/blob/master/examples/ws-futures-private.ts)

## Community group

If you need help, something is wrong/missing or you have suggestions, please join our [Node.js Traders](https://t.me/nodetraders) community group on Telegram and let us know!
