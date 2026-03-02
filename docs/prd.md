# Polymarket Whale Dashboard — PRD

## What it is
A dark, luxurious Polymarket dashboard for power users who want to browse prediction markets, track whale activity overlaid on price charts, and copy-trade with precision.

---

## Problem
Polymarket's native UI buries the signal. Whale moves — the bets that actually move prices — are invisible in the noise. Copy traders have no way to see *when* a whale entered relative to price action, making it impossible to time a follow.

---

## Solution
A read-first, analysis-first dashboard that connects to Polymarket's public APIs and surfaces what matters: whale bets as visual annotations on price charts, organized markets browseable by topic/category, and a clean filtering system to find edges fast.

---

## Target Users
- Active Polymarket traders who copy-trade whales
- Market researchers watching prediction markets for signal
- Degens who want Bloomberg terminal aesthetics without Bloomberg prices

---

## Core Features / Scope

### IN SCOPE

#### 1. Market Browser
- Landing view: grid/list of active markets, grouped by **topic** (Politics, Crypto, Sports, Science, Culture, etc.)
- Each market card shows: title, current YES/NO price, volume, liquidity, end date, price trend sparkline
- **Filters panel** (shadcn `Sheet` sidebar):
  - Topic/category multi-select
  - Volume range slider
  - Liquidity range slider
  - End date range picker
  - "Has Whale Activity" toggle
  - Sort: Volume, Newest, Most Contested (price near 50), Whale Bets Count
- Search bar with instant fuzzy match across market titles
- Saved filter presets stored in localStorage

#### 2. Market Detail View — The Core Experience
Triggered by clicking any market card. Full-page view with:

**Left column — Chart (60% width):**
- Price history chart (YES token price over time, 0–1 scale / 0–100%)
- X-axis: time. Y-axis: implied probability
- Whale bet annotations: vertical dotted lines on the chart at the exact timestamp of each significant bet
- Hovering a whale annotation shows a tooltip: wallet address (shortened), bet size in USD, direction (YES/NO), time since bet
- Annotation color: gold for YES bets, crimson for NO bets
- Zoom controls: 1D / 1W / 1M / All
- Volume bars rendered below the price line

**Right column — Whale Feed (40% width):**
- Chronological feed of large bets on this market
- Each entry: wallet avatar (generated from address), shortened address, bet size, direction badge, timestamp, "Copy Trade" button (links to Polymarket order page)
- Threshold for "whale" = configurable by user (default: $1,000+)
- Clicking a whale entry highlights its annotation on the chart (chart scrolls/zooms to that timestamp)

**Below chart — Market Info Panel:**
- Description, resolution criteria, end date
- Order book snapshot (current best YES/NO prices)
- Total volume, total liquidity, number of traders

#### 3. Whale Leaderboard (Global)
- Separate page: top wallets by total profit, total volume, win rate
- Clicking a whale opens a **Whale Profile** drawer: all their recent bets, PnL over time, market history
- Follow toggle (saved in localStorage) — followed whales get highlighted in market feeds

#### 4. Followed Whales Feed
- Dedicated feed page: reverse-chronological list of all bets placed by followed wallets across all markets
- Acts as a live copy-trade signal stream

---

## User Flow

```
Landing → Market Browser
             │
             ├─ Filter/Search → Refined Market List
             │
             └─ Click Market Card → Market Detail View
                                        │
                                        ├─ Chart with whale annotations
                                        ├─ Click annotation → highlight whale in feed
                                        ├─ Click whale entry → zoom chart to timestamp
                                        └─ Click "Copy Trade" → Polymarket deep link

Whale Leaderboard → Click wallet → Whale Profile Drawer
                                        └─ Follow wallet → appears in Followed Feed

Followed Whales Feed → Click entry → Market Detail View (pre-scrolled to that bet)
```

---

## API Connections

### Polymarket Gamma API (Market Data)
- **Base:** `https://gamma-api.polymarket.com`
- `GET /markets` — paginated market list with filters (category, active, volume)
- `GET /markets/{id}` — single market detail
- `GET /markets/{id}/history` — price history for charting
- Used for: Market browser, detail view metadata, price chart data

