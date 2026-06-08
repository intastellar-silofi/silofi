# SiloFi

```text
  ___ _ _     ___ _ 
 / __(_) |___| __(_)
 \__ \ | / _ \ _|| |
 |___/_|_\___/_| |_|
                    
 On-chain warehouse receipts for African agriculture.
```

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](../LICENSE)
[![CI](https://img.shields.io/badge/CI-GitHub%20Actions-blue.svg)](../.github/workflows/ci.yml)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Stellar](https://img.shields.io/badge/Stellar-testnet%20%7C%20mainnet-7D00FF.svg)](https://stellar.org)

## Documentation Index

| Page                                                 | Context                                                                           |
| ---------------------------------------------------- | --------------------------------------------------------------------------------- |
| [Contributing](CONTRIBUTING.md)                      | Set up a contributor workflow, open issues, or submit pull requests.              |
| [Security](SECURITY.md)                              | Report vulnerabilities or understand the project security policy.                 |
| [Changelog](CHANGELOG.md)                            | Track released and unreleased project changes.                                    |
| [Getting Started](guides/getting-started.md)         | Run SiloFi locally and walk through your first test Batch.                   |
| [Self Hosting](guides/self-hosting.md)               | Deploy SiloFi for a Cooperative, Warehouse, or agri-fintech.                 |
| [Registering A Batch](guides/registering-a-batch.md) | Create the off-chain record for a physical Commodity lot.                         |
| [Tokenizing A Batch](guides/tokenizing-a-batch.md)   | Issue Stellar tokens for a registered Batch.                                      |
| [Investor Onboarding](guides/investor-onboarding.md) | Understand KYC, purchasing, portfolio, Settlement, and Redemption as an Investor. |
| [Settlement Guide](guides/settlement-guide.md)       | Settle a sold Batch and distribute proceeds to token holders.                     |
| [Redemption Guide](guides/redemption-guide.md)       | Request or manage physical delivery of a Commodity.                               |
| [Cooperative Setup](guides/cooperative-setup.md)     | Configure Cooperative members, treasury, and revenue splits.                      |
| [KYC Integration](guides/kyc-integration.md)         | Implement or extend Sumsub, Persona, or manual KYC flows.                         |
| [OpenAPI Specification](api/openapi.yaml)            | Inspect the REST API contract for Operator, Investor, and webhook routes.         |

## What Is StellarCrop?

African smallholder farmers often hold real economic assets in the form of stored crops, but they cannot easily borrow against them, attract investors, or sell fractional ownership. The missing piece is a trusted digital mechanism that represents physical commodity custody without forcing every buyer to inspect a warehouse receipt by hand.

StellarCrop puts warehouse receipts on-chain using Stellar's native asset issuance. A warehouse operator registers a Batch, uploads the WarehouseReceipt, issues Stellar tokens for the commodity, and manages a KYC-gated Investor allowlist. When the commodity is sold, proceeds flow on-chain to every token holder.

StellarCrop is open source because this infrastructure should be auditable, self-hostable, and adaptable by cooperatives, warehouses, and agri-fintechs across Africa. Stellar is a strong fit because it offers sub-cent fees, 3-5 second finality, protocol-level compliance flags, USDC support, and native asset issuance without a smart contract. There is still no mature open-source infrastructure for this use case in Africa; StellarCrop aims to be that starting point.

## How It Works

1. Register a Batch with commodity, weight, grade, dates, Warehouse, and optional Cooperative.
2. Upload the WarehouseReceipt and supporting custody documents.
3. Issue Stellar tokens where 1 token represents 1 unit of the Commodity.
4. KYC Investors and authorize their Stellar trustlines.
5. Investors purchase tokens using USDC on Stellar or XLM.
6. The physical Commodity is sold by the Operator.
7. Sale proceeds are distributed pro-rata to token holders.
8. Tokens are clawed back and the Batch closes.

## Supported Commodities

| Commodity | Asset code format | Unit   | Typical use case                    |
| --------- | ----------------: | ------ | ----------------------------------- |
| maize     |        `MAIZE001` | kg     | Grain warehouse receipt financing   |
| rice      |        `RICE24Q2` | kg     | Paddy or processed rice inventory   |
| cassava   |       `CASSAVA01` | kg     | Fresh or dried cassava lots         |
| soybean   |          `SOY001` | kg     | Oilseed aggregation and trading     |
| cocoa     |        `COCOA-NG` | kg     | Export-grade cocoa bean custody     |
| palm_oil  |       `PALMOIL01` | litres | Crude or refined palm oil inventory |
| wheat     |        `WHEAT001` | kg     | Stored wheat grain lots             |
| sorghum   |         `SORG001` | kg     | Regional grain inventory financing  |

## Batch Lifecycle

```text
REGISTERED --> TOKENIZED --> ACTIVE --> SETTLED
                               |------> REDEEMED
                               |------> EXPIRED
```

## Features

- 🌾 Register agricultural commodity batches with custody metadata.
- 📄 Upload and hash WarehouseReceipt documents for later on-chain anchoring.
- 🪙 Issue Stellar-native commodity tokens without deploying an issuance contract.
- 🔐 Use Stellar compliance flags: Authorization Required, Authorization Revocable, and Clawback Enabled.
- 🧾 Manage KYC-gated Investor allowlists for each Batch asset.
- 💼 Track Investor portfolios across commodities, Warehouses, and Batch statuses.
- 💵 Settle sold batches in USDC on Stellar, with XLM as fallback.
- 📦 Support physical Redemption requests for token holders.
- 🤝 Manage Cooperative revenue splits and pooled member batches.
- 🧰 Self-host the full stack with pnpm workspaces, PostgreSQL, and GitHub Actions.

## Architecture

```text
Browser + Freighter
        |
        v
Next.js 15 frontend (@stellarcrop/web)
        |
        v
Arkstack Express API (@stellarcrop/api)
        |
        +--> PostgreSQL via Arkormx
        +--> Stellar Horizon
        +--> Soroban contracts
```

## Stack

| Layer           | Technology                                            |
| --------------- | ----------------------------------------------------- |
| Frontend        | Next.js 15 (App Router)                               |
| Language        | TypeScript (strict)                                   |
| UI Components   | shadcn/ui + Radix UI primitives                       |
| Styling         | Tailwind CSS v4                                       |
| State           | Zustand                                               |
| Backend         | Arkstack (Express driver: `@arkstack/driver-express`) |
| ORM             | Arkormx (`@arkstack/database`)                        |
| Database        | PostgreSQL                                            |
| Package manager | pnpm workspaces                                       |
| Linting         | ESLint + Prettier                                     |
| Testing         | Vitest                                                |
| CI              | GitHub Actions                                        |

## Quick Start

```sh
# Clone the repository.
git clone https://github.com/your-org/stellarcrop.git
cd stellarcrop

# Install all workspace dependencies.
pnpm install

# Copy environment templates and fill required values.
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# Create the local PostgreSQL database.
createdb stellarcrop

# Run API migrations.
pnpm --filter @stellarcrop/api ark migrate

# Start both apps from the monorepo root.
pnpm dev
```

The API runs on port `3000`. The web app runs on port `3001`.

## Project Structure

```text
stellarcrop/
├── apps/
│   ├── api/
│   │   ├── src/app/          # Controllers, models, resources, middlewares
│   │   ├── src/database/     # Migrations, factories, seeders
│   │   └── src/routes/       # API and web route declarations
│   └── web/
│       ├── src/app/          # Next.js App Router pages
│       ├── src/components/   # shadcn/ui and app components
│       └── src/store/        # Zustand stores
├── contracts/
│   └── test-contract/        # Minimal Soroban contract validated by CI
├── docs/
│   ├── guides/               # Operator, Investor, and contributor guides
│   └── api/                  # OpenAPI specification
└── .github/workflows/        # CI and release workflows
```

## Contributing

StellarCrop needs backend engineers, frontend designers, Stellar builders, Rust/Soroban contributors, documentation writers, and people who understand agricultural operations. Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening an issue or pull request.

## License

StellarCrop is released under the MIT License. See [LICENSE](../LICENSE).
