// Import dependencies
import express from "express";
// Allows node.js to interact with Postgres
import pkg from "pg";
// Loads local environment variables from env file
import dotenv from "dotenv";
// cross origin resource sharing
import cors from "cors";
import { todoRoutes } from "./Routes/routes.tsx";

dotenv.config();

// Creates a connection pool to interact with database
const { Pool } = pkg;

const app = express();

// Retrieves values from env
const port = process.env.REACT_APP_PORT;
const connectionString = process.env.REACT_APP_TODO_DB_STRING;

export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

// app.use = middleware and gives access to res req, .json parses incoming requests
app.use(express.json());
app.use(cors());

app.use("/api/allTodos", todoRoutes);

// Starts express application
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
