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

export interface EarnFixedIncomeHoldAsset {
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
}

export interface EarnFixedIncomeHoldAssets {
  totalNum: number;
  items: EarnFixedIncomeHoldAsset[];
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

/**
 *
 * STRUCTURED EARN - DUAL
 *
 */

export interface StructuredProductPurchaseResponse {
  orderId: string; // Holding ID
}

export interface DualInvestmentProduct {
  category: 'DUAL_CLASSIC' | 'DUAL_BOOSTER' | 'DUAL_EXTRA'; // Product category
  productId: string; // Product ID
  targetCurrency: string; // Underlying currency of the product
  quoteCurrency: string; // Currency used for pricing/quoting the product
  investCurrency: string; // Currency used for investment
  strikeCurrency: string; // Currency used for settlement if strike price is met
  strikePrice: string; // Linked price (strike price) for settlement determination
  protectPrice?: string; // Protection price for risk management (if applicable)
  annualRate: string; // Annualized rate of return (e.g., 0.05 equals 5%)
  expirationTime: number; // Product maturity time, in milliseconds
  side: 'CALL' | 'PUT'; // Direction of the product: CALL (bullish), PUT (bearish)
  expectSettleTime: number; // Expected settlement time, in milliseconds
  duration: string; // Product duration (days)
  lowerLimit: string; // Minimum investment amount per order
  upperLimit: string; // Maximum investment amount per order
  availableScale: string; // Total available subscription amount for the product
  soldStatus: 'SOLD_OUT' | 'AVAILABLE'; // Product availability status
  increment: string; // Investment step size (amount must be a multiple of this value, within lowerLimit and upperLimit)
}

export interface StructuredProductOrder {
  category: string; // Product category
  side: string; // Direction
  duration: string; // Duration
  apr: string; // Annual percentage rate
  investCurrency: string; // Investment currency
  strikeCurrency: string; // Strike currency
  investAmount: string; // Investment amount
  settleAmount: string; // Settlement amount
  settleCurrency: string | null; // Settlement currency
  targetPrice: string; // Target price
  settlePrice: string; // Settlement price
  expirationTime: number; // Expiration time in milliseconds
  orderId: string; // Order ID
  status: string; // Order status
}

export interface StructuredProductOrders {
  currentPage: number; // Current page number
  pageSize: number; // Number of records per page
  totalNum: number; // Total number of records
  totalPage: number; // Total number of pages
  items: StructuredProductOrder[]; // List of structured product holdings
}
