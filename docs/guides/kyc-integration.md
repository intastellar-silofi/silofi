# KYC Integration

## Overview

The KYC flow in SiloFi is: Investor connects wallet, requests access to a Batch, completes KYC through a provider widget, passes verification, receives on-chain trustline authorization, and can purchase Batch tokens.

## Architecture

`WebhooksController` receives KYC completion events from providers. `KycService` parses the event, creates a `KycCheck` record, and calls `StellarService.approveHolder()` when the Investor passes. The on-chain approval authorizes the Investor trustline for the specific Batch asset.

## What Needs To Be Implemented

1. `WebhooksController.kyc()` receives the webhook, verifies the signature, and dispatches work.
2. `KycService.handleWebhook(provider, payload)` parses and routes provider events.
3. `KycService.processPass(batchId, investorAddress, provider)` approves on-chain and logs the result.
4. `KycService.processFail(batchId, investorAddress, provider)` logs the failed check.
5. `StellarService.approveHolder(params)` sets trustline authorization for the Batch asset.

## Sumsub Integration

Dashboard: `app.sumsub.com` -> API keys.

Required environment variables:

- `SUMSUB_APP_TOKEN`
- `SUMSUB_SECRET_KEY`

Handle the `applicantReviewed` webhook event.

Key fields:

- `type` must be `applicantReviewed`.
- `reviewResult.reviewAnswer` is `GREEN` for pass and `RED` for fail.
- `externalUserId` should be set to the Investor Stellar public key when creating the applicant.

Signature verification: compute an HMAC-SHA256 of the raw request body using `SUMSUB_SECRET_KEY` and compare it against the `X-App-Token` header.

## Persona Integration

Dashboard: `withpersona.com` -> API keys.

Required environment variables:

- `PERSONA_API_KEY`
- `PERSONA_WEBHOOK_SECRET`

Handle the `inquiry.completed` webhook event.

Key fields:

- `data.attributes.status` is `completed` for pass and `failed` for fail.
- `data.attributes.reference-id` should be set to the Investor Stellar public key.

Signature verification: verify the `Persona-Signature` header using SHA256 and `PERSONA_WEBHOOK_SECRET`.

## Manual KYC

Operators can approve Investors directly without a provider through the Investor allowlist in the Batch detail dashboard. This is useful for Cooperatives where the Operator knows all members personally.

## Auto-Approve Flow Sequence

1. `POST /api/webhooks/kyc` is received.
2. The signature is verified against the provider secret.
3. The Investor address is extracted from `externalUserId` or `reference-id`.
4. The Batch ID is resolved from the pending purchase or access request.
5. A `KycCheck` record is created with provider, status, and raw payload.
6. If passed, `StellarService.approveHolder()` authorizes the trustline and a `HolderEvent` is logged.
7. If failed, the `KycCheck` is logged and the Investor notification is queued when the notification system is implemented.

## Testing Locally With ngrok

```sh
ngrok http 3000
# set webhook URL in provider dashboard to:
# https://<your-ngrok-id>.ngrok.io/api/webhooks/kyc
```
