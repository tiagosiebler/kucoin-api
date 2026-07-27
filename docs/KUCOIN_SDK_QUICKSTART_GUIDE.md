<!-- siebly:metadata
siebly:
  version: 1
  hero:
    headline: KuCoin API JavaScript Tutorial for Node.js
    badges:
      - KuCoin API
      - Spot
      - Margin
      - Futures
      - Classic WebSocket
      - WebSocket API
      - EU and AU
    summary: Build KuCoin integrations with Classic REST API clients, public and private WebSockets, safe order tests, WebSocket API commands, regional routing, and proxy support.
    codeFilename: first-kucoin-api-call.js
    codeStatus: public REST API
    startSectionId: start-building-first-calls
  software:
    description: Node.js and JavaScript SDK for the KuCoin Spot, Margin, Futures, Broker, and developing Unified REST APIs, Classic and Pro WebSockets, WebSocket API commands, regional routing, proxy support, and reconnect recovery.
    topics:
      - KuCoin REST API
      - Spot API
      - Margin API
      - Futures API
      - Broker API
      - Unified Account API
      - Classic WebSockets
      - Pro WebSockets
      - WebSocket API
      - EU and AU routing
      - HTTP and SOCKS proxies
      - Reconnect recovery
  machineCatalog:
    label: KuCoin API JavaScript Tutorial
    topics:
      - REST API response envelopes
      - Spot and Futures products
      - public WebSockets
      - private WebSockets
      - REST API order tests
      - WebSocket API commands
      - regional routing
      - HTTP and SOCKS proxies
      - reconnect recovery
  sdkPagePromo:
    descriptionBeforePackage: 'A practical JavaScript guide to using '
    descriptionAfterPackage: ' across the KuCoin REST API, Classic WebSockets, safe Spot and Futures order tests, WebSocket API commands, regions, proxies, and reconnect recovery.'
    highlights:
      - Spot, Margin, and Futures REST API coverage
      - Public and private Classic WebSocket channels
      - Safe Spot and Futures test-order examples
      - REST API and WebSocket proxy examples
    exampleHref: /examples/KuCoin
    exampleLabel: KuCoin SDK examples
    architectureClientSummary: SpotClient, FuturesClient, WebsocketClient, WebsocketAPIClient
    architectureApiTitle: KuCoin API
    architectureApiSummary: REST API, Classic streams, Pro streams, WebSocket API
  surfaceMap:
    heading: Choose the KuCoin client for the job
    summary: Use the focused Classic clients first, then evaluate newer surfaces only when they match the account and deployment.
    appLabel: Bot, dashboard, worker, tool
    appSummary: Any Node.js or JavaScript-compatible service that needs KuCoin market data, account state, order management, or reconciliation.
    apiLabel: KuCoin API
    apiItems:
      - Spot and Margin REST API calls
      - Futures REST API calls
      - Public and private WebSocket streams
      - WebSocket API order commands
      - Broker and developing Unified endpoints
    packageNodes:
      - label: SpotClient
        summary: Classic Spot, Margin, funding, transfer, Earn, and Convert REST API calls
      - label: FuturesClient
        summary: Classic Futures market, account, order, position, and funding REST API calls
      - label: WebsocketClient
        summary: Classic and Pro public and private WebSocket subscriptions
      - label: WebsocketAPIClient
        summary: Awaitable Spot, Margin, and Futures order commands
      - label: BrokerClient
        summary: Broker subaccount, transfer, deposit, withdrawal, and rebate calls
      - label: UnifiedAPIClient
        summary: Developing Unified Account REST API surface
  routing:
    id: kucoin-request-routing
    eyebrow: Request routing
    heading: Product, account, contract, connection, and region are separate choices
    summary: Keep these values explicit so each request reaches the intended KuCoin API surface and account.
    rows:
      - eyebrow: Spot symbol
        code: "symbol: 'BTC-USDT'"
        summary: Select a Spot or Margin trading pair.
      - eyebrow: Futures contract
        code: "symbol: 'XBTUSDTM'"
        summary: Select the exact Futures contract and its sizing rules.
      - eyebrow: Account type
        code: "type: 'trade'"
        summary: Select the account used by a balance or transfer request.
      - eyebrow: Client order ID
        code: "clientOid"
        summary: Give an application-owned order a stable identifier.
      - eyebrow: WebSocket connection
        code: "WS_KEY_MAP.spotPublicV1"
        summary: Route a subscription or command to the correct connection.
      - eyebrow: API region
        code: "apiRegion: 'EU'"
        summary: Route supported REST API calls and token-based streams for the account region.
  coverage:
    heading: What to get right in a KuCoin integration
    summary: Start with Classic public data, then add credentials, private state, safe order tests, network configuration, and recovery.
    cards:
      - heading: REST API clients and response envelopes
        summary: Choose SpotClient or FuturesClient, then read successful endpoint data from response.data.
      - heading: Public and private Classic streams
        summary: Subscribe through WebsocketClient and select the correct product connection with WS_KEY_MAP.
      - heading: Safe tests and live commands
        summary: Use REST API order-test methods first and guard the live WebSocket API example behind an explicit opt-in.
      - heading: Regions, proxies, and recovery
        summary: Keep account region and network path explicit, then reload private state after stream gaps.
  snippets:
    heading: First REST API calls, streams, order tests, and WebSocket API commands
    summary: Run one focused JavaScript example at a time, then add recovery and production controls around the same clients.
    labels:
      public-rest: Public REST API
      private-rest: Private REST API
      public-websocket: Public WebSocket
      private-websocket: Private WebSocket
      spot-order-test: Spot order test
      futures-order-test: Futures order test
      spot-ws-api-order: Spot WebSocket API
      unified-rest-evaluation: Unified REST API evaluation
      pro-websocket-evaluation: Pro WebSocket evaluation
  workflows:
    heading: REST API, WebSocket stream, and WebSocket API workflows
    summary: REST API results, stream updates, and WebSocket API command responses carry different information.
    diagrams:
      - heading: REST API request flow
        summary: Choose the product client and region, then let the SDK sign private requests and return KuCoin's response envelope.
        steps:
          - label: Choose client and region
            owner: app
          - label: Call an SDK method
            owner: app
          - label: Route and sign
            owner: sdk
          - label: Receive code and data
            owner: exchange
          - label: Use endpoint data
            owner: app
      - heading: Classic WebSocket subscription flow
        summary: Choose a topic and wsKey, let the SDK obtain a connection token, then process acknowledgements and updates.
        steps:
          - label: Choose topic and wsKey
            owner: app
          - label: Call subscribe
            owner: app
          - label: Obtain token and connect
            owner: sdk
          - label: Receive welcome and acknowledgement
            owner: event
          - label: Process update events
            owner: app
      - heading: WebSocket API command flow
        summary: Await the command response, then confirm final order state through a private stream or REST API query.
        steps:
          - label: Guard the live action
            owner: app
          - label: Await order command
            owner: app
          - label: Match request and response
            owner: sdk
          - label: Inspect code and data
            owner: app
          - label: Confirm final order state
            owner: app
  production:
    heading: Before a KuCoin integration trades unattended
    summary: Credentials, response handling, product sizing, acknowledgements, reconnect recovery, region, and network behavior must all be predictable.
    items:
      - Keep API keys server-side and grant only the permissions each process needs.
      - Keep symbol, account type, position mode, wsKey, and apiRegion explicit in order code and logs.
      - Set clientOid on application-owned orders so retries and restarts can reconcile them.
      - Read successful endpoint data from data and preserve KuCoin error details when a request fails.
      - Treat a WebSocket API response as a command result, then confirm final order state.
      - Reload balances, positions, open orders, and fills after a private stream gap.
      - Keep the system clock synchronized and respect current KuCoin rate limits.
      - Monitor proxy reachability, latency, and egress IP when a proxy is enabled.
  journeys:
    eyebrow: Choose your path
    heading: Jump to the KuCoin workflow you are building
    actionLabel: Open section
    cards:
      - heading: Start with REST API calls
        summary: Make public market calls, add credentials, then inspect balances and order state.
        href: "#start-building-first-calls"
      - heading: Stream live data
        summary: Subscribe to public and private Classic Spot and Futures channels.
        href: "#websocket-streams"
      - heading: Send WebSocket commands
        summary: Use WebsocketAPIClient for promise-based Spot, Margin, and Futures order commands.
        href: "#websocket-api"
      - heading: Configure networking
        summary: Select the account region, then add an HTTP or SOCKS proxy agent when required.
        href: "#api-regions"
  article:
    heading: Build around KuCoin products and account state
    summary: "This tutorial covers the KuCoin API pieces developers usually need first: Classic REST API calls, public and private streams, safe order tests, WebSocket API commands, regional routing, proxies, and reconnect recovery."
  related:
    cards:
      - heading: KuCoin SDK page
        summary: Return to installation, examples, endpoint maps, and package links.
        href: /sdk/kucoin/javascript
      - heading: KuCoin examples
        summary: Browse runnable REST API and WebSocket examples.
        href: /examples/KuCoin
      - heading: Endpoint map
        summary: Find the SDK method for each supported KuCoin endpoint.
        href: https://github.com/tiagosiebler/kucoin-api/blob/master/docs/endpointFunctionList.md
      - heading: Source repository
        summary: Browse SDK source, releases, issues, and endpoint coverage on GitHub.
        href: https://github.com/tiagosiebler/kucoin-api
