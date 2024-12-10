"use strict";

const { config } = require("dotenv");
const db = require("./db");

/** Shared config for application; can be required many places. */

require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

const PORT = +process.env.PORT || 3001;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
    ? "jobly_test" // Use a local or test database during testing
    : process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/jobly"; // Default to Supabase connection or local
}

// Configure database SSL settings for Supabase
const DB_CONFIG = {
  connectionString: getDatabaseUri(),
  ssl: {
    rejectUnauthorized: false, // Required for Supabase connections
  },
};

// Speed up bcrypt during tests, since the algorithm safety isn't being tested
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("Jobly Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
  DB_CONFIG, // Exporting DB_CONFIG for database connections
};
