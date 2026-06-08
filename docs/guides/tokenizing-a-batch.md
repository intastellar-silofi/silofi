# Tokenizing A Batch

## What Is Tokenization?

Tokenization converts a registered Batch into Stellar tokens. This is when the blockchain interaction happens. After tokenization, KYC-approved Investors can hold tokens representing fractional WarehouseReceipt ownership.

## Token Design

SiloFi maps commodities to Stellar assets:

- 1 token = 1 unit of the Commodity, such as 1 kg of maize.
- Total supply = total weight of the Batch.
- Decimals = 2 for fractional unit precision.
- Asset code = up to 12 characters, such as `MAIZE001`, `RICE24Q2`, or `COCOA-NG`.
- Issuer = the Warehouse's Stellar public key.

Stellar native asset issuance does not require a smart contract. The Warehouse issuer account creates the asset by sending it to a distribution account.

## Compliance Flags

| Flag                    | Default | Meaning for SiloFi                                                |
| ----------------------- | ------- | ----------------------------------------------------------------- |
| Authorization Required  | On      | Investors must be KYC-approved before receiving tokens.           |
| Authorization Revocable | On      | The Warehouse can freeze an Investor trustline during a dispute.  |
| Clawback Enabled        | On      | The Warehouse can recover tokens during Settlement or Redemption. |

These are Stellar protocol-level controls on the issuer account.

## The Tokenize Form

## Asset Code

Use a clear uppercase code with 4-12 characters. A good convention is commodity abbreviation plus Batch identifier: `MAIZE01`, `RICE24Q2`, `COCOA-NG`.

## Distributor Wallet

The distributor wallet defaults to the connected Freighter wallet. You can use a separate distribution account if your Warehouse separates issuance from distribution.

## What Happens On Tokenize

1. SiloFi builds a Stellar transaction with `createAccount` if the distributor is new, `changeTrust`, `payment` to issue full supply to the distributor, `setOptions` for compliance flags, and a document hash memo or data entry for custody proof.
2. Freighter presents the transaction for signing.
3. After confirmation, the Batch transitions to `tokenized`.
4. The asset is live on Stellar and can be verified on Stellar Expert.
5. The Batch `stellar.toml` is generated and shown in the Batch detail dashboard.

## After Tokenization

The Batch remains `tokenized` until Investors begin purchasing. It transitions to `active` once the first Investor purchase succeeds. You can now manage the Investor allowlist.

## Testing On Testnet

1. Register a maize Batch with a test Warehouse.
2. Open the tokenize form.
3. Set the asset code to `MAIZE01`.
4. Keep the distributor wallet as your connected Freighter testnet account.
5. Sign the transaction.
6. Open Stellar Expert testnet and search the transaction hash.
7. Confirm the asset code, issuer, distributor balance, and memo.
