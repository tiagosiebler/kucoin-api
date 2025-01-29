import { BaseRestClient } from './lib/BaseRestClient.js';
import { REST_CLIENT_TYPE_ENUM, RestClientType } from './lib/requestUtils.js';
import {
  BrokerTransferRequest,
  CreateBrokerSubAccountApiRequest,
  DeleteBrokerSubAccountApiRequest,
  GetBrokerDepositListRequest,
  GetBrokerInfoRequest,
  GetBrokerSubAccountApisRequest,
  GetBrokerSubAccountsRequest,
  UpdateBrokerSubAccountApiRequest,
} from './types/request/broker.types.js';
import {
  BrokerDepositRecord,
  BrokerInfo,
  BrokerSubAccountApi,
  BrokerTransferHistory,
  BrokerWithdrawalRecord,
  CreateBrokerSubAccountApiResponse,
  CreateBrokerSubAccountResponse,
  GetBrokerSubAccountsResponse,
} from './types/response/broker.types.js';
import { APISuccessResponse } from './types/response/shared.types.js';

/**
 *
 */
export class BrokerClient extends BaseRestClient {
  getClientType(): RestClientType {
    return REST_CLIENT_TYPE_ENUM.broker;
  }

  /**
   * Get Broker Info
   *
   * This endpoint supports querying the basic information of the current Broker
   */
  getBrokerInfo(
    params: GetBrokerInfoRequest,
  ): Promise<APISuccessResponse<BrokerInfo>> {
    return this.getPrivate('api/v1/broker/nd/info', params);
  }

  /**
   * Add SubAccount
   *
   * This endpoint supports Broker users to create sub-accounts.
   * Note that the account name is unique across the exchange.
   * It is recommended to add a special identifier to prevent name duplication.
   */
  createSubAccount(params: {
    accountName: string;
  }): Promise<APISuccessResponse<CreateBrokerSubAccountResponse>> {
    return this.postPrivate('api/v1/broker/nd/account', params);
  }

  /**
   * Get SubAccount
   *
   * This interface supports querying sub-accounts created by Broker.
   * Returns paginated results with default page size of 20 (max 100).
   */
  getSubAccounts(
    params: GetBrokerSubAccountsRequest,
  ): Promise<APISuccessResponse<GetBrokerSubAccountsResponse>> {
    return this.getPrivate('api/v1/broker/nd/account', params);
  }

  /**
   * Add SubAccount API
   *
   * This interface supports the creation of Broker sub-account APIKEY.
   * Supports up to 20 IPs in the whitelist.
   * Only General, Spot, and Futures permissions can be set.
   * Label must be between 4 and 32 characters.
   */
  createSubAccountApi(
    params: CreateBrokerSubAccountApiRequest,
  ): Promise<APISuccessResponse<CreateBrokerSubAccountApiResponse>> {
    return this.postPrivate('api/v1/broker/nd/account/apikey', params);
  }

  /**
   * Get SubAccount API
   *
   * This interface supports querying the Broker's sub-account APIKEYs.
   * Can optionally filter by specific apiKey.
   */
  getSubAccountApis(
    params: GetBrokerSubAccountApisRequest,
  ): Promise<APISuccessResponse<BrokerSubAccountApi[]>> {
    return this.getPrivate('api/v1/broker/nd/account/apikey', params);
  }

  /**
   * Modify SubAccount API
   *
   * This interface supports modifying the Broker's sub-account APIKEY.
   * Supports up to 20 IPs in the whitelist.
   * Only General, Spot, and Futures permissions can be set.
   * Label must be between 4 and 32 characters.
   */
  updateSubAccountApi(
    params: UpdateBrokerSubAccountApiRequest,
  ): Promise<APISuccessResponse<BrokerSubAccountApi>> {
    return this.postPrivate('api/v1/broker/nd/account/update-apikey', params);
  }

