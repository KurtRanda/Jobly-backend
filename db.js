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
(async function connectToDB() {
  try {
    await db.connect();
    console.log("Connected to the database".green);
  } catch (err) {
    console.error("Database connection error:".red, err);
    process.exit(1); // Exit the process if the database connection fails
  }
})();

module.exports = db;

