# **KuCoin Unified Trading Account (PRO) API Examples** - Node.js, JavaScript & TypeScript SDK for KuCoin REST APIs & WebSockets

<p align="center">
  <a href="https://www.npmjs.com/package/kucoin-api">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/tiagosiebler/kucoin-api/blob/master/docs/images/logoDarkMode2.svg?raw=true#gh-dark-mode-only">
      <img alt="SDK Logo" src="https://github.com/tiagosiebler/kucoin-api/blob/master/docs/images/logoBrightMode2.svg?raw=true#gh-light-mode-only">
    </picture>
  </a>
</p>

This document provides comprehensive examples for using the KuCoin **Unified Trading Account (UTA / PRO)** API with Node.js and JavaScript. The Unified API gives a single set of endpoints for market data and trading across Spot, Futures, and Margin. The examples are designed to help developers quickly integrate the KuCoin Unified (PRO) API into their Node.js, JavaScript and TypeScript applications.

If you are here, it means you will be great addition to our [Node.js Traders](https://t.me/nodetraders) community on Telegram where we discuss trading ideas, provide support regarding SDKs and share valuable resources!

- [KuCoin Documentation](https://www.kucoin.com/docs) - official KuCoin API docs (Unified Trading Account)

- [Node.js & JavaScript SDK for KuCoin](https://github.com/tiagosiebler/kucoin-api) - Github repo of our SDK

Current file contains only certain most used examples. If you can't find what you need, you can search through [UnifiedAPIClient.ts](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts) - all of the endpoints and functions will be there! Otherwise, just ask in [Node.js Traders](https://t.me/nodetraders) Telegram group.

Do you need help with Spot or Futures only? Check out [Spot Quickstart guide](https://github.com/tiagosiebler/kucoin-api/blob/master/examples/kucoin-SPOT-examples-nodejs.md) and [Futures Quickstart guide](https://github.com/tiagosiebler/kucoin-api/blob/master/examples/kucoin-FUTURES-examples-nodejs.md).

**Table of contents:**

- [Installation](#installation)
- [Usage](#usage)
- [REST API](#rest-api)

  - [Market Data](#market-data)
    - [Announcements and service status](#announcements-and-service-status)
    - [Symbol and exchange info](#symbol-and-exchange-info)
    - [Order Book, Trades, Klines](#order-book-trades-klines)
    - [Funding rate and cross margin config](#funding-rate-and-cross-margin-config)
  - [Account](#account)
    - [Unified and Classic account balance](#unified-and-classic-account-balance)
    - [Sub-account and transfers](#sub-account-and-transfers)
    - [Account mode, fee rate, ledger, deposit](#account-mode-fee-rate-ledger-deposit)
  - [Orders](#orders)
    - [Place order (Unified vs Classic)](#place-order-unified-vs-classic)
    - [Batch place, order details, open list, history](#batch-place-order-details-open-list-history)
    - [Cancel order, batch cancel, DCP](#cancel-order-batch-cancel-dcp)
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

#### Create API credentials

- [KuCoin API Key Management](https://www.kucoin.com/account/api)

#### Import SDK to your project

```js
// require
const { UnifiedAPIClient } = require('kucoin-api');

// import
import { UnifiedAPIClient } from 'kucoin-api';

// initialise Unified (PRO) Client
const unifiedClient = new UnifiedAPIClient({
  // insert your api key, secret and passphrase - use env vars, if not just fill the string values
  apiKey: process.env.KUCOIN_API_KEY || 'insert-your-api-key',
  apiSecret: process.env.KUCOIN_API_SECRET || 'insert-your-api-secret',
  apiPassphrase:
    process.env.KUCOIN_API_PASSPHRASE || 'insert-your-api-passphrase',
});
```

## REST API

### Market Data

All market data endpoints are **public** (no auth required for the client, but the client is typically created with credentials for private calls in the same app).

#### Announcements and service status

```js
// Get Announcements (optional filters)
unifiedClient.getAnnouncements({
  language: 'en_US',
  type: 'latest-announcements',
  pageNumber: 1,
  pageSize: 10,
});

// Get Service Status
unifiedClient.getServiceStatus({ tradeType: 'SPOT' });
unifiedClient.getServiceStatus({ tradeType: 'FUTURES' });
```

#### Symbol and exchange info

```js
// Get Currency (single or all)
unifiedClient.getCurrency({ currency: 'BTC' });
unifiedClient.getCurrency();

// Get Symbol list - tradeType is required
unifiedClient.getSymbols({ tradeType: 'SPOT' });
unifiedClient.getSymbols({ tradeType: 'FUTURES' });
unifiedClient.getSymbols({ tradeType: 'SPOT', symbol: 'BTC-USDT' });
unifiedClient.getSymbols({ tradeType: 'FUTURES', symbol: 'XBTUSDTM' });

// Get Tickers
unifiedClient.getTickers({ tradeType: 'SPOT' });
unifiedClient.getTickers({ tradeType: 'FUTURES', symbol: 'XBTUSDTM' });
```

#### Order Book, Trades, Klines

```js
// Get Trades (latest 100 public trades)
unifiedClient.getTrades({ tradeType: 'SPOT', symbol: 'BTC-USDT' });
unifiedClient.getTrades({ tradeType: 'FUTURES', symbol: 'XBTUSDTM' });

// Get Order Book
unifiedClient.getOrderBook({
  tradeType: 'SPOT',
  symbol: 'BTC-USDT',
  limit: '20', // '20' | '50' | '100' | 'FULL'
});
unifiedClient.getOrderBook({
  tradeType: 'FUTURES',
  symbol: 'XBTUSDTM',
  limit: '100',
  rpiFilter: 0, // 0: noneRPI, 1: noneRPI + RPI (Futures only)
});

// Get Klines
unifiedClient.getKlines({
  tradeType: 'SPOT',
  symbol: 'BTC-USDT',
  interval: '1hour',
  startAt: Date.now() - 24 * 60 * 60 * 1000,
  endAt: Date.now(),
});
unifiedClient.getKlines({
  tradeType: 'FUTURES',
  symbol: 'XBTUSDTM',
  interval: '15min',
  startAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
  endAt: Date.now(),
});
```

#### Funding rate and cross margin config

```js
// Get Current Funding Rate (Futures)
unifiedClient.getCurrentFundingRate({ symbol: 'XBTUSDTM' });

// Get History Funding Rate
unifiedClient.getHistoryFundingRate({
  symbol: 'XBTUSDTM',
  startAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
  endAt: Date.now(),
});

// Get Cross Margin Config (Spot cross margin)
unifiedClient.getCrossMarginConfig();
```

### Account

#### Unified and Classic account balance

```js
// Get Unified Account (UTA) balance
unifiedClient.getAccount();

// Get Unified Account overview
unifiedClient.getAccountOverview();

// Get Classic Account balance (FUNDING, SPOT, FUTURES, CROSS, ISOLATED)
unifiedClient.getClassicAccount({ accountType: 'SPOT' });
unifiedClient.getClassicAccount({ accountType: 'FUTURES', currency: 'USDT,XBT' });
unifiedClient.getClassicAccount({
  accountType: 'ISOLATED',
  accountSubtype: 'BTC-USDT',
});
```

#### Sub-account and transfers

```js
// Get Sub Account
unifiedClient.getSubAccount({ pageSize: 20 });
unifiedClient.getSubAccount({ UID: '123,456' });

// Get Transfer Quotas (transferable balance)
unifiedClient.getTransferQuotas({
  currency: 'USDT',
  accountType: 'UNIFIED',
});
unifiedClient.getTransferQuotas({
  currency: 'USDT',
  accountType: 'SPOT',
});
unifiedClient.getTransferQuotas({
  currency: 'USDT',
  accountType: 'ISOLATED',
  symbol: 'BTC-USDT',
});

// Flex Transfer (internal, parent-sub, sub-parent, sub-sub)
unifiedClient.flexTransfer({
  clientOid: 'your-unique-client-order-id',
  currency: 'USDT',
  amount: '100',
  type: '0', // 0=INTERNAL, 1=PARENT_TO_SUB, 2=SUB_TO_PARENT, 3=SUB_TO_SUB
  fromAccountType: 'SPOT',
  toAccountType: 'FUTURES',
});
// For SUB transfers include fromUid / toUid
unifiedClient.flexTransfer({
  clientOid: 'unique-oid',
  currency: 'USDT',
  amount: '50',
  type: '1',
  fromAccountType: 'UNIFIED',
  toAccountType: 'UNIFIED',
  toUid: 'sub_account_uid',
});

// Set Sub Account Transfer Permission (sub-to-sub)
unifiedClient.setSubAccountTransferPermission({
  subUids: '123,456',
  subToSub: true,
});
```

#### Account mode, fee rate, ledger, deposit

```js
// Get / Set Account Mode (CLASSIC vs UNIFIED)
unifiedClient.getAccountMode();
unifiedClient.setAccountMode({ accountType: 'UNIFIED' });

// Get Fee Rate (Spot: up to 10 symbols; Futures: 1 symbol)
unifiedClient.getFeeRate({ tradeType: 'SPOT', symbol: 'BTC-USDT,ETH-USDT' });
unifiedClient.getFeeRate({ tradeType: 'FUTURES', symbol: 'XBTUSDTM' });

// Get Account Ledger (transfers, trades, etc.)
unifiedClient.getAccountLedger({
  accountType: 'UNIFIED',
  currency: 'USDT',
  direction: 'IN',
  pageSize: 100,
  startAt: Date.now() - 24 * 60 * 60 * 1000,
  endAt: Date.now(),
});

// Get Interest History (UTA only)
unifiedClient.getInterestHistory({
  accountType: 'UNIFIED',
  currency: 'USDT',
  startTime: Date.now() - 7 * 24 * 60 * 60 * 1000,
  endTime: Date.now(),
  size: 50,
});

// Modify Leverage (Unified Futures)
unifiedClient.modifyLeverage({ symbol: 'XBTUSDTM', leverage: '5' });

// Get Deposit Address
unifiedClient.getDepositAddress({ currency: 'BTC' });
unifiedClient.getDepositAddress({ currency: 'BTC', chain: 'BTC' });
```

### Orders

#### Place order (Unified vs Classic)

Unified mode: use `accountMode: 'unified'` (default). For unified, `tradeType` is not sent in the request (the client omits it).  
Classic mode: use `accountMode: 'classic'` and pass `tradeType` in the request (Spot/Futures/Isolated/Cross).

```js
// Unified mode - Spot limit order (default accountMode is 'unified')
// tradeType can be omitted in request for unified; if provided it is not sent
unifiedClient.placeOrder(
  {
    tradeType: 'SPOT',
    clientOid: 'my-client-oid-' + Date.now(),
    symbol: 'BTC-USDT',
    side: 'BUY',
    orderType: 'LIMIT',
    size: '0.001',
    sizeUnit: 'BASECCY',
    price: '40000',
    timeInForce: 'GTC',
  },
  'unified',
);

// Unified mode - Spot market order
unifiedClient.placeOrder(
  {
    tradeType: 'SPOT',
    clientOid: 'my-market-' + Date.now(),
    symbol: 'BTC-USDT',
    side: 'BUY',
    orderType: 'MARKET',
    size: '50',
    sizeUnit: 'QUOTECCY',
    timeInForce: 'GTC',
  },
  'unified',
);

// Unified mode - Futures limit order
unifiedClient.placeOrder(
  {
    tradeType: 'FUTURES',
    clientOid: 'futures-' + Date.now(),
    symbol: 'XBTUSDTM',
    side: 'BUY',
    orderType: 'LIMIT',
    size: '1',
    sizeUnit: 'UNIT',
    price: '95000',
    timeInForce: 'GTC',
    reduceOnly: false,
  },
  'unified',
);

// Classic mode - Spot (tradeType in request, sent as query by client)
unifiedClient.placeOrder(
  {
    tradeType: 'SPOT',
    clientOid: 'classic-spot-' + Date.now(),
    symbol: 'BTC-USDT',
    side: 'BUY',
    orderType: 'LIMIT',
    size: '0.001',
    sizeUnit: 'BASECCY',
    price: '40000',
    timeInForce: 'GTC',
  },
  'classic',
);

// Classic mode - Futures
unifiedClient.placeOrder(
  {
    tradeType: 'FUTURES',
    clientOid: 'classic-futures-' + Date.now(),
    symbol: 'XBTUSDTM',
    side: 'SELL',
    orderType: 'MARKET',
    size: '1',
    sizeUnit: 'UNIT',
    timeInForce: 'GTC',
    reduceOnly: true,
  },
  'classic',
);
```

#### Batch place, order details, open list, history

```js
// Batch Place Order (Classic only by default; orderList per type)
unifiedClient.batchPlaceOrder(
  {
    tradeType: 'SPOT',
    orderList: [
      {
        clientOid: 'batch-1',
        symbol: 'BTC-USDT',
        side: 'BUY',
        orderType: 'LIMIT',
        size: '0.001',
        sizeUnit: 'BASECCY',
        price: '39000',
        timeInForce: 'GTC',
      },
      {
        clientOid: 'batch-2',
        symbol: 'BTC-USDT',
        side: 'BUY',
        orderType: 'LIMIT',
        size: '0.001',
        sizeUnit: 'BASECCY',
        price: '38500',
        timeInForce: 'GTC',
      },
    ],
  },
  'classic',
);

// Get Order Details (unified or classic)
unifiedClient.getOrderDetails(
  { tradeType: 'SPOT', symbol: 'BTC-USDT', orderId: 'order-id-here' },
  'classic',
);
unifiedClient.getOrderDetails(
  { tradeType: 'FUTURES', symbol: 'XBTUSDTM', clientOid: 'my-client-oid' },
  'unified',
);

// Get Open Order List
unifiedClient.getOpenOrderList(
  { tradeType: 'SPOT', symbol: 'BTC-USDT', pageSize: 50 },
  'unified',
);
unifiedClient.getOpenOrderList(
  { tradeType: 'FUTURES', symbol: 'XBTUSDTM', orderFilter: 'NORMAL' },
  'unified',
);

// Get Order History
unifiedClient.getOrderHistory(
  {
    tradeType: 'FUTURES',
    symbol: 'XBTUSDTM',
    startAt: Date.now() - 24 * 60 * 60 * 1000,
    endAt: Date.now(),
    pageSize: 100,
  },
  'unified',
);

// Get Trade History (executions)
unifiedClient.getTradeHistory(
  {
    tradeType: 'SPOT',
    symbol: 'BTC-USDT',
    startAt: Date.now() - 24 * 60 * 60 * 1000,
    endAt: Date.now(),
    pageSize: 50,
  },
  'unified',
);
```

#### Cancel order, batch cancel, DCP

```js
// Cancel Order
unifiedClient.cancelOrder(
  { tradeType: 'FUTURES', symbol: 'XBTUSDTM', orderId: 'order-id' },
  'unified',
);
unifiedClient.cancelOrder(
  { tradeType: 'SPOT', symbol: 'BTC-USDT', clientOid: 'client-oid' },
  'unified',
);

// Batch Cancel Orders (max 20)
unifiedClient.batchCancelOrders(
  {
    tradeType: 'FUTURES',
    cancelOrderList: [
      { symbol: 'XBTUSDTM', orderId: 'id1' },
      { symbol: 'XBTUSDTM', clientOid: 'oid2' },
    ],
  },
  'unified',
);

// DCP (Disconnection Protect / Deadman Switch) - Classic only
unifiedClient.setDCP({
  tradeType: 'FUTURES',
  timeout: 300, // 5–86400 seconds, or -1 to unset
  symbols: ['XBTUSDTM'],
});
unifiedClient.getDCP({ tradeType: 'FUTURES' });
```

### Positions

Unified position endpoints apply to the Unified account (Futures positions).

```js
// Get Position List (all open positions or filter by symbol)
unifiedClient.getPositionList();
unifiedClient.getPositionList({ symbol: 'XBTUSDTM' });

// Get Positions History (up to 3 months, max 7 days per query)
unifiedClient.getPositionsHistory({
  symbol: 'XBTUSDTM',
  startAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
  endAt: Date.now(),
  pageSize: 50,
});

// Get Account Position Tiers (risk limit) - Classic Futures isolated
unifiedClient.getAccountPositionTiers(
  { symbol: 'XBTUSDTM', tradeType: 'FUTURES', marginMode: 'ISOLATED' },
  'classic',
);
```

## Websocket

For WebSocket examples that work with the unified (PRO) API, please refer to:

- [Spot Public Websocket](https://github.com/tiagosiebler/kucoin-api/blob/master/examples/WebSockets/ws-public-spot-pro-v2.ts) (PRO v2)
- [Futures Public Websocket](https://github.com/tiagosiebler/kucoin-api/blob/master/examples/WebSockets/ws-public-futures-pro-v2.ts) (PRO v2)
- [Private WebSocket (PRO v2)](https://github.com/tiagosiebler/kucoin-api/blob/master/examples/WebSockets/ws-private-pro-v2.ts)

## Community group

If you need help, something is wrong/missing or you have suggestions, please join our [Node.js Traders](https://t.me/nodetraders) community group on Telegram and let us know!