  /**
   * Delete SubAccount API
   *
   * This interface supports deleting Broker's sub-account APIKEY.
   */
  deleteSubAccountApi(
    params: DeleteBrokerSubAccountApiRequest,
  ): Promise<APISuccessResponse<boolean>> {
    return this.deletePrivate('api/v1/broker/nd/account/apikey', params);
  }

  /**
   * Transfer
   *
   * This endpoint supports fund transfer between Broker account and Broker sub-accounts.
   * Please be aware that withdrawal from sub-account is not directly supported.
   * Broker has to transfer funds from broker sub-account to broker account to initiate the withdrawals.
   *
   * Direction:
   * - OUT: Broker account is transferred to Broker sub-account
   * - IN: Broker sub-account is transferred to Broker account
   *
   * Account Types:
   * - MAIN: Funding account
   * - TRADE: Spot trading account
   */
  submitTransfer(params: BrokerTransferRequest): Promise<
    APISuccessResponse<{
      orderId: string;
    }>
  > {
    return this.postPrivate('api/v1/broker/nd/transfer', params);
  }

  /**
   * Get Transfer History
   *
   * This endpoint supports querying transfer records of the broker itself and its created sub-accounts.
   *
   * Account Types:
   * - MAIN: Funding account
   * - TRADE: Spot trading account
   * - CONTRACT: Contract account
   * - MARGIN: Margin account
   * - ISOLATED: Isolated margin account
   *
   * Status:
   * - PROCESSING: Processing
   * - SUCCESS: Successful
   * - FAILURE: Failed
   */
  getTransferHistory(params: {
    orderId: string;
  }): Promise<APISuccessResponse<BrokerTransferHistory>> {
    return this.getPrivate('api/v3/broker/nd/transfer/detail', params);
  }

  /**
   * Get Deposit List
   *
   * This endpoint can obtain the deposit records of each sub-account under the ND Broker.
   * Default limit is 1000 records (max 1000).
   * Results are sorted in descending order by default.
   *
   * Status:
   * - PROCESSING: Processing
   * - SUCCESS: Successful
   * - FAILURE: Failed
   */
  getDeposits(
    params?: GetBrokerDepositListRequest,
  ): Promise<APISuccessResponse<BrokerDepositRecord[]>> {
    return this.getPrivate('api/v1/asset/ndbroker/deposit/list', params);
  }

  /**
   * Get Deposit Detail
   *
   * This endpoint supports querying the deposit record of sub-accounts created by a Broker
   * (excluding main account of nd broker).
   *
   * Status:
   * - PROCESSING: Processing
   * - SUCCESS: Successful
   * - FAILURE: Failed
   */
  getDeposit(params: {
    currency: string;
    hash: string;
  }): Promise<APISuccessResponse<BrokerDepositRecord>> {
    return this.getPrivate('api/v3/broker/nd/deposit/detail', params);
  }

  /**
   * Get Withdrawal Detail
   *
   * This endpoint supports querying the withdrawal records of sub-accounts created by a Broker
   * (excluding main account of nd broker).
   *
   * Status:
   * - PROCESSING: Processing
   * - WALLET_PROCESSING: Wallet Processing
   * - REVIEW: Under Review
   * - SUCCESS: Successful
   * - FAILURE: Failed
   */
  getWithdrawal(params: {
    withdrawalId: string;
  }): Promise<APISuccessResponse<BrokerWithdrawalRecord>> {
    return this.getPrivate('api/v3/broker/nd/withdraw/detail', params);
  }

  /**
   * Get Broker Rebate
   *
   * This interface supports downloading Broker rebate orders.
   * Returns a URL to download a CSV file containing the rebate data.
   * The URL is valid for 1 day.
   * Maximum interval between begin and end dates is 6 months.
   */
  getBrokerRebate(params: {
    begin: string;
    end: string;
    tradeType: '1' | '2';
  }): Promise<
    APISuccessResponse<{
      url: string;
    }>
  > {
    return this.getPrivate('api/v1/broker/nd/rebase/download', params);
  }
}
