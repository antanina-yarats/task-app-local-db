import { load } from "https://deno.land/std/dotenv/mod.ts";
import postgres from "https://deno.land/x/postgresjs@v3.4.2/mod.js";

// Load environment variables from the .env file
const env = await load({ envPath: "/home/antanina/Desktop/Fullstack/task-app/project.env" });

console.log("POSTGRES_USER:", env.POSTGRES_USER);
console.log("POSTGRES_PASSWORD:", env.POSTGRES_PASSWORD);
console.log("POSTGRES_DB:", env.POSTGRES_DB);
console.log("POSTGRES_HOST:", env.POSTGRES_HOST);

const sql = postgres({
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  hostname: env.POSTGRES_HOST,
  port: 5432,
});

export { sql };
