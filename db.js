"use strict";

/** Database setup for Jobly. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;

// Configure database connection for production and development environments
if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: getDatabaseUri(),
    ssl: {
      rejectUnauthorized: false, // Required for connecting to Supabase
    },
  });
} else {
  db = new Client({
    connectionString: getDatabaseUri(),
  });
}

// Attempt to connect to the database and log the status
db.connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Database connection error:", err));

module.exports = db;

