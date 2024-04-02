// Routes file for GET, POST, PATCH, DELETE requests. Defines the endpoints

import express from "express";

// Import controller from controller file
import * as todoController from "../Controllers/controller.tsx";

// Create a route instance in built express Router
export const todoRoutes = express.Router();

//  Define route for getting all todo's
todoRoutes.get("/", todoController.getAllTodosController);
