
# Endpoint maps

<p align="center">
  <a href="https://www.npmjs.com/package/kucoin-api">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/tiagosiebler/kucoin-api/blob/master/docs/images/logoDarkMode2.svg?raw=true#gh-dark-mode-only">
      <img alt="SDK Logo" src="https://github.com/tiagosiebler/kucoin-api/blob/master/docs/images/logoBrightMode2.svg?raw=true#gh-light-mode-only">
    </picture>
  </a>
</p>

Each REST client is a JavaScript class, which provides functions individually mapped to each endpoint available in the exchange's API offering. 

The following table shows all methods available in each REST client, whether the method requires authentication (automatically handled if API keys are provided), as well as the exact endpoint each method is connected to.

This can be used to easily find which method to call, once you have [found which endpoint you're looking to use](https://github.com/tiagosiebler/awesome-crypto-examples/wiki/How-to-find-SDK-functions-that-match-API-docs-endpoint).

All REST clients are in the [src](/src) folder. For usage examples, make sure to check the [examples](/examples) folder.

List of clients:
- [SpotClient](#SpotClientts)
- [FuturesClient](#FuturesClientts)
- [WebsocketAPIClient](#WebsocketAPIClientts)


If anything is missing or wrong, please open an issue or let us know in our [Node.js Traders](https://t.me/nodetraders) telegram group!

## How to use table

Table consists of 4 parts:

- Function name
- AUTH
- HTTP Method
- Endpoint

**Function name** is the name of the function that can be called through the SDK. Check examples folder in the repo for more help on how to use them!

**AUTH** is a boolean value that indicates if the function requires authentication - which means you need to pass your API key and secret to the SDK.

**HTTP Method** shows HTTP method that the function uses to call the endpoint. Sometimes endpoints can have same URL, but different HTTP method so you can use this column to differentiate between them.

**Endpoint** is the URL that the function uses to call the endpoint. Best way to find exact function you need for the endpoint is to search for URL in this table and find corresponding function name.


# SpotClient.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [SpotClient.ts](/src/SpotClient.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [getMyIp()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L327) |  | GET | `api/v1/ip` |
| [getServiceStatus()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L335) |  | GET | `api/v1/status` |
| [getAccountSummary()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L350) | :closed_lock_with_key:  | GET | `api/v2/user-info` |
| [getApikeyInfo()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L359) | :closed_lock_with_key:  | GET | `api/v1/user/api-key` |
| [getUserType()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L379) | :closed_lock_with_key:  | GET | `api/v1/hf/accounts/opened` |
| [getBalances()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L388) | :closed_lock_with_key:  | GET | `api/v1/accounts` |
| [getAccountDetail()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L399) | :closed_lock_with_key:  | GET | `api/v1/accounts/{accountId}` |
| [getMarginBalance()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L410) | :closed_lock_with_key:  | GET | `api/v3/margin/accounts` |
| [getIsolatedMarginBalance()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L421) | :closed_lock_with_key:  | GET | `api/v3/isolated/accounts` |
| [getTransactions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L434) | :closed_lock_with_key:  | GET | `api/v1/accounts/ledgers` |
| [getHFTransactions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L446) | :closed_lock_with_key:  | GET | `api/v1/hf/accounts/ledgers` |
| [getHFMarginTransactions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L458) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/account/ledgers` |
| [createSubAccount()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L475) | :closed_lock_with_key:  | POST | `api/v2/sub/user/created` |
| [enableSubAccountMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L487) | :closed_lock_with_key:  | POST | `api/v3/sub/user/margin/enable` |
| [enableSubAccountFutures()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L497) | :closed_lock_with_key:  | POST | `api/v3/sub/user/futures/enable` |
| [getSubAccountsV2()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L506) | :closed_lock_with_key:  | GET | `api/v2/sub/user` |
| [getSubAccountBalance()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L518) | :closed_lock_with_key:  | GET | `api/v1/sub-accounts/{subUserId}` |
| [getSubAccountBalancesV2()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L533) | :closed_lock_with_key:  | GET | `api/v2/sub-accounts` |
| [createSubAPI()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L551) | :closed_lock_with_key:  | POST | `api/v1/sub/api-key` |
| [updateSubAPI()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L562) | :closed_lock_with_key:  | POST | `api/v1/sub/api-key/update` |
| [getSubAPIs()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L574) | :closed_lock_with_key:  | GET | `api/v1/sub/api-key` |
| [deleteSubAPI()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L586) | :closed_lock_with_key:  | DELETE | `api/v1/sub/api-key` |
| [createDepositAddressV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L603) | :closed_lock_with_key:  | POST | `api/v3/deposit-address/create` |
| [getDepositAddressesV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L615) | :closed_lock_with_key:  | GET | `api/v3/deposit-addresses` |
| [getDeposits()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L629) | :closed_lock_with_key:  | GET | `api/v1/deposits` |
| [getWithdrawalQuotas()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L646) | :closed_lock_with_key:  | GET | `api/v1/withdrawals/quotas` |
| [submitWithdrawV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L658) | :closed_lock_with_key:  | POST | `api/v3/withdrawals` |
| [cancelWithdrawal()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L671) | :closed_lock_with_key:  | DELETE | `api/v1/withdrawals/{withdrawalId}` |
| [getWithdrawals()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L683) | :closed_lock_with_key:  | GET | `api/v1/withdrawals` |
| [getWithdrawalById()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L694) | :closed_lock_with_key:  | GET | `api/v1/withdrawals/{withdrawalId}` |
| [getTransferable()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L711) | :closed_lock_with_key:  | GET | `api/v1/accounts/transferable` |
| [submitFlexTransfer()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L722) | :closed_lock_with_key:  | POST | `api/v3/accounts/universal-transfer` |
| [getBasicUserFee()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L741) | :closed_lock_with_key:  | GET | `api/v1/base-fee` |
| [getTradingPairFee()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L757) | :closed_lock_with_key:  | GET | `api/v1/trade-fees` |
| [getAnnouncements()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L780) |  | GET | `api/v3/announcements` |
| [getCurrency()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L791) |  | GET | `api/v3/currencies/{currency}` |
| [getCurrencies()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L803) |  | GET | `api/v3/currencies` |
| [getSymbol()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L813) |  | GET | `api/v2/symbols/{symbol}` |
| [getSymbols()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L825) |  | GET | `api/v2/symbols` |
| [getTicker()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L838) |  | GET | `api/v1/market/orderbook/level1` |
| [getTickers()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L847) |  | GET | `api/v1/market/allTickers` |
| [getTradeHistories()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L858) |  | GET | `api/v1/market/histories` |
| [getKlines()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L870) |  | GET | `api/v1/market/candles` |
| [getOrderBookLevel20()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L881) |  | GET | `api/v1/market/orderbook/level2_20` |
| [getOrderBookLevel100()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L892) |  | GET | `api/v1/market/orderbook/level2_100` |
| [getFullOrderBook()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L903) | :closed_lock_with_key:  | GET | `api/v3/market/orderbook/level2` |
| [getCallAuctionPartOrderBook()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L915) |  | GET | `api/v1/market/orderbook/callauction/level2_{size}` |
| [getCallAuctionInfo()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L932) |  | GET | `api/v1/market/callauctionData` |
| [getFiatPrice()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L943) |  | GET | `api/v1/prices` |
| [get24hrStats()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L952) |  | GET | `api/v1/market/stats` |
| [getMarkets()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L963) |  | GET | `api/v1/markets` |
| [submitHFOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L980) | :closed_lock_with_key:  | POST | `api/v1/hf/orders` |
| [submitHFOrderSync()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L996) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/sync` |
| [submitHFOrderTest()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1008) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/test` |
| [submitHFMultipleOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1017) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/multi` |
| [submitHFMultipleOrdersSync()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1029) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/multi/sync` |
| [cancelHFOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1041) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/{orderId}` |
| [cancelHFOrderSync()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1055) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/sync/{orderId}` |
| [cancelHFOrderByClientOId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1071) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/client-order/{clientOid}` |
| [cancelHFOrderSyncByClientOId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1091) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/sync/client-order/{clientOid}` |
| [cancelHFOrdersNumber()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1106) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/cancel/{orderId}` |
| [cancelHFAllOrdersBySymbol()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1121) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders` |
| [cancelHFAllOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1132) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/cancelAll` |
| [updateHFOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1141) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/alter` |
| [getHFOrderDetailsByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1155) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/{orderId}` |
| [getHFOrderDetailsByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1167) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/client-order/{clientOid}` |
| [getHFActiveSymbols()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1182) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/active/symbols` |
| [getHFActiveOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1197) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/active` |
| [getHFActiveOrdersPaginated()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1209) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/active/page` |
| [getHFCompletedOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1231) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/done` |
| [getHFFilledOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1245) | :closed_lock_with_key:  | GET | `api/v1/hf/fills` |
| [cancelHFOrderAutoSettingQuery()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1260) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/dead-cancel-all/query` |
| [cancelHFOrderAutoSetting()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1273) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/dead-cancel-all` |
| [submitStopOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1290) | :closed_lock_with_key:  | POST | `api/v1/stop-order` |
| [cancelStopOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1301) | :closed_lock_with_key:  | DELETE | `api/v1/stop-order/cancelOrderByClientOid` |
| [cancelStopOrderById()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1321) | :closed_lock_with_key:  | DELETE | `api/v1/stop-order/{orderId}` |
| [cancelStopOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1334) | :closed_lock_with_key:  | DELETE | `api/v1/stop-order/cancel` |
| [getStopOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1347) | :closed_lock_with_key:  | GET | `api/v1/stop-order` |
| [getStopOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1360) | :closed_lock_with_key:  | GET | `api/v1/stop-order/{orderId}` |
| [getStopOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1371) | :closed_lock_with_key:  | GET | `api/v1/stop-order/queryOrderByClientOid` |
| [submitOCOOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1383) | :closed_lock_with_key:  | POST | `api/v3/oco/order` |
| [cancelOCOOrderById()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1396) | :closed_lock_with_key:  | DELETE | `api/v3/oco/order/{orderId}` |
| [cancelOCOOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1409) | :closed_lock_with_key:  | DELETE | `api/v3/oco/client-order/{clientOid}` |
| [cancelMultipleOCOOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1422) | :closed_lock_with_key:  | DELETE | `api/v3/oco/orders` |
| [getOCOOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1438) | :closed_lock_with_key:  | GET | `api/v3/oco/order/{orderId}` |
| [getOCOOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1449) | :closed_lock_with_key:  | GET | `api/v3/oco/client-order/{clientOid}` |
| [getOCOOrderDetails()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1460) | :closed_lock_with_key:  | GET | `api/v3/oco/order/details/{orderId}` |
| [getOCOOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1471) | :closed_lock_with_key:  | GET | `api/v3/oco/orders` |
| [getMarginActivePairsV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1488) | :closed_lock_with_key:  | GET | `api/v3/margin/symbols` |
| [getMarginConfigInfo()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1501) |  | GET | `api/v1/margin/config` |
| [getMarginLeveragedToken()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1510) | :closed_lock_with_key:  | GET | `api/v3/etf/info` |
| [getMarginMarkPrices()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1521) |  | GET | `api/v3/mark-price/all-symbols` |
| [getMarginMarkPrice()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1530) |  | GET | `api/v1/mark-price/{symbol}/current` |
| [getIsolatedMarginSymbolsConfig()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1541) | :closed_lock_with_key:  | GET | `api/v1/isolated/symbols` |
| [submitHFMarginOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1558) | :closed_lock_with_key:  | POST | `api/v3/hf/margin/order` |
| [submitHFMarginOrderTest()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1569) | :closed_lock_with_key:  | POST | `api/v3/hf/margin/order/test` |
| [cancelHFMarginOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1580) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/orders/{orderId}` |
| [cancelHFMarginOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1596) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/orders/client-order/{clientOid}` |
| [cancelHFAllMarginOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1615) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/orders` |
| [getHFMarginOpenSymbols()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1627) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/order/active/symbols` |
| [getHFActiveMarginOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1638) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/orders/active` |
| [getHFMarginFilledOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1649) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/orders/done` |
| [getHFMarginFills()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1663) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/fills` |
| [getHFMarginOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1677) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/orders/{orderId}` |
| [getHFMarginOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1689) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/orders/client-order/{clientOid}?symbol={symbol}` |
| [addMarginStopOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1703) | :closed_lock_with_key:  | POST | `api/v3/hf/margin/stop-order` |
| [cancelMarginStopOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1714) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/stop-order/cancel-by-id?orderId={orderId}` |
| [cancelMarginStopOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1727) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/stop-order/cancel-by-clientOid` |
| [batchCancelMarginStopOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1741) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/stop-order/cancel` |
| [getMarginStopOrdersList()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1752) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/stop-orders` |
| [getMarginStopOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1763) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/stop-order/orderId?orderId={orderId}` |
| [getMarginStopOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1776) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/stop-order/clientOid` |
| [addMarginOcoOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1787) | :closed_lock_with_key:  | POST | `api/v3/hf/margin/oco-order` |
| [cancelMarginOcoOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1798) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/oco-order/cancel-by-id?orderId={orderId}` |
| [cancelMarginOcoOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1811) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/oco-order/cancel-by-clientOid` |
| [batchCancelMarginOcoOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1825) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/oco-order/cancel` |
| [getMarginOcoOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1836) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/oco-order/clientOid` |
| [getMarginOcoOrderDetailByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1847) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/oco-order/detail/orderId?orderId={orderId}` |
| [getBorrowInterestRate()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1866) | :closed_lock_with_key:  | GET | `api/v3/margin/borrowRate` |
| [marginBorrowV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1877) | :closed_lock_with_key:  | POST | `api/v3/margin/borrow` |
| [getMarginBorrowHistoryV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1888) | :closed_lock_with_key:  | GET | `api/v3/margin/borrow` |
| [marginRepayV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1899) | :closed_lock_with_key:  | POST | `api/v3/margin/repay` |
| [getMarginRepayHistoryV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1910) | :closed_lock_with_key:  | GET | `api/v3/margin/repay` |
| [getMarginInterestRecordsV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1921) | :closed_lock_with_key:  | GET | `api/v3/margin/interest` |
| [updateMarginLeverageV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1932) | :closed_lock_with_key:  | POST | `api/v3/position/update-user-leverage` |
| [getLendingCurrencyV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1951) |  | GET | `api/v3/project/list` |
| [getLendingInterestRateV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1962) |  | GET | `api/v3/project/marketInterestRate` |
| [submitLendingSubscriptionV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1978) | :closed_lock_with_key:  | POST | `api/v3/purchase` |
| [updateLendingSubscriptionOrdersV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1995) | :closed_lock_with_key:  | POST | `api/v3/lend/purchase/update` |
| [getLendingSubscriptionOrdersV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2006) | :closed_lock_with_key:  | GET | `api/v3/purchase/orders` |
| [submitLendingRedemptionV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2017) | :closed_lock_with_key:  | POST | `api/v3/redeem` |
| [getLendingRedemptionOrdersV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2034) | :closed_lock_with_key:  | GET | `api/v3/redeem/orders` |
| [getMarginRiskLimitConfig()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2051) | :closed_lock_with_key:  | GET | `api/v3/margin/currencies` |
| [getConvertSymbol()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2068) |  | GET | `api/v1/convert/symbol` |
| [getConvertCurrencies()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2079) |  | GET | `api/v1/convert/currencies` |
| [submitConvertOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2088) | :closed_lock_with_key:  | POST | `api/v1/convert/order` |
| [getConvertQuote()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2099) | :closed_lock_with_key:  | GET | `api/v1/convert/quote` |
| [getConvertOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2110) | :closed_lock_with_key:  | GET | `api/v1/convert/order/detail` |
| [getConvertOrderHistory()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2121) | :closed_lock_with_key:  | GET | `api/v1/convert/order/history` |
| [submitConvertLimitOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2132) | :closed_lock_with_key:  | POST | `api/v1/convert/limit/order` |
| [getConvertLimitQuote()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2143) | :closed_lock_with_key:  | GET | `api/v1/convert/limit/quote` |
| [getConvertLimitOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2154) | :closed_lock_with_key:  | GET | `api/v1/convert/limit/order/detail` |
| [getConvertLimitOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2165) | :closed_lock_with_key:  | GET | `api/v1/convert/limit/orders` |
| [cancelConvertLimitOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2176) | :closed_lock_with_key:  | DELETE | `api/v1/convert/limit/order/cancel` |
| [subscribeEarnFixedIncome()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2194) | :closed_lock_with_key:  | POST | `api/v1/earn/orders` |
| [getEarnRedeemPreview()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2205) | :closed_lock_with_key:  | GET | `api/v1/earn/redeem-preview` |
| [submitRedemption()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2216) | :closed_lock_with_key:  | DELETE | `api/v1/earn/orders` |
| [getEarnSavingsProducts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2227) | :closed_lock_with_key:  | GET | `api/v1/earn/saving/products` |
| [getEarnPromotionProducts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2238) | :closed_lock_with_key:  | GET | `api/v1/earn/promotion/products` |
| [getEarnFixedIncomeHoldAssets()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2249) | :closed_lock_with_key:  | GET | `api/v1/earn/hold-assets` |
| [getEarnStakingProducts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2260) | :closed_lock_with_key:  | GET | `api/v1/earn/staking/products` |
| [getEarnKcsStakingProducts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2272) | :closed_lock_with_key:  | GET | `api/v1/earn/kcs-staking/products` |
| [getEarnEthStakingProducts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2284) | :closed_lock_with_key:  | GET | `api/v1/earn/eth-staking/products` |
| [submitStructuredProductPurchase()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2301) | :closed_lock_with_key:  | POST | `api/v1/struct-earn/orders` |
| [getDualInvestmentProducts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2312) |  | GET | `api/v1/struct-earn/dual/products` |
| [getStructuredProductOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2323) | :closed_lock_with_key:  | GET | `api/v1/struct-earn/orders` |
| [getDiscountRateConfigs()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2341) | :closed_lock_with_key:  | GET | `api/v1/otc-loan/discount-rate-configs` |
| [getOtcLoan()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2352) | :closed_lock_with_key:  | GET | `api/v1/otc-loan/loan` |
| [getOtcLoanAccounts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2361) | :closed_lock_with_key:  | GET | `api/v1/otc-loan/accounts` |
| [getAffiliateUserRebateInfo()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2377) | :closed_lock_with_key:  | GET | `api/v2/affiliate/inviter/statistics` |
| [getAffiliateInvitees()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2386) | :closed_lock_with_key:  | GET | `api/v2/affiliate/queryInvitees` |
| [getAffiliateCommission()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2397) | :closed_lock_with_key:  | GET | `api/v2/affiliate/queryMyCommission` |
| [getAffiliateTradeHistory()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2408) | :closed_lock_with_key:  | GET | `api/v2/affiliate/queryTransactionByUid` |
| [getAffiliateTransaction()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2419) | :closed_lock_with_key:  | GET | `api/v2/affiliate/queryTransactionByTime` |
| [getBrokerRebateOrderDownloadLink()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2436) | :closed_lock_with_key:  | GET | `api/v1/broker/api/rebase/download` |
| [getPublicWSConnectionToken()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2450) |  | POST | `api/v1/bullet-public` |
| [getPrivateWSConnectionToken()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2454) | :closed_lock_with_key:  | POST | `api/v1/bullet-private` |
| [getSubAccountsV1()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2474) | :closed_lock_with_key:  | GET | `api/v1/sub/user` |
| [getSubAccountBalancesV1()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2482) | :closed_lock_with_key:  | GET | `api/v1/sub-accounts` |
| [getMarginBalances()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2496) | :closed_lock_with_key:  | GET | `api/v1/margin/account` |
| [createDepositAddress()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2514) | :closed_lock_with_key:  | POST | `api/v1/deposit-addresses` |
| [getDepositAddressesV2()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2524) | :closed_lock_with_key:  | GET | `api/v2/deposit-addresses` |
| [getDepositAddressV1()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2533) | :closed_lock_with_key:  | GET | `api/v1/deposit-addresses` |
| [getHistoricalDepositsV1()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2544) | :closed_lock_with_key:  | GET | `api/v1/hist-deposits` |
| [getHistoricalWithdrawalsV1()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2560) | :closed_lock_with_key:  | GET | `api/v1/hist-withdrawals` |
| [submitWithdraw()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2569) | :closed_lock_with_key:  | POST | `api/v1/withdrawals` |
| [submitTransferMasterSub()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2585) | :closed_lock_with_key:  | POST | `api/v2/accounts/sub-transfer` |
| [submitInnerTransfer()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2597) | :closed_lock_with_key:  | POST | `api/v2/accounts/inner-transfer` |
| [submitOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2615) | :closed_lock_with_key:  | POST | `api/v1/orders` |
| [submitOrderTest()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2627) | :closed_lock_with_key:  | POST | `api/v1/orders/test` |
| [submitMultipleOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2635) | :closed_lock_with_key:  | POST | `api/v1/orders/multi` |
| [cancelOrderById()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2646) | :closed_lock_with_key:  | DELETE | `api/v1/orders/{orderId}` |
| [cancelOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2658) | :closed_lock_with_key:  | DELETE | `api/v1/order/client-order/{clientOid}` |
| [cancelAllOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2671) | :closed_lock_with_key:  | DELETE | `api/v1/orders` |
| [getOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2683) | :closed_lock_with_key:  | GET | `api/v1/orders` |
| [getRecentOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2693) | :closed_lock_with_key:  | GET | `api/v1/limit/orders` |
| [getOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2704) | :closed_lock_with_key:  | GET | `api/v1/orders/{orderId}` |
| [getOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2714) | :closed_lock_with_key:  | GET | `api/v1/order/client-order/{clientOid}` |
| [getFills()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2730) | :closed_lock_with_key:  | GET | `api/v1/fills` |
| [getRecentFills()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2740) | :closed_lock_with_key:  | GET | `api/v1/limit/fills` |
| [submitMarginOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2754) | :closed_lock_with_key:  | POST | `api/v1/margin/order` |
| [submitMarginOrderTest()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2764) | :closed_lock_with_key:  | POST | `api/v1/margin/order/test` |
| [getIsolatedMarginAccounts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2778) | :closed_lock_with_key:  | GET | `api/v1/isolated/accounts` |
| [getIsolatedMarginAccount()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2788) | :closed_lock_with_key:  | GET | `api/v1/isolated/account/{symbol}` |

# FuturesClient.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [FuturesClient.ts](/src/FuturesClient.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [getBalance()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L102) | :closed_lock_with_key:  | GET | `api/v1/account-overview` |
| [getTransactions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L112) | :closed_lock_with_key:  | GET | `api/v1/transaction-history` |
| [getSubBalances()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L131) | :closed_lock_with_key:  | GET | `api/v1/account-overview-all` |
| [getTradingPairFee()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L150) | :closed_lock_with_key:  | GET | `api/v1/trade-fees` |
| [getSymbol()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L171) |  | GET | `api/v1/contracts/{symbol}` |
| [getSymbols()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L182) |  | GET | `api/v1/contracts/active` |
| [getTicker()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L190) |  | GET | `api/v1/ticker` |
| [getTickers()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L200) |  | GET | `api/v1/allTickers` |
| [getFullOrderBookLevel2()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L208) |  | GET | `api/v1/level2/snapshot` |
| [getPartOrderBookLevel2Depth20()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L218) |  | GET | `api/v1/level2/depth20` |
| [getPartOrderBookLevel2Depth100()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L228) |  | GET | `api/v1/level2/depth100` |
| [getMarketTrades()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L238) |  | GET | `api/v1/trade/history` |
| [getKlines()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L248) |  | GET | `api/v1/kline/query` |
| [getMarkPrice()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L258) |  | GET | `api/v1/mark-price/{symbol}/current` |
| [getIndex()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L268) |  | GET | `api/v1/index/query` |
| [getInterestRates()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L281) |  | GET | `api/v1/interest/query` |
| [getPremiumIndex()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L294) |  | GET | `api/v1/premium/query` |
| [get24HourTransactionVolume()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L307) |  | GET | `api/v1/trade-statistics` |
| [getServiceStatus()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L327) |  | GET | `api/v1/status` |
| [submitOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L341) | :closed_lock_with_key:  | POST | `api/v1/orders` |
| [submitNewOrderTest()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L354) | :closed_lock_with_key:  | POST | `api/v1/orders/test` |
| [submitMultipleOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L365) | :closed_lock_with_key:  | POST | `api/v1/orders/multi` |
| [submitSLTPOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L375) | :closed_lock_with_key:  | POST | `api/v1/st-orders` |
| [cancelOrderById()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L388) | :closed_lock_with_key:  | DELETE | `api/v1/orders/{orderId}` |
| [cancelOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L398) | :closed_lock_with_key:  | DELETE | `api/v1/orders/client-order/{clientOid}` |
| [batchCancelOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L412) | :closed_lock_with_key:  | DELETE | `api/v1/orders/multi-cancel` |
| [cancelAllOrdersV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L422) | :closed_lock_with_key:  | DELETE | `api/v3/orders` |
| [cancelAllStopOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L432) | :closed_lock_with_key:  | DELETE | `api/v1/stopOrders` |
| [getOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L442) | :closed_lock_with_key:  | GET | `api/v1/orders/{orderId}` |
| [getOrderByClientOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L452) | :closed_lock_with_key:  | GET | `api/v1/orders/byClientOid` |
| [getOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L462) | :closed_lock_with_key:  | GET | `api/v1/orders` |
| [getRecentOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L472) | :closed_lock_with_key:  | GET | `api/v1/recentDoneOrders` |
| [getStopOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L482) | :closed_lock_with_key:  | GET | `api/v1/stopOrders` |
| [getOpenOrderStatistics()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L492) | :closed_lock_with_key:  | GET | `api/v1/openOrderStatistics` |
| [getRecentFills()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L502) | :closed_lock_with_key:  | GET | `api/v1/recentFills` |
| [getFills()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L513) | :closed_lock_with_key:  | GET | `api/v1/fills` |
| [getMarginMode()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L529) | :closed_lock_with_key:  | GET | `api/v2/position/getMarginMode` |
| [updateMarginMode()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L542) | :closed_lock_with_key:  | POST | `api/v2/position/changeMarginMode` |
| [batchSwitchMarginMode()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L558) | :closed_lock_with_key:  | POST | `api/v2/position/batchChangeMarginMode` |
| [getMaxOpenSize()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L569) | :closed_lock_with_key:  | GET | `api/v2/getMaxOpenSize` |
| [getPosition()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L579) | :closed_lock_with_key:  | GET | `api/v1/position` |
| [getPositions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L589) | :closed_lock_with_key:  | GET | `api/v1/positions` |
| [getHistoryPositions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L599) | :closed_lock_with_key:  | GET | `api/v1/history-positions` |
| [getMaxWithdrawMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L613) | :closed_lock_with_key:  | GET | `api/v1/margin/maxWithdrawMargin` |
| [getCrossMarginLeverage()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L623) | :closed_lock_with_key:  | GET | `api/v2/getCrossUserLeverage` |
| [changeCrossMarginLeverage()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L636) | :closed_lock_with_key:  | POST | `api/v2/changeCrossUserLeverage` |
| [depositMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L652) | :closed_lock_with_key:  | POST | `api/v1/position/margin/deposit-margin` |
| [getCrossMarginRiskLimit()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L664) | :closed_lock_with_key:  | GET | `api/v2/batchGetCrossOrderLimit` |
| [withdrawMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L676) | :closed_lock_with_key:  | POST | `api/v1/margin/withdrawMargin` |
| [getCrossMarginRequirement()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L687) | :closed_lock_with_key:  | GET | `api/v2/getCrossModeMarginRequirement` |
| [getRiskLimitLevel()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L699) | :closed_lock_with_key:  | GET | `api/v1/contracts/risk-limit/{symbol}` |
| [updateRiskLimitLevel()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L709) | :closed_lock_with_key:  | POST | `api/v1/position/risk-limit-level/change` |
| [updatePositionMode()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L720) | :closed_lock_with_key:  | POST | `api/v2/position/switchPositionMode` |
| [getFundingRate()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L738) | :closed_lock_with_key:  | GET | `api/v1/funding-rate/{symbol}/current` |
| [getFundingRates()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L748) | :closed_lock_with_key:  | GET | `api/v1/contract/funding-rates` |
| [getFundingHistory()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L758) | :closed_lock_with_key:  | GET | `api/v1/funding-history` |
| [submitCopyTradeOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L777) | :closed_lock_with_key:  | POST | `api/v1/copy-trade/futures/orders` |
| [submitCopyTradeOrderTest()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L791) | :closed_lock_with_key:  | POST | `api/v1/copy-trade/futures/orders/test` |
| [submitCopyTradeSLTPOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L804) | :closed_lock_with_key:  | POST | `api/v1/copy-trade/futures/st-orders` |
| [cancelCopyTradeOrderById()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L817) | :closed_lock_with_key:  | DELETE | `api/v1/copy-trade/futures/orders` |
| [cancelCopyTradeOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L827) | :closed_lock_with_key:  | DELETE | `api/v1/copy-trade/futures/orders/client-order` |
| [getCopyTradeMaxOpenSize()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L841) | :closed_lock_with_key:  | GET | `api/v1/copy-trade/futures/get-max-open-size` |
| [getCopyTradeMaxWithdrawMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L862) | :closed_lock_with_key:  | GET | `api/v1/copy-trade/futures/position/margin/max-withdraw-margin` |
| [addCopyTradeIsolatedMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L875) | :closed_lock_with_key:  | POST | `api/v1/copy-trade/futures/position/margin/deposit-margin` |
| [removeCopyTradeIsolatedMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L890) | :closed_lock_with_key:  | POST | `api/v1/copy-trade/futures/position/margin/withdraw-margin` |
| [modifyCopyTradeRiskLimitLevel()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L905) | :closed_lock_with_key:  | POST | `api/v1/copy-trade/futures/position/risk-limit-level/change` |
| [updateCopyTradeAutoDepositStatus()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L920) | :closed_lock_with_key:  | POST | `api/v1/copy-trade/futures/position/margin/auto-deposit-status` |
| [getBrokerRebateOrderDownloadLink()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L940) | :closed_lock_with_key:  | GET | `api/v1/broker/api/rebase/download` |
| [getPublicWSConnectionToken()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L954) |  | POST | `api/v1/bullet-public` |
| [getPrivateWSConnectionToken()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L958) | :closed_lock_with_key:  | POST | `api/v1/bullet-private` |
| [submitTransferOut()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L971) | :closed_lock_with_key:  | POST | `api/v3/transfer-out` |
| [submitTransferIn()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L982) | :closed_lock_with_key:  | POST | `api/v1/transfer-in` |
| [getTransfers()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L993) | :closed_lock_with_key:  | GET | `api/v1/transfer-list` |
| [updateAutoDepositStatus()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L1008) | :closed_lock_with_key:  | POST | `api/v1/position/margin/auto-deposit-status` |

# WebsocketAPIClient.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [WebsocketAPIClient.ts](/src/WebsocketAPIClient.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [submitNewSpotOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/WebsocketAPIClient.ts#L88) | :closed_lock_with_key:  | WS | `spot.order` |
| [modifySpotOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/WebsocketAPIClient.ts#L102) | :closed_lock_with_key:  | WS | `spot.modify` |
| [cancelSpotOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/WebsocketAPIClient.ts#L116) | :closed_lock_with_key:  | WS | `spot.cancel` |
| [submitSyncSpotOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/WebsocketAPIClient.ts#L130) | :closed_lock_with_key:  | WS | `spot.sync_order` |
| [cancelSyncSpotOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/WebsocketAPIClient.ts#L144) | :closed_lock_with_key:  | WS | `spot.sync_cancel` |
| [submitMarginOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/WebsocketAPIClient.ts#L158) | :closed_lock_with_key:  | WS | `margin.order` |
| [cancelMarginOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/WebsocketAPIClient.ts#L172) | :closed_lock_with_key:  | WS | `margin.cancel` |
| [submitFuturesOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/WebsocketAPIClient.ts#L186) | :closed_lock_with_key:  | WS | `futures.order` |
| [cancelFuturesOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/WebsocketAPIClient.ts#L200) | :closed_lock_with_key:  | WS | `futures.cancel` |
| [submitMultipleFuturesOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/WebsocketAPIClient.ts#L216) | :closed_lock_with_key:  | WS | `futures.multi_order` |
| [cancelMultipleFuturesOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/WebsocketAPIClient.ts#L230) | :closed_lock_with_key:  | WS | `futures.multi_cancel` |