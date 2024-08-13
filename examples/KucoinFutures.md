# KuCoin Futures examples

# Node.js & JavaScript SDK for Kucoin Futures REST APIs & WebSockets

[KuCoin Documentation](https://docs.kucoin.com/futures/#introduction)

- [Node.js & JavaScript SDK for Kucoin](https://github.com/tiagosiebler/kucoin-api)
  - [Installation:](#installation)
  - [Usage](#usage)
  - [REST API](#rest-api)
    - [User](#user)
    - [Transfer](#transfer)
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

---

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

#### Orders

Futures are contracts, not currencies. In the futures symbols list you will see a "multiplier" field for each of the symbols. Each contract is equal to Multiplier x Size.

For example click on this endpoint and get a symbol info for XRPUSDTM: https://api-futures.kucoin.com/api/v1/contracts/XRPUSDTM

In the object, find the "multiplier" value.

```js
const symbolInfo = await client.getSymbol({ symbol: 'XRPUSDTM' });
const multiplier = symbolInfo.data.multiplier;
```

E.g. if multiplier is 10(what you can see from the endpoint), that means each SIZE is 10 XRP. So if XRP is currently at $0.5, then each 1 contract (size 10) is going to cost $5.00 size = (Funds x leverage) / (price x multiplier)

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
```

#### Limit close

```js
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

#### Stop loss for long

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
```

#### Stop loss for short

```js
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

#### Cancel Order

```js
futuresClient.cancelOrderById({ orderId: 'orderId' });
futuresClient.cancelOrderByClientOid({ clientOid: 'clientOid' });
```

#### Cancel All Orders(open, stop, limit, ) for specific symbol

```js
futuresClient.cancelAllOrders({ symbol: 'XBTUSDTM' });

futuresClient.cancelAllStopOrders({ symbol: 'XBTUSDTM' });
```

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
