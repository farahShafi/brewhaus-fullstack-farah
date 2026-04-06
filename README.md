# BrewHaus

A fullstack brewery browser app. Browse breweries from a local internal API backed by a SQLite database or from the public [Open Brewery DB](https://www.openbrewerydb.org/). 
It is a brewery management dashboard with real-time updates and data visualization.
When fetching data from internal node backend, you can edit a brewery's name and type, and see realtime socket events updates. Also see data visualiztion in dashboard.
When fetching data from external source (https://www.openbrewerydb.org/), cannot edit brewery and no data visualization is available.

## Project Structure

```
brewhaus-fullstack-farah/
├── backend/    # Node.js + Express + SQLite API + Redis + socket.io
└── frontend/   # Vue 3 + Vite + Pinia SPA + chart.js
```

## Features

- Browse breweries with infinite scroll
- Search breweries by name
- Toggle between public API and internal API via navbar dropdown
- View brewery details page
- Source selection persists across page refreshes

## Getting Started

### Prerequisites

- Node.js v18+
- Redis

if Redis in not running on local you have to install it via below commands 
brew install redis
brew services start redis
---

### Backend

```bash
cd backend
npm install
```

The database is already seeded with 201 breweries. To reseed:

```bash
npm run seed
```

Start the server:

```bash
npm start          # production
npm run dev        # auto-restart on file changes
```

Server runs at `http://localhost:3000`

#### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/breweries` | List breweries (supports `page`, `limit`, `search` query params) |
| GET | `/api/breweries/:id` | Get a single brewery by ID |

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`

#### Switching Data Source

Use the dropdown in the navbar to switch between:
- **Public Breweries** — fetches from `https://api.openbrewerydb.org`
- **Internal Breweries** — fetches from your local backend at `http://localhost:3000`

> Both the backend and frontend must be running to use the internal source.

> **Note:** The Public Breweries source calls the Open Brewery DB API directly from the browser. This third-party API occasionally returns CORS errors (especially during search), which is outside our control. If this happens, switching to **Internal Breweries** is a reliable alternative.

### Run as iOS app

```bash
cd frontend
npm install
npm run build
npx cap sync
npx cap open ios
```
