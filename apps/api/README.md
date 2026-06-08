# SiloFi API

SiloFi puts warehouse receipts on-chain using Stellar's native asset issuance. A warehouse operator registers a Batch, uploads the WarehouseReceipt, issues Stellar tokens for the commodity, and manages a KYC-gated Investor allowlist. When the commodity is sold, proceeds flow on-chain to every token holder.

SiloFi API is built on the Arkstack Express framework, and framework documentations are available from [https://arkstack.toneflix.net](https://arkstack.toneflix.net/).

- Runtime interaction guide: [guide/express-runtime](https://arkstack.toneflix.net/guide/express-runtime)
- Getting started guide: [guide/getting-started](https://arkstack.toneflix.net/guide/getting-started)

## Developing

### Install dependencies

```sh
pnpm install
```

### Run migrations

```sh
pnpm run migrate dev
```

### Start dev server

```sh
pnpm run dev
```
