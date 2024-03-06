import { AxiosRequestConfig } from 'axios';
import { nanoid } from 'nanoid';

import { BaseRestClient } from './lib/BaseRestClient.js';
import {
  REST_CLIENT_TYPE_ENUM,
  RestClientOptions,
  RestClientType,
} from './lib/requestUtils.js';
import { APISuccessResponse } from './types/response/shared.types.js';

/**
 *
 */
export class SpotClient extends BaseRestClient {
  constructor(
    restClientOptions: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {},
  ) {
    super(restClientOptions, requestOptions);
    return this;
  }

  getClientType(): RestClientType {
    return REST_CLIENT_TYPE_ENUM.main;
  }

  /**
   *
   * Misc Utility Methods
   *
   */

  generateNewOrderID(): string {
    return nanoid(32);
  }

  getServerTime(): Promise<any> {
    return this.get('api/v1/timestamp');
  }

  getServiceStatus(): Promise<any> {
    return this.get('api/v1/status');
  }

  /**
   *
   ***********
   * Account
   ***********
   *
   */

  /**
   *
   * Basic Info
   *
   */

  getAccountSummary(): Promise<
    APISuccessResponse<{
      level: number;
      subQuantity: number;
      maxDefaultSubQuantity: number;
      maxSubQuantity: number;
      spotSubQuantity: number;
      marginSubQuantity: number;
      futuresSubQuantity: number;
      maxSpotSubQuantity: number;
      maxMarginSubQuantity: number;
      maxFuturesSubQuantity: number;
    }>
  > {
    return this.getPrivate('api/v2/user-info');
  }

  /**
   * Get a list of acounts and their balance states (spot/margin/trade_hf)
   *
   * Get Account List - Spot/Margin/trade_hf
   */
  getBalances(params?: {
    currency?: string;
    type?: 'main' | 'trade' | 'margin' | 'trade_hf';
  }): Promise<
    Promise<
      APISuccessResponse<
        {
          id: string; // The ID of the account
          currency: string; // Currency
          type: 'main' | 'trade' | 'trade_hf' | 'margin'; // Account type
          balance: string; // Total funds in the account
          available: string; // Funds available to withdraw or trade
          holds: string; // Funds on hold (not available for use)
        }[]
      >
    >
  > {
    return this.getPrivate('api/v1/accounts', params);
  }

  getAccount(params: { accountId: any }): Promise<
    APISuccessResponse<{
      currency: string; // The currency of the account
      balance: string; // Total funds in the account
      available: string; // Funds available to withdraw or trade
      holds: string; // Funds on hold (not available for use)
    }>
  > {
    return this.getPrivate(`api/v1/accounts/${params.accountId}`);
  }

  /**
   * Get Account Ledgers - Spot/Margin
   */
  getAccountSpotMarginTransactions(params: {
    currency?: string; // Comma-separated list of currencies if more than one
    direction?: 'in' | 'out';
    bizType?:
      | 'DEPOSIT'
      | 'WITHDRAW'
      | 'TRANSFER'
      | 'SUB_TRANSFER'
      | 'TRADE_EXCHANGE'
      | 'MARGIN_EXCHANGE'
      | 'KUCOIN_BONUS';
    startAt?: number;
    endAt?: number;
  }): Promise<
    APISuccessResponse<{
      currentPage: number;
      pageSize: number;
      totalNum: number;
      totalPage: number;
      items: {
        id: string; // unique key
        currency: string; // The currency of an account
        amount: string; // The total amount of assets (fees included) involved in assets changes
        fee: string; // Fees generated in transaction, withdrawal, etc.
        balance: string; // Remaining funds after the transaction.
        accountType: 'MAIN' | 'TRADE' | 'MARGIN' | 'CONTRACT'; // The account type
        bizType: string; // Business type leading to the changes in funds
        direction: 'in' | 'out'; // Side, out or in
        createdAt: number; // Time of the event
        context: string; // Business related information
      }[];
    }>
  > {
    return this.getPrivate('api/v1/accounts/ledgers', params);
  }

  /**
   * Get Account Ledgers - trade_hf
   */
  getAccountHFTransactions(params: {
    currency?: string; // Comma-separated list of currencies if more than one
    direction?: 'in' | 'out';
    bizType?: 'TRANSFER' | 'TRADE_EXCHANGE';
    lastId?: number;
    limit?: number;
    startAt?: number;
    endAt?: number;
  }): Promise<
    APISuccessResponse<
      {
        id: string; // Unique key
        currency: string; // currency
        amount: string; // Change in funds balance
        fee: string; // Deposit or withdrawal fee
        balance: string; // Total balance of funds after change
        accountType: 'TRADE_HF'; // Master account type TRADE_HF
        bizType: 'TRANSFER' | 'TRADE_EXCHANGE'; // Transaction type
        direction: 'out' | 'in'; // Direction of transfer
        createdAt: string; // Created
        context: string; // Core transaction parameter
      }[]
    >
  > {
    return this.getPrivate('api/v1/hf/accounts/ledgers', params);
  }

  /**
   * Get Account Ledgers - margin_hf
   */
  getAccountHFMarginTransactions(params: {
    currency?: string; // Comma-separated list of currencies if more than one
    direction?: 'in' | 'out';
    bizType?:
      | 'TRANSFER'
      | 'MARGIN_EXCHANGE'
      | 'ISOLATED_EXCHANGE'
      | 'LIQUIDATION'
      | 'ASSERT_RETURN';
    lastId?: number;
    limit?: number;
    startAt?: number;
    endAt?: number;
  }): Promise<
    APISuccessResponse<
      {
        id: string; // Unique key
        currency: string; // currency
        amount: string; // Change in funds balance
        fee: string; // Deposit or withdrawal fee
        balance: string; // Total balance of funds after change
        accountType: 'MARGIN_V2' | 'ISOLATED_V2'; // Master account type MARGIN_V2, ISOLATED_V2
        bizType:
          | 'TRANSFER'
          | 'MARGIN_EXCHANGE'
          | 'ISOLATED_EXCHANGE'
          | 'LIQUIDATION'
          | 'ASSERT_RETURN'; // Transaction type
        direction: 'out' | 'in'; // Direction of transfer
        createdAt: string; // Created
        context: string; // Core transaction parameter
      }[]
    >
  > {
    return this.getPrivate('api/v3/hf/margin/account/ledgers', params);
  }

  /**
   *
   * Sub-Account
   *
   */

  getSubAccountsV1(): Promise<
    APISuccessResponse<
      Array<{
        userId: string; // The user ID of your sub-account
        uid: string; // The UID of your sub-account
        subName: string; // The username of your sub-account
        type: number; // The type of your sub-account
        remarks: string; // Remark
        access: string; // The permissions of your sub-account
      }>
    >
  > {
    return this.getPrivate('api/v1/sub/user');
  }

  getSubAccountsV2(params: {
    currentPage?: number;
    pageSize?: number;
  }): Promise<
    APISuccessResponse<{
      currentPage: number;
      pageSize: number;
      totalNum: number;
      totalPage: number;
      items: Array<{
        userId: string; // The user ID of your sub-account
        uid: number; // Sub-account UID
        subName: string; // Sub-account name
        status: number; // Account status
        type: number; // The type of your sub-account
        access: string; // Permission
        createdAt: number; // Time of the event
        remarks: string | null; // Remarks
      }>;
    }>
  > {
    return this.getPrivate('api/v2/sub/user', params);
  }

  createSubAccount(params: {
    password: string;
    remarks?: string;
    subName: string;
    access: string;
  }): Promise<
    APISuccessResponse<{
      uid: number; // Sub-account UID
      subName: string; // Sub-account name
      remarks: string; // Remarks
      access: string; // Permission
    }>
  > {
    return this.postPrivate('api/v2/sub/user/created', params);
  }

  getSubAccountBalance(params: {
    subUserId: string;
    includeBaseAmount: boolean;
  }): Promise<
    APISuccessResponse<{
      subUserId: string; // The user ID of a sub-user.
      subName: string; // The username of a sub-user.
      mainAccounts: Array<{
        currency: string; // Currency
        balance: string; // Total funds in an account.
        available: string; // Funds available to withdraw or trade.
        holds: string; // Funds on hold (not available for use).
        baseCurrency: string; // Calculated on this currency.
        baseCurrencyPrice: string; // The base currency price.
        baseAmount: string; // The base currency amount.
      }>;
      tradeAccounts: Array<{
        currency: string; // Currency
        balance: string; // Total funds in an account.
        available: string; // Funds available to withdraw or trade.
        holds: string; // Funds on hold (not available for use).
        baseCurrency: string; // Calculated on this currency.
        baseCurrencyPrice: string; // The base currency price.
        baseAmount: string; // The base currency amount.
      }>;
      marginAccounts: Array<{
        currency: string; // Currency
        balance: string; // Total funds in an account.
        available: string; // Funds available to withdraw or trade.
        holds: string; // Funds on hold (not available for use).
        baseCurrency: string; // Calculated on this currency.
        baseCurrencyPrice: string; // The base currency price.
        baseAmount: string; // The base currency amount.
      }>;
    }>
  > {
    return this.getPrivate(`api/v1/sub-accounts/${params.subUserId}`, params);
  }

