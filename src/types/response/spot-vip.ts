/**
 *
 ***********
 * VIP LENDING
 ***********
 *
 */

export interface GetOtcLoanResponse {
  parentUid: string;
  orders: {
    orderId: string;
    currency: string;
    principal: string;
    interest: string;
  }[];
  ltv: {
    transferLtv: string;
    onlyClosePosLtv: string;
    delayedLiquidationLtv: string;
    instantLiquidationLtv: string;
    currentLtv: string;
  };
  totalMarginAmount: string;
  transferMarginAmount: string;
  margins: {
    marginCcy: string;
    marginQty: string;
    marginFactor: string;
  }[];
}

export interface GetOtcLoanAccountsResponse {
  uid: string;
  marginCcy: string;
  marginQty: string;
  marginFactor: string;
  accountType: 'TRADE' | 'TRADE_HF' | 'CONTRACT';
  isParent: boolean;
}
