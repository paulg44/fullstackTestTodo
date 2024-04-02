// Component for displaying todo's

import { Container, Table } from "react-bootstrap";
import { useState, useEffect } from "react";

function DisplayTodos() {
  // State for todos
  const [todosData, setTodosData] = useState("");

  // Retrieve all todo's from database
  useEffect(() => {
    // Asynchronous function to fetch all todo's
    const fetchAllTodos = async () => {
      try {
        // Fetch all todo's from server and store in variable
        const todoResponse = await fetch("/api/todo");
        // Convert response to json
        const allTodos = await todoResponse.json();
        // set "todos" to json response
        setTodosData(allTodos);
        // Error message
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    // Call function to fetch all todo's when component mounts
    fetchAllTodos();
  }, []);

  return (
    // <Container>
    //   <h2>Todo List</h2>
    //   <ul>
    //     {Array.isArray(todos) &&
    //       todos.map((todo) => <li key={todo.id}>{todo.description}</li>)}
    //   </ul>
    // </Container>
    <Table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Priority</th>
          <th>Category</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(todosData) &&
          todosData.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.todo}</td>
              <td>{todo.priority}</td>
              <td>{todo.category}</td>
              <td>{todo.completed}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}

export default DisplayTodos;