  getSubAccountBalancesV1(): Promise<
    APISuccessResponse<{
      subUserId: string; // The user ID of a sub-user.
      subName: string; // The username of a sub-user.
      mainAccounts: Array<{
        currency: string; // Currency
        balance: string; // Total funds in an account.
        available: string; // Funds available to withdraw or trade.
        holds: string; // Funds on hold (not available for use).
        baseCurrency: string; // Calculated on this currency.
        baseCurrencyPrice: string; // The base currency price.
        baseAmount: string; // The base currency amount.
      }>;
      tradeAccounts: Array<{
        currency: string; // Currency
        balance: string; // Total funds in an account.
        available: string; // Funds available to withdraw or trade.
        holds: string; // Funds on hold (not available for use).
        baseCurrency: string; // Calculated on this currency.
        baseCurrencyPrice: string; // The base currency price.
        baseAmount: string; // The base currency amount.
      }>;
      marginAccounts: Array<{
        currency: string; // Currency
        balance: string; // Total funds in an account.
        available: string; // Funds available to withdraw or trade.
        holds: string; // Funds on hold (not available for use).
        baseCurrency: string; // Calculated on this currency.
        baseCurrencyPrice: string; // The base currency price.
        baseAmount: string; // The base currency amount.
      }>;
    }>
  > {
    return this.getPrivate('api/v1/sub-accounts');
  }

  getSubAccountBalancesV2(params: {
    currentPage?: number;
    pageSize?: number;
  }): Promise<
    APISuccessResponse<{
      currentPage: number;
      pageSize: number;
      totalNum: number;
      totalPage: number;
      items: Array<{
        subUserId: string; // The user ID of the sub-user.
        subName: string; // The username of the sub-user.
        mainAccounts: Array<{
          currency: string; // The currency of the account.
          balance: string; // Total funds in the account.
          available: string; // Funds available to withdraw or trade.
          holds: string; // Funds on hold (not available for use).
          baseCurrency: string; // Calculated on this currency.
          baseCurrencyPrice: string; // The base currency price.
          baseAmount: string; // The base currency amount.
        }>;
      }>;
    }>
  > {
    return this.getPrivate('api/v2/sub-accounts', params);
  }

  /**
   *
   * Sub-Account API
   *
   *
   */

  getSubAccountAPIs(params: { apiKey?: string; subName: string }): Promise<
    APISuccessResponse<
      Array<{
        apiKey: string; // API-Key
        createdAt: number; // Time of the event
        ipWhitelist: string; // IP whitelist
        permission: string; // Permissions
        remark: string; // Remarks
        subName: string; // Sub-account name
      }>
    >
  > {
    return this.getPrivate('api/v1/sub/api-key', params);
  }

  createSubAccountAPI(params: {
    subName: string;
    passphrase: string;
    remark: string;
    permission?: string;
    ipWhitelist?: string;
    expire?: string;
  }): Promise<
    APISuccessResponse<{
      apiKey: string; // API-Key
      createdAt: number; // Time of the event
      ipWhitelist: string; // IP whitelist
      permission: string; // Permissions
      remark: string; // Remarks
      subName: string; // Sub-account name
      apiSecret: string; // API secret
      passphrase: string; // Password
    }>
  > {
    return this.postPrivate('api/v1/sub/api-key', params);
  }

  updateSubAccountAPI(params: {
    subName: string;
    apiKey: string;
    passphrase: string;
    permission?: string;
    ipWhitelist?: string;
    expire?: string;
  }): Promise<
    APISuccessResponse<{
      apiKey: string; // API-Key
      ipWhitelist: string; // IP whitelist
      permission: string; // Permissions
      subName: string; // Sub-account name
    }>
  > {
    return this.postPrivate('api/v1/sub/api-key/update', params);
  }

  deleteSubAccountAPI(params: {
    apiKey: string;
    passphrase: string;
    subName: string;
  }): Promise<
    APISuccessResponse<{
      subName: string; // Sub-account name
      apiKey: string; // API-Key
    }>
  > {
    return this.deletePrivate('api/v1/sub/api-key', params);
  }

  /**
   *
   ***********
   * Funding
   ***********
   *
   */

  getMarginAccountBalances(): Promise<
    APISuccessResponse<{
      debtRatio: string; // Debt ratio
      accounts: Array<{
        currency: string; // Currency
        totalBalance: string; // Total funds in the account
        availableBalance: string; // Available funds in the account
        holdBalance: string; // Funds on hold in the account
        liability: string; // Total liabilities
        maxBorrowSize: string; // Available size to borrow
      }>;
    }>
  > {
    return this.getPrivate('api/v1/margin/account');
  }

  getMarginAccountBalanceDetail(params?: {
    quoteCurrency?: string;
    queryType?: 'MARGIN' | 'MARGIN_V2' | 'ALL';
  }): Promise<
    APISuccessResponse<{
      timestamp: number;
      currentPage: number;
      pageSize: number;
      totalNum: number;
      totalPage: number;
      items: Array<{
        totalLiabilityOfQuoteCurrency: string; // Total Liability in Quote Currency
        totalAssetOfQuoteCurrency: string; // Total Assets in Quote Currency
        debtRatio: string; // debt ratio
        status: 'EFFECTIVE' | 'BANKRUPTCY' | 'LIQUIDATION' | 'REPAY' | 'BORROW'; // Position status
        assets: Array<{
          currency: string; // currency
          borrowEnabled: boolean; // Support borrow or not
          repayEnabled: boolean; // Support repay or not
          transferEnabled: boolean; // Support transfer or not
          borrowed: string; // Liabilities
          totalAsset: string; // Total Assets
          available: string; // Account available assets (total assets - frozen)
          hold: string; // Account frozen assets
          maxBorrowSize: string; // The user's remaining maximum loan amount
        }>;
      }>;
    }>
  > {
    return this.getPrivate('api/v3/margin/accounts', params);
  }

  getIsolatedMarginAccountBalanceDetail(params?: {
    symbol?: string;
    quoteCurrency?: string;
    queryType?: 'ISOLATED' | 'ISOLATED_V2' | 'ALL';
  }): Promise<
    APISuccessResponse<
      Array<{
        totalAssetOfQuoteCurrency: string; // Total Assets in Quote Currency
        totalLiabilityOfQuoteCurrency: string; // Total Liability in Quote Currency
        timestamp: number; // timestamp
        assets: Array<{
          symbol: string; // symbol
          debtRatio: string; // debt ratio
          status:
            | 'EFFECTIVE'
            | 'BANKRUPTCY'
            | 'LIQUIDATION'
            | 'REPAY'
            | 'BORROW'; // Position status
          baseAsset: {
            currency: string; // currency
            borrowEnabled: boolean; // Support borrow or not
            repayEnabled: boolean; // Support repay or not
            transferEnabled: boolean; // Support transfer or not
            borrowed: string; // Liabilities
            totalAsset: string; // Total Assets
            available: string; // Account available assets (total assets - frozen)
            hold: string; // Account frozen assets
            maxBorrowSize: string; // The user's remaining maximum loan amount
          };
          quoteAsset: {
            currency: string; // currency
            borrowEnabled: boolean; // Support borrow or not
            repayEnabled: boolean; // Support repay or not
            transferEnabled: boolean; // Support transfer or not
            borrowed: string; // Liabilities
            totalAsset: string; // Total Assets
            available: string; // Account available assets (total assets - frozen)
            hold: string; // Account frozen assets
            maxBorrowSize: string; // The user's remaining maximum loan amount
          };
        }>;
      }>
    >
  > {
    return this.getPrivate('api/v3/isolated/accounts', params);
  }

  /**
   *
   * Deposit
   *
   */

  createDepositAddress(params: { currency: string; chain?: string }): Promise<
    APISuccessResponse<{
      address: string; // Deposit address
      memo: string; // Address remark. If there’s no remark, it is empty.
      chain: string; // The chain name of currency
    }>
  > {
    return this.postPrivate('api/v1/deposit-addresses', params);
  }

  getDepositAddressesV2(params: { currency: string }): Promise<
    APISuccessResponse<
      Array<{
        address: string; // Deposit address
        memo: string; // Address remark. If there’s no remark, it is empty.
        chain: string; // The chain name of currency.
        contractAddress: string; // The token contract address.
      }>
    >
  > {
    return this.getPrivate('api/v2/deposit-addresses', params);
  }

  getDepositAddress(params: { currency: string; chain?: string }): Promise<
    APISuccessResponse<{
      address: string; // Deposit address
      memo: string; // Address remark. If there’s no remark, it is empty.
      chain: string; // The chain name of currency
    }>
  > {
    return this.getPrivate('api/v1/deposit-addresses', params);
  }

  getDepositList(params?: {
    currency?: string;
    startAt?: number;
    endAt?: number;
    status?: 'PROCESSING' | 'SUCCESS' | 'FAILURE';
  }): Promise<
    APISuccessResponse<{
      currentPage: number;
      pageSize: number;
      totalNum: number;
      totalPage: number;
      items: Array<{
        address: string; // Deposit address
        memo: string; // Address remark. If there’s no remark, it is empty.
        amount: string; // Deposit amount
        fee: string; // Fees charged for deposit
        currency: string; // Currency
        chain: string; // The chain of currency
        isInner: boolean; // Internal deposit or not
        walletTxId: string; // Wallet Txid
        status: 'PROCESSING' | 'SUCCESS' | 'FAILURE'; // Status
        remark: string; // remark
        createdAt: number; // Creation time of the database record
        updatedAt: number; // Update time of the database record
      }>;
    }>
  > {
    return this.getPrivate('api/v1/deposits', params);
  }

