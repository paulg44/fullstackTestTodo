// Component for displaying todo's

import "./DisplayTodos.css";
import { Container } from "react-bootstrap";
import { useState, useEffect, ChangeEvent } from "react";

function DisplayTodos() {
  // Types for incoming todo's from database
  interface Todo {
    id: number;
    todo: string;
    priority: string;
    category: string;
    completed: boolean;
  }

  // State for todos
  const [todosData, setTodosData] = useState<Todo[]>([]);
  const [editTodoId, setEditTodoId] = useState<number | null>(null)
  const [editTodo, setEditTodo] = useState(false)

  //  Retrieve all todo's from database using a useEffect
  useEffect(() => {
    const fetchAllTodos = async () => {
      try {
        // Set a variable sending a fetch request to the api and store in. The .then then returns the stored variable in json format
        const todoResponse = await fetch("/api/todo").then((todoResponse) => {
          return todoResponse.json();
        });
        console.log(todoResponse);

        setTodosData(todoResponse);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchAllTodos();
  }, []);

    // Function for deleting a todo
    async function handleDeleteTodo(id: number) {
   

      await fetch(`api/todo/${id}`,{
         method: "DELETE",
    }) 
    console.log("Successfully removed todo with ID:", id)
    }

    // Function for editing a todo
    async function handleEditTodo(id: number) {
   setEditTodoId(id)
    }

    async function handleEditTodoDatabase(id: number, updatedTodo: string) {
      try {
        await fetch(`/api.todo/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({todo: updatedTodo})
        })
        
      
      } catch (error) {
        console.error("Error editing todo", error)
      }
    }
    

  return (
    <Container>
      <h2>Todo List</h2>
      <ul>
      {todosData.map((todo) => (
          <li key={todo.id} className={`priority${todo.priority}`}>
            {editTodoId === todo.id ? (
              <input
                type="text"
                value={todo.todo}
                onChange={(e) => handleEditTodoDatabase(todo.id)}
              />
            ) : (
              <>
                <span>{todo.todo}</span>
                <button type="button" onClick={() => handleEditTodo(todo.id)}>
                  Edit
                </button>
                <button type="button" onClick={() => handleDeleteTodo(todo.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </Container>
        )}

export default DisplayTodos;
