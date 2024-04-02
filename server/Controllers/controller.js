// Controller handles the data received (requests responses) Manipulate data and send back to client

// Import model function from model file
import * as todoModel from "../Models/models.js";

// Function to control data received
export async function getAllTodosController(req, res) {
  try {
    // Retrieve all todo's from the model
    const todos = await todoModel.getAllTodos();
    // Send todo's as a JSON response with staus code 200 OK
    res.json(todos).status(200);

    // Log success message
    console.log(`Success, payload ${todos}`);
  } catch (error) {
    // Handles error message
    console.error("Error executing query", error);
    // Send error response with code 500
    req
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}
