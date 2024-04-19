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

// Add todo to list
export async function addTodoController(req, res) {
  try {
    const data = req.body
    const addNewTodo = await todoModel.addTodo(data)
    console.log(`Success, payload ${addNewTodo.rows}`)
    res.status(200).json(addNewTodo.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({error: "Internal server error"})
  }
}

// Remove todo from list 
export async function removeTodoController(req, res) {
  try {
    // Was stuck on this for a little while, needed to require the parameter of id to specifically point to the todo that wants deleting
    const todoId = req.params.id
     const removeTodoFromList = await todoModel.removeTodo(todoId)
     res.status(200).json(removeTodoFromList)
  } catch (error) {
    console.error(error)
    res.status(500).json({error: "Internal server error"})
  }
}

// Update todo in database 
export async function updateTodoController (req, res){
  try {
    const data = req.body
    const todoId = req.params.id
    const updateTodoInDatabase = await todoModel.updateTodo(data, todoId)
    res.status(200).json({ success: true, payload: updateTodoInDatabase})
  } catch(error) {
    console.error("Internal server error", error)
  }
}
