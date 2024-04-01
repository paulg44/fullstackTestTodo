// Component for adding a todo
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./TodoForm.css";
import { ChangeEvent, useState } from "react";

/* TODO 
  - create form (done)
  - add useStates for each input
  - create function for add to list button
*/

function TodoForm() {
  // Use States for form
  const [todo, setTodo] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");

  // Priority and Category option arrays
  const priorityArr = ["high", "medium", "low"];
  const categoryArr = ["personal", "work"];

  function handleTodoChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setTodo(e.target.value);
    console.log(todo);
  }

  // These function not working properly yet!!!
  function handlePriorityChange(e: ChangeEvent<HTMLOptionElement>) {
    e.preventDefault();
    setPriority(e.target.value);
    console.log(priority);
  }
  function handleCategoryChange(e: ChangeEvent<HTMLOptionElement>) {
    e.preventDefault();
    setCategory(e.target.value);
    console.log(category);
  }

  return (
    <Form className="todoForm">
      {/* Enter todo */}
      <Form.Group controlId="formTodo">
        <Form.Label>Enter todo description</Form.Label>
        <Form.Control type="text" onChange={handleTodoChange}></Form.Control>
      </Form.Group>

      {/* Add priority */}
      <Form.Group>
        <Form.Label htmlFor="priority">Priority</Form.Label>
        <Form.Select id="priority">
          {priorityArr.map((pri, index) => (
            <option onChange={handlePriorityChange} key={index} value={pri}>
              {pri}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* Add category */}
      <Form.Group>
        <Form.Label htmlFor="category">Category</Form.Label>
        <Form.Select id="category">
          {categoryArr.map((cat, index) => (
            <option onChange={handleCategoryChange} key={index} value={cat}>
              {cat}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button type="submit" variant="primary">
        Add to List
      </Button>
    </Form>
  );
}

export default TodoForm;