-->

# KuCoin API JavaScript Tutorial for Node.js

<!-- siebly:website-omit:start -->

> [!TIP]
> Read this guide in tutorial format on the Siebly website: [KuCoin JavaScript REST API and WebSocket Tutorial](https://siebly.io/sdk/kucoin/javascript/tutorial)

<!-- siebly:website-omit:end -->

This tutorial uses [`kucoin-api`](https://www.npmjs.com/package/kucoin-api), Siebly's Node.js and JavaScript SDK for KuCoin. It covers Classic Spot and Futures REST API calls, public and private WebSockets, safe order tests, WebSocket API commands, regional routing, and proxies.

The SDK handles private request signing, connection-token requests, product-specific WebSocket routing, heartbeats, reconnects, resubscriptions, and WebSocket API response matching.

**Key links**

- KuCoin JavaScript SDK by Siebly: [`kucoin-api`](https://siebly.io/sdk/kucoin/javascript)
- npm package: [`kucoin-api`](https://www.npmjs.com/package/kucoin-api)
- GitHub repository: [`tiagosiebler/kucoin-api`](https://github.com/tiagosiebler/kucoin-api)
- SDK examples: [KuCoin SDK examples](https://siebly.io/examples/KuCoin)
- SDK endpoint map: [KuCoin JavaScript endpoint reference](./endpointFunctionList.md)
- Official API documentation: [KuCoin API](https://www.kucoin.com/docs-new/)
- API authentication: [KuCoin authentication](https://www.kucoin.com/docs-new/authentication)
- API rate limits: [KuCoin rate limits](https://www.kucoin.com/docs-new/rate-limit)
- Trading-system terms: [Siebly glossary](https://siebly.io/reference/glossary)
- More JavaScript SDKs: [Siebly.io](https://siebly.io)

## Why use `kucoin-api`?

Private KuCoin REST API requests require an API key, timestamp, HMAC signature, encrypted API passphrase, and API key version. Classic WebSocket connections use connection tokens, while subscriptions and WebSocket API commands must reach the correct product connection.

`kucoin-api` handles those mechanics and provides a focused client for each job:

| Client               | Use it for                                                                |
| -------------------- | ------------------------------------------------------------------------- |
| `SpotClient`         | Classic Spot, Margin, funding, transfer, Earn, and Convert REST API calls |
| `FuturesClient`      | Classic Futures market, account, order, position, and funding REST API    |
| `WebsocketClient`    | Classic and Pro public and private WebSocket subscriptions                |
| `WebsocketAPIClient` | Promise-based Spot, Margin, and Futures order commands over WebSocket     |
| `BrokerClient`       | Broker subaccounts, transfers, deposits, withdrawals, and rebates         |
| `UnifiedAPIClient`   | Developing Unified Account REST API endpoints                             |

Start with the Classic clients unless the developing Unified Account or Pro API is specifically required.

## Install the SDK

```bash
npm install kucoin-api
```

Every example below is JavaScript and imports directly from `kucoin-api`.

## Create KuCoin API keys

Public market data does not require credentials. Private REST API calls, private streams, REST API order tests, and WebSocket API commands require an API key, secret, and API passphrase.

Create and manage keys from the [KuCoin API management page](https://www.kucoin.com/account/api). Save all three values when creating the key:

- `KUCOIN_API_KEY`
- `KUCOIN_API_SECRET`
- `KUCOIN_API_PASSPHRASE`

The API passphrase is the value chosen when creating the API key. It is not the KuCoin account password.

Grant only the permissions the application needs:

| Permission | Typical use                                               |
| ---------- | --------------------------------------------------------- |
| General    | Read account, order, and ledger information               |
| Spot       | Place, modify, and cancel Spot orders                     |
| Margin     | Place and manage Margin orders                            |
| Futures    | Place orders and manage Futures positions                 |
| Earn       | Subscribe to and redeem eligible Earn products            |
| Withdrawal | Create and manage withdrawals; requires an IP restriction |

Use a General-only key while building account views and recovery logic. Add Spot or Futures permission only when testing order placement. Nothing in this tutorial requires Withdrawal permission.

Keep API keys in a server-side secret manager or deployment environment. Never put them in browser code or log them.

## KuCoin products and request vocabulary

Several fields determine which product, account, and connection a request uses:

| Field or value                   | Example                                  | Meaning                                                                                   |
| -------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------- |
| Spot symbol                      | `BTC-USDT`                               | Hyphen-separated Spot or Margin trading pair                                              |
| Futures symbol                   | `XBTUSDTM`                               | Exact Futures contract identifier                                                         |
| Successful REST API response     | `{ code: '200000', data: endpointData }` | KuCoin response envelope; endpoint data is under `data`                                   |
| Spot account type                | `trade`                                  | Trading account used by most current Spot users                                           |
| Client order ID                  | `clientOid`                              | Application-owned [custom order ID](https://siebly.io/reference/glossary#custom-order-id) |
| Futures `size`                   | `1`                                      | Number of contracts or lots, not an amount of BTC or USDT                                 |
| Futures `multiplier`             | Contract metadata                        | Underlying amount represented by one contract                                             |
| Futures `lotSize` and `tickSize` | Contract metadata                        | Valid size and price increments                                                           |
| Position mode                    | `0` or `1`                               | One-way mode or hedge mode                                                                |
| WebSocket key                    | `WS_KEY_MAP.spotPublicV1`                | [WebSocket key](https://siebly.io/reference/glossary#ws-key) selecting a connection       |
| API region                       | `global`, `EU`, or `AU`                  | Account region used for supported routing                                                 |

KuCoin's current preferred Spot order methods contain `HF`, such as `submitHFOrder()` and `getHFActiveOrdersPaginated()`. These map to the current high-frequency Spot API paths. New users normally keep their trading account type as `trade`; `trade_hf` is a compatibility case for some older accounts.

<!-- siebly:section id="start-building-first-calls" -->

## Start building: first calls and streams

Run each example on its own. Begin with public data, then add credentials, private state, safe order tests, and live streams.

### 1. Make public REST API calls

Public calls need no API key. Every successful KuCoin REST API response contains `code` and `data`.

<!-- siebly:snippet id="public-rest" -->

```javascript
import { SpotClient } from 'kucoin-api';

const client = new SpotClient();

async function main() {
  try {
    const response = await client.getServerTime();
    console.log('Server time:', response.data);
  } catch (error) {
    console.error('Server time request failed:', error);
  }

  try {
    const response = await client.getSymbol({
      symbol: 'BTC-USDT',
    });
    console.log('BTC-USDT metadata:', response.data);
  } catch (error) {
    console.error('Symbol request failed:', error);
  }

  try {
    const response = await client.getTicker({
      symbol: 'BTC-USDT',
    });
    console.log('BTC-USDT ticker:', response.data);
  } catch (error) {
    console.error('Ticker request failed:', error);
  }

  try {
    const response = await client.getOrderBookLevel20({
      symbol: 'BTC-USDT',
    });
    console.log('Best bid:', response.data.bids[0]);
    console.log('Best ask:', response.data.asks[0]);
  } catch (error) {
    console.error('Order book request failed:', error);
  }

  try {
    const response = await client.getKlines({
      symbol: 'BTC-USDT',
      type: '1hour',
    });
    console.log('Latest candle:', response.data[0]);
  } catch (error) {
    console.error('Candles request failed:', error);
  }
}

main();
```

Server time is a number. Symbol, ticker, and order-book data are objects. Candles are arrays of tuples. A Spot candle contains:

```text
[
  startTime,
  open,
  close,
  high,
  low,
  volume,
  turnover
]
```

Prices and quantities are commonly strings. Keep them as strings when passing values back to KuCoin, and convert them deliberately when performing calculations.

### 2. Make private REST API calls

Private methods use the same client with credentials. The SDK signs each request and returns KuCoin's response envelope.

<!-- siebly:snippet id="private-rest" -->

```javascript
import { SpotClient } from 'kucoin-api';

const client = new SpotClient({
  apiKey: process.env.KUCOIN_API_KEY,
  apiSecret: process.env.KUCOIN_API_SECRET,
  apiPassphrase: process.env.KUCOIN_API_PASSPHRASE,
});

async function main() {
  if (
    !process.env.KUCOIN_API_KEY ||
    !process.env.KUCOIN_API_SECRET ||
    !process.env.KUCOIN_API_PASSPHRASE
  ) {
    console.error(
      'Set KUCOIN_API_KEY, KUCOIN_API_SECRET, and KUCOIN_API_PASSPHRASE.',
    );
    return;
  }

  try {
    const response = await client.getBalances({
      type: 'trade',
    });
    console.log('Spot trading balances:', response.data);
  } catch (error) {
    console.error('Balance request failed:', error);
  }

  try {
    const response = await client.getHFActiveOrdersPaginated({
      symbol: 'BTC-USDT',
      pageNum: 1,
      pageSize: 20,
    });
    console.log('Open BTC-USDT orders:', response.data.items);
  } catch (error) {
    console.error('Open-order request failed:', error);
  }

  try {
    const response = await client.getHFFilledOrders({
      symbol: 'BTC-USDT',
      limit: 20,
    });
    console.log('Recent BTC-USDT fills:', response.data.items);
  } catch (error) {
    console.error('Fill-history request failed:', error);
  }
}

main();
```

The client throws when KuCoin returns a non-success business code. Parsed errors include the HTTP status, response body, response headers, and request context without exposing the API key, secret, or passphrase.

### 3. Subscribe to public Classic WebSocket streams

Classic WebSocket subscriptions use a topic and an explicit `wsKey`. The SDK requests the required connection token, opens the correct connection, keeps it alive, and resubscribes after a reconnect.

<!-- siebly:snippet id="public-websocket" -->

```javascript
import { WebsocketClient, WS_KEY_MAP } from 'kucoin-api';

const ws = new WebsocketClient();

ws.on('open', ({ wsKey }) => {
  console.log('WebSocket opened:', wsKey);
});

ws.on('response', (response) => {
  console.log('WebSocket response:', response.wsKey, response.type);
});

ws.on('update', (update) => {
  console.log('WebSocket update:', update.wsKey, update.topic, update.data);
});

ws.on('reconnect', ({ wsKey }) => {
  console.log('Reconnecting:', wsKey);
});

ws.on('reconnected', ({ wsKey }) => {
  console.log('Reconnected:', wsKey);
});

ws.on('close', ({ wsKey }) => {
  console.log('WebSocket closed:', wsKey);
});

ws.on('exception', (error) => {
  console.error('WebSocket exception:', error);
});

try {
  ws.subscribe('/market/ticker:BTC-USDT', WS_KEY_MAP.spotPublicV1);
} catch (error) {
  console.error('Spot subscription failed:', error);
}

try {
  ws.subscribe('/contractMarket/tickerV2:XBTUSDTM', WS_KEY_MAP.futuresPublicV1);
} catch (error) {
  console.error('Futures subscription failed:', error);
}

process.once('SIGINT', () => {
  ws.closeAll();
});
```

A `welcome` response means the connection is ready. An `ack` confirms the [subscription acknowledgement](https://siebly.io/reference/glossary#subscription-acknowledgement). Market data arrives separately through `update`.

### 4. Subscribe to private Classic WebSocket streams

Private subscriptions use the same client with credentials. Spot and Futures topics use separate connections.

<!-- siebly:snippet id="private-websocket" -->

```javascript
import { WebsocketClient, WS_KEY_MAP } from 'kucoin-api';

function main() {
  if (
    !process.env.KUCOIN_API_KEY ||
    !process.env.KUCOIN_API_SECRET ||
    !process.env.KUCOIN_API_PASSPHRASE
  ) {
    console.error(
      'Set KUCOIN_API_KEY, KUCOIN_API_SECRET, and KUCOIN_API_PASSPHRASE.',
    );
    return;
  }

  const ws = new WebsocketClient({
    apiKey: process.env.KUCOIN_API_KEY,
    apiSecret: process.env.KUCOIN_API_SECRET,
    apiPassphrase: process.env.KUCOIN_API_PASSPHRASE,
  });

  ws.on('open', ({ wsKey }) => {
    console.log('Private WebSocket opened:', wsKey);
  });

  ws.on('response', (response) => {
    console.log('Private WebSocket response:', response.wsKey, response.type);
  });

  ws.on('update', (update) => {
    console.log('Private update:', update.wsKey, update.topic, update.data);
  });

  ws.on('reconnected', ({ wsKey }) => {
    console.log('Private WebSocket reconnected:', wsKey);
  });

  ws.on('exception', (error) => {
    console.error('Private WebSocket exception:', error);
  });

  try {
    ws.subscribe(
      ['/spotMarket/tradeOrdersV2', '/account/balance'],
      WS_KEY_MAP.spotPrivateV1,
    );
  } catch (error) {
    console.error('Private Spot subscription failed:', error);
  }

  try {
    ws.subscribe(
      [
        '/contractMarket/tradeOrders:XBTUSDTM',
        '/contractAccount/wallet',
        '/contract/position:XBTUSDTM',
      ],
      WS_KEY_MAP.futuresPrivateV1,
    );
  } catch (error) {
    console.error('Private Futures subscription failed:', error);
  }

  process.once('SIGINT', () => {
    ws.closeAll();
  });
}

main();
```

Private order updates provide [private stream confirmation](https://siebly.io/reference/glossary#private-stream-confirmation) after an order command. Keep the `wsKey` with every event so Spot and Futures state cannot be mixed.

### 5. Validate a Spot order with the REST API

KuCoin's official [Spot test-order endpoint](https://www.kucoin.com/docs-new/rest/spot-trading/orders/add-order-test) validates authentication and order parameters without entering the matching engine. The returned order ID is only part of the test response and cannot be queried or cancelled.

This example fetches current metadata and the ticker before deriving a size that meets the base and quote minimums.

<!-- siebly:snippet id="spot-order-test" -->

```javascript
import { SpotClient } from 'kucoin-api';

const client = new SpotClient({
  apiKey: process.env.KUCOIN_API_KEY,
  apiSecret: process.env.KUCOIN_API_SECRET,
  apiPassphrase: process.env.KUCOIN_API_PASSPHRASE,
});

async function main() {
  if (
    !process.env.KUCOIN_API_KEY ||
    !process.env.KUCOIN_API_SECRET ||
    !process.env.KUCOIN_API_PASSPHRASE
  ) {
    console.error(
      'Set KUCOIN_API_KEY, KUCOIN_API_SECRET, and KUCOIN_API_PASSPHRASE.',
    );
    return;
  }

  let symbol;

  try {
    const response = await client.getSymbol({
      symbol: 'BTC-USDT',
    });
    symbol = response.data;
  } catch (error) {
    console.error('Symbol request failed:', error);
    return;
  }

  let ticker;

  try {
    const response = await client.getTicker({
      symbol: 'BTC-USDT',
    });
    ticker = response.data;
  } catch (error) {
    console.error('Ticker request failed:', error);
    return;
  }

  const priceNumber = Number(ticker.bestBid);
  const baseIncrement = Number(symbol.baseIncrement);
  const minimumSize = Math.max(
    Number(symbol.baseMinSize),
    Number(symbol.minFunds) / priceNumber,
  );

  if (
    !symbol.enableTrading ||
    !Number.isFinite(priceNumber) ||
    priceNumber <= 0 ||
    !Number.isFinite(baseIncrement) ||
    baseIncrement <= 0 ||
    !Number.isFinite(minimumSize)
  ) {
    console.error('Required BTC-USDT market metadata is unavailable.');
    return;
  }

  const decimals = (symbol.baseIncrement.split('.')[1] || '').length;
  const sizeNumber = Math.ceil(minimumSize / baseIncrement) * baseIncrement;
  const size = sizeNumber.toFixed(decimals);

  try {
    const response = await client.submitHFOrderTest({
      clientOid: client.generateNewOrderID(),
      symbol: 'BTC-USDT',
      side: 'buy',
      type: 'limit',
      price: ticker.bestBid,
      size,
      timeInForce: 'GTC',
      postOnly: true,
    });
    console.log('Spot order test:', response);
  } catch (error) {
    console.error('Spot order test failed:', error);
  }
}

main();
```

The test endpoint is suitable for checking credentials, Spot permission, request signing, and order fields. It does not test matching, fills, cancellation, or private order updates.

### 6. Validate a Futures order with the REST API

The official [Futures test-order endpoint](https://www.kucoin.com/docs-new/rest/futures-trading/orders/add-order-test) follows live-order validation without entering the matching engine. A Futures `size` is a contract count, so fetch the contract before using `lotSize`, `tickSize`, `multiplier`, and supported margin modes.

<!-- siebly:snippet id="futures-order-test" -->

```javascript
import { FuturesClient } from 'kucoin-api';

const client = new FuturesClient({
  apiKey: process.env.KUCOIN_API_KEY,
  apiSecret: process.env.KUCOIN_API_SECRET,
  apiPassphrase: process.env.KUCOIN_API_PASSPHRASE,
});

async function main() {
  if (
    !process.env.KUCOIN_API_KEY ||
    !process.env.KUCOIN_API_SECRET ||
    !process.env.KUCOIN_API_PASSPHRASE
  ) {
    console.error(
      'Set KUCOIN_API_KEY, KUCOIN_API_SECRET, and KUCOIN_API_PASSPHRASE.',
    );
    return;
  }

  let contract;

  try {
    const response = await client.getSymbol({
      symbol: 'XBTUSDTM',
    });
    contract = response.data;
  } catch (error) {
    console.error('Contract request failed:', error);
    return;
  }

  let ticker;

  try {
    const response = await client.getTicker({
      symbol: 'XBTUSDTM',
    });
    ticker = response.data;
  } catch (error) {
    console.error('Futures ticker request failed:', error);
    return;
  }

  let positionMode;

  try {
    const response = await client.getPositionMode();
    positionMode = response.data.positionMode;
  } catch (error) {
    console.error('Position-mode request failed:', error);
    return;
  }

  if (
    contract.status !== 'Open' ||
    !Number.isFinite(contract.lotSize) ||
    contract.lotSize <= 0 ||
    !ticker.bestBidPrice
  ) {
    console.error('Required XBTUSDTM contract metadata is unavailable.');
    return;
  }

  console.log('Contract multiplier:', contract.multiplier);
  console.log('Price increment:', contract.tickSize);
  console.log('Contract lot size:', contract.lotSize);

  try {
    const response = await client.submitNewOrderTest({
      clientOid: client.generateNewOrderID(),
      symbol: 'XBTUSDTM',
      side: 'buy',
      type: 'limit',
      price: ticker.bestBidPrice,
      size: contract.lotSize,
      leverage: 1,
      marginMode: contract.supportCross ? 'CROSS' : 'ISOLATED',
      positionSide: positionMode === 1 ? 'LONG' : 'BOTH',
      timeInForce: 'GTC',
      postOnly: true,
    });
    console.log('Futures order test:', response);
  } catch (error) {
    console.error('Futures order test failed:', error);
  }
}

main();
```

In one-way mode, use `positionSide: 'BOTH'`. Hedge mode separates `LONG` and `SHORT`. The contract `multiplier` determines the underlying exposure represented by each contract. The test order does not enter the matching engine and cannot be queried or cancelled.

### 7. Place and cancel a live Spot order through the WebSocket API

KuCoin does not provide a WebSocket API test-order command. This example can place a real order and therefore does nothing unless `KUCOIN_PLACE_LIVE_ORDER=true` is set.

It reads current Spot metadata, derives the minimum valid size, submits a post-only buy at the current best bid, cancels it, and queries the final state through the REST API. A post-only order can still fill after it rests on the book, so use a dedicated key and only fund the account with an amount suitable for testing.

<!-- siebly:snippet id="spot-ws-api-order" -->

```javascript
import { SpotClient, WebsocketAPIClient, WS_KEY_MAP } from 'kucoin-api';

async function main() {
  if (process.env.KUCOIN_PLACE_LIVE_ORDER !== 'true') {
    console.error(
      'Set KUCOIN_PLACE_LIVE_ORDER=true to run this live order example.',
    );
    return;
  }

  if (
    !process.env.KUCOIN_API_KEY ||
    !process.env.KUCOIN_API_SECRET ||
    !process.env.KUCOIN_API_PASSPHRASE
  ) {
    console.error(
      'Set KUCOIN_API_KEY, KUCOIN_API_SECRET, and KUCOIN_API_PASSPHRASE.',
    );
    return;
  }

  const credentials = {
    apiKey: process.env.KUCOIN_API_KEY,
    apiSecret: process.env.KUCOIN_API_SECRET,
    apiPassphrase: process.env.KUCOIN_API_PASSPHRASE,
  };

  const rest = new SpotClient(credentials);
  const wsApi = new WebsocketAPIClient(credentials);

  let symbol;

  try {
    const response = await rest.getSymbol({
      symbol: 'BTC-USDT',
    });
    symbol = response.data;
  } catch (error) {
    console.error('Symbol request failed:', error);
    return;
  }

  let ticker;

  try {
    const response = await rest.getTicker({
      symbol: 'BTC-USDT',
    });
    ticker = response.data;
  } catch (error) {
    console.error('Ticker request failed:', error);
    return;
  }

  const priceNumber = Number(ticker.bestBid);
  const baseIncrement = Number(symbol.baseIncrement);
  const minimumSize = Math.max(
    Number(symbol.baseMinSize),
    Number(symbol.minFunds) / priceNumber,
  );

  if (
    !symbol.enableTrading ||
    !Number.isFinite(priceNumber) ||
    priceNumber <= 0 ||
    !Number.isFinite(baseIncrement) ||
    baseIncrement <= 0 ||
    !Number.isFinite(minimumSize)
  ) {
    console.error('Required BTC-USDT market metadata is unavailable.');
    return;
  }

  const decimals = (symbol.baseIncrement.split('.')[1] || '').length;
  const sizeNumber = Math.ceil(minimumSize / baseIncrement) * baseIncrement;
  const size = sizeNumber.toFixed(decimals);
  const clientOid = rest.generateNewOrderID();
  let orderId;

  try {
    const response = await wsApi.submitNewSpotOrder(
      {
        clientOid,
        symbol: 'BTC-USDT',
        side: 'buy',
        type: 'limit',
        price: ticker.bestBid,
        size,
        timeInForce: 'GTC',
        postOnly: true,
      },
      WS_KEY_MAP.wsApiSpotV1,
    );
    console.log('WebSocket API response code:', response.code);
    console.log('WebSocket API timing:', response.inTime, response.outTime);
    orderId = response.data.orderId;
  } catch (error) {
    console.error('WebSocket API order failed:', error);
    wsApi.getWSClient().closeAll();
    return;
  }

  try {
    const response = await wsApi.cancelSpotOrder(
      {
        orderId,
        symbol: 'BTC-USDT',
      },
      WS_KEY_MAP.wsApiSpotV1,
    );
    console.log('Cancellation response:', response.data);
  } catch (error) {
    console.error('WebSocket API cancellation failed:', error);
  }

  try {
    const response = await rest.getHFOrderDetailsByOrderId({
      orderId,
      symbol: 'BTC-USDT',
    });
    console.log('Final REST API order state:', response.data);
  } catch (error) {
    console.error('Final order query failed:', error);
  } finally {
    wsApi.getWSClient().closeAll();
  }
}

main();
```

The WebSocket API response confirms the command result, not whether the order later filled or reached its final cancellation state. Treat it as [pending confirmation](https://siebly.io/reference/glossary#pending-confirmation), then use a private order stream and a REST API query to confirm the final state.

<!-- siebly:section id="rest-api" -->

## Work with the KuCoin REST API

### Understand response envelopes

Successful KuCoin REST API calls resolve to:

```javascript
const response = {
  code: '200000',
  data: {},
};
```

The SDK returns this envelope and throws when KuCoin returns a non-success business code. The shape inside `data` depends on the endpoint.

| Method                             | `data` shape                                    |
| ---------------------------------- | ----------------------------------------------- |
| `SpotClient.getServerTime()`       | Timestamp number                                |
| `SpotClient.getSymbol()`           | Spot symbol object                              |
| `SpotClient.getTicker()`           | Spot ticker object                              |
| `SpotClient.getTickers()`          | Object containing `time` and a `ticker` array   |
| `SpotClient.getOrderBookLevel20()` | Object containing tuple-array `bids` and `asks` |
| `SpotClient.getKlines()`           | Array of candle tuples                          |
| `FuturesClient.getSymbol()`        | Futures contract object                         |
| `FuturesClient.getTicker()`        | Futures ticker object                           |
| `FuturesClient.getPositions()`     | Array of position objects                       |

Check the [complete endpoint map](./endpointFunctionList.md) and official KuCoin documentation before reading an unfamiliar response.

### Read Spot account and order state

These current Spot methods form a useful [account state](https://siebly.io/reference/glossary#accountstate) baseline:

| State                  | SDK method                                   |
| ---------------------- | -------------------------------------------- |
| Trading balances       | `getBalances({ type: 'trade' })`             |
| Account ledgers        | `getTransactions()` or `getHFTransactions()` |
| Open orders            | `getHFActiveOrdersPaginated()`               |
| Completed orders       | `getHFCompletedOrders()`                     |
| Recent fills           | `getHFFilledOrders()`                        |
| Order by ID            | `getHFOrderDetailsByOrderId()`               |
| Order by client ID     | `getHFOrderDetailsByClientOid()`             |
| Dead-man-switch status | `cancelHFOrderAutoSettingQuery()`            |

The unpaginated `getHFActiveOrders()` method is deprecated. Use `getHFActiveOrdersPaginated()` in new code.

### Work with Futures

Use `FuturesClient` for Classic Futures market data, account state, orders, positions, margin, and funding:

| Workflow            | Representative methods                                                 |
| ------------------- | ---------------------------------------------------------------------- |
| Contract metadata   | `getSymbol()`, `getSymbols()`                                          |
| Market data         | `getTicker()`, `getKlines()`, `getPartOrderBookLevel2Depth20()`        |
| Account             | `getBalance()`, `getTransactions()`                                    |
| Orders              | `submitOrder()`, `getOrders()`, `getRecentOrders()`, `getFills()`      |
| Positions           | `getPositionV2()`, `getPositions()`, `getHistoryPositions()`           |
| Margin and leverage | `getMarginMode()`, `updateMarginMode()`, `changeCrossMarginLeverage()` |
| Position mode       | `getPositionMode()`, `updatePositionMode()`                            |
| Funding             | `getFundingRate()`, `getFundingRates()`, `getFundingHistory()`         |
| Transfers           | `submitTransferIn()`, `submitTransferOut()`, `getTransfers()`          |

Always fetch contract metadata before sizing a Futures order. Use `multiplier`, `lotSize`, `tickSize`, `maxOrderQty`, `maxLeverage`, and `supportCross` from the returned contract.

### Explore other REST API groups

Start with read methods and check account eligibility and API permissions before calling a write method.

| Product group             | Representative SDK methods                                                                           |
| ------------------------- | ---------------------------------------------------------------------------------------------------- |
| Spot and funding accounts | `getBalances()`, `getTransactions()`, `getTransferable()`                                            |
| Transfers                 | `submitFlexTransfer()`, `getTransferable()`                                                          |
| Subaccounts               | `getSubAccountsV2()`, `getSubAccountBalance()`, `getSubAccountBalancesV2()`                          |
| Margin                    | `getMarginBalance()`, `getHFActiveMarginOrders()`, `getHFMarginFills()`, `submitHFMarginOrderTest()` |
| Margin lending            | `getLendingCurrencyV3()`, `getLendingInterestRateV3()`                                               |
| Convert                   | `getConvertSymbol()`, `getConvertQuote()`, `getConvertOrderHistory()`                                |
| Earn                      | `getEarnSavingsProducts()`, `getEarnStakingProducts()`                                               |
| Structured products       | `getDualInvestmentProducts()`, `getStructuredProductOrders()`                                        |
| Affiliate                 | `getAffiliateInvitees()`, `getAffiliateCommission()`                                                 |
| Futures copy trading      | `submitCopyTradeOrderTest()`, `getCopyTradeMaxOpenSize()`                                            |
| Broker                    | `getBrokerInfo()`, `getSubAccounts()`, `getTransferHistory()`                                        |

Withdrawals and API-key management are intentionally omitted from runnable examples. They require broader permissions and carry a larger operational risk.

<!-- siebly:section id="websocket-streams" -->

## Build with Classic WebSocket streams

Classic WebSockets are the production-oriented default in this guide. Every subscription combines a topic with a `wsKey`. The official [Classic WebSocket introduction](https://www.kucoin.com/docs-new/websocket-api/base-info/introduction) covers connection tokens, welcome messages, and heartbeats.

### Choose the correct WebSocket key

| Connection              | SDK key                       |
| ----------------------- | ----------------------------- |
| Public Spot and Margin  | `WS_KEY_MAP.spotPublicV1`     |
| Private Spot and Margin | `WS_KEY_MAP.spotPrivateV1`    |
| Public Futures          | `WS_KEY_MAP.futuresPublicV1`  |
| Private Futures         | `WS_KEY_MAP.futuresPrivateV1` |
| Spot WebSocket API      | `WS_KEY_MAP.wsApiSpotV1`      |
| Futures WebSocket API   | `WS_KEY_MAP.wsApiFuturesV1`   |

Useful Classic topics include:

| Product | Public topics                                                                           | Private topics                                                                 |
| ------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Spot    | `/market/ticker`, `/spotMarket/level2Depth5`, `/market/candles`, `/market/match`        | `/spotMarket/tradeOrdersV2`, `/account/balance`, `/spotMarket/advancedOrders`  |
| Margin  | `/indicator/index`, `/indicator/markPrice`                                              | `/margin/position`, `/margin/isolatedPosition`                                 |
| Futures | `/contractMarket/tickerV2`, `/contractMarket/level2Depth5`, `/contractMarket/execution` | `/contractMarket/tradeOrders`, `/contractAccount/wallet`, `/contract/position` |

A Spot symbol uses `BTC-USDT`, while a Futures topic uses a contract such as `XBTUSDTM`. Do not route a topic based only on the underlying asset.

### Treat responses and updates differently

The `response` event includes connection messages and request acknowledgements. For Classic streams:

- `welcome` means the connection is ready.
- `ack` confirms that KuCoin accepted a subscription request.
- `update` carries market or account data.

The SDK adds `wsKey` to emitted events. Store it with the topic and payload so data from separate connections remains distinguishable.

### Recover after a reconnect

The SDK reconnects and restores cached subscriptions. A connection gap can still hide balance, order, fill, or position changes. Reload the affected state from the REST API after `reconnected`.

This example replaces local Spot state only after balances, open orders, and recent fills all reload successfully:

```javascript
import { SpotClient, WebsocketClient, WS_KEY_MAP } from 'kucoin-api';

const credentials = {
  apiKey: process.env.KUCOIN_API_KEY,
  apiSecret: process.env.KUCOIN_API_SECRET,
  apiPassphrase: process.env.KUCOIN_API_PASSPHRASE,
};

const rest = new SpotClient(credentials);
const ws = new WebsocketClient(credentials);

let recoveryRunning = false;
let spotState;

async function recoverSpotState() {
  if (recoveryRunning) {
    return;
  }

  recoveryRunning = true;

  try {
    let balances;

    try {
      const response = await rest.getBalances({
        type: 'trade',
      });
      balances = response.data;
    } catch (error) {
      console.error('Balance recovery failed:', error);
      return;
    }

    let openOrders;

    try {
      const response = await rest.getHFActiveOrdersPaginated({
        symbol: 'BTC-USDT',
        pageNum: 1,
        pageSize: 100,
      });
      openOrders = response.data.items;
    } catch (error) {
      console.error('Open-order recovery failed:', error);
      return;
    }

    let fills;

    try {
      const response = await rest.getHFFilledOrders({
        symbol: 'BTC-USDT',
        limit: 100,
      });
      fills = response.data.items;
    } catch (error) {
      console.error('Fill recovery failed:', error);
      return;
    }

    spotState = {
      balances,
      openOrders,
      fills,
      recoveredAt: Date.now(),
    };

    console.log('Recovered Spot state:', spotState);
  } finally {
    recoveryRunning = false;
  }
}

ws.on('reconnected', async ({ wsKey }) => {
  if (wsKey !== WS_KEY_MAP.spotPrivateV1) {
    return;
  }

  await recoverSpotState();
});

ws.on('update', (update) => {
  console.log('Private Spot update:', update);
});

ws.on('exception', (error) => {
  console.error('WebSocket exception:', error);
});

try {
  ws.subscribe(
    ['/spotMarket/tradeOrdersV2', '/account/balance'],
    WS_KEY_MAP.spotPrivateV1,
  );
} catch (error) {
  console.error('Private Spot subscription failed:', error);
}

process.once('SIGINT', () => {
  ws.closeAll();
});
```

This is [REST API hydration](https://siebly.io/reference/glossary#rest-hydration) applied as [scoped recovery](https://siebly.io/reference/glossary#scoped-recovery). Reload only the state that may have changed on the affected connection.

For a wider recovery design, see [Exchange State](https://siebly.io/reference/exchange-state) and [Runtime Workflows](https://siebly.io/reference/runtime-workflows).

<!-- siebly:section id="websocket-api" -->

## Use the KuCoin WebSocket API

`WebsocketAPIClient` provides awaitable Spot, Margin, and Futures order commands. It opens and authenticates the selected connection, adds request IDs, matches responses, and resolves each command promise.

| Product   | Representative methods                                                          |
| --------- | ------------------------------------------------------------------------------- |
| Spot      | `submitNewSpotOrder()`, `modifySpotOrder()`, `cancelSpotOrder()`                |
| Spot sync | `submitSyncSpotOrder()`, `cancelSyncSpotOrder()`                                |
| Margin    | `submitMarginOrder()`, `cancelMarginOrder()`                                    |
| Futures   | `submitFuturesOrder()`, `cancelFuturesOrder()`, `submitMultipleFuturesOrders()` |

Successful responses include `code`, endpoint-specific `data`, `inTime`, `outTime`, and the SDK-added `wsKey`. Non-success responses reject the command promise.

Use `connectWSAPI(wsKey)` when an application wants to open and authenticate the connection before its first command. Automatic reauthentication after reconnect is enabled by default.

KuCoin WebSocket API order commands are live. Use the REST API test-order methods before enabling a WebSocket command in an account with funds.

<!-- siebly:section id="developing-apis" -->

## Evaluate Unified Account and Pro APIs separately

KuCoin currently marks its Unified Account API as under active development and its Pro WebSocket API as beta. The official documentation says not to use these surfaces in production or live trading. Treat them as evaluation interfaces, not replacements for the Classic workflow in this guide.

See the official [Unified Account introduction](https://www.kucoin.com/docs-new/rest/ua/introduction) and [Pro WebSocket introduction](https://www.kucoin.com/docs-new/websocket-api/base-info/introduction-uta) before testing them.

### Make a public Unified REST API call

<!-- siebly:snippet id="unified-rest-evaluation" -->

```javascript
import { UnifiedAPIClient } from 'kucoin-api';

const client = new UnifiedAPIClient();

async function main() {
  try {
    const response = await client.getTickers({
      tradeType: 'SPOT',
      symbol: 'BTC-USDT',
    });
    console.log('Unified API ticker:', response.data);
  } catch (error) {
    console.error('Unified API ticker request failed:', error);
  }
}

main();
```

`UnifiedAPIClient` covers market data, accounts, transfers, orders, positions, funding, rate limits, and subaccounts. Endpoint availability depends on account eligibility and the current development phase.

### Subscribe to a public Pro WebSocket

<!-- siebly:snippet id="pro-websocket-evaluation" -->

```javascript
import { WebsocketClient, WS_KEY_MAP } from 'kucoin-api';

const ws = new WebsocketClient();

ws.on('response', (response) => {
  console.log('Pro WebSocket response:', response);
});

ws.on('update', (update) => {
  console.log('Pro ticker update:', update);
});

ws.on('exception', (error) => {
  console.error('Pro WebSocket exception:', error);
});

try {
  ws.subscribe(
    {
      topic: 'ticker',
      payload: {
        tradeType: 'SPOT',
        symbol: 'BTC-USDT',
      },
    },
    WS_KEY_MAP.spotPublicProV2,
  );
} catch (error) {
  console.error('Pro ticker subscription failed:', error);
}

process.once('SIGINT', () => {
  ws.closeAll();
});
```

Pro public Spot and Futures streams use `spotPublicProV2` and `futuresPublicProV2`. Private Pro topics share `privateProV2`. Their topic and payload format differs from Classic topics.

<!-- siebly:section id="api-regions" -->

## Connect to live and regional APIs

KuCoin does not currently provide an active sandbox. The [KuCoin sandbox suspension announcement](https://www.kucoin.com/announcement/kucoin-will-delist-the-sandbox-mode-0629) remains the relevant environment notice. Use the Spot and Futures REST API test-order methods for safe request validation.

### Live REST API hosts

| Account or product        | REST API host                       | SDK routing                                     |
| ------------------------- | ----------------------------------- | ----------------------------------------------- |
| Global Spot and Margin    | `https://api.kucoin.com`            | Default `SpotClient`                            |
| Global Futures            | `https://api-futures.kucoin.com`    | Default `FuturesClient`                         |
| Global Broker             | `https://api-broker.kucoin.com`     | Default `BrokerClient`                          |
| KuCoin EU Spot and Margin | `https://api.kucoin.eu`             | `apiRegion: 'EU'`                               |
| KuCoin AU                 | Global hosts with AU site selection | `apiRegion: 'AU'` adds the required site header |

KuCoin EU currently supports Spot and Margin APIs but not Futures. Use credentials created for the same account region.

See the official [KuCoin EU API documentation](https://www.kucoin.com/en-eu/docs-new/introduction/eu) and [KuCoin AU API documentation](https://www.kucoin.com/en-au/docs-new/introduction/au) for current regional availability.

Set `apiRegion` instead of manually selecting a standard regional host:

```javascript
import { SpotClient, WebsocketClient, WS_KEY_MAP } from 'kucoin-api';

const euSpot = new SpotClient({
  apiRegion: 'EU',
});

const auSpot = new SpotClient({
  apiRegion: 'AU',
});

const euWs = new WebsocketClient({
  apiRegion: 'EU',
});

euWs.on('open', ({ wsKey }) => {
  console.log('EU Classic WebSocket opened:', wsKey);
});

euWs.on('exception', (error) => {
  console.error('EU Classic WebSocket exception:', error);
});

async function main() {
  try {
    const response = await euSpot.getServerTime();
    console.log('EU API server time:', response.data);
  } catch (error) {
    console.error('EU API server-time request failed:', error);
  }

  try {
    const response = await auSpot.getSymbols();
    console.log('AU Spot symbols:', response.data);
  } catch (error) {
    console.error('AU Spot symbols request failed:', error);
  }

  try {
    await euWs.connect(WS_KEY_MAP.spotPublicV1);
    console.log('EU Classic WebSocket connection is ready.');
  } catch (error) {
    console.error('EU Classic WebSocket connection failed:', error);
  }
}

process.once('SIGINT', () => {
  euWs.closeAll();
});

main();
```

Classic WebSocket hosts are obtained from KuCoin's connection-token response. The SDK uses the selected region for that request. Do not hardcode a regional WebSocket URL that is not supplied by the official documentation and supported by the installed SDK version.

After connecting, subscribe only to symbols and topics available to the selected account region.

The optional `baseUrl` setting overrides normal region routing. Reserve it for a documented host that the account is allowed to use.

<!-- siebly:section id="proxies" -->

## Use a proxy with the REST API and WebSockets

`kucoin-api` accepts standard Node.js agents. Classic WebSockets need proxy configuration in two places:

- `requestOptions` carries the connection-token REST API request through the proxy.
- `wsOptions.agent` carries the WebSocket connection through the proxy.

REST API clients accept Axios network options as their second constructor argument.

See [Using proxies with Siebly SDKs](https://siebly.io/blog/using-proxy-with-siebly-sdks) for deployment and troubleshooting guidance.

### HTTP and HTTPS proxy

Install the proxy agent:

```bash
npm install https-proxy-agent
```

Set `KUCOIN_PROXY_URL` to an `http://` or `https://` proxy URL:

```javascript
import { HttpsProxyAgent } from 'https-proxy-agent';
import { SpotClient, WebsocketClient, WS_KEY_MAP } from 'kucoin-api';

async function main() {
  const proxyUrl = process.env.KUCOIN_PROXY_URL;

  if (!proxyUrl) {
    console.error('Set KUCOIN_PROXY_URL.');
    return;
  }

  const agent = new HttpsProxyAgent(proxyUrl);

  const rest = new SpotClient(
    {},
    {
      httpsAgent: agent,
      proxy: false,
    },
  );

  const ws = new WebsocketClient({
    requestOptions: {
      httpsAgent: agent,
      proxy: false,
    },
    wsOptions: {
      agent,
    },
  });

  ws.on('open', ({ wsKey }) => {
    console.log('WebSocket connected through proxy:', wsKey);
  });

  ws.on('response', (response) => {
    console.log('Subscription response:', response);
  });

  ws.on('update', (update) => {
    console.log('Ticker update through proxy:', update);
    ws.closeAll();
  });

  ws.on('exception', () => {
    console.error('WebSocket proxy connection failed.');
  });

  try {
    const response = await rest.getServerTime();
    console.log('Server time through proxy:', response.data);
  } catch {
    console.error('REST API proxy request failed.');
  }

  try {
    ws.subscribe('/market/ticker:BTC-USDT', WS_KEY_MAP.spotPublicV1);
  } catch {
    console.error('WebSocket proxy subscription failed.');
  }

  process.once('SIGINT', () => {
    ws.closeAll();
  });
}

main();
```

For an authenticated HTTP or HTTPS proxy, include the username and password in `KUCOIN_PROXY_URL`. Percent-encode reserved characters in each credential component.

### SOCKS5 proxy

Install the SOCKS agent:

```bash
npm install socks-proxy-agent
```

Set `KUCOIN_SOCKS_PROXY_URL` to a `socks5://` URL:

```javascript
import { SocksProxyAgent } from 'socks-proxy-agent';
import { SpotClient, WebsocketClient, WS_KEY_MAP } from 'kucoin-api';

async function main() {
  const proxyUrl = process.env.KUCOIN_SOCKS_PROXY_URL;

  if (!proxyUrl) {
    console.error('Set KUCOIN_SOCKS_PROXY_URL.');
    return;
  }

  const agent = new SocksProxyAgent(proxyUrl);

  const rest = new SpotClient(
    {},
    {
      httpsAgent: agent,
      proxy: false,
    },
  );

  const ws = new WebsocketClient({
    requestOptions: {
      httpsAgent: agent,
      proxy: false,
    },
    wsOptions: {
      agent,
    },
  });

  ws.on('open', ({ wsKey }) => {
    console.log('WebSocket connected through SOCKS5:', wsKey);
  });

  ws.on('response', (response) => {
    console.log('Subscription response:', response);
  });

  ws.on('update', (update) => {
    console.log('Ticker update through SOCKS5:', update);
    ws.closeAll();
  });

  ws.on('exception', () => {
    console.error('SOCKS5 WebSocket connection failed.');
  });

  try {
    const response = await rest.getServerTime();
    console.log('Server time through SOCKS5:', response.data);
  } catch {
    console.error('SOCKS5 REST API request failed.');
  }

  try {
    ws.subscribe('/market/ticker:BTC-USDT', WS_KEY_MAP.spotPublicV1);
  } catch {
    console.error('SOCKS5 WebSocket subscription failed.');
  }

  process.once('SIGINT', () => {
    ws.closeAll();
  });
}

main();
```

### Private REST API, stream, and WebSocket API traffic

Use the same agent for private REST API calls, connection-token requests, private stream connections, and WebSocket API connections:

```javascript
import { HttpsProxyAgent } from 'https-proxy-agent';
import {
  SpotClient,
  WebsocketAPIClient,
  WebsocketClient,
  WS_KEY_MAP,
} from 'kucoin-api';

async function main() {
  const proxyUrl = process.env.KUCOIN_PROXY_URL;

  if (!proxyUrl) {
    console.error('Set KUCOIN_PROXY_URL.');
    return;
  }

  if (
    !process.env.KUCOIN_API_KEY ||
    !process.env.KUCOIN_API_SECRET ||
    !process.env.KUCOIN_API_PASSPHRASE
  ) {
    console.error(
      'Set KUCOIN_API_KEY, KUCOIN_API_SECRET, and KUCOIN_API_PASSPHRASE.',
    );
    return;
  }

  const agent = new HttpsProxyAgent(proxyUrl);
  const credentials = {
    apiKey: process.env.KUCOIN_API_KEY,
    apiSecret: process.env.KUCOIN_API_SECRET,
    apiPassphrase: process.env.KUCOIN_API_PASSPHRASE,
  };

  const rest = new SpotClient(credentials, {
    httpsAgent: agent,
    proxy: false,
  });

  const streams = new WebsocketClient({
    ...credentials,
    requestOptions: {
      httpsAgent: agent,
      proxy: false,
    },
    wsOptions: {
      agent,
    },
  });

  const wsApi = new WebsocketAPIClient({
    ...credentials,
    wsOptions: {
      agent,
    },
  });

  streams.on('update', (update) => {
    console.log('Private update through proxy:', update);
  });

  streams.on('exception', () => {
    console.error('Private stream proxy connection failed.');
  });

  try {
    const response = await rest.getBalances({
      type: 'trade',
    });
    console.log('Spot balances through proxy:', response.data);
  } catch {
    console.error('Private REST API proxy request failed.');
  }

  try {
    streams.subscribe('/account/balance', WS_KEY_MAP.spotPrivateV1);
  } catch {
    console.error('Private stream subscription failed.');
  }

  try {
    await wsApi.connectWSAPI(WS_KEY_MAP.wsApiSpotV1);
    console.log('WebSocket API authenticated through proxy.');
  } catch {
    console.error('WebSocket API proxy connection failed.');
  }

  process.once('SIGINT', () => {
    streams.closeAll();
    wsApi.getWSClient().closeAll();
  });
}

main();
```

The proxy's egress IP is the address KuCoin sees. Add it to the API key whitelist when a whitelist is enabled. Use a stable proxy endpoint and monitor its availability and latency.

A proxy changes the network path, not request signing, API permissions, account eligibility, or regional availability. Treat HTTP 407 responses, TLS failures, token-request failures, and repeated reconnects as network faults.

<!-- siebly:section id="production" -->

## Production checklist

### Keep request time accurate

KuCoin rejects private requests when the client timestamp differs from server time by more than the allowed window. Keep the host clock synchronized with NTP. Use `getServerTime()` for diagnosis, then fix the system clock instead of applying an unbounded application offset.

### Respect rate limits

Rate limits vary by product, permission, endpoint weight, account level, region, and connection type. Read the current [KuCoin rate-limit documentation](https://www.kucoin.com/docs-new/rate-limit) and monitor returned error details.

Retry temporary network failures and rate-limit responses with bounded exponential backoff and jitter. Do not blindly retry an order after an ambiguous timeout. Query by `clientOid` or reconcile current order state first.

### Use client-generated order IDs

Set a unique `clientOid` on each application-owned order. Store it before sending the request. This gives retries, restarts, REST API queries, and stream updates a common identifier.

### Apply product metadata

Before placing a Spot order, check `enableTrading`, minimum and maximum sizes, `minFunds`, and price and size increments.

Before placing a Futures order, check contract status, `multiplier`, `lotSize`, `tickSize`, `maxOrderQty`, `maxLeverage`, margin mode support, and position mode.

Use a decimal arithmetic library for production sizing and rounding when native floating-point arithmetic could change an order amount.

### Confirm final state

A REST API response or WebSocket API response can arrive before later matching, fills, cancellations, or amendments. Record the command response, then confirm final state through private streams and a REST API query.

After a reconnect, restore the affected [exchange state](https://siebly.io/reference/exchange-state) before resuming state-dependent actions.

### Plan for WebSocket renewal

Classic connection tokens are valid for 24 hours, and a connection is expected to end after that period. Treat reconnects as normal. The SDK reconnects and restores subscriptions, while the application reloads any private state that may have changed during the gap.

### Use dead-man-switch protection where appropriate

Spot HF endpoints include `cancelHFOrderAutoSetting()` and `cancelHFOrderAutoSettingQuery()`. A dead-man switch can reduce the time stale orders remain open after an application or network failure. Configure and monitor it as part of the trading system, not as a replacement for recovery.

### Scope credentials and network access

- Grant General permission to read-only services.
- Add Spot, Margin, Futures, or Earn permission only where needed.
- Do not grant Withdrawal permission to trading services.
- Use IP restrictions when egress addresses are stable.
- Keep region-specific credentials with the matching account region.
- Monitor proxy availability and egress IP changes.

### Keep developing APIs out of production

Do not route production trading through Unified Account or Pro WebSocket APIs while the official KuCoin documentation marks them as developing or beta.

### Shut down connections

Call `closeAll()` on each WebSocket client when the process is ending. An unsubscribe request is unnecessary when the connection is about to close.

## FAQ

### Does `kucoin-api` work with plain JavaScript?

Yes. Every example in this guide is JavaScript, and the npm package supports both CommonJS and ESM projects.

### Which REST API client should I use?

Use `SpotClient` for Classic Spot, Margin, funding, Earn, and Convert endpoints. Use `FuturesClient` for Classic Futures. Use `BrokerClient` for broker operations. Treat `UnifiedAPIClient` as an evaluation surface while the official API remains under development.

### Why does every successful response contain `code` and `data`?

That is KuCoin's REST API response envelope. `code: '200000'` indicates success, and the endpoint-specific result is under `data`. The SDK throws non-success business responses.

### What is the API passphrase?

It is the passphrase chosen when creating the API key. It is not the KuCoin account password. The key, secret, and passphrase are all required for signed requests.

### Why do current Spot methods contain `HF`?

They map to KuCoin's current high-frequency Spot API paths. Methods such as `submitHFOrder()` and `getHFActiveOrdersPaginated()` are the preferred current Spot methods, not special low-level SDK modes.

### Should I use `trade` or `trade_hf`?

Most current users use `trade`. Some older high-frequency accounts use `trade_hf`. `getUserType()` is a compatibility check for those older accounts.

### Does KuCoin have a TestNet or sandbox?

KuCoin suspended its sandbox. Use `submitHFOrderTest()` and `submitNewOrderTest()` to validate Spot and Futures order requests without entering the matching engine.

### Can a test order be queried or cancelled?

No. A REST API test order never enters the matching engine. Its returned order ID is part of the validation response only.

### Are WebSocket API order commands test orders?

No. KuCoin's WebSocket API order commands are live. Keep them behind an explicit application-level opt-in and validate the equivalent request through the REST API test-order method first.

### Does a successful WebSocket API response mean the order filled?

No. It confirms the command response. Confirm matching, fills, and final order state through private streams and a REST API query.

### What is the difference between Classic and Pro WebSockets?

Classic connections use V1 topics such as `/market/ticker:BTC-USDT`. Pro connections use structured V2 topics and payloads. KuCoin currently marks Pro APIs as beta, so this guide uses Classic WebSockets for production-oriented examples.

### Which `WS_KEY_MAP` value should I use?

Choose the key for the exact product and access level. Spot and Futures, public and private, Classic and Pro, and WebSocket API commands all use distinct keys.

### Why is a Futures `size` not a BTC amount?

Futures `size` is a contract count. Read `multiplier` and `lotSize` from contract metadata to calculate the underlying exposure.

### Why did a Futures order fail after switching position mode?

One-way mode uses `positionSide: 'BOTH'`. Hedge mode separates `LONG` and `SHORT`. Query `getPositionMode()` and keep the order side and position side consistent.

### How do EU and AU accounts use the SDK?

Set `apiRegion: 'EU'` or `apiRegion: 'AU'`. EU uses its regional Spot and Margin REST API host. AU uses the required site selection while retaining supported hosts. Use credentials from the same account region.

### Can REST API and WebSocket traffic use the same proxy?

Yes. Pass the agent to the REST API client's network options, the Classic WebSocket token request through `requestOptions`, and the socket through `wsOptions.agent`.

### Does a proxy change signing or account eligibility?

No. The SDK signs the same requests through the proxy. API permissions, region, account eligibility, and product availability still apply.

### What causes timestamp or signature errors?

Common causes are a drifting system clock, the wrong API secret or passphrase, an incorrect API key version, credentials from another region, or a request reaching the wrong host. Verify these values without logging secrets.

### What should happen after a WebSocket reconnect?

Allow the SDK to restore cached subscriptions, then reload affected balances, open orders, fills, and positions from the REST API before trusting the rebuilt state.

## Next steps

- Browse the [KuCoin SDK examples](https://siebly.io/examples/KuCoin).
- Find methods in the [complete endpoint map](./endpointFunctionList.md).
- Review the [KuCoin SDK page](https://siebly.io/sdk/kucoin/javascript).
- Install or update [`kucoin-api` from npm](https://www.npmjs.com/package/kucoin-api).
- Browse the [`kucoin-api` source repository](https://github.com/tiagosiebler/kucoin-api).
- Read the official [KuCoin API documentation](https://www.kucoin.com/docs-new/).
- Review [Exchange State](https://siebly.io/reference/exchange-state) before building private state management.
- Use [Runtime Workflows](https://siebly.io/reference/runtime-workflows) when designing startup, reconnect, and reconciliation behavior.
- Open the [Siebly glossary](https://siebly.io/reference/glossary) for order, stream, and recovery terms.
- Report SDK issues in the [`kucoin-api` GitHub repository](https://github.com/tiagosiebler/kucoin-api/issues).
