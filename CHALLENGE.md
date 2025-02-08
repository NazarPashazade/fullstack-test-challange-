# Full-Stack Developer Test Challenge

Welcome to our Full-Stack Developer test challenge! You will be implementing a User Profile feature in a React + Node.js application.

## Time Limit

You have 1.5 hours to complete this challenge. Please manage your time wisely between frontend and backend tasks.

## Prerequisites

Please ensure you have the following installed before starting:

- Node.js (v18 or higher)
- Docker and docker-compose
- Git
- npm or yarn

## User Credentials

email: `test.user@ninetwothree.co`
password: `Qwe12345`

## Project Setup

### Backend Setup (Node.js + PostgreSQL)

1. Start the PostgreSQL database:

```bash
docker compose up -d
```

2. Navigate to the `api` directory:

```bash
cd api
npm install
```

3. Configure your environment:

```bash
cp .env.example .env
# The .env file is pre-configured for the PostgreSQL docker container
```

4. Start the backend server:

```bash
npm run dev
```

### Frontend Setup (Vite + React)

1. Navigate to the `web` directory:

```bash
cd web
yarn install
```

2. Configure environment:

- Copy `.env.example` to `.env`
- Update API URL if needed

3. Start the development server:

```bash
yarn start
```

## Project Structure

### Backend (`/api`)

```
/app
/controllers      # Request handlers
/middlewares     # Auth middleware
/routes         # API routes
/services      # Business logic
/test           # Test files
```

### Frontend (`/web`)

```
/src
/components    # Reusable components
/containers   # Page components
/hooks       # Custom hooks
/services   # API services
```

## Challenge Tasks

### Backend Tasks (30-45 minutes)

1. Create a User Profile endpoint:

- Add GET `/users/profile` endpoint in `/api/app/routes/`
- Endpoint should be protected by auth middleware
- Return user information (id, email, name)
- Should have validators (optional)
- Write a basic test for the endpoint (optional)

Files to work with:

- `/api/app/routes/user.routes.ts`
- `/api/app/controllers/user.controller.ts`
- `/api/test/routes/user.routes.test.ts`

### Frontend Tasks (30-45 minutes)

1. Create a Profile page component:

- Create a new profile page component in `/web/src/containers/Profile`
- Implement profile data fetching using the API
- Display user information in a clean layout
- Handle loading and error states
- Add route to access the profile page
- Protect the route with Guard (optional)

Files to work with:

- `/web/src/containers/Profile/`
