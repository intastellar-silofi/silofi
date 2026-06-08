# Registering A Batch

## What Is Batch Registration?

Batch registration is the first step in the SiloFi lifecycle. You create an off-chain record of a physical Commodity lot before issuing tokens. There is no blockchain interaction yet; the goal is to capture custody, quality, Warehouse, and document information accurately.

## Before You Start

Make sure:

- You are a registered Operator.
- Your Freighter wallet is connected.
- You have a verified Warehouse in the system.
- The physical Commodity is already in custody.
- You have a WarehouseReceipt document ready to upload.

## The Registration Form

## Commodity Type

Select one supported Commodity: maize, rice, cassava, soybean, cocoa, palm_oil, wheat, or sorghum. Each Commodity has a default unit and two decimal places of precision. Palm oil uses litres; the other supported commodities use kilograms.

## Weight

Enter the total weight of the lot in the Commodity's unit. For maize, `10000` means 10,000 kg. This value later controls the token supply when the Batch is tokenized.

## Grade

Enter the quality classification, such as `Grade A`, `Grade B`, `Premium`, or `Standard`. The grade appears in Batch metadata and should also appear in the generated `stellar.toml` metadata.

## Harvest Date

Enter the date the Commodity was harvested or produced. Investors use this to understand freshness, storage duration, and market risk.

## Expiry Date

Enter the date after which the Commodity may deteriorate. If the Batch is not settled before this date, it can transition to `expired`.

## Warehouse

Select a verified Warehouse from the dropdown. The Warehouse's Stellar public key becomes the token issuer during tokenization.

## Cooperative

Select a Cooperative if the Batch belongs to one. The Cooperative revenue split applies during Settlement.

## Description

Add concise notes visible to Investors. Include useful context such as storage conditions, location, certification details, or buyer interest.

## Uploading Documents

The WarehouseReceipt is required. It must be a PDF with a maximum size of 20 MB. You can also upload a grading certificate and phytosanitary certificate.

Each document is SHA-256 hashed client-side before upload. The WarehouseReceipt hash is anchored to the Stellar issuance transaction memo when you tokenize the Batch.

## After Registration

The Batch is in `registered` state. It appears in your Operator dashboard but is not visible to Investors. The next step is tokenization.

## What Gets Stored

SiloFi stores a `Batch` record in PostgreSQL and stores the uploaded documents in local storage by default. Production deployments can use cloud storage when that contributor task is implemented. Nothing is on Stellar until tokenization.
