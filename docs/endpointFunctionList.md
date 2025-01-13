
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
| [getAnnouncements()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L263) |  | GET | `api/v3/announcements` |
| [getAccountSummary()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L275) | :closed_lock_with_key:  | GET | `api/v2/user-info` |
| [getBalances()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L284) | :closed_lock_with_key:  | GET | `api/v1/accounts` |
| [getAccountDetail()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L290) | :closed_lock_with_key:  | GET | `api/v1/accounts/{accountId}` |
| [getTransactions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L299) | :closed_lock_with_key:  | GET | `api/v1/accounts/ledgers` |
| [getHFTransactions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L308) | :closed_lock_with_key:  | GET | `api/v1/hf/accounts/ledgers` |
| [getHFMarginTransactions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L317) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/account/ledgers` |
| [getSubAccountsV1()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L333) | :closed_lock_with_key:  | GET | `api/v1/sub/user` |
| [getSubAccountsV2()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L337) | :closed_lock_with_key:  | GET | `api/v2/sub/user` |
| [createSubAccount()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L344) | :closed_lock_with_key:  | POST | `api/v2/sub/user/created` |
| [enableSubAccountMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L350) | :closed_lock_with_key:  | POST | `api/v3/sub/user/margin/enable` |
| [enableSubAccountFutures()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L354) | :closed_lock_with_key:  | POST | `api/v3/sub/user/futures/enable` |
| [getSubAccountBalance()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L362) | :closed_lock_with_key:  | GET | `api/v1/sub-accounts/{subUserId}` |
| [getSubAccountBalancesV1()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L369) | :closed_lock_with_key:  | GET | `api/v1/sub-accounts` |
| [getSubAccountBalancesV2()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L373) | :closed_lock_with_key:  | GET | `api/v2/sub-accounts` |
| [getSubAPIs()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L387) | :closed_lock_with_key:  | GET | `api/v1/sub/api-key` |
| [createSubAPI()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L394) | :closed_lock_with_key:  | POST | `api/v1/sub/api-key` |
| [updateSubAPI()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L400) | :closed_lock_with_key:  | POST | `api/v1/sub/api-key/update` |
| [deleteSubAPI()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L406) | :closed_lock_with_key:  | DELETE | `api/v1/sub/api-key` |
| [getMarginBalances()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L422) | :closed_lock_with_key:  | GET | `api/v1/margin/account` |
| [getMarginBalance()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L431) | :closed_lock_with_key:  | GET | `api/v3/margin/accounts` |
| [getIsolatedMarginBalance()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L437) | :closed_lock_with_key:  | GET | `api/v3/isolated/accounts` |
| [createDepositAddress()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L452) | :closed_lock_with_key:  | POST | `api/v1/deposit-addresses` |
| [createDepositAddressV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L459) | :closed_lock_with_key:  | POST | `api/v3/deposit-address/create` |
| [getDepositAddressesV2()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L468) | :closed_lock_with_key:  | GET | `api/v2/deposit-addresses` |
| [getDepositAddressV1()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L477) | :closed_lock_with_key:  | GET | `api/v1/deposit-addresses` |
| [getDepositAddressesV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L484) | :closed_lock_with_key:  | GET | `api/v3/deposit-addresses` |
| [getDeposits()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L492) | :closed_lock_with_key:  | GET | `api/v1/deposits` |
| [getHistoricalDepositsV1()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L502) | :closed_lock_with_key:  | GET | `api/v1/hist-deposits` |
| [getWithdrawals()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L514) | :closed_lock_with_key:  | GET | `api/v1/withdrawals` |
| [getHistoricalWithdrawalsV1()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L524) | :closed_lock_with_key:  | GET | `api/v1/hist-withdrawals` |
| [getWithdrawalQuotas()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L530) | :closed_lock_with_key:  | GET | `api/v1/withdrawals/quotas` |
| [submitWithdraw()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L540) | :closed_lock_with_key:  | POST | `api/v1/withdrawals` |
| [submitWithdrawV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L546) | :closed_lock_with_key:  | POST | `api/v3/withdrawals` |
| [cancelWithdrawal()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L554) | :closed_lock_with_key:  | DELETE | `api/v1/withdrawals/{withdrawalId}` |
| [getTransferable()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L566) | :closed_lock_with_key:  | GET | `api/v1/accounts/transferable` |
| [submitFlexTransfer()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L572) | :closed_lock_with_key:  | POST | `api/v3/accounts/universal-transfer` |
| [submitTransferMasterSub()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L584) | :closed_lock_with_key:  | POST | `api/v2/accounts/sub-transfer` |
| [submitInnerTransfer()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L596) | :closed_lock_with_key:  | POST | `api/v2/accounts/inner-transfer` |
| [getBasicUserFee()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L610) | :closed_lock_with_key:  | GET | `api/v1/base-fee` |
| [getTradingPairFee()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L619) | :closed_lock_with_key:  | GET | `api/v1/trade-fees` |
| [getCurrencies()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L637) |  | GET | `api/v3/currencies` |
| [getCurrency()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L641) |  | GET | `api/v3/currencies/{currency}` |
| [getSymbols()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L648) |  | GET | `api/v2/symbols` |
| [getSymbol()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L654) |  | GET | `api/v2/symbols/{symbol}` |
| [getTicker()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L660) |  | GET | `api/v1/market/orderbook/level1` |
| [getTickers()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L664) |  | GET | `api/v1/market/allTickers` |
| [get24hrStats()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L673) |  | GET | `api/v1/market/stats` |
| [getMarkets()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L679) |  | GET | `api/v1/markets` |
| [getOrderBookLevel20()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L683) |  | GET | `api/v1/market/orderbook/level2_20` |
| [getOrderBookLevel100()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L689) |  | GET | `api/v1/market/orderbook/level2_100` |
| [getFullOrderBook()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L695) | :closed_lock_with_key:  | GET | `api/v3/market/orderbook/level2` |
| [getTradeHistories()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L701) |  | GET | `api/v1/market/histories` |
| [getKlines()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L707) |  | GET | `api/v1/market/candles` |
| [getFiatPrice()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L713) |  | GET | `api/v1/prices` |
| [getUserType()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L723) | :closed_lock_with_key:  | GET | `api/v1/hf/accounts/opened` |
| [submitHFOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L727) | :closed_lock_with_key:  | POST | `api/v1/hf/orders` |
| [submitHFOrderTest()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L736) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/test` |
| [submitHFOrderSync()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L740) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/sync` |
| [submitHFMultipleOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L746) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/multi` |
| [submitHFMultipleOrdersSync()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L752) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/multi/sync` |
| [updateHFOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L758) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/alter` |
| [cancelHFOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L767) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/{orderId}` |
| [cancelHFOrderSync()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L775) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/sync/{orderId}` |
| [cancelHFOrderByClientOId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L785) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/client-order/{clientOid}` |
| [cancelHFOrderSyncByClientOId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L799) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/sync/client-order/{clientOid}` |
| [cancelHFOrdersNumber()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L809) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/cancel/{orderId}` |
| [cancelHFAllOrdersBySymbol()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L818) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders` |
| [cancelHFAllOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L827) | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/cancelAll` |
| [getHFActiveOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L831) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/active` |
| [getHFActiveSymbols()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L837) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/active/symbols` |
| [getHFCompletedOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L845) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/done` |
| [getHFOrderDetailsByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L854) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/{orderId}` |
| [getHFOrderDetailsByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L861) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/client-order/{clientOid}` |
| [cancelHFOrderAutoSetting()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L871) | :closed_lock_with_key:  | POST | `api/v1/hf/orders/dead-cancel-all` |
| [cancelHFOrderAutoSettingQuery()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L883) | :closed_lock_with_key:  | GET | `api/v1/hf/orders/dead-cancel-all/query` |
| [getHFFilledOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L889) | :closed_lock_with_key:  | GET | `api/v1/hf/fills` |
| [submitOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L908) | :closed_lock_with_key:  | POST | `api/v1/orders` |
| [submitOrderTest()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L920) | :closed_lock_with_key:  | POST | `api/v1/orders/test` |
| [submitMultipleOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L928) | :closed_lock_with_key:  | POST | `api/v1/orders/multi` |
| [cancelOrderById()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L939) | :closed_lock_with_key:  | DELETE | `api/v1/orders/{orderId}` |
| [cancelOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L951) | :closed_lock_with_key:  | DELETE | `api/v1/order/client-order/{clientOid}` |
| [cancelAllOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L964) | :closed_lock_with_key:  | DELETE | `api/v1/orders` |
| [getOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L976) | :closed_lock_with_key:  | GET | `api/v1/orders` |
| [getRecentOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L986) | :closed_lock_with_key:  | GET | `api/v1/limit/orders` |
| [getOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L997) | :closed_lock_with_key:  | GET | `api/v1/orders/{orderId}` |
| [getOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1007) | :closed_lock_with_key:  | GET | `api/v1/order/client-order/{clientOid}` |
| [getFills()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1023) | :closed_lock_with_key:  | GET | `api/v1/fills` |
| [getRecentFills()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1033) | :closed_lock_with_key:  | GET | `api/v1/limit/fills` |
| [submitStopOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1044) | :closed_lock_with_key:  | POST | `api/v1/stop-order` |
| [cancelStopOrderById()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1057) | :closed_lock_with_key:  | DELETE | `api/v1/stop-order/{orderId}` |
| [cancelStopOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1067) | :closed_lock_with_key:  | DELETE | `api/v1/stop-order/cancelOrderByClientOid` |
| [cancelStopOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1084) | :closed_lock_with_key:  | DELETE | `api/v1/stop-order/cancel` |
| [getStopOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1094) | :closed_lock_with_key:  | GET | `api/v1/stop-order` |
| [getStopOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1102) | :closed_lock_with_key:  | GET | `api/v1/stop-order/{orderId}` |
| [getStopOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1111) | :closed_lock_with_key:  | GET | `api/v1/stop-order/queryOrderByClientOid` |
| [submitOCOOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1125) | :closed_lock_with_key:  | POST | `api/v3/oco/order` |
| [cancelOCOOrderById()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1136) | :closed_lock_with_key:  | DELETE | `api/v3/oco/order/{orderId}` |
| [cancelOCOOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1147) | :closed_lock_with_key:  | DELETE | `api/v3/oco/client-order/{clientOid}` |
| [cancelMultipleOCOOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1158) | :closed_lock_with_key:  | DELETE | `api/v3/oco/orders` |
| [getOCOOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1172) | :closed_lock_with_key:  | GET | `api/v3/oco/order/{orderId}` |
| [getOCOOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1181) | :closed_lock_with_key:  | GET | `api/v3/oco/client-order/{clientOid}` |
| [getOCOOrderDetails()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1190) | :closed_lock_with_key:  | GET | `api/v3/oco/order/details/{orderId}` |
| [getOCOOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1199) | :closed_lock_with_key:  | GET | `api/v3/oco/orders` |
| [submitHFMarginOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1211) | :closed_lock_with_key:  | POST | `api/v3/hf/margin/order` |
| [submitHFMarginOrderTest()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1219) | :closed_lock_with_key:  | POST | `api/v3/hf/margin/order/test` |
| [cancelHFMarginOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1223) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/orders/{orderId}` |
| [cancelHFMarginOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1234) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/orders/client-order/{clientOid}` |
| [cancelHFAllMarginOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1248) | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/orders` |
| [getHFActiveMarginOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1252) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/orders/active` |
| [getHFMarginFilledOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1258) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/orders/done` |
| [getHFMarginOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1267) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/orders/{orderId}` |
| [getHFMarginOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1274) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/orders/client-order/{clientOid}?symbol={symbol}` |
| [getHFMarginFills()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1283) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/fills` |
| [getHFMarginOpenSymbols()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1292) | :closed_lock_with_key:  | GET | `api/v3/hf/margin/order/active/symbols` |
| [submitMarginOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1308) | :closed_lock_with_key:  | POST | `api/v1/margin/order` |
| [submitMarginOrderTest()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1318) | :closed_lock_with_key:  | POST | `api/v1/margin/order/test` |
| [getMarginLeveragedToken()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1328) | :closed_lock_with_key:  | GET | `api/v3/etf/info` |
| [getMarginMarkPrices()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1334) |  | GET | `api/v3/mark-price/all-symbols` |
| [getMarginMarkPrice()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1338) |  | GET | `api/v1/mark-price/{symbol}/current` |
| [getMarginConfigInfo()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1344) |  | GET | `api/v1/margin/config` |
| [getMarginRiskLimitConfig()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1348) | :closed_lock_with_key:  | GET | `api/v3/margin/currencies` |
| [getIsolatedMarginSymbolsConfig()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1360) | :closed_lock_with_key:  | GET | `api/v1/isolated/symbols` |
| [getIsolatedMarginAccounts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1370) | :closed_lock_with_key:  | GET | `api/v1/isolated/accounts` |
| [getIsolatedMarginAccount()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1380) | :closed_lock_with_key:  | GET | `api/v1/isolated/account/{symbol}` |
| [marginBorrowV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1392) | :closed_lock_with_key:  | POST | `api/v3/margin/borrow` |
| [marginRepayV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1398) | :closed_lock_with_key:  | POST | `api/v3/margin/repay` |
| [getMarginBorrowHistoryV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1404) | :closed_lock_with_key:  | GET | `api/v3/margin/borrow` |
| [getMarginRepayHistoryV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1410) | :closed_lock_with_key:  | GET | `api/v3/margin/repay` |
| [getMarginInterestRecordsV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1416) | :closed_lock_with_key:  | GET | `api/v3/margin/interest` |
| [getMarginActivePairsV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1422) | :closed_lock_with_key:  | GET | `api/v3/margin/symbols` |
| [updateMarginLeverageV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1428) | :closed_lock_with_key:  | POST | `api/v3/position/update-user-leverage` |
| [getLendingCurrencyV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1442) |  | GET | `api/v3/project/list` |
| [getLendingInterestRateV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1448) |  | GET | `api/v3/project/marketInterestRate` |
| [submitLendingSubscriptionV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1459) | :closed_lock_with_key:  | POST | `api/v3/purchase` |
| [submitLendingRedemptionV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1471) | :closed_lock_with_key:  | POST | `api/v3/redeem` |
| [updateLendingSubscriptionOrdersV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1483) | :closed_lock_with_key:  | POST | `api/v3/lend/purchase/update` |
| [getLendingRedemptionOrdersV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1489) | :closed_lock_with_key:  | GET | `api/v3/redeem/orders` |
| [getLendingSubscriptionOrdersV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1495) | :closed_lock_with_key:  | GET | `api/v3/purchase/orders` |
| [subscribeEarnFixedIncome()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1513) | :closed_lock_with_key:  | POST | `api/v1/earn/orders` |
| [submitRedemption()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1525) | :closed_lock_with_key:  | DELETE | `api/v1/earn/orders` |
| [getEarnRedeemPreview()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1536) | :closed_lock_with_key:  | GET | `api/v1/earn/redeem-preview` |
| [getEarnSavingsProducts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1553) | :closed_lock_with_key:  | GET | `api/v1/earn/saving/products` |
| [getEarnFixedIncomeHoldAssets()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1564) | :closed_lock_with_key:  | GET | `api/v1/earn/hold-assets` |
| [getEarnPromotionProducts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1575) | :closed_lock_with_key:  | GET | `api/v1/earn/promotion/products` |
| [getEarnKcsStakingProducts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1593) | :closed_lock_with_key:  | GET | `api/v1/earn/kcs-staking/products` |
| [getEarnStakingProducts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1604) | :closed_lock_with_key:  | GET | `api/v1/earn/staking/products` |
| [getEarnEthStakingProducts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1616) | :closed_lock_with_key:  | GET | `api/v1/earn/eth-staking/products` |
| [getOtcLoan()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1631) | :closed_lock_with_key:  | GET | `api/v1/otc-loan/loan` |
| [getOtcLoanAccounts()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1640) | :closed_lock_with_key:  | GET | `api/v1/otc-loan/accounts` |
| [getAffiliateUserRebateInfo()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1658) | :closed_lock_with_key:  | GET | `api/v2/affiliate/inviter/statistics` |
| [getBrokerRebateOrderDownloadLink()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1671) | :closed_lock_with_key:  | GET | `api/v1/broker/api/rebase/download` |
| [getPublicWSConnectionToken()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1685) |  | POST | `api/v1/bullet-public` |
| [getPrivateWSConnectionToken()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/SpotClient.ts#L1689) | :closed_lock_with_key:  | POST | `api/v1/bullet-private` |

# FuturesClient.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [FuturesClient.ts](/src/FuturesClient.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [getServiceStatus()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L101) |  | GET | `api/v1/status` |
| [getTransactions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L110) | :closed_lock_with_key:  | GET | `api/v1/transaction-history` |
| [getSubAPIs()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L123) | :closed_lock_with_key:  | GET | `api/v1/sub/api-key` |
| [createSubAPI()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L129) | :closed_lock_with_key:  | POST | `api/v1/sub/api-key` |
| [updateSubAPI()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L135) | :closed_lock_with_key:  | POST | `api/v1/sub/api-key/update` |
| [deleteSubAPI()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L141) | :closed_lock_with_key:  | DELETE | `api/v1/sub/api-key` |
| [getBalance()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L154) | :closed_lock_with_key:  | GET | `api/v1/account-overview` |
| [getSubBalances()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L160) | :closed_lock_with_key:  | GET | `api/v1/account-overview-all` |
| [submitTransferOut()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L177) | :closed_lock_with_key:  | POST | `api/v3/transfer-out` |
| [submitTransferIn()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L187) | :closed_lock_with_key:  | POST | `api/v1/transfer-in` |
| [getTransfers()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L194) | :closed_lock_with_key:  | GET | `api/v1/transfer-list` |
| [getTradingPairFee()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L204) | :closed_lock_with_key:  | GET | `api/v1/trade-fees` |
| [getSymbols()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L220) |  | GET | `api/v1/contracts/active` |
| [getSymbol()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L224) |  | GET | `api/v1/contracts/{symbol}` |
| [getTicker()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L230) |  | GET | `api/v1/ticker` |
| [getTickers()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L236) |  | GET | `api/v1/allTickers` |
| [getFullOrderBookLevel2()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L240) |  | GET | `api/v1/level2/snapshot` |
| [getPartOrderBookLevel2Depth20()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L246) |  | GET | `api/v1/level2/depth20` |
| [getPartOrderBookLevel2Depth100()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L252) |  | GET | `api/v1/level2/depth100` |
| [getMarketTrades()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L258) |  | GET | `api/v1/trade/history` |
| [getKlines()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L264) |  | GET | `api/v1/kline/query` |
| [getInterestRates()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L270) |  | GET | `api/v1/interest/query` |
| [getIndex()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L279) |  | GET | `api/v1/index/query` |
| [getMarkPrice()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L288) |  | GET | `api/v1/mark-price/{symbol}/current` |
| [getPremiumIndex()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L294) |  | GET | `api/v1/premium/query` |
| [get24HourTransactionVolume()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L303) |  | GET | `api/v1/trade-statistics` |
| [submitOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L317) | :closed_lock_with_key:  | POST | `api/v1/orders` |
| [submitNewOrderTest()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L326) | :closed_lock_with_key:  | POST | `api/v1/orders/test` |
| [cancelOrderById()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L333) | :closed_lock_with_key:  | DELETE | `api/v1/orders/{orderId}` |
| [cancelOrderByClientOid()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L339) | :closed_lock_with_key:  | DELETE | `api/v1/orders/client-order/{clientOid}` |
| [batchCancelOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L345) | :closed_lock_with_key:  | DELETE | `api/v1/orders/multi-cancel` |
| [submitSLTPOrder()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L353) | :closed_lock_with_key:  | POST | `api/v1/st-orders` |
| [submitMultipleOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L362) | :closed_lock_with_key:  | POST | `api/v1/orders/multi` |
| [cancelAllOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L371) | :closed_lock_with_key:  | DELETE | `api/v1/orders` |
| [cancelAllOrdersV3()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L377) | :closed_lock_with_key:  | DELETE | `api/v3/orders` |
| [cancelAllStopOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L383) | :closed_lock_with_key:  | DELETE | `api/v1/stopOrders` |
| [getOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L389) | :closed_lock_with_key:  | GET | `api/v1/orders` |
| [getStopOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L395) | :closed_lock_with_key:  | GET | `api/v1/stopOrders` |
| [getRecentOrders()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L401) | :closed_lock_with_key:  | GET | `api/v1/recentDoneOrders` |
| [getOrderByOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L407) | :closed_lock_with_key:  | GET | `api/v1/orders/{orderId}` |
| [getOrderByClientOrderId()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L413) | :closed_lock_with_key:  | GET | `api/v1/orders/byClientOid` |
| [getFills()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L431) | :closed_lock_with_key:  | GET | `api/v1/fills` |
| [getRecentFills()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L442) | :closed_lock_with_key:  | GET | `api/v1/recentFills` |
| [getOpenOrderStatistics()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L448) | :closed_lock_with_key:  | GET | `api/v1/openOrderStatistics` |
| [getMaxOpenSize()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L460) | :closed_lock_with_key:  | GET | `api/v2/getMaxOpenSize` |
| [getPosition()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L466) | :closed_lock_with_key:  | GET | `api/v1/position` |
| [getPositions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L472) | :closed_lock_with_key:  | GET | `api/v1/positions` |
| [getHistoryPositions()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L478) | :closed_lock_with_key:  | GET | `api/v1/history-positions` |
| [updateAutoDepositStatus()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L494) | :closed_lock_with_key:  | POST | `api/v1/position/margin/auto-deposit-status` |
| [getMaxWithdrawMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L504) | :closed_lock_with_key:  | GET | `api/v1/margin/maxWithdrawMargin` |
| [withdrawMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L510) | :closed_lock_with_key:  | POST | `api/v1/margin/withdrawMargin` |
| [depositMargin()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L517) | :closed_lock_with_key:  | POST | `api/v1/position/margin/deposit-margin` |
| [getMarginMode()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L525) | :closed_lock_with_key:  | GET | `api/v2/position/getMarginMode` |
| [updateMarginMode()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L534) | :closed_lock_with_key:  | POST | `api/v2/position/changeMarginMode` |
| [getCrossMarginLeverage()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L546) | :closed_lock_with_key:  | GET | `api/v2/getCrossUserLeverage` |
| [changeCrossMarginLeverage()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L555) | :closed_lock_with_key:  | POST | `api/v2/changeCrossUserLeverage` |
| [getRiskLimitLevel()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L573) | :closed_lock_with_key:  | GET | `api/v1/contracts/risk-limit/{symbol}` |
| [updateRiskLimitLevel()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L579) | :closed_lock_with_key:  | POST | `api/v1/position/risk-limit-level/change` |
| [getFundingRate()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L592) |  | GET | `api/v1/funding-rate/{symbol}/current` |
| [getFundingRates()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L598) |  | GET | `api/v1/contract/funding-rates` |
| [getFundingHistory()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L604) | :closed_lock_with_key:  | GET | `api/v1/funding-history` |
| [getBrokerRebateOrderDownloadLink()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L618) | :closed_lock_with_key:  | GET | `api/v1/broker/api/rebase/download` |
| [getPublicWSConnectionToken()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L632) |  | POST | `api/v1/bullet-public` |
| [getPrivateWSConnectionToken()](https://github.com/tiagosiebler/kucoin-api/blob/master/src/FuturesClient.ts#L636) | :closed_lock_with_key:  | POST | `api/v1/bullet-private` |