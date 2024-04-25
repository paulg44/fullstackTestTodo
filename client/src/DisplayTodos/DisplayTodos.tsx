// Component for displaying todo's

import "./DisplayTodos.css";
import { Container, Form } from "react-bootstrap";
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
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [editedTodo, setEditedTodo] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");

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
    await fetch(`api/todo/${id}`, {
      method: "DELETE",
    });
    console.log("Successfully removed todo with ID:", id);
  }

  // Function for editing a todo
  async function handleEditTodo(id: number, todo: string) {
    setEditTodoId(id);
    setEditedTodo(todo);
  }

  async function handleEditTodoDatabase(id: number) {
    try {
      await fetch(`/api/todo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ editedTodo }),
      });
      const updatedTodos = todosData.map((todo) =>
        todo.id === id ? { ...todo, todo: editedTodo } : todo
      );
      setTodosData(updatedTodos);
      setEditTodoId(null);
    } catch (error) {
      console.error("Error editing todo", error);
    }
  }

  function handleSelectedOrder(e: ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();

    setSelectedOrder(e.target.value);
    console.log(selectedOrder);
  }

  return (
    <Container>
      <h2>Todo List</h2>
      <div className="orderBy">
        <Form.Group>
          <Form.Label htmlFor="orderBy">Order By</Form.Label>
          <Form.Select
            aria-label="Order By"
            id="orderBy"
            value={selectedOrder}
            onChange={handleSelectedOrder}
          >
            <option />
            <option>Priority</option>
            <option>Category</option>
          </Form.Select>
        </Form.Group>
      </div>
      <ul>
        {todosData.map((todo) => (
          <li key={todo.id} className={`priority${todo.priority}`}>
            {editTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editedTodo}
                  onChange={(e) => setEditedTodo(e.target.value)}
                  autoFocus
                  data-testid="displayTodoInput"
                />
                <button
                  type="button"
                  onClick={() => handleEditTodoDatabase(todo.id)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{todo.todo}</span>
                <button
                  type="button"
                  onClick={() => handleEditTodo(todo.id, todo.todo)}
                >
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
  );
}

export default DisplayTodos;
