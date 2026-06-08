# Changelog

## About This Changelog

This changelog follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and SiloFi follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- No unreleased additions yet.

### Changed

- No unreleased changes yet.

### Deprecated

- No deprecations yet.

### Removed

- No removals yet.

### Fixed

- No fixes yet.

### Security

- No security changes yet.

## [0.1.0] - Unreleased

### Added

- pnpm workspace monorepo with `apps/api`, `apps/web`, and `docs`.
- Arkstack Express API bootstrap for `@silofi/api`.
- Next.js 15 App Router frontend bootstrap for `@silofi/web`.
- Domain models for Operator, Warehouse, Cooperative, Batch, BatchDocument, Investor, SettlementEvent, and RedemptionRequest.
- Operator route declarations for Batch management, tokenization, Settlement, Redemption review, Cooperative management, document uploads, Investor allowlists, and TOML generation.
- Investor route declarations for browsing Batches, purchasing tokens, requesting Redemption, and viewing portfolio holdings.
- Public KYC webhook route declaration.
- Typed controller stubs for Batches, Investors, Settlements, Redemptions, Cooperatives, Documents, TOML, and Webhooks.
- Service stubs for Stellar, Batch, Token, Settlement, Redemption, Document, TOML, and KYC workflows.
- Frontend page shells for dashboard, Batch list, Batch creation, Batch detail, Investor portal, portfolio, Cooperative management, Settlement history, and TOML generation.
- Component shells for layout, wallet, Batch display, lifecycle, and Batch registration wizard flows.
- Zustand store stubs for wallet, Batch wizard, Batches, and Investors.
- shadcn/ui and Radix UI component installation.
- `COMMODITY_META` constant for maize, rice, cassava, soybean, cocoa, palm_oil, wheat, and sorghum.
- Batch lifecycle state machine types: `registered`, `tokenized`, `active`, `settled`, `redeemed`, and `expired`.
- pnpm workspace scripts for build, dev, lint, typecheck, test, and format.
- GitHub Actions CI workflow.
- Docker Compose configuration for PostgreSQL, API, and web services.
- Initial documentation skeleton and OpenAPI location.
