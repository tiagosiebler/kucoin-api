export interface AffiliateTradeHistoryItem {
  tradeTime: number; // Trade time (13-digit timestamp)
  tradeType: string; // Trading type (e.g., "SPOT")
  tradeCurrency: string; // Trade currency
  tradeAmount: string; // Trade amount
  tradeAmountU: string; // Trade amount in USDT
  feeU: string; // Fee in USDT
  commission: string; // Commission
  currency: string; // Currency (e.g., "USDT")
}

export interface AffiliateTradeHistory {
  currentPage: number; // Current page number
  pageSize: number; // Page size
  totalNum: number; // Total number of records
  totalPage: number; // Total number of pages
  items: AffiliateTradeHistoryItem[]; // Array of trade history items
}

export interface AffiliateCommissionItem {
  siteType: string; // Source site of the commission
  rebateType: 1 | 2; // Rebate type
  payoutTime: number; // Commission payout time (T+1 settlement), 13-digit timestamp (UTC+8)
  periodStartTime: number; // Start time of commission calculation period, 13-digit timestamp
  periodEndTime: number; // End time of commission calculation period, 13-digit timestamp
  status: 1 | 2 | 3 | 4; // Payout status
  takerVolume: string; // Invitee's taker trading volume
  makerVolume: string; // Invitee's maker trading volume
  commission: string; // Total rebate contributed by the invitee
  currency: string; // Denomination unit for trading volume/amount (USDT or USDC)
}

export interface AffiliateInviteeItem {
  uid: string; // UID of the invitee
  nickName: string; // Nickname (partially hidden)
  referralCode: string; // Referral code used for registration
  country: string; // Country
  registrationTime: number; // Registration time (13-digit timestamp)
  completedKyc: boolean; // Whether KYC is completed
  completedFirstDeposit: boolean; // Whether first deposit is completed
  completedFirstTrade: boolean; // Whether first trade is completed
  past7dFees: string; // Fees in the past 7 days
  past7dCommission: string; // Commission in the past 7 days
  totalCommission: string; // Total commission
  myCommissionRate: string; // My commission rate (percentage)
  cashbackRate: string; // Cashback rate (percentage)
  currency: string; // Currency (e.g., "USDT")
}

export interface AffiliateInvitees {
  currentPage: number; // Current page number
  pageSize: number; // Page size
  totalNum: number; // Total number of records
  totalPage: number; // Total number of pages
  items: AffiliateInviteeItem[]; // Array of invited user items
}

export interface AffiliateTransactionItem {
  uid: string; // The uid of the invitee
  tradeTime: number; // Trade time (13-digit timestamp)
  tradeType: 'SPOT' | 'FEATURE'; // Trade type
  tradeCurrency: string; // Trade currency
  tradeAmount: string; // Trade amount
  tradeAmountU: string; // Trade amount transfer to U(USDT or usdt)
  feeU: string; // Fee transfer to U(USDT or usdt)
  commission: string; // Trade commission
  currency: 'USDT' | 'USDC'; // Transaction volume or amount converted to U
}

export interface AffiliateTransaction {
  items: AffiliateTransactionItem[]; // Array of transaction items
  lastId: string; // The offset ID for pagination
}
