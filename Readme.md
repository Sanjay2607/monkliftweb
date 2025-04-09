# MonkliftBase Project Setup Guide

MonkliftBase is a Next.js project integrated with Supabase for the backend database. This guide will help you get started with development.

## Project Structure

The `monkliftbase` folder contains a Next.js application with:
- `src/app` - Main application code
- `utils` - Utility functions including Supabase client setup
- `.env` - Environment variables configuration

## Prerequisites

- Node.js installed
- Supabase CLI installed
- Docker installed (required for local Supabase)

## Local Development Setup

1. Clone the repository and navigate to the project folder:

2. Install dependencies:

```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

The development server will automatically reload whenever you make changes to the code.

## Supabase Setup and Configuration

1. Initialize Supabase in your project from the root directory:
```bash
npx supabase init
```

2. Start the local Supabase services:
```bash
npx supabase start
```

3. Create a new migration (replace `<migration_name>` with a descriptive name):
```bash
npx supabase migration new <migration_name>
```
This will create a new SQL migration file in the `supabase/migrations` directory.

4. Edit the migration file in `supabase/migrations` with your SQL schema changes.

5. Apply the migrations to your database:
```bash
npx supabase migration up
```

6. (Optional) To reset your database and reapply all migrations:
```bash
npx supabase db reset
```

Note: Make sure your `.env` file includes the necessary Supabase configuration:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project dashboard or by running:
```bash
npx supabase status
```

This section covers:
1. Initializing Supabase in the project
2. Creating and managing database migrations
3. Applying migrations to the database
4. Environment variable setup
5. How to get the necessary Supabase credentials

Would you like me to add any additional details about specific Supabase configurations or common migration patterns?




