import React from "react";

import "./App.css";
import TodoForm from "./TodoForm/TodoForm";
import DisplayTodos from "./DisplayTodos/DisplayTodos";

/* TODO 
  - create form and add to app (done)
  - create list display and add to app
*/

function App() {
  return (
    <div className="App">
      <TodoForm />
      <DisplayTodos />
    </div>
  );
}

export default App;
