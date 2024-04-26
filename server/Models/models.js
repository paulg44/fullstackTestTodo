// Interacts with the database

// Import connection request
import { pool } from "../server.js";

// Function to retrieve all todo's from database
export async function getAllTodos() {
  try {
    // Acquire a connection from pool
    const client = await pool.connect();
    // Query the database (The .rows is a very important part of this function. I was returning all the data without it. I only wanted the rows from the table)
    const getAllTodosQuery = (await client.query("SELECT * FROM todos ORDER BY todo DESC")).rows;
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


// Function to add a todo to the database
export async function addTodo(body) {
  const {todo, priority, category} = body

  try {
    const client = await pool.connect()
    const addTodoQuery = (await client.query(`INSERT INTO todos (todo, priority, category) VALUES ($1, $2, $3)`, [todo, priority, category]))
  
  client.release()
  return addTodoQuery
  } catch (error) {
    console.error("Error adding todo:", error)
    throw error
  }
}

// Function to remove todo fromm database
export async function removeTodo(id) {
  try {
     const client= await pool.connect()
     const removeTodoQuery = (await client.query(`DELETE FROM todos WHERE id = $1`, [id]))
     client.release()
     return removeTodoQuery
  } catch (error) {
    console.error("Error removing todo", error)
    throw error
  }
}

// Function to update todo
export async function updateTodo(todo, id) {
  try {
    const client = await pool.connect()
    const updateTodoQuery = (await client.query(`UPDATE todos SET todo = $1 WHERE id = $2`, [todo, id]))
    client.release()
    return updateTodoQuery
  } catch (error) {
    console.error("Error updating todo:", error)
    throw error
  }
}
