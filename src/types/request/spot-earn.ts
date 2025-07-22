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

/**
 *
 * STRUCTURED EARN - DUAL
 *
 */

export interface StructuredProductPurchaseRequest {
  productId: string; // required - Product ID
  investCurrency: string; // required - Investment currency
  investAmount: string; // required - Subscription amount
  accountType: 'MAIN' | 'TRADE'; // required - MAIN (funding account), TRADE (spot trading account)
}

export interface GetDualInvestmentProductsRequest {
  category: 'DUAL_CLASSIC' | 'DUAL_BOOSTER' | 'DUAL_EXTRA'; // required - Product category
  strikeCurrency?: string; // optional - Strike Currency
  investCurrency?: string; // optional - Investment Currency
  side?: 'CALL' | 'PUT'; // optional - Direction
}

export interface GetStructuredProductOrdersRequest {
  categories: string; // required - Product categories, multiple categories are supported, e.g. DUAL_CLASSIC, DUAL_BOOSTER, DUAL_EXTRA
  orderId?: string; // optional - Order Id
  investCurrency?: string; // optional - Investment Currency
  currentPage?: number; // optional - Current Page, default: 1
  pageSize?: number; // optional - Page Size >= 10, <= 500, default: 15
}
