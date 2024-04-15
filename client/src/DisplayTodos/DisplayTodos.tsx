// Component for displaying todo's

import "./DisplayTodos.css";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";

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

  return (
    <Container>
      <h2>Todo List</h2>
      <ul>
        {Array.isArray(todosData) &&
          todosData.map((todo) => (
            <li key={todo.id} className={`priority${todo.priority}`}>
              {todo.todo}
              <button type="button">X</button>
            </li>
          ))}
      </ul>
    </Container>
  );
}

export default DisplayTodos;
