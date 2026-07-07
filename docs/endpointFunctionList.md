
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
- [UnifiedAPIClient](#UnifiedAPIClientts)


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
| [getMyIp()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L321) |  | GET | `api/v1/ip` |
| [getServiceStatus()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L329) |  | GET | `api/v1/status` |
| [getAccountSummary()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L344) | :closed_lock_with_key:  | GET | `api/v2/user-info` |
| [getKYCRegions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L353) | :closed_lock_with_key:  | GET | `api/kyc/regions/v4` |
| [getApikeyInfo()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L363) | :closed_lock_with_key:  | GET | `api/v1/user/api-key` |
| [getUserType()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L372) | :closed_lock_with_key:  | GET | `api/v1/hf/accounts/opened` |
| [getBalances()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L381) | :closed_lock_with_key:  | GET | `api/v1/accounts` |
| [getAccountDetail()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L392) | :closed_lock_with_key:  | GET | `api/v1/accounts/{accountId}` |
| [getMarginBalance()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L403) | :closed_lock_with_key:  | GET | `api/v3/margin/accounts` |
| [getIsolatedMarginBalance()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L414) | :closed_lock_with_key:  | GET | `api/v3/isolated/accounts` |
| [getTransactions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L427) | :closed_lock_with_key:  | GET | `api/v1/accounts/ledgers` |
| [getHFTransactions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L439) | :closed_lock_with_key:  | GET | `api/v1/hf/accounts/ledgers` |
| [getHFMarginTransactions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L451) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/account/ledgers` |
| [createSubAccount()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L468) | :closed_lock_with_key:  | POST | `api/v2/sub/user/created` |
| [enableSubAccountMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L480) | :closed_lock_with_key:  | POST | `api/v3/sub/user/margin/enable` |
| [enableSubAccountFutures()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L490) | :closed_lock_with_key:  | POST | `api/v3/sub/user/futures/enable` |
| [getSubAccountsV2()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L499) | :closed_lock_with_key:  | GET | `api/v2/sub/user` |
| [getSubAccountBalance()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L511) | :closed_lock_with_key:  | GET | `api/v1/sub-accounts/{subUserId}` |
| [getSubAccountBalancesV2()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L526) | :closed_lock_with_key:  | GET | `api/v2/sub-accounts` |
| [createSubAPI()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L544) | :closed_lock_with_key:  | POST | `api/v1/sub/api-key` |
| [updateSubAPI()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L555) | :closed_lock_with_key:  | POST | `api/v1/sub/api-key/update` |
| [getSubAPIs()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L567) | :closed_lock_with_key:  | GET | `api/v1/sub/api-key` |
| [deleteSubAPI()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L579) | :closed_lock_with_key:  | DELETE | `api/v1/sub/api-key` |
| [createDepositAddressV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L596) | :closed_lock_with_key:  | POST | `api/v3/deposit-address/create` |
| [getDepositAddressesV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L608) | :closed_lock_with_key:  | GET | `api/v3/deposit-addresses` |
| [getDeposits()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L622) | :closed_lock_with_key:  | GET | `api/v1/deposits` |
| [getWithdrawalQuotas()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L639) | :closed_lock_with_key:  | GET | `api/v1/withdrawals/quotas` |
| [submitWithdrawV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L651) | :closed_lock_with_key:  | POST | `api/v3/withdrawals` |
| [cancelWithdrawal()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L664) | :closed_lock_with_key:  | DELETE | `api/v1/withdrawals/{withdrawalId}` |
| [getWithdrawals()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L676) | :closed_lock_with_key:  | GET | `api/v1/withdrawals` |
| [getWithdrawalById()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L687) | :closed_lock_with_key:  | GET | `api/v1/withdrawals/{withdrawalId}` |
| [getTransferable()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L705) | :closed_lock_with_key:  | GET | `api/v1/accounts/transferable` |
| [submitFlexTransfer()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L717) | :closed_lock_with_key:  | POST | `api/v3/accounts/universal-transfer` |
| [getBasicUserFee()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L736) | :closed_lock_with_key:  | GET | `api/v1/base-fee` |
| [getTradingPairFee()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L752) | :closed_lock_with_key:  | GET | `api/v1/trade-fees` |
| [getAnnouncements()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L775) |  | GET | `api/v3/announcements` |
| [getCurrency()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L786) |  | GET | `api/v3/currencies/{currency}` |
| [getCurrencies()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L798) |  | GET | `api/v3/currencies` |
| [getSymbol()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L808) |  | GET | `api/v2/symbols/{symbol}` |
| [getSymbols()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L820) |  | GET | `api/v2/symbols` |
| [getTicker()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L833) |  | GET | `api/v1/market/orderbook/level1` |
| [getTickers()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L842) |  | GET | `api/v1/market/allTickers` |
| [getTradeHistories()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L853) |  | GET | `api/v1/market/histories` |
| [getKlines()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L865) |  | GET | `api/v1/market/candles` |
| [getOrderBookLevel20()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L876) |  | GET | `api/v1/market/orderbook/level2_20` |
| [getOrderBookLevel100()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L887) |  | GET | `api/v1/market/orderbook/level2_100` |
| [getFullOrderBook()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L898) | :closed_lock_with_key:  | GET | `api/v3/market/orderbook/level2` |
| [getCallAuctionPartOrderBook()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L910) |  | GET | `api/v1/market/orderbook/callauction/level2_{size}` |
| [getCallAuctionInfo()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L927) |  | GET | `api/v1/market/callauctionData` |
| [getFiatPrice()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L938) |  | GET | `api/v1/prices` |
| [get24hrStats()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L947) |  | GET | `api/v1/market/stats` |
| [getMarkets()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L958) |  | GET | `api/v1/markets` |
| [submitHFOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L975) | :closed_lock_with_key:  | POST | `api/v1/hf/orders` |
| [submitHFOrderSync()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L991) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/sync` |
| [submitHFOrderTest()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1003) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/test` |
| [submitHFMultipleOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1012) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/multi` |
| [submitHFMultipleOrdersSync()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1024) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/multi/sync` |
| [cancelHFOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1036) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/{orderId}` |
| [cancelHFOrderSync()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1050) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/sync/{orderId}` |
| [cancelHFOrderByClientOId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1066) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/client-order/{clientOid}` |
| [cancelHFOrderSyncByClientOId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1086) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/sync/client-order/{clientOid}` |
| [cancelHFOrdersNumber()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1101) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/cancel/{orderId}` |
| [cancelHFAllOrdersBySymbol()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1116) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders` |
| [cancelHFAllOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1127) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/cancelAll` |
| [updateHFOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1136) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/alter` |
| [getHFOrderDetailsByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1150) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/{orderId}` |
| [getHFOrderDetailsByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1162) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/client-order/{clientOid}` |
| [getHFActiveSymbols()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1177) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/active/symbols` |
| [getHFActiveOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1192) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/active` |
| [getHFActiveOrdersPaginated()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1204) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/active/page` |
| [getHFCompletedOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1226) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/done` |
| [getHFFilledOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1240) | :closed_lock_with_key:  | GET | `api/v1/hf/fills` |
| [cancelHFOrderAutoSettingQuery()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1255) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/dead-cancel-all/query` |
| [cancelHFOrderAutoSetting()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1268) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/dead-cancel-all` |
| [submitStopOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1285) | :closed_lock_with_key:  | POST | `api/v1/stop-order` |
| [cancelStopOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1296) | :closed_lock_with_key:  | DELETE | `api/v1/stop-order/cancelOrderByClientOid` |
| [cancelStopOrderById()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1316) | :closed_lock_with_key:  | DELETE | `api/v1/stop-order/{orderId}` |
| [cancelStopOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1329) | :closed_lock_with_key:  | DELETE | `api/v1/stop-order/cancel` |
| [getStopOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1342) | :closed_lock_with_key:  | GET | `api/v1/stop-order` |
| [getStopOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1355) | :closed_lock_with_key:  | GET | `api/v1/stop-order/{orderId}` |
| [getStopOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1366) | :closed_lock_with_key:  | GET | `api/v1/stop-order/queryOrderByClientOid` |
| [submitOCOOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1378) | :closed_lock_with_key:  | POST | `api/v3/oco/order` |
| [cancelOCOOrderById()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1391) | :closed_lock_with_key:  | DELETE | `api/v3/oco/order/{orderId}` |
| [cancelOCOOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1404) | :closed_lock_with_key:  | DELETE | `api/v3/oco/client-order/{clientOid}` |
| [cancelMultipleOCOOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1417) | :closed_lock_with_key:  | DELETE | `api/v3/oco/orders` |
| [getOCOOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1433) | :closed_lock_with_key:  | GET | `api/v3/oco/order/{orderId}` |
| [getOCOOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1444) | :closed_lock_with_key:  | GET | `api/v3/oco/client-order/{clientOid}` |
| [getOCOOrderDetails()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1455) | :closed_lock_with_key:  | GET | `api/v3/oco/order/details/{orderId}` |
| [getOCOOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1466) | :closed_lock_with_key:  | GET | `api/v3/oco/orders` |
| [getMarginActivePairsV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1483) | :closed_lock_with_key:  | GET | `api/v3/margin/symbols` |
| [getMarginConfigInfo()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1496) |  | GET | `api/v1/margin/config` |
| [getMarginLeveragedToken()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1506) | :closed_lock_with_key:  | GET | `api/v3/etf/info` |
| [getMarginMarkPrices()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1517) |  | GET | `api/v3/mark-price/all-symbols` |
| [getMarginMarkPrice()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1526) |  | GET | `api/v1/mark-price/{symbol}/current` |
| [getIsolatedMarginSymbolsConfig()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1537) | :closed_lock_with_key:  | GET | `api/v1/isolated/symbols` |
| [getMarginCollateralRatio()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1548) |  | GET | `api/v3/margin/collateralRatio` |
| [getMarketAvailableInventory()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1559) |  | GET | `api/v3/margin/available-inventory` |
| [submitHFMarginOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1576) | :closed_lock_with_key:  | POST | `api/v3/hf/margin/order` |
| [submitHFMarginOrderTest()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1587) | :closed_lock_with_key:  | POST | `api/v3/hf/margin/order/test` |
| [cancelHFMarginOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1598) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/orders/{orderId}` |
| [cancelHFMarginOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1614) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/orders/client-order/{clientOid}` |
| [cancelHFAllMarginOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1633) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/orders` |
| [getHFMarginOpenSymbols()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1645) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/order/active/symbols` |
| [getHFActiveMarginOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1656) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/orders/active` |
| [getHFMarginFilledOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1667) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/orders/done` |
| [getHFMarginFills()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1681) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/fills` |
| [getHFMarginOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1695) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/orders/{orderId}` |
| [getHFMarginOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1707) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/orders/client-order/{clientOid}?symbol={symbol}` |
| [addMarginStopOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1721) | :closed_lock_with_key:  | POST | `api/v3/hf/margin/stop-order` |
| [cancelMarginStopOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1732) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/stop-order/cancel-by-id?orderId={orderId}` |
| [cancelMarginStopOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1745) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/stop-order/cancel-by-clientOid` |
| [batchCancelMarginStopOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1759) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/stop-order/cancel` |
| [getMarginStopOrdersList()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1770) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/stop-orders` |
| [getMarginStopOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1781) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/stop-order/orderId?orderId={orderId}` |
| [getMarginStopOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1794) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/stop-order/clientOid` |
| [addMarginOcoOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1805) | :closed_lock_with_key:  | POST | `api/v3/hf/margin/oco-order` |
| [cancelMarginOcoOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1816) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/oco-order/cancel-by-id?orderId={orderId}` |
| [cancelMarginOcoOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1829) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/oco-order/cancel-by-clientOid` |
| [batchCancelMarginOcoOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1843) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/oco-order/cancel` |
| [getMarginOcoOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1854) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/oco-order/clientOid` |
| [getMarginOcoOrderDetailByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1865) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/oco-order/detail/orderId?orderId={orderId}` |
| [getBorrowInterestRate()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1884) | :closed_lock_with_key:  | GET | `api/v3/margin/borrowRate` |
| [marginBorrowV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1895) | :closed_lock_with_key:  | POST | `api/v3/margin/borrow` |
| [getMarginBorrowHistoryV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1906) | :closed_lock_with_key:  | GET | `api/v3/margin/borrow` |
| [marginRepayV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1917) | :closed_lock_with_key:  | POST | `api/v3/margin/repay` |
| [getMarginRepayHistoryV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1928) | :closed_lock_with_key:  | GET | `api/v3/margin/repay` |
| [getMarginInterestRecordsV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1939) | :closed_lock_with_key:  | GET | `api/v3/margin/interest` |
| [updateMarginLeverageV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1950) | :closed_lock_with_key:  | POST | `api/v3/position/update-user-leverage` |
| [getLendingCurrencyV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1969) |  | GET | `api/v3/project/list` |
| [getLendingInterestRateV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1980) |  | GET | `api/v3/project/marketInterestRate` |
| [submitLendingSubscriptionV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1996) | :closed_lock_with_key:  | POST | `api/v3/purchase` |
| [updateLendingSubscriptionOrdersV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2013) | :closed_lock_with_key:  | POST | `api/v3/lend/purchase/update` |
| [getLendingSubscriptionOrdersV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2024) | :closed_lock_with_key:  | GET | `api/v3/purchase/orders` |
| [submitLendingRedemptionV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2035) | :closed_lock_with_key:  | POST | `api/v3/redeem` |
| [getLendingRedemptionOrdersV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2052) | :closed_lock_with_key:  | GET | `api/v3/redeem/orders` |
| [getMarginRiskLimitConfig()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2069) | :closed_lock_with_key:  | GET | `api/v3/margin/currencies` |
| [getConvertSymbol()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2086) |  | GET | `api/v1/convert/symbol` |
| [getConvertCurrencies()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2097) |  | GET | `api/v1/convert/currencies` |
| [submitConvertOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2106) | :closed_lock_with_key:  | POST | `api/v1/convert/order` |
| [getConvertQuote()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2117) | :closed_lock_with_key:  | GET | `api/v1/convert/quote` |
| [getConvertOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2128) | :closed_lock_with_key:  | GET | `api/v1/convert/order/detail` |
| [getConvertOrderHistory()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2139) | :closed_lock_with_key:  | GET | `api/v1/convert/order/history` |
| [submitConvertLimitOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2150) | :closed_lock_with_key:  | POST | `api/v1/convert/limit/order` |
| [getConvertLimitQuote()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2161) | :closed_lock_with_key:  | GET | `api/v1/convert/limit/quote` |
| [getConvertLimitOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2172) | :closed_lock_with_key:  | GET | `api/v1/convert/limit/order/detail` |
| [getConvertLimitOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2183) | :closed_lock_with_key:  | GET | `api/v1/convert/limit/orders` |
| [cancelConvertLimitOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2194) | :closed_lock_with_key:  | DELETE | `api/v1/convert/limit/order/cancel` |
| [subscribeEarnFixedIncome()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2212) | :closed_lock_with_key:  | POST | `api/v1/earn/orders` |
| [getEarnRedeemPreview()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2223) | :closed_lock_with_key:  | GET | `api/v1/earn/redeem-preview` |
| [submitRedemption()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2234) | :closed_lock_with_key:  | DELETE | `api/v1/earn/orders` |
| [getEarnSavingsProducts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2245) | :closed_lock_with_key:  | GET | `api/v1/earn/saving/products` |
| [getEarnPromotionProducts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2256) | :closed_lock_with_key:  | GET | `api/v1/earn/promotion/products` |
| [getEarnFixedIncomeHoldAssets()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2267) | :closed_lock_with_key:  | GET | `api/v1/earn/hold-assets` |
| [getEarnStakingProducts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2278) | :closed_lock_with_key:  | GET | `api/v1/earn/staking/products` |
| [getEarnKcsStakingProducts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2290) | :closed_lock_with_key:  | GET | `api/v1/earn/kcs-staking/products` |
| [getEarnEthStakingProducts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2302) | :closed_lock_with_key:  | GET | `api/v1/earn/eth-staking/products` |
| [submitStructuredProductPurchase()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2319) | :closed_lock_with_key:  | POST | `api/v1/struct-earn/orders` |
| [getDualInvestmentProducts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2330) |  | GET | `api/v1/struct-earn/dual/products` |
| [getStructuredProductOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2341) | :closed_lock_with_key:  | GET | `api/v1/struct-earn/orders` |
| [getDiscountRateConfigs()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2359) | :closed_lock_with_key:  | GET | `api/v1/otc-loan/discount-rate-configs` |
| [getOtcLoan()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2370) | :closed_lock_with_key:  | GET | `api/v1/otc-loan/loan` |
| [getOtcLoanAccounts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2379) | :closed_lock_with_key:  | GET | `api/v1/otc-loan/accounts` |
| [getAffiliateUserRebateInfo()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2395) | :closed_lock_with_key:  | GET | `api/v2/affiliate/inviter/statistics` |
| [getAffiliateInvitees()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2404) | :closed_lock_with_key:  | GET | `api/v2/affiliate/queryInvitees` |
| [getAffiliateCommission()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2415) | :closed_lock_with_key:  | GET | `api/v2/affiliate/queryMyCommission` |
| [getAffiliateTradeHistory()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2426) | :closed_lock_with_key:  | GET | `api/v2/affiliate/queryTransactionByUid` |
| [getAffiliateTransaction()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2437) | :closed_lock_with_key:  | GET | `api/v2/affiliate/queryTransactionByTime` |
| [getKumining()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2448) | :closed_lock_with_key:  | GET | `api/v2/affiliate/queryKumining` |
| [getBrokerRebateOrderDownloadLink()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2466) | :closed_lock_with_key:  | GET | `api/v1/broker/api/rebase/download` |
| [getBrokerRebateOrderDownloadLinkV2()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2479) | :closed_lock_with_key:  | GET | `api/v2/broker/api/rebase/download` |
| [getPublicWSConnectionToken()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2496) |  | POST | `api/v1/bullet-public` |
| [getPrivateWSConnectionToken()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2503) | :closed_lock_with_key:  | POST | `api/v1/bullet-private` |
| [getPrivateWSConnectionTokenV2()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2511) | :closed_lock_with_key:  | POST | `api/v2/bullet-private` |
| [getSubAccountsV1()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2533) | :closed_lock_with_key:  | GET | `api/v1/sub/user` |
| [getSubAccountBalancesV1()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2541) | :closed_lock_with_key:  | GET | `api/v1/sub-accounts` |
| [getMarginBalances()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2556) | :closed_lock_with_key:  | GET | `api/v1/margin/account` |
| [createDepositAddress()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2574) | :closed_lock_with_key:  | POST | `api/v1/deposit-addresses` |
| [getDepositAddressesV2()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2584) | :closed_lock_with_key:  | GET | `api/v2/deposit-addresses` |
| [getDepositAddressV1()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2593) | :closed_lock_with_key:  | GET | `api/v1/deposit-addresses` |
| [getHistoricalDepositsV1()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2604) | :closed_lock_with_key:  | GET | `api/v1/hist-deposits` |
| [getHistoricalWithdrawalsV1()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2620) | :closed_lock_with_key:  | GET | `api/v1/hist-withdrawals` |
| [submitWithdraw()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2629) | :closed_lock_with_key:  | POST | `api/v1/withdrawals` |
| [submitTransferMasterSub()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2645) | :closed_lock_with_key:  | POST | `api/v2/accounts/sub-transfer` |
| [submitInnerTransfer()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2657) | :closed_lock_with_key:  | POST | `api/v2/accounts/inner-transfer` |
| [submitOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2675) | :closed_lock_with_key:  | POST | `api/v1/orders` |
| [submitOrderTest()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2687) | :closed_lock_with_key:  | POST | `api/v1/orders/test` |
| [submitMultipleOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2695) | :closed_lock_with_key:  | POST | `api/v1/orders/multi` |
| [cancelOrderById()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2706) | :closed_lock_with_key:  | DELETE | `api/v1/orders/{orderId}` |
| [cancelOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2718) | :closed_lock_with_key:  | DELETE | `api/v1/order/client-order/{clientOid}` |
| [cancelAllOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2731) | :closed_lock_with_key:  | DELETE | `api/v1/orders` |
| [getOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2743) | :closed_lock_with_key:  | GET | `api/v1/orders` |
| [getRecentOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2753) | :closed_lock_with_key:  | GET | `api/v1/limit/orders` |
| [getOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2764) | :closed_lock_with_key:  | GET | `api/v1/orders/{orderId}` |
| [getOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2774) | :closed_lock_with_key:  | GET | `api/v1/order/client-order/{clientOid}` |
| [getFills()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2790) | :closed_lock_with_key:  | GET | `api/v1/fills` |
| [getRecentFills()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2800) | :closed_lock_with_key:  | GET | `api/v1/limit/fills` |
| [submitMarginOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2815) | :closed_lock_with_key:  | POST | `api/v1/margin/order` |
| [submitMarginOrderTest()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2826) | :closed_lock_with_key:  | POST | `api/v1/margin/order/test` |
| [getIsolatedMarginAccounts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2841) | :closed_lock_with_key:  | GET | `api/v1/isolated/accounts` |
| [getIsolatedMarginAccount()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2852) | :closed_lock_with_key:  | GET | `api/v1/isolated/account/{symbol}` |

# FuturesClient.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [FuturesClient.ts](/src/FuturesClient.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [getBalance()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L97) | :closed_lock_with_key:  | GET | `api/v1/account-overview` |
| [getTransactions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L107) | :closed_lock_with_key:  | GET | `api/v1/transaction-history` |
| [getSubBalances()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L126) | :closed_lock_with_key:  | GET | `api/v1/account-overview-all` |
| [getTradingPairFee()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L145) | :closed_lock_with_key:  | GET | `api/v1/trade-fees` |
| [getSymbol()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L166) |  | GET | `api/v1/contracts/{symbol}` |
| [getSymbols()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L177) |  | GET | `api/v1/contracts/active` |
| [getTicker()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L185) |  | GET | `api/v1/ticker` |
| [getTickers()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L195) |  | GET | `api/v1/allTickers` |
| [getFullOrderBookLevel2()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L203) |  | GET | `api/v1/level2/snapshot` |
| [getPartOrderBookLevel2Depth20()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L213) |  | GET | `api/v1/level2/depth20` |
| [getPartOrderBookLevel2Depth100()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L223) |  | GET | `api/v1/level2/depth100` |
| [getMarketTrades()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L233) |  | GET | `api/v1/trade/history` |
| [getKlines()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L243) |  | GET | `api/v1/kline/query` |
| [getMarkPrice()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L253) |  | GET | `api/v1/mark-price/{symbol}/current` |
| [getIndex()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L263) |  | GET | `api/v1/index/query` |
| [getInterestRates()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L276) |  | GET | `api/v1/interest/query` |
| [getPremiumIndex()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L289) |  | GET | `api/v1/premium/query` |
| [get24HourTransactionVolume()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L302) |  | GET | `api/v1/trade-statistics` |
| [getServiceStatus()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L322) |  | GET | `api/v1/status` |
| [submitOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L336) | :closed_lock_with_key:  | POST | `api/v1/orders` |
| [submitNewOrderTest()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L349) | :closed_lock_with_key:  | POST | `api/v1/orders/test` |
| [submitMultipleOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L360) | :closed_lock_with_key:  | POST | `api/v1/orders/multi` |
| [submitSLTPOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L370) | :closed_lock_with_key:  | POST | `api/v1/st-orders` |
| [cancelOrderById()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L383) | :closed_lock_with_key:  | DELETE | `api/v1/orders/{orderId}` |
| [cancelOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L393) | :closed_lock_with_key:  | DELETE | `api/v1/orders/client-order/{clientOid}` |
| [batchCancelOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L407) | :closed_lock_with_key:  | DELETE | `api/v1/orders/multi-cancel` |
| [cancelAllOrdersV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L417) | :closed_lock_with_key:  | DELETE | `api/v3/orders` |
| [cancelAllStopOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L427) | :closed_lock_with_key:  | DELETE | `api/v1/stopOrders` |
| [getOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L437) | :closed_lock_with_key:  | GET | `api/v1/orders/{orderId}` |
| [getOrderByClientOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L447) | :closed_lock_with_key:  | GET | `api/v1/orders/byClientOid` |
| [getOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L457) | :closed_lock_with_key:  | GET | `api/v1/orders` |
| [getRecentOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L467) | :closed_lock_with_key:  | GET | `api/v1/recentDoneOrders` |
| [getStopOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L477) | :closed_lock_with_key:  | GET | `api/v1/stopOrders` |
| [getOpenOrderStatistics()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L487) | :closed_lock_with_key:  | GET | `api/v1/openOrderStatistics` |
| [getRecentFills()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L497) | :closed_lock_with_key:  | GET | `api/v1/recentFills` |
| [getFills()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L509) | :closed_lock_with_key:  | GET | `api/v1/fills` |
| [getMarginMode()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L525) | :closed_lock_with_key:  | GET | `api/v2/position/getMarginMode` |
| [updateMarginMode()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L538) | :closed_lock_with_key:  | POST | `api/v2/position/changeMarginMode` |
| [batchSwitchMarginMode()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L554) | :closed_lock_with_key:  | POST | `api/v2/position/batchChangeMarginMode` |
| [getMaxOpenSize()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L565) | :closed_lock_with_key:  | GET | `api/v2/getMaxOpenSize` |
| [getPosition()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L576) | :closed_lock_with_key:  | GET | `api/v1/position` |
| [getPositionV2()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L586) | :closed_lock_with_key:  | GET | `api/v2/position` |
| [getPositions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L596) | :closed_lock_with_key:  | GET | `api/v1/positions` |
| [getHistoryPositions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L606) | :closed_lock_with_key:  | GET | `api/v1/history-positions` |
| [getMaxWithdrawMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L620) | :closed_lock_with_key:  | GET | `api/v1/margin/maxWithdrawMargin` |
| [getCrossMarginLeverage()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L630) | :closed_lock_with_key:  | GET | `api/v2/getCrossUserLeverage` |
| [changeCrossMarginLeverage()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L643) | :closed_lock_with_key:  | POST | `api/v2/changeCrossUserLeverage` |
| [depositMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L659) | :closed_lock_with_key:  | POST | `api/v1/position/margin/deposit-margin` |
| [getCrossMarginRiskLimit()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L671) | :closed_lock_with_key:  | GET | `api/v2/batchGetCrossOrderLimit` |
| [withdrawMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L683) | :closed_lock_with_key:  | POST | `api/v1/margin/withdrawMargin` |
| [getCrossMarginRequirement()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L694) | :closed_lock_with_key:  | GET | `api/v2/getCrossModeMarginRequirement` |
| [getRiskLimitLevel()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L706) | :closed_lock_with_key:  | GET | `api/v1/contracts/risk-limit/{symbol}` |
| [updateRiskLimitLevel()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L716) | :closed_lock_with_key:  | POST | `api/v1/position/risk-limit-level/change` |
| [getPositionMode()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L727) | :closed_lock_with_key:  | GET | `api/v2/position/getPositionMode` |
| [updatePositionMode()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L735) | :closed_lock_with_key:  | POST | `api/v2/position/switchPositionMode` |
| [getFundingRate()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L753) | :closed_lock_with_key:  | GET | `api/v1/funding-rate/{symbol}/current` |
| [getFundingRates()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L763) | :closed_lock_with_key:  | GET | `api/v1/contract/funding-rates` |
| [getFundingHistory()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L773) | :closed_lock_with_key:  | GET | `api/v1/funding-history` |
| [submitCopyTradeOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L793) | :closed_lock_with_key:  | POST | `api/v1/copy-trade/futures/orders` |
| [submitCopyTradeOrderTest()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L808) | :closed_lock_with_key:  | POST | `api/v1/copy-trade/futures/orders/test` |
| [submitCopyTradeSLTPOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L822) | :closed_lock_with_key:  | POST | `api/v1/copy-trade/futures/st-orders` |
| [cancelCopyTradeOrderById()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L835) | :closed_lock_with_key:  | DELETE | `api/v1/copy-trade/futures/orders` |
| [cancelCopyTradeOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L845) | :closed_lock_with_key:  | DELETE | `api/v1/copy-trade/futures/orders/client-order` |
| [getCopyTradeMaxOpenSize()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L859) | :closed_lock_with_key:  | GET | `api/v1/copy-trade/futures/get-max-open-size` |
| [getCopyTradeMaxWithdrawMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L880) | :closed_lock_with_key:  | GET | `api/v1/copy-trade/futures/position/margin/max-withdraw-margin` |
| [addCopyTradeIsolatedMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L894) | :closed_lock_with_key:  | POST | `api/v1/copy-trade/futures/position/margin/deposit-margin` |
| [removeCopyTradeIsolatedMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L910) | :closed_lock_with_key:  | POST | `api/v1/copy-trade/futures/position/margin/withdraw-margin` |
| [modifyCopyTradeRiskLimitLevel()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L926) | :closed_lock_with_key:  | POST | `api/v1/copy-trade/futures/position/risk-limit-level/change` |
| [updateCopyTradeAutoDepositStatus()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L941) | :closed_lock_with_key:  | POST | `api/v1/copy-trade/futures/position/margin/auto-deposit-status` |
| [switchCopyTradeMarginMode()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L956) | :closed_lock_with_key:  | POST | `api/v1/copy-trade/futures/position/changeMarginMode` |
| [updateCopyTradeCrossMarginLeverage()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L969) | :closed_lock_with_key:  | POST | `api/v2/copy-trade/futures/changeCrossUserLeverage` |
| [getCopyTradeCrossMarginRequirement()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L982) | :closed_lock_with_key:  | POST | `api/v2/copy-trade/getCrossModeMarginRequirement` |
| [switchCopyTradePositionMode()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L996) | :closed_lock_with_key:  | POST | `api/v2/copy-trade/position/switchPositionMode` |
| [getBrokerRebateOrderDownloadLink()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L1016) | :closed_lock_with_key:  | GET | `api/v1/broker/api/rebase/download` |
| [getBrokerRebateOrderDownloadLinkV2()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L1029) | :closed_lock_with_key:  | GET | `api/v2/broker/api/rebase/download` |
| [getPublicWSConnectionToken()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L1046) |  | POST | `api/v1/bullet-public` |
| [getPrivateWSConnectionToken()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L1053) | :closed_lock_with_key:  | POST | `api/v1/bullet-private` |
| [getPrivateWSConnectionTokenV2()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L1061) | :closed_lock_with_key:  | POST | `api/v2/bullet-private` |
| [submitTransferOut()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L1076) | :closed_lock_with_key:  | POST | `api/v3/transfer-out` |
| [submitTransferIn()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L1087) | :closed_lock_with_key:  | POST | `api/v1/transfer-in` |
| [getTransfers()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L1098) | :closed_lock_with_key:  | GET | `api/v1/transfer-list` |
| [updateAutoDepositStatus()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L1113) | :closed_lock_with_key:  | POST | `api/v1/position/margin/auto-deposit-status` |

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

# UnifiedAPIClient.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [UnifiedAPIClient.ts](/src/UnifiedAPIClient.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [getAnnouncements()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L143) |  | GET | `api/ua/v1/market/announcement` |
| [getCurrency()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L153) |  | GET | `api/ua/v1/market/currency` |
| [getThirdPartyCustodyCurrencies()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L163) |  | GET | `api/ua/v1/oes/currency` |
| [getSymbols()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L173) |  | GET | `api/ua/v1/market/instrument` |
| [getTickers()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L184) |  | GET | `api/ua/v1/market/ticker` |
| [getTrades()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L194) |  | GET | `api/ua/v1/market/trade` |
| [getOrderBook()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L204) |  | GET | `api/ua/v1/market/orderbook` |
| [getKlines()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L215) |  | GET | `api/ua/v1/market/kline` |
| [getCurrentFundingRate()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L225) |  | GET | `api/ua/v1/market/funding-rate` |
| [getHistoryFundingRate()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L235) |  | GET | `api/ua/v1/market/funding-rate-history` |
| [getCrossMarginConfig()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L245) |  | GET | `api/ua/v1/market/cross-config` |
| [getBorrowableCurrencies()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L255) |  | GET | `api/ua/v1/market/borrowable-currency` |
| [getServiceStatus()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L265) |  | GET | `api/ua/v1/server/status` |
| [getClientIPAddress()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L275) |  | GET | `api/ua/v1/user/my-ip` |
| [getFiatPrice()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L283) |  | GET | `api/ua/v1/market/fiat-price` |
| [getClassicAccount()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L300) | :closed_lock_with_key:  | GET | `api/ua/v1/account/balance` |
| [getAccount()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L311) | :closed_lock_with_key:  | GET | `api/ua/v1/unified/account/balance` |
| [getAccountOverview()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L319) | :closed_lock_with_key:  | GET | `api/ua/v1/unified/account/overview` |
| [getSubAccount()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L329) | :closed_lock_with_key:  | GET | `api/ua/v1/sub-account/balance` |
| [getTransferQuotas()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L341) | :closed_lock_with_key:  | GET | `api/ua/v1/account/transfer-quota` |
| [flexTransfer()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L352) | :closed_lock_with_key:  | POST | `api/ua/v1/account/transfer` |
| [setSubAccountTransferPermission()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L362) | :closed_lock_with_key:  | POST | `api/ua/v1/sub-account/canTransferOut` |
| [getAccountMode()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L372) | :closed_lock_with_key:  | GET | `api/ua/v1/account/mode` |
| [setAccountMode()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L380) | :closed_lock_with_key:  | POST | `api/ua/v1/account/mode` |
| [getFeeRate()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L392) | :closed_lock_with_key:  | GET | `api/ua/v1/user/fee-rate` |
| [getAccountLedger()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L408) | :closed_lock_with_key:  | GET | `api/ua/v1/account/ledger` |
| [getInterestHistory()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L422) | :closed_lock_with_key:  | GET | `api/ua/v1/account/interest-history` |
| [getBorrowingRatesAndLimits()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L432) | :closed_lock_with_key:  | GET | `api/ua/v1/account/interest-limits` |
| [modifyLeverage()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L442) | :closed_lock_with_key:  | POST | `api/ua/v1/unified/account/modify-leverage` |
| [modifyMarginCrossLeverage()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L455) | :closed_lock_with_key:  | POST | `api/ua/v1/{accountMode}/account/modify-leverage-margin-cross` |
| [getLeverage()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L469) | :closed_lock_with_key:  | GET | `api/ua/v1/unified/account/leverage` |
| [getDepositAddress()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L481) | :closed_lock_with_key:  | GET | `api/ua/v1/asset/deposit/address` |
| [getApiKeyInfo()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L492) | :closed_lock_with_key:  | GET | `api/ua/v1/user/api-key` |
| [getKYCRegions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L500) |  | GET | `api/ua/v1/user/kyc-region` |
| [getRateLimit()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L508) | :closed_lock_with_key:  | GET | `api/ua/v1/rate-limit/query` |
| [getAllRateLimit()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L518) | :closed_lock_with_key:  | GET | `api/ua/v1/rate-limit/query-all` |
| [getRateLimitCap()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L526) | :closed_lock_with_key:  | GET | `api/ua/v1/rate-limit/query-cap` |
| [setSubAccountsRateLimit()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L534) | :closed_lock_with_key:  | POST | `api/ua/v1/rate-limit/set` |
| [addSubAccount()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L544) | :closed_lock_with_key:  | POST | `api/ua/v1/user/sub/create-sub-account` |
| [addSubAccountApi()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L554) | :closed_lock_with_key:  | POST | `api/ua/v1/user/create-sub-api-key` |
| [getWithdrawalQuotas()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L564) | :closed_lock_with_key:  | GET | `api/ua/v1/withdrawals/quotas` |
| [submitWithdraw()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L574) | :closed_lock_with_key:  | POST | `api/ua/v1/withdrawal` |
| [cancelWithdrawal()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L584) | :closed_lock_with_key:  | DELETE | `api/ua/v1/withdrawal` |
| [getThirdPartyCustodyQuota()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L594) | :closed_lock_with_key:  | GET | `api/ua/v1/oes/custody-quota` |
| [placeOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L615) | :closed_lock_with_key:  | GET | `api/ua/v1/{accountMode}/order/detail` |
| [batchPlaceOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L648) | :closed_lock_with_key:  | GET | `api/ua/v1/{accountMode}/order/detail` |
| [getOrderDetails()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L673) | :closed_lock_with_key:  | GET | `api/ua/v1/{accountMode}/order/detail` |
| [getOpenOrderList()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L687) | :closed_lock_with_key:  | GET | `api/ua/v1/{accountMode}/order/open-list` |
| [getOrderHistory()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L701) | :closed_lock_with_key:  | GET | `api/ua/v1/{accountMode}/order/history` |
| [getTradeHistory()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L714) | :closed_lock_with_key:  | GET | `api/ua/v1/{accountMode}/order/execution` |
| [cancelOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L726) | :closed_lock_with_key:  | POST | `api/ua/v1/unified/order/cancel-all` |
| [batchCancelOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L743) | :closed_lock_with_key:  | POST | `api/ua/v1/unified/order/cancel-all` |
| [batchCancelOrdersBySymbol()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L758) | :closed_lock_with_key:  | POST | `api/ua/v1/unified/order/cancel-all` |
| [setDCP()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L771) | :closed_lock_with_key:  | POST | `api/ua/v1/dcp/set` |
| [getDCP()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L782) | :closed_lock_with_key:  | GET | `api/ua/v1/dcp/query` |
| [getPositionList()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L802) | :closed_lock_with_key:  | GET | `api/ua/v1/unified/position/open-list` |
| [batchModifyMarginMode()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L812) | :closed_lock_with_key:  | POST | `api/ua/v1/unified/position/margin-mode` |
| [modifyIsolatedFuturesMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L822) | :closed_lock_with_key:  | POST | `api/ua/v1/unified/position/modify-margin` |
| [getPositionsHistory()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L835) | :closed_lock_with_key:  | GET | `api/ua/v1/position/history` |
| [getPrivateFundingFeeHistory()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L845) | :closed_lock_with_key:  | GET | `api/ua/v1/position/funding-history` |
| [getAccountPositionTiers()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L856) | :closed_lock_with_key:  | GET | `api/ua/v1/{accountMode}/position/tiers` |