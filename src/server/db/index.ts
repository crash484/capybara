import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from "@neondatabase/serverless";

//this is the drizzle instance that will be used to connect
const sql = (() => {
	const url = process.env.DATABASE_URL;
	if (!url) {
		throw new Error('DATABASE_URL environment variable is not set.');
	}
	return neon(url);
})();

export const db = drizzle(sql);

