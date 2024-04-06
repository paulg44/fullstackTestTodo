// Interacts with the database

// Import connection request
import { pool } from "../server.js";

// Function to retrieve all todo's from database
export async function getAllTodos() {
  try {
    // Acquire a connection from pool
    const client = await pool.connect();
    // Query the database (The .rows is a very important part of this function. I was returning all the data without it. I only wanted the rows from the table)
    const getAllTodosQuery = (await client.query("SELECT * FROM todos")).rows;
    //   Release client connection
    client.release();
    // Return query
    return getAllTodosQuery;
  } catch (error) {
    // Handle errors
    console.error("Error fetching todo's:", error);
    throw error;
  }
}
