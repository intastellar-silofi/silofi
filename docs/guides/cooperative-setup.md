# Cooperative Setup

## What Is A Cooperative In SiloFi?

A Cooperative is a group of individual farmers who pool their harvests under one issuer account. The Cooperative manages token issuance centrally, and revenue from settled Batches is split between the Cooperative treasury and the individual farmer who contributed the Batch.

## Why Cooperatives Matter

In many African agricultural contexts, individual smallholders lack the scale, documentation, and credibility to attract Investors on their own. A Cooperative provides collective credibility, shared KYC burden, pooled Warehouse access, and stronger bargaining power with buyers.

## Creating A Cooperative

1. Navigate to Cooperative -> New cooperative.
2. Enter the Cooperative name.
3. Enter the registration number if the Cooperative is formally incorporated.
4. Select the country.
5. Add a description.
6. Enter the Stellar issuer public key.
7. Set the revenue split: Cooperative percentage and farmer percentage.
8. Add member farmers with their names and Stellar public keys.

## Revenue Split Mechanics

Example: the Cooperative takes 5% and the farmer gets 95%. On a $10,000 Settlement, $500 goes to the Cooperative treasury address and $9,500 goes to the farmer's Stellar address.

Token holders receive proceeds from the full $10,000 before this split. The split is between issuer-side accounts, not Investor-side accounts.

## Managing Member Batches

Cooperative admins can see all Batches from all member farmers in one dashboard. They can tokenize, settle, and manage Investor allowlists on behalf of members.

## Adding Members

Members are added by Stellar public key. They can view their own Batches and proceeds but cannot manage other members' Batches.

## Cooperative Treasury

Settlement proceeds allocated to the Cooperative accumulate in the Cooperative Stellar account. Disbursement to members for shared equipment, input subsidies, or other programs is outside SiloFi's scope and happens off-platform.

## Revenue Split Configuration

The split can be updated between Batches. It cannot be changed once a Batch is in `tokenized` or `active` state because the split is locked at tokenization time to protect Investor expectations.
