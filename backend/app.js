import express from "express";
const app = express();

import cors from "cors"
import morgan from "morgan";
import users from "./api/users.js";
import admin from "./api/admin.js";

export default app;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/users", users);
app.use("/admin", admin);

app.use((err, req, res, next) => {
  // A switch statement can be used instead of if statements
  // when multiple cases are handled the same way.
  switch (err.code) {
    // Invalid type
    case "22P02":
      return res.status(400).send(err.message);
    // Unique constraint violation
    case "23505":
    // Foreign key violation
    case "23503":
      return res.status(400).send(err.detail);
    default:
      next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});