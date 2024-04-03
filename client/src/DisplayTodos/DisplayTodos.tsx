// Component for displaying todo's

import { Container, Table } from "react-bootstrap";
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

  // Retrieve all todo's from database ## IM RECEIVING THE INDEX.TSX FILE INSTEAD OF DATA ##
  // useEffect(() => {
  //   // Asynchronous function to fetch all todo's
  //   const fetchAllTodos = async () => {
  //     try {
  //       // Fetch all todo's from server and store in variable
  //       const todoResponse = await fetch("/api/todo");
  //       console.log(todoResponse);
  //       const text = await todoResponse.text();
  //       console.log(text);
  //       // Convert response to json
  //       const parsedResponse = await JSON.parse(text);

  //       const allTodos = parsedResponse.rows;
  //       // set "todos" to json response
  //       setTodosData(allTodos);
  //       // Error message
  //     } catch (error) {
  //       console.error("Error fetching data", error);
  //     }
  //   };
  //   // Call function to fetch all todo's when component mounts
  //   fetchAllTodos();
  // }, []);

  // This should fetch api but doesn't, above works?

  useEffect(() => {
    const fetchAllTodos = async () => {
      try {
        const todoResponse = await fetch("/api/todo");
        console.log(todoResponse);
        const todoData = await todoResponse.json();
        console.log(todoData);
        setTodosData(todoData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
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
