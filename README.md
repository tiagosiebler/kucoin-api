# Node.js & JavaScript SDK for Kucoin REST APIs, Websockets & WebSocket API

[![Build & Test](https://github.com/tiagosiebler/kucoin-api/actions/workflows/e2etest.yml/badge.svg?branch=master)](https://github.com/tiagosiebler/kucoin-api/actions/workflows/e2etest.yml)
[![npm version](https://img.shields.io/npm/v/kucoin-api)][1]
[![npm size](https://img.shields.io/bundlephobia/min/kucoin-api/latest)][1]
[![npm downloads](https://img.shields.io/npm/dt/kucoin-api)][1]
[![last commit](https://img.shields.io/github/last-commit/tiagosiebler/kucoin-api)][1]
[![Telegram](https://img.shields.io/badge/chat-on%20telegram-blue.svg)](https://t.me/nodetraders)

<p align="center">
  <a href="https://www.npmjs.com/package/kucoin-api">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/tiagosiebler/kucoin-api/blob/master/docs/images/logoDarkMode2.svg?raw=true#gh-dark-mode-only">
      <img alt="SDK Logo" src="https://github.com/tiagosiebler/kucoin-api/blob/master/docs/images/logoBrightMode2.svg?raw=true#gh-light-mode-only">
    </picture>
  </a>
</p>

[1]: https://www.npmjs.com/package/kucoin-api

Updated & performant JavaScript & Node.js SDK for the Kucoin REST APIs and WebSockets:

- Professional, robust & performant Kucoin SDK with extensive production use in live trading environments.
- Complete integration with all Kucoin REST APIs and WebSockets.
  - Dedicated REST clients for Spot, Futures, and Broker operations
  - Unified WebSocket client for all markets
  - Dedicated WebSocket API client, to trade on the WebSocket API without the complexity of WebSockets.
- Complete TypeScript support (with type declarations for most API requests & responses).
  - Strongly typed requests and responses.
  - Automated end-to-end tests ensuring reliability.
- Actively maintained with a modern, promise-driven interface.
- Robust WebSocket integration with configurable connection heartbeats & automatic reconnect then resubscribe workflows.
  - Event driven messaging.
  - Smart WebSocket persistence with automatic reconnection handling.
  - Emit `reconnected` event when dropped connection is restored.
  - Support for both public and private WebSocket streams.
- Supports WebSocket API on all available product groups, including Spot & Futures:
  - Use the WebsocketClient's event-driven `sendWSAPIRequest()` method, or;
  - Use the WebsocketAPIClient for a REST-like experience. Use the WebSocket API like a REST API! See [examples/WebSockets/ws-api-client.ts](./examples/WebSockets/ws-api-client.ts) for a demonstration.
- Browser-friendly HMAC signature mechanism.
- Automatically supports both ESM and CJS projects.
- Heavy automated end-to-end testing with real API calls.
- Proxy support via axios integration.
- Active community support & collaboration in telegram: [Node.js Algo Traders](https://t.me/nodetraders).

## Table of Contents

- [Installation](#installation)
- [Examples](#examples)
- [Issues & Discussion](#issues--discussion)
- [Related Projects](#related-projects)
- [Documentation](#documentation)
- [Structure](#structure)
- [Usage](#usage)
  - [REST API Clients](#rest-api)
    - [Spot & Margin Trading](#spot--margin-trading)
    - [Futures Trading](#futures-trading)
    - [Broker Operations](#broker-operations)
    - [Unified API](#unified-api)
  - [WebSockets](#websockets)
    - [WebSocket Consumers](#websocket-consumers)
      - [Public WebSocket Streams](#public-websocket-streams)
      - [Private WebSocket Streams](#private-websocket-streams)
    - [WebSocket API](#websocket-api)
      - [Event Driven API](#event-driven-api)
      - [Promise Driven API](#async-await-api)
- [Customise Logging](#customise-logging)
- [Browser/Frontend Usage](#browserfrontend-usage)
  - [Webpack](#webpack)
- [LLMs & AI](#use-with-llms--ai)
- [Used By](#used-by)
- [Contributions & Thanks](#contributions--thanks)

## Installation

`npm install --save kucoin-api`

## Examples

Refer to the [examples](./examples) folder for implementation demos.

## Issues & Discussion

- Issues? Check the [issues tab](https://github.com/tiagosiebler/kucoin-api/issues).
- Discuss & collaborate with other node devs? Join our [Node.js Algo Traders](https://t.me/nodetraders) engineering community on telegram.
- Follow our announcement channel for real-time updates on [X/Twitter](https://x.com/sieblyio)

<!-- template_related_projects -->

## Related Projects

Check out our JavaScript/TypeScript/Node.js SDKs & Projects:

- Visit our website: [https://Siebly.io](https://siebly.io/?ref=gh)
- Try our REST API & WebSocket SDKs published on npmjs:
  - [Bybit Node.js SDK: bybit-api](https://www.npmjs.com/package/bybit-api)
  - [Kraken Node.js SDK: @siebly/kraken-api](https://www.npmjs.com/package/@siebly/kraken-api)
  - [OKX Node.js SDK: okx-api](https://www.npmjs.com/package/okx-api)
  - [Binance Node.js SDK: binance](https://www.npmjs.com/package/binance)
  - [Gate (gate.com) Node.js SDK: gateio-api](https://www.npmjs.com/package/gateio-api)
  - [Bitget Node.js SDK: bitget-api](https://www.npmjs.com/package/bitget-api)
  - [Kucoin Node.js SDK: kucoin-api](https://www.npmjs.com/package/kucoin-api)
  - [Coinbase Node.js SDK: coinbase-api](https://www.npmjs.com/package/coinbase-api)
  - [Bitmart Node.js SDK: bitmart-api](https://www.npmjs.com/package/bitmart-api)
- Try my misc utilities:
  - [OrderBooks Node.js: orderbooks](https://www.npmjs.com/package/orderbooks)
  - [Crypto Exchange Account State Cache: accountstate](https://www.npmjs.com/package/accountstate)
- Check out my examples:
  - [awesome-crypto-examples Node.js](https://github.com/tiagosiebler/awesome-crypto-examples)
  <!-- template_related_projects_end -->

## Documentation

Most methods accept JS objects. These can be populated using parameters specified by Kucoin's API documentation, or check the type definition in each class within this repository.

### API Documentation Links

- [Kucoin API Documentation](https://www.kucoin.com/docs-new/introduction)

### SDK Documentation & Guides

- Node.js Quick Start Guides
  - [Spot Node.js Kucoin Quick Start Guide](./examples/kucoin-SPOT-examples-nodejs.md)
  - [Futures Node.js Kucoin Quick Start Guide](./examples/kucoin-FUTURES-examples-nodejs.md)
- [Futures Node.js Kucoin Order Placement Guide](./examples/rest-futures-orders-guide.ts)
- [REST Endpoint Function List](./docs/endpointFunctionList.md)

## Structure

This project uses typescript. Resources are stored in 2 key structures:

- [src](./src) - the whole connector written in typescript
- [examples](./examples) - some implementation examples & demonstrations. Contributions are welcome!

---

# Usage

Create API credentials on Kucoin's website:

- [Kucoin API Key Management](https://www.kucoin.com/account/api)

## REST API

The SDK provides dedicated REST clients for different trading products:

- **SpotClient** - for spot trading and margin operations
- **FuturesClient** - for futures trading operations
- **BrokerClient** - for broker and sub-account management
- **UnifiedAPIClient** - for unified market data access across all trading products

### Spot & Margin Trading

To use Kucoin's Spot and Margin APIs, import (or require) the `SpotClient`:

```javascript
const { SpotClient, FuturesClient } = require('kucoin-api');

const client = new SpotClient({
  apiKey: 'apiKeyHere',
  apiSecret: 'apiSecretHere',
  apiPassphrase: 'apiPassPhraseHere',
});

try {
  const spotBuyResult = await client.submitHFOrder({
    clientOid: client.generateNewOrderID(),
    side: 'buy',
    type: 'market',
    symbol: 'BTC-USDT',
    size: '0.00001',
  });
  console.log('spotBuy ', JSON.stringify(spotBuyResult, null, 2));

  const spotSellResult = await client.submitHFOrder({
    clientOid: client.generateNewOrderID(),
    side: 'sell',
    type: 'market',
    symbol: 'BTC-USDT',
    size: '0.00001',
  });
  console.log('spotSellResult ', JSON.stringify(spotSellResult, null, 2));
} catch (e) {
  console.error(`Req error: `, e);
}
```

See [SpotClient](./src/SpotClient.ts) for further information, or the [examples](./examples/) for lots of usage examples.

### Futures Trading

Use the `FuturesClient` for futures trading operations. See [FuturesClient](./src/FuturesClient.ts) for complete API coverage.

### Broker Operations

Use the `BrokerClient` for broker and sub-account management operations. See [BrokerClient](./src/BrokerClient.ts) for complete API coverage.

### Unified API

The `UnifiedAPIClient` provides access to KuCoin's Unified API endpoints, which offer streamlined market data access across Spot, Futures, and Margin trading products. It doesn't serve a purpose of a UTA account(Unified trading account) - but it is a new generation of API endpoints generalised for all trading products.

## WebSockets

All WebSocket functionality is supported via the unified `WebsocketClient`. This client handles both spot and futures WebSocket streams with automatic connection management and reconnection.

Key WebSocket features:

- Event driven messaging
- Smart WebSocket persistence with automatic reconnection
- Heartbeat mechanisms to detect disconnections
- Automatic resubscription after reconnection
- Support for both public and private WebSocket streams
- Unified client for spot and futures markets

### WebSocket Consumers

All websockets are accessible via the shared `WebsocketClient`. As before, API credentials are optional unless the user data stream is required.

#### Public WebSocket Streams

For public market data, API credentials are not required:

All available WebSockets can be used via a shared `WebsocketClient`. The WebSocket client will automatically open/track/manage connections as needed. Each unique connection (one per server URL) is tracked using a WsKey (each WsKey is a string - see [WS_KEY_MAP](src/lib/websocket/websocket-util.ts) for a list of supported values).

Any subscribe/unsubscribe events will need to include a WsKey, so the WebSocket client understands which connection the event should be routed to. See examples below or in the [examples](./examples/) folder on GitHub.

Data events are emitted from the WebsocketClient via the `update` event, see example below:

```javascript
const { WebsocketClient } = require('kucoin-api');

const client = new WebsocketClient();

client.on('open', (data) => {
  console.log('open: ', data?.wsKey);
});

// Data received
client.on('update', (data) => {
  console.info('data received: ', JSON.stringify(data));
});

// Something happened, attempting to reconenct
client.on('reconnect', (data) => {
  console.log('reconnect: ', data);
});

// Reconnect successful
client.on('reconnected', (data) => {
  console.log('reconnected: ', data);
});

// Connection closed. If unexpected, expect reconnect -> reconnected.
client.on('close', (data) => {
  console.error('close: ', data);
});

// Reply to a request, e.g. "subscribe"/"unsubscribe"/"authenticate"
client.on('response', (data) => {
  console.info('response: ', data);
  // throw new Error('res?');
});

client.on('exception', (data) => {
  console.error('exception: ', {
    msg: data.msg,
    errno: data.errno,
    code: data.code,
    syscall: data.syscall,
    hostname: data.hostname,
  });
});

try {
  // Optional: await a connection to be ready before subscribing (this is not necessary)
  // await client.connect('futuresPublicV1');

  /**
   * Examples for public futures websocket topics (that don't require authentication).
   *
   * These should all subscribe via the "futuresPublicV1" wsKey. For detailed usage, refer to the ws-spot-public.ts example.
   */
  client.subscribe(
    [
      '/contractMarket/tickerV2:XBTUSDM',
      '/contractMarket/ticker:XBTUSDM',
      '/contractMarket/level2:XBTUSDM',
      '/contractMarket/execution:XBTUSDM',
      '/contractMarket/level2Depth5:XBTUSDM',
      '/contractMarket/level2Depth50:XBTUSDM',
      '/contractMarket/limitCandle:XBTUSDTM_1hour',
      '/contract/instrument:XBTUSDM',
      '/contract/announcement',
      '/contractMarket/snapshot:XBTUSDM',
    ],
    'futuresPublicV1',
  );
} catch (e) {
  console.error(`Subscribe exception: `, e);
}
```

#### Private WebSocket Streams

For private account data streams, API credentials are required. The WebsocketClient will automatically handle authentication when you provide API credentials.

See [WebsocketClient](./src/WebsocketClient.ts) for further information and make sure to check the [examples](./examples/) folder for much more detail, especially [ws-spot-public.ts](./examples/ws-spot-public.ts), which explains a lot of detail.

### WebSocket API

Kucoin also support sending requests (commands) over an active WebSocket connection. This is called the WebSocket API. There are two key ways of interacting with the WebSocket API. The existing WebsocketClient allows raw event routing via the awaitable sendWSAPIRequest() method, or for a much simpler & convenient interface, use the promise-driven API. The surface feels like a REST API, but routing is automatically routed via a dedicated WebSocket connection.

#### Event Driven API

The WebSocket API is available in the [WebsocketClient](./src/websocket-client.ts) via the `sendWSAPIRequest(wsKey, command, commandParameters)` method.

Each call to this method is wrapped in a promise, which you can async await for a response, or handle it in a raw event-driven design.

#### Promise Driven API

The WebSocket API is also available in a promise-wrapped REST-like format. Either, as above, await any calls to `sendWSAPIRequest(...)`, or directly use the convenient WebsocketAPIClient. This class is very similar to existing REST API classes (such as the MainClient or USDMClient).

It provides one function per endpoint, feels like a REST API and will automatically route your request via an automatically persisted, authenticated and health-checked WebSocket API connection.

Below is an example showing how easy it is to use the WebSocket API without any concern for the complexity of managing WebSockets. For more detailed demonstration, take a look at the [examples/WebSockets/ws-api-client.ts](./examples/WebSockets//ws-api-client.ts) example:

```typescript
import { DefaultLogger, WebsocketAPIClient } from 'kucoin-api';

// or, if you prefer `require()`:
// const { DefaultLogger, WebsocketAPIClient } = require('kucoin-api');

const customLogger = {
  ...DefaultLogger,
  // For a more detailed view of the WebsocketClient, enable the `trace` level by uncommenting the below line:
  // trace: (...params) => console.log(new Date(), 'trace', ...params),
};

const account = {
  key: process.env.API_KEY || 'keyHere',
  secret: process.env.API_SECRET || 'secretHere',
  passphrase: process.env.API_PASSPHRASE || 'apiPassPhraseHere', // This is NOT your account password
};

const wsClient = new WebsocketAPIClient(
  {
    apiKey: account.key,
    apiSecret: account.secret,
    apiPassphrase: account.passphrase,

    // If you want your own event handlers instead of the default ones with logs, disable this setting and see the `attachEventHandlers` example below:
    // attachEventListeners: false
  },
  // customLogger, // optional: uncomment this to inject a custom logger
);

// Make WebSocket API calls, very similar to a REST API:

wsClient
  .submitNewSpotOrder({
    side: 'buy',
    symbol: 'BTC-USDT',
    type: 'limit',
    price: '150000',
    size: '0.0001',
  })
  .then((syncSpotOrderResponse) => {
    console.log('Sync spot order response:', syncSpotOrderResponse);
  })
  .catch((e) => {
    console.log('Sync spot order error:', e);
  });

wsClient
  .submitFuturesOrder({
    clientOid: 'futures-test-' + Date.now(),
    side: 'buy',
    symbol: 'XBTUSDTM',
    marginMode: 'CROSS',
    type: 'limit',
    price: '1000',
    qty: '0.01',
    leverage: 10,
    positionSide: 'LONG', // needed if trading two-way (hedge) position mode
  })
  .then((futuresOrderResponse) => {
    console.log('Futures order response:', futuresOrderResponse);
  })
  .catch((e) => {
    console.log('Futures order error:', e);
  });
```

---

## Customise Logging

Pass a custom logger which supports the log methods `trace`, `info` and `error`, or override methods from the default logger as desired.

```javascript
const { WebsocketClient, DefaultLogger } = require('kucoin-api');

// E.g. customise logging for only the trace level:
const logger = {
  // Inherit existing logger methods, using an object spread
  ...DefaultLogger,
  // Define a custom trace function to override only that function
  trace: (...params) => {
    if (
      [
        // Selectively prevent some traces from logging
        'Sending ping',
        'Received pong',
      ].includes(params[0])
    ) {
      return;
    }
    console.log('trace', JSON.stringify(params, null, 2));
  },
};

const ws = new WebsocketClient(
  {
    apiKey: 'apiKeyHere',
    apiSecret: 'apiSecretHere',
    apiPassphrase: 'apiPassPhraseHere',
  },
  logger,
);
```

## Browser/Frontend Usage

### Webpack

Build a bundle using webpack:

- `npm install`
- `npm run build`
- `npm run pack`

The bundle can be found in `dist/`. Altough usage should be largely consistent, smaller differences will exist. Documentation is still TODO.

## Use with LLMs & AI

This SDK includes a bundled `llms.txt` file in the root of the repository. If you're developing with LLMs, use the included `llms.txt` with your LLM - it will significantly improve the LLMs understanding of how to correctly use this SDK.

This file contains AI optimised structure of all the functions in this package, and their parameters for easier use with any learning models or artificial intelligence.

---

## Used By

[![Repository Users Preview Image](https://dependents.info/tiagosiebler/kucoin-api/image)](https://github.com/tiagosiebler/kucoin-api/network/dependents)

---

<!-- template_contributions -->

### Contributions & Thanks

Have my projects helped you? Share the love, there are many ways you can show your thanks:

- Star & share my projects.
- Are my projects useful? Sponsor me on Github and support my effort to maintain & improve them: https://github.com/sponsors/tiagosiebler
- Have an interesting project? Get in touch & invite me to it.
- Or buy me all the coffee:
  - ETH(ERC20): `0xA3Bda8BecaB4DCdA539Dc16F9C54a592553Be06C` <!-- metamask -->
- Sign up with my referral links:
  - OKX (receive a 20% fee discount!): https://www.okx.com/join/42013004
  - Binance (receive a 20% fee discount!): https://accounts.binance.com/register?ref=OKFFGIJJ
  - HyperLiquid (receive a 4% fee discount!): https://app.hyperliquid.xyz/join/SDK
  - Gate: https://www.gate.io/signup/NODESDKS?ref_type=103

<!---
old ones:
  - BTC: `1C6GWZL1XW3jrjpPTS863XtZiXL1aTK7Jk`
  - BTC(SegWit): `bc1ql64wr9z3khp2gy7dqlmqw7cp6h0lcusz0zjtls`
  - ETH(ERC20): `0xe0bbbc805e0e83341fadc210d6202f4022e50992`
  - USDT(TRC20): `TA18VUywcNEM9ahh3TTWF3sFpt9rkLnnQa
  - gate: https://www.gate.io/signup/AVNNU1WK?ref_type=103

-->
<!-- template_contributions_end -->

### Contributions & Pull Requests

Contributions are encouraged, I will review any incoming pull requests. See the issues tab for todo items.

<!-- template_star_history -->

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=tiagosiebler/bybit-api,tiagosiebler/okx-api,tiagosiebler/binance,tiagosiebler/bitget-api,tiagosiebler/bitmart-api,tiagosiebler/gateio-api,tiagosiebler/kucoin-api,tiagosiebler/coinbase-api,tiagosiebler/orderbooks,tiagosiebler/accountstate,tiagosiebler/awesome-crypto-examples&type=Date)](https://star-history.com/#tiagosiebler/bybit-api&tiagosiebler/okx-api&tiagosiebler/binance&tiagosiebler/bitget-api&tiagosiebler/bitmart-api&tiagosiebler/gateio-api&tiagosiebler/kucoin-api&tiagosiebler/coinbase-api&tiagosiebler/orderbooks&tiagosiebler/accountstate&tiagosiebler/awesome-crypto-examples&Date)

<!-- template_star_history_end -->
