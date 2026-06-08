# Self Hosting

## Overview

This guide is for cooperatives, Warehouse operators, and agri-fintechs deploying SiloFi for their own operations. You will run the Next.js frontend, Arkstack API, PostgreSQL database, and reverse proxy needed for a production deployment.

## System Requirements

| Component  |   Minimum |             Recommended |
| ---------- | --------: | ----------------------: |
| CPU        |    2 vCPU |                 4+ vCPU |
| Memory     |  2 GB RAM |                8 GB RAM |
| Disk       | 20 GB SSD | 80+ GB SSD with backups |
| Node.js    |        20 |             Current LTS |
| pnpm       |         9 |          Current stable |
| PostgreSQL |        16 |   Managed PostgreSQL 16 |
| Network    |     HTTPS |   HTTPS with monitoring |

## Environment Variables Reference

| Variable                                 | App | Required | Default                               | Description                                     |
| ---------------------------------------- | --- | -------- | ------------------------------------- | ----------------------------------------------- |
| `STELLAR_NETWORK`                        | API | Yes      | `testnet`                             | Stellar network: `testnet` or `mainnet`.        |
| `STELLAR_HORIZON_URL`                    | API | Yes      | `https://horizon-testnet.stellar.org` | Horizon REST API URL.                           |
| `STELLAR_RPC_URL`                        | API | No       | `https://soroban-testnet.stellar.org` | Soroban RPC URL for future contracts.           |
| `SOROBAN_CONTRACT_PROCEEDS_DISTRIBUTION` | API | No       | Empty                                 | Future proceeds distribution contract address.  |
| `SOROBAN_CONTRACT_REDEMPTION`            | API | No       | Empty                                 | Future Redemption contract address.             |
| `DATABASE_URL`                           | API | Yes      | None                                  | PostgreSQL connection string.                   |
| `JWT_SECRET`                             | API | Yes      | None                                  | Secret for signing API tokens.                  |
| `JWT_EXPIRY`                             | API | Yes      | `7d`                                  | JWT validity window.                            |
| `SUMSUB_SECRET_KEY`                      | API | No       | Empty                                 | Sumsub webhook signing secret.                  |
| `SUMSUB_APP_TOKEN`                       | API | No       | Empty                                 | Sumsub API app token.                           |
| `PERSONA_API_KEY`                        | API | No       | Empty                                 | Persona API key.                                |
| `PERSONA_WEBHOOK_SECRET`                 | API | No       | Empty                                 | Persona webhook signing secret.                 |
| `STORAGE_DRIVER`                         | API | Yes      | `local`                               | Storage backend for WarehouseReceipt documents. |
| `PORT`                                   | API | Yes      | `3000`                                | API listen port.                                |
| `NEXT_PUBLIC_API_URL`                    | Web | Yes      | `http://localhost:3000`               | Public API URL consumed by the web app.         |
| `NEXT_PUBLIC_STELLAR_NETWORK`            | Web | Yes      | `testnet`                             | Stellar network shown in the frontend.          |

## Database

Create the production database and run migrations:

```sh
createdb silofi
pnpm --filter @silofi/api ark migrate
```

Never run `ark migrate:fresh` in production. It is destructive and can erase Batch, Investor, Settlement, and document metadata. Do not run `ark migrate:rollback` in production without a reviewed rollback plan.

## Build For Production

```sh
pnpm --recursive run build
```

## Running The API

Start the API package:

```sh
pnpm --filter @silofi/api start
```

Use PM2 or systemd in production. Example systemd unit:

```ini
[Unit]
Description=SiloFi API
After=network.target

[Service]
Type=simple
WorkingDirectory=/srv/silofi/apps/api
EnvironmentFile=/srv/silofi/apps/api/.env
ExecStart=/usr/bin/pnpm start
Restart=always
RestartSec=5
User=silofi

[Install]
WantedBy=multi-user.target
```

## Running The Web App

Start the Next.js production server:

```sh
pnpm --filter @silofi/web start
```

## Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name silofi.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name silofi.example.com;

    ssl_certificate /etc/letsencrypt/live/silofi.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/silofi.example.com/privkey.pem;

    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Docker Compose

```yaml
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: silofi
      POSTGRES_PASSWORD: silofi
      POSTGRES_DB: silofi
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

  api:
    build:
      context: ./apps/api
    ports:
      - '3000:3000'
    env_file:
      - ./apps/api/.env
    depends_on:
      - db

  web:
    build:
      context: ./apps/web
    ports:
      - '3001:3000'
    env_file:
      - ./apps/web/.env
    depends_on:
      - api

volumes:
  postgres_data:
```

The `db` service runs PostgreSQL. The `api` service runs Arkstack. The `web` service runs Next.js.

Start the stack:

```sh
docker compose up -d
```

## SSL/TLS

1. Install Certbot for your operating system.
2. Issue and install a certificate for your domain:

   ```sh
   certbot --nginx -d silofi.example.com
   ```

## File Storage

WarehouseReceipt documents are stored locally by default with `STORAGE_DRIVER=local`. Production deployments should configure cloud storage such as S3 or Cloudflare R2.

## Upgrading

```sh
git pull
pnpm install
pnpm --filter @silofi/api ark migrate
pnpm --recursive run build
# restart API and web processes
```
