// Interacts with the database

// Import connection request
import { pool } from "../server.js";

// Function to retrieve all todo's from database
export async function getAllTodos() {
  try {
    // Acquire a connection from pool
    const client = await pool.connect();
    // Query the database
    const getAllTodosQuery = await client.query("SELECT * FROM todos");
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
