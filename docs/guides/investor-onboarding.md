# Investor Onboarding

## Who Is This Guide For?

This guide is for anyone who wants to invest in tokenized agricultural commodities on SiloFi: individual Investors, diaspora Investors, agri-funds, and Cooperative members.

## Prerequisites

You need:

- A Freighter wallet. Use testnet for testing and mainnet for production.
- Sufficient USDC on Stellar or XLM to purchase tokens.
- Completed KYC for the Warehouse or Operator running the Batch.

## KYC Requirement

KYC is required because SiloFi uses Stellar's Authorization Required flag. The Warehouse operator must approve your Stellar address before you can receive Batch tokens. KYC verifies your identity before that on-chain approval.

SiloFi integrates with Sumsub and Persona. The specific provider depends on the Operator's configuration.

## The KYC Flow

1. Connect your Freighter wallet on the Investor portal.
2. Navigate to a Batch you want to invest in.
3. Click "Apply to invest".
4. Complete KYC through the embedded provider widget.
5. On approval, your wallet address is automatically authorized on-chain.
6. Establish a trustline and purchase tokens.

## Purchasing Tokens

1. Find an active Batch in the Investor portal.
2. Browse by Commodity, grade, Warehouse location, expiry date, and available supply.
3. Enter the amount you want to purchase. Token units match Commodity units, such as kg.
4. Review the cost in USDC or XLM.
5. Sign the purchase transaction with Freighter. The transaction establishes a trustline if needed and sends payment.
6. Confirm the tokens appear in your portfolio.

## Your Portfolio

The portfolio page shows all holdings across Batches:

- Asset code.
- Commodity type.
- Balance.
- Batch status.
- Estimated value when available.

## What Happens When A Batch Is Settled?

When a Batch is settled, sale proceeds are distributed to your Stellar address in USDC or XLM, proportional to your share of total supply. Your tokens are clawed back by the Warehouse issuer. The Batch moves to `settled`.

## Requesting Physical Redemption

If you want the physical Commodity instead of cash proceeds, submit a Redemption request before the Batch is settled. See [redemption-guide.md](redemption-guide.md).