  getV1HistoricalDepositsList(params?: {
    currency?: string;
    startAt?: number;
    endAt?: number;
    status?: 'PROCESSING' | 'SUCCESS' | 'FAILURE';
  }): Promise<
    APISuccessResponse<{
      currentPage: number;
      pageSize: number;
      totalNum: number;
      totalPage: number;
      items: Array<{
        currency: string; // Currency
        createAt: number; // Creation time of the database record
        amount: string; // Deposit amount
        walletTxId: string; // Wallet Txid
        isInner: boolean; // Internal deposit or not
        status: 'PROCESSING' | 'SUCCESS' | 'FAILURE'; // Status
      }>;
    }>
  > {
    return this.getPrivate('api/v1/hist-deposits', params);
  }

  /**
   *
   * Withdrawals
   *
   */

  getWithdrawalsList(params?: {
    currency?: string;
    status?: 'PROCESSING' | 'WALLET_PROCESSING' | 'SUCCESS' | 'FAILURE';
    startAt?: number;
    endAt?: number;
  }): Promise<
    APISuccessResponse<{
      currentPage: number;
      pageSize: number;
      totalNum: number;
      totalPage: number;
      items: Array<{
        id: string; // Unique identity
        address: string; // Withdrawal address
        memo: string; // Address remark. If there’s no remark, it is empty.
        currency: string; // Currency
        chain: string; // The chain of currency
        amount: string; // Withdrawal amount
        fee: string; // Withdrawal fee
        walletTxId: string; // Wallet Txid
        isInner: boolean; // Internal withdrawal or not
        status: 'PROCESSING' | 'WALLET_PROCESSING' | 'SUCCESS' | 'FAILURE'; // status
        remark: string; // remark
        createdAt: number; // Creation time
        updatedAt: number; // Update time
      }>;
    }>
  > {
    return this.getPrivate('api/v1/withdrawals', params);
  }

  getV1HistoricalWithdrawalsList(params?: {
    currency?: string;
    startAt?: number;
    endAt?: number;
    status?: 'PROCESSING' | 'SUCCESS' | 'FAILURE';
  }): Promise<
    APISuccessResponse<{
      currentPage: number;
      pageSize: number;
      totalNum: number;
      totalPage: number;
      items: Array<{
        currency: string; // Currency
        createAt: number; // Creation time of the database record
        amount: string; // Withdrawal amount
        address: string; // Withdrawal address
        walletTxId: string; // Wallet Txid
        isInner: boolean; // Internal deposit or not
        status: 'PROCESSING' | 'SUCCESS' | 'FAILURE'; // Status
      }>;
    }>
  > {
    return this.getPrivate('api/v1/hist-withdrawals', params);
  }

  getWithdrawalQuotas(params: { currency: string; chain?: string }): Promise<
    APISuccessResponse<{
      limitBTCAmount: string; // 24-hour total withdrawal limit, equivalent to BTC
      quotaCurrency: string; // withdrawal limit currency
      chain: string; // The chain name of currency
      remainAmount: string; // Remaining amount available to withdraw the current day
      innerWithdrawMinFee: string; // Fees for internal withdrawal
      usedBTCAmount: string; // The estimated BTC amount (based on the daily fiat limit) that can be withdrawn within the current day
      limitQuotaCurrencyAmount: string; // The intraday available withdrawal amount(withdrawal limit currency)
      withdrawMinSize: string; // Minimum withdrawal amount
      withdrawMinFee: string; // Minimum withdrawal fee
      precision: number; // Floating point precision.
      reason: string | null; // Reason for withdrawal limit (if any)
      usedQuotaCurrencyAmount: string; // The intraday cumulative withdrawal amount(withdrawal limit currency)
      currency: string; // Currency
      availableAmount: string; // Current available withdrawal amount
      isWithdrawEnabled: boolean; // Is the withdraw function enabled or not
    }>
  > {
    return this.getPrivate('api/v1/withdrawals/quotas', params);
  }

  applyWithdraw(params: {
    currency: string;
    address: string;
    amount: number;
    memo?: string;
    isInner?: boolean;
    remark?: string;
    chain?: string;
    feeDeductType?: 'INTERNAL' | 'EXTERNAL';
  }): Promise<APISuccessResponse<{ withdrawalId: string }>> {
    return this.postPrivate('api/v1/withdrawals', params);
  }

  cancelWithdrawal(params: {
    withdrawalId: string;
  }): Promise<APISuccessResponse<{ withdrawalId: string }>> {
    return this.deletePrivate(`api/v1/withdrawals/${params.withdrawalId}`);
  }

  /**
   *
   * Transfer
   *
   */

  getTransferable(params: {
    currency: string;
    type: 'MAIN' | 'TRADE' | 'TRADE_HF' | 'MARGIN' | 'ISOLATED';
    tag?: string;
  }): Promise<
    APISuccessResponse<{
      currency: string; // Currency
      balance: string; // Total funds in an account.
      available: string; // Funds available to withdraw or trade.
      holds: string; // Funds on hold (not available for use).
      transferable: string; // Funds available to transfer.
    }>
  > {
    return this.getPrivate('api/v1/accounts/transferable', params);
  }

  flexTransfer(params: {
    clientOid: string;
    currency?: string;
    amount: string;
    fromUserId?: string;
    fromAccountType:
      | 'MAIN'
      | 'TRADE'
      | 'CONTRACT'
      | 'MARGIN'
      | 'ISOLATED'
      | 'TRADE_HF'
      | 'MARGIN_V2'
      | 'ISOLATED_V2';
    fromAccountTag?: string;
    type: 'INTERNAL' | 'PARENT_TO_SUB' | 'SUB_TO_PARENT';
    toUserId?: string;
    toAccountType:
      | 'MAIN'
      | 'TRADE'
      | 'CONTRACT'
      | 'MARGIN'
      | 'ISOLATED'
      | 'TRADE_HF'
      | 'MARGIN_V2'
      | 'ISOLATED_V2';
    toAccountTag?: string;
  }): Promise<
    APISuccessResponse<{
      orderId: string; // Transfer order ID
    }>
  > {
    return this.postPrivate('api/v3/accounts/universal-transfer', params);
  }

  transferBetweenMasterAndSubAccount(params: {
    clientOid: string;
    currency: string;
    amount: string;
    direction: 'OUT' | 'IN';
    accountType?: 'MAIN' | 'TRADE' | 'TRADE_HF' | 'MARGIN' | 'CONTRACT';
    subAccountType?: 'MAIN' | 'TRADE' | 'TRADE_HF' | 'MARGIN' | 'CONTRACT';
    subUserId: string;
  }): Promise<
    APISuccessResponse<{
      orderId: string; // Transfer order ID
    }>
  > {
    return this.postPrivate('api/v2/accounts/sub-transfer', params);
  }

  innerTransfer(params: {
    clientOid: string;
    currency: string;
    from:
      | 'main'
      | 'trade'
      | 'trade_hf'
      | 'margin'
      | 'isolated'
      | 'margin_v2'
      | 'isolated_v2'
      | 'contract';
    to:
      | 'main'
      | 'trade'
      | 'trade_hf'
      | 'margin'
      | 'isolated'
      | 'margin_v2'
      | 'isolated_v2'
      | 'contract';
    amount: string;
    fromTag?: string;
    toTag?: string;
  }): Promise<
    APISuccessResponse<{
      orderId: string; // Transfer order ID
    }>
  > {
    return this.postPrivate('api/v2/accounts/inner-transfer', params);
  }

  /**
   *
   * Trade Fee
   *
   */

  getBasicUserFee(params: { currencyType: string }): Promise<
    APISuccessResponse<{
      takerFeeRate: string; // Taker fee rate
      makerFeeRate: string; // Maker fee rate
    }>
  > {
    return this.getPrivate('api/v1/base-fee', params);
  }

  getTradingPairActualFee(params: { symbols: string }): Promise<
    APISuccessResponse<
      Array<{
        symbol: string; // Trading pair
        takerFeeRate: string; // Taker fee rate
        makerFeeRate: string; // Maker fee rate
      }>
    >
  > {
    return this.getPrivate('api/v1/trade-fees', params);
  }

  /**
   *
   ***********
   * Spot Trading
   ***********
   *
   */

  /**
   *
   * Market data
   *
   */

  getSpotCurrencyList(): Promise<
    APISuccessResponse<
      Array<{
        currency: string; // A unique currency code that will never change
        name: string; // Currency name, will change after renaming
        fullName: string; // Full name of a currency, will change after renaming
        precision: number; // Currency precision
        confirms: number | null; // Number of block confirmations
        contractAddress: string | null; // Contract address
        isMarginEnabled: boolean; // Support margin or not
        isDebitEnabled: boolean; // Support debit or not
        chains: Array<{
          chainName: string; // Chain name of currency
          withdrawalMinSize: string; // Minimum withdrawal amount
          withdrawalMinFee: string; // Minimum fees charged for withdrawal
          isWithdrawEnabled: boolean; // Support withdrawal or not
          isDepositEnabled: boolean; // Support deposit or not
          confirms: number; // Number of block confirmations
          preConfirms: number; // The number of blocks (confirmations) for advance on-chain verification
          contractAddress: string; // Contract address
          chainId: string; // Chain of currency
        }>;
      }>
    >
  > {
    return this.get('api/v3/currencies');
  }

