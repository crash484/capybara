import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/server/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    // Validate at runtime instead of using a non-null assertion so TypeScript
    // won't complain and we get a clear error when the env var is missing.
    url: (() => {
      const url = process.env.DATABASE_URL;
      if (!url) {
        throw new Error('DATABASE_URL environment variable is not set.');
      }
      return url;
    })(),
  },
});
