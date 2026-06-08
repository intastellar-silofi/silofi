# Settlement Guide

## What Is Settlement?

Settlement is the final step for most Batches. The Operator records that the physical Commodity has been sold, enters the sale proceeds, and triggers on-chain distribution to all token holders. Tokens are clawed back from holders and the Batch moves to `settled`.

## Before Settling

Confirm:

- The physical Commodity has been sold and proceeds have been received.
- All pending Redemption requests for the Batch are approved or rejected.
- You have the total sale proceeds amount.
- You know whether proceeds are paid in USDC or XLM.

## The Settle Form

| Field                | Description                                      |
| -------------------- | ------------------------------------------------ |
| Sale proceeds amount | Total proceeds received from the Commodity sale. |
| Settlement currency  | USDC is preferred; XLM is the fallback.          |
| Buyer reference      | Optional internal reference for your records.    |

## What Happens On Settle

1. SiloFi fetches all current token holders from Horizon.
2. It calculates each holder's pro-rata share: `holderBalance / totalSupply * saleProceeds`.
3. It builds a batched Stellar transaction distributing proceeds to each holder.
4. For large holder counts, this flow needs the Soroban proceeds distribution contract, which is not yet implemented.
5. It builds clawback transactions for all holders.
6. Transactions are submitted to Stellar in sequence.
7. A `SettlementEvent` record is created with the transaction hash, proceeds amount, and holder count.
8. The Batch transitions to `settled`.

## The Soroban Dependency

The proceeds distribution contract is an open contributor task. Until it is implemented, Settlement is manual for Batches with more than about 100 holders because Stellar transactions have operation limits. For MVP testing, use Batches with a small number of test Investors.

## After Settlement

The Batch is closed. Holders can view received proceeds in Freighter or Stellar Expert. The Batch detail dashboard shows the `SettlementEvent` with its transaction hash.

## Edge Cases

| Case                                  | Behaviour                                                  |
| ------------------------------------- | ---------------------------------------------------------- |
| Holder account is closed              | Proceeds for that address are returned to the distributor. |
| Settlement fails mid-way              | Partial settlements are logged and can be retried.         |
| Unsold tokens remain with distributor | Unallocated supply is not distributed to Investors.        |
