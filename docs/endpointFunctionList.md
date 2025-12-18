
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
| [getMyIp()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L334) |  | GET | `api/v1/ip` |
| [getServiceStatus()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L342) |  | GET | `api/v1/status` |
| [getAccountSummary()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L357) | :closed_lock_with_key:  | GET | `api/v2/user-info` |
| [getKYCRegions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L366) | :closed_lock_with_key:  | GET | `api/kyc/regions/v4` |
| [getApikeyInfo()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L376) | :closed_lock_with_key:  | GET | `api/v1/user/api-key` |
| [getUserType()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L385) | :closed_lock_with_key:  | GET | `api/v1/hf/accounts/opened` |
| [getBalances()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L394) | :closed_lock_with_key:  | GET | `api/v1/accounts` |
| [getAccountDetail()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L405) | :closed_lock_with_key:  | GET | `api/v1/accounts/{accountId}` |
| [getMarginBalance()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L416) | :closed_lock_with_key:  | GET | `api/v3/margin/accounts` |
| [getIsolatedMarginBalance()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L427) | :closed_lock_with_key:  | GET | `api/v3/isolated/accounts` |
| [getTransactions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L440) | :closed_lock_with_key:  | GET | `api/v1/accounts/ledgers` |
| [getHFTransactions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L452) | :closed_lock_with_key:  | GET | `api/v1/hf/accounts/ledgers` |
| [getHFMarginTransactions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L464) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/account/ledgers` |
| [createSubAccount()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L481) | :closed_lock_with_key:  | POST | `api/v2/sub/user/created` |
| [enableSubAccountMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L493) | :closed_lock_with_key:  | POST | `api/v3/sub/user/margin/enable` |
| [enableSubAccountFutures()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L503) | :closed_lock_with_key:  | POST | `api/v3/sub/user/futures/enable` |
| [getSubAccountsV2()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L512) | :closed_lock_with_key:  | GET | `api/v2/sub/user` |
| [getSubAccountBalance()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L524) | :closed_lock_with_key:  | GET | `api/v1/sub-accounts/{subUserId}` |
| [getSubAccountBalancesV2()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L539) | :closed_lock_with_key:  | GET | `api/v2/sub-accounts` |
| [createSubAPI()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L557) | :closed_lock_with_key:  | POST | `api/v1/sub/api-key` |
| [updateSubAPI()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L568) | :closed_lock_with_key:  | POST | `api/v1/sub/api-key/update` |
| [getSubAPIs()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L580) | :closed_lock_with_key:  | GET | `api/v1/sub/api-key` |
| [deleteSubAPI()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L592) | :closed_lock_with_key:  | DELETE | `api/v1/sub/api-key` |
| [createDepositAddressV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L609) | :closed_lock_with_key:  | POST | `api/v3/deposit-address/create` |
| [getDepositAddressesV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L621) | :closed_lock_with_key:  | GET | `api/v3/deposit-addresses` |
| [getDeposits()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L635) | :closed_lock_with_key:  | GET | `api/v1/deposits` |
| [getWithdrawalQuotas()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L652) | :closed_lock_with_key:  | GET | `api/v1/withdrawals/quotas` |
| [submitWithdrawV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L664) | :closed_lock_with_key:  | POST | `api/v3/withdrawals` |
| [cancelWithdrawal()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L677) | :closed_lock_with_key:  | DELETE | `api/v1/withdrawals/{withdrawalId}` |
| [getWithdrawals()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L689) | :closed_lock_with_key:  | GET | `api/v1/withdrawals` |
| [getWithdrawalById()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L700) | :closed_lock_with_key:  | GET | `api/v1/withdrawals/{withdrawalId}` |
| [getTransferable()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L717) | :closed_lock_with_key:  | GET | `api/v1/accounts/transferable` |
| [submitFlexTransfer()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L728) | :closed_lock_with_key:  | POST | `api/v3/accounts/universal-transfer` |
| [getBasicUserFee()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L747) | :closed_lock_with_key:  | GET | `api/v1/base-fee` |
| [getTradingPairFee()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L763) | :closed_lock_with_key:  | GET | `api/v1/trade-fees` |
| [getAnnouncements()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L786) |  | GET | `api/v3/announcements` |
| [getCurrency()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L797) |  | GET | `api/v3/currencies/{currency}` |
| [getCurrencies()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L809) |  | GET | `api/v3/currencies` |
| [getSymbol()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L819) |  | GET | `api/v2/symbols/{symbol}` |
| [getSymbols()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L831) |  | GET | `api/v2/symbols` |
| [getTicker()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L844) |  | GET | `api/v1/market/orderbook/level1` |
| [getTickers()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L853) |  | GET | `api/v1/market/allTickers` |
| [getTradeHistories()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L864) |  | GET | `api/v1/market/histories` |
| [getKlines()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L876) |  | GET | `api/v1/market/candles` |
| [getOrderBookLevel20()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L887) |  | GET | `api/v1/market/orderbook/level2_20` |
| [getOrderBookLevel100()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L898) |  | GET | `api/v1/market/orderbook/level2_100` |
| [getFullOrderBook()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L909) | :closed_lock_with_key:  | GET | `api/v3/market/orderbook/level2` |
| [getCallAuctionPartOrderBook()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L921) |  | GET | `api/v1/market/orderbook/callauction/level2_{size}` |
| [getCallAuctionInfo()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L938) |  | GET | `api/v1/market/callauctionData` |
| [getFiatPrice()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L949) |  | GET | `api/v1/prices` |
| [get24hrStats()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L958) |  | GET | `api/v1/market/stats` |
| [getMarkets()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L969) |  | GET | `api/v1/markets` |
| [submitHFOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L986) | :closed_lock_with_key:  | POST | `api/v1/hf/orders` |
| [submitHFOrderSync()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1002) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/sync` |
| [submitHFOrderTest()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1014) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/test` |
| [submitHFMultipleOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1023) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/multi` |
| [submitHFMultipleOrdersSync()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1035) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/multi/sync` |
| [cancelHFOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1047) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/{orderId}` |
| [cancelHFOrderSync()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1061) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/sync/{orderId}` |
| [cancelHFOrderByClientOId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1077) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/client-order/{clientOid}` |
| [cancelHFOrderSyncByClientOId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1097) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/sync/client-order/{clientOid}` |
| [cancelHFOrdersNumber()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1112) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/cancel/{orderId}` |
| [cancelHFAllOrdersBySymbol()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1127) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders` |
| [cancelHFAllOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1138) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/cancelAll` |
| [updateHFOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1147) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/alter` |
| [getHFOrderDetailsByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1161) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/{orderId}` |
| [getHFOrderDetailsByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1173) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/client-order/{clientOid}` |
| [getHFActiveSymbols()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1188) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/active/symbols` |
| [getHFActiveOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1203) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/active` |
| [getHFActiveOrdersPaginated()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1215) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/active/page` |
| [getHFCompletedOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1237) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/done` |
| [getHFFilledOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1251) | :closed_lock_with_key:  | GET | `api/v1/hf/fills` |
| [cancelHFOrderAutoSettingQuery()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1266) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/dead-cancel-all/query` |
| [cancelHFOrderAutoSetting()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1279) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/dead-cancel-all` |
| [submitStopOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1296) | :closed_lock_with_key:  | POST | `api/v1/stop-order` |
| [cancelStopOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1307) | :closed_lock_with_key:  | DELETE | `api/v1/stop-order/cancelOrderByClientOid` |
| [cancelStopOrderById()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1327) | :closed_lock_with_key:  | DELETE | `api/v1/stop-order/{orderId}` |
| [cancelStopOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1340) | :closed_lock_with_key:  | DELETE | `api/v1/stop-order/cancel` |
| [getStopOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1353) | :closed_lock_with_key:  | GET | `api/v1/stop-order` |
| [getStopOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1366) | :closed_lock_with_key:  | GET | `api/v1/stop-order/{orderId}` |
| [getStopOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1377) | :closed_lock_with_key:  | GET | `api/v1/stop-order/queryOrderByClientOid` |
| [submitOCOOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1389) | :closed_lock_with_key:  | POST | `api/v3/oco/order` |
| [cancelOCOOrderById()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1402) | :closed_lock_with_key:  | DELETE | `api/v3/oco/order/{orderId}` |
| [cancelOCOOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1415) | :closed_lock_with_key:  | DELETE | `api/v3/oco/client-order/{clientOid}` |
| [cancelMultipleOCOOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1428) | :closed_lock_with_key:  | DELETE | `api/v3/oco/orders` |
| [getOCOOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1444) | :closed_lock_with_key:  | GET | `api/v3/oco/order/{orderId}` |
| [getOCOOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1455) | :closed_lock_with_key:  | GET | `api/v3/oco/client-order/{clientOid}` |
| [getOCOOrderDetails()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1466) | :closed_lock_with_key:  | GET | `api/v3/oco/order/details/{orderId}` |
| [getOCOOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1477) | :closed_lock_with_key:  | GET | `api/v3/oco/orders` |
| [getMarginActivePairsV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1494) | :closed_lock_with_key:  | GET | `api/v3/margin/symbols` |
| [getMarginConfigInfo()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1507) |  | GET | `api/v1/margin/config` |
| [getMarginLeveragedToken()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1516) | :closed_lock_with_key:  | GET | `api/v3/etf/info` |
| [getMarginMarkPrices()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1527) |  | GET | `api/v3/mark-price/all-symbols` |
| [getMarginMarkPrice()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1536) |  | GET | `api/v1/mark-price/{symbol}/current` |
| [getIsolatedMarginSymbolsConfig()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1547) | :closed_lock_with_key:  | GET | `api/v1/isolated/symbols` |
| [getMarginCollateralRatio()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1558) |  | GET | `api/v3/margin/collateralRatio` |
| [getMarketAvailableInventory()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1569) |  | GET | `api/v3/margin/available-inventory` |
| [submitHFMarginOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1586) | :closed_lock_with_key:  | POST | `api/v3/hf/margin/order` |
| [submitHFMarginOrderTest()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1597) | :closed_lock_with_key:  | POST | `api/v3/hf/margin/order/test` |
| [cancelHFMarginOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1608) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/orders/{orderId}` |
| [cancelHFMarginOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1624) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/orders/client-order/{clientOid}` |
| [cancelHFAllMarginOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1643) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/orders` |
| [getHFMarginOpenSymbols()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1655) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/order/active/symbols` |
| [getHFActiveMarginOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1666) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/orders/active` |
| [getHFMarginFilledOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1677) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/orders/done` |
| [getHFMarginFills()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1691) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/fills` |
| [getHFMarginOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1705) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/orders/{orderId}` |
| [getHFMarginOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1717) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/orders/client-order/{clientOid}?symbol={symbol}` |
| [addMarginStopOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1731) | :closed_lock_with_key:  | POST | `api/v3/hf/margin/stop-order` |
| [cancelMarginStopOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1742) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/stop-order/cancel-by-id?orderId={orderId}` |
| [cancelMarginStopOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1755) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/stop-order/cancel-by-clientOid` |
| [batchCancelMarginStopOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1769) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/stop-order/cancel` |
| [getMarginStopOrdersList()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1780) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/stop-orders` |
| [getMarginStopOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1791) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/stop-order/orderId?orderId={orderId}` |
| [getMarginStopOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1804) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/stop-order/clientOid` |
| [addMarginOcoOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1815) | :closed_lock_with_key:  | POST | `api/v3/hf/margin/oco-order` |
| [cancelMarginOcoOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1826) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/oco-order/cancel-by-id?orderId={orderId}` |
| [cancelMarginOcoOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1839) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/oco-order/cancel-by-clientOid` |
| [batchCancelMarginOcoOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1853) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/oco-order/cancel` |
| [getMarginOcoOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1864) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/oco-order/clientOid` |
| [getMarginOcoOrderDetailByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1875) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/oco-order/detail/orderId?orderId={orderId}` |
| [getBorrowInterestRate()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1894) | :closed_lock_with_key:  | GET | `api/v3/margin/borrowRate` |
| [marginBorrowV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1905) | :closed_lock_with_key:  | POST | `api/v3/margin/borrow` |
| [getMarginBorrowHistoryV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1916) | :closed_lock_with_key:  | GET | `api/v3/margin/borrow` |
| [marginRepayV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1927) | :closed_lock_with_key:  | POST | `api/v3/margin/repay` |
| [getMarginRepayHistoryV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1938) | :closed_lock_with_key:  | GET | `api/v3/margin/repay` |
| [getMarginInterestRecordsV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1949) | :closed_lock_with_key:  | GET | `api/v3/margin/interest` |
| [updateMarginLeverageV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1960) | :closed_lock_with_key:  | POST | `api/v3/position/update-user-leverage` |
| [getLendingCurrencyV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1979) |  | GET | `api/v3/project/list` |
| [getLendingInterestRateV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1990) |  | GET | `api/v3/project/marketInterestRate` |
| [submitLendingSubscriptionV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2006) | :closed_lock_with_key:  | POST | `api/v3/purchase` |
| [updateLendingSubscriptionOrdersV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2023) | :closed_lock_with_key:  | POST | `api/v3/lend/purchase/update` |
| [getLendingSubscriptionOrdersV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2034) | :closed_lock_with_key:  | GET | `api/v3/purchase/orders` |
| [submitLendingRedemptionV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2045) | :closed_lock_with_key:  | POST | `api/v3/redeem` |
| [getLendingRedemptionOrdersV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2062) | :closed_lock_with_key:  | GET | `api/v3/redeem/orders` |
| [getMarginRiskLimitConfig()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2079) | :closed_lock_with_key:  | GET | `api/v3/margin/currencies` |
| [getConvertSymbol()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2096) |  | GET | `api/v1/convert/symbol` |
| [getConvertCurrencies()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2107) |  | GET | `api/v1/convert/currencies` |
| [submitConvertOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2116) | :closed_lock_with_key:  | POST | `api/v1/convert/order` |
| [getConvertQuote()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2127) | :closed_lock_with_key:  | GET | `api/v1/convert/quote` |
| [getConvertOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2138) | :closed_lock_with_key:  | GET | `api/v1/convert/order/detail` |
| [getConvertOrderHistory()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2149) | :closed_lock_with_key:  | GET | `api/v1/convert/order/history` |
| [submitConvertLimitOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2160) | :closed_lock_with_key:  | POST | `api/v1/convert/limit/order` |
| [getConvertLimitQuote()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2171) | :closed_lock_with_key:  | GET | `api/v1/convert/limit/quote` |
| [getConvertLimitOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2182) | :closed_lock_with_key:  | GET | `api/v1/convert/limit/order/detail` |
| [getConvertLimitOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2193) | :closed_lock_with_key:  | GET | `api/v1/convert/limit/orders` |
| [cancelConvertLimitOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2204) | :closed_lock_with_key:  | DELETE | `api/v1/convert/limit/order/cancel` |
| [subscribeEarnFixedIncome()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2222) | :closed_lock_with_key:  | POST | `api/v1/earn/orders` |
| [getEarnRedeemPreview()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2233) | :closed_lock_with_key:  | GET | `api/v1/earn/redeem-preview` |
| [submitRedemption()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2244) | :closed_lock_with_key:  | DELETE | `api/v1/earn/orders` |
| [getEarnSavingsProducts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2255) | :closed_lock_with_key:  | GET | `api/v1/earn/saving/products` |
| [getEarnPromotionProducts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2266) | :closed_lock_with_key:  | GET | `api/v1/earn/promotion/products` |
| [getEarnFixedIncomeHoldAssets()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2277) | :closed_lock_with_key:  | GET | `api/v1/earn/hold-assets` |
| [getEarnStakingProducts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2288) | :closed_lock_with_key:  | GET | `api/v1/earn/staking/products` |
| [getEarnKcsStakingProducts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2300) | :closed_lock_with_key:  | GET | `api/v1/earn/kcs-staking/products` |
| [getEarnEthStakingProducts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2312) | :closed_lock_with_key:  | GET | `api/v1/earn/eth-staking/products` |
| [submitStructuredProductPurchase()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2329) | :closed_lock_with_key:  | POST | `api/v1/struct-earn/orders` |
| [getDualInvestmentProducts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2340) |  | GET | `api/v1/struct-earn/dual/products` |
| [getStructuredProductOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2351) | :closed_lock_with_key:  | GET | `api/v1/struct-earn/orders` |
| [getDiscountRateConfigs()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2369) | :closed_lock_with_key:  | GET | `api/v1/otc-loan/discount-rate-configs` |
| [getOtcLoan()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2380) | :closed_lock_with_key:  | GET | `api/v1/otc-loan/loan` |
| [getOtcLoanAccounts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2389) | :closed_lock_with_key:  | GET | `api/v1/otc-loan/accounts` |
| [getAffiliateUserRebateInfo()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2405) | :closed_lock_with_key:  | GET | `api/v2/affiliate/inviter/statistics` |
| [getAffiliateInvitees()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2414) | :closed_lock_with_key:  | GET | `api/v2/affiliate/queryInvitees` |
| [getAffiliateCommission()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2425) | :closed_lock_with_key:  | GET | `api/v2/affiliate/queryMyCommission` |
| [getAffiliateTradeHistory()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2436) | :closed_lock_with_key:  | GET | `api/v2/affiliate/queryTransactionByUid` |
| [getAffiliateTransaction()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2447) | :closed_lock_with_key:  | GET | `api/v2/affiliate/queryTransactionByTime` |
| [getKumining()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2458) | :closed_lock_with_key:  | GET | `api/v2/affiliate/queryKumining` |
| [getBrokerRebateOrderDownloadLink()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2476) | :closed_lock_with_key:  | GET | `api/v1/broker/api/rebase/download` |
| [getBrokerRebateOrderDownloadLinkV2()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2489) | :closed_lock_with_key:  | GET | `api/v2/broker/api/rebase/download` |
| [getPublicWSConnectionToken()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2503) |  | POST | `api/v1/bullet-public` |
| [getPrivateWSConnectionToken()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2507) | :closed_lock_with_key:  | POST | `api/v1/bullet-private` |
| [getSubAccountsV1()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2527) | :closed_lock_with_key:  | GET | `api/v1/sub/user` |
| [getSubAccountBalancesV1()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2535) | :closed_lock_with_key:  | GET | `api/v1/sub-accounts` |
| [getMarginBalances()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2549) | :closed_lock_with_key:  | GET | `api/v1/margin/account` |
| [createDepositAddress()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2567) | :closed_lock_with_key:  | POST | `api/v1/deposit-addresses` |
| [getDepositAddressesV2()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2577) | :closed_lock_with_key:  | GET | `api/v2/deposit-addresses` |
| [getDepositAddressV1()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2586) | :closed_lock_with_key:  | GET | `api/v1/deposit-addresses` |
| [getHistoricalDepositsV1()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2597) | :closed_lock_with_key:  | GET | `api/v1/hist-deposits` |
| [getHistoricalWithdrawalsV1()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2613) | :closed_lock_with_key:  | GET | `api/v1/hist-withdrawals` |
| [submitWithdraw()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2622) | :closed_lock_with_key:  | POST | `api/v1/withdrawals` |
| [submitTransferMasterSub()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2638) | :closed_lock_with_key:  | POST | `api/v2/accounts/sub-transfer` |
| [submitInnerTransfer()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2650) | :closed_lock_with_key:  | POST | `api/v2/accounts/inner-transfer` |
| [submitOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2668) | :closed_lock_with_key:  | POST | `api/v1/orders` |
| [submitOrderTest()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2680) | :closed_lock_with_key:  | POST | `api/v1/orders/test` |
| [submitMultipleOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2688) | :closed_lock_with_key:  | POST | `api/v1/orders/multi` |
| [cancelOrderById()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2699) | :closed_lock_with_key:  | DELETE | `api/v1/orders/{orderId}` |
| [cancelOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2711) | :closed_lock_with_key:  | DELETE | `api/v1/order/client-order/{clientOid}` |
| [cancelAllOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2724) | :closed_lock_with_key:  | DELETE | `api/v1/orders` |
| [getOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2736) | :closed_lock_with_key:  | GET | `api/v1/orders` |
| [getRecentOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2746) | :closed_lock_with_key:  | GET | `api/v1/limit/orders` |
| [getOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2757) | :closed_lock_with_key:  | GET | `api/v1/orders/{orderId}` |
| [getOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2767) | :closed_lock_with_key:  | GET | `api/v1/order/client-order/{clientOid}` |
| [getFills()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2783) | :closed_lock_with_key:  | GET | `api/v1/fills` |
| [getRecentFills()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2793) | :closed_lock_with_key:  | GET | `api/v1/limit/fills` |
| [submitMarginOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2807) | :closed_lock_with_key:  | POST | `api/v1/margin/order` |
| [submitMarginOrderTest()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2817) | :closed_lock_with_key:  | POST | `api/v1/margin/order/test` |
| [getIsolatedMarginAccounts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2831) | :closed_lock_with_key:  | GET | `api/v1/isolated/accounts` |
| [getIsolatedMarginAccount()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L2841) | :closed_lock_with_key:  | GET | `api/v1/isolated/account/{symbol}` |

# FuturesClient.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [FuturesClient.ts](/src/FuturesClient.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [getBalance()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L110) | :closed_lock_with_key:  | GET | `api/v1/account-overview` |
| [getTransactions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L120) | :closed_lock_with_key:  | GET | `api/v1/transaction-history` |
| [getSubBalances()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L139) | :closed_lock_with_key:  | GET | `api/v1/account-overview-all` |
| [getTradingPairFee()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L158) | :closed_lock_with_key:  | GET | `api/v1/trade-fees` |
| [getSymbol()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L179) |  | GET | `api/v1/contracts/{symbol}` |
| [getSymbols()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L190) |  | GET | `api/v1/contracts/active` |
| [getTicker()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L198) |  | GET | `api/v1/ticker` |
| [getTickers()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L208) |  | GET | `api/v1/allTickers` |
| [getFullOrderBookLevel2()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L216) |  | GET | `api/v1/level2/snapshot` |
| [getPartOrderBookLevel2Depth20()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L226) |  | GET | `api/v1/level2/depth20` |
| [getPartOrderBookLevel2Depth100()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L236) |  | GET | `api/v1/level2/depth100` |
| [getMarketTrades()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L246) |  | GET | `api/v1/trade/history` |
| [getKlines()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L256) |  | GET | `api/v1/kline/query` |
| [getMarkPrice()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L266) |  | GET | `api/v1/mark-price/{symbol}/current` |
| [getIndex()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L276) |  | GET | `api/v1/index/query` |
| [getInterestRates()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L289) |  | GET | `api/v1/interest/query` |
| [getPremiumIndex()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L302) |  | GET | `api/v1/premium/query` |
| [get24HourTransactionVolume()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L315) |  | GET | `api/v1/trade-statistics` |
| [getServiceStatus()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L335) |  | GET | `api/v1/status` |
| [submitOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L349) | :closed_lock_with_key:  | POST | `api/v1/orders` |
| [submitNewOrderTest()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L362) | :closed_lock_with_key:  | POST | `api/v1/orders/test` |
| [submitMultipleOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L373) | :closed_lock_with_key:  | POST | `api/v1/orders/multi` |
| [submitSLTPOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L383) | :closed_lock_with_key:  | POST | `api/v1/st-orders` |
| [cancelOrderById()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L396) | :closed_lock_with_key:  | DELETE | `api/v1/orders/{orderId}` |
| [cancelOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L406) | :closed_lock_with_key:  | DELETE | `api/v1/orders/client-order/{clientOid}` |
| [batchCancelOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L420) | :closed_lock_with_key:  | DELETE | `api/v1/orders/multi-cancel` |
| [cancelAllOrdersV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L430) | :closed_lock_with_key:  | DELETE | `api/v3/orders` |
| [cancelAllStopOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L440) | :closed_lock_with_key:  | DELETE | `api/v1/stopOrders` |
| [getOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L450) | :closed_lock_with_key:  | GET | `api/v1/orders/{orderId}` |
| [getOrderByClientOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L460) | :closed_lock_with_key:  | GET | `api/v1/orders/byClientOid` |
| [getOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L470) | :closed_lock_with_key:  | GET | `api/v1/orders` |
| [getRecentOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L480) | :closed_lock_with_key:  | GET | `api/v1/recentDoneOrders` |
| [getStopOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L490) | :closed_lock_with_key:  | GET | `api/v1/stopOrders` |
| [getOpenOrderStatistics()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L500) | :closed_lock_with_key:  | GET | `api/v1/openOrderStatistics` |
| [getRecentFills()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L510) | :closed_lock_with_key:  | GET | `api/v1/recentFills` |
| [getFills()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L521) | :closed_lock_with_key:  | GET | `api/v1/fills` |
| [getMarginMode()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L537) | :closed_lock_with_key:  | GET | `api/v2/position/getMarginMode` |
| [updateMarginMode()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L550) | :closed_lock_with_key:  | POST | `api/v2/position/changeMarginMode` |
| [batchSwitchMarginMode()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L566) | :closed_lock_with_key:  | POST | `api/v2/position/batchChangeMarginMode` |
| [getMaxOpenSize()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L577) | :closed_lock_with_key:  | GET | `api/v2/getMaxOpenSize` |
| [getPosition()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L588) | :closed_lock_with_key:  | GET | `api/v1/position` |
| [getPositionV2()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L598) | :closed_lock_with_key:  | GET | `api/v2/position` |
| [getPositions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L608) | :closed_lock_with_key:  | GET | `api/v1/positions` |
| [getHistoryPositions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L618) | :closed_lock_with_key:  | GET | `api/v1/history-positions` |
| [getMaxWithdrawMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L632) | :closed_lock_with_key:  | GET | `api/v1/margin/maxWithdrawMargin` |
| [getCrossMarginLeverage()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L642) | :closed_lock_with_key:  | GET | `api/v2/getCrossUserLeverage` |
| [changeCrossMarginLeverage()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L655) | :closed_lock_with_key:  | POST | `api/v2/changeCrossUserLeverage` |
| [depositMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L671) | :closed_lock_with_key:  | POST | `api/v1/position/margin/deposit-margin` |
| [getCrossMarginRiskLimit()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L683) | :closed_lock_with_key:  | GET | `api/v2/batchGetCrossOrderLimit` |
| [withdrawMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L695) | :closed_lock_with_key:  | POST | `api/v1/margin/withdrawMargin` |
| [getCrossMarginRequirement()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L706) | :closed_lock_with_key:  | GET | `api/v2/getCrossModeMarginRequirement` |
| [getRiskLimitLevel()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L718) | :closed_lock_with_key:  | GET | `api/v1/contracts/risk-limit/{symbol}` |
| [updateRiskLimitLevel()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L728) | :closed_lock_with_key:  | POST | `api/v1/position/risk-limit-level/change` |
| [getPositionMode()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L739) | :closed_lock_with_key:  | GET | `api/v2/position/getPositionMode` |
| [updatePositionMode()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L747) | :closed_lock_with_key:  | POST | `api/v2/position/switchPositionMode` |
| [getFundingRate()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L765) | :closed_lock_with_key:  | GET | `api/v1/funding-rate/{symbol}/current` |
| [getFundingRates()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L775) | :closed_lock_with_key:  | GET | `api/v1/contract/funding-rates` |
| [getFundingHistory()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L785) | :closed_lock_with_key:  | GET | `api/v1/funding-history` |
| [submitCopyTradeOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L805) | :closed_lock_with_key:  | POST | `api/v1/copy-trade/futures/orders` |
| [submitCopyTradeOrderTest()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L820) | :closed_lock_with_key:  | POST | `api/v1/copy-trade/futures/orders/test` |
| [submitCopyTradeSLTPOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L834) | :closed_lock_with_key:  | POST | `api/v1/copy-trade/futures/st-orders` |
| [cancelCopyTradeOrderById()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L847) | :closed_lock_with_key:  | DELETE | `api/v1/copy-trade/futures/orders` |
| [cancelCopyTradeOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L857) | :closed_lock_with_key:  | DELETE | `api/v1/copy-trade/futures/orders/client-order` |
| [getCopyTradeMaxOpenSize()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L871) | :closed_lock_with_key:  | GET | `api/v1/copy-trade/futures/get-max-open-size` |
| [getCopyTradeMaxWithdrawMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L892) | :closed_lock_with_key:  | GET | `api/v1/copy-trade/futures/position/margin/max-withdraw-margin` |
| [addCopyTradeIsolatedMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L906) | :closed_lock_with_key:  | POST | `api/v1/copy-trade/futures/position/margin/deposit-margin` |
| [removeCopyTradeIsolatedMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L922) | :closed_lock_with_key:  | POST | `api/v1/copy-trade/futures/position/margin/withdraw-margin` |
| [modifyCopyTradeRiskLimitLevel()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L938) | :closed_lock_with_key:  | POST | `api/v1/copy-trade/futures/position/risk-limit-level/change` |
| [updateCopyTradeAutoDepositStatus()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L953) | :closed_lock_with_key:  | POST | `api/v1/copy-trade/futures/position/margin/auto-deposit-status` |
| [switchCopyTradeMarginMode()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L968) | :closed_lock_with_key:  | POST | `api/v1/copy-trade/futures/position/changeMarginMode` |
| [updateCopyTradeCrossMarginLeverage()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L981) | :closed_lock_with_key:  | POST | `api/v2/copy-trade/futures/changeCrossUserLeverage` |
| [getCopyTradeCrossMarginRequirement()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L994) | :closed_lock_with_key:  | POST | `api/v2/copy-trade/getCrossModeMarginRequirement` |
| [switchCopyTradePositionMode()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L1008) | :closed_lock_with_key:  | POST | `api/v2/copy-trade/position/switchPositionMode` |
| [getBrokerRebateOrderDownloadLink()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L1028) | :closed_lock_with_key:  | GET | `api/v1/broker/api/rebase/download` |
| [getBrokerRebateOrderDownloadLinkV2()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L1041) | :closed_lock_with_key:  | GET | `api/v2/broker/api/rebase/download` |
| [getPublicWSConnectionToken()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L1055) |  | POST | `api/v1/bullet-public` |
| [getPrivateWSConnectionToken()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L1059) | :closed_lock_with_key:  | POST | `api/v1/bullet-private` |
| [submitTransferOut()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L1072) | :closed_lock_with_key:  | POST | `api/v3/transfer-out` |
| [submitTransferIn()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L1083) | :closed_lock_with_key:  | POST | `api/v1/transfer-in` |
| [getTransfers()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L1094) | :closed_lock_with_key:  | GET | `api/v1/transfer-list` |
| [updateAutoDepositStatus()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L1109) | :closed_lock_with_key:  | POST | `api/v1/position/margin/auto-deposit-status` |

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
| [getAnnouncements()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L66) |  | GET | `api/ua/v1/market/announcement` |
| [getCurrency()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L76) |  | GET | `api/ua/v1/market/currency` |
| [getSymbols()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L86) |  | GET | `api/ua/v1/market/instrument` |
| [getTickers()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L96) |  | GET | `api/ua/v1/market/ticker` |
| [getTrades()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L106) |  | GET | `api/ua/v1/market/trade` |
| [getOrderBook()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L116) |  | GET | `api/ua/v1/market/orderbook` |
| [getKlines()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L126) |  | GET | `api/ua/v1/market/kline` |
| [getCurrentFundingRate()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L136) |  | GET | `api/ua/v1/market/funding-rate` |
| [getHistoryFundingRate()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L146) |  | GET | `api/ua/v1/market/funding-rate-history` |
| [getCrossMarginConfig()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L156) |  | GET | `api/ua/v1/market/cross-config` |
| [getServiceStatus()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/UnifiedAPIClient.ts#L166) |  | GET | `api/ua/v1/server/status` |