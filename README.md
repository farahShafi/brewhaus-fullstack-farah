# BrewHaus

A fullstack brewery browser app. Login with oAuth (auth0). Browse breweries from the public [Open Brewery DB](https://www.openbrewerydb.org/) or from a local internal API backed by a SQLite database.

## Project Structure

```
brewhaus-fullstack-farah/
├── backend/    # Node.js + Express + SQLite API
└── frontend/   # Vue 3 + Vite + Pinia SPA
```

## Features

- login with auth0
- Browse breweries with infinite scroll on login
- Search breweries by name
- Toggle between public API and internal API via navbar dropdown
- View brewery details page
- Source selection persists across page refreshes

## Getting Started Setup




### Prerequisites

- Node.js v18+

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
cd backend
npm install

// create a env file and login in auth0

Copy the env file:

cp .env.example .env

Add your Auth0 credentials:

Go to Auth0 Dashboard

Create a new Application

Copy:

Domain → AUTH_DOMAIN

Client ID → CLIENT_ID

Client Secret → CLIENT_SECRET

Run the app:

npm run dev
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

Copy the env file:

cp .env.example .env

Add your Auth0 credentials:

Go to Auth0 Dashboard

Create a new Application

Copy:

Domain → AUTH_DOMAIN

Client ID → CLIENT_ID

Client Secret → CLIENT_SECRET

Run the app:

npm run dev
```

App runs at `http://localhost:5173`

### Authentication flow
1. User Login (Frontend → Auth Provider)

User clicks Login

Frontend redirects user to the authorization server (e.g. Auth0)

GET /authorize
  ?client_id=CLIENT_ID
  &redirect_uri=http://localhost:5173/callback
  &response_type=code
  &code_challenge=XYZ

User authenticates (username/password, social login, etc.)

Auth server redirects back with an authorization code

http://localhost:5173/callback?code=AUTH_CODE

2. Token Exchange (Frontend → Backend)

Frontend sends the authorization code to backend:

POST /auth/token
{
  "code": "AUTH_CODE",
  "code_verifier": "XYZ"
}

3. Backend Exchanges Code for Token

Backend calls auth provider:

POST https://AUTH_DOMAIN/oauth/token

Request:

{
  "grant_type": "authorization_code",
  "client_id": "CLIENT_ID",
  "client_secret": "CLIENT_SECRET",
  "code": "AUTH_CODE",
  "redirect_uri": "http://localhost:5173/callback",
  "code_verifier": "XYZ"
}

Response:

{
  "access_token": "JWT_TOKEN",
  "id_token": "ID_TOKEN",
  "expires_in": 86400
}

4. Backend → Frontend

Backend sends token back:

{
  "access_token": "JWT_TOKEN"
}

5. Frontend Stores Token
localStorage.setItem("token", data.access_token);
authStore.setAuth(true);

Token stored in localStorage (persistence)

isLoggedIn = true in Pinia (reactivity)

6. Authenticated API Requests

Frontend sends token with each request:

Authorization: Bearer JWT_TOKEN

Example:

fetch('/api/breweries', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

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
