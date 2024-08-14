# **KuCoin SPOT API Examples** - Node.js, JavaScript & Typescript SDK for Kucoin REST APIs & WebSockets

<p align="center">
  <a href="https://www.npmjs.com/package/kucoin-api">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/tiagosiebler/kucoin-api/blob/master/docs/images/logoDarkMode2.svg?raw=true#gh-dark-mode-only">
      <img alt="SDK Logo" src="https://github.com/tiagosiebler/kucoin-api/blob/master/docs/images/logoBrightMode2.svg?raw=true#gh-light-mode-only">
    </picture>
  </a>
</p>

This document provides comprehensive examples for using the KuCoin SPOT API with Node.js and JavaScript. It covers various functionalities including account management, fund transfers, trade execution, order management, and market data retrieval. The examples are designed to help developers quickly integrate KuCoin Spot API into their NodeJS, Javascript and Typscript applications.

If you are here, it means you will be great addition to our [Node.js Traders](https://t.me/nodetraders) community on Telegram where we discuss trading ideas, provide support regarding SDKs and share valuable resources!

- [KuCoin Documentation](https://docs.kucoin.com/futures/#introduction) - official Kucoin API docs

- [Node.js & JavaScript SDK for Kucoin](https://github.com/tiagosiebler/kucoin-api) - Github repo of our SDK

Current file contains only certain most used examples. If you can't find what you need, you can search [SpotClient.ts](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts) - all of the endpoints and functions will be there! Otherwise, just ask in [Node.js Traders](https://t.me/nodetraders) Telegram group.

Do you need help with Futures? Check out [Futures Quickstart guide](https://github.com/tiagosiebler/kucoin-api/blob/master/examples/Kucoin%20FUTURES%20Examples%20NodeJS.md)

**Table of contents:**

- [Installation](#installation)
- [Usage](#usage)
- [REST API](#rest-api)

  - [Account and balance](#account-examples)

    - [Account overview](#account-overview)
    - [Transactions](#transactions)
    - [Deposit and Withdrawal](#deposit-and-withdrawal)

  - [Subaccount](#subaccount)
    - [Subaccount management](#subaccount-management)
    - [Subaccount API management](#subaccount-api-management)
  - [Market Data](#market-data)
    - [Symbol and exchange info](#symbol-and-exchange-info)
    - [Order Book data](#order-book-data)
    - [Kline/Candles](#klinecandles)
  - [Trade Execution](#trade)
    - [General info](#general-info)
    - [Market short](#market-short)
    - [Market long](#market-long)
    - [Limit short](#limit-short)
    - [Limit long](#limit-long)
    - [Place multiple orders](#place-multiple-orders)
  - [Trade/Order/Positions Management](#tradeorderpositions-management)
    - [Fetching orders](#fetching-orders)
    - [Cancel order](#cancel-order)
    - [Cancel all orders for specific symbol](#cancel-all-orders-for-specific-symbol)
    - [Fills](#fills)
  - [Spot HF trade](#spot-hf-trade)
  - [Margin trade](#margin-trade--margin-hf-trade)

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
const { SpotClient } = require('kucoin-api');

// import
import { SpotClient } from 'kucoin-api';

// initialise Spot Client
const spotClient = new SpotClient({
  // insert your api key, secret and passphrase - use env vars, if not just fill the string values
  apiKey: process.env.KUCOIN_API_KEY || 'insert-your-api-key',
  apiSecret: process.env.KUCOIN_API_SECRET || 'insert-your-api-secret',
  apiPassphrase:
    process.env.KUCOIN_API_PASSPHRASE || 'insert-your-api-passphrase',
});
```

## REST API

### Account examples

#### Account Overview

```js
// Get Account Summary
spotClient.getAccountSummary();

// Get all Account Balances
spotClient.getBalances();

// Get specific Account or Currency Balance
spotClient.getBalance({
  currency: 'USDT',
  type: 'main', // 'trade' | 'margin' | 'trade_hf'
});

// Example call to get account details by ID
spotClient.getAccountDetails({ accountId: '5bd6e9286d99522a52e458de' });

// Margin endpoints for balances
spotClient.getMarginBalances();
spotClient.getMarginBalance();
spotClient.getIsolatedMarginBalance();
```

#### Transactions

```js
// Example call to get account ledgers with specified parameters
spotClient.getTransactions({ currency: 'BTC', startAt: 1601395200000 });

// Example call to get high-frequency account ledgers with specified parameters
spotClient.getHFTransactions({
  bizType: 'TRADE_EXCHANGE',
  currency: 'YOP,DAI',
  startAt: 1601395200000,
});

// Example call to get high-frequency margin account ledgers with specified parameters
spotClient.getHFMarginTransactions({
  bizType: 'MARGIN_EXCHANGE',
  currency: 'YOP,DAI',
  startAt: 1601395200000,
});
```

#### Deposit and Withdrawal

```js
// Example call to create a deposit address
spotClient.createDepositAddress({
  currency: 'BTC',
  // Optional parameter
  chain: 'BTC',
});

// Example call to get deposit addresses with specified parameters
spotClient.getDepositAddressesV2({
  currency: 'BTC',
});

// Example call to get deposits
spotClient.getDeposits();

// Example call to get withdrawals with specified parameters
spotClient.getWithdrawals({
  currency: 'BTC', // Optional parameter
});

// Example call to submit a withdrawal
spotClient.submitWithdraw({
  currency: 'BTC',
  address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
  amount: 0.01,
  // Optional parameters
  memo: 'exampleMemo',
  chain: 'BTC',
});

// Example call to cancel a withdrawal by ID
spotClient.cancelWithdrawal({
  withdrawalId: '5bffb63303aa675e8bbe18f9',
});
```

### Subaccount

#### Subaccount Management

```js
// Get all subaccounts
spotClient.getSubAccountsV2({});

// Example call to create a sub-account
spotClient.createSubAccount({
  // Fill in the required parameters for creating a sub-account
  subName: 'exampleSubAccount',
  password: 'examplePassword',
  access: 'trade',
});

// Example call to get sub-account balance with specified parameters
spotClient.getSubAccountBalance({
  subUserId: '5caefba7d9575a0688f83c45',
  includeBaseAmount: false,
});

// Example call to get sub-account balances
spotClient.getSubAccountBalancesV2();

// Example call to get transferable funds
spotClient.getTransferable({
  currency: 'BTC',
  type: 'MAIN',
});

// Example call to submit a transfer from master to sub-account
spotClient.submitTransferMasterSub({
  clientOid: client.generateNewOrderID(), // or use your custom UUID
  amount: 0.01,
  currency: 'USDT',
  direction: 'OUT', // 'IN' for transfer to master, 'OUT' for transfer to sub
  subUserId: 'enter_sub_user_id_here',
});

// Example call to submit an inner transfer within same account
spotClient.submitInnerTransfer({
  clientOid: client.generateNewOrderID(), // or use your custom UUID
  amount: 0.01,
  currency: 'USDT',
  from: 'main', // Source account type
  to: 'trade', // Destination account type
});
```

#### Subaccount API management

```js
// Get all subaccount APIs

spotClient.getSubAPIs({
  subName: 'my_sub_name',
});

// Create Futures APIs for Sub-Account

spotClient.createSubAPI({
  subName: 'my_sub_name',
  passphrase: 'my_passphrase',
  remark: 'my_remark',
});

// Modify Sub-Account Futures APIs

spotClient.updateSubAPI({
  subName: 'my_sub_name',
  passphrase: 'my_passphrase',
  apiKey: 'my_api_key',
});

// Delete Sub-Account Futures APIs

spotClient.deleteSubAPI({
  subName: 'my_sub_name',
  passphrase: 'my_passphrase',
  apiKey: 'my_api_key',
});
```

### Market Data

#### Symbol and exchange info

```js
// Get All Currencies List
spotClient.getCurrencies();

// Get info for a specific currency
spotClient.getCurrency({
  currency: 'BTC',
});

// Get all Symbols
spotClient.getSymbols();

// Example call to get ticker information for a specific symbol
spotClient.getTicker({
  symbol: 'BTC-USDT',
});

// All tickers
spotClient.getTickers();

// Get 24h stats for a specific symbol
spotClient.get24hrStats({
  symbol: 'BTC-USDT',
});
```

#### Order Book data

```js
// get partial orderbook
spotClient.getOrderBookLevel20({ symbol: 'BTC-USDT' });

// get partial orderbook
spotClient.getOrderBookLevel100({ symbol: 'BTC-USDT' });

// get full orderbook
spotClient.getFullOrderBook({ symbol: 'BTC-USDT' });
```

#### Kline/Candles

```js
// Example call to get Klines (candlestick data) with specified parameters
spotClient.getKlines({
  type: '1min',
  symbol: 'BTC-USDT',
  startAt: 1566703297,
  endAt: 1566789757,
});
```

---

### Trade

#### General info

Please, read official [Kucoin API docs](https://www.kucoin.com/docs/rest/spot-trading/orders/place-order) to understand how to place orders, cancel orders, etc. and what is needed for each endpoint. These are just low-end examples to understand how to use it with SDK.

#### Market Short

```js
// Market short order
const marketShort = spotClient.submitOrder({
  clientOid: client.generateNewOrderID(), // or use your custom UUID
  side: 'sell',
  symbol: 'ETH-BTC',
  type: 'market',
  size: '0.5', // Specify the quantity to sell
});
```

#### Market Long

```js
// Market long order
const marketLong = spotClient.submitOrder({
  clientOid: client.generateNewOrderID(), // or use your custom UUID
  side: 'buy',
  symbol: 'ETH-BTC',
  type: 'market',
  size: '0.5', // Specify the quantity to buy
});
```

#### Limit Short

```js
// Limit short order
const limitShort = spotClient.submitOrder({
  clientOid: client.generateNewOrderID(), // or use your custom UUID
  side: 'sell',
  symbol: 'ETH-BTC',
  type: 'limit',
  price: '0.03', // Specify the price to sell
  size: '0.5', // Specify the quantity to sell
  timeInForce: 'GTC', // Good Till Canceled
});
```

#### Limit Long

```js
// Limit long order
const limitLong = spotClient.submitOrder({
  clientOid: client.generateNewOrderID(), // or use your custom UUID
  side: 'buy',
  symbol: 'ETH-BTC',
  type: 'limit',
  price: '0.03', // Specify the price to buy
  size: '0.5', // Specify the quantity to buy
  timeInForce: 'GTC', // Good Till Canceled
});
```

##### Place Multiple Orders

```js
//request

const multipleOrders = [
  {
    clientOid: '3d07008668054da6b3cb12e432c2b13a',
    side: 'buy',
    type: 'limit',
    price: '0.01',
    size: '0.01',
  },
  {
    clientOid: '37245dbe6e134b5c97732bfb36cd4a9d',
    side: 'buy',
    type: 'limit',
    price: '0.01',
    size: '0.01',
  },
];

spotClient.submitMultipleOrders({
  symbol: 'KCS-USDT',
  orderList: multipleOrders,
});
```

### Trade/Order/Positions Management

#### Fetching orders

```js
// Get open orders
spotClient.getOrders({ status: 'active' });

// Get closed orders
spotClient.getOrders({ status: 'done' });

// Get List of Orders Completed in 24h
spotClient.getRecentOrders();

// Get Details of a Single Order by ClientOrderId
spotClient.getOrderByClientOid({ clientOid: 'clientOid' });
// Or By OrderId
spotClient.getOrderByOrderId({ orderId: 'orderId' });
```

#### Cancel Order

```js
spotClient.cancelOrderById({ orderId: 'orderId' });
spotClient.cancelOrderByClientOid({ clientOid: 'clientOid' });
```

#### Cancel all orders for specific symbol

```js
//cancel all orders for symbol
spotClient.cancelAllOrders({ symbol: 'XBTUSDTM' });

// cancel all orders for all symbols
spotClient.cancelAllOrders();
```

#### Fills

```js
// Get Specific Fills
spotClient.getFills({ type: 'market' });
// or search for all
spotClient.getFills();

// Recent Fills from last 24 hours
spotClient.getRecentFills();
```

### Spot HF trade

All of the examples are 99% same as regular spot, but you can follow the [official HF Trade API documentation](https://www.kucoin.com/docs/rest/spot-trading/spot-hf-trade-pro-account/place-hf-order) and list of functions in [SpotClient.ts](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts) to find what you need!

### Margin trade & Margin HF trade

All of the examples are 99% same as regular spot, but you can follow the [official Margin Trade API documentation](https://www.kucoin.com/docs/rest/margin-trading/market-data) and list of functions in [SpotClient.ts](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts) to find what you need!

---

## Websocket

For Websocket examples, please refer to these links:

- [Spot Public Websocket](https://github.com/tiagosiebler/kucoin-api/blob/master/examples/ws-spot-public.ts)
- [Spot Private Websocket](https://github.com/tiagosiebler/kucoin-api/blob/master/examples/ws-spot-private.ts)
- [Futures Public Websocket](https://github.com/tiagosiebler/kucoin-api/blob/master/examples/ws-futures-public.ts)
- [Futures Private Websocket](https://github.com/tiagosiebler/kucoin-api/blob/master/examples/ws-futures-private.ts)

## Community group

If you need help, something is wrong/missing or you have suggestions, please join our [Node.js Traders](https://t.me/nodetraders) community group on Telegram and let us know!
