Here I provide information about how to create a local database setup for your Deno App without using Walking Skeleton.


# Local Database Setup for your App

This SETUP.md guide provides detailed instructions for setting up the PostgreSQL database and integrating it with your Deno app. Be sure to securely manage your environment variables and never push them to public repositories.

You have two options of how to create a database for local use: as a Superuser(one user for all your databases) or create a new user and password for your database. Choose the option suitable for you. Here you have details of how to use both options.

## Navigation
- [Create a PostgreSQL Database as a Superuser)](#1-create-a-postgresql-database-for-local-use-superuser)
- [Create a PostgreSQL Database with Specific Credentials](#2-create-a-postgresql-database-with-specific-credentials)
- [Set Up the project.env and database.js Files for Deno](#3-set-up-the-projectenv-file-for-deno)
- [Run the Deno App](#run-the-deno-app)

## 1. Create a PostgreSQL Database for Local Use (Superuser)

### Step 1: Log in to PostgreSQL as the `postgres` superuser

```bash
sudo -i -u postgres
psql
```

### Step 2: Create a database

CREATE DATABASE your_db_name;

### Step 3: Verify that the database has been created

\l

### Step 4: Connect to the new database

\c your_db_name

### Step 5: Create the necessary tables

CREATE TABLE example_table (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  completed BOOLEAN
);

### Step 6: Exit the psql shell

 \q




## 2. If you don't want to use superuser credentials and you want specific username and password for this particulate database, you can create a PostgreSQL Database with Specific Credentials

### Step 1: Log in to PostgreSQL as the postgres superuser

sudo -i -u postgres
psql

### Step 2: Create a new database

CREATE DATABASE your_db_name;

### Step 3: Create a user with a password

CREATE USER your_db_user WITH PASSWORD 'your_password';

### Step 4: Connect to the database

\c your_db_name

### Step 5: Grant all privileges for the user

GRANT ALL PRIVILEGES ON DATABASE your_db_name TO your_db_user;

### Step 6: Grant sequence and table access

(tables from this project are used as an example)

-- For tasks table and sequence:
GRANT USAGE, SELECT ON SEQUENCE tasks_id_seq TO your_db_user;
GRANT ALL PRIVILEGES ON TABLE tasks TO your_db_user;

-- For work_entries table and sequence:
GRANT USAGE, SELECT ON SEQUENCE work_entries_id_seq TO your_db_user;
GRANT ALL PRIVILEGES ON TABLE work_entries TO your_db_user;


### Step 7: Verify table permissions

\dp example_table

### Step 8: Exit the psql shell

\q


## 3. Set Up the project.env File for Deno

### Step 1: project.env:

POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_db_name
POSTGRES_HOST=localhost
POSTGRES_PORT=5432


### Step 2: database.js file:

import { load } from "https://deno.land/std/dotenv/mod.ts";
import postgres from "https://deno.land/x/postgresjs@v3.4.2/mod.js";

// Load environment variables from the .env file

const env = await load({ envPath: "./project.env" });

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


### Step 3: Run the Deno App

deno run --allow-net --allow-env --allow-read app.js