  getSpotCurrencyDetail(params: { currency: string; chain?: string }): Promise<
    APISuccessResponse<{
      currency: string; // A unique currency code that will never change
      name: string; // Currency name, will change after renaming
      fullName: string; // Full name of a currency, will change after renaming
      precision: number; // Currency precision
      confirms: number | null; // Number of block confirmations
      contractAddress: string | null; // Contract address
      isMarginEnabled: boolean; // Support margin or not
      isDebitEnabled: boolean; // Support debit or not
      chains: Array<{
        chainName: string; // Chain name of currency
        withdrawalMinSize: string; // Minimum withdrawal amount
        withdrawalMinFee: string; // Minimum fees charged for withdrawal
        isWithdrawEnabled: boolean; // Support withdrawal or not
        isDepositEnabled: boolean; // Support deposit or not
        confirms: number; // Number of block confirmations
        preConfirms: number; // The number of blocks (confirmations) for advance on-chain verification
        contractAddress: string; // Contract address
        chainId: string; // Chain of currency
      }>;
    }>
  > {
    return this.get(`api/v3/currencies/${params.currency}`, params);
  }

  getSpotSymbolsList(params?: { market?: string }): Promise<
    APISuccessResponse<
      Array<{
        symbol: string; // unique code of a symbol, it would not change after renaming
        name: string; // Name of trading pairs, it would change after renaming
        baseCurrency: string; // Base currency,e.g. BTC.
        quoteCurrency: string; // Quote currency,e.g. USDT.
        feeCurrency: string; // The currency of charged fees.
        market: string; // The trading market.
        baseMinSize: string; // The minimum order quantity required to place an order.
        quoteMinSize: string; // The minimum order funds required to place a market order.
        baseMaxSize: string; // The maximum order size required to place an order.
        quoteMaxSize: string; // The maximum order funds required to place a market order.
        baseIncrement: string; // The increment of the order size. The value shall be a positive multiple of the baseIncrement.
        quoteIncrement: string; // The increment of the funds required to place a market order. The value shall be a positive multiple of the quoteIncrement.
        priceIncrement: string; // The increment of the price required to place a limit order. The value shall be a positive multiple of the priceIncrement.
        priceLimitRate: string; // Threshold for price protection
        minFunds: string; // the minimum spot and margin trading amounts
        isMarginEnabled: boolean; // Available for margin or not.
        enableTrading: boolean; // Available for transaction or not.
      }>
    >
  > {
    return this.get('api/v2/symbols', params);
  }

  getSpotTicker(params: { symbol: string }): Promise<
    APISuccessResponse<{
      sequence: string; // Sequence
      price: string; // Last traded price
      size: string; // Last traded size
      bestAsk: string; // Best ask price
      bestAskSize: string; // Best ask size
      bestBid: string; // Best bid price
      bestBidSize: string; // Best bid size
      time: number; // timestamp
    }>
  > {
    return this.get(`api/v1/market/orderbook/level1`, params);
  }

  getSpotAllTickers(): Promise<
    APISuccessResponse<{
      time: number; // timestamp
      ticker: Array<{
        symbol: string; // Symbol
        symbolName: string; // Name of trading pairs, it would change after renaming
        buy: string; // Best bid price
        sell: string; // Best ask price
        bestBidSize: string; // Best bid size
        bestAskSize: string; // Best ask size
        changeRate: string; // 24h change rate
        changePrice: string; // 24h change price
        high: string; // Highest price in 24h
        low: string; // Lowest price in 24h
        vol: string; // 24h volume, executed based on base currency
        volValue: string; // 24h traded amount
        last: string; // Last traded price
        averagePrice: string; // Average trading price in the last 24 hours
        takerFeeRate: string; // Basic Taker Fee
        makerFeeRate: string; // Basic Maker Fee
        takerCoefficient: string; // Taker Fee Coefficient
        makerCoefficient: string; // Maker Fee Coefficient
      }>;
    }>
  > {
    return this.get('api/v1/market/allTickers');
  }

  getSpot24hrStats(params: { symbol: string }): Promise<
    APISuccessResponse<{
      time: number; // timestamp
      symbol: string; // Symbol
      buy: string; // Best bid price
      sell: string; // Best ask price
      changeRate: string; // 24h change rate
      changePrice: string; // 24h change price
      high: string; // Highest price in 24h
      low: string; // Lowest price in 24h
      vol: string; // 24h volume, executed based on base currency
      volValue: string; // 24h traded amount
      last: string; // Last traded price
      averagePrice: string; // Average trading price in the last 24 hours
      takerFeeRate: string; // Basic Taker Fee
      makerFeeRate: string; // Basic Maker Fee
      takerCoefficient: string; // Taker Fee Coefficient
      makerCoefficient: string; // Maker Fee Coefficient
    }>
  > {
    return this.get('api/v1/market/stats', params);
  }

  getSpotMarketList(): Promise<APISuccessResponse<Array<string>>> {
    return this.get('api/v1/markets');
  }

  getSpotPartOrderBookLevel20(params: { symbol: string }): Promise<
    APISuccessResponse<{
      sequence: string; // Sequence number
      time: number; // Timestamp
      bids: Array<[string, string]>; // bids [price, size]
      asks: Array<[string, string]>; // asks [price, size]
    }>
  > {
    return this.get(`api/v1/market/orderbook/level2_20`, params);
  }

  getSpotPartOrderBookLevel100(params: { symbol: string }): Promise<
    APISuccessResponse<{
      sequence: string; // Sequence number
      time: number; // Timestamp
      bids: Array<[string, string]>; // bids [price, size]
      asks: Array<[string, string]>; // asks [price, size]
    }>
  > {
    return this.get(`api/v1/market/orderbook/level2_100`, params);
  }

  getSpotFullOrderBook(params: { symbol: string }): Promise<
    APISuccessResponse<{
      sequence: string; // Sequence number
      time: number; // Timestamp
      bids: Array<[string, string]>; // bids [price, size]
      asks: Array<[string, string]>; // asks [price, size]
    }>
  > {
    return this.get('api/v3/market/orderbook/level2', params);
  }

  getSpotTradeHistories(params: { symbol: string }): Promise<
    APISuccessResponse<
      Array<{
        sequence: string; // Sequence number
        time: number; // Transaction time
        price: string; // Filled price
        size: string; // Filled amount
        side: string; // Filled side. The filled side is set to the taker by default.
      }>
    >
  > {
    return this.get('api/v1/market/histories', params);
  }

  getSpotKlines(params: {
    symbol: string;
    startAt?: number;
    endAt?: number;
    type:
      | '1min'
      | '3min'
      | '5min'
      | '15min'
      | '30min'
      | '1hour'
      | '2hour'
      | '4hour'
      | '6hour'
      | '8hour'
      | '12hour'
      | '1day'
      | '1week';
  }): Promise<
    APISuccessResponse<
      Array<
        [
          string, // Start time of the candle cycle
          string, // Opening price
          string, // Closing price
          string, // Highest price
          string, // Lowest price
          string, // Transaction volume (One-sided transaction volume)
          string, // Transaction amount (One-sided transaction amount)
        ]
      >
    >
  > {
    return this.get('api/v1/market/candles', params);
  }

  getSpotFiatPrice(params?: {
    base?: string;
    currencies?: string;
  }): Promise<any> {
    return this.get('api/v1/prices', params);
  }

  /**
   *
   * Spot HF trade
   *
   */

  placeSpotHFOrder(params: {
    clientOid?: string;
    symbol: string;
    type: 'limit' | 'market';
    side: 'buy' | 'sell';
    stp?: 'CN' | 'CO' | 'CB' | 'DC';
    tags?: string;
    remark?: string;
  }): Promise<
    APISuccessResponse<{
      orderId: string; // Transfer order ID
    }>
  > {
    return this.postPrivate('api/v1/hf/orders', params);
  }

  placeSpotHFOrderTest(): Promise<any> {
    return this.postPrivate('api/v1/hf/orders/test');
  }

  placeSpotHFOrderSync(params: {
    clientOid?: string;
    symbol: string;
    type: 'limit' | 'market';
    side: 'buy' | 'sell';
    stp?: 'CN' | 'CO' | 'CB' | 'DC';
    tags?: string;
    remark?: string;
  }): Promise<
    APISuccessResponse<{
      orderId: string; // An order Id is returned once an order is successfully placed.
      orderTime: string; // order time
      originSize: string; // original order size
      dealSize: string; // deal size
      remainSize: string; // remain size
      canceledSize: string; // Cumulative number of cancellations
      status: string; // Order Status. open: the order is active; done: the order has been completed
      matchTime: string; // matching time
    }>
  > {
    return this.postPrivate('api/v1/hf/orders/sync', params);
  }

  placeSpotMultipleHFOrders(params: {
    clientOid?: string;
    symbol: string;
    type: 'limit' | 'market';
    timeInForce?: 'GTC' | 'GTT' | 'IOC' | 'FOK';
    stp?: 'CN' | 'CO' | 'CB' | 'DC';
    side: 'buy' | 'sell';
    price: string;
    size: string;
    cancelAfter?: number;
    postOnly?: boolean;
    hidden?: boolean;
    iceberg?: boolean;
    visibleSize?: string;
    tags?: string;
    remark?: string;
  }): Promise<
    Array<{
      orderId: string;
      success?: boolean;
      failMsg?: string; // Reason of failure, optional based on success status
    }>
  > {
    return this.postPrivate('api/v1/hf/orders/multi', params);
  }

  placeSpotMultipleHFOrdersSync(params: {
    clientOid?: string;
    symbol: string;
    type: 'limit' | 'market';
    timeInForce?: 'GTC' | 'GTT' | 'IOC' | 'FOK';
    stp?: 'CN' | 'CO' | 'CB' | 'DC';
    side: 'buy' | 'sell';
    price: string;
    size: string;
    cancelAfter?: number;
    postOnly?: boolean;
    hidden?: boolean;
    iceberg?: boolean;
    visibleSize?: string;
    tags?: string;
    remark?: string;
  }): Promise<
    Array<{
      orderId: string; // An order Id is returned once an order is successfully placed.
      orderTime: number; // order time
      originSize: string; // original order size
      dealSize: string; // deal size
      remainSize: string; // remain size
      canceledSize: string; // Cumulative number of cancellations
      status: string; // Order Status. open: the order is active; done: the order has been completed
      matchTime: number; // matching time
      success: boolean; // Whether the order was placed successfully.
    }>
  > {
    return this.postPrivate('api/v1/hf/orders/multi/sync', params);
  }

