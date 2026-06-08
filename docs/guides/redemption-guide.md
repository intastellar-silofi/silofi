# Redemption Guide

## What Is Redemption?

Redemption is an alternative to waiting for Settlement. Instead of receiving cash proceeds, an Investor can request physical delivery of the Commodity they hold tokens for. The Operator approves the request, releases the Commodity from the Warehouse, and claws back the Investor's tokens.

## For Investors - Submitting A Redemption Request

1. Navigate to the Batch in your portfolio.
2. Click "Request redemption".
3. Enter the quantity in kg or litres. It must be less than or equal to your token balance.
4. Enter the delivery address.
5. Enter the requested delivery date.
6. Submit the request.

Submitting creates a `RedemptionRequest` record with status `pending`. The Operator is notified and reviews your request. Once approved, you receive a Redemption voucher PDF with a hash anchored on-chain. Your tokens are clawed back when the Commodity is released.

## For Operators - Managing Redemption Requests

1. Navigate to the Redemptions section of the Operator dashboard.
2. Review pending requests by Investor address, quantity, delivery address, and requested date.
3. Approve the request by entering the actual delivery date.
4. Generate a Redemption voucher PDF.
5. Anchor the voucher hash to a Stellar transaction.
6. Claw back the Investor's tokens.

If you reject a request, enter a rejection reason. The Investor keeps their tokens and can request again or wait for Settlement.

## Partial Redemptions

An Investor can redeem a portion of their balance. Remaining tokens stay in their account and remain eligible for Settlement proceeds when the Batch is sold.

## What Gets Anchored On-Chain

When a Redemption is approved, SiloFi submits a Stellar transaction with the Redemption voucher hash in the memo field. This creates a permanent on-chain proof of physical delivery.

## The Soroban Dependency

The automated clawback-on-redemption flow uses the future Soroban Redemption contract. That contract is an open contributor task. For the MVP, Operators manually claw back tokens through the compliance tab.
