import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema"

//this is the drizzle instance that will be used to connect
const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql , {schema});