  modifySpotHFOrder(params: {
    symbol: string;
    clientOid?: string;
    orderId?: string;
    newPrice?: string;
    newSize?: string;
  }): Promise<
    APISuccessResponse<{
      newOrderId: string; // New order ID
    }>
  > {
    return this.postPrivate('api/v1/hf/orders/alter', params);
  }

  cancelSpotHFOrder(params: { orderId: string; symbol: string }): Promise<
    APISuccessResponse<{
      orderId: string; // New order ID
    }>
  > {
    return this.deletePrivate(`api/v1/hf/orders/${params.orderId}`, params);
  }

  syncSpotCancelHFOrder(params: { orderId: string; symbol: string }): Promise<
    APISuccessResponse<{
      orderId: string; // order Id
      originSize: string; // original order size
      dealSize: string; // deal size
      remainSize: string; // remain size
      canceledSize: string; // Cumulative number of cancellations
      status: string; // Order Status. open: the order is active; done: the order has been completed
    }>
  > {
    return this.deletePrivate(
      `api/v1/hf/orders/sync/${params.orderId}`,
      params,
    );
  }

  cancelSpotHFOrderByClientOId(params: {
    clientOid: string;
    symbol: string;
  }): Promise<
    APISuccessResponse<{
      clientOid: string; // New order ID
    }>
  > {
    return this.deletePrivate(
      `api/v1/hf/orders/client-order/${params.clientOid}`,
      params,
    );
  }

  syncSpotCancelHFOrderByClientOId(params: {
    clientOid: string;
    symbol: string;
  }): Promise<
    APISuccessResponse<{
      orderId: string; // order Id
      originSize: string; // original order size
      dealSize: string; // deal size
      remainSize: string; // remain size
      canceledSize: string; // Cumulative number of cancellations
      status: string; // Order Status. open: the order is active; done: the order has been completed
    }>
  > {
    return this.deletePrivate(
      `api/v1/hf/orders/sync/client-order/${params.clientOid}`,
      params,
    );
  }

  cancelSpotSpecifiedNumberHFOrders(params: {
    orderId: string;
    symbol: string;
    cancelSize: string;
  }): Promise<any> {
    return this.deletePrivate(
      `api/v1/hf/orders/cancel/${params.orderId}`,
      params,
    );
  }

  cancelSpotAllHFOrdersBySymbol(params: { symbol: string }): Promise<
    APISuccessResponse<{
      orderId: string; // order Id
      cancelSize: string; // Size of the order to be canceled
    }>
  > {
    return this.deletePrivate(`api/v1/hf/orders`, params);
  }

  cancelSpotAllHFOrders(): Promise<
    APISuccessResponse<{
      succeedSymbols?: Array<string>; // Cancel order successful symbol
      failedSymbols?: Array<{
        symbol: string; // Cancel order failed symbol
        error: string; // Error message
      }>;
    }>
  > {
    return this.deletePrivate(`api/v1/hf/orders/cancelAll`);
  }

  getSpotActiveHFOrders(params: { symbol: string }): Promise<
    APISuccessResponse<
      Array<{
        id: string; // Order id, a unique identifier pertaining to the order
        symbol: string; // Trading pair
        opType: string; // Operation type: DEAL
        type: string; // Order type
        side: string; // Buy or sell
        price: string; // Order price
        size: string; // Order size
        dealSize: string; // Number of filled transactions
        cancelledSize: string; // Number of canceled transactions
        remainSize: string; // Number of remain transactions
        funds: string; // Order amount
        dealFunds: string; // Number of filled funds
        cancelledFunds: string; // Number of canceled funds
        remainFunds: string; // Number of remain funds
        fee: string; // Service fee
        feeCurrency: string; // Currency used to calculate fees
        stp: string; // Self trade protection
        timeInForce: string; // Time in force
        postOnly: boolean; // Is it post only?
        hidden: boolean; // Is it a hidden order?
        iceberg: boolean; // Is it an iceberg order?
        visibleSize: string; // Visible size of iceberg order in order book.
        cancelAfter: number; // A GTT timeInForce that expires in n seconds
        channel: string; // Source of orders
        clientOid: string; // Identifier created by the client
        remark: string; // Order description
        tags: string; // Order identifier
        active: boolean; // Order status: true-The status of the order is active; false-The status of the order is done
        inOrderBook: boolean; // Whether to enter the orderbook: true: enter the orderbook; false: not enter the orderbook
        cancelExist: boolean; // Are there any cancellation records pertaining to the order?
        createdAt: number; // Order creation time
        lastUpdatedAt: number; // Last update time of order
        tradeType: string; // Trade type: TRADE (Spot Trading)
      }>
    >
  > {
    return this.getPrivate(`api/v1/hf/orders/active`, params);
  }

  getSpotActiveHFSymbols(): Promise<
    APISuccessResponse<{
      symbols: Array<string>;
    }>
  > {
    return this.getPrivate(`api/v1/hf/orders/active/symbols`);
  }

  getSpotHFCompletedOrders(params: {
    symbol: string;
    side?: 'buy' | 'sell';
    type?: 'limit' | 'market';
    startAt?: number;
    endAt?: number;
    lastId?: number;
    limit?: number;
  }): Promise<
    APISuccessResponse<{
      lastId: number;
      items: Array<{
        id: string; // Order id, a unique identifier of the order
        symbol: string; // Trading pair
        opType: string; // Operation type: DEAL
        type: string; // Order type
        side: string; // Buy or sell
        price: string; // Order price
        size: string; // Order size
        dealSize: string; // Number of filled transactions
        cancelledSize: string; // Number of canceled transactions
        remainSize: string; // Number of remain transactions
        funds: string; // Order amount
        dealFunds: string; // Number of filled funds
        cancelledFunds: string; // Number of canceled funds
        remainFunds: string; // Number of remain funds
        fee: string; // Service fee
        feeCurrency: string; // Currency used to calculate fees
        stp: string; // Self trade protection
        timeInForce: string; // Time in force
        postOnly: boolean; // Is it post only?
        hidden: boolean; // Is it a hidden order?
        iceberg: boolean; // Is it an iceberg order?
        visibleSize: string; // Visible size of iceberg order in order book.
        cancelAfter: number; // A GTT timeInForce that expires in n seconds
        channel: string; // Source of orders
        clientOid: string; // Identifier created by the client
        remark: string; // Order description
        tags: string; // Order identifier
        active: boolean; // Order status: true-The status of the order is active; false-The status of the order is done
        inOrderBook: boolean; // Whether to enter the orderbook: true: enter the orderbook; false: not enter the orderbook
        cancelExist: boolean; // Are there any cancellation records pertaining to the order?
        createdAt: number; // Order creation time
        lastUpdatedAt: number; // Last update time of order
        tradeType: string; // Trade type: TRADE (Spot Trading)
      }>;
    }>
  > {
    return this.getPrivate(`api/v1/hf/orders/done`, params);
  }

  getSpotHFOrderDetailsByOrderId(params: {
    orderId: string;
    symbol: string;
  }): Promise<
    APISuccessResponse<{
      id: string; // Order id, a unique identifier of the order
      symbol: string; // Trading pair
      opType: string; // Operation type: DEAL
      type: string; // Order type
      side: string; // Buy or sell
      price: string; // Order price
      size: string; // Order size
      dealSize: string; // Number of filled transactions
      cancelledSize: string; // Number of canceled transactions
      remainSize: string; // Number of remain transactions
      funds: string; // Order amount
      dealFunds: string; // Number of filled funds
      cancelledFunds: string; // Number of canceled funds
      remainFunds: string; // Number of remain funds
      fee: string; // Service fee
      feeCurrency: string; // Currency used to calculate fees
      stp: string; // Self trade protection
      timeInForce: string; // Time in force
      postOnly: boolean; // Is it post only?
      hidden: boolean; // Is it a hidden order?
      iceberg: boolean; // Is it an iceberg order?
      visibleSize: string; // Visible size of iceberg order in order book.
      cancelAfter: number; // A GTT timeInForce that expires in n seconds
      channel: string; // Source of orders
      clientOid: string; // Identifier created by the client
      remark: string; // Order description
      tags: string; // Order identifier
      active: boolean; // Order status: true-The status of the order is active; false-The status of the order is done
      inOrderBook: boolean; // Whether to enter the orderbook: true: enter the orderbook; false: not enter the orderbook
      cancelExist: boolean; // Are there any cancellation records pertaining to the order?
      createdAt: number; // Order creation time
      lastUpdatedAt: number; // Last update time of order
      tradeType: string; // Trade type: TRADE (Spot Trading)
    }>
  > {
    return this.getPrivate(`api/v1/hf/orders/${params.orderId}`, params);
  }

