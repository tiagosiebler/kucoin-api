/**
 *
 * EARN
 *
 */

export interface SubscribeEarnFixedIncomeRequest {
  productId: string;
  amount: string;
  accountType: 'MAIN' | 'TRADE';
}

export interface InitiateRedemptionRequest {
  orderId: string;
  amount: string;
  fromAccountType?: 'MAIN' | 'TRADE';
  confirmPunishRedeem?: '1';
}

export interface GetEarnRedeemPreviewRequest {
  orderId: string;
  fromAccountType?: 'MAIN' | 'TRADE';
}

export interface GetEarnFixedIncomeHoldAssetsRequest {
  currentPage?: number;
  pageSize?: number;
  productId?: string;
  productCategory?: string;
  currency?: string;
}
