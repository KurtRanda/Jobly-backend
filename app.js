"use strict";

/** Express app for jobly. */

const express = require("express");
const cors = require("cors"); // Ensure this is declared only once
const { NotFoundError } = require("./expressError");
const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const companiesRoutes = require("./routes/companies");
const usersRoutes = require("./routes/users");
const jobsRoutes = require("./routes/jobs");
const morgan = require("morgan");

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: ["https://jobly-frontend-axcj.onrender.com"], // Add your frontend URL
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Authorization", "Content-Type"],
}));

app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

// Routes
app.use("/auth", authRoutes);
app.use("/companies", companiesRoutes);
app.use("/users", usersRoutes);
app.use("/jobs", jobsRoutes);

// Welcome Page
app.get("/", (req, res) => {
  res.send("Jobly backend is running!");
});

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;

