# Polymarket Documentation — Table of Contents & Resources

> Reference for building a Polymarket dashboard. Source: [Polymarket Docs](https://docs.polymarket.com/).  
> Full index: [llms.txt](https://docs.polymarket.com/llms.txt)

---

## 1. Getting Started

| Page | Description |
|------|-------------|
| [Overview](https://docs.polymarket.com/) | Build on the world's largest prediction market — APIs, SDKs, and tools |
| [Quickstart](https://docs.polymarket.com/quickstart) | Fetch a market and place your first order |
| [Polymarket 101](https://docs.polymarket.com/polymarket-101.md) | Intro to Polymarket — the world's largest prediction market |

---

## 2. API Overview & Introduction

| Page | Description |
|------|-------------|
| [Introduction](https://docs.polymarket.com/api-reference/introduction) | Overview of the Polymarket APIs |

### API Base URLs

| API | Base URL | Purpose |
|-----|----------|---------|
| **Gamma API** | `https://gamma-api.polymarket.com` | Markets, events, tags, series, comments, sports, search, public profiles |
| **Data API** | `https://data-api.polymarket.com` | User positions, trades, activity, holder data, open interest, leaderboards, builder analytics |
| **CLOB API** | `https://clob.polymarket.com` | Orderbook, pricing, midpoints, spreads, price history; order placement/cancellation (auth required) |
| **Bridge API** | `https://bridge.polymarket.com` | Deposits and withdrawals (proxy of fun.xyz) |

- **Gamma** and **Data** APIs: public, no auth.
- **CLOB**: public endpoints for orderbook/prices; authenticated for trading.

---

## 3. Core Concepts

| Page | Description |
|------|-------------|
| [Markets & Events](https://docs.polymarket.com/concepts/markets-events.md) | Fundamental building blocks of Polymarket |
| [Positions & Tokens](https://docs.polymarket.com/concepts/positions-tokens.md) | Outcome tokens and how positions work |
| [Prices & Orderbook](https://docs.polymarket.com/concepts/prices-orderbook.md) | How prices work and peer-to-peer trading |
| [Order Lifecycle](https://docs.polymarket.com/concepts/order-lifecycle.md) | How orders flow from creation to settlement |
| [Resolution](https://docs.polymarket.com/concepts/resolution.md) | How markets are resolved and winning positions redeemed |

---

## 4. Authentication & Security

| Page | Description |
|------|-------------|
| [Authentication](https://docs.polymarket.com/api-reference/authentication.md) | How to authenticate requests to the CLOB API |
| [Geographic Restrictions](https://docs.polymarket.com/api-reference/geoblock.md) | Check geoblock before placing orders |
| [Rate Limits](https://docs.polymarket.com/api-reference/rate-limits.md) | API rate limits for all endpoints |

---

## 5. Market Data (Public)

| Page | Description |
|------|-------------|
| [Market Data Overview](https://docs.polymarket.com/market-data/overview.md) | Fetch market data with no authentication |
| [Fetching Markets](https://docs.polymarket.com/market-data/fetching-markets.md) | Strategies for discovering markets by slug, tag, or category |
| [Subgraph](https://docs.polymarket.com/market-data/subgraph.md) | Query onchain Polymarket data via GraphQL |

### Gamma API — Markets

| Endpoint / Doc | Description |
|----------------|-------------|
| [List markets](https://docs.polymarket.com/api-reference/markets/list-markets.md) | List markets with filters |
| [Get market by id](https://docs.polymarket.com/api-reference/markets/get-market-by-id.md) | Single market by ID |
| [Get market by slug](https://docs.polymarket.com/api-reference/markets/get-market-by-slug.md) | Single market by slug |
| [Get market tags by id](https://docs.polymarket.com/api-reference/markets/get-market-tags-by-id.md) | Tags for a market |
| [Get prices history](https://docs.polymarket.com/api-reference/markets/get-prices-history.md) | Historical price data |
| [Get sampling markets](https://docs.polymarket.com/api-reference/markets/get-sampling-markets.md) | Sampling markets |
| [Get sampling simplified markets](https://docs.polymarket.com/api-reference/markets/get-sampling-simplified-markets.md) | Simplified sampling markets |
| [Get simplified markets](https://docs.polymarket.com/api-reference/markets/get-simplified-markets.md) | Simplified market list |

### Gamma API — Events

| Endpoint / Doc | Description |
|----------------|-------------|
| [Get event by id](https://docs.polymarket.com/api-reference/events/get-event-by-id.md) | Event by ID |
| [Get event by slug](https://docs.polymarket.com/api-reference/events/get-event-by-slug.md) | Event by slug |
| [Get event tags](https://docs.polymarket.com/api-reference/events/get-event-tags.md) | Event tags |
| [List events](https://docs.polymarket.com/api-reference/events/list-events.md) | List events |

### Gamma API — Tags & Series

| Endpoint / Doc | Description |
|----------------|-------------|
| [List tags](https://docs.polymarket.com/api-reference/tags/list-tags.md) | List tags |
| [Get tag by id](https://docs.polymarket.com/api-reference/tags/get-tag-by-id.md) | Tag by ID |
| [Get tag by slug](https://docs.polymarket.com/api-reference/tags/get-tag-by-slug.md) | Tag by slug |
| [Get tags related to a tag id](https://docs.polymarket.com/api-reference/tags/get-tags-related-to-a-tag-id.md) | Related tags by ID |
| [Get tags related to a tag slug](https://docs.polymarket.com/api-reference/tags/get-tags-related-to-a-tag-slug.md) | Related tags by slug |
| [Get related tags (relationships) by tag id](https://docs.polymarket.com/api-reference/tags/get-related-tags-relationships-by-tag-id.md) | Tag relationships by ID |
| [Get related tags (relationships) by tag slug](https://docs.polymarket.com/api-reference/tags/get-related-tags-relationships-by-tag-slug.md) | Tag relationships by slug |
| [Get series by id](https://docs.polymarket.com/api-reference/series/get-series-by-id.md) | Series by ID |
| [List series](https://docs.polymarket.com/api-reference/series/list-series.md) | List series |

### Gamma API — Comments & Search

| Endpoint / Doc | Description |
|----------------|-------------|
| [List comments](https://docs.polymarket.com/api-reference/comments/list-comments.md) | List comments |
| [Get comments by comment id](https://docs.polymarket.com/api-reference/comments/get-comments-by-comment-id.md) | Comments by comment ID |
| [Get comments by user address](https://docs.polymarket.com/api-reference/comments/get-comments-by-user-address.md) | Comments by user |
| [Search markets, events, and profiles](https://docs.polymarket.com/api-reference/search/search-markets-events-and-profiles.md) | Search |

### Gamma API — Sports

| Endpoint / Doc | Description |
|----------------|-------------|
| [Get sports metadata information](https://docs.polymarket.com/api-reference/sports/get-sports-metadata-information.md) | Sports metadata |
| [Get valid sports market types](https://docs.polymarket.com/api-reference/sports/get-valid-sports-market-types.md) | Valid sports market types |
| [List teams](https://docs.polymarket.com/api-reference/sports/list-teams.md) | List teams |

### Gamma API — Profiles

| Endpoint / Doc | Description |
|----------------|-------------|
| [Get public profile by wallet address](https://docs.polymarket.com/api-reference/profiles/get-public-profile-by-wallet-address.md) | Public profile by wallet |

---

## 6. CLOB API — Market Data (Prices, Orderbook)

| Endpoint / Doc | Description |
|----------------|-------------|
| [Get order book](https://docs.polymarket.com/api-reference/market-data/get-order-book.md) | Order book summary for a token ID |
| [Get order books (request body)](https://docs.polymarket.com/api-reference/market-data/get-order-books-request-body.md) | Multiple order books |
| [Get midpoint price](https://docs.polymarket.com/api-reference/data/get-midpoint-price.md) | Midpoint for a token ID |
| [Get midpoint prices (query)](https://docs.polymarket.com/api-reference/market-data/get-midpoint-prices-query-parameters.md) | Multiple midpoints (query) |
| [Get midpoint prices (body)](https://docs.polymarket.com/api-reference/market-data/get-midpoint-prices-request-body.md) | Multiple midpoints (body) |
| [Get market price](https://docs.polymarket.com/api-reference/market-data/get-market-price.md) | Best bid/ask for token and side |
| [Get market prices (query)](https://docs.polymarket.com/api-reference/market-data/get-market-prices-query-parameters.md) | Multiple market prices (query) |
| [Get market prices (body)](https://docs.polymarket.com/api-reference/market-data/get-market-prices-request-body.md) | Multiple market prices (body) |
| [Get last trade price](https://docs.polymarket.com/api-reference/market-data/get-last-trade-price.md) | Last trade price/side for token |
| [Get last trade prices (query)](https://docs.polymarket.com/api-reference/market-data/get-last-trade-prices-query-parameters.md) | Last trade prices (query, max 500 tokens) |
| [Get last trade prices (body)](https://docs.polymarket.com/api-reference/market-data/get-last-trade-prices-request-body.md) | Last trade prices (body, max 500 tokens) |
| [Get spread](https://docs.polymarket.com/api-reference/market-data/get-spread.md) | Spread for a token ID |
| [Get spreads](https://docs.polymarket.com/api-reference/market-data/get-spreads.md) | Spreads for multiple tokens |
| [Get tick size](https://docs.polymarket.com/api-reference/market-data/get-tick-size.md) | Minimum tick size for token |
| [Get tick size by path parameter](https://docs.polymarket.com/api-reference/market-data/get-tick-size-by-path-parameter.md) | Tick size (path param) |
| [Get fee rate](https://docs.polymarket.com/api-reference/market-data/get-fee-rate.md) | Base fee rate for token |
| [Get fee rate by path parameter](https://docs.polymarket.com/api-reference/market-data/get-fee-rate-by-path-parameter.md) | Fee rate (path param) |
| [Get server time](https://docs.polymarket.com/api-reference/data/get-server-time.md) | Server Unix timestamp |

---

## 7. Data API — User & Core Data

| Endpoint / Doc | Description |
|----------------|-------------|
| [Get current positions for a user](https://docs.polymarket.com/api-reference/core/get-current-positions-for-a-user.md) | User's current positions |
| [Get closed positions for a user](https://docs.polymarket.com/api-reference/core/get-closed-positions-for-a-user.md) | User's closed positions |
| [Get positions for a market](https://docs.polymarket.com/api-reference/core/get-positions-for-a-market.md) | Positions in a market |
| [Get total value of a user's positions](https://docs.polymarket.com/api-reference/core/get-total-value-of-a-users-positions.md) | Total position value |
| [Get top holders for markets](https://docs.polymarket.com/api-reference/core/get-top-holders-for-markets.md) | Top holders per market |
| [Get trades for a user or markets](https://docs.polymarket.com/api-reference/core/get-trades-for-a-user-or-markets.md) | Trades by user or market |
| [Get user activity](https://docs.polymarket.com/api-reference/core/get-user-activity.md) | User activity |
| [Get trader leaderboard rankings](https://docs.polymarket.com/api-reference/core/get-trader-leaderboard-rankings.md) | Trader leaderboard |

### Data API — Misc

| Endpoint / Doc | Description |
|----------------|-------------|
| [Get open interest](https://docs.polymarket.com/api-reference/misc/get-open-interest.md) | Open interest |
| [Get live volume for an event](https://docs.polymarket.com/api-reference/misc/get-live-volume-for-an-event.md) | Live volume for event |
| [Get total markets a user has traded](https://docs.polymarket.com/api-reference/misc/get-total-markets-a-user-has-traded.md) | Markets traded by user |
| [Download an accounting snapshot (ZIP of CSVs)](https://docs.polymarket.com/api-reference/misc/download-an-accounting-snapshot-zip-of-csvs.md) | Accounting snapshot |

### Data API — Builders & Rebates

| Endpoint / Doc | Description |
|----------------|-------------|
| [Get aggregated builder leaderboard](https://docs.polymarket.com/api-reference/builders/get-aggregated-builder-leaderboard.md) | Builder leaderboard |
| [Get daily builder volume time-series](https://docs.polymarket.com/api-reference/builders/get-daily-builder-volume-time-series.md) | Builder volume time-series |
| [Get current rebated fees for a maker](https://docs.polymarket.com/api-reference/rebates/get-current-rebated-fees-for-a-maker.md) | Maker rebated fees |

---

## 8. CLOB API — Trading (Authenticated)

| Endpoint / Doc | Description |
|----------------|-------------|
| [Post a new order](https://docs.polymarket.com/api-reference/trade/post-a-new-order.md) | Create a new order |
| [Post multiple orders](https://docs.polymarket.com/api-reference/trade/post-multiple-orders.md) | Create up to 15 orders |
| [Cancel single order](https://docs.polymarket.com/api-reference/trade/cancel-single-order.md) | Cancel by order ID |
| [Cancel multiple orders](https://docs.polymarket.com/api-reference/trade/cancel-multiple-orders.md) | Cancel by IDs (max 3000) |
| [Cancel orders for a market](https://docs.polymarket.com/api-reference/trade/cancel-orders-for-a-market.md) | Cancel all user orders in a market |
| [Cancel all orders](https://docs.polymarket.com/api-reference/trade/cancel-all-orders.md) | Cancel all open orders |
| [Get user orders](https://docs.polymarket.com/api-reference/trade/get-user-orders.md) | Open orders (paginated) |
| [Get single order by ID](https://docs.polymarket.com/api-reference/trade/get-single-order-by-id.md) | Order by ID |
| [Get trades](https://docs.polymarket.com/api-reference/trade/get-trades.md) | User trades (paginated) |
| [Get builder trades](https://docs.polymarket.com/api-reference/trade/get-builder-trades.md) | Builder-originated trades |
| [Get order scoring status](https://docs.polymarket.com/api-reference/trade/get-order-scoring-status.md) | Whether order is scoring for rewards |
| [Send heartbeat](https://docs.polymarket.com/api-reference/trade/send-heartbeat.md) | Keep session alive (avoid auto-cancel) |

---

## 9. Bridge API

| Endpoint / Doc | Description |
|----------------|-------------|
| [Create deposit addresses](https://docs.polymarket.com/api-reference/bridge/create-deposit-addresses.md) | Create deposit addresses |
| [Create withdrawal addresses](https://docs.polymarket.com/api-reference/bridge/create-withdrawal-addresses.md) | Create withdrawal addresses |
| [Get a quote](https://docs.polymarket.com/api-reference/bridge/get-a-quote.md) | Quote for bridge |
| [Get supported assets](https://docs.polymarket.com/api-reference/bridge/get-supported-assets.md) | Supported assets |
| [Get transaction status](https://docs.polymarket.com/api-reference/bridge/get-transaction-status.md) | Bridge transaction status |

---

## 10. WebSockets (Real-Time)

| Page | Description |
|------|-------------|
| [WebSocket Overview](https://docs.polymarket.com/market-data/websocket/overview.md) | Real-time market data and trading updates |
| [Market Channel](https://docs.polymarket.com/market-data/websocket/market-channel.md) | Orderbook, price, and trade updates |
| [User Channel](https://docs.polymarket.com/market-data/websocket/user-channel.md) | Authenticated order and trade updates |
| [Real-Time Data Socket](https://docs.polymarket.com/market-data/websocket/rtds.md) | Comments and crypto prices |
| [Sports WebSocket](https://docs.polymarket.com/market-data/websocket/sports.md) | Live sports scores and game state |

API Reference WSS docs: [Market](https://docs.polymarket.com/api-reference/wss/market.md) · [Sports](https://docs.polymarket.com/api-reference/wss/sports.md) · [User](https://docs.polymarket.com/api-reference/wss/user.md)

---

## 11. Clients & SDKs

| Page | Description |
|------|-------------|
| [Clients & SDKs](https://docs.polymarket.com/developers/CLOB/clients/methods-overview) | Official TypeScript, Python, Rust libraries |

### Official SDKs

| Language | Package | Repo |
|----------|---------|------|
| TypeScript | `@polymarket/clob-client` | [Polymarket/clob-client](https://github.com/Polymarket/clob-client) |
| Python | `py-clob-client` | [Polymarket/py-clob-client](https://github.com/Polymarket/py-clob-client) |
| Rust | `polymarket-client-sdk` | [Polymarket/rs-clob-client](https://github.com/Polymarket/rs-clob-client) |

### Client method categories

| Doc | Description |
|-----|-------------|
| [Public Methods](https://docs.polymarket.com/trading/clients/public.md) | No signer/creds — market data, prices, order book |
| [L1 Methods](https://docs.polymarket.com/trading/clients/l1.md) | Wallet signer, no API creds — setup |
| [L2 Methods](https://docs.polymarket.com/trading/clients/l2.md) | API credentials — place/cancel orders, manage positions |
| [Builder Methods](https://docs.polymarket.com/trading/clients/builder.md) | Builder API — query orders/trades with attribution |

---

## 12. Trading Guides

| Page | Description |
|------|-------------|
| [Trading Overview](https://docs.polymarket.com/trading/overview.md) | Trading on the Polymarket CLOB |
| [Trading Quickstart](https://docs.polymarket.com/trading/quickstart.md) | Place your first order |
| [Orderbook](https://docs.polymarket.com/trading/orderbook.md) | Reading orderbook, prices, spreads, midpoints |
| [Fees](https://docs.polymarket.com/trading/fees.md) | Trading fees |
| [Matching Engine Restarts](https://docs.polymarket.com/trading/matching-engine.md) | Restart schedule and handling downtime |

### Orders

| Page | Description |
|------|-------------|
| [Orders Overview](https://docs.polymarket.com/trading/orders/overview.md) | Order types, tick sizes, querying |
| [Create Order](https://docs.polymarket.com/trading/orders/create.md) | Build, sign, submit orders |
| [Cancel Order](https://docs.polymarket.com/trading/orders/cancel.md) | Cancel single, multiple, or all |
| [Order Attribution](https://docs.polymarket.com/trading/orders/attribution.md) | Attribute orders to builder key |

### CTF & Bridge

| Page | Description |
|------|-------------|
| [Conditional Token Framework](https://docs.polymarket.com/trading/ctf/overview.md) | Onchain token mechanics |
| [Split Tokens](https://docs.polymarket.com/trading/ctf/split.md) | USDC.e → outcome token pairs |
| [Merge Tokens](https://docs.polymarket.com/trading/ctf/merge.md) | Outcome token pairs → USDC.e |
| [Redeem Tokens](https://docs.polymarket.com/trading/ctf/redeem.md) | Winning tokens → USDC.e after resolution |
| [Deposit](https://docs.polymarket.com/trading/bridge/deposit.md) | Bridge in to fund account |
| [Withdraw](https://docs.polymarket.com/trading/bridge/withdraw.md) | Bridge USDC.e out |
| [Quote](https://docs.polymarket.com/trading/bridge/quote.md) | Fees and output preview |
| [Deposit Status](https://docs.polymarket.com/trading/bridge/status.md) | Track bridge deposits |
| [Supported Assets](https://docs.polymarket.com/trading/bridge/supported-assets.md) | Chains/tokens for deposits |
| [Gasless Transactions](https://docs.polymarket.com/trading/gasless.md) | Execute without gas (relayer) |

---

## 13. Advanced & Market Making

| Page | Description |
|------|-------------|
| [Negative Risk Markets](https://docs.polymarket.com/advanced/neg-risk.md) | Capital-efficient multi-outcome trading |

### Market Makers

| Page | Description |
|------|-------------|
| [Market Makers Overview](https://docs.polymarket.com/market-makers/overview.md) | Market making on Polymarket |
| [Getting Started](https://docs.polymarket.com/market-makers/getting-started.md) | One-time setup |
| [Trading](https://docs.polymarket.com/market-makers/trading.md) | Order entry and best practices |
| [Inventory Management](https://docs.polymarket.com/market-makers/inventory.md) | Outcome token inventory |
| [Liquidity Rewards](https://docs.polymarket.com/market-makers/liquidity-rewards.md) | Rewards for liquidity |
| [Maker Rebates Program](https://docs.polymarket.com/market-makers/maker-rebates.md) | Daily USDC rebates |

---

## 14. Builder Program

| Page | Description |
|------|-------------|
| [Builder Program](https://docs.polymarket.com/builders/overview.md) | Build apps that route orders through Polymarket |
| [API Keys](https://docs.polymarket.com/builders/api-keys.md) | Create and manage Builder API credentials |
| [Tiers](https://docs.polymarket.com/builders/tiers.md) | Rate limits, rewards, upgrades |

Builder SDKs: [TypeScript](https://github.com/Polymarket/builder-signing-sdk) · [Python](https://github.com/Polymarket/py-builder-signing-sdk)  
Relayer (gasless): [TypeScript](https://github.com/Polymarket/builder-relayer-client) · [Python](https://github.com/Polymarket/py-builder-relayer-client)

---

## 15. Resources (Reference)

| Page | Description |
|------|-------------|
| [Contract Addresses](https://docs.polymarket.com/resources/contract-addresses.md) | Polymarket smart contract addresses on Polygon |
| [Error Codes](https://docs.polymarket.com/resources/error-codes.md) | CLOB API error responses |
| [Blockchain Data Resources](https://docs.polymarket.com/resources/blockchain-data.md) | On-chain activity for data & analytics |

---

## 16. OpenAPI Specs (for codegen / dashboard)

| Spec | URL |
|------|-----|
| CLOB | [clob-openapi.yaml](https://docs.polymarket.com/api-spec/clob-openapi.yaml) |
| Gamma | [gamma-openapi.yaml](https://docs.polymarket.com/api-spec/gamma-openapi.yaml) |
| Data | [data-openapi.yaml](https://docs.polymarket.com/api-spec/data-openapi.yaml) |
| Bridge | [bridge-openapi.yaml](https://docs.polymarket.com/api-spec/bridge-openapi.yaml) |
| CLOB subset | [clob-subset-openapi.yaml](https://docs.polymarket.com/api-reference/clob-subset-openapi.yaml) |

---

## 17. AsyncAPI Specs (WebSockets)

| Spec | URL |
|------|-----|
| Main | [asyncapi.json](https://docs.polymarket.com/asyncapi.json) |
| User channel | [asyncapi-user.json](https://docs.polymarket.com/asyncapi-user.json) |
| Sports | [asyncapi-sports.json](https://docs.polymarket.com/asyncapi-sports.json) |

---

## Quick links for dashboard development

- **List active markets (no auth):** `GET https://gamma-api.polymarket.com/markets?active=true&closed=false&limit=100`
- **Market by slug:** `GET https://gamma-api.polymarket.com/markets?slug=<slug>`
- **Order book (CLOB):** CLOB API order book endpoints (see §6)
- **Prices history:** [Get prices history](https://docs.polymarket.com/api-reference/markets/get-prices-history.md)
- **Positions / trades:** Data API core endpoints (see §7)
- **Docs index (full list):** [llms.txt](https://docs.polymarket.com/llms.txt)
