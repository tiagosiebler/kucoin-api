# WebSocket Subscriptions

The examples in this folder demonstrate how to connect to KuCoin WebSockets using Node.js, JavaScript & TypeScript, to receive realtime events from either account updates or market data.

## Versions

### V1

This is the current / end of life generation of KuCoin's APIs. The old API docs can be found here:
https://www.kucoin.com/docs-new

Examples for this version are labelled with "v1" and tend to use the "v1" WsKeys (meaning they use the endpoints and WebSocket domains for the V1 APIs)

### V2 / Pro / Unified / UTA

The new generation of KuCoin's APIs. It was briefly named Unified Trading APIs (UTA), but has more recently been renamed to KuCoin Pro APIs.

All examples for this version are labelled with "v2" and tend to use the "v2" WsKeys. Private WebSocket topics in KuCoin's V2 Pro APIs also share 1 connection (via the "privateProV2" WsKey). Previously in v1 these were split across two different connections.
