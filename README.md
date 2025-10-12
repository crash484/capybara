# KapYbara

A small Next.js app using Drizzle ORM and PostgreSQL.

## Setup — how to run locally

1. Install dependencies

	```bash
	pnpm install
	```

2. Create a .env file

	Copy the example (if you have one) or create a `.env` at the project root with at least:

	```env
	DATABASE_URL=...
	```

	Ensure your Postgres server is running and the database exists.

3. Run migrations / generate drizzle files (if using drizzle-kit)

	```bash
	npx drizzle-kit generate
	# or whatever drizzle-kit command you use for migrations
	```

4. Start the dev server

	```bash
	pnpm dev
	```

5. Build and start for production

	```bash
	pnpm build
	pnpm start
	```

Notes:
- If you use Docker or another local DB helper, adapt `DATABASE_URL` accordingly.
- The project expects `DATABASE_URL` to be set at runtime. If it's missing the app will fail early with a clear message.

## Tech stack used

- Next.js 15 (app directory)
- React 19
- TypeScript 5
- Drizzle ORM + drizzle-kit
- PostgreSQL (pg)
- Tailwind CSS
- Biome (linter/formatter)
- dotenv for local env variables

## Troubleshooting

- TypeScript complains about `process.env.DATABASE_URL` possibly being `undefined`: ensure your `.env` file is present and `DATABASE_URL` is set, or add a runtime check in `drizzle.config.ts` and other places that read the env var.