### Polymarket CLOB API (Order Book + Trades)
- **Base:** `https://clob.polymarket.com`
- `GET /trades` — trade history, filterable by market and size
- `GET /order-book` — current order book
- Used for: Whale detection (filter trades by size), chart annotations, whale feed

### Polymarket Data API / Subgraph (On-chain history)
- Fallback for historical trade data if CLOB API doesn't have sufficient depth
- `GET /activity` — wallet-level activity
- Used for: Whale profiles, leaderboard construction

### No auth required — all public endpoints.

> **Polling strategy:** Market list refreshes every 60s. Active market detail view polls trade feed every 15s to catch new whale entries in near-real-time. Price history is fetched once on load + appended on new trades.

---

## UI Components (shadcn + custom)

| Component | shadcn Base | Usage |
|---|---|---|
| Market Card | `Card` | Grid item in browser |
| Filters Sidebar | `Sheet` | Slide-in filter panel |
| Search | `Command` | Fuzzy market search |
| Whale Feed Entry | `Card` + `Badge` | Per-bet list item |
| Whale Annotation Tooltip | `Tooltip` | Chart overlay |
| Whale Profile | `Drawer` | Slide-up wallet profile |
| Market Info Tabs | `Tabs` | Description / Orders / Stats |
| Whale Threshold Input | `Slider` | User-configurable whale cutoff |
| Filter Presets | `DropdownMenu` | Save/load filter combos |
| Follow Toggle | `Switch` | Inside whale profile |
| Copy Trade CTA | `Button` variant=outline | Links to Polymarket |
| Sort Control | `Select` | Market list sort |
| Date Range | `Popover` + `Calendar` | Filter by end date |
| Sparklines | Recharts `LineChart` | Card-level mini chart |
| Main Price Chart | Recharts `ComposedChart` | Full detail view chart |

### Visual Design System
- **Background:** Near-black `#0a0a0f` with subtle grain texture
- **Surface:** Dark charcoal `#111118` cards with `1px` border in `#1e1e2e`
- **Accent gold:** `#c9a84c` — whale YES bets, highlights, active states
- **Accent crimson:** `#c94c4c` — whale NO bets, negative PnL
- **Accent teal:** `#4cc9a8` — positive PnL, sparkline up
- **Typography:** `Inter` for UI, `JetBrains Mono` for numbers and addresses
- **Glow effects:** Subtle `box-shadow` glow on whale annotation lines and active cards
- Recharts configured with transparent backgrounds, custom `dot` components for whale annotations rendered as vertical reference lines via `ReferenceLine`

---

## Chart Whale Annotation Implementation

Whale bets are rendered as `<ReferenceLine>` components on the Recharts chart:

```
Each trade above threshold → ReferenceLine at x={timestamp} 
  stroke: gold (YES) or crimson (NO)
  strokeDasharray: "3 3"
  label: custom component showing bet size on hover
```

On click: chart viewport zooms to ±6h window around that timestamp (controlled via chart domain state).

---

## Open Questions / Next Steps

- **TradingView Feasibility:** TradingView's Lightweight Charts library (`lightweight-charts` npm package) is free, open-source, and would give a more professional charting feel than Recharts. It supports custom markers natively — ideal for whale annotations. Worth spiking as the chart layer instead of Recharts. No licensing issues for personal/internal use.
- **Whale definition:** Is $1,000 the right default threshold? Should it be relative to market liquidity?
- **Real-time:** Polymarket has a WebSocket feed — worth integrating for live whale alerts rather than polling
- **Wallet labels:** Are there known labeled wallets (Cobie, Nate Silver, etc.) worth hardcoding into a registry for "influencer" tagging?

---

## Assumptions Made
- All required data is accessible via Polymarket's public REST APIs without authentication
- App is personal/internal use only — no multi-user backend needed
- No trading execution in-app; "Copy Trade" is always a deep link to Polymarket's own UI
- localStorage is sufficient for persisting follows and filter presets (no database)
- Recharts is the default charting library; TradingView Lightweight Charts is flagged as a better alternative worth evaluating