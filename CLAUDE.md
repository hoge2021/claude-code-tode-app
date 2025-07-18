# Todo App Project

Simple todo application with modern web stack.

## Tech Stack

- **Frontend**: React Router v7, TypeScript
- **Database**: Cloudflare D1 (SQLite)
- **Runtime**: Cloudflare Workers
- **Testing**: Vitest (unit), Playwright (e2e)
- **Build**: Vite
- **Deploy**: Cloudflare Pages

## Project Structure

```
src/
├── routes/          # React Router v7 routes
├── components/      # Reusable UI components
├── db/             # D1 database schemas and migrations
├── api/            # Cloudflare Workers API endpoints
└── lib/            # Shared utilities
```

## Key Commands

- `npm run dev` - Start local development
- `npm run test` - Run Vitest tests
- `npm run e2e` - Run Playwright tests
- `npm run deploy` - Deploy to Cloudflare
- `npm run db:migrate` - Run D1 migrations
- `npm run lint` - Run lint with the following command after major edits

## Development Rules

- Use server functions for database operations
- Keep components pure and testable
- Write tests for critical paths
- Use TypeScript strict mode
- Follow React Router v7 conventions

## Database Schema

```sql
CREATE TABLE todos (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Cloudflare Configuration

- D1 database binding: `DB`
- Environment: production uses `wrangler.toml`
- Local dev uses miniflare

## Testing Strategy

- Unit tests for business logic
- Integration tests for API routes
- E2E tests for user flows
- Use MSW for API mocking in tests

## Error Handling

- Use React Router error boundaries
- Log errors to console in dev
- Return proper HTTP status codes
- Show user-friendly error messages