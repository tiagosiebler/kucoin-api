
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
| [getServiceStatus()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L259) |  | GET | `api/v1/status` |
| [getAccountSummary()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L274) | :closed_lock_with_key:  | GET | `api/v2/user-info` |
| [getApikeyInfo()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L283) | :closed_lock_with_key:  | GET | `api/v1/user/api-key` |
| [getUserType()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L303) | :closed_lock_with_key:  | GET | `api/v1/hf/accounts/opened` |
| [getBalances()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L312) | :closed_lock_with_key:  | GET | `api/v1/accounts` |
| [getAccountDetail()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L323) | :closed_lock_with_key:  | GET | `api/v1/accounts/{accountId}` |
| [getMarginBalance()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L334) | :closed_lock_with_key:  | GET | `api/v3/margin/accounts` |
| [getIsolatedMarginBalance()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L345) | :closed_lock_with_key:  | GET | `api/v3/isolated/accounts` |
| [getTransactions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L358) | :closed_lock_with_key:  | GET | `api/v1/accounts/ledgers` |
| [getHFTransactions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L370) | :closed_lock_with_key:  | GET | `api/v1/hf/accounts/ledgers` |
| [getHFMarginTransactions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L382) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/account/ledgers` |
| [createSubAccount()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L399) | :closed_lock_with_key:  | POST | `api/v2/sub/user/created` |
| [enableSubAccountMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L410) | :closed_lock_with_key:  | POST | `api/v3/sub/user/margin/enable` |
| [enableSubAccountFutures()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L420) | :closed_lock_with_key:  | POST | `api/v3/sub/user/futures/enable` |
| [getSubAccountsV2()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L429) | :closed_lock_with_key:  | GET | `api/v2/sub/user` |
| [getSubAccountBalance()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L440) | :closed_lock_with_key:  | GET | `api/v1/sub-accounts/{subUserId}` |
| [getSubAccountBalancesV2()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L453) | :closed_lock_with_key:  | GET | `api/v2/sub-accounts` |
| [createSubAPI()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L471) | :closed_lock_with_key:  | POST | `api/v1/sub/api-key` |
| [updateSubAPI()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L482) | :closed_lock_with_key:  | POST | `api/v1/sub/api-key/update` |
| [getSubAPIs()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L494) | :closed_lock_with_key:  | GET | `api/v1/sub/api-key` |
| [deleteSubAPI()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L506) | :closed_lock_with_key:  | DELETE | `api/v1/sub/api-key` |
| [createDepositAddressV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L523) | :closed_lock_with_key:  | POST | `api/v3/deposit-address/create` |
| [getDepositAddressesV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L535) | :closed_lock_with_key:  | GET | `api/v3/deposit-addresses` |
| [getDeposits()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L549) | :closed_lock_with_key:  | GET | `api/v1/deposits` |
| [getWithdrawalQuotas()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L566) | :closed_lock_with_key:  | GET | `api/v1/withdrawals/quotas` |
| [submitWithdrawV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L578) | :closed_lock_with_key:  | POST | `api/v3/withdrawals` |
| [cancelWithdrawal()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L591) | :closed_lock_with_key:  | DELETE | `api/v1/withdrawals/{withdrawalId}` |
| [getWithdrawals()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L603) | :closed_lock_with_key:  | GET | `api/v1/withdrawals` |
| [getTransferable()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L620) | :closed_lock_with_key:  | GET | `api/v1/accounts/transferable` |
| [submitFlexTransfer()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L631) | :closed_lock_with_key:  | POST | `api/v3/accounts/universal-transfer` |
| [getBasicUserFee()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L650) | :closed_lock_with_key:  | GET | `api/v1/base-fee` |
| [getTradingPairFee()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L666) | :closed_lock_with_key:  | GET | `api/v1/trade-fees` |
| [getAnnouncements()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L689) |  | GET | `api/v3/announcements` |
| [getCurrency()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L700) |  | GET | `api/v3/currencies/{currency}` |
| [getCurrencies()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L712) |  | GET | `api/v3/currencies` |
| [getSymbol()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L722) |  | GET | `api/v2/symbols/{symbol}` |
| [getSymbols()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L734) |  | GET | `api/v2/symbols` |
| [getTicker()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L747) |  | GET | `api/v1/market/orderbook/level1` |
| [getTickers()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L756) |  | GET | `api/v1/market/allTickers` |
| [getTradeHistories()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L772) |  | GET | `api/v1/market/histories` |
| [getKlines()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L784) |  | GET | `api/v1/market/candles` |
| [getOrderBookLevel20()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L795) |  | GET | `api/v1/market/orderbook/level2_20` |
| [getOrderBookLevel100()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L806) |  | GET | `api/v1/market/orderbook/level2_100` |
| [getFullOrderBook()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L817) | :closed_lock_with_key:  | GET | `api/v3/market/orderbook/level2` |
| [getFiatPrice()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L828) |  | GET | `api/v1/prices` |
| [get24hrStats()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L837) |  | GET | `api/v1/market/stats` |
| [getMarkets()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L848) |  | GET | `api/v1/markets` |
| [submitHFOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L865) | :closed_lock_with_key:  | POST | `api/v1/hf/orders` |
| [submitHFOrderSync()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L881) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/sync` |
| [submitHFOrderTest()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L893) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/test` |
| [submitHFMultipleOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L902) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/multi` |
| [submitHFMultipleOrdersSync()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L914) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/multi/sync` |
| [cancelHFOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L926) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/{orderId}` |
| [cancelHFOrderSync()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L940) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/sync/{orderId}` |
| [cancelHFOrderByClientOId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L956) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/client-order/{clientOid}` |
| [cancelHFOrderSyncByClientOId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L976) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/sync/client-order/{clientOid}` |
| [cancelHFOrdersNumber()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L991) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/cancel/{orderId}` |
| [cancelHFAllOrdersBySymbol()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1005) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders` |
| [cancelHFAllOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1019) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/cancelAll` |
| [updateHFOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1028) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/alter` |
| [getHFOrderDetailsByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1042) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/{orderId}` |
| [getHFOrderDetailsByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1054) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/client-order/{clientOid}` |
| [getHFActiveSymbols()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1069) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/active/symbols` |
| [getHFActiveOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1083) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/active` |
| [getHFCompletedOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1094) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/done` |
| [getHFFilledOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1108) | :closed_lock_with_key:  | GET | `api/v1/hf/fills` |
| [cancelHFOrderAutoSettingQuery()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1123) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/dead-cancel-all/query` |
| [cancelHFOrderAutoSetting()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1136) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/dead-cancel-all` |
| [submitStopOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1153) | :closed_lock_with_key:  | POST | `api/v1/stop-order` |
| [cancelStopOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1164) | :closed_lock_with_key:  | DELETE | `api/v1/stop-order/cancelOrderByClientOid` |
| [cancelStopOrderById()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1184) | :closed_lock_with_key:  | DELETE | `api/v1/stop-order/{orderId}` |
| [cancelStopOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1197) | :closed_lock_with_key:  | DELETE | `api/v1/stop-order/cancel` |
| [getStopOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1210) | :closed_lock_with_key:  | GET | `api/v1/stop-order` |
| [getStopOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1223) | :closed_lock_with_key:  | GET | `api/v1/stop-order/{orderId}` |
| [getStopOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1234) | :closed_lock_with_key:  | GET | `api/v1/stop-order/queryOrderByClientOid` |
| [submitOCOOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1245) | :closed_lock_with_key:  | POST | `api/v3/oco/order` |
| [cancelOCOOrderById()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1257) | :closed_lock_with_key:  | DELETE | `api/v3/oco/order/{orderId}` |
| [cancelOCOOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1270) | :closed_lock_with_key:  | DELETE | `api/v3/oco/client-order/{clientOid}` |
| [cancelMultipleOCOOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1283) | :closed_lock_with_key:  | DELETE | `api/v3/oco/orders` |
| [getOCOOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1299) | :closed_lock_with_key:  | GET | `api/v3/oco/order/{orderId}` |
| [getOCOOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1310) | :closed_lock_with_key:  | GET | `api/v3/oco/client-order/{clientOid}` |
| [getOCOOrderDetails()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1321) | :closed_lock_with_key:  | GET | `api/v3/oco/order/details/{orderId}` |
| [getOCOOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1332) | :closed_lock_with_key:  | GET | `api/v3/oco/orders` |
| [getMarginActivePairsV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1349) | :closed_lock_with_key:  | GET | `api/v3/margin/symbols` |
| [getMarginConfigInfo()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1359) |  | GET | `api/v1/margin/config` |
| [getMarginLeveragedToken()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1368) | :closed_lock_with_key:  | GET | `api/v3/etf/info` |
| [getMarginMarkPrices()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1379) |  | GET | `api/v3/mark-price/all-symbols` |
| [getMarginMarkPrice()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1388) |  | GET | `api/v1/mark-price/{symbol}/current` |
| [getIsolatedMarginSymbolsConfig()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1398) | :closed_lock_with_key:  | GET | `api/v1/isolated/symbols` |
| [submitHFMarginOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1415) | :closed_lock_with_key:  | POST | `api/v3/hf/margin/order` |
| [submitHFMarginOrderTest()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1427) | :closed_lock_with_key:  | POST | `api/v3/hf/margin/order/test` |
| [cancelHFMarginOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1435) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/orders/{orderId}` |
| [cancelHFMarginOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1451) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/orders/client-order/{clientOid}` |
| [cancelHFAllMarginOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1469) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/orders` |
| [getHFMarginOpenSymbols()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1478) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/order/active/symbols` |
| [getHFActiveMarginOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1489) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/orders/active` |
| [getHFMarginFilledOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1500) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/orders/done` |
| [getHFMarginFills()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1514) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/fills` |
| [getHFMarginOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1528) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/orders/{orderId}` |
| [getHFMarginOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1539) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/orders/client-order/{clientOid}?symbol={symbol}` |
| [marginBorrowV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1559) | :closed_lock_with_key:  | POST | `api/v3/margin/borrow` |
| [getMarginBorrowHistoryV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1570) | :closed_lock_with_key:  | GET | `api/v3/margin/borrow` |
| [marginRepayV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1581) | :closed_lock_with_key:  | POST | `api/v3/margin/repay` |
| [getMarginRepayHistoryV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1592) | :closed_lock_with_key:  | GET | `api/v3/margin/repay` |
| [getMarginInterestRecordsV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1603) | :closed_lock_with_key:  | GET | `api/v3/margin/interest` |
| [updateMarginLeverageV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1614) | :closed_lock_with_key:  | POST | `api/v3/position/update-user-leverage` |
| [getLendingCurrencyV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1633) |  | GET | `api/v3/project/list` |
| [getLendingInterestRateV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1644) |  | GET | `api/v3/project/marketInterestRate` |
| [submitLendingSubscriptionV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1660) | :closed_lock_with_key:  | POST | `api/v3/purchase` |
| [updateLendingSubscriptionOrdersV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1677) | :closed_lock_with_key:  | POST | `api/v3/lend/purchase/update` |
| [getLendingSubscriptionOrdersV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1688) | :closed_lock_with_key:  | GET | `api/v3/purchase/orders` |
| [submitLendingRedemptionV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1699) | :closed_lock_with_key:  | POST | `api/v3/redeem` |
| [getLendingRedemptionOrdersV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1716) | :closed_lock_with_key:  | GET | `api/v3/redeem/orders` |
| [getMarginRiskLimitConfig()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1733) | :closed_lock_with_key:  | GET | `api/v3/margin/currencies` |
| [subscribeEarnFixedIncome()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1757) | :closed_lock_with_key:  | POST | `api/v1/earn/orders` |
| [getEarnRedeemPreview()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1768) | :closed_lock_with_key:  | GET | `api/v1/earn/redeem-preview` |
| [submitRedemption()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1779) | :closed_lock_with_key:  | DELETE | `api/v1/earn/orders` |
| [getEarnSavingsProducts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1790) | :closed_lock_with_key:  | GET | `api/v1/earn/saving/products` |
| [getEarnPromotionProducts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1801) | :closed_lock_with_key:  | GET | `api/v1/earn/promotion/products` |
| [getEarnFixedIncomeHoldAssets()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1812) | :closed_lock_with_key:  | GET | `api/v1/earn/hold-assets` |
| [getEarnStakingProducts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1823) | :closed_lock_with_key:  | GET | `api/v1/earn/staking/products` |
| [getEarnKcsStakingProducts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1835) | :closed_lock_with_key:  | GET | `api/v1/earn/kcs-staking/products` |
| [getEarnEthStakingProducts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1847) | :closed_lock_with_key:  | GET | `api/v1/earn/eth-staking/products` |
| [getOtcLoan()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1864) | :closed_lock_with_key:  | GET | `api/v1/otc-loan/loan` |
| [getOtcLoanAccounts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1873) | :closed_lock_with_key:  | GET | `api/v1/otc-loan/accounts` |
| [getAffiliateUserRebateInfo()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1888) | :closed_lock_with_key:  | GET | `api/v2/affiliate/inviter/statistics` |
| [getBrokerRebateOrderDownloadLink()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1907) | :closed_lock_with_key:  | GET | `api/v1/broker/api/rebase/download` |
| [getPublicWSConnectionToken()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1921) |  | POST | `api/v1/bullet-public` |
| [getPrivateWSConnectionToken()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1925) | :closed_lock_with_key:  | POST | `api/v1/bullet-private` |
| [getSubAccountsV1()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1945) | :closed_lock_with_key:  | GET | `api/v1/sub/user` |
| [getSubAccountBalancesV1()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1953) | :closed_lock_with_key:  | GET | `api/v1/sub-accounts` |
| [getMarginBalances()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1967) | :closed_lock_with_key:  | GET | `api/v1/margin/account` |
| [createDepositAddress()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1985) | :closed_lock_with_key:  | POST | `api/v1/deposit-addresses` |
| [getDepositAddressesV2()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1995) | :closed_lock_with_key:  | GET | `api/v2/deposit-addresses` |
| [getDepositAddressV1()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2004) | :closed_lock_with_key:  | GET | `api/v1/deposit-addresses` |
| [getHistoricalDepositsV1()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2015) | :closed_lock_with_key:  | GET | `api/v1/hist-deposits` |
| [getHistoricalWithdrawalsV1()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2031) | :closed_lock_with_key:  | GET | `api/v1/hist-withdrawals` |
| [submitWithdraw()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2040) | :closed_lock_with_key:  | POST | `api/v1/withdrawals` |
| [submitTransferMasterSub()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2056) | :closed_lock_with_key:  | POST | `api/v2/accounts/sub-transfer` |
| [submitInnerTransfer()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2068) | :closed_lock_with_key:  | POST | `api/v2/accounts/inner-transfer` |
| [submitOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2086) | :closed_lock_with_key:  | POST | `api/v1/orders` |
| [submitOrderTest()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2098) | :closed_lock_with_key:  | POST | `api/v1/orders/test` |
| [submitMultipleOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2106) | :closed_lock_with_key:  | POST | `api/v1/orders/multi` |
| [cancelOrderById()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2117) | :closed_lock_with_key:  | DELETE | `api/v1/orders/{orderId}` |
| [cancelOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2129) | :closed_lock_with_key:  | DELETE | `api/v1/order/client-order/{clientOid}` |
| [cancelAllOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2142) | :closed_lock_with_key:  | DELETE | `api/v1/orders` |
| [getOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2154) | :closed_lock_with_key:  | GET | `api/v1/orders` |
| [getRecentOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2164) | :closed_lock_with_key:  | GET | `api/v1/limit/orders` |
| [getOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2175) | :closed_lock_with_key:  | GET | `api/v1/orders/{orderId}` |
| [getOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2185) | :closed_lock_with_key:  | GET | `api/v1/order/client-order/{clientOid}` |
| [getFills()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2201) | :closed_lock_with_key:  | GET | `api/v1/fills` |
| [getRecentFills()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2211) | :closed_lock_with_key:  | GET | `api/v1/limit/fills` |
| [submitMarginOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2225) | :closed_lock_with_key:  | POST | `api/v1/margin/order` |
| [submitMarginOrderTest()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2235) | :closed_lock_with_key:  | POST | `api/v1/margin/order/test` |
| [getIsolatedMarginAccounts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2249) | :closed_lock_with_key:  | GET | `api/v1/isolated/accounts` |
| [getIsolatedMarginAccount()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2259) | :closed_lock_with_key:  | GET | `api/v1/isolated/account/{symbol}` |

# FuturesClient.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [FuturesClient.ts](/src/FuturesClient.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [getBalance()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L96) | :closed_lock_with_key:  | GET | `api/v1/account-overview` |
| [getTransactions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L106) | :closed_lock_with_key:  | GET | `api/v1/transaction-history` |
| [getSubBalances()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L125) | :closed_lock_with_key:  | GET | `api/v1/account-overview-all` |
| [getTradingPairFee()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L144) | :closed_lock_with_key:  | GET | `api/v1/trade-fees` |
| [getSymbol()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L165) |  | GET | `api/v1/contracts/{symbol}` |
| [getSymbols()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L176) |  | GET | `api/v1/contracts/active` |
| [getTicker()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L184) |  | GET | `api/v1/ticker` |
| [getTickers()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L194) |  | GET | `api/v1/allTickers` |
| [getFullOrderBookLevel2()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L202) |  | GET | `api/v1/level2/snapshot` |
| [getPartOrderBookLevel2Depth20()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L212) |  | GET | `api/v1/level2/depth20` |
| [getPartOrderBookLevel2Depth100()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L222) |  | GET | `api/v1/level2/depth100` |
| [getMarketTrades()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L232) |  | GET | `api/v1/trade/history` |
| [getKlines()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L242) |  | GET | `api/v1/kline/query` |
| [getMarkPrice()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L252) |  | GET | `api/v1/mark-price/{symbol}/current` |
| [getIndex()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L262) |  | GET | `api/v1/index/query` |
| [getInterestRates()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L275) |  | GET | `api/v1/interest/query` |
| [getPremiumIndex()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L288) |  | GET | `api/v1/premium/query` |
| [get24HourTransactionVolume()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L301) |  | GET | `api/v1/trade-statistics` |
| [getServiceStatus()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L321) |  | GET | `api/v1/status` |
| [submitOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L335) | :closed_lock_with_key:  | POST | `api/v1/orders` |
| [submitNewOrderTest()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L348) | :closed_lock_with_key:  | POST | `api/v1/orders/test` |
| [submitMultipleOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L359) | :closed_lock_with_key:  | POST | `api/v1/orders/multi` |
| [submitSLTPOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L369) | :closed_lock_with_key:  | POST | `api/v1/st-orders` |
| [cancelOrderById()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L382) | :closed_lock_with_key:  | DELETE | `api/v1/orders/{orderId}` |
| [cancelOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L392) | :closed_lock_with_key:  | DELETE | `api/v1/orders/client-order/{clientOid}` |
| [batchCancelOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L402) | :closed_lock_with_key:  | DELETE | `api/v1/orders/multi-cancel` |
| [cancelAllOrdersV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L414) | :closed_lock_with_key:  | DELETE | `api/v3/orders` |
| [cancelAllStopOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L424) | :closed_lock_with_key:  | DELETE | `api/v1/stopOrders` |
| [getOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L434) | :closed_lock_with_key:  | GET | `api/v1/orders/{orderId}` |
| [getOrderByClientOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L444) | :closed_lock_with_key:  | GET | `api/v1/orders/byClientOid` |
| [getOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L454) | :closed_lock_with_key:  | GET | `api/v1/orders` |
| [getRecentOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L464) | :closed_lock_with_key:  | GET | `api/v1/recentDoneOrders` |
| [getStopOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L474) | :closed_lock_with_key:  | GET | `api/v1/stopOrders` |
| [getOpenOrderStatistics()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L484) | :closed_lock_with_key:  | GET | `api/v1/openOrderStatistics` |
| [getRecentFills()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L494) | :closed_lock_with_key:  | GET | `api/v1/recentFills` |
| [getFills()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L505) | :closed_lock_with_key:  | GET | `api/v1/fills` |
| [getMarginMode()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L521) | :closed_lock_with_key:  | GET | `api/v2/position/getMarginMode` |
| [updateMarginMode()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L534) | :closed_lock_with_key:  | POST | `api/v2/position/changeMarginMode` |
| [getMaxOpenSize()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L550) | :closed_lock_with_key:  | GET | `api/v2/getMaxOpenSize` |
| [getPosition()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L560) | :closed_lock_with_key:  | GET | `api/v1/position` |
| [getPositions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L570) | :closed_lock_with_key:  | GET | `api/v1/positions` |
| [getHistoryPositions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L580) | :closed_lock_with_key:  | GET | `api/v1/history-positions` |
| [getMaxWithdrawMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L594) | :closed_lock_with_key:  | GET | `api/v1/margin/maxWithdrawMargin` |
| [getCrossMarginLeverage()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L604) | :closed_lock_with_key:  | GET | `api/v2/getCrossUserLeverage` |
| [changeCrossMarginLeverage()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L617) | :closed_lock_with_key:  | POST | `api/v2/changeCrossUserLeverage` |
| [depositMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L633) | :closed_lock_with_key:  | POST | `api/v1/position/margin/deposit-margin` |
| [withdrawMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L645) | :closed_lock_with_key:  | POST | `api/v1/margin/withdrawMargin` |
| [getRiskLimitLevel()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L656) | :closed_lock_with_key:  | GET | `api/v1/contracts/risk-limit/{symbol}` |
| [updateRiskLimitLevel()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L666) | :closed_lock_with_key:  | POST | `api/v1/position/risk-limit-level/change` |
| [getFundingRate()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L683) |  | GET | `api/v1/funding-rate/{symbol}/current` |
| [getFundingRates()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L693) |  | GET | `api/v1/contract/funding-rates` |
| [getFundingHistory()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L703) | :closed_lock_with_key:  | GET | `api/v1/funding-history` |
| [getBrokerRebateOrderDownloadLink()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L717) | :closed_lock_with_key:  | GET | `api/v1/broker/api/rebase/download` |
| [getPublicWSConnectionToken()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L731) |  | POST | `api/v1/bullet-public` |
| [getPrivateWSConnectionToken()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L735) | :closed_lock_with_key:  | POST | `api/v1/bullet-private` |