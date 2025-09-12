export interface GetAffiliateTradeHistoryRequest {
  uid: string; // required - Invitee's UID
  tradeType?: 'SPOT' | 'FEATURE'; // optional - Trading type
  tradeStartAt?: number; // optional - Trade start time (13-digit timestamp)
  tradeEndAt?: number; // optional - Trade end time (13-digit timestamp)
  page?: number; // optional - Page number >= 1, default: 1
  pageSize?: number; // optional - Page size >= 1, <= 500, default: 10
}

export interface GetAffiliateCommissionRequest {
  siteType?: 'all'; // optional - The source site of the commission, default: "all"
  rebateType?: 0 | 1 | 2; // optional - Rebate type, default: 0
  rebateStartAt?: number; // optional - Start time for commission issuance (13-digit timestamp)
  rebateEndAt?: number; // optional - End time for commission issuance (13-digit timestamp)
  page?: number; // optional - Page number >= 1, default: 1
  pageSize?: number; // optional - Page size >= 1, <= 500, default: 10
}

export interface GetAffiliateInviteesRequest {
  userType?: '1' | '2' | '3'; // optional - User Type
  referralCode?: string; // optional - Which referral code the user registered with
  uid?: string; // optional - UID(s) of the users, can pass multiple separated by commas
  registrationStartAt?: number; // optional - Registration start timestamp
  registrationEndAt?: number; // optional - Registration end timestamp
  page?: number; // optional - Page number >= 1, default: 1
  pageSize?: number; // optional - Max number of records per page >= 1, <= 500, default: 10
}

export interface GetAffiliateTransactionRequest {
  uid?: string; // optional - The uid of the invitee
  tradeType?: 'SPOT' | 'FEATURE'; // optional - Trade type
  tradeStartAt: number; // required - Transaction start time (13-digit timestamp)
  tradeEndAt: number; // required - Transaction end time (13-digit timestamp)
  lastId?: number; // optional - The offset ID of the query
  direction?: 'PRE' | 'NEXT'; // optional - Page direction, default: 'NEXT'
  pageSize?: number; // optional - Page size >= 1, <= 500, default: 10
}
