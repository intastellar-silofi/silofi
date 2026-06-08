# Security

## Supported Versions

SiloFi is pre-1.0. Only the `main` branch is supported for security fixes.

| Version              | Supported |
| -------------------- | --------- |
| `main`               | Yes       |
| Pre-release branches | No        |
| Forks                | No        |

## Reporting A Vulnerability

Email security reports to `security@silofi.dev`. Do not open a public GitHub Issue for vulnerabilities.

Include:

- A clear description of the vulnerability.
- Steps to reproduce it.
- Potential impact on Operators, Investors, Batches, funds, documents, or Stellar transactions.
- Any suggested fix or mitigation.
- Relevant logs, requests, transaction hashes, or screenshots.

Reports involving the Stellar ledger state, Horizon, Freighter, Sumsub, Persona, or other third-party systems should also be directed to those providers.

## Response Timeline

| Severity | Acknowledgement | Triage |              Patch target |
| -------- | --------------: | -----: | ------------------------: |
| Critical |        48 hours | 7 days | 48 hours after validation |
| High     |        48 hours | 7 days |   7 days after validation |
| Medium   |        48 hours | 7 days |        Next release cycle |
| Low      |        48 hours | 7 days |        Next release cycle |

## Scope

In scope:

- The SiloFi monorepo codebase.
- Stellar transaction construction logic.
- Soroban contract logic when implemented.
- Document hashing and anchoring logic.
- Authentication and authorization in `apps/api`.
- Investor allowlist and trustline authorization flows.

Out of scope:

- The Stellar network itself.
- Freighter wallet.
- Third-party KYC providers such as Sumsub and Persona.
- PostgreSQL internals.
- Bugs caused by unsafe local deployment configuration outside this repository.

## Safe Harbour

Good-faith security research will not result in legal action from the SiloFi maintainers. Stay within the scope above, avoid privacy violations, do not exfiltrate funds or data, and give maintainers reasonable time to patch before public disclosure.
