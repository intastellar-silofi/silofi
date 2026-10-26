/**
 * InvestorResource: Field mappings with Horizon trustlineStatus integration.
 */
export interface InvestorResourcePayload {
  investorId: string;
  stellarAddress: string;
  kycStatus: 'VERIFIED' | 'PENDING' | 'REJECTED';
  trustlineStatus: 'AUTHORIZED' | 'PENDING' | 'NONE';
  settlementPreferences: {
    currency: string;
    autoRedeem: boolean;
  };
}

export function formatInvestorResource(rawInvestor: any, horizonTrustline: any): InvestorResourcePayload {
  return {
    investorId: rawInvestor.id,
    stellarAddress: rawInvestor.stellar_address,
    kycStatus: rawInvestor.kyc_status,
    trustlineStatus: horizonTrustline?.authorized ? 'AUTHORIZED' : 'NONE',
    settlementPreferences: {
      currency: rawInvestor.settlement_currency || 'USDC',
      autoRedeem: Boolean(rawInvestor.auto_redeem)
    }
  };
}
