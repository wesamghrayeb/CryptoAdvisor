# Crypto Investor Dashboard

A full-stack crypto dashboard built as a home assignment.
The app allows users to register, log in, and view daily crypto market content in a clean and responsive dashboard.

The project focuses on authentication, protected routes, external API integration, clean architecture, and deployable code.

## Live Demo

| Service  | URL                             |
| -------- | ------------------------------- |
| Frontend | `https://app.vercel.app`   |
| Backend  | `https://onrender.com` |

Replace these URLs after deployment.

## Features

* User registration and login
* JWT authentication
* Password hashing with bcrypt
* Protected dashboard routes
* Live crypto prices from CoinGecko
* Crypto market news from NewsData.io
* Random meme from Imgflip
* Dashboard refresh button
* Loading and error states
* MongoDB persistence
* Dashboard refresh logging

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs

### External APIs

* CoinGecko — crypto prices
* NewsData.io — crypto news
* Imgflip — random memes

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

## Project Structure

```bash
crypto-investor-dashboard/
├── client/          # React frontend
├── server/          # Express backend
├── README.md
├── AI_USAGE.md
└── .gitignore
```

## How It Works

After a user registers or logs in, the backend returns a JWT token.
The frontend stores the token and sends it with protected API requests.

When the user opens the dashboard, the backend verifies the token, fetches crypto prices, news, and a meme from external APIs, then returns a single dashboard response to the frontend.

Each dashboard refresh can also be logged in MongoDB using the `DashboardLog` model.

## API Routes

| Method | Route                | Protected | Description             |
| ------ | -------------------- | --------- | ----------------------- |
| POST   | `/api/auth/register` | No        | Register a new user     |
| POST   | `/api/auth/login`    | No        | Log in a user           |
| GET    | `/api/auth/me`       | Yes       | Get current user        |
| GET    | `/api/dashboard`     | Yes       | Get full dashboard data |
| GET    | `/api/crypto/prices` | Yes       | Get crypto prices       |
| GET    | `/api/crypto/news`   | Yes       | Get crypto news         |
| GET    | `/api/meme`          | Yes       | Get random meme         |
| GET    | `/api/health`        | No        | Backend health check    |

## Environment Variables

### Server

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/crypto-dashboard
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NEWSDATA_API_KEY=
```

### Client

Create a `.env` file inside the `client` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

## Run Locally

### 1. Install backend dependencies

```bash
cd server
npm install
```

### 2. Install frontend dependencies

```bash
cd ../client
npm install
```

### 3. Start the backend

```bash
cd server
npm run dev
```

### 4. Start the frontend

```bash
cd client
npm run dev
```

Open:

```bash
http://localhost:5173
```

## Test User

You can register a new account from the Register page.

Example test credentials:

```txt
Email: investor@test.com
Password: test123456
```

## Database

The project uses MongoDB Atlas.

Main collections:

* `users`
* `dashboardlogs`

The `users` collection stores registered users with hashed passwords.
The `dashboardlogs` collection stores dashboard refresh activity.

Database access can be provided privately with a read-only MongoDB Atlas user if required.

## Deployment

### Backend — Render

1. Create a new Web Service on Render.
2. Set the root directory to `server`.
3. Build command:

```bash
npm install
```

4. Start command:

```bash
npm start
```

5. Add the required environment variables.
6. Set `CLIENT_URL` to the deployed Vercel frontend URL.

### Frontend — Vercel

1. Import the GitHub repository into Vercel.
2. Set the root directory to `client`.
3. Add:

```env
VITE_API_URL=https://your-render-api.onrender.com/api
```

4. Deploy.

## Architecture Decisions

* The project is split into `client` and `server` folders for clear separation.
* The backend handles authentication, API calls, database logic, and protected routes.
* The frontend handles routing, authentication state, and dashboard UI.
* External API logic is placed inside backend service files.
* The dashboard uses one main endpoint, `/api/dashboard`, to keep the frontend simple.
* JWT is used for authentication in this assignment scope.
* MongoDB stores users and dashboard refresh logs.

## Error Handling

The app includes loading and error states for a better user experience.
If an external API fails, the app should avoid crashing and show a clear message or fallback state.

For production, market-related data should ideally show an honest error state instead of static data that may look real.

## Known Limitations

* JWT is stored in `localStorage` for simplicity.
* There is no email verification.
* There is no password reset flow.
* Free API tiers may have rate limits.
* No automated tests are included in this assignment version.
* For a production app, authentication and security should be hardened further.

## AI Usage

AI tools were used to help plan the project structure, improve code organization, review implementation ideas, and prepare documentation.

The final implementation, testing, debugging, and deployment setup were reviewed manually.

