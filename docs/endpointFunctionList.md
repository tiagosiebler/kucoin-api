
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
| `getServerTime()` |  | GET | `api/v1/timestamp` |
| `getServiceStatus()` |  | GET | `api/v1/status` |
| `getAccountSummary()` | :closed_lock_with_key:  | GET | `api/v2/user-info` |
| `getBalances()` | :closed_lock_with_key:  | GET | `api/v1/accounts` |
| `getAccountDetail()` | :closed_lock_with_key:  | GET | `api/v1/accounts/${params.accountId}` |
| `getTransactions()` | :closed_lock_with_key:  | GET | `api/v1/accounts/ledgers` |
| `getHFTransactions()` | :closed_lock_with_key:  | GET | `api/v1/hf/accounts/ledgers` |
| `getHFMarginTransactions()` | :closed_lock_with_key:  | GET | `api/v3/hf/margin/account/ledgers` |
| `getSubAccountsV1()` | :closed_lock_with_key:  | GET | `api/v1/sub/user` |
| `getSubAccountsV2()` | :closed_lock_with_key:  | GET | `api/v2/sub/user` |
| `createSubAccount()` | :closed_lock_with_key:  | POST | `api/v2/sub/user/created` |
| `getSubAccountBalance()` | :closed_lock_with_key:  | GET | `api/v1/sub-accounts/${params.subUserId}` |
| `getSubAccountBalancesV1()` | :closed_lock_with_key:  | GET | `api/v1/sub-accounts` |
| `getSubAccountBalancesV2()` | :closed_lock_with_key:  | GET | `api/v2/sub-accounts` |
| `getSubAPIs()` | :closed_lock_with_key:  | GET | `api/v1/sub/api-key` |
| `createSubAPI()` | :closed_lock_with_key:  | POST | `api/v1/sub/api-key` |
| `updateSubAPI()` | :closed_lock_with_key:  | POST | `api/v1/sub/api-key/update` |
| `deleteSubAPI()` | :closed_lock_with_key:  | DELETE | `api/v1/sub/api-key` |
| `getMarginBalances()` | :closed_lock_with_key:  | GET | `api/v1/margin/account` |
| `getMarginBalance()` | :closed_lock_with_key:  | GET | `api/v3/margin/accounts` |
| `getIsolatedMarginBalance()` | :closed_lock_with_key:  | GET | `api/v3/isolated/accounts` |
| `createDepositAddress()` | :closed_lock_with_key:  | POST | `api/v1/deposit-addresses` |
| `getDepositAddressesV2()` | :closed_lock_with_key:  | GET | `api/v2/deposit-addresses` |
| `getDepositAddressV1()` | :closed_lock_with_key:  | GET | `api/v1/deposit-addresses` |
| `getDeposits()` | :closed_lock_with_key:  | GET | `api/v1/deposits` |
| `getHistoricalDepositsV1()` | :closed_lock_with_key:  | GET | `api/v1/hist-deposits` |
| `getWithdrawals()` | :closed_lock_with_key:  | GET | `api/v1/withdrawals` |
| `getHistoricalWithdrawalsV1()` | :closed_lock_with_key:  | GET | `api/v1/hist-withdrawals` |
| `getWithdrawalQuotas()` | :closed_lock_with_key:  | GET | `api/v1/withdrawals/quotas` |
| `submitWithdraw()` | :closed_lock_with_key:  | POST | `api/v1/withdrawals` |
| `cancelWithdrawal()` | :closed_lock_with_key:  | DELETE | `api/v1/withdrawals/${params.withdrawalId}` |
| `getTransferable()` | :closed_lock_with_key:  | GET | `api/v1/accounts/transferable` |
| `submitFlexTransfer()` | :closed_lock_with_key:  | POST | `api/v3/accounts/universal-transfer` |
| `submitTransferMasterSub()` | :closed_lock_with_key:  | POST | `api/v2/accounts/sub-transfer` |
| `submitInnerTransfer()` | :closed_lock_with_key:  | POST | `api/v2/accounts/inner-transfer` |
| `getBasicUserFee()` | :closed_lock_with_key:  | GET | `api/v1/base-fee` |
| `getTradingPairFee()` | :closed_lock_with_key:  | GET | `api/v1/trade-fees` |
| `getCurrencies()` |  | GET | `api/v3/currencies` |
| `getCurrency()` |  | GET | `api/v3/currencies/${params.currency}` |
| `getSymbols()` |  | GET | `api/v2/symbols` |
| `getTicker()` |  | GET | `api/v1/market/orderbook/level1` |
| `getTickers()` |  | GET | `api/v1/market/allTickers` |
| `get24hrStats()` |  | GET | `api/v1/market/stats` |
| `getMarkets()` |  | GET | `api/v1/markets` |
| `getOrderBookLevel20()` |  | GET | `api/v1/market/orderbook/level2_20` |
| `getOrderBookLevel100()` |  | GET | `api/v1/market/orderbook/level2_100` |
| `getFullOrderBook()` | :closed_lock_with_key:  | GET | `api/v3/market/orderbook/level2` |
| `getTradeHistories()` |  | GET | `api/v1/market/histories` |
| `getKlines()` |  | GET | `api/v1/market/candles` |
| `getFiatPrice()` |  | GET | `api/v1/prices` |
| `submitHFOrder()` | :closed_lock_with_key:  | POST | `api/v1/hf/orders` |
| `submitHFOrderTest()` | :closed_lock_with_key:  | POST | `api/v1/hf/orders/test` |
| `submitHFOrderSync()` | :closed_lock_with_key:  | POST | `api/v1/hf/orders/sync` |
| `submitHFMultipleOrders()` | :closed_lock_with_key:  | POST | `api/v1/hf/orders/multi` |
| `submitHFMultipleOrdersSync()` | :closed_lock_with_key:  | POST | `api/v1/hf/orders/multi/sync` |
| `updateHFOrder()` | :closed_lock_with_key:  | POST | `api/v1/hf/orders/alter` |
| `cancelHFOrder()` | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/${params.orderId}` |
| `cancelHFOrderSync()` | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/sync/${params.orderId}` |
| `cancelHFOrderByClientOId()` | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/client-order/${params.clientOid}` |
| `cancelHFOrderSyncByClientOId()` | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/sync/client-order/${params.clientOid}` |
| `cancelHFOrdersNumber()` | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/cancel/${params.orderId}` |
| `cancelHFAllOrdersBySymbol()` | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders` |
| `cancelHFAllOrders()` | :closed_lock_with_key:  | DELETE | `api/v1/hf/orders/cancelAll` |
| `getHFActiveOrders()` | :closed_lock_with_key:  | GET | `api/v1/hf/orders/active` |
| `getHFActiveSymbols()` | :closed_lock_with_key:  | GET | `api/v1/hf/orders/active/symbols` |
| `getHFCompletedOrders()` | :closed_lock_with_key:  | GET | `api/v1/hf/orders/done` |
| `getHFOrderDetailsByOrderId()` | :closed_lock_with_key:  | GET | `api/v1/hf/orders/${params.orderId}` |
| `getHFOrderDetailsByClientOid()` | :closed_lock_with_key:  | GET | `api/v1/hf/orders/client-order/${params.clientOid}` |
| `cancelHFOrderAutoSetting()` | :closed_lock_with_key:  | POST | `api/v1/hf/orders/dead-cancel-all` |
| `cancelHFOrderAutoSettingQuery()` | :closed_lock_with_key:  | GET | `api/v1/hf/orders/dead-cancel-all/query` |
| `getHFFilledOrders()` | :closed_lock_with_key:  | GET | `api/v1/hf/fills` |
| `submitOrder()` | :closed_lock_with_key:  | POST | `api/v1/orders` |
| `submitOrderTest()` | :closed_lock_with_key:  | POST | `api/v1/orders/test` |
| `submitMultipleOrders()` | :closed_lock_with_key:  | POST | `api/v1/orders/multi` |
| `cancelOrderById()` | :closed_lock_with_key:  | DELETE | `api/v1/orders/${params.orderId}` |
| `cancelOrderByClientOid()` | :closed_lock_with_key:  | DELETE | `api/v1/order/client-order/${params.clientOid}` |
| `cancelAllOrders()` | :closed_lock_with_key:  | DELETE | `api/v1/orders` |
| `getOrders()` | :closed_lock_with_key:  | GET | `api/v1/orders` |
| `getRecentOrders()` | :closed_lock_with_key:  | GET | `api/v1/limit/orders` |
| `getOrderByOrderId()` | :closed_lock_with_key:  | GET | `api/v1/orders/${params.orderId}` |
| `getOrderByClientOid()` | :closed_lock_with_key:  | GET | `api/v1/order/client-order/${params.clientOid}` |
| `getFills()` | :closed_lock_with_key:  | GET | `api/v1/fills` |
| `getRecentFills()` | :closed_lock_with_key:  | GET | `api/v1/limit/fills` |
| `submitStopOrder()` | :closed_lock_with_key:  | POST | `api/v1/stop-order` |
| `cancelStopOrderById()` | :closed_lock_with_key:  | DELETE | `api/v1/stop-order/${params.orderId}` |
| `cancelStopOrderByClientOid()` | :closed_lock_with_key:  | DELETE | `api/v1/stop-order/cancelOrderByClientOid` |
| `cancelStopOrders()` | :closed_lock_with_key:  | DELETE | `api/v1/stop-order/cancel` |
| `getStopOrders()` | :closed_lock_with_key:  | GET | `api/v1/stop-order` |
| `getStopOrderByOrderId()` | :closed_lock_with_key:  | GET | `api/v1/stop-order/${params.orderId}` |
| `getStopOrderByClientOid()` | :closed_lock_with_key:  | GET | `api/v1/stop-order/queryOrderByClientOid` |
| `submitOCOOrder()` | :closed_lock_with_key:  | POST | `api/v3/oco/order` |
| `cancelOCOOrderById()` | :closed_lock_with_key:  | DELETE | `api/v3/oco/order/${params.orderId}` |
| `cancelOCOOrderByClientOid()` | :closed_lock_with_key:  | DELETE | `api/v3/oco/client-order/${params.clientOid}` |
| `cancelMultipleOCOOrders()` | :closed_lock_with_key:  | DELETE | `api/v3/oco/orders` |
| `getOCOOrderByOrderId()` | :closed_lock_with_key:  | GET | `api/v3/oco/order/${params.orderId}` |
| `getOCOOrderByClientOid()` | :closed_lock_with_key:  | GET | `api/v3/oco/client-order/${params.clientOid}` |
| `getOCOOrderDetails()` | :closed_lock_with_key:  | GET | `api/v3/oco/order/details/${params.orderId}` |
| `getOCOOrders()` | :closed_lock_with_key:  | GET | `api/v3/oco/orders` |
| `submitHFMarginOrder()` | :closed_lock_with_key:  | POST | `api/v3/hf/margin/order` |
| `submitHFMarginOrderTest()` | :closed_lock_with_key:  | POST | `api/v3/hf/margin/order/test` |
| `cancelHFMarginOrder()` | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/orders/${params.orderId}` |
| `cancelHFMarginOrderByClientOid()` | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/orders/client-order/${params.clientOid}` |
| `cancelHFAllMarginOrders()` | :closed_lock_with_key:  | DELETE | `api/v3/hf/margin/orders` |
| `getHFActiveMarginOrders()` | :closed_lock_with_key:  | GET | `api/v3/hf/margin/orders/active` |
| `getHFMarginFilledOrders()` | :closed_lock_with_key:  | GET | `api/v3/hf/margin/orders/done` |
| `getHFMarginOrderByOrderId()` | :closed_lock_with_key:  | GET | `api/v3/hf/margin/orders/${params.orderId}` |
| `getHFMarginOrderByClientOid()` | :closed_lock_with_key:  | GET | `api/v3/hf/margin/orders/client-order/${params.clientOid}?symbol=${params.symbol}` |
| `getHFMarginFills()` | :closed_lock_with_key:  | GET | `api/v3/hf/margin/fills` |
| `getHFMarginOpenSymbols()` | :closed_lock_with_key:  | GET | `api/v3/hf/margin/order/active/symbols` |
| `submitMarginOrder()` | :closed_lock_with_key:  | POST | `api/v1/margin/order` |
| `submitMarginOrderTest()` | :closed_lock_with_key:  | POST | `api/v1/margin/order/test` |
| `getMarginLeveragedToken()` |  | GET | `api/v3/etf/info` |
| `getMarginMarkPrices()` |  | GET | `api/v3/mark-price/all-symbols` |
| `getMarginMarkPrice()` |  | GET | `api/v1/mark-price/${params.symbol}/current` |
| `getMarginConfigInfo()` |  | GET | `api/v1/margin/config` |
| `getMarginRiskLimitConfig()` |  | GET | `api/v3/margin/currencies` |
| `getIsolatedMarginSymbolsConfig()` | :closed_lock_with_key:  | GET | `api/v1/isolated/symbols` |
| `getIsolatedMarginAccounts()` | :closed_lock_with_key:  | GET | `api/v1/isolated/accounts` |
| `getIsolatedMarginAccount()` | :closed_lock_with_key:  | GET | `api/v1/isolated/account/${params.symbol}` |
| `marginBorrowV3()` | :closed_lock_with_key:  | POST | `api/v3/margin/borrow` |
| `marginRepayV3()` | :closed_lock_with_key:  | POST | `api/v3/margin/repay` |
| `getMarginBorrowHistoryV3()` | :closed_lock_with_key:  | GET | `api/v3/margin/borrow` |
| `getMarginRepayHistoryV3()` | :closed_lock_with_key:  | GET | `api/v3/margin/repay` |
| `getMarginInterestRecordsV3()` | :closed_lock_with_key:  | GET | `api/v3/margin/interest` |
| `getMarginActivePairsV3()` | :closed_lock_with_key:  | GET | `api/v3/margin/symbols` |
| `updateMarginLeverageV3()` | :closed_lock_with_key:  | POST | `api/v3/position/update-user-leverage` |
| `getLendingCurrencyV3()` |  | GET | `api/v3/project/list` |
| `getLendingInterestRateV3()` |  | GET | `api/v3/project/marketInterestRate` |
| `submitLendingSubscriptionV3()` | :closed_lock_with_key:  | POST | `api/v3/purchase` |
| `submitLendingRedemptionV3()` | :closed_lock_with_key:  | POST | `api/v3/redeem` |
| `updateLendingSubscriptionOrdersV3()` | :closed_lock_with_key:  | POST | `api/v3/lend/purchase/update` |
| `getLendingRedemptionOrdersV3()` | :closed_lock_with_key:  | GET | `api/v3/redeem/orders` |
| `getLendingSubscriptionOrdersV3()` | :closed_lock_with_key:  | GET | `api/v3/purchase/orders` |
| `subscribeEarnFixedIncome()` | :closed_lock_with_key:  | POST | `api/v1/earn/orders` |
| `submitRedemption()` | :closed_lock_with_key:  | DELETE | `api/v1/earn/orders` |
| `getEarnRedeemPreview()` | :closed_lock_with_key:  | GET | `api/v1/earn/redeem-preview` |
| `getEarnSavingsProducts()` | :closed_lock_with_key:  | GET | `api/v1/earn/saving/products` |
| `getEarnFixedIncomeHoldAssets()` | :closed_lock_with_key:  | GET | `api/v1/earn/hold-assets` |
| `getEarnPromotionProducts()` | :closed_lock_with_key:  | GET | `api/v1/earn/promotion/products` |
| `getEarnKcsStakingProducts()` | :closed_lock_with_key:  | GET | `api/v1/earn/kcs-staking/products` |
| `getEarnStakingProducts()` | :closed_lock_with_key:  | GET | `api/v1/earn/staking/products` |
| `getEarnEthStakingProducts()` | :closed_lock_with_key:  | GET | `api/v1/earn/eth-staking/products` |
| `getOtcLoan()` | :closed_lock_with_key:  | GET | `api/v1/otc-loan/loan` |
| `getOtcLoanAccounts()` | :closed_lock_with_key:  | GET | `api/v1/otc-loan/accounts` |
| `getAffiliateUserRebateInfo()` | :closed_lock_with_key:  | GET | `api/v2/affiliate/inviter/statistics` |
| `getBrokerRebateOrderDownloadLink()` | :closed_lock_with_key:  | GET | `api/v1/broker/api/rebase/download` |
| `getPublicWSConnectionToken()` |  | POST | `api/v1/bullet-public` |
| `getPrivateWSConnectionToken()` | :closed_lock_with_key:  | POST | `api/v1/bullet-private` |