  getSpotHFOrderDetailsByClientOid(params: {
    clientOid: string;
    symbol: string;
  }): Promise<
    APISuccessResponse<{
      id: string; // Order id, a unique identifier of the order
      symbol: string; // Trading pair
      opType: string; // Operation type: DEAL
      type: string; // Order type
      side: string; // Buy or sell
      price: string; // Order price
      size: string; // Order size
      dealSize: string; // Number of filled transactions
      cancelledSize: string; // Number of canceled transactions
      remainSize: string; // Number of remain transactions
      funds: string; // Order amount
      dealFunds: string; // Number of filled funds
      cancelledFunds: string; // Number of canceled funds
      remainFunds: string; // Number of remain funds
      fee: string; // Service fee
      feeCurrency: string; // Currency used to calculate fees
      stp: string; // Self trade protection
      timeInForce: string; // Time in force
      postOnly: boolean; // Is it post only?
      hidden: boolean; // Is it a hidden order?
      iceberg: boolean; // Is it an iceberg order?
      visibleSize: string; // Visible size of iceberg order in order book.
      cancelAfter: number; // A GTT timeInForce that expires in n seconds
      channel: string; // Source of orders
      clientOid: string; // Identifier created by the client
      remark: string; // Order description
      tags: string; // Order identifier
      active: boolean; // Order status: true-The status of the order is active; false-The status of the order is done
      inOrderBook: boolean; // Whether to enter the orderbook: true: enter the orderbook; false: not enter the orderbook
      cancelExist: boolean; // Are there any cancellation records pertaining to the order?
      createdAt: number; // Order creation time
      lastUpdatedAt: number; // Last update time of order
      tradeType: string; // Trade type: TRADE (Spot Trading)
    }>
  > {
    return this.getPrivate(
      `api/v1/hf/orders/client-order/${params.clientOid}`,
      params,
    );
  }

  autoCancelSpotHFOrderSetting(params: {
    timeout: number;
    symbols?: string;
  }): Promise<
    APISuccessResponse<{
      currentTime: number; // System current time (in seconds)
      triggerTime: number; // Trigger cancellation time (in seconds)
    }>
  > {
    return this.postPrivate('api/v1/hf/orders/dead-cancel-all', params);
  }

  autoCancelSpotHFOrderSettingQuery(): Promise<
    APISuccessResponse<{
      timeout: number; // Auto cancel order trigger setting time, the unit is second. range: timeout=-1 (meaning unset) or 5 <= timeout <= 86400
      symbols: string; // List of trading pairs. Separated by commas, empty means all trading pairs
      currentTime: number; // System current time (in seconds)
      triggerTime: number; // Trigger cancellation time (in seconds)
    }>
  > {
    return this.getPrivate('api/v1/hf/orders/dead-cancel-all/query');
  }

  getSpotHFFilledList(params: {
    orderId?: string;
    symbol: string;
    side?: 'buy' | 'sell';
    type?: 'limit' | 'market';
    startAt?: number;
    endAt?: number;
    lastId?: number;
    limit?: number;
  }): Promise<
    APISuccessResponse<{
      items: Array<{
        id: number; // Id of transaction detail
        symbol: string; // Trading pair
        tradeId: number; // Trade Id
        orderId: string; // Order Id
        counterOrderId: string; // Counterparty order Id
        side: string; // Buy or sell
        liquidity: string; // Liquidity type: taker or maker
        forceTaker: boolean; // Whether or not to forcefully process as taker
        price: string; // Order price
        size: string; // Order size
        funds: string; // Turnover
        fee: string; // Service fee
        feeRate: string; // Fee rate
        feeCurrency: string; // Currency used to calculate fees
        stop: string; // Take Profit and Stop Loss type, currently HFT does not support the Take Profit and Stop Loss type, so it is empty
        tradeType: string; // Trade type: TRADE(Spot Trading)
        type: string; // Order type: limit or market
        createdAt: number; // Transaction(Creation) time
      }>;
      lastId: number;
    }>
  > {
    return this.getPrivate('api/v1/hf/fills', params);
  }

  /**
   *
   * Orders
   *
   */

  // SPOT and MARGIN
  placeOrder(params: {
    clientOid: string;
    side: 'buy' | 'sell';
    symbol: string;
    type?: 'limit' | 'market';
    remark?: string;
    stp?: 'CN' | 'CO' | 'CB' | 'DC';
    tradeType?: 'TRADE' | 'MARGIN_TRADE';
    price?: string;
    size?: string;
    timeInForce?: 'GTC' | 'GTT' | 'IOC' | 'FOK';
    cancelAfter?: number;
    postOnly?: boolean;
    hidden?: boolean;
    iceberg?: boolean;
    visibleSize?: string;
    funds?: string;
  }): Promise<
    APISuccessResponse<{
      orderId: string; // An order Id is returned once an order is successfully placed.
    }>
  > {
    return this.postPrivate('api/v1/orders', params);
  }

  // SPOT and MARGIN
  placeOrderTest(): Promise<any> {
    return this.postPrivate('api/v1/orders/test');
  }

  //SPOT
  placeMultipleOrders(params: {
    clientOid: string;
    side: 'buy' | 'sell';
    symbol: string;
    type?: 'limit';
    remark?: string;
    stop?: 'loss' | 'entry';
    stopPrice?: string;
    stp?: 'CN' | 'CO' | 'CB' | 'DC';
    tradeType?: 'TRADE';
    price: string;
    size: string;
    timeInForce?: 'GTC' | 'GTT' | 'IOC' | 'FOK';
    cancelAfter?: number;
    postOnly?: boolean;
    hidden?: boolean;
    iceberg?: boolean;
    visibleSize?: string;
  }): Promise<
    APISuccessResponse<
      Array<{
        symbol: string; // symbol For Example，ETH-BTC
        type?: string; // only limit (default is limit)
        side: string; // buy or sell
        price: string; // price per base currency
        size: string; // amount of base currency to buy or sell
        funds?: any; // Order amount (optional, can be null)
        stp?: string; // self trade prevention, is divided into CN, CO, CB, and DC strategies
        stop?: string; // Either loss or entry. Requires stopPrice to be defined
        stopPrice?: any; // Need to be defined if stop is specified.
        timeInForce?: string; // GTC, GTT, IOC, or FOK (default is GTC).
        cancelAfter?: number; // Cancels in n seconds, with GTT as the time in force strategy
        postOnly?: boolean; // Post only identifier, invalid when the time in force strategy is IOC or FOK
        hidden?: boolean; // Hidden or not (not shown in order book)
        iceberg?: boolean; // Whether or not only visible portions of orders are shown in iceberg orders
        visibleSize?: any; // Maximum visible quantity in iceberg orders (optional, can be null)
        channel: string; // Channel through which the order was placed
        id: string; // Unique identifier for the order
        status: string; // Order creation results (success, fail)
        failMsg?: any; // Reason of failure (optional, can be null)
        clientOid: string; // Client Order Id, unique identifier created by the user, the use of UUID is recommended
      }>
    >
  > {
    return this.postPrivate('api/v1/orders/multi', params);
  }

  // Used for Spot and Margin Trading: Cancels a single order by orderId.
  cancelOrderById(params: { orderId: string }): Promise<
    APISuccessResponse<{
      cancelledOrderIds: string[]; // Unique ID of the cancelled order
    }>
  > {
    return this.deletePrivate(`api/v1/orders/${params.orderId}`);
  }

  // Used for Spot and Margin Trading: Cancels a single order by clientOid.
  cancelOrderByClientOid(params: { clientOid: string }): Promise<
    APISuccessResponse<{
      cancelledOrderId: string; // Unique ID of the cancelled order
      clientOid: string; // Unique order id created by users to identify their orders
    }>
  > {
    return this.deletePrivate(`api/v1/order/client-order/${params.clientOid}`);
  }

  // Used for Spot and Margin Trading: Cancels all open orders.
  cancelAllOrders(params?: {
    symbol?: string;
    tradeType?: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
  }): Promise<
    APISuccessResponse<{
      cancelledOrderIds: string[]; // Unique ID of the cancelled order
    }>
  > {
    return this.deletePrivate('api/v1/orders', params);
  }

  // Retrieves the current list of orders. Supports filtering by status and trade type.
  getOrderList(params?: {
    status?: 'active' | 'done';
    symbol?: string;
    side?: 'buy' | 'sell';
    type?: 'limit' | 'market' | 'limit_stop' | 'market_stop';
    tradeType?: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
    startAt?: number;
    endAt?: number;
  }): Promise<
    APISuccessResponse<{
      currentPage: number;
      pageSize: number;
      totalNum: number;
      totalPage: number;
      items: Array<{
        id: string; // Order ID, the ID of an order.
        symbol: string; // symbol
        opType: string; // Operation type: DEAL
        type: string; // order type
        side: string; // transaction direction, include buy and sell
        price: string; // order price
        size: string; // order quantity
        funds: string; // order funds
        dealFunds: string; // executed size of funds
        dealSize: string; // executed quantity
        fee: string; // fee
        feeCurrency: string; // charge fee currency
        stp: string; // self trade prevention, include CN, CO, DC, CB
        stop: string; // stop type, include entry and loss
        stopTriggered: boolean; // stop order is triggered or not
        stopPrice: string; // stop price
        timeInForce: string; // time InForce, include GTC, GTT, IOC, FOK
        postOnly: boolean; // postOnly
        hidden: boolean; // hidden order
        iceberg: boolean; // iceberg order
        visibleSize: string; // displayed quantity for iceberg order
        cancelAfter: number; // cancel orders time, requires timeInForce to be GTT
        channel: string; // order source
        clientOid: string; // user-entered order unique mark
        remark: string; // remark
        tags: string; // tag order source
        isActive: boolean; // order status, true and false. If true, the order is active, if false, the order is filled or cancelled
        cancelExist: boolean; // order cancellation transaction record
        createdAt: number; // create time
        tradeType: string; // The type of trading
      }>;
    }>
  > {
    return this.getPrivate('api/v1/orders', params);
  }

