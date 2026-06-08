# SiloFi Contracts

This workspace contains Soroban smart contracts for SiloFi.

The first contract, `test-contract`, is intentionally small. It proves that the contracts workspace is wired correctly and gives contributors a working pattern for future contracts.

## Layout

```text
contracts/
├── Cargo.toml
├── README.md
└── test-contract/
    ├── Cargo.toml
    └── src/
        ├── lib.rs
        └── test.rs
```

## Current Contract

| Contract | Purpose |
|---|---|
| `test-contract` | Minimal Soroban contract used by CI to validate the Rust/Soroban workspace. |

## Planned Contracts

Future contributors can add contracts for:

- Proceeds distribution during Settlement.
- Redemption voucher and clawback coordination.
- Other narrowly scoped SiloFi workflows that benefit from Soroban.

## Commands

Run all contract tests:

```sh
cargo test --manifest-path contracts/Cargo.toml --workspace
```

Build all contracts for Wasm:

```sh
cargo build --manifest-path contracts/Cargo.toml --workspace --target wasm32-unknown-unknown --release
```

## Adding A Contract

1. Create a new directory under `contracts/`.
2. Add a `Cargo.toml` for the contract package.
3. Add the contract directory to `contracts/Cargo.toml` under `workspace.members`.
4. Include at least one unit test in `src/test.rs`.
5. Run the contract test command before opening a pull request.
