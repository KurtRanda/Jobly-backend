"use strict";

/** Database setup for Jobly. */
const { Client } = require("pg");
const { DB_CONFIG, getDatabaseUri } = require("./config");

let db;

// Use DB_CONFIG for production, and ensure SSL is configured for Supabase
if (process.env.NODE_ENV === "production") {
  db = new Client(DB_CONFIG); // Use DB_CONFIG from config.js
} else {
  db = new Client({
    connectionString: getDatabaseUri(), // Use getDatabaseUri for local/testing environments
  });
}

db.connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Database connection error:", err));

module.exports = db;