  // Needs General permission, Retrieves a list of the most recent 1000 orders within the last 24 hours, sorted in descending order by time.
  getRecentOrdersList(): Promise<
    APISuccessResponse<
      Array<{
        id: string; // Order ID, unique identifier of an order.
        symbol: string; // symbol
        opType: string; // Operation type: DEAL
        type: string; // order type, e.g. limit, market, stop_limit
        side: string; // transaction direction, include buy and sell
        price: number; // order price
        size: number; // order quantity
        funds: number; // order funds
        dealFunds: number; // deal funds
        dealSize: number; // deal quantity
        fee: number; // fee
        feeCurrency: string; // charge fee currency
        stp: string; // self trade prevention, include CN, CO, DC, CB
        stop: string; // stop type, include entry and loss
        stopTriggered: boolean; // stop order is triggered
        stopPrice: number; // stop price
        timeInForce: string; // time InForce, include GTC, GTT, IOC, FOK
        postOnly: boolean; // postOnly
        hidden: boolean; // hidden order
        iceberg: boolean; // iceberg order
        visibleSize: number; // display quantity for iceberg order
        cancelAfter: number; // cancel orders time, requires timeInForce to be GTT
        channel: string; // order source
        clientOid: string; // user-entered order unique mark
        remark: string; // remark
        tags: string; // tag order source
        isActive: boolean; // order status, true and false. If true, the order is active, if false, the order is filled or cancelled
        cancelExist: boolean; // order cancellation transaction record
        createdAt: string; // create time
        tradeType: string; // The type of trading: TRADE（Spot Trading）, MARGIN_TRADE (Margin Trading).
      }>
    >
  > {
    return this.getPrivate('api/v1/limit/orders');
  }

  // Needs General Permission, Retrieves the details of a single order by its orderId. Useful for tracking the status and details of specific trades.
  getOrderDetailsByOrderId(params: { orderId: string }): Promise<
    APISuccessResponse<
      Array<{
        id: string; // Order ID, unique identifier of an order.
        symbol: string; // symbol
        opType: string; // Operation type: DEAL
        type: string; // order type, e.g. limit, market, stop_limit
        side: string; // transaction direction, include buy and sell
        price: number; // order price
        size: number; // order quantity
        funds: number; // order funds
        dealFunds: number; // deal funds
        dealSize: number; // deal quantity
        fee: number; // fee
        feeCurrency: string; // charge fee currency
        stp: string; // self trade prevention, include CN, CO, DC, CB
        stop: string; // stop type, include entry and loss
        stopTriggered: boolean; // stop order is triggered
        stopPrice: number; // stop price
        timeInForce: string; // time InForce, include GTC, GTT, IOC, FOK
        postOnly: boolean; // postOnly
        hidden: boolean; // hidden order
        iceberg: boolean; // iceberg order
        visibleSize: number; // display quantity for iceberg order
        cancelAfter: number; // cancel orders time, requires timeInForce to be GTT
        channel: string; // order source
        clientOid: string; // user-entered order unique mark
        remark: string; // remark
        tags: string; // tag order source
        isActive: boolean; // order status, true and false. If true, the order is active, if false, the order is filled or cancelled
        cancelExist: boolean; // order cancellation transaction record
        createdAt: string; // create time
        tradeType: string; // The type of trading: TRADE（Spot Trading）, MARGIN_TRADE (Margin Trading).
      }>
    >
  > {
    return this.getPrivate(`api/v1/orders/${params.orderId}`);
  }

  // Needs general permission, Retrieves the details of a single order by its clientOid. This is useful for checking the status of orders placed with a unique client-provided identifier.
  getOrderDetailsByClientOid(params: { clientOid: string }): Promise<
    APISuccessResponse<
      Array<{
        id: string; // Order ID, unique identifier of an order.
        symbol: string; // symbol
        opType: string; // Operation type: DEAL
        type: string; // order type, e.g. limit, market, stop_limit
        side: string; // transaction direction, include buy and sell
        price: number; // order price
        size: number; // order quantity
        funds: number; // order funds
        dealFunds: number; // deal funds
        dealSize: number; // deal quantity
        fee: number; // fee
        feeCurrency: string; // charge fee currency
        stp: string; // self trade prevention, include CN, CO, DC, CB
        stop: string; // stop type, include entry and loss
        stopTriggered: boolean; // stop order is triggered
        stopPrice: number; // stop price
        timeInForce: string; // time InForce, include GTC, GTT, IOC, FOK
        postOnly: boolean; // postOnly
        hidden: boolean; // hidden order
        iceberg: boolean; // iceberg order
        visibleSize: number; // display quantity for iceberg order
        cancelAfter: number; // cancel orders time, requires timeInForce to be GTT
        channel: string; // order source
        clientOid: string; // user-entered order unique mark
        remark: string; // remark
        tags: string; // tag order source
        isActive: boolean; // order status, true and false. If true, the order is active, if false, the order is filled or cancelled
        cancelExist: boolean; // order cancellation transaction record
        createdAt: string; // create time
        tradeType: string; // The type of trading: TRADE（Spot Trading）, MARGIN_TRADE (Margin Trading).
      }>
    >
  > {
    return this.getPrivate(`api/v1/order/client-order/${params.clientOid}`);
  }

  /**
   *
   * Fills
   *
   */

  // General permission, Retrieves a list of the most recent fills for your orders, providing details such as the executed price, size, and the fees incurred. Useful for tracking trade executions and their impact on your portfolio.
  getSpotFilledList(params?: {
    orderId?: string;
    symbol?: string;
    side?: 'buy' | 'sell';
    type?: 'limit' | 'market' | 'limit_stop' | 'market_stop';
    startAt?: number;
    endAt?: number;
    tradeType: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
  }): Promise<any> {
    return this.getPrivate('api/v1/fills', params);
  }

  // General permission, Retrieves a list of the most recent 1000 fills within the last 24 hours, sorted in descending order by time.
  getSpotRecentFillsList(): Promise<any> {
    return this.getPrivate('api/v1/limit/fills');
  }

  /**
   *
   * Stop order
   *
   */

  // Spot and margin trading, places a stop order on the platform.
  placeStopOrder(params: {
    clientOid: string;
    side: 'buy' | 'sell';
    symbol: string;
    type?: 'limit' | 'market';
    remark?: string;
    stop?: 'loss' | 'entry';
    stopPrice?: string;
    stp?: 'CN' | 'CO' | 'CB' | 'DC';
    tradeType?: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
    price?: string;
    size?: string;
    timeInForce?: 'GTC' | 'GTT' | 'IOC' | 'FOK';
    cancelAfter?: number;
    postOnly?: boolean;
    hidden?: boolean;
    iceberg?: boolean;
    visibleSize?: string;
    funds?: string;
  }): Promise<any> {
    return this.postPrivate('api/v1/stop-order', params);
  }

  // Cancels a single stop order by orderId. Applicable for both spot and margin trading.
  // This endpoint requires the "Spot Trading" or "Margin Trading" permission on your API key.
  cancelStopOrderById(params: { orderId: string }): Promise<any> {
    return this.deletePrivate(`api/v1/stop-order/${params.orderId}`);
  }

  // Cancels a stop order by clientOid. Requires "Spot Trading" or "Margin Trading" permission.
  cancelStopOrderByClientOid(params: {
    clientOid: string;
    symbol?: string;
  }): Promise<any> {
    return this.deletePrivate(
      `api/v1/stop-order/cancelOrderByClientOid`,
      params,
    );
  }

  // Cancels a batch of stop orders. Requires "Spot Trading" or "Margin Trading" permission.
  cancelStopOrders(params?: {
    symbol?: string;
    tradeType?: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
    orderIds?: string;
  }): Promise<any> {
    return this.deletePrivate(`api/v1/stop-order/cancel`, params);
  }

  // Retrieves your current untriggered stop order list, paginated and sorted to show the latest first.
  getStopOrdersList(params?: {
    symbol?: string;
    side?: 'buy' | 'sell';
    type?: 'limit' | 'market' | 'limit_stop' | 'market_stop';
    tradeType?: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
    startAt?: number;
    endAt?: number;
    currentPage?: number;
    orderIds?: string;
    pageSize?: number;
    stop?: 'stop' | 'oco';
  }): Promise<any> {
    return this.getPrivate('api/v1/stop-order', params);
  }

  // Retrieves the details of a single stop order by its orderId.
  getStopOrderDetailsByOrderId(params: { orderId: string }): Promise<any> {
    return this.getPrivate(`api/v1/stop-order/${params.orderId}`);
  }

  // Retrieves the details of a single stop order by its clientOid.
  getStopOrderDetailsByClientOid(params: {
    clientOid: string;
    symbol?: string;
  }): Promise<any> {
    return this.getPrivate('api/v1/stop-order/queryOrderByClientOid', params);
  }
  /**
   *
   * OCO order
   *
   */

  // Places an OCO (One Cancels the Other) order on the platform.
  placeOCOOrder(params: {
    symbol: string;
    side: 'buy' | 'sell';
    price: string;
    size: string;
    stopPrice: string;
    limitPrice: string;
    tradeType?: 'TRADE'; // Currently only supports TRADE
    clientOid: string;
    remark?: string;
  }): Promise<any> {
    return this.postPrivate('api/v3/oco/order', params);
  }

  // Cancels a single OCO order by orderId.
  cancelOCOOrderById(params: { orderId: string }): Promise<any> {
    return this.deletePrivate(`api/v3/oco/order/${params.orderId}`);
  }