# FuturesClient.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [FuturesClient.ts](/src/FuturesClient.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| `getServerTime()` |  | GET | `api/v1/timestamp` |
| `getServiceStatus()` |  | GET | `api/v1/status` |
| `getTransactions()` | :closed_lock_with_key:  | GET | `api/v1/transaction-history` |
| `getSubAPIs()` | :closed_lock_with_key:  | GET | `api/v1/sub/api-key` |
| `createSubAPI()` | :closed_lock_with_key:  | POST | `api/v1/sub/api-key` |
| `updateSubAPI()` | :closed_lock_with_key:  | POST | `api/v1/sub/api-key/update` |
| `deleteSubAPI()` | :closed_lock_with_key:  | DELETE | `api/v1/sub/api-key` |
| `getBalance()` | :closed_lock_with_key:  | GET | `api/v1/account-overview` |
| `getSubBalances()` | :closed_lock_with_key:  | GET | `api/v1/account-overview-all` |
| `submitTransferOut()` | :closed_lock_with_key:  | POST | `api/v3/transfer-out` |
| `submitTransferIn()` | :closed_lock_with_key:  | POST | `api/v1/transfer-in` |
| `getTransfers()` | :closed_lock_with_key:  | GET | `api/v1/transfer-list` |
| `getTradingPairFee()` | :closed_lock_with_key:  | GET | `/api/v1/trade-fees` |
| `getSymbols()` |  | GET | `api/v1/contracts/active` |
| `getSymbol()` |  | GET | `api/v1/contracts/${params.symbol}` |
| `getTicker()` |  | GET | `api/v1/ticker` |
| `getTickers()` |  | GET | `api/v1/allTickers` |
| `getFullOrderBookLevel2()` |  | GET | `api/v1/level2/snapshot` |
| `getPartOrderBookLevel2Depth20()` |  | GET | `api/v1/level2/depth20` |
| `getPartOrderBookLevel2Depth100()` |  | GET | `api/v1/level2/depth100` |
| `getMarketTrades()` |  | GET | `api/v1/trade/history` |
| `getKlines()` |  | GET | `api/v1/kline/query` |
| `getInterestRates()` |  | GET | `api/v1/interest/query` |
| `getIndex()` |  | GET | `api/v1/index/query` |
| `getMarkPrice()` |  | GET | `api/v1/mark-price/${params.symbol}/current` |
| `getPremiumIndex()` |  | GET | `api/v1/premium/query` |
| `get24HourTransactionVolume()` |  | GET | `api/v1/trade-statistics` |
| `submitOrder()` | :closed_lock_with_key:  | POST | `api/v1/orders` |
| `submitNewOrderTest()` | :closed_lock_with_key:  | POST | `api/v1/orders/test` |
| `cancelOrderById()` | :closed_lock_with_key:  | DELETE | `api/v1/orders/${params.orderId}` |
| `cancelOrderByClientOid()` | :closed_lock_with_key:  | DELETE | `api/v1/orders/client-order/${params.clientOid}` |
| `submitMultipleOrders()` | :closed_lock_with_key:  | POST | `api/v1/orders/multi` |
| `cancelAllOrders()` | :closed_lock_with_key:  | DELETE | `api/v1/orders` |
| `cancelAllStopOrders()` | :closed_lock_with_key:  | DELETE | `api/v1/stopOrders` |
| `getOrders()` | :closed_lock_with_key:  | GET | `api/v1/orders` |
| `getStopOrders()` | :closed_lock_with_key:  | GET | `api/v1/stopOrders` |
| `getRecentOrders()` | :closed_lock_with_key:  | GET | `api/v1/recentDoneOrders` |
| `getOrderByOrderId()` | :closed_lock_with_key:  | GET | `api/v1/orders/${params.orderId}` |
| `getOrderByClientOrderId()` | :closed_lock_with_key:  | GET | `api/v1/orders/byClientOid` |
| `getFills()` | :closed_lock_with_key:  | GET | `api/v1/fills` |
| `getRecentFills()` | :closed_lock_with_key:  | GET | `api/v1/recentFills` |
| `getOpenOrderStatistics()` | :closed_lock_with_key:  | GET | `api/v1/openOrderStatistics` |
| `getMaxOpenSize()` | :closed_lock_with_key:  | GET | `api/v2/getMaxOpenSize` |
| `getPosition()` | :closed_lock_with_key:  | GET | `api/v1/position` |
| `getPositions()` | :closed_lock_with_key:  | GET | `api/v1/positions` |
| `getHistoryPositions()` | :closed_lock_with_key:  | GET | `/api/v1/history-positions` |
| `updateAutoDepositStatus()` | :closed_lock_with_key:  | POST | `api/v1/position/margin/auto-deposit-status` |
| `getMaxWithdrawMargin()` | :closed_lock_with_key:  | GET | `api/v1/margin/maxWithdrawMargin` |
| `withdrawMargin()` | :closed_lock_with_key:  | POST | `api/v1/margin/withdrawMargin` |
| `depositMargin()` | :closed_lock_with_key:  | POST | `api/v1/position/margin/deposit-margin` |
| `getRiskLimitLevel()` | :closed_lock_with_key:  | GET | `api/v1/contracts/risk-limit/${params.symbol}` |
| `updateRiskLimitLevel()` | :closed_lock_with_key:  | POST | `api/v1/position/risk-limit-level/change` |
| `getFundingRate()` |  | GET | `api/v1/funding-rate/${params.symbol}/current` |
| `getFundingRates()` |  | GET | `api/v1/contract/funding-rates` |
| `getFundingHistory()` | :closed_lock_with_key:  | GET | `api/v1/funding-history` |
| `getPublicWSConnectionToken()` |  | POST | `api/v1/bullet-public` |
| `getPrivateWSConnectionToken()` | :closed_lock_with_key:  | POST | `api/v1/bullet-private` |