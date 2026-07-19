# RNLabs

A lab management system API being built for a fullstack app, with Node.js, Express.js, and Firebase.

## Getting started

### Requirements

- Node.js 18+ (or compatible)
- pnpm

### Install dependencies

```bash
pnpm install
```

### Environment

Create a `.env` file with the following values:

```env
PORT=8080
ENCRYPTION_KEY=your-encryption-key
FIREBASE_SERVICE_ACCOUNT={...}
```

- `PORT` - HTTP port for the server
- `ENCRYPTION_KEY` - app encryption key if used by services
- `FIREBASE_SERVICE_ACCOUNT` - Firebase service account JSON as a single-line string

### Run the server

```bash
pnpm dev
```

Or:

```bash
pnpm start
```

## Note

- This project is in it's early development stage.