  // Cancels a single OCO order by clientOid.
  cancelOCOOrderByClientOid(params: { clientOid: string }): Promise<any> {
    return this.deletePrivate(`api/v3/oco/client-order/${params.clientOid}`);
  }

  // Batch cancels OCO orders through orderIds.
  cancelMultipleOCOOrders(params?: {
    orderIds?: string;
    symbol?: string;
  }): Promise<any> {
    return this.deletePrivate('api/v3/oco/orders', params);
  }

  // Retrieves the details of a single OCO order by its orderId.
  getOCOOrderDetailsByOrderId(params: { orderId: string }): Promise<any> {
    return this.getPrivate(`api/v3/oco/order/${params.orderId}`);
  }

  // Retrieves the details of a single OCO order by its orderId, including detailed information about the individual orders.
  getOCOOrderDetails(params: { orderId: string }): Promise<any> {
    return this.getPrivate(`api/v3/oco/order/details/${params.orderId}`);
  }

  // Retrieves the details of a single OCO order by its clientOid.
  getOCOOrderDetailsByClientOid(params: { clientOid: string }): Promise<any> {
    return this.getPrivate(`api/v3/oco/client-order/${params.clientOid}`);
  }

  // Retrieves your current OCO order list, paginated and sorted to show the latest first.
  getOCOOrdersList(params: {
    pageSize: string;
    currentPage: string;
    symbol?: string;
    startAt?: number;
    endAt?: number;
    orderIds?: string;
  }): Promise<any> {
    return this.getPrivate('api/v3/oco/orders', params);
  }

  /**
   *
   ***********
   * Margin Trading
   ***********
   *
   */

  /**
   *
   * Margin HF trade
   *
   */

  placeHFMarginOrder(params: {
    clientOid: string;
    side: 'buy' | 'sell';
    symbol: string;
    type?: 'limit' | 'market';
    stp?: 'CN' | 'CO' | 'CB' | 'DC';
    isIsolated?: boolean;
    autoBorrow?: boolean;
    autoRepay?: boolean;
    price?: string;
    size?: string;
    timeInForce?: 'GTC' | 'GTT' | 'IOC' | 'FOK';
    cancelAfter?: number;
    postOnly?: boolean;
    hidden?: boolean;
    iceberg?: boolean;
    visibleSize?: string;
    funds?: string;
  }): Promise<any> {
    return this.postPrivate('api/v3/hf/margin/order', params);
  }

  placeHFMarginOrderTest(): Promise<any> {
    return this.postPrivate('api/v3/hf/margin/order/test');
  }

  cancelHFMarginOrder(params: {
    orderId: string;
    symbol: string;
  }): Promise<any> {
    return this.deletePrivate(
      `api/v3/hf/margin/orders/${params.orderId}`,
      params,
    );
  }

  cancelHFMarginOrderByClientOid(params: {
    clientOid: string;
    symbol: string;
  }): Promise<any> {
    return this.deletePrivate(
      `api/v3/hf/margin/orders/client-order/${params.clientOid}`,
      params,
    );
  }

  cancelAllHFMarginOrders(params: {
    symbol: string;
    tradeType: 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
  }): Promise<any> {
    return this.deletePrivate(`api/v3/hf/margin/orders`, params);
  }

  getActiveHFMarginOrders(params: {
    symbol: string;
    tradeType: 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
  }): Promise<any> {
    return this.getPrivate(`api/v3/hf/margin/orders/active`, params);
  }

  getHFMarginFilledList(params: {
    symbol: string;
    tradeType: 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
    side?: 'buy' | 'sell';
    type?: 'limit' | 'market';
    startAt?: number;
    endAt?: number;
    lastId?: number;
    limit?: number;
  }): Promise<any> {
    return this.getPrivate('api/v3/hf/margin/orders/done', params);
  }

  getHFMarginOrderDetailsByOrderId(params: {
    orderId: string;
    symbol: string;
  }): Promise<any> {
    return this.getPrivate(`api/v3/hf/margin/orders/${params.orderId}`, params);
  }

  getHFMarginOrderDetailsByClientOid(params: {
    clientOid: string;
    symbol: string;
  }): Promise<any> {
    return this.getPrivate(
      `api/v3/hf/margin/orders/client-order/${params.clientOid}?symbol=${params.symbol}`,
    );
  }

  getHFMarginTransactionRecords(params: {
    orderId?: string;
    symbol: string;
    tradeType: 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
    side?: 'buy' | 'sell';
    type?: 'limit' | 'market';
    startAt?: number;
    endAt?: number;
    lastId?: number;
    limit?: number;
  }): Promise<any> {
    return this.getPrivate('api/v3/hf/margin/fills', params);
  }

  /**
   *
   * Orders
   *
   */

  placeMarginOrder(params: {
    clientOid: string;
    side: 'buy' | 'sell';
    symbol: string;
    type?: 'limit' | 'market';
    remark?: string;
    stp?: 'CN' | 'CO' | 'CB' | 'DC';
    marginModel?: 'cross' | 'isolated';
    autoBorrow?: boolean;
    autoRepay?: boolean;
    price: string;
    size?: string;
    timeInForce?: 'GTC' | 'GTT' | 'IOC' | 'FOK';
    cancelAfter?: number;
    postOnly?: boolean;
    hidden?: boolean;
    iceberg?: boolean;
    visibleSize?: string;
    funds?: string;
  }): Promise<any> {
    return this.postPrivate('api/v1/margin/order', params);
  }

  placeMarginOrderTest(): Promise<any> {
    return this.postPrivate('api/v1/margin/order/test');
  }

  /**
   *
   * Margin info
   *
   */

  getMarginLeveragedTokenInfo(params?: { currency?: string }): Promise<any> {
    return this.get('api/v3/etf/info', params);
  }

  getMarginMarkPrice(params: { symbol: string }): Promise<any> {
    return this.get(`api/v1/mark-price/${params.symbol}/current`);
  }

  getMarginConfigInfo(): Promise<any> {
    return this.get('api/v1/margin/config');
  }

  getMarginRiskLimitCurrencyConfig(params: {
    isIsolated: boolean;
    symbol?: string;
    currency?: string;
  }): Promise<any> {
    return this.get('api/v3/margin/currencies', params);
  }

  /**
   *
   * Isolated Margin
   *
   */

  getIsolatedMarginSymbolsConfig(): Promise<any> {
    return this.getPrivate('api/v1/isolated/symbols');
  }

  getIsolatedMarginAccountInfo(params?: {
    balanceCurrency?: 'USDT' | 'KCS' | 'BTC';
  }): Promise<any> {
    return this.getPrivate('api/v1/isolated/accounts', params);
  }

  getSingleIsolatedMarginAccountInfo(params: { symbol: string }): Promise<any> {
    return this.getPrivate(`api/v1/isolated/account/${params.symbol}`);
  }

  /**
   *
   * Margin trading(v3)
   *
   */

  marginBorrowV3(params: {
    isIsolated?: boolean;
    symbol?: string;
    currency: string;
    size: number;
    timeInForce: 'IOC' | 'FOK';
  }): Promise<any> {
    return this.postPrivate('api/v3/margin/borrow', params);
  }

  marginRepayV3(params: {
    isIsolated?: boolean;
    symbol?: string;
    currency: string;
    size: number;
  }): Promise<any> {
    return this.postPrivate('api/v3/margin/repay', params);
  }

  getMarginBorrowingHistoryV3(params: {
    currency: string;
    isIsolated?: boolean;
    symbol?: string;
    orderNo?: string;
    startTime?: number;
    endTime?: number;
    currentPage?: number;
    pageSize?: number;
  }): Promise<any> {
    return this.getPrivate('api/v3/margin/borrow', params);
  }

  getMarginRepaymentHistoryV3(params: {
    currency: string;
    isIsolated?: boolean;
    symbol?: string;
    orderNo?: string;
    startTime?: number;
    endTime?: number;
    currentPage?: number;
    pageSize?: number;
  }): Promise<any> {
    return this.getPrivate('api/v3/margin/repay', params);
  }

  /**
   *
   * Lending market(v3)
   *
   */

  getLendingMarketCurrencyInfoV3(params?: { currency?: string }): Promise<any> {
    return this.get('api/v3/project/list', params);
  }

  getLendingMarketInterestRatesV3(params: { currency: string }): Promise<any> {
    return this.get('api/v3/project/marketInterestRate', params);
  }

  initiateLendingSubscriptionV3(params: {
    currency: string;
    size: string;
    interestRate: string;
  }): Promise<any> {
    return this.postPrivate('api/v3/purchase', params);
  }

  initiateLendingRedemptionV3(params: {
    currency: string;
    size: string;
    purchaseOrderNo: string;
  }): Promise<any> {
    return this.postPrivate('api/v3/redeem', params);
  }

  modifyLendingSubscriptionOrdersV3(params: {
    currency: string;
    purchaseOrderNo: string;
    interestRate: string;
  }): Promise<any> {
    return this.postPrivate('api/v3/lend/purchase/update', params);
  }

  getLendingRedemptionOrdersV3(params: {
    currency: string;
    redeemOrderNo?: string;
    status: 'DONE' | 'PENDING';
    currentPage?: number;
    pageSize?: number;
  }): Promise<any> {
    return this.getPrivate('api/v3/redeem/orders', params);
  }

  getLendingSubscriptionOrdersV3(params: {
    currency: string;
    purchaseOrderNo?: string;
    status: 'DONE' | 'PENDING';
    currentPage?: number;
    pageSize?: number;
  }): Promise<any> {
    return this.getPrivate('api/v3/purchase/orders', params);
  }
}
