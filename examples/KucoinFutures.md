# KuCoin Futures examples

# Node.js & JavaScript SDK for Kucoin Futures REST APIs & WebSockets

[KuCoin Documentation](https://docs.kucoin.com/futures/#introduction)

- [Node.js & JavaScript SDK for Kucoin](https://github.com/tiagosiebler/kucoin-api)
  - [Installation:](#installation)
  - [Usage](#usage)
  - [REST API](#rest-api)
    - [User](#user)
      - [Get Account Overview](#get-account-overview)
      - [Get Transaction History](#get-transaction-history)
      - [Get Sub-Account Futures API List](#get-sub-account-futures-api-list)
      - [Create Futures APIs for Sub-Account](#create-futures-apis-for-sub-account)
      - [Modify Sub-Account Futures APIs](#modify-sub-account-futures-apis)
      - [Delete Sub-Account Futures APIs](#delete-sub-account-futures-apis)
    - [Transfer](#transfer)
      - [Transfer to Main or TRADE Account](#transfer-to-main-or-trade-account)
      - [Transfer to Futures Account](#transfer-to-futures-account)
      - [Get Transfer-Out Request Records](#get-transfer-out-request-records)
    - [Trade](#trade)
      - [Orders](#orders)
        - [Place Order Test](#place-order-test)
        - [Place Multiple Orders](#place-multiple-orders)
      - [Fills](#fills)
      - [Positions](#positions)
      - [Risk Limit Level](#risk-limit-level)
      - [Funding Fees](#funding-fees)
    - [Market Data](#market-data)
      - [Get Open Contract List](#get-open-contract-list)
      - [Get Order Info of the Contract](#get-order-info-of-the-contract)
      - [Get Ticker](#get-ticker)
      - [Get Full Order Book - Level 2](#get-full-order-book---level-2)
      - [Get Part Order Book - Level 2](#get-part-order-book---level-2)
      - [Transaction History](#transaction-history)
      - [Index](#index)
      - [Server Time](#server-time)
      - [Server Status](#server-status)
      - [Get K Line Data of Contract](#get-k-line-data-of-contract)
      - [Get 24hour futures transaction volume](#get-24hour-futures-transaction-volume)
  - [WebSocket](#websocket)
    - [Public Channels](#public-channels)
    - [Private Channels](#private-channels)
  - [License](#license)

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

//Create Futures APIs for Sub-Account

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

---

### Transfer funds in and out of Futures Account

```js
// transfer to Main or TRADE Account

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

#### Orders

```js
// Place an Order
// symbol, price, size, leverage = 1,  clientOid = uuidV4(), optional

// Buy Limit Order
futuresClient.futuresBuy(
  {
    symbol: 'ETHUSDTM',
    price: 10000,
    leverage: 5,
    size: 1,
    // clientOid: uuidV4(),
  },
  console.log,
);

// Buy Market Order
futuresClient.futuresBuy(
  {
    symbol: 'ETHUSDTM',
    leverage: 5,
    size: 1,
    // clientOid: uuidV4(),
  },
  console.log,
);

// Buy Stop Order
futuresClient.futuresBuy(
  {
    symbol: 'ETHUSDTM',
    price: 10000,
    leverage: 5,
    size: 1,
    // clientOid: uuidV4(),
    optional: {
      stop: 'up',
      stopPriceType: 'TP',
      stopPrice: '10000',
      // ...
    },
  },
  console.log,
);

// Sell Order
// futuresClient.futuresBuy -> futuresClient.futuresSell
futuresClient.futuresSell(
  {
    symbol: 'ETHUSDTM',
    price: 20000,
    leverage: 5,
    size: 1,
    // clientOid: uuidV4(),
  },
  console.log,
);

// Cancel an Order
futuresClient.futuresCancel('orderId', console.log);

// Cancel All Order for Symbol
// limit order
futuresClient.futuresCancelAllOpenOrders('ETHUSDTM', console.log);
// stop order
futuresClient.futuresCancelAllStopOrders('ETHUSDTM', console.log);
// or cancelAll limit/stop order for symbol
futuresClient.futuresCancelAll('ETHUSDTM', console.log);

// Cancel Order by clientOid
futuresClient.futuresCancelOrderByClientOid(
  {
    symbol: '[symbol]',
    clientOid: '[clientOid]',
  },
  console.log,
);

// Get Order List
futuresClient.futuresOpenOrders({ status: 'active' }, console.log);

// Get Untriggered Stop Order List
futuresClient.futuresStopOrders({ type: 'limit' }, console.log);

// Get List of Orders Completed in 24h
futuresClient.futuresRecentDoneOrders('ETHUSDTM', console.log);
// Or Search All
futuresClient.futuresRecentDoneOrders('', console.log);

// Get Details of a Single Order
futuresClient.futuresOrderDetail({ clientOid: 'clientOid' }, console.log);
// Or By OrderId
futuresClient.futuresOrderDetail('orderId', console.log);
```

##### Place Order Test

> Place Order Test, After placing an order, the order will not enter the matching system, and the order cannot be queried.

```js
// Place Order Test
// symbol, price, size, leverage = 1,  clientOid = uuidV4(), optional

// Buy Limit Order
futuresClient.futuresBuyTest(
  {
    symbol: 'ETHUSDTM',
    price: 10000,
    leverage: 5,
    size: 1,
    // clientOid: uuidV4(),
  },
  console.log,
);

// Buy Market Order
futuresClient.futuresBuyTest(
  {
    symbol: 'ETHUSDTM',
    leverage: 5,
    size: 1,
    // clientOid: uuidV4(),
  },
  console.log,
);

// Buy Stop Order
futuresClient.futuresBuyTest(
  {
    symbol: 'ETHUSDTM',
    price: 10000,
    leverage: 5,
    size: 1,
    // clientOid: uuidV4(),
    optional: {
      stop: 'up',
      stopPriceType: 'TP',
      stopPrice: '10000',
      // ...
    },
  },
  console.log,
);

// Sell Order
// futuresClient.futuresBuyTest -> futuresClient.futuresSellTest
futuresClient.futuresSellTest(
  {
    symbol: 'ETHUSDTM',
    price: 20000,
    leverage: 5,
    size: 1,
    // clientOid: uuidV4(),
  },
  console.log,
);
```

##### Place Multiple Orders

```js
//request
[
  {
	  "clientOid":"5c52e11203aa677f33e491",
	  "side":"buy",
	  "symbol":"ETHUSDTM",
	  "type":"limit",
	  "price":"2150",
	  "size":"2"
  },
  {
	  "clientOid":"5c52e11203aa677f33e492",
	  "side":"buy",
	  "symbol":"XBTUSDTM",
	  "type":"limit",
	  "price":"32150",
	  "size":"2"
  }
]

//Response
[
  {
	  "orderId":"80465574458560512",
	  "clientOid":"5c52e11203aa677f33e491",
	  "symbol":"ETHUSDTM",
	  "code":"200000",
	  "msg":"success"
  },
  {
	  "orderId":"80465575289094144",
	  "clientOid":"5c52e11203aa677f33e492",
	  "symbol":"ETHUSDTM",
	  "code":"200000",
	  "msg":"success"
  }
]

futuresClient.futuresOrderMulti([...], console.log);
```

#### Fills

```js
// Get Fills
futuresClient.futuresFills({ pageSize: 100 }, console.log);

// Recent Fills
futuresClient.futuresRecentFills('ETHUSDTM', console.log);
// Or Search All
futuresClient.futuresRecentFills('', console.log);

// Active Order Value Calculation
futuresClient.futuresMarginOpenOrders('ETHUSDTM', console.log);
```

#### Positions

```js
// Get Position Details
futuresClient.futuresPositionDetail('ETHUSDTM', console.log);

// Get Position List
futuresClient.futuresPositions('USDT', console.log);
// Or Search All
futuresClient.futuresPositions('', console.log);

// Enable of Auto-Deposit Margin
futuresClient.futuresPositionAutoDeposit(
  { symbol: 'ETHUSDTM', status: true },
  console.log,
);
// Disable of Auto-Deposit Margin
futuresClient.futuresPositionAutoDeposit(
  { symbol: 'ETHUSDTM', status: false },
  console.log,
);

// Add Margin Manually
// bizNo default uuidV4()
futuresClient.futuresPositionMargin(
  {
    symbol: 'ETHUSDTM',
    margin: 0.01,
    // bizNo: uuidV4(),
  },
  console.log,
);
```

#### Risk Limit Level

```js
// Obtain Futures Risk Limit Level
futuresClient.futuresRiskLimit('ETHUSDTM', console.log);

// Adjust Risk Limit Level
futuresClient.futuresChangeRiskLimit(
  { symbol: 'ETHUSDTM', level: 2 },
  console.log,
);
```

#### Funding Fees

```js
// Get Current Funding Rate
futuresClient.futuresFundingRate('XBTUSDM', console.log);

// Get Public Funding History
futuresClient.futuresFundingRates(
  {
    symbol: 'XBTUSDTM',
    from: '1700310700000',
    to: '1702310700000',
  },
  console.log,
);

// Get Private Funding History
futuresClient.futuresFundingHistory({ symbol: 'ETHUSDTM' }, console.log);
```

---

### Market Data

#### Get Open Contract List

```js
futuresClient.futuresContractsActive(console.log);
```

#### Get Order Info of the Contract

```js
futuresClient.futuresContractDetail('XBTUSDTM', console.log);
```

#### Get Ticker

```js
futuresClient.futuresTicker('XBTUSDTM', console.log);
```

#### Get Full Order Book - Level 2

```js
futuresClient.futuresLevel2('XBTUSDTM', console.log);
```

#### Get Part Order Book - Level 2

```js
// Get Level2 depth20
futuresClient.futuresLevel2Depth20('XBTUSDTM', console.log);

// Get Level2 depth100
futuresClient.futuresLevel2Depth100('XBTUSDTM', console.log);
```

#### Transaction History

```js
futuresClient.futuresTradeHistory('XBTUSDTM', console.log);
```

#### Index

```js
// Get Interest Rate List
futuresClient.futuresInterests({ symbol: '.XBTINT' }, console.log);

// Get Index List
futuresClient.futuresIndexList({ symbol: '.KXBT' }, console.log);

// Get Current Mark Price
futuresClient.futuresMarkPrice('XBTUSDM', console.log);

// Get Premium Index
futuresClient.futuresPremiums({ symbol: '.XBTUSDMPI' }, console.log);
```

#### Server Time

```js
futuresClient.futuresTimestamp(console.log);
```

#### Server Status

```js
futuresClient.futuresStatus(console.log);
```

#### Get K Line Data of Contract

```js
futuresClient.futuresKline(
  {
    symbol: 'XBTUSDTM',
    granularity: 480,
    from: new Date().getTime() - 24 * 60 * 60 * 1000,
    to: new Date().getTime(),
  },
  console.log,
);
```

#### Get 24hour futures transaction volume

```js
// need auth
futuresClient.futuresTradeStatistics(console.log);
```

---

## WebSocket

- Socket implements 59s heartbeat, disconnection retry mechanism
- When calling the provided websocket.x method, the system will create a corresponding socket connection channel based on public or private, and only one connection will be created for each type
- Parameters pass symbols, support passing arrays, and push symbol messages in the arrays
- When the parameter is an array, the length of the array will be automatically cut according to the length of 90

> All methods that pass symbols support array format
> The first parameter is symbol and the second parameter is callback. When the parameter does not exist, the first parameter is callback

### Public Channels

```js
//
// Get Real-Time Symbol Ticker v2
futuresClient.websocket.tickerV2(['ETHUSDTM', 'XBTUSDTM'], console.log);
// Or
futuresClient.websocket.tickerV2('ETHUSDTM', console.log);

// Get Real-Time Symbol Ticker
futuresClient.websocket.ticker(['ETHUSDTM', 'XBTUSDTM']);

// Level 2 Market Data
futuresClient.websocket.level2(['ETHUSDTM', 'XBTUSDTM']);

// Execution data
futuresClient.websocket.execution(['ETHUSDTM', 'XBTUSDTM']);

// Message channel for the 5 best ask/bid full data of Level 2
futuresClient.websocket.level2Depth5(['ETHUSDTM', 'XBTUSDTM']);

// Message channel for the 50 best ask/bid full data of Level 2
futuresClient.websocket.level2Depth50(['ETHUSDTM', 'XBTUSDTM']);

// Contract Market Data
// subject --> "mark.index.price" return Mark Price & Index Price
// subject --> "funding.rate" return Funding Rate
futuresClient.websocket.instrument(['ETHUSDTM', 'XBTUSDTM']);

// Funding Fee Settlement
// subject -->  "funding.begin" return Start Funding Fee Settlement
// subject -->  "funding.end" return End Funding Fee Settlement
futuresClient.websocket.announcement(console.log);

// Transaction Statistics Timer Event
futuresClient.websocket.snapshot(['ETHUSDTM', 'XBTUSDTM']);
```

### Private Channels

```js
// Trade Orders - According To The Market
futuresClient.websocket.tradeOrders(['ETHUSDTM', 'XBTUSDTM'], console.log);
// Or
futuresClient.websocket.tradeOrders(console.log);

// Stop Order Lifecycle Event
futuresClient.websocket.advancedOrders(console.log);

// Account Balance Events
// subject --> "orderMargin.change" return Order Margin Event
// subject --> "availableBalance.change" return Available Balance Event
// subject --> "withdrawHold.change" return Withdrawal Amount & Transfer-Out Amount Event
futuresClient.websocket.wallet(console.log);

// Position Change Events
// subject --> "position.change" return Position Changes Caused Operations
// Position Changes Caused Operations
// -- “marginChange”: margin change;
// -- “positionChange”: position change;
// -- “liquidation”: liquidation;
// -- “autoAppendMarginStatusChange”: auto-deposit-status change;
// -- “adl”: adl;
// Position Changes Caused by Mark Price
// subject --> "position.settlement" return Funding Settlement
futuresClient.websocket.position(['ETHUSDTM', 'XBTUSDTM']);
```

## License

[MIT](LICENSE)
