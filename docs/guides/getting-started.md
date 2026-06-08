# Getting Started

## Overview

This guide gets you from a fresh clone to a working local SiloFi environment. By the end, you will have the API and web app running locally and you will understand the flow for registering a test Batch on Stellar testnet.

## Prerequisites

| Tool       | Minimum version | Purpose                                   | Install link                           |
| ---------- | --------------: | ----------------------------------------- | -------------------------------------- |
| Node.js    |              20 | Runs the TypeScript apps                  | <https://nodejs.org>                   |
| pnpm       |               9 | Manages the monorepo workspace            | <https://pnpm.io/installation>         |
| PostgreSQL |              16 | Stores application data                   | <https://www.postgresql.org/download/> |
| Git        |         Current | Clones and manages the repository         | <https://git-scm.com/downloads>        |
| Freighter  |         Current | Signs Stellar transactions in the browser | <https://freighter.app>                |

## Get A Stellar Testnet Account

1. Install Freighter from <https://freighter.app>.
2. Create a wallet, switch the network to testnet, and copy your public key.
3. Fund the account with Friendbot:

   ```text
   https://friendbot.stellar.org?addr=YOUR_PUBLIC_KEY
   ```

4. Verify the account on Stellar Expert testnet:

   ```text
   https://stellar.expert/explorer/testnet/account/YOUR_PUBLIC_KEY
   ```

## Clone And Install

```sh
git clone https://github.com/your-org/silofi.git
cd silofi
pnpm install
```

## Environment Setup

Copy both app environment files:

```sh
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

Set these API variables before booting:

| Variable                 | Required | Description                                             |
| ------------------------ | -------- | ------------------------------------------------------- |
| `DATABASE_URL`           | Yes      | PostgreSQL connection string for the `silofi` database. |
| `JWT_SECRET`             | Yes      | Local secret for signing API tokens.                    |
| `JWT_EXPIRY`             | Yes      | Token expiry, usually `7d` locally.                     |
| `STELLAR_NETWORK`        | Yes      | Use `testnet` for development.                          |
| `STELLAR_HORIZON_URL`    | Yes      | Use `https://horizon-testnet.stellar.org` for testnet.  |
| `STELLAR_RPC_URL`        | Optional | Soroban RPC URL for future contract calls.              |
| `SUMSUB_SECRET_KEY`      | Optional | Sumsub webhook signing secret.                          |
| `SUMSUB_APP_TOKEN`       | Optional | Sumsub API app token.                                   |
| `PERSONA_API_KEY`        | Optional | Persona API key.                                        |
| `PERSONA_WEBHOOK_SECRET` | Optional | Persona webhook secret.                                 |
| `STORAGE_DRIVER`         | Optional | Defaults to local document storage.                     |
| `PORT`                   | Optional | API port, usually `3000`.                               |

Set these web variables:

| Variable                      | Required | Description                               |
| ----------------------------- | -------- | ----------------------------------------- |
| `NEXT_PUBLIC_API_URL`         | Yes      | API URL, usually `http://localhost:3000`. |
| `NEXT_PUBLIC_STELLAR_NETWORK` | Yes      | Use `testnet` locally.                    |

## Database Setup

```sh
createdb silofi
pnpm --filter @silofi/api ark migrate
```

## Start Dev Servers

```sh
pnpm dev
```

The API runs on port `3000`. It handles authentication, Batch records, Investor allowlists, Settlement records, and Stellar transaction orchestration. The web app runs on port `3001`. It provides the Operator dashboard, Investor portal, Batch wizard, and portfolio views.

## Register Your First Test Batch

1. Open the web app at `http://localhost:3001`.
2. Connect Freighter and confirm you are on Stellar testnet.
3. Navigate to "Register batch".
4. Select `Maize`.
5. Enter the weight, grade, harvest date, and expiry date.
6. Select a verified Warehouse. The Warehouse Stellar public key will become the issuer when you tokenize.
7. Upload a placeholder WarehouseReceipt PDF.
8. Continue to token parameters.
9. Set the asset code to `MAIZE01`.
10. Review the Batch details.
11. Sign the transaction with Freighter when tokenization is triggered.
12. Verify the asset and transaction on Stellar Expert testnet.

## What To Do Next

Look at open issues labelled `good first issue`. Read the guide for the area you want to work on, then open a draft PR early so maintainers can help shape the implementation.
