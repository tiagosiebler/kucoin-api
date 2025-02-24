/**
 *
 ***********
 * VIP LENDING
 ***********
 *
 */

export interface DiscountRateConfig {
  currency: string;
  usdtLevels: {
    left: number;
    right: number;
    discountRate: string;
  }[];
}

export interface OtcLoan {
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

export interface OtcLoanAccount {
  uid: string;
  marginCcy: string;
  marginQty: string;
  marginFactor: string;
  accountType: 'TRADE' | 'TRADE_HF' | 'CONTRACT';
  isParent: boolean;
}
