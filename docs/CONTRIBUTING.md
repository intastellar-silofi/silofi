# Contributing

## Welcome

SiloFi is open-source infrastructure for tokenized warehouse receipts in African agriculture. You are helping build tools for farming cooperatives, agri-warehouses, commodity traders, and Investors who need a trustworthy way to finance stored crops.

This project has real-world stakes. Many smallholder farmers have never had access to capital markets, even when they hold valuable commodities in storage. Your contribution can make that bridge more practical, transparent, and affordable.

## Code Of Conduct

You are expected to follow a standard open-source code of conduct when participating in SiloFi. A project-specific copy will live at [docs/CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). Until then, use the Contributor Covenant as the baseline: be respectful, assume good intent, and keep discussions focused on the work.

## Ways To Contribute

Bug reports help you make SiloFi reliable before real Operators and Investors depend on it. Include enough context for maintainers to reproduce the problem.

Feature proposals help shape the roadmap. Good proposals describe the user problem first, then suggest a solution.

Documentation contributions are valuable because Stellar, RWA tokenization, warehouse receipts, KYC, and agricultural finance each have their own vocabulary.

Code contributions can target the Arkstack backend, the Next.js frontend, or the future Soroban contracts for proceeds distribution and Redemption.

Testing contributions are especially welcome. The test suite is sparse at launch, and high-risk flows such as tokenization, Settlement, Redemption, and KYC need careful coverage.

## Reporting Bugs

Open a GitHub Issue and include:

- Your operating system, Node.js version, pnpm version, browser, and PostgreSQL version.
- The app affected: `apps/api`, `apps/web`, or both.
- Steps to reproduce the issue.
- Expected behaviour and actual behaviour.
- Relevant logs, stack traces, screenshots, or transaction hashes.
- Whether you are using Stellar testnet or mainnet.

## Proposing Features

Open a GitHub Discussion before starting large work. Explain the problem, who experiences it, and why it matters for a Batch, Warehouse, Operator, Investor, Settlement, Redemption, or Cooperative workflow. Once maintainers agree on direction, open a draft pull request early.

## Development Setup

1. Install prerequisites:

   | Tool | Minimum version | Purpose |
   |---|---:|---|
   | Node.js | 20 | Run the TypeScript apps |
   | pnpm | 9 | Manage the monorepo workspace |
   | PostgreSQL | 16 | Store Batch, Investor, and Settlement data |
   | Freighter | Current | Sign Stellar testnet transactions |
   | Stellar testnet account | Current | Test issuance and payments via Friendbot |

2. Clone the repository:

   ```sh
   git clone https://github.com/your-org/silofi.git
   cd silofi
   ```

3. Install dependencies from the monorepo root:

   ```sh
   pnpm install
   ```

4. Copy environment files:

   ```sh
   cp apps/api/.env.example apps/api/.env
   cp apps/web/.env.example apps/web/.env
   ```

5. Fill the minimum required API variables:

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/silofi
   JWT_SECRET=replace-with-a-local-secret
   STELLAR_NETWORK=testnet
   STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
   ```

6. Create the local database:

   ```sh
   createdb silofi
   ```

7. Run migrations:

   ```sh
   pnpm --filter @silofi/api ark migrate
   ```

8. Start the dev servers:

   ```sh
   pnpm dev
   ```

9. Verify the apps:

   - API: `http://localhost:3000`
   - Web: `http://localhost:3001`

## Branch Naming

Use short, descriptive branch names:

| Prefix | Use for | Example |
|---|---|---|
| `feat/` | New capabilities | `feat/settlement-ui` |
| `fix/` | Bug fixes | `fix/batch-tokenize-route` |
| `docs/` | Documentation | `docs/cooperative-setup` |
| `chore/` | Tooling and maintenance | `chore/update-ci-cache` |

## Commit Format

Use Conventional Commits.

| Type | Use for | Example |
|---|---|---|
| `feat` | User-facing feature | `feat(api): add redemption approval route` |
| `fix` | Bug fix | `fix(web): validate asset code length` |
| `docs` | Documentation | `docs: expand KYC integration guide` |
| `test` | Tests | `test(api): cover batch lifecycle transitions` |
| `refactor` | Code change without behaviour change | `refactor(api): move Stellar calls into service` |
| `chore` | Build or maintenance | `chore: update pnpm workspace scripts` |

## Pull Request Checklist

Copy this into your pull request description:

- [ ] I used `pnpm` for all commands.
- [ ] I ran `pnpm --recursive run lint`.
- [ ] I ran `pnpm --recursive run typecheck`.
- [ ] I ran `pnpm --recursive run test`.
- [ ] I ran `pnpm ark route:list` if I changed API routes.
- [ ] I updated docs for any user-facing behaviour.
- [ ] I did not run destructive migration commands.
- [ ] I did not introduce `any` types.
- [ ] I did not add StellarMint references or dependencies.

## Testing

Run the full test suite from the monorepo root:

```sh
pnpm --recursive run test
```

Vitest covers unit tests. The test suite is sparse at launch, so useful tests are welcome for services, API resources, route guards, Zustand stores, and high-value Stellar transaction builders.

## Code Style

SiloFi uses ESLint, Prettier, and TypeScript strict mode. Avoid `any`; model data explicitly with domain types. Follow [.eslintrc.cjs](../.eslintrc.cjs) and [.prettierrc](../.prettierrc). Run formatting before submitting:

```sh
pnpm format
```

## Working On The Backend

- The runtime driver is `@arkstack/driver-express`; never import from the H3 driver.
- Use `pnpm ark make:*` generators before hand-writing controllers, models, resources, migrations, or factories.
- Run `pnpm ark route:list` after touching routes.
- Run `pnpm ark models:sync` after editing models.
- Keep controllers thin. Put Stellar transactions, proceeds calculations, document hashing, and KYC logic in services.
- Maintain two route groups: Operator routes use auth plus operator middleware; Investor routes use auth only.
- Never run `ark migrate:fresh` or `ark migrate:rollback` without confirming with the team.

## Working On The Frontend

Use the Next.js App Router only. Prefer shadcn/ui and Radix UI primitives before writing custom components. Use Zustand for global state and local React state for screen-specific state. Type component props explicitly and avoid `any`.

## Working On Soroban Contracts

The proceeds distribution and Redemption contracts are not yet written. This is one of the highest-impact open tasks because it unlocks safe Settlement for larger holder counts and automated clawback-on-redemption flows. You need Rust and `soroban-cli`. Contract-specific guides will live in `docs/guides/` when the first contract scaffold lands.

## Getting Help

Use GitHub Discussions for design questions and GitHub Issues for actionable bugs or scoped tasks. Open a draft pull request early when you want feedback on implementation direction.
