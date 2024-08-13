/**
 *
 * EARN
 *
 */

export interface SubscribeEarnFixedIncomeResponse {
  orderId: string;
  orderTxId: string;
}

export interface InitiateRedemptionResponse {
  orderTxId: string;
  deliverTime: number;
  status: 'SUCCESS' | 'PENDING';
  amount: string;
}

export interface GetEarnRedeemPreviewResponse {
  currency: string;
  redeemAmount: string;
  penaltyInterestAmount: string;
  redeemPeriod: number;
  deliverTime: number;
  manualRedeemable: boolean;
  redeemAll: boolean;
}

export interface EarnFixedIncomeHoldAssets {
  totalNum: number;
  items: {
    orderId: string;
    productId: string;
    productCategory: string;
    productType: string;
    currency: string;
    incomeCurrency: string;
    returnRate: string;
    holdAmount: string;
    redeemedAmount: string;
    redeemingAmount: string;
    lockStartTime: number;
    lockEndTime: number | null;
    purchaseTime: number;
    redeemPeriod: number;
    status: 'LOCKED' | 'REDEEMING';
    earlyRedeemSupported: 0 | 1;
  }[];
  currentPage: number;
  pageSize: number;
  totalPage: number;
}

export interface EarnProduct {
  id: string;
  currency: string;
  category: 'DEMAND' | 'ACTIVITY' | 'KCS_STAKING' | 'STAKING' | 'ETH2';
  type: 'TIME' | 'DEMAND';
  precision: number;
  productUpperLimit: string;
  userUpperLimit: string;
  userLowerLimit: string;
  redeemPeriod: number;
  lockStartTime: number;
  lockEndTime: number | null;
  applyStartTime: number;
  applyEndTime: number | null;
  returnRate: string;
  incomeCurrency: string;
  earlyRedeemSupported: 0 | 1;
  productRemainAmount: string;
  status: 'ONGOING' | 'PENDING' | 'FULL' | 'INTERESTING';
  redeemType: 'MANUAL' | 'TRANS_DEMAND' | 'AUTO';
  incomeReleaseType: 'DAILY' | 'AFTER';
  interestDate: number;
  duration: number;
  newUserOnly: 0 | 1;
}
